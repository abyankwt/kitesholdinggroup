import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollLink } from './ScrollLink';
import { ArrowDown, Building2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import ParticleBackground from './three/ParticleBackground';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MagneticButton from './ui/MagneticButton';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero Text Staggered Reveal
    tl.fromTo('.hero-text-char',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    // Subtitle & Badge fade up
    tl.fromTo('.hero-fade-up',
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2 },
      '-=0.8'
    );

    // Buttons scale in
    tl.fromTo('.hero-btn',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.6'
    );

  }, { scope: sectionRef });

  // Helper to split text for animation (simple word split for now to be safe)
  const renderTitle = (text: string) => {
    return (
      <span className="hero-text-char inline-block">{text}</span>
    );
  };


  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* 3D Particle Constellation */}
      <ParticleBackground />

      {/* Animated background elements - Deep Void Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full pt-20">
        <div className={cn('max-w-6xl mx-auto text-center', isRTL && 'font-arabic')}>
          {/* Small badge - Minimalist */}
          <div className="hero-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-12 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
            <span className="tracking-wide uppercase text-xs">{isRTL ? 'مجموعة كايتس القابضة' : 'KITES HOLDING GROUP'}</span>
          </div>

          {/* Title - MASSIVE GSAP Reveal */}
          <h1
            ref={titleRef}
            className={cn(
              'font-heading font-black text-white mb-10 leading-[0.9] tracking-tighter-apple drop-shadow-2xl hero-title select-none',
              isRTL
                ? 'text-5xl md:text-7xl lg:text-8xl'
                : 'text-6xl md:text-8xl lg:text-9xl'
            )}
          >
            {renderTitle(t('hero.title'))}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              'hero-fade-up text-slate-400 mb-14 max-w-4xl mx-auto font-light tracking-wide',
              isRTL ? 'text-xl md:text-2xl leading-relaxed' : 'text-xl md:text-2xl leading-relaxed'
            )}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons - Premium Glass */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-8 justify-center items-center',
              isRTL && 'sm:flex-row-reverse'
            )}
          >
            {/* Primary Button - Aurora Gradient */}
            <MagneticButton>
              <div className="w-full sm:w-auto">
                <ScrollLink
                  to="companies"
                  className="group relative inline-flex items-center justify-center px-10 h-20 rounded-full text-xl font-bold text-white transition-all duration-300 transform active:scale-95 w-full sm:w-auto min-w-[260px] overflow-hidden"
                >
                  {/* Background & Shadow */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 via-purple-600 to-blue-600 opacity-90 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 via-purple-600 to-blue-600 transition-all duration-300 group-hover:scale-[1.02] border border-white/20" />

                  {/* Shine Effect */}
                  <span className="absolute inset-0 rounded-full overflow-hidden">
                    <span className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/30 to-transparent -translate-x-full -translate-y-1/2 rotate-45 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                  </span>

                  {/* Content */}
                  <span className="relative flex items-center gap-3 drop-shadow-md tracking-wider">
                    {t('hero.cta.companies')}
                  </span>
                </ScrollLink>
              </div>
            </MagneticButton>

            {/* Secondary Button - Ultra Frost Glass */}
            <MagneticButton>
              <div className="w-full sm:w-auto">
                <ScrollLink
                  to="contact"
                  className="group relative inline-flex items-center justify-center px-10 h-20 rounded-full text-xl font-semibold text-white transition-all duration-300 active:scale-95 w-full sm:w-auto min-w-[260px]"
                >
                  {/* Glass Background */}
                  <span className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300" />

                  {/* Hover Glow */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(255,255,255,0.15)]" />

                  {/* Content */}
                  <span className="relative flex items-center gap-3 tracking-wide">
                    {t('hero.cta.contact')}
                    <ArrowDown size={22} className="text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
                  </span>
                </ScrollLink>
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown className="text-white" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
