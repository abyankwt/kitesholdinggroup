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
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      '-=0.8'
    );

    // Buttons scale in
    tl.fromTo('.hero-btn',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.6'
    );

  }, { scope: sectionRef });

  // Helper to split text for animation
  const renderTitle = (text: string) => {
    return (
      <span className="hero-text-char inline-block">{text}</span>
    );
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#F7F8FA_0%,_#FFFFFF_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full pt-20">
        <div className={cn('max-w-6xl mx-auto text-center', isRTL && 'font-arabic')}>
          {/* Small badge */}
          <div className="hero-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700 font-medium text-sm mb-12">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#1E3A5F' }}></span>
            <span className="tracking-wide uppercase text-xs">{isRTL ? 'مجموعة كايتس القابضة' : 'KITES HOLDING GROUP'}</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className={cn(
              'font-heading font-black text-gray-900 mb-6 leading-[0.9] tracking-tighter-apple hero-title select-none',
              isRTL
                ? 'text-5xl md:text-7xl lg:text-8xl'
                : 'text-6xl md:text-8xl lg:text-9xl'
            )}
          >
            {renderTitle(t('hero.title'))}
          </h1>

          {/* Thin navy divider below headline */}
          <div className="hero-fade-up w-24 h-1 rounded-full mx-auto mb-10 bg-[#1E3A5F]" />

          {/* Subtitle */}
          <p
            className={cn(
              'hero-fade-up text-gray-600 mb-14 max-w-4xl mx-auto font-light tracking-wide',
              isRTL ? 'text-xl md:text-2xl leading-relaxed' : 'text-xl md:text-2xl leading-relaxed'
            )}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-8 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-none mx-auto',
              isRTL && 'sm:flex-row-reverse'
            )}
          >
            {/* Primary Button - Solid Amber/Gold */}
            <MagneticButton className="w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <ScrollLink
                  to="companies"
                  className="group relative inline-flex items-center justify-center px-10 h-20 rounded-full text-xl font-bold text-white transition-all duration-300 transform active:scale-95 w-full sm:w-auto min-w-[260px] overflow-hidden"
                >
                  {/* Solid charcoal background */}
                  <span className="absolute inset-0 rounded-full bg-gray-900 group-hover:bg-gray-950 transition-colors duration-300" />

                  {/* Subtle shine on hover */}
                  <span className="absolute inset-0 rounded-full overflow-hidden">
                    <span className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/10 to-transparent -translate-x-full -translate-y-1/2 rotate-45 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                  </span>

                  {/* Content - Ensure Z-Index and White Text */}
                  <span className="relative z-10 flex items-center gap-3 tracking-wider text-white">
                    {t('hero.cta.companies')}
                  </span>
                </ScrollLink>
              </div>
            </MagneticButton>

            {/* Secondary Button - Clean outlined */}
            <MagneticButton className="w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <ScrollLink
                  to="contact"
                  className="group relative inline-flex items-center justify-center px-10 h-20 rounded-full text-xl font-semibold text-gray-800 transition-all duration-300 active:scale-95 w-full sm:w-auto min-w-[260px]"
                >
                  {/* Outlined background */}
                  <span className="absolute inset-0 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-400 group-hover:bg-gray-100 transition-all duration-300" />

                  {/* Content */}
                  <span className="relative flex items-center gap-3 tracking-wide">
                    {t('hero.cta.contact')}
                    <ArrowDown size={22} className="text-gray-500 group-hover:text-gray-700 group-hover:translate-y-1 transition-all duration-300" />
                  </span>
                </ScrollLink>
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-gray-400" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
