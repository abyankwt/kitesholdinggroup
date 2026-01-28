import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollLink } from './ScrollLink';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import kitesLogo from '@/assets/kites-logo.png';

const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', id: 'hero' },
    { key: 'about', id: 'about' },
    { key: 'innovation', id: 'innovation' },
    { key: 'companies', id: 'companies' },
    { key: 'vision', id: 'vision' },
    { key: 'governance', id: 'governance' },
    { key: 'contact', id: 'contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-fit',
        isScrolled ? 'top-4' : 'top-8'
      )}
    >
      <div
        className={cn(
          "relative flex items-center gap-1 p-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-xl",
          isScrolled ? "bg-black/60 pr-3 pl-8" : "bg-white/[0.03] pr-3 pl-8"
        )}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Logo Section */}
        <div className={cn('flex items-center gap-4 relative z-10', isRTL && 'order-last pl-4 pr-0')}>
          <a href="#" className="block hover:opacity-80 transition-opacity">
            <img
              src={kitesLogo}
              alt="KITES Holding Group"
              className="h-20 w-auto object-contain brightness-0 invert shrink-0"
            />
          </a>
          {/* Vertical Divider */}
          <div className="h-10 w-px bg-white/10 mx-2 hidden lg:block" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 relative z-10 mx-2">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.key}
              to={link.id}
              className={cn(
                'relative px-4 py-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-300 group overflow-hidden rounded-full',
                isScrolled ? 'text-slate-400' : 'text-slate-300'
              )}
            >
              <span className="relative z-10">{t(`nav.${link.key}`)}</span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </ScrollLink>
          ))}
        </nav>

        {/* Actions Section */}
        <div className={cn('flex items-center gap-2 relative z-10 pl-4', isRTL && 'order-first pl-0 pr-4')}>
          <button
            onClick={toggleLanguage}
            className="px-5 py-2 text-[10px] font-black tracking-wider rounded-full border border-white/10 bg-white/5 text-white hover:bg-accent hover:border-accent hover:text-black transition-all duration-300 uppercase"
          >
            {language === 'en' ? 'العربية' : 'EN'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 mx-auto w-[90vw] max-w-md p-2 rounded-[2rem] bg-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.key}
                to={link.id}
                className="text-slate-300 text-sm font-medium py-4 px-6 rounded-[1.5rem] hover:bg-white/10 hover:text-white transition-all text-center border border-transparent hover:border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(`nav.${link.key}`)}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
