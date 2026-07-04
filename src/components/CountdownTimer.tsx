import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATE } from '../data';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { TempleWatermark } from './TempleDecoration';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(WEDDING_DATE) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      const difference = +new Date(WEDDING_DATE) - +new Date();
      if (difference <= 0) {
        setIsCompleted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, max: 365 },
    { label: 'Hours', value: timeLeft.hours, max: 24 },
    { label: 'Minutes', value: timeLeft.minutes, max: 60 },
    { label: 'Seconds', value: timeLeft.seconds, max: 60 }
  ];

  return (
    <section id="countdown-section" className="py-20 px-4 bg-brand-bg/80 backdrop-blur-xs relative overflow-hidden text-brand-text">
      {/* Background traditional temple watermark */}
      <TempleWatermark />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-sand/30 text-brand-accent text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-accent" />
            The Countdown
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-4 font-normal tracking-wide">
            The Sacred Countdown
          </h2>
          <p className="text-sm md:text-base text-brand-accent max-w-lg mb-12 font-serif italic">
            "Mangalyam Thanthunanena Mama Jeevana Hethuna: With this sacred thread, we bind our lives together in joy, devotion, and eternal harmony."
          </p>
        </motion.div>

        {isCompleted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-10 rounded-2xl bg-white/50 backdrop-blur-sm border border-brand-sand/30 shadow-xl max-w-md mx-auto"
          >
            <h3 className="text-2xl font-serif text-brand-text mb-2">Today is the Day!</h3>
            <p className="text-brand-accent/80 font-serif italic">The happy couple Sureth & Durga is celebrating their marriage right now. Thank you for joining us!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-16">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative bg-white/60 backdrop-blur-sm border border-brand-sand/30 rounded-2xl p-6 md:p-8 shadow-[0_10px_25px_-5px_rgba(139,126,102,0.1)] flex flex-col items-center justify-center overflow-hidden group"
              >
                {/* Micro-interactive glow inside the card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-sand/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* SVG Radial Path under the numbers */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <span className="text-4xl md:text-5xl font-serif font-light text-brand-text tracking-tight mb-2 select-none">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] md:text-xs font-semibold tracking-widest text-brand-accent uppercase">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick details highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-start gap-4 p-5 rounded-2xl border border-brand-sand/20 bg-white/60 backdrop-blur-sm text-left"
          >
            <div className="p-3 rounded-xl bg-brand-sand/30 text-brand-accent flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brand-text mb-1">When</h4>
              <p className="text-xs text-brand-text/80 font-medium">Sunday, August 23, 2026</p>
              <p className="text-xs text-brand-accent">Muhurtham begins at 7:30 AM Onwards</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-start gap-4 p-5 rounded-2xl border border-brand-sand/20 bg-white/60 backdrop-blur-sm text-left"
          >
            <div className="p-3 rounded-xl bg-brand-sand/30 text-brand-accent flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brand-text mb-1">Where</h4>
              <p className="text-xs text-brand-text/80 font-medium">Arulmigu Subramanyaswamy Thirukovil</p>
              <p className="text-xs text-brand-accent">Thiruthani Hill, Thiruttani, Tamil Nadu 631209</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
