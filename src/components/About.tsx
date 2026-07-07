import { motion } from 'motion/react';
import { restaurantInteriorImg } from '../data';
import { ChefHat, Flame, Sparkles } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Story & Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Honoring the Heritage of <br />
                <span className="bg-gradient-to-r from-red-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
                  Authentic Chinese Flavors
                </span>
              </h2>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-zinc-300' : 'text-stone-700'
            }`}>
              At <strong>Xibai Feng Wei Yuan</strong>, our kitchen is a canvas of culinary history.
              We prepare each dish using timeless Chinese recipes, premium fresh ingredients,
              and centuries-old wok cooking techniques. From the perfect elasticity of our hand-pulled noodles
              to the exquisite broth folded inside our Xiao Long Bao, we bring the soul of authentic
              Chinese dining directly to Islamabad.
            </p>

            <p className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-stone-600'
            }`}>
              Whether you are sharing a comforting family dining pot, hosting a professional business meeting,
              or laughing with close friends, our elegant atmosphere and friendly hospitality are designed
              to make your experience unforgettable.
            </p>

            {/* Quick highlights block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
                darkMode ? 'bg-zinc-900/40 border-red-950/20' : 'bg-white border-stone-200'
              }`}>
                <div className="text-red-500"><Flame size={24} /></div>
                <h3 className="font-serif font-bold text-sm">Wok Hei Technique</h3>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>High heat cooking that locks in smoky flavor.</p>
              </div>

              <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
                darkMode ? 'bg-zinc-900/40 border-red-950/20' : 'bg-white border-stone-200'
              }`}>
                <div className="text-amber-500"><Sparkles size={24} /></div>
                <h3 className="font-serif font-bold text-sm">Fresh Ingredients</h3>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Sourced daily for clean, vibrant tastes.</p>
              </div>

              <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
                darkMode ? 'bg-zinc-900/40 border-red-950/20' : 'bg-white border-stone-200'
              }`}>
                <div className="text-red-500"><ChefHat size={24} /></div>
                <h3 className="font-serif font-bold text-sm">Master Chefs</h3>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Decades of professional culinary expertise.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Imagery Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Elegant Background Grid Box */}
            <div className="absolute -top-6 -left-6 w-1/2 h-1/2 border-t-2 border-l-2 border-red-600 rounded-tl-3xl opacity-30" />
            <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 border-b-2 border-r-2 border-amber-500 rounded-br-3xl opacity-30" />

            {/* Central Large Card */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
              darkMode ? 'border border-red-950/20' : 'border border-stone-200'
            }`}>
              <img
                src={restaurantInteriorImg}
                alt="Xibai Feng Wei Yuan Warm Seating Area"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-amber-500 text-xs font-semibold tracking-wider uppercase">Our Dining Room</span>
                <h4 className="font-serif font-bold text-lg mt-1">Comfortable & Cozy Space</h4>
                <p className="text-xs text-zinc-300 mt-1">Perfect for friends, family gatherings, and corporate events.</p>
              </div>
            </div>

            {/* Floating Overlap badge */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-tr from-red-600 to-red-700 text-white py-4 px-6 rounded-2xl shadow-xl flex items-center gap-3">
              <span className="font-serif font-black text-3xl text-amber-400">100%</span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-amber-200 font-medium leading-none">Authentic</span>
                <span className="font-serif text-xs font-bold mt-1">Chinese Flavors</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
