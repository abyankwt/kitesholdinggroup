import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Cpu, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './ui/TiltCard';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title reveal
    gsap.fromTo('.about-title',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Cards Staggered Reveal
    gsap.fromTo('.about-card',
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

  }, { scope: sectionRef });

  const stats = [
    { icon: Building2, text: t('about.stat1') },
    { icon: Cpu, text: t('about.stat2') },
    { icon: MapPin, text: t('about.stat3') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="text-center mb-0">
            <div className="section-divider" />
            <h2 className="about-title text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight-apple">
              {t('about.title')}
            </h2>
          </div>

          {/* Bento Grid */}
          <div className={cn(
            'about-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]',
            isRTL && 'rtl-grid'
          )}>

            {/* Main Text Card */}
            <TiltCard className={cn(
              "about-card md:col-span-2 lg:col-span-2 md:row-span-2",
            )} intensity={10}>
              <div className="bg-white rounded-[2rem] p-10 h-full border border-gray-200 shadow-md flex flex-col justify-center relative group hover:shadow-lg transition-all duration-500 overflow-hidden">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight-apple relative">
                  {isRTL ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed font-medium tracking-tight relative">
                  {t('about.text')}
                </p>
              </div>
            </TiltCard>

            {/* Stat Card 1 */}
            <div className="about-card bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-6 hover:shadow-md hover:scale-[1.02] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform duration-500 border border-gray-200">
                <Building2 size={32} />
              </div>
              <div className="font-bold text-gray-900 text-xl tracking-tight-apple">{stats[0].text}</div>
            </div>

            {/* Stat Card 2 */}
            <div className="about-card bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-6 hover:shadow-md hover:scale-[1.02] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform duration-500 border border-gray-200">
                <Cpu size={32} />
              </div>
              <div className="font-bold text-gray-900 text-xl tracking-tight-apple">{stats[1].text}</div>
            </div>

            {/* Feature Card — dark for visual contrast */}
            <div className="about-card md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gray-900 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden text-white group border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:shadow-xl">
              <div className="z-10 flex flex-col gap-2 relative pointer-events-none">
                <span className="text-6xl font-extrabold tracking-tighter opacity-90">3</span>
                <span className="text-2xl font-semibold opacity-90 tracking-tight">{isRTL ? 'شركات رائدة' : 'Leading Companies'}</span>
              </div>
              {/* Decorative Tags */}
              <div className="flex flex-wrap gap-4 z-10 relative pointer-events-none w-full md:w-auto">
                <div className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20 group-hover:scale-105 transition-transform duration-500">
                  {isRTL ? 'المحاكاة' : 'Simulation'}
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20 group-hover:scale-105 transition-transform delay-75 duration-500">
                  {isRTL ? 'التصنيع' : 'Manufacturing'}
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="about-card md:col-span-1 bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-6 hover:shadow-md hover:scale-[1.02] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform duration-500 border border-gray-200">
                <MapPin size={32} />
              </div>
              <div className="font-bold text-gray-900 text-xl tracking-tight-apple">{stats[2].text}</div>
            </div>

            {/* HQ Info Card */}
            <div className="about-card md:col-span-1 bg-gray-50 rounded-[2rem] p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-4 group hover:shadow-md hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                🇰🇼
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">Headquartered</div>
                <div className="text-gray-500 text-sm font-medium">4th Floor, Lulu Al Watan Complex, Beirut St., Hawally, Kuwait</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
