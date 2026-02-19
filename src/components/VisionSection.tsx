import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Target, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const VisionSection: React.FC = () => {
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

  const values = [
    t('values.innovation'),
    t('values.excellence'),
    t('values.sustainability'),
    t('values.impact'),
  ];

  const cards = [
    {
      icon: Eye,
      title: t('vision.title'),
      text: t('vision.text'),
    },
    {
      icon: Target,
      title: t('mission.title'),
      text: t('mission.text'),
    },
    {
      icon: Heart,
      title: t('values.title'),
      text: values,
      isValues: true,
    },
  ];

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="section-divider" />
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t('vision.title')}, {t('mission.title')} & {t('values.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-2xl p-8 h-full card-hover border border-gray-200 shadow-sm text-center hover:shadow-md transition-all duration-300">
                {/* Icon */}
                <div className="w-24 h-24 rounded-2xl bg-gray-100 border border-gray-200 mx-auto flex items-center justify-center mb-8 shadow-sm">
                  <card.icon className="text-[#1E3A5F]" size={48} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.title}
                </h3>

                {/* Content */}
                {card.isValues ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    {(card.text as string[]).map((value, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 text-sm font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-slate-100 hover:border-slate-300 hover:text-[#1E3A5F] transition-colors cursor-default"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {card.text as string}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
