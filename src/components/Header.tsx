import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ShoppingBag, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
}

export default function Header({
  darkMode,
  setDarkMode,
  cartCount,
  onOpenCart,
  activeSection
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Reservation', href: '#reservation' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-zinc-950/90 border-b border-red-950/30 shadow-lg backdrop-blur-md'
            : 'bg-white/90 border-b border-stone-200/50 shadow-md backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-900/20 group-hover:scale-105 transition-transform duration-300">
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
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-300 relative ${
                    isActive
                      ? 'text-red-500'
                      : darkMode
                      ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-red-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode ? 'text-amber-400 hover:bg-zinc-900' : 'text-stone-500 hover:bg-stone-100'
              }`}
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Floating Shopping Cart */}
            <button
              onClick={onOpenCart}
              className={`p-2 rounded-full relative transition-colors duration-300 ${
                darkMode ? 'text-zinc-300 hover:bg-zinc-900 hover:text-white' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
              aria-label="Open ordering cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Order Now */}
            <button
              onClick={onOpenCart}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-full text-sm font-medium tracking-wide shadow-lg shadow-red-950/20 hover:scale-105 transition-all duration-300"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center lg:hidden gap-2">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode ? 'text-amber-400 hover:bg-zinc-900' : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart (Mobile) */}
            <button
              onClick={onOpenCart}
              className={`p-2 rounded-full relative transition-colors duration-300 ${
                darkMode ? 'text-zinc-300 hover:bg-zinc-900' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                darkMode ? 'text-zinc-300 hover:bg-zinc-900' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-opacity-50 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-full p-6 border-b transition-transform duration-300 shadow-xl ${
            darkMode
              ? 'bg-zinc-950 border-red-950/20 text-white'
              : 'bg-white border-stone-200 text-stone-900'
          } ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`py-2 px-4 rounded-lg font-medium text-base transition-colors ${
                    isActive
                      ? 'bg-red-500/10 text-red-500'
                      : darkMode
                      ? 'hover:bg-zinc-900 text-zinc-300'
                      : 'hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-4 border-t border-dashed border-stone-200 dark:border-zinc-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-medium tracking-wide text-center"
              >
                Order Now
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phoneFormatted}`}
                className={`w-full flex items-center justify-center gap-2 border py-3 rounded-xl font-medium tracking-wide ${
                  darkMode
                    ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <PhoneCall size={16} />
                Call Restaurant
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
