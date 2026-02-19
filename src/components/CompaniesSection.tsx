import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Cpu, Printer, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Company {
  nameKey: string;
  descKey: string;
  tagKey: string;
  url: string;
  iconBg: string;
  iconColor: string;
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
      url: 'https://kitesconsulting.kites.com.kw',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
      icon: Cpu,
    },
    {
      nameKey: 'companies.creality.name',
      descKey: 'companies.creality.desc',
      tagKey: 'companies.creality.tag',
      url: 'https://creality.com.kw/',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
      icon: Printer,
    },
    {
      nameKey: 'companies.abyan.name',
      descKey: 'companies.abyan.desc',
      tagKey: 'companies.abyan.tag',
      url: 'https://www.abyan.com.kw/',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
      icon: HardHat,
    },
  ];

  return (
    <section
      id="companies"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="comp-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
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
              <div className="bg-white rounded-[2rem] overflow-hidden h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                {/* Top accent bar — consistent charcoal */}
                <div className="h-1 w-full bg-gray-900" />

                <div className="p-10 flex-1 flex flex-col">
                  {/* Icon + Tag row */}
                  <div className="mb-8 flex items-center gap-3">
                    <div className={cn('p-2.5 rounded-xl border border-gray-200', company.iconBg)}>
                      <company.icon className={cn('w-6 h-6', company.iconColor)} />
                    </div>
                    <span className="inline-flex items-center px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {t(company.tagKey)}
                    </span>
                  </div>

                  {/* Company Name */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-[#1E3A5F] transition-colors duration-300">
                    {t(company.nameKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 flex-1">
                    {t(company.descKey)}
                  </p>

                  {/* CTA Link */}
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold text-base hover:text-[#1E3A5F] hover:gap-3 transition-all duration-300 group/link border-b border-gray-200 hover:border-[#1E3A5F] pb-0.5 w-fit"
                  >
                    {t('companies.visitWebsite')}
                    <ExternalLink size={16} className="text-gray-400 group-hover/link:text-[#1E3A5F] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
