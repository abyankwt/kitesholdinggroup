import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import kitesLogo from '@/assets/kites-logo.png';

const Footer: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();

  const companies = [
    { name: 'KITES', url: 'https://kitesconsulting.kites.com.kw/' },
    { name: 'Creality Kuwait', url: 'https://creality.com.kw/' },
    { name: 'Abyan', url: 'https://www.abyan.com.kw/' },
  ];

  return (
    <footer className="bg-[#F7F8FA] border-t border-gray-200 text-gray-600 py-16 relative z-10">
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
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-gray-700 text-sm leading-relaxed">
              KITES Holding Group
              <br />
              مجموعة كايتس القابضة
            </p>
          </div>

          {/* Portfolio Companies */}
          <div className={cn(isRTL && 'md:col-start-2')}>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">{t('footer.companies')}</h4>
            <ul className="space-y-3">
              {companies.map((company, index) => (
                <li key={index}>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#1E3A5F] transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#1E3A5F] transition-colors" />
                    {company.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Toggle */}
          <div className={cn(isRTL && 'md:col-start-1')}>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Language / اللغة</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all border',
                  language === 'en'
                    ? 'bg-slate-100 border-slate-400 text-[#1E3A5F]'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all border',
                  language === 'ar'
                    ? 'bg-slate-100 border-slate-400 text-[#1E3A5F]'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                العربية
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-center text-gray-400 text-sm">
            {t('footer.rights').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
