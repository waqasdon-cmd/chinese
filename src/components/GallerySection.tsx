import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

interface GallerySectionProps {
  darkMode: boolean;
}

type GalleryFilter = 'all' | 'interior' | 'dishes' | 'dumplings' | 'noodles' | 'soups' | 'kitchen';

export default function GallerySection({ darkMode }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Interior' },
    { id: 'dishes', label: 'Dishes' },
    { id: 'dumplings', label: 'Dumplings' },
    { id: 'noodles', label: 'Noodles' },
    { id: 'soups', label: 'Soups' },
    { id: 'kitchen', label: 'Kitchen' }
  ];

  // Filter gallery items based on selection
  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handleOpenLightbox = (itemId: string) => {
    // Find index of the item in the filtered list
    const index = filteredGallery.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0));
    }
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            Visual Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Our Restaurant Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-300' : 'text-stone-600'}`}>
            Take a visual tour of our beautifully-decorated dining hall, fresh ingredients, and the active kitchen preparing hot meals.
          </p>
        </div>

        {/* Filter Slider Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md'
                    : darkMode
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-950 hover:border-stone-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenLightbox(item.id)}
                className={`rounded-2xl overflow-hidden border cursor-pointer relative group aspect-[4/3] shadow-sm transition-all duration-300 ${
                  darkMode ? 'bg-zinc-900 border-red-950/5' : 'bg-white border-stone-200/50'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Overlap overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                  <div className="text-amber-500 absolute top-4 right-4 bg-black/40 p-2 rounded-full backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={16} />
                  </div>
                  <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-white text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 cursor-default"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between w-full text-white">
              <span className="font-mono text-xs text-zinc-500">
                {lightboxIndex + 1} / {filteredGallery.length}
              </span>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-300 outline-none"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Image frame */}
            <div className="flex-grow flex items-center justify-center relative my-6">
              {/* Prev click action */}
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:left-4 z-10 p-3 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-300 outline-none hover:scale-105"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Core Image component */}
              <motion.img
                key={filteredGallery[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                className="max-h-[70vh] max-w-[90vw] md:max-w-[75vw] object-contain rounded-xl shadow-2xl border border-zinc-900"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />

              {/* Next click action */}
              <button
                onClick={handleNext}
                className="absolute right-0 sm:right-4 z-10 p-3 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-300 outline-none hover:scale-105"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom details block */}
            <div
              className="max-w-2xl mx-auto text-center text-white pb-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl mt-1">
                {filteredGallery[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                {filteredGallery[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
