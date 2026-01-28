import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InnovationSection from '@/components/InnovationSection';
import CompaniesSection from '@/components/CompaniesSection';
import VisionSection from '@/components/VisionSection';
import GovernanceSection from '@/components/GovernanceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MouseSpotlight from '@/components/ui/MouseSpotlight';

import SEO from '@/components/SEO';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <SEO />
      <div className="min-h-screen relative overflow-hidden bg-background font-sans text-foreground selection:bg-accent selection:text-white">
        <MouseSpotlight />
        {/* Global Ambient Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Grain/Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

          {/* Deep Ambient Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] animate-breathe" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '5s' }} />
        </div>

        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <InnovationSection />
          <CompaniesSection />
          <VisionSection />
          <GovernanceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
