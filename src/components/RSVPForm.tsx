import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RSVPData } from '../types';
import { CheckCircle, Mail, Users, MessageSquare, Coffee, Send, Heart } from 'lucide-react';
import { TempleWatermark } from './TempleDecoration';

interface RSVPFormProps {
  onRSVPSubmit: (rsvp: RSVPData) => void;
}

export default function RSVPForm({ onRSVPSubmit }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes' as 'yes' | 'no',
    guestsCount: 1,
    dietaryRestrictions: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const rsvp: RSVPData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Save to local storage for persistence across reloads
    const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([...existingRsvps, rsvp]));

    onRSVPSubmit(rsvp);
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp-section" className="py-24 px-4 bg-brand-bg/85 backdrop-blur-xs relative overflow-hidden text-brand-text">
      {/* Traditional Temple Watermark Background */}
      <TempleWatermark />

      {/* Subtle border accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="p-2 rounded-full bg-brand-sand/30 text-brand-accent mb-3 border border-brand-accent/20">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-3 font-normal tracking-wide">
              Kindly RSVP
            </h2>
            <div className="w-12 h-[1px] bg-brand-accent/40 my-2" />
            <p className="text-sm md:text-base text-brand-accent max-w-lg font-serif italic">
              Please respond by August 10, 2026. We can't wait to share our celebration with you.
            </p>
          </motion.div>
        </div>

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={handleSubmit}
                className="bg-white/60 backdrop-blur-sm border border-brand-sand/30 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(139,126,102,0.15)] space-y-6"
              >
                {/* Attending Selection */}
                <div className="flex gap-4 p-1 bg-brand-sand/20 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      formData.attending === 'yes'
                        ? 'bg-brand-text text-brand-bg shadow-md'
                        : 'text-brand-text/60 hover:text-brand-text'
                    }`}
                  >
                    Joyfully Attend
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      formData.attending === 'no'
                        ? 'bg-brand-accent text-brand-bg shadow-md'
                        : 'text-brand-text/60 hover:text-brand-text'
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-widest text-brand-text block">
                    Your Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Liam Sterling"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/85 text-brand-text text-sm focus:bg-white focus:outline-none transition-all duration-300 ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-brand-sand/50 focus:border-brand-accent'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-widest text-brand-text block">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. liam@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/85 text-brand-text text-sm focus:bg-white focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-brand-sand/50 focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                {/* Guests Count (Only visible if attending) */}
                {formData.attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 text-left overflow-hidden"
                  >
                    <label htmlFor="guests-select" className="text-xs font-bold uppercase tracking-widest text-brand-text block">
                      Number of Guests (including you)
                    </label>
                    <div className="relative">
                      <select
                        id="guests-select"
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-sand/50 bg-white/85 text-brand-text text-sm focus:bg-white focus:border-brand-accent focus:outline-none appearance-none cursor-pointer transition-all duration-300"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-accent">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Dietary restrictions (Only visible if attending) */}
                {formData.attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 text-left overflow-hidden"
                  >
                    <label htmlFor="dietary-input" className="text-xs font-bold uppercase tracking-widest text-brand-text block">
                      Dietary Restrictions
                    </label>
                    <input
                      id="dietary-input"
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                      placeholder="e.g. Vegetarian, Gluten-free, none"
                      className="w-full px-4 py-3 rounded-xl border border-brand-sand/50 bg-white/85 text-brand-text text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                )}

                {/* Blessings message */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message-input" className="text-xs font-bold uppercase tracking-widest text-brand-text block">
                    Message to the Couple
                  </label>
                  <textarea
                    id="message-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Leave a sweet word of congratulations..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-brand-sand/50 bg-white/85 text-brand-text text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-text hover:bg-brand-text/95 text-brand-bg font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-text/10"
                >
                  <Send className="w-4 h-4" />
                  Submit RSVP
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/60 backdrop-blur-sm border border-brand-sand/30 rounded-3xl p-10 shadow-[0_20px_50px_rgba(139,126,102,0.15)] text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-sand/30 text-brand-accent flex items-center justify-center mx-auto border border-brand-accent/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-brand-text">Thank You, {formData.name}!</h3>
                  <p className="text-brand-accent/90 font-serif italic text-sm md:text-base">
                    {formData.attending === 'yes'
                      ? `We are incredibly thrilled to celebrate with you on August 23rd!`
                      : `We will miss you! Thank you for sending your warm wishes.`}
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        attending: 'yes',
                        guestsCount: 1,
                        dietaryRestrictions: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full border border-brand-sand/40 hover:border-brand-accent/30 text-brand-text/80 hover:text-brand-text text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer"
                  >
                    Submit Another RSVP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
