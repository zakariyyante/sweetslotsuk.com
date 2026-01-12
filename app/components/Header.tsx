'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Casinos', href: '#casinos' },
    { name: 'Guide', href: '#guide' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-yellow-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-yellow-400 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-purple-500/20 mt-2 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
