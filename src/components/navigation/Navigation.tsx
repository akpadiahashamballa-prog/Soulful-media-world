import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Manifesto', href: '/manifesto' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Journal', href: '/journal' },
    { label: 'Library', href: '/library' },
    { label: 'The Pineapple Code', href: '/pineapple-code' },
    { label: 'Creative Studio', href: '/studio' },
    { label: 'Community', href: '/community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-smw-black/95 backdrop-blur-md border-b border-smw-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-smw-gold to-smw-gold-light rounded-lg flex items-center justify-center">
              <span className="text-smw-black font-serif font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:inline font-serif text-lg text-smw-white">Soulful Media</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-smw-white hover:text-smw-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-smw-gray">
              {navItems.slice(6).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-smw-white hover:text-smw-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-smw-gray rounded-lg transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-smw-white" />
            </button>
            <button className="p-2 hover:bg-smw-gray rounded-lg transition-colors" aria-label="User account">
              <User className="w-5 h-5 text-smw-white" />
            </button>
            <button className="p-2 hover:bg-smw-gray rounded-lg transition-colors relative" aria-label="Shopping cart">
              <ShoppingCart className="w-5 h-5 text-smw-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-smw-gold rounded-full" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-smw-gray rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-smw-white" />
              ) : (
                <Menu className="w-5 h-5 text-smw-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 text-sm font-medium text-smw-white hover:bg-smw-gray rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
