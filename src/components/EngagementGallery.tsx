import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../data';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function EngagementGallery() {
  const [filter, setFilter] = useState<'all' | 'engagement' | 'candid' | 'travel'>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const categories = [
    { value: 'all', label: 'All Moments' },
    { value: 'engagement', label: 'Proposal' },
    { value: 'candid', label: 'Candids' },
    { value: 'travel', label: 'Adventures' }
  ] as const;

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
    }
  };

  return (
    <section id="gallery-section" className="py-24 px-4 bg-brand-bg/85 backdrop-blur-xs relative overflow-hidden text-brand-text">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="p-2 rounded-full bg-brand-sand/30 text-brand-accent mb-3 border border-brand-accent/20">
              <Camera className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-3 font-normal tracking-wide">
              Our Engagement Gallery
            </h2>
            <div className="w-12 h-[1px] bg-brand-accent/40 my-2" />
            <p className="text-sm md:text-base text-brand-accent max-w-lg font-serif italic">
              "Capturing moments today that will rule our hearts forever."
            </p>
          </motion.div>
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 relative overflow-hidden border ${
                filter === cat.value
                  ? 'bg-brand-text border-brand-text text-brand-bg shadow-md shadow-brand-text/10'
                  : 'bg-white/60 hover:bg-white border-brand-sand/30 text-brand-text hover:border-brand-accent/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 18 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveIndex(idx)}
                className="group relative h-[320px] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(139,126,102,0.08)] border border-brand-sand/20 cursor-pointer bg-brand-sand/10"
              >
                {/* Photo Image */}
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Elegant Tint Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-brand-text/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />

                {/* Overlay Text & Interaction */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 pointer-events-none">
                  {/* Top corner category badge */}
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="p-1.5 rounded-full bg-white/25 backdrop-blur-md text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom details */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-1.5 text-brand-accent text-[10px] font-bold tracking-widest uppercase mb-1">
                      <Heart className="w-3 h-3 fill-brand-accent" />
                      {img.category}
                    </div>
                    <p className="text-white font-serif italic text-sm md:text-base pr-4 leading-snug">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-brand-accent/70 font-serif italic">
            No memories under this folder yet...
          </div>
        )}

        {/* LIGHTBOX MODAL DIALOG */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer z-40"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer z-40"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Center Content */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] flex flex-col items-center pointer-events-auto"
              >
                <img
                  src={filteredImages[activeIndex].url}
                  alt={filteredImages[activeIndex].caption}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Caption Panel */}
                <div className="text-center mt-5 px-6 max-w-xl">
                  <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
                    {filteredImages[activeIndex].category}
                  </span>
                  <p className="text-white font-serif italic text-base md:text-lg">
                    "{filteredImages[activeIndex].caption}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
