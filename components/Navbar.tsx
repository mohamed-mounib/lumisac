'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Collection', href: '#collection' },
    { name: 'Order', href: '#order' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        scrolled ? 'bg-brand-void/90 border-b border-brand-fuchsia/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a
            href="#home"
            className="font-playfair text-2xl font-bold text-brand-pink hover:text-brand-fuchsia transition-colors"
          >
            ✨ LumiSac
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-brand-pink transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-brand-pink transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-brand-pink transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
