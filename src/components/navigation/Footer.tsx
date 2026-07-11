import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import Container from '@/components/common/Container';
import Divider from '@/components/common/Divider';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { label: 'About', href: '/about' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
    content: [
      { label: 'Journal', href: '/journal' },
      { label: 'Library', href: '/library' },
      { label: 'Community', href: '/community' },
      { label: 'Archive', href: '/archive' },
    ],
    marketplace: [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Creative Studio', href: '/studio' },
      { label: 'Sell', href: '/creator' },
      { label: 'Membership', href: '/membership' },
    ],
  };

  return (
    <footer className="bg-smw-dark border-t border-smw-gray mt-24">
      <Container size="lg" className="py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-smw-gold to-smw-gold-light rounded-lg flex items-center justify-center">
                <span className="text-smw-black font-serif font-bold">S</span>
              </div>
              <span className="font-serif text-lg text-smw-white">Soulful</span>
            </Link>
            <p className="text-smw-sage text-sm leading-relaxed">
              A living chronicle of digital civilization. Sanctuary for wisdom, knowledge, and creativity.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-smw-sage hover:text-smw-gold transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-smw-sage hover:text-smw-gold transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-smw-sage hover:text-smw-gold transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-smw-sage hover:text-smw-gold transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-smw-white mb-4 uppercase tracking-wide">Platform</h3>
            <ul className="space-y-3">
              {links.platform.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-smw-sage hover:text-smw-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-smw-white mb-4 uppercase tracking-wide">Content</h3>
            <ul className="space-y-3">
              {links.content.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-smw-sage hover:text-smw-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-smw-white mb-4 uppercase tracking-wide">Marketplace</h3>
            <ul className="space-y-3">
              {links.marketplace.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-smw-sage hover:text-smw-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Divider className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-smw-sage">
          <p>&copy; {currentYear} Soulful Media World. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-smw-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-smw-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-smw-gold transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
