import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Facebook, Instagram, Send, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSuccess(true);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const currentYear = new Date().getFullYear();

  // Structured Schema.org JSON-LD Data for local SEO matching
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Xibai Feng Wei Yuan",
    "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Street 11, I-10/2",
      "addressLocality": "Islamabad",
      "addressRegion": "Islamabad Capital Territory",
      "postalCode": "44000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.6151",
      "longitude": "73.0245"
    },
    "telephone": RESTAURANT_INFO.phoneFormatted,
    "priceRange": "Rs 1 - Rs 1000",
    "servesCuisine": "Authentic Chinese Cuisine, Halal Chinese, Dumplings, Noodles",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "12:00",
      "closes": "23:30"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": RESTAURANT_INFO.googleRating,
      "reviewCount": RESTAURANT_INFO.reviewCount
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
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
    <footer
      className={`pt-16 pb-8 border-t transition-colors duration-500 font-sans relative z-10 ${
        darkMode
          ? 'bg-zinc-950 border-red-950/20 text-zinc-300'
          : 'bg-stone-100 border-stone-200/60 text-stone-700'
      }`}
    >
      {/* Schema.org microdata injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-black text-lg">西</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-serif font-bold tracking-wider text-lg leading-none ${
                  darkMode ? 'text-white' : 'text-stone-900'
                }`}>
                  XIBAI
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-amber-500 font-sans mt-0.5">
                  FENG WEI YUAN
                </span>
              </div>
            </a>

            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-stone-500'}`}>
              Experience traditional Chinese gastronomy at Xibai Feng Wei Yuan. Serving Islamabad’s finest fresh hand-stretched noodles, steam-basket dumplings, and robust wok specialities since inception.
            </p>

            {/* Social Media icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full border transition-colors ${
                  darkMode
                    ? 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-900'
                }`}
                aria-label="Facebook Profile"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full border transition-colors ${
                  darkMode
                    ? 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-900'
                }`}
                aria-label="Instagram Profile"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full border transition-colors ${
                  darkMode
                    ? 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-900'
                }`}
                aria-label="WhatsApp Chat"
              >
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`font-serif font-bold text-sm tracking-widest uppercase ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}>
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-amber-500">Open Daily</p>
              <p className={darkMode ? 'text-zinc-400' : 'text-stone-500'}>12:00 PM – 11:30 PM</p>
              <div className="h-[1px] border-b border-dashed border-stone-200 dark:border-zinc-900 pt-1" />
              <p className="text-[11px] leading-relaxed text-stone-400 dark:text-zinc-500">
                Check-in reservations close 30 minutes before shut-down.
              </p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`font-serif font-bold text-sm tracking-widest uppercase ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}>
              Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Story', href: '#about' },
                { label: 'Why Us', href: '#why-us' },
                { label: 'Food Menu', href: '#menu' },
                { label: 'Gallery Photos', href: '#gallery' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Reservation', href: '#reservation' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`hover:text-red-500 hover:underline transition-colors leading-none py-1 ${
                    darkMode ? 'text-zinc-400' : 'text-stone-500'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className={`font-serif font-bold text-sm tracking-widest uppercase ${
              darkMode ? 'text-white' : 'text-stone-900'
            }`}>
              Newsletter Join
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-stone-500'}`}>
              Subscribe to get seasonal dumpling discount offers and cooking secrets directly.
            </p>

            {success ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs">
                <CheckCircle size={14} className="flex-shrink-0" />
                <span>Successfully Subscribed to our Newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-grow py-2.5 px-4 rounded-xl text-xs border outline-none transition-all ${
                    darkMode
                      ? 'bg-zinc-950 border-zinc-850 text-white placeholder-zinc-500 focus:border-red-500/50'
                      : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-red-500/50'
                  }`}
                />
                <button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Subscribe Button"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider bar */}
        <div className="border-t border-stone-200/50 dark:border-zinc-900/50 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className={darkMode ? 'text-zinc-500' : 'text-stone-400'}>
            &copy; {currentYear} <strong>Xibai Feng Wei Yuan</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className={`hover:underline hover:text-red-500 ${darkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
              Privacy Policy
            </a>
            <a href="#terms" className={`hover:underline hover:text-red-500 ${darkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
