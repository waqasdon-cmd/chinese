import { useState, useEffect } from 'react';
import { ArrowUp, PhoneCall, MessageSquare } from 'lucide-react';

// Import our custom modular panels
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import SignatureDishes from './components/SignatureDishes';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ReservationSection from './components/ReservationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';

import { MenuItem } from './types';
import { RESTAURANT_INFO } from './data';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function App() {
  // Theme defaults to true (Premium Dark) as requested
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Sync dark class on document element and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Initial luxury spinner loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Back to top scroll button indicator & Intersection Observer for navigation links
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    // Set up observer for section scroll tracking
    const sections = ['home', 'about', 'why-us', 'menu', 'gallery', 'reviews', 'reservation', 'contact'];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Shopping Cart Quantity management
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((cart) => cart.item.id === item.id);
      if (existing) {
        return prev.map((cart) =>
          cart.item.id === item.id ? { ...cart, quantity: cart.quantity + 1 } : cart
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    // Open cart drawer on adding item for immediate positive feedback
    setCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((cart) =>
          cart.item.id === itemId ? { ...cart, quantity: cart.quantity + delta } : cart
        )
        .filter((cart) => cart.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white font-serif select-none">
        <div className="relative flex flex-col items-center space-y-6">
          {/* Pulsating logo ring */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-2xl animate-spin shadow-red-900/40">
            <span className="text-white font-serif font-black text-2xl transform -rotate-12">西</span>
          </div>
          <div className="text-center space-y-1">
            <h1 className="font-bold tracking-widest text-xl uppercase leading-none">Xibai Feng Wei Yuan</h1>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-sans block mt-1">Authentic Chinese</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      darkMode ? 'dark bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
    }`}>
      {/* Navigation Sticky Bar */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <WhyChooseUs darkMode={darkMode} />
        <SignatureDishes darkMode={darkMode} onAddToCart={handleAddToCart} />
        <MenuSection darkMode={darkMode} onAddToCart={handleAddToCart} />
        <GallerySection darkMode={darkMode} />
        <ReviewsSection darkMode={darkMode} />
        <ReservationSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>

      {/* Sitemap Footer */}
      <Footer darkMode={darkMode} />

      {/* Order Drawer slide out */}
      <OrderDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        darkMode={darkMode}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Pulsating Floating Actions Panel */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* Floating Call trigger */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneFormatted}`}
          className="p-4 rounded-full bg-amber-500 text-zinc-950 shadow-xl shadow-amber-950/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-pulse"
          title="Call Now"
          aria-label="Call Restaurant Phone Line"
        >
          <PhoneCall size={18} />
        </a>

        {/* Floating WhatsApp trigger */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full bg-green-500 text-white shadow-xl shadow-green-950/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="WhatsApp Chat"
          aria-label="WhatsApp Restaurant Live Link"
        >
          <MessageSquare size={18} className="fill-white/15" />
        </a>
      </div>

      {/* Back to Top scroll button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 outline-none ${
            darkMode
              ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 shadow-black'
              : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 shadow-stone-200/50'
          }`}
          title="Back to top"
          aria-label="Back to Top Button"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
