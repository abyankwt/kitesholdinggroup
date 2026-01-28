import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Cpu, Printer, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

interface Company {
  nameKey: string;
  descKey: string;
  tagKey: string;
  url: string;
  accentColor: string;
  borderColor: string;
  icon: LucideIcon;
}

const CompaniesSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title
    gsap.from('.comp-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 40, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // Cards Reveal
    gsap.from('.comp-card', {
      scrollTrigger: {
        trigger: '.comp-grid',
        start: 'top 75%',
      },
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.1)'
    });

  }, { scope: sectionRef });

  const companies: Company[] = [
    {
      nameKey: 'companies.kites.name',
      descKey: 'companies.kites.desc',
      tagKey: 'companies.kites.tag',
      url: 'https://kites-kw.com/',
      accentColor: 'bg-amber-500',
      borderColor: 'border-t-amber-500',
      icon: Cpu,
    },
    {
      nameKey: 'companies.creality.name',
      descKey: 'companies.creality.desc',
      tagKey: 'companies.creality.tag',
      url: 'https://creality.com.kw/',
      accentColor: 'bg-orange-600',
      borderColor: 'border-t-orange-600',
      icon: Printer,
    },
    {
      nameKey: 'companies.abyan.name',
      descKey: 'companies.abyan.desc',
      tagKey: 'companies.abyan.tag',
      url: 'https://www.abyan.com.kw/',
      accentColor: 'bg-amber-700',
      borderColor: 'border-t-amber-700',
      icon: HardHat,
    },
  ];

  return (
    <section
      id="companies"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="comp-title text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t('companies.title')}
          </h2>
        </div>

        {/* Company Cards */}
        <div className="comp-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="comp-card group h-full"
            >
              <div className={cn(
                "bg-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden h-full flex flex-col transition-all duration-500 border border-white/10",
                "hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-accent/5" // Premium hover
              )}>
                <SpotlightCard className="h-full flex flex-col" spotlightColor="rgba(255, 255, 255, 0.1)">
                  <div className="p-10 flex-1 flex flex-col relative z-10 h-full">
                    {/* Background Gradient */}
                    <div className={cn("absolute top-0 left-0 right-0 h-40 opacity-20 bg-gradient-to-b from-current to-transparent", company.accentColor.replace('bg-', 'text-'))} />

                    {/* Tag with icon */}
                    <div className="mb-8 flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl shadow-sm bg-white/10 border border-white/10")}>
                        <company.icon className={cn("w-6 h-6 text-white")} />
                      </div>
                      <span className={cn(
                        "inline-flex items-center px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-white/5 text-white/80 border border-white/10",
                      )}>
                        {t(company.tagKey)}
                      </span>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-accent transition-colors">
                      {t(company.nameKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-slate-300 leading-relaxed mb-8 flex-1">
                      {t(company.descKey)}
                    </p>

                    {/* CTA Button - Apple-style link */}
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-accent hover:gap-3 transition-all duration-300 group/link"
                    >
                      {t('companies.visitWebsite')}
                      <ExternalLink size={20} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                    </a>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
