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
      className="py-24 lg:py-32 bg-background relative"
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="section-divider" />

          {/* Main Glass Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl animate-on-scroll opacity-0">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
              <Shield className="text-accent" size={40} />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
              {t('governance.title')}
            </h2>

            {/* Text - improved contrast */}
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
              {t('governance.text')}
            </p>

            {/* Decorative element - Pillars */}
            <div className="flex flex-wrap justify-center gap-3">
              {governancePillars.map((item, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 text-sm font-semibold rounded-full border border-white/10 text-slate-200 bg-white/5 hover:bg-white/10 transition-colors"
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
