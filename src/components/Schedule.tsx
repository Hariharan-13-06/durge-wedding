import { useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_SCHEDULE } from '../data';
import { Clock, MapPin, Gift, Music, Flame, GlassWater, Landmark } from 'lucide-react';
import { TempleWatermark } from './TempleDecoration';

const iconsMap: Record<string, any> = {
  Temple: Landmark,
  Reception: Music,
};

export default function Schedule() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="schedule-section" className="py-24 px-4 bg-brand-bg/85 backdrop-blur-xs relative overflow-hidden text-brand-text">
      {/* Traditional Temple Watermark Background */}
      <TempleWatermark />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="p-2 rounded-full bg-brand-sand/30 text-brand-accent mb-3 border border-brand-accent/20">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-3 font-normal tracking-wide">
              The Wedding Schedule
            </h2>
            <div className="w-12 h-[1px] bg-brand-accent/40 my-2" />
            <p className="text-sm md:text-base text-brand-accent max-w-lg font-serif italic">
              We look forward to celebrating each precious moment of our wedding day with you.
            </p>
          </motion.div>
        </div>

        {/* Schedule grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {WEDDING_SCHEDULE.map((item, index) => {
            const IconComponent = iconsMap[item.icon] || Clock;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="bg-white/60 hover:bg-white border border-brand-sand/30 hover:border-brand-accent/25 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-[0_15px_35px_-8px_rgba(139,126,102,0.15)] transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual hover background flow */}
                <div className="absolute inset-y-0 left-0 w-1.5 bg-brand-accent/30 group-hover:bg-brand-accent transition-colors duration-300" />
                
                {/* Main details */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Time Label */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand/30 text-brand-text border border-brand-accent/10 text-xs font-bold tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-brand-accent" />
                      {item.time}
                    </span>
                    
                    {/* Event Icon */}
                    <div className="p-2 rounded-xl bg-brand-sand/10 text-brand-accent group-hover:bg-brand-sand/30 group-hover:text-brand-text transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-brand-text font-medium mb-2 group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Venue location block */}
                  <p className="flex items-start gap-1 text-xs text-brand-accent/80 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    {item.venue}
                  </p>

                  <p className="text-brand-accent/90 text-xs md:text-sm font-serif italic leading-relaxed">
                    "{item.description}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Wedding traditional Ashirvadam / blessings note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 p-6 md:p-8 rounded-2xl bg-white/50 border border-brand-sand/30 text-center max-w-2xl mx-auto shadow-sm"
        >
          <div className="flex justify-center mb-3 text-brand-accent">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>
          <h4 className="font-serif font-semibold text-brand-text mb-1 tracking-wide">Elder Blessings (Ashirvadam)</h4>
          <p className="text-brand-accent/80 text-xs md:text-sm font-serif italic max-w-lg mx-auto leading-relaxed">
            "Your presence, love, and sacred blessings (Ashirvadam) are the greatest gifts we could ever receive. We kindly request no boxed gifts please; only your warm prayers and smiles are requested."
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button 
              onClick={() => {
                const el = document.getElementById('interactive-zone');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
            >
              Shower Virtual Blessings
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('rsvp-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-brand-sand/20 border border-brand-sand/40 text-brand-text text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
            >
              RSVP to Attend
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
