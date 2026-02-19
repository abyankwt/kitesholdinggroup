import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const GovernanceSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const governancePillars = isRTL
    ? ['التوافق الاستراتيجي', 'المساءلة', 'النمو المستدام']
    : ['Strategic Alignment', 'Accountability', 'Sustainable Growth'];

  return (
    <section
      id="governance"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7F8FA] relative"
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="section-divider" />

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-md animate-on-scroll opacity-0">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gray-100 border border-gray-200 mx-auto flex items-center justify-center mb-8 shadow-sm">
              <Shield className="text-[#1E3A5F]" size={40} />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('governance.title')}
            </h2>

            {/* Text */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
              {t('governance.text')}
            </p>

            {/* Governance Pillars */}
            <div className="flex flex-wrap justify-center gap-3">
              {governancePillars.map((item, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 text-sm font-semibold rounded-full border border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
