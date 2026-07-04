import React from 'react';
import { motion } from 'motion/react';

// Swaying animation helper for hanging bells and lamps
const swayTransition = {
  duration: 4.5,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse" as const
};

export function TemplePillar({ side }: { side: 'left' | 'right' }) {
  return (
    <div 
      className={`fixed top-0 bottom-0 w-16 md:w-24 lg:w-32 z-20 pointer-events-none hidden md:flex flex-col justify-between ${
        side === 'left' ? 'left-0 border-r border-brand-gold/10' : 'right-0 border-l border-brand-gold/10'
      }`}
    >
      {/* Upper Capital (Potika / Pillar Head) */}
      <div className="w-full">
        <svg viewBox="0 0 120 150" className="w-full h-auto text-brand-gold drop-shadow-md" fill="currentColor">
          {/* Top block */}
          <rect x="10" y="10" width="100" height="15" rx="2" fill="url(#stone-grad)" />
          {/* Inverted stepped brackets (traditional South Indian style) */}
          <path d="M 10 25 L 20 45 L 100 45 L 110 25 Z" fill="url(#brass-grad)" />
          {/* Decorative fluted scroll brackets */}
          {side === 'left' ? (
            <>
              {/* Left bracket scroll detail */}
              <path d="M 20 45 C 5 45, 5 75, 25 75 C 35 75, 40 65, 30 55 C 25 48, 22 48, 20 45" fill="url(#brass-grad-dark)" />
              <circle cx="25" cy="65" r="4" className="text-brand-accent" />
            </>
          ) : (
            <>
              {/* Right bracket scroll detail */}
              <path d="M 100 45 C 115 45, 115 75, 95 75 C 85 75, 80 65, 90 55 C 95 48, 98 48, 100 45" fill="url(#brass-grad-dark)" />
              <circle cx="95" cy="65" r="4" className="text-brand-accent" />
            </>
          )}
          {/* Central neck block */}
          <rect x="35" y="45" width="50" height="30" fill="url(#stone-grad)" />
          <line x1="35" y1="60" x2="85" y2="60" stroke="#FAF5EB" strokeWidth="2" opacity="0.3" />
          {/* Ornamental molding rings */}
          <ellipse cx="60" cy="75" rx="35" ry="8" fill="url(#brass-grad)" />
          <ellipse cx="60" cy="85" rx="28" ry="6" fill="url(#brass-grad-dark)" />
          {/* Segment transition */}
          <rect x="42" y="91" width="36" height="59" fill="url(#stone-grad)" />
          {/* Floral relief carving */}
          <path d="M 60 100 L 52 115 L 68 115 Z" className="text-brand-accent/40" />
          <path d="M 60 140 L 52 125 L 68 125 Z" className="text-brand-accent/40" />
          <circle cx="60" cy="120" r="5" className="text-brand-gold" />

          {/* Define gradients for rich realistic stone & brass textures */}
          <defs>
            <linearGradient id="stone-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#301414" />
              <stop offset="30%" stopColor="#4A2222" />
              <stop offset="70%" stopColor="#5E2C2C" />
              <stop offset="100%" stopColor="#301414" />
            </linearGradient>
            <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C6615" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F3E5D8" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6615" />
            </linearGradient>
            <linearGradient id="brass-grad-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#59410A" />
              <stop offset="50%" stopColor="#A48130" />
              <stop offset="100%" stopColor="#59410A" />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative hanging brass oil lamp / Diya swaying gently below the capital */}
        <div className="flex justify-center mt-2 relative">
          <motion.div 
            animate={{ rotate: side === 'left' ? [1, -5, 1] : [-1, 5, -1] }}
            transition={swayTransition}
            style={{ transformOrigin: "top center" }}
            className="flex flex-col items-center"
          >
            {/* Hanging chain */}
            <div className="w-[1.5px] h-12 md:h-20 bg-brand-gold/60" />
            {/* Decorative small bell or bead */}
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            {/* Hanging Brass Diya/Bell */}
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-brand-gold drop-shadow-md">
              <path d="M12 2 L12 15" stroke="currentColor" strokeWidth="1.5" />
              {/* Bell dome */}
              <path d="M6 15 C6 9, 18 9, 18 15 L20 28 L4 28 Z" fill="url(#brass-grad)" />
              {/* Clapper */}
              <circle cx="12" cy="32" r="3" fill="url(#brass-grad-dark)" />
              {/* Little chain link ring */}
              <circle cx="12" cy="1" r="1.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Repeating Column Shaft (repeats vertical elements gracefully using background style or decorative SVGs) */}
      <div className="flex-grow flex flex-col justify-around items-center py-10 opacity-70">
        <div className="w-[1px] h-full bg-gradient-to-b from-brand-accent/20 via-brand-gold/35 to-brand-accent/20 relative">
          {/* Accent design disks / floral mandalas along the column shaft */}
          <div className="absolute top-[20%] -translate-x-1/2 w-4 h-4 rounded-full bg-brand-accent/80 border border-brand-gold flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
          </div>
          <div className="absolute top-[50%] -translate-x-1/2 w-6 h-6 rounded-full bg-brand-text border-2 border-brand-gold flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-brand-accent rounded-full" />
          </div>
          <div className="absolute top-[80%] -translate-x-1/2 w-4 h-4 rounded-full bg-brand-accent/80 border border-brand-gold flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
          </div>
        </div>
      </div>

      {/* Lower Base / Pedestal (Adhisthana) */}
      <div className="w-full">
        <svg viewBox="0 0 120 150" className="w-full h-auto text-brand-gold" fill="currentColor">
          {/* Segment transition */}
          <rect x="42" y="0" width="36" height="50" fill="url(#stone-grad)" />
          {/* Ring molding */}
          <ellipse cx="60" cy="50" rx="28" ry="6" fill="url(#brass-grad)" />
          <ellipse cx="60" cy="58" rx="35" ry="8" fill="url(#brass-grad-dark)" />
          {/* Multi-tier carved base */}
          <path d="M 30 66 L 15 100 L 105 100 L 90 66 Z" fill="url(#stone-grad)" />
          <rect x="10" y="100" width="100" height="25" rx="1" fill="url(#brass-grad)" />
          <rect x="2" y="125" width="116" height="20" fill="url(#stone-grad)" />
          {/* Tiny carved lines */}
          <line x1="20" y1="112" x2="100" y2="112" stroke="#2D1818" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// Beautiful traditional Indian floral garland (Toran) that hangs at the top of key sections or viewport
export function TempleToran() {
  return (
    <div className="absolute top-0 inset-x-0 h-10 md:h-14 z-30 pointer-events-none overflow-hidden flex justify-center select-none">
      {/* Decorative repeating chain of mango leaves (Maavilai) and marigold strings (Genda Phool) */}
      <div className="w-full h-full flex justify-around items-start opacity-90 max-w-[1200px] mx-auto">
        {[...Array(16)].map((_, i) => {
          const delay = i * 0.15;
          return (
            <div key={i} className="flex flex-col items-center relative -top-1">
              {/* Curved thread */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="text-brand-gold/70">
                <path d="M0 2 C15 15, 45 15, 60 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Hanging elements in center of each loop */}
              <div className="absolute top-3 flex flex-col items-center">
                {/* Gold/Orange Marigold flower */}
                <motion.div 
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 border border-amber-300 shadow-sm flex items-center justify-center"
                >
                  {/* Outer petal layers */}
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                </motion.div>

                {/* Mango Leaf (Traditional green leaf) */}
                <motion.svg 
                  width="12" 
                  height="26" 
                  viewBox="0 0 12 26" 
                  fill="none"
                  animate={{ rotate: [1, -3, 1] }}
                  transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "top center" }}
                  className="text-emerald-700 mt-0.5 drop-shadow-sm"
                >
                  <path 
                    d="M6 0 C8 5, 11 12, 10 20 C9 24, 7 26, 6 26 C5 26, 3 24, 2 20 C1 12, 4 5, 6 0 Z" 
                    fill="currentColor" 
                  />
                  {/* Leaf vein */}
                  <path d="M6 0 L6 24" stroke="#064e3b" strokeWidth="0.5" opacity="0.6" />
                </motion.svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Gorgeous background watermark element of a Temple Gopuram (tower) or Mandala/Kalash
export function TempleWatermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
      {/* Traditional Indian Sacred Kalash / Mandala Outline */}
      <svg width="600" height="600" viewBox="0 0 100 100" fill="none" className="text-brand-accent/25 max-w-[85vw]">
        {/* Outermost intricate geometric circle */}
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 1" />
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.2" />

        {/* Traditional 16-petal lotus design in the background */}
        {[...Array(16)].map((_, idx) => {
          const rotation = idx * 22.5;
          return (
            <g key={idx} transform={`rotate(${rotation} 50 50)`}>
              <path d="M 50 8 C 47 22, 53 22, 50 8 Z" fill="currentColor" opacity="0.15" />
              <path d="M 50 8 C 45 20, 55 20, 50 8" stroke="currentColor" strokeWidth="0.3" />
            </g>
          );
        })}

        {/* Innermost mandala ring */}
        <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="0.4" />
        
        {/* Sacred Kalash Vector inside */}
        <g transform="translate(32, 32) scale(0.36)" className="text-brand-accent">
          {/* Coconut leaves */}
          <path d="M 50 15 C 38 35, 48 45, 48 45 C 48 45, 58 35, 50 15" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <path d="M 50 15 C 28 32, 42 45, 42 45 C 42 45, 54 35, 50 15" fill="currentColor" stroke="currentColor" strokeWidth="1" opacity="0.8" />
          <path d="M 50 15 C 68 32, 54 45, 54 45 C 54 45, 42 35, 50 15" fill="currentColor" stroke="currentColor" strokeWidth="1" opacity="0.8" />
          
          {/* Coconut top */}
          <path d="M 40 45 C 40 32, 60 32, 60 45 Z" fill="currentColor" />

          {/* Golden Pot / Kalash vessel body */}
          <path d="M 32 50 C 32 45, 68 45, 68 50 L 72 58 C 76 65, 78 75, 50 84 C 22 75, 24 65, 28 58 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="18" ry="4" fill="#FAF5EB" opacity="0.2" />

          {/* Swastika/Auspicious lines on Kalash */}
          <path d="M 50 56 L 50 72 M 42 64 L 58 64 M 42 58 L 42 64 M 58 64 L 58 70 M 50 56 L 56 56 M 50 72 L 44 72" stroke="#FAF5EB" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// Gorgeous Traditional Indian Border Divider
export function TempleBorderDivider() {
  return (
    <div className="w-full flex items-center justify-center py-6 pointer-events-none select-none">
      <div className="flex items-center gap-3 w-full max-w-4xl px-6">
        <div className="h-[1.5px] flex-grow bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-accent/50" />
        
        {/* Centerpiece: Diya lamp with dynamic subtle flame pulse */}
        <div className="flex items-center gap-2 text-brand-gold">
          {/* Left floral accent */}
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-brand-accent opacity-60">
            <path d="M24 10 C18 10, 14 6, 12 0 C10 6, 6 10, 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Sacred Diya (Oil Lamp) SVG */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Flame */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 0.98, 1.1, 1],
                opacity: [0.9, 1, 0.85, 1, 0.9],
                y: [0, -1, 0.5, -0.5, 0]
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 w-3 h-5 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-100 rounded-full blur-[0.5px] shadow-[0_-3px_8px_rgba(251,146,60,0.8)]"
              style={{ transformOrigin: "bottom center" }}
            />
            {/* Brass lamp container */}
            <svg width="34" height="20" viewBox="0 0 34 20" fill="currentColor">
              <path d="M 2 8 C 2 16, 32 16, 32 8 C 32 8, 28 18, 17 18 C 6 18, 2 8, 2 8" fill="url(#brass-grad-dark)" />
              {/* Stand */}
              <path d="M 12 18 L 10 20 L 24 20 L 22 18 Z" fill="url(#brass-grad)" />
            </svg>
          </div>

          {/* Right floral accent */}
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-brand-accent opacity-60 rotate-180">
            <path d="M24 10 C18 10, 14 6, 12 0 C10 6, 6 10, 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="h-[1.5px] flex-grow bg-gradient-to-l from-transparent via-brand-gold/40 to-brand-accent/50" />
      </div>
    </div>
  );
}

// Gorgeous traditional lengthy vertical and horizontal tied flower garlands (Genda Phool & Jasmine/Mogra strands)
export function TempleFlowerGarlands() {
  // Multi-length vertical strings hanging from the top ceiling garland
  const strands = [
    { left: '4%', height: '140px', delay: 0 },
    { left: '12%', height: '80px', delay: 0.3 },
    { left: '22%', height: '110px', delay: 0.6 },
    { left: '32%', height: '70px', delay: 0.9 },
    { left: '42%', height: '130px', delay: 1.2 },
    { left: '50%', height: '90px', delay: 1.5 },
    { left: '58%', height: '130px', delay: 1.2 },
    { left: '68%', height: '70px', delay: 0.9 },
    { left: '78%', height: '110px', delay: 0.6 },
    { left: '88%', height: '80px', delay: 0.3 },
    { left: '96%', height: '140px', delay: 0 },
  ];

  return (
    <div className="absolute top-0 inset-x-0 h-48 z-25 pointer-events-none select-none overflow-hidden">
      {/* Thick horizontal tied flower garland (Genda Phool / Marigold Mala) running edge-to-edge */}
      <div className="w-full h-3 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 flex justify-between items-center shadow-sm relative">
        {[...Array(48)].map((_, i) => (
          <div key={i} className="flex -space-x-1">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-300" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border border-yellow-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-emerald-100" />
          </div>
        ))}
      </div>

      {/* Decorative vertical hanging tied lengthy flower strings */}
      {strands.map((strand, index) => {
        const heightVal = parseInt(strand.height);
        const nodeCount = Math.floor(heightVal / 14);
        return (
          <motion.div
            key={index}
            style={{ left: strand.left, transformOrigin: 'top center' }}
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{
              duration: 3.5 + (index % 3) * 0.5,
              delay: strand.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-3 flex flex-col items-center"
          >
            {/* Hanging thread */}
            <div className="w-[1px] h-3 bg-amber-800/30" />

            {/* Alternating flower buds */}
            {[...Array(nodeCount)].map((_, nodeIdx) => {
              const isMarigold = nodeIdx % 2 === 0;
              const isOrange = nodeIdx % 4 === 0;
              const isLast = nodeIdx === nodeCount - 1;

              if (isLast) {
                return (
                  <div key={nodeIdx} className="flex flex-col items-center">
                    {/* Deep red rose bud or hanging pendant flower */}
                    <div className="w-4 h-4 rounded-full bg-brand-accent border border-brand-gold shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    </div>
                    {/* Hanging mini bell */}
                    <div className="w-[1.5px] h-2 bg-brand-gold/60" />
                    <div className="w-3 h-3 rounded-b-md bg-gradient-to-b from-brand-gold to-brand-candid-dark border border-brand-accent/20" />
                  </div>
                );
              }

              if (isMarigold) {
                return (
                  <div key={nodeIdx} className="flex flex-col items-center -my-[1px]">
                    <div className={`w-3.5 h-3.5 rounded-full ${isOrange ? 'bg-orange-600' : 'bg-amber-400'} border border-amber-200 shadow-2xs flex items-center justify-center`}>
                      <div className="w-1 h-1 rounded-full bg-orange-500" />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={nodeIdx} className="flex flex-col items-center -my-[1px]">
                    <div className="flex -space-x-0.5">
                      <div className="w-2.5 h-2 rounded-full bg-white border border-emerald-500/10 shadow-3xs rotate-45" />
                      <div className="w-2.5 h-2 rounded-full bg-white border border-emerald-500/10 shadow-3xs -rotate-45" />
                    </div>
                  </div>
                );
              }
            })}
          </motion.div>
        );
      })}
    </div>
  );
}
