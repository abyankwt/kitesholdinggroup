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

    // Cards Staggered Mesh Reveal
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

    // Ambient Orb Float Animation
    gsap.to('.ambient-orb-1', {
      y: -50,
      x: 30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.ambient-orb-2', {
      y: 60,
      x: -40,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

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
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Cinematic Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 ambient-orb-1" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4 ambient-orb-2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="text-center mb-0">
            <div className="section-divider" />
            <h2 className="about-title text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight-apple">
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
              <SpotlightCard className="bg-white/5 backdrop-blur-2xl rounded-[2rem] p-10 h-full border border-white/10 shadow-2xl flex flex-col justify-center relative group hover:bg-white/[0.08] transition-all duration-700 overflow-hidden" spotlightColor="rgba(212, 175, 55, 0.15)">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />
                <h3 className="text-3xl font-bold mb-6 z-10 text-white tracking-tight-apple translate-z-10 relative">{isRTL ? 'رؤيتنا' : 'Our Vision'}</h3>
                <p className="text-xl text-slate-300 leading-relaxed z-10 font-medium tracking-tight translate-z-10 relative">
                  {t('about.text')}
                </p>
              </SpotlightCard>
            </TiltCard>

            {/* Stat Card 1 */}
            <SpotlightCard className="about-card bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] hover:bg-white/[0.08] transition-all duration-500 group" spotlightColor="rgba(255, 255, 255, 0.1)">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <Building2 size={32} />
              </div>
              <div className="font-bold text-white text-xl tracking-tight-apple">{stats[0].text}</div>
            </SpotlightCard>

            {/* Stat Card 2 */}
            <SpotlightCard className="about-card bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] hover:bg-white/[0.08] transition-all duration-500 group" spotlightColor="rgba(255, 255, 255, 0.1)">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <Cpu size={32} />
              </div>
              <div className="font-bold text-white text-xl tracking-tight-apple">{stats[1].text}</div>
            </SpotlightCard>

            {/* Visual Element / Feature Card */}
            <div className="about-card md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gradient-to-br from-accent/20 to-accent-glow/20 backdrop-blur-3xl rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden text-white group border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-accent/10 hover:shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
              <SpotlightCard className="absolute inset-0 z-0" spotlightColor="rgba(255, 255, 255, 0.15)"><></></SpotlightCard>
              <div className="z-10 flex flex-col gap-2 relative pointer-events-none">
                <span className="text-6xl font-extrabold tracking-tighter opacity-90 drop-shadow-lg">3</span>
                <span className="text-2xl font-semibold opacity-90 tracking-tight">{isRTL ? 'شركات رائدة' : 'Leading Companies'}</span>
              </div>
              {/* Decorative Icons */}
              <div className="flex flex-wrap gap-4 z-10 relative pointer-events-none w-full md:w-auto">
                <div className="px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full text-sm font-semibold border border-white/10 group-hover:scale-105 transition-transform duration-500">
                  {isRTL ? 'المحاكاة' : 'Simulation'}
                </div>
                <div className="px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full text-sm font-semibold border border-white/10 group-hover:scale-105 transition-transform delay-75 duration-500">
                  {isRTL ? 'التصنيع' : 'Manufacturing'}
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <SpotlightCard className="about-card md:col-span-1 bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] hover:bg-white/[0.08] transition-all duration-500 group" spotlightColor="rgba(255, 255, 255, 0.1)">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <MapPin size={32} />
              </div>
              <div className="font-bold text-white text-xl tracking-tight-apple">{stats[2].text}</div>
            </SpotlightCard>

            {/* Filler / Pattern Card */}
            <SpotlightCard className="about-card md:col-span-1 bg-white/[0.02] backdrop-blur-sm rounded-[2rem] p-8 border border-white/5 flex items-center justify-center relative overflow-hidden group" spotlightColor="rgba(255, 255, 255, 0.05)">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
              <div className="w-16 h-16 rounded-full border border-white/10 animate-spin-slow group-hover:border-white/30 transition-colors duration-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            </SpotlightCard>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

