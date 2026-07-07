import { motion } from 'motion/react';
import { Flame, ShoppingCart, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { xiaoLongBaoImg, handmadeNoodlesImg, signatureSoupImg } from '../data';

interface SignatureDishesProps {
  darkMode: boolean;
  onAddToCart: (item: MenuItem) => void;
}

export default function SignatureDishes({ darkMode, onAddToCart }: SignatureDishesProps) {
  // Extract and format the 4 signature items with full menu item schema
  const signatures: MenuItem[] = [
    {
      id: 'dumplings-xlb',
      name: 'Xiao Long Bao (小笼包)',
      category: 'dumplings',
      description: 'Legendary hand-pinched steamed soup dumplings enclosing premium seasoned chicken or minced beef, floating in a burst of piping-hot, richly gelatinized aromatic bone broth.',
      price: 650,
      image: xiaoLongBaoImg,
      spicyLevel: 0,
      isSignature: true,
      isPopular: true
    },
    {
      id: 'noodles-beef',
      name: 'Hand-Pulled Beef Noodles (牛肉拉面)',
      category: 'noodles',
      description: 'Slow-simmered, 12-hour spiced beef broth combined with thick wheat noodles hand-stretched to order. Loaded with tender braised beef shanks, fresh local greens, and rich house chili oil.',
      price: 750,
      image: handmadeNoodlesImg,
      spicyLevel: 2,
      isSignature: true,
      isPopular: true
    },
    {
      id: 'soup-hot-sour',
      name: 'Classic Hot & Sour Soup (酸辣汤)',
      category: 'soups',
      description: 'A velvet, full-bodied master broth balancing mature Chinese black vinegar and fiery white pepper. Substantially packed with wood ear mushrooms, fresh bamboo, and silken tofu.',
      price: 420,
      image: signatureSoupImg,
      spicyLevel: 2,
      isSignature: true,
      isPopular: true
    },
    {
      id: 'dumplings-steamed',
      name: 'Steamed Chicken Chive Dumplings (蒸饺)',
      category: 'dumplings',
      description: 'Traditional thin-wrapped potstickers packed with juicy farm minced chicken and fragrant Chinese chives, steamed to lock in complete savory juices. Served with ginger soy dip.',
      price: 580,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      spicyLevel: 0,
      isSignature: true,
      isPopular: true
    }
  ];

  return (
    <section
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            The Crown Jewels
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Our Signature Dishes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-300' : 'text-stone-600'}`}>
            Indulge in our masterfully crafted, slow-prepared signature offerings that define the authentic gastronomy of Xibai Feng Wei Yuan.
          </p>
        </div>

        {/* Large cards grid */}
        <div className="space-y-16">
          {signatures.map((dish, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Large Food Image Frame */}
                <div className="w-full lg:w-1/2 relative group rounded-3xl overflow-hidden shadow-2xl">
                  {/* Subtle red/gold border accent */}
                  <div className="absolute inset-0 border-2 border-red-600/10 dark:border-red-500/5 group-hover:border-amber-500/30 rounded-3xl transition-colors duration-500 z-10 pointer-events-none" />

                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-80 sm:h-96 lg:h-full min-h-[320px] lg:min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                  {/* Top Corner Signature Label Badge */}
                  <div className="absolute top-4 left-4 bg-amber-500 text-zinc-950 text-[10px] font-sans tracking-widest font-black uppercase py-1.5 px-3 rounded-md flex items-center gap-1.5 shadow-md">
                    <Sparkles size={10} className="fill-zinc-950" />
                    <span>CHEF'S PICK</span>
                  </div>
                </div>

                {/* Information Card Frame */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center space-y-6 p-2 sm:p-6 lg:p-8 rounded-3xl border ${
                  darkMode
                    ? 'bg-zinc-900/30 border-red-950/10'
                    : 'bg-white border-stone-200/50'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-red-500 font-bold uppercase tracking-wider text-xs">
                        {dish.category}
                      </span>
                      {dish.spicyLevel && dish.spicyLevel > 0 ? (
                        <div className="flex items-center gap-0.5 text-red-500" title={`Spicy Level: ${dish.spicyLevel}`}>
                          {Array.from({ length: dish.spicyLevel }).map((_, i) => (
                            <Flame key={i} size={14} className="fill-red-500" />
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <h3 className="font-serif font-black text-2xl sm:text-3xl leading-tight">
                      {dish.name}
                    </h3>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed ${
                    darkMode ? 'text-zinc-300' : 'text-stone-600'
                  }`}>
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-stone-200 dark:border-zinc-800">
                    <div>
                      <span className={`text-xs uppercase font-medium ${
                        darkMode ? 'text-zinc-500' : 'text-stone-400'
                      }`}>
                        Price
                      </span>
                      <div className="font-serif font-black text-2xl text-amber-500">
                        Rs {dish.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(dish)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-6 rounded-full text-sm tracking-wide shadow-lg shadow-red-950/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Order Signature
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
