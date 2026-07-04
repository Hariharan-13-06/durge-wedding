import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { COUPLE_NAMES } from '../data';
import { Heart, ChevronDown } from 'lucide-react';
import WeddingBackground from '../assets/images/wedding-background.png';
import WeddingCouplePortrait from '../assets/images/durga-sureth-temple.jpg';

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate parallax offsets for different layers
  // Background sky & hills (slowest)
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Couple portrait (medium)
  const yCouple = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const scaleCouple = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  
  // Text elements (fastest upward, fading out)
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  // Floating flower petals/leaves (moving down and out)
  const yForeLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const yForeRight = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Scroll to main content
  const scrollToContent = () => {
    const nextSection = document.getElementById('countdown-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef} 
      id="hero-parallax-container"
      className="relative h-[100vh] w-full overflow-hidden bg-brand-bg text-brand-text"
    >
      {/* Background Ornamental Text */}
      <div className="absolute top-[-20px] right-[-50px] text-[200px] sm:text-[300px] font-serif italic text-brand-watermark opacity-60 leading-none pointer-events-none select-none z-0">
        AUG.
      </div>
      <div className="absolute bottom-[-50px] left-[-20px] text-[150px] sm:text-[200px] font-serif text-brand-watermark opacity-60 leading-none pointer-events-none select-none z-0">
        23
      </div>

      {/* LAYER 1: Background Sky & Traditional Temple (Slowest) */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden"
      >
        <img 
          src={WeddingBackground}    
          alt="Watercolor Sky Background" 
          className="w-full h-full object-cover origin-bottom opacity-35 select-none"
          referrerPolicy="no-referrer"
        />

        
        {/* Sacred warm radiant golden sun/aura glow behind the Temple Gopuram */}
        <div className="absolute w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-brand-gold/25 to-brand-accent/10 blur-3xl pointer-events-none z-0" />

        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg opacity-90" />
      </motion.div>

      {/* Decorative ambient dust / light particles floating */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-accent/20"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 80 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTAINER: Responsive layout to ensure NO overlap of text and portrait */}
      <div className="absolute inset-0 z-30 max-w-5xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between h-full gap-8 md:gap-16 pt-[8vh] md:pt-0 pb-[4vh] md:pb-0">
        
        {/* LEFT COLUMN: Main Text Elements (Fastest, fades on scroll, elegant typography) */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left z-35 select-none"
        >
          <motion.div 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.8, delay: 0.3 }}
            className="text-xs tracking-[0.4em] uppercase font-bold text-brand-accent mb-3 md:mb-5"
          >
            Save the Date
          </motion.div>

          {/* Fancy Script & Serif Title */}
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-text font-normal tracking-wide leading-tight">
              {COUPLE_NAMES.groom}
            </h1>
            
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1 }}
              className="my-1 text-brand-accent flex items-center justify-center md:ml-4"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-brand-accent/20" strokeWidth={1.5} />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-text font-normal tracking-wide leading-tight">
              {COUPLE_NAMES.bride}
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-6 md:mt-8 flex flex-col items-center md:items-start gap-2"
          >
            <p className="text-sm md:text-base font-serif italic text-brand-accent tracking-wider font-semibold">
              Are Tying the Sacred Thali
            </p>
            <div className="h-[1.5px] w-24 bg-brand-accent/40 my-1 md:my-2" />
            <p className="text-xs sm:text-sm tracking-[0.2em] font-bold text-brand-text uppercase">
              August 23, 2026
            </p>
            <p className="text-xs sm:text-sm tracking-[0.15em] font-medium text-brand-accent uppercase mt-0.5">
              Thiruttani, Tamil Nadu
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Couple Watercolor Portrait framed inside the stunning arch */}
        <motion.div 
          style={{ y: yCouple, scale: scaleCouple }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
          className="w-full md:w-[45%] flex justify-center md:justify-end items-center md:items-end z-20 pointer-events-none"
        >
          <div className="relative w-[50vw] sm:w-[42vw] md:w-[32vw] lg:w-[25vw] aspect-[3/4] bg-brand-sand rounded-xs border-[3px] md:border-[10px] border-sand shadow-2xl overflow-hidden flex items-center justify-center">
            <img 
              src={WeddingCouplePortrait} 
              alt="Wedding Couple Portrait" 
              className="w-full h-full object-cover origin-bottom select-none opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Subtle soft shadow vignette inside the frame */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-brand-bg/50 to-transparent blur-md" />
          </div>
        </motion.div>

      </div>

      {/* LAYER 4: Foreground Hanging Watercolor Florals (Leaves and flowers framing the corner, very fast parallax) */}
      <motion.div 
        style={{ y: yForeLeft }}
        initial={{ opacity: 0, x: -30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
        className="absolute top-0 left-0 z-40 w-[25vw] md:w-[15vw] pointer-events-none select-none opacity-90"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-brand-accent/15 fill-current">
          <path d="M0 0C30 0 60 15 70 45C60 40 40 30 0 35V0Z" />
          <path d="M0 20C15 25 25 40 28 60C22 50 12 40 0 38V20Z" />
          <path d="M10 0C25 5 45 20 42 40C35 32 20 20 10 15V0Z" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ y: yForeRight }}
        initial={{ opacity: 0, x: 30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
        className="absolute top-0 right-0 z-40 w-[25vw] md:w-[15vw] pointer-events-none select-none opacity-90"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-brand-accent/15 fill-current transform scale-x-[-1]">
          <path d="M0 0C30 0 60 15 70 45C60 40 40 30 0 35V0Z" />
          <path d="M0 20C15 25 25 40 28 60C22 50 12 40 0 38V20Z" />
          <path d="M10 0C25 5 45 20 42 40C35 32 20 20 10 15V0Z" />
        </svg>
      </motion.div>

      {/* Downward Navigation Pointer (Floating) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 1.5, delay: 2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[9px] tracking-[0.4em] font-medium text-brand-accent/80 uppercase mb-2 group-hover:text-brand-text transition-colors">
          Scroll To Discover
        </span>
        <div className="p-1 rounded-full border border-brand-accent/20 group-hover:border-brand-accent/80 transition-colors">
          <ChevronDown className="w-4 h-4 text-brand-accent/80 group-hover:text-brand-text" />
        </div>
      </motion.div>

      {/* Decorative floral framing along bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-brand-bg to-transparent z-30 pointer-events-none" />
    </div>
  );
}
