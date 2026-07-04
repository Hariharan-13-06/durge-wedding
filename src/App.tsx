import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { COUPLE_NAMES } from "./data";
import ParallaxHero from "./components/ParallaxHero";
import CountdownTimer from "./components/CountdownTimer";
import EngagementGallery from "./components/EngagementGallery";
import Schedule from "./components/Schedule";
import RSVPForm from "./components/RSVPForm";
import {
  TemplePillar,
  TempleToran,
  TempleBorderDivider,
  TempleFlowerGarlands,
} from "./components/TempleDecoration";
import {
  Heart,
  Music,
  VolumeX,
  Menu,
  X,
  ArrowUp,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import { RSVPData } from "./types";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalRSVPs, setTotalRSVPs] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  // Setup global page-level parallax scroll trackers
  const { scrollYProgress } = useScroll();
  const yBgGlobal = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scaleBgGlobal = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Track scroll position for navigation fading and parallax thresholds
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial RSVP count calculation
    const savedRsvps = JSON.parse(
      localStorage.getItem("wedding_rsvps") || "[]",
    );
    const totalAttending = savedRsvps.reduce((acc: number, item: any) => {
      return item.attending === "yes" ? acc + (item.guestsCount || 1) : acc;
    }, 0);
    setTotalRSVPs(totalAttending);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewRSVP = (rsvp: RSVPData) => {
    // Re-calculate RSVP counts when a new one is submitted
    const savedRsvps = JSON.parse(
      localStorage.getItem("wedding_rsvps") || "[]",
    );
    const totalAttending = savedRsvps.reduce((acc: number, item: any) => {
      return item.attending === "yes" ? acc + (item.guestsCount || 1) : acc;
    }, 0);
    setTotalRSVPs(totalAttending);

    setNotificationMsg(
      rsvp.attending === "yes"
        ? `Yay! You're added to the celebration guestlist!`
        : `Thank you for letting us know! We'll miss you.`,
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const navLinks = [
    { href: "#countdown-section", label: "Details" },
    { href: "#gallery-section", label: "Gallery" },
    { href: "#schedule-section", label: "Schedule" },
    { href: "#rsvp-section", label: "RSVP" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-sand/30 selection:text-brand-text scroll-smooth antialiased px-0 md:px-24 lg:px-32">
      {/* Traditional Temple Pillars on the sides to frame the Kalyana Mandapam */}
      <TemplePillar side="left" />
      <TemplePillar side="right" />

      {/* Traditional festive Mango leaves toran at the very top of the page */}
      <TempleToran />

      {/* Traditional lengthy tied flower garlands on top of the page */}
      <TempleFlowerGarlands />

      {/* GLOBAL PARALLAX BACKGROUND - Tracks window scroll till the end of the page */}
      <motion.div
        style={{ y: yBgGlobal, scale: scaleBgGlobal }}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      >
        <img
          src="/src/assets/images/wedding_hero_bg_1783162458954.jpg"
          alt="Watercolor Sky Background"
          className="w-full h-full object-cover origin-bottom opacity-[0.22] select-none filter sepia-[0.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant gradient overlay to blend into the brand background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-brand-bg/40 to-brand-bg opacity-95" />
      </motion.div>

      {/* 1. TOP STATUS / NAV BAR (Slides down after scroll threshold, beautiful and elegant) */}
      <AnimatePresence>
        {scrollY > 200 && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 inset-x-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-sand/30 shadow-[0_4px_30px_rgba(139,126,102,0.04)]"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* Couple Branding Monogram */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors cursor-pointer group"
              >
                <span className="font-serif text-lg md:text-xl tracking-wider">
                  {COUPLE_NAMES.groom}{" "}
                  <span className="font-serif italic font-light text-brand-accent/80">
                    &
                  </span>{" "}
                  {COUPLE_NAMES.bride}
                </span>
                <Heart className="w-3.5 h-3.5 text-brand-accent/40 fill-brand-accent/10 group-hover:scale-125 group-hover:text-brand-accent transition-all" />
              </button>

              {/* Desktop Menu Links */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-brand-text/80 hover:text-brand-text text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 group cursor-pointer"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
              </nav>

              {/* Quick controls (Music simulated sound track, Mobile menu icon) */}
              <div className="flex items-center gap-3">
                {/* Ambient Music player simulator */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-full border border-brand-sand/40 hover:border-brand-accent/30 text-brand-text hover:text-brand-accent bg-white/50 hover:bg-white transition-all cursor-pointer relative group"
                  title={
                    isMuted ? "Unmute Ambient Music" : "Mute Ambient Music"
                  }
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-brand-text/60" />
                  ) : (
                    <>
                      <Music className="w-4 h-4 text-brand-accent animate-bounce" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2.5 rounded-full border border-brand-sand/40 hover:border-brand-accent/30 text-brand-text bg-white/50 cursor-pointer"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* 2. MOBILE EXPANDED MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-30 bg-brand-bg border-b border-brand-sand/30 shadow-xl md:hidden p-6"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-brand-text hover:text-brand-accent font-serif text-lg py-1.5 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. PARALLAX HERO SECTION */}
      <ParallaxHero />

      <TempleBorderDivider />

      {/* 4. DETAILS, COUNTDOWN, AND LOCATION HEADER */}
      <CountdownTimer />

      <TempleBorderDivider />

      {!isMuted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md border border-brand-sand/40 rounded-2xl p-3 shadow-lg flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-brand-sand/30 text-brand-accent">
            <Music className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">
              Playing Ambient
            </p>
            <p className="text-xs text-brand-text/80 font-serif italic">
              "Autumn Leaves Piano Theme"
            </p>
          </div>
          <button
            onClick={() => setIsMuted(true)}
            className="text-brand-text/40 hover:text-brand-text ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* 7. ENGAGEMENT PHOTO GALLERY */}
      <EngagementGallery />

      <TempleBorderDivider />

      {/* 8. WEDDING SCHEDULE / TIMELINE */}
      <Schedule />

      <TempleBorderDivider />

      {/* 9. RSVP FORM */}
      <RSVPForm onRSVPSubmit={handleNewRSVP} />

      {/* 11. FOOTER */}
      <footer className="bg-brand-text text-brand-bg py-16 px-6 relative overflow-hidden border-t border-brand-sand/10">
        {/* Background graphic */}
        <div className="absolute inset-0 opacity-[0.03] flex justify-center items-center pointer-events-none select-none">
          <Heart className="w-96 h-96 fill-white" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide italic font-normal text-brand-sand">
            Thank You for Your Blessings
          </h2>

          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-12 bg-brand-accent/30" />
            <Heart className="w-5 h-5 text-brand-accent fill-brand-accent/10" />
            <div className="h-[1px] w-12 bg-brand-accent/30" />
          </div>

          <p className="text-brand-sand/80 font-serif italic max-w-md mx-auto text-sm md:text-base leading-relaxed">
            "Therefore what God has joined together, let no one separate."
          </p>

          <div className="pt-6">
            <h4 className="font-serif text-lg tracking-wider text-brand-sand">
              {COUPLE_NAMES.groomFull} & {COUPLE_NAMES.brideFull}
            </h4>
            <p className="text-xs tracking-[0.25em] font-medium text-brand-accent uppercase mt-2">
              August 23, 2026 • Thiruttani • Chennai
            </p>
          </div>

          <div className="pt-10 border-t border-brand-accent/10 text-brand-sand/40 text-[10px] tracking-wider uppercase">
            © 2026 Sureth & Durga Wedding Invitation. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 12. SCROLL BACK TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-text hover:bg-brand-text/90 text-brand-bg shadow-xl hover:shadow-brand-text/10 cursor-pointer transition-colors border border-brand-sand/20"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 13. GLOBAL SUCCESS / INTERACTIVE TOAST NOTIFICATION */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-brand-text text-brand-bg border border-brand-sand/30 shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-brand-accent animate-pulse flex-shrink-0" />
            <span className="font-serif italic text-sm md:text-base whitespace-nowrap">
              {notificationMsg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
