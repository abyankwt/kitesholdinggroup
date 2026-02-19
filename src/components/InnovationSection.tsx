import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Printer, Building, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const InnovationSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title
    gsap.from('.inn-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // Connector Line Draw
    gsap.from('.inn-line', {
      scrollTrigger: {
        trigger: '.inn-grid',
        start: 'top 70%',
      },
      scaleX: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      transformOrigin: isRTL ? 'right center' : 'left center'
    });

    // Steps Reveal
    gsap.from('.inn-step', {
      scrollTrigger: {
        trigger: '.inn-grid',
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.2)'
    });

  }, { scope: sectionRef });

  const steps = [
    {
      icon: Brain,
      number: '01',
      title: t('innovation.step1.title'),
      text: t('innovation.step1.text'),
    },
    {
      icon: Printer,
      number: '02',
      title: t('innovation.step2.title'),
      text: t('innovation.step2.text'),
    },
    {
      icon: Building,
      number: '03',
      title: t('innovation.step3.title'),
      text: t('innovation.step3.text'),
    },
  ];

  return (
    <section
      id="innovation"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7F8FA] relative"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="inn-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('innovation.title')}
          </h2>
        </div>

        {/* Process Steps */}
        <div className={cn(
          'inn-grid grid md:grid-cols-3 gap-8 relative',
          isRTL && 'md:grid-flow-col-dense'
        )}>
          {/* Mobile Connector (Vertical) */}
          <div className="md:hidden absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-slate-300/50 to-transparent border-r border-dashed border-slate-300/40 h-full pointer-events-none" />
          {/* Animated connector lines (desktop only) */}
          <div className="hidden md:flex absolute top-28 left-0 right-0 items-center justify-center pointer-events-none">
            <div className="flex items-center w-full max-w-4xl mx-auto px-24">
              <div className={cn(
                "inn-line flex-1 h-0.5 bg-gradient-to-r from-slate-200/30 via-slate-400/60 to-slate-200/30 relative",
                isRTL && "bg-gradient-to-l"
              )}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-pulse opacity-40" />
              </div>
              <div className="inn-step mx-2 w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white z-10 shadow-sm">
                <ArrowRight className={cn("text-[#1E3A5F] w-4 h-4", isRTL && "rotate-180")} />
              </div>
              <div className={cn(
                "inn-line flex-1 h-0.5 bg-gradient-to-r from-slate-200/30 via-slate-400/60 to-slate-200/30 relative",
                isRTL && "bg-gradient-to-l"
              )}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-pulse opacity-40" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'inn-step relative group perspective-1000',
                isRTL && `md:col-start-${3 - index}`
              )}
            >
              <TiltCard className="h-full" intensity={20}>
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-gray-200 shadow-sm transition-all duration-500 hover:shadow-md hover:border-gray-300 relative overflow-hidden">

                  {/* Step number - Watermark style */}
                  <div className="absolute top-6 right-8 font-[800] text-9xl leading-none select-none text-gray-900/[0.04] transition-transform duration-700 group-hover:scale-110 group-hover:text-gray-900/[0.06]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-10 relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                    <step.icon className="text-gray-700" size={32} />
                  </div>

                  {/* Content */}
                  <div className="relative z-20">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight-apple transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-lg font-medium tracking-tight group-hover:text-gray-700 transition-colors duration-300">
                      {step.text}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
