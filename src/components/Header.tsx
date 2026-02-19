import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollLink } from './ScrollLink';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
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
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[98%] md:w-full md:max-w-fit',
        isScrolled ? 'top-4' : 'top-8'
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-between md:justify-start gap-4 p-3 md:p-4 rounded-full border border-gray-200 shadow-md transition-all duration-500 w-full md:w-auto",
          isScrolled ? "bg-white/98 px-6 md:pr-6 md:pl-10" : "bg-white/90 px-6 md:pr-6 md:pl-10"
        )}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* Logo Section */}
        <div className={cn('flex items-center gap-4 relative z-10', isRTL && 'order-last md:order-first')}>
          <a href="#" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <img
              src={kitesLogo}
              alt="KITES Holding Group"
              className="h-8 md:h-12 w-auto object-contain shrink-0"
            />
            <span className="text-gray-900 font-bold tracking-[0.2em] text-xs md:text-sm uppercase whitespace-nowrap">
              KITES HOLDING GROUP
            </span>
          </a>
        </div>

        {/* Vertical Divider */}
        <div className={cn("h-8 w-px bg-gray-200 hidden lg:block relative z-10", isRTL ? "mr-10 ml-4" : "ml-10 mr-4")} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 relative z-10 mx-2">
          {navLinks.map((link) => (
            <div key={link.key} className="relative group">
              <ScrollLink
                to={link.id}
                className="relative px-3 py-3 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors duration-300 group overflow-hidden rounded-full block"
              >
                <div className="relative z-10 flex items-center gap-1">
                  <span>{t(`nav.${link.key}`)}</span>
                  {link.key === 'companies' && (
                    <ChevronDown size={14} className="stroke-[3px]" />
                  )}
                </div>
                <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </ScrollLink>

              {link.key === 'companies' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2 flex flex-col">
                    <a
                      href="https://kitesconsulting.kites.com.kw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-between group/item"
                    >
                      <span className="uppercase tracking-wider">KITES</span>
                      <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href="https://creality.com.kw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-between group/item"
                    >
                      <span className="uppercase tracking-wider">Creality Kuwait</span>
                      <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href="https://www.abyan.com.kw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-between group/item"
                    >
                      <span className="uppercase tracking-wider">Abyan</span>
                      <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions Section */}
        <div className={cn('flex items-center gap-2 relative z-10', isRTL && 'order-first md:order-last')}>
          <button
            onClick={toggleLanguage}
            className="px-5 py-2 text-[10px] font-black tracking-wider rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 uppercase"
          >
            {language === 'en' ? 'العربية' : 'EN'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors border border-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 mx-auto w-[90vw] max-w-md p-2 rounded-[2rem] bg-white border border-gray-200 shadow-xl overflow-hidden animate-fade-in-up">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.key}
                to={link.id}
                className="text-gray-700 text-sm font-medium py-4 px-6 rounded-[1.5rem] hover:bg-gray-100 hover:text-gray-900 transition-all text-center border border-transparent hover:border-gray-200"
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
