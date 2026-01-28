import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import kitesLogo from '@/assets/kites-logo.png';

const Footer: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();

  const companies = [
    { name: 'KITES', url: 'https://kites-kw.com/' },
    { name: 'Creality Kuwait', url: 'https://creality.com.kw/' },
    { name: 'Abyan', url: 'https://www.abyan.com.kw/' },
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-xl border-t border-white/10 text-slate-300 py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className={cn(
          'grid md:grid-cols-3 gap-12 mb-12',
          isRTL && 'md:grid-flow-col-dense'
        )}>
          {/* Logo & Company Name */}
          <div className={cn(isRTL && 'md:col-start-3')}>
            <img
              src={kitesLogo}
              alt="KITES Holding Group"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert opacity-90"
            />
            <p className="text-slate-300 text-sm leading-relaxed">
              KITES Holding Group
              <br />
              مجموعة كايتس القابضة
            </p>
          </div>

          {/* Portfolio Companies */}
          <div className={cn(isRTL && 'md:col-start-2')}>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t('footer.companies')}</h4>
            <ul className="space-y-3">
              {companies.map((company, index) => (
                <li key={index}>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-accent transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-accent transition-colors" />
                    {company.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Toggle */}
          <div className={cn(isRTL && 'md:col-start-1')}>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Language / اللغة</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all border',
                  language === 'en'
                    ? 'bg-accent/10 border-accent text-accent'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                )}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all border',
                  language === 'ar'
                    ? 'bg-accent/10 border-accent text-accent'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                )}
              >
                العربية
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 mt-12">
          <p className="text-center text-slate-500 text-sm">
            {t('footer.rights').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
