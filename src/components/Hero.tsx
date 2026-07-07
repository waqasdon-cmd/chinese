import { motion } from 'motion/react';
import { heroDishImg } from '../data';
import { Calendar, ChevronDown, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroDishImg}
          alt="Premium Chinese Banquet Cooking"
          className="w-full h-full object-cover object-center transform scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient overlays to ensure text legibility in both light and dark mode */}
        <div className={`absolute inset-0 mix-blend-multiply transition-colors duration-500 ${
          darkMode ? 'bg-zinc-950/70' : 'bg-stone-900/40'
        }`} />
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent transition-colors duration-500 ${
          darkMode ? 'from-zinc-950 to-zinc-950/20' : 'from-stone-50 to-stone-900/10'
        }`} />
      </div>

      {/* Decorative Traditional Element Background */}
      <div className="absolute right-0 top-1/4 h-96 w-96 opacity-5 pointer-events-none border border-amber-500 rounded-full flex items-center justify-center">
        <div className="h-80 w-80 border border-dashed border-amber-500 rounded-full" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-20">
        {/* Small Traditional Accent Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-amber-500 text-xs tracking-[0.25em] uppercase font-semibold mb-6"
        >
          <UtensilsCrossed size={12} className="text-red-500" />
          <span>Xibai Feng Wei Yuan</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 ${
            darkMode ? 'text-white' : 'text-stone-900'
          }`}
        >
          Authentic Chinese Cuisine <br />
          <span className="bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent">
            In Islamabad
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10 ${
            darkMode ? 'text-zinc-300' : 'text-stone-850'
          }`}
        >
          Experience traditional Chinese flavors, handcrafted dumplings, freshly made noodles,
          signature soups, and premium dining at Xibai Feng Wei Yuan.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => scrollToSection('#menu')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium tracking-wide shadow-xl shadow-red-900/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <UtensilsCrossed size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            View Our Menu
          </button>
          <button
            onClick={() => scrollToSection('#reservation')}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-medium tracking-wide border-2 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${
              darkMode
                ? 'border-amber-500/50 hover:border-amber-400 text-amber-400 hover:bg-amber-500/5'
                : 'border-stone-800 hover:border-stone-900 text-stone-800 hover:bg-stone-900/5'
            }`}
          >
            <Calendar size={18} />
            Reserve Table
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <button
          onClick={() => scrollToSection('#about')}
          className={`flex flex-col items-center gap-1.5 text-xs tracking-widest uppercase transition-colors hover:text-amber-500 ${
            darkMode ? 'text-zinc-500' : 'text-stone-500'
          }`}
          aria-label="Scroll to about"
        >
          <span>Discover</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
