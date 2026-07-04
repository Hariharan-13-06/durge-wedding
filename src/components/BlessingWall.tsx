import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuestBlessing } from '../types';
import { INITIAL_BLESSINGS } from '../data';
import { Heart, MessageSquare, Plus, Sparkles, Send, Quote, Search } from 'lucide-react';

export default function BlessingWall() {
  const [blessings, setBlessings] = useState<GuestBlessing[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRelation, setFilterRelation] = useState<string>('all');

  // Load blessings from local storage combined with initial mock blessings
  useEffect(() => {
    const savedBlessings = localStorage.getItem('wedding_blessings');
    if (savedBlessings) {
      setBlessings(JSON.parse(savedBlessings));
    } else {
      setBlessings(INITIAL_BLESSINGS);
      localStorage.setItem('wedding_blessings', JSON.stringify(INITIAL_BLESSINGS));
    }
  }, []);

  const [newBlessing, setNewBlessing] = useState({
    name: '',
    relation: 'Friend',
    blessing: ''
  });
  const [formError, setFormError] = useState('');

  const handleLike = (id: string) => {
    const updated = blessings.map(b => {
      if (b.id === id) {
        return { ...b, likes: b.likes + 1 };
      }
      return b;
    });
    setBlessings(updated);
    localStorage.setItem('wedding_blessings', JSON.stringify(updated));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlessing.name.trim() || !newBlessing.blessing.trim()) {
      setFormError('Please fill in both your name and your blessing.');
      return;
    }

    const blessingObj: GuestBlessing = {
      id: 'custom-' + Date.now(),
      name: newBlessing.name,
      relation: newBlessing.relation,
      blessing: newBlessing.blessing,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updated = [blessingObj, ...blessings];
    setBlessings(updated);
    localStorage.setItem('wedding_blessings', JSON.stringify(updated));

    // Reset Form
    setNewBlessing({ name: '', relation: 'Friend', blessing: '' });
    setFormError('');
    setShowAddForm(false);
  };

  // Extract unique relations for filter
  const allRelations = ['all', 'Friend', 'Family', 'Mother of the Groom', 'Father of the Bride', 'Best Friend', 'College Friends'];

  const filteredBlessings = blessings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.blessing.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRelation = filterRelation === 'all' || b.relation.toLowerCase().includes(filterRelation.toLowerCase());
    return matchesSearch && matchesRelation;
  });

  return (
    <section id="blessings-section" className="py-24 px-4 bg-brand-bg/85 backdrop-blur-xs relative overflow-hidden text-brand-text">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-sand/30 text-brand-accent text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Guestbook
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-text font-normal tracking-wide">
                Wedding Blessing Wall
              </h2>
              <div className="w-12 h-[1px] bg-brand-accent/40 my-2" />
              <p className="text-sm md:text-base text-brand-accent font-serif italic">
                Leave a beautiful wish or message for the couple to cherish.
              </p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start md:self-center px-6 py-3.5 rounded-full bg-brand-text hover:bg-brand-text/90 text-brand-bg text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-brand-text/15"
          >
            <Plus className={`w-4 h-4 transition-transform duration-300 ${showAddForm ? 'rotate-45' : ''}`} />
            {showAddForm ? 'Close Drawer' : 'Leave a Blessing'}
          </motion.button>
        </div>

        {/* Floating Add Blessing Drawer */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form 
                onSubmit={handleSubmit}
                className="bg-brand-sand/10 border border-brand-sand/30 rounded-2xl p-6 md:p-8 space-y-4 max-w-2xl mx-auto"
              >
                <h3 className="font-serif text-lg text-brand-text font-medium">Write Your Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="blessing-name" className="text-[10px] font-bold uppercase tracking-widest text-brand-text/70 block">
                      Your Name
                    </label>
                    <input
                      id="blessing-name"
                      type="text"
                      value={newBlessing.name}
                      onChange={(e) => setNewBlessing({ ...newBlessing, name: e.target.value })}
                      placeholder="e.g. Uncle Arthur"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-sand/40 bg-white/80 text-brand-text text-sm focus:outline-none focus:border-brand-accent focus:bg-white transition-all"
                    />
                  </div>

                  {/* Relationship Select */}
                  <div className="space-y-1">
                    <label htmlFor="blessing-relation" className="text-[10px] font-bold uppercase tracking-widest text-brand-text/70 block">
                      Your Relationship
                    </label>
                    <select
                      id="blessing-relation"
                      value={newBlessing.relation}
                      onChange={(e) => setNewBlessing({ ...newBlessing, relation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-sand/40 bg-white/80 text-brand-text text-sm focus:outline-none focus:border-brand-accent focus:bg-white cursor-pointer transition-all"
                    >
                      <option value="Friend">Friend of Sophia</option>
                      <option value="Friend">Friend of Ethan</option>
                      <option value="Family">Family Member</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Wellwisher">Well-wisher</option>
                    </select>
                  </div>
                </div>

                {/* Blessing message */}
                <div className="space-y-1">
                  <label htmlFor="blessing-text" className="text-[10px] font-bold uppercase tracking-widest text-brand-text/70 block">
                    Your Blessing
                  </label>
                  <textarea
                    id="blessing-text"
                    value={newBlessing.blessing}
                    onChange={(e) => setNewBlessing({ ...newBlessing, blessing: e.target.value })}
                    placeholder="Wishing you a lifetime of happiness, love, and light..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-sand/40 bg-white/80 text-brand-text text-sm focus:outline-none focus:border-brand-accent focus:bg-white resize-none transition-all"
                  />
                </div>

                {formError && <p className="text-red-500 text-xs font-medium">{formError}</p>}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-brand-text hover:bg-brand-text/90 text-brand-bg text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-text/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Blessing
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b border-brand-sand/20">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blessings..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-sand/40 focus:outline-none focus:border-brand-accent text-brand-text bg-white/80 transition-all"
            />
            <Search className="w-4 h-4 text-brand-accent/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Relation Quick Filter */}
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {['all', 'Friend', 'Family'].map((rel) => (
              <button
                key={rel}
                onClick={() => setFilterRelation(rel)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap cursor-pointer border ${
                  filterRelation === rel
                    ? 'bg-brand-sand/30 border-brand-accent/20 text-brand-text'
                    : 'bg-white border-brand-sand/40 text-brand-text/75 hover:text-brand-text'
                }`}
              >
                {rel === 'all' ? 'All Wishes' : rel}
              </button>
            ))}
          </div>
        </div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredBlessings.map((b) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
                className="bg-white/60 border border-brand-sand/30 rounded-2xl p-6 md:p-8 relative flex flex-col justify-between hover:shadow-[0_12px_25px_-6px_rgba(139,126,102,0.15)] hover:border-brand-accent/20 transition-all duration-300 group"
              >
                {/* Quote watermark icon */}
                <div className="absolute top-6 right-6 opacity-[0.03] text-brand-accent pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-300">
                  <Quote className="w-12 h-12 rotate-180 fill-current" />
                </div>

                <div>
                  {/* Header metadata */}
                  <div className="mb-4">
                    <h4 className="font-serif font-semibold text-brand-text text-base md:text-lg mb-0.5">
                      {b.name}
                    </h4>
                    <span className="text-[10px] font-bold tracking-widest text-brand-accent bg-brand-sand/30 px-2 py-0.5 rounded border border-brand-accent/10 uppercase">
                      {b.relation}
                    </span>
                  </div>

                  {/* Blessing note */}
                  <p className="text-brand-text/90 font-serif italic text-sm md:text-base leading-relaxed mb-6">
                    "{b.blessing}"
                  </p>
                </div>

                {/* Card footer like button & date */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-sand/20">
                  <span className="text-[10px] text-brand-accent/60 font-medium font-sans">
                    {new Date(b.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleLike(b.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-text/60 hover:text-brand-accent font-semibold group/btn transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 transition-transform duration-300 group-hover/btn:scale-125 ${b.likes > 0 ? 'fill-rose-500 stroke-rose-500 text-rose-500' : ''}`} />
                    <span>{b.likes} Likes</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBlessings.length === 0 && (
          <div className="text-center py-16 text-brand-accent/60 font-serif italic">
            No matching blessings found. Be the first to leave a wish!
          </div>
        )}

      </div>
    </section>
  );
}
