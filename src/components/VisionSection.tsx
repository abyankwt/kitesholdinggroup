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
      accent: 'bg-accent',
    },
    {
      icon: Target,
      title: t('mission.title'),
      text: t('mission.text'),
      accent: 'bg-primary',
    },
    {
      icon: Heart,
      title: t('values.title'),
      text: values,
      accent: 'bg-gradient-to-r from-accent to-accent-glow',
      isValues: true,
    },
  ];

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="section-divider" />
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
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
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 h-full card-hover border border-white/10 text-center hover:bg-white/10 transition-colors">
                {/* Icon - increased size */}
                <div className={cn(
                  'w-24 h-24 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-2xl',
                  'bg-white/10'
                )}>
                  <card.icon className="text-accent" size={48} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>

                {/* Content */}
                {card.isValues ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    {(card.text as string[]).map((value, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white/5 text-white/90 border border-white/10 hover:bg-accent/20 hover:border-accent/30 transition-colors cursor-default"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-300 leading-relaxed">
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
