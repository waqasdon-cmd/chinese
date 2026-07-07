import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Leaf, ShoppingCart, Info, Sparkles, FilterX } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  darkMode: boolean;
  onAddToCart: (item: MenuItem) => void;
}

type MenuCategory = 'all' | MenuItem['category'];

export default function MenuSection({ darkMode, onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);

  // Menu categories metadata with decorative Hanzi (Chinese characters)
  const categoriesList: { id: MenuCategory; label: string; hanzi: string }[] = [
    { id: 'all', label: 'All Dishes', hanzi: '全部' },
    { id: 'dumplings', label: 'Dumplings', hanzi: '饺子' },
    { id: 'noodles', label: 'Noodles', hanzi: '面条' },
    { id: 'soups', label: 'Soups', hanzi: '汤类' },
    { id: 'rice', label: 'Rice', hanzi: '米饭' },
    { id: 'chicken', label: 'Chicken', hanzi: '鸡肉' },
    { id: 'beef', label: 'Beef', hanzi: '牛肉' },
    { id: 'seafood', label: 'Seafood', hanzi: '海鲜' },
    { id: 'beverages', label: 'Beverages', hanzi: '饮料' }
  ];

  // Perform client-side filtering and searching
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Text Search Match
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary Filters Match
      const matchesVegetarian = !vegetarianOnly || item.isVegetarian === true;
      const matchesSpicy = !spicyOnly || (item.spicyLevel && item.spicyLevel > 0);

      return matchesCategory && matchesSearch && matchesVegetarian && matchesSpicy;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly, spicyOnly]);

  return (
    <section
      id="menu"
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            Discover Our Flavors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Featured Menu
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-300' : 'text-stone-600'}`}>
            Browse our selections of fresh hand-pinched dim sum, artisanal pulled noodles, stir-fried delights, and specialty beverages.
          </p>
        </div>

        {/* Filter Toolbar: Search Bar, Category Scroller, Dietary Selectors */}
        <div className="space-y-6 mb-12">
          {/* Search and Quick Filters Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar Input */}
            <div className="relative w-full md:max-w-md group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 group-hover:text-red-500 transition-colors duration-300">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search dumplings, noodles, chicken..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 pl-11 pr-4 text-sm rounded-full border transition-all duration-300 outline-none ${
                  darkMode
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                }`}
              />
            </div>

            {/* Dietary Filter Toggles */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              {/* Veg Toggle */}
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium tracking-wide transition-all duration-300 ${
                  vegetarianOnly
                    ? 'bg-green-600/10 border-green-500 text-green-500 dark:text-green-400'
                    : darkMode
                    ? 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-950'
                }`}
              >
                <Leaf size={14} className={vegetarianOnly ? 'fill-green-500/20' : ''} />
                <span>Vegetarian</span>
              </button>

              {/* Spicy Toggle */}
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium tracking-wide transition-all duration-300 ${
                  spicyOnly
                    ? 'bg-red-600/10 border-red-500 text-red-500 dark:text-red-400'
                    : darkMode
                    ? 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-950'
                }`}
              >
                <Flame size={14} className={spicyOnly ? 'fill-red-500/20' : ''} />
                <span>Spicy Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs Horizonal Slider */}
          <div className="overflow-x-auto pb-2 scrollbar-none flex gap-2 border-b border-stone-200/50 dark:border-zinc-800/50">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center flex-shrink-0 px-6 py-3 rounded-t-xl transition-all duration-300 relative ${
                    isActive
                      ? 'text-red-500'
                      : darkMode
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span className="text-[10px] tracking-widest font-mono text-amber-500 font-bold mb-0.5">
                    {cat.hanzi}
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {cat.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl overflow-hidden border flex flex-col group h-full shadow-md transition-all duration-300 ${
                  darkMode
                    ? 'bg-zinc-950 border-red-950/10 hover:border-red-500/20 hover:shadow-xl hover:shadow-red-950/5'
                    : 'bg-stone-50 border-stone-200/60 hover:border-red-200 hover:shadow-xl hover:shadow-stone-200/20'
                }`}
              >
                {/* Image frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isSignature && (
                      <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-[9px] font-sans tracking-wider font-extrabold uppercase px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Sparkles size={8} className="fill-white" />
                        Signature
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="bg-amber-500 text-zinc-950 text-[9px] font-sans tracking-wider font-extrabold uppercase px-2 py-1 rounded-md shadow-md">
                        Popular
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="bg-green-600 text-white text-[9px] font-sans tracking-wider font-extrabold uppercase px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Leaf size={8} className="fill-white" />
                        Veg
                      </span>
                    )}
                  </div>

                  {/* Spicy rating overlay */}
                  {item.spicyLevel && item.spicyLevel > 0 ? (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-red-400 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-0.5">
                      {Array.from({ length: item.spicyLevel }).map((_, i) => (
                        <Flame key={i} size={10} className="fill-red-500 stroke-red-500" />
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Info block */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <h3 className="font-serif font-extrabold text-lg sm:text-xl group-hover:text-red-500 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action button row */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-dashed border-stone-200/60 dark:border-zinc-800/60">
                    <span className="font-serif font-black text-lg text-amber-500">
                      Rs {item.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onAddToCart(item)}
                      className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 tracking-wide transition-all duration-300 ${
                        darkMode
                          ? 'bg-zinc-900 hover:bg-red-600 hover:text-white text-zinc-300'
                          : 'bg-stone-100 hover:bg-red-600 hover:text-white text-stone-700'
                      }`}
                    >
                      <ShoppingCart size={12} />
                      <span>Add Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Fallback Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-stone-400 dark:text-zinc-500">
                <FilterX size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg">No Dishes Match Filters</h3>
                <p className={`text-sm max-w-sm mx-auto ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                  Try clearing your search query or enabling different category tabs to browse other delicacies.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setVegetarianOnly(false);
                  setSpicyOnly(false);
                }}
                className="text-xs font-medium text-red-500 hover:underline hover:text-red-600"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
