import { motion } from 'motion/react';
import { STORY_TIMELINE, COUPLE_NAMES } from '../data';
import { Heart, Coffee, Compass, Home } from 'lucide-react';

const iconsMap: Record<string, any> = {
  Coffee: Coffee,
  Compass: Compass,
  Home: Home,
  Heart: Heart,
};

export default function OurStory() {
  return (
    <section id="story-section" className="py-24 px-4 bg-brand-bg/85 backdrop-blur-xs relative overflow-hidden text-brand-text">
      {/* Decorative vertical lines on sides */}
      <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[1px] bg-gradient-to-b from-brand-accent/10 via-brand-accent/30 to-transparent pointer-events-none transform -translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="p-2 rounded-full bg-brand-sand/30 text-brand-accent mb-3 border border-brand-accent/20">
              <Heart className="w-5 h-5 fill-brand-accent/10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-4 font-normal tracking-wide">
              Our Love Story
            </h2>
            <p className="text-sm md:text-base text-brand-accent max-w-lg font-serif italic">
              How {COUPLE_NAMES.groom} & {COUPLE_NAMES.bride} found their happily ever after, step by step.
            </p>
          </motion.div>
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Central timeline floral bullet anchors */}
          <div className="space-y-16 md:space-y-24">
            {STORY_TIMELINE.map((item, index) => {
              const IconComponent = iconsMap[item.icon] || Heart;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col md:flex-row items-stretch md:items-center relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Icon (Mobile: aligned left, Desktop: aligned center) */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
                      className="w-10 h-10 rounded-full bg-brand-bg border-2 border-brand-accent/40 text-brand-accent flex items-center justify-center shadow-md shadow-brand-accent/5 hover:border-brand-accent hover:text-brand-text transition-colors cursor-default"
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Card Content (Occupies half width on desktop, full width minus offset on mobile) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="bg-white/60 hover:bg-white border border-brand-sand/30 hover:border-brand-accent/25 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(139,126,102,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(139,126,102,0.15)] transition-all duration-300 relative group"
                    >
                      {/* Interactive edge border glow */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-accent/15 pointer-events-none transition-colors duration-300" />

                      {/* Timeline Year tag */}
                      <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-brand-accent bg-brand-sand/30 border border-brand-accent/20 rounded-full mb-4">
                        {item.year}
                      </span>
                      
                      <h3 className="text-xl font-serif text-brand-text font-medium mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-brand-accent/90 text-sm md:text-base leading-relaxed font-serif italic">
                        "{item.description}"
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for desktop to align properly (Left/Right pairing) */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
