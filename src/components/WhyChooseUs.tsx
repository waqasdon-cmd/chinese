import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';

interface WhyChooseUsProps {
  darkMode: boolean;
}

export default function WhyChooseUs({ darkMode }: WhyChooseUsProps) {
  // Helper to dynamically render a Lucide icon based on its name string
  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return <Icons.Check size={24} />;
    return <IconComponent size={24} />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="why-us"
      className={`py-24 transition-colors duration-500 relative overflow-hidden ${
        darkMode ? 'bg-zinc-900/60 text-white' : 'bg-stone-100 text-stone-900'
      }`}
    >
      {/* Subtle traditional back-mesh element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            Our Commitments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Why Choose Xibai Feng Wei Yuan
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-300' : 'text-stone-600'}`}>
            We go above and beyond to deliver an unforgettable dining experience, keeping traditions close and flavors pristine.
          </p>
        </div>

        {/* 8 Features Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {WHY_CHOOSE_US.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`p-6 rounded-2xl border transition-all duration-350 flex flex-col gap-4 relative group ${
                darkMode
                  ? 'bg-zinc-950/80 border-red-950/20 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/10'
                  : 'bg-white border-stone-200/80 hover:border-red-200 hover:shadow-xl hover:shadow-stone-200/50'
              }`}
            >
              {/* Gold/Red glow in top corner on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Circle wrapper */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-red-600/10 text-red-500 dark:bg-red-500/5 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110">
                {renderIcon(item.iconName)}
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-extrabold text-base sm:text-lg group-hover:text-red-500 transition-colors duration-350">
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-zinc-400' : 'text-stone-500'
                }`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
