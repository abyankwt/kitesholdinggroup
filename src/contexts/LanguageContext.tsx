import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.innovation': 'Innovation',
    'nav.companies': 'Companies',
    'nav.vision': 'Vision',
    'nav.governance': 'Governance',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'KITES HOLDING GROUP',
    'hero.subtitle': 'Advancing engineering and technology through simulation, manufacturing, and construction innovation.',
    'hero.cta.companies': 'Explore Our Companies',
    'hero.cta.contact': 'Contact Us',

    // About
    'about.title': 'About KITES Holding Group',
    'about.text': 'KITES Holding Group is a Kuwait-based parent company overseeing a portfolio of technology-driven engineering businesses. The group operates across the full engineering innovation spectrum — from simulation-based modeling and product development to additive manufacturing and advanced construction technologies.',
    'about.stat1': '3 Specialized Companies',
    'about.stat2': 'Engineering & Technology Focus',
    'about.stat3': 'Kuwait-Based Operations',

    // Innovation
    'innovation.title': 'An Integrated Engineering Innovation Ecosystem',
    'innovation.step1.title': 'Simulation & Engineering Intelligence',
    'innovation.step1.text': 'Advanced engineering simulations, modeling, training, and consultancy.',
    'innovation.step2.title': 'Additive Manufacturing & Prototyping',
    'innovation.step2.text': 'Consumer and professional 3D printing technologies and solutions.',
    'innovation.step3.title': 'Industrial-Scale 3D Construction',
    'innovation.step3.text': 'Large-scale additive manufacturing for construction and infrastructure.',

    // Companies
    'companies.title': 'Our Portfolio Companies',
    'companies.kites.name': 'Kuwait Institute for Training and Engineering Simulations (KITES)',
    'companies.kites.desc': 'A specialized engineering firm delivering simulation-based modeling, technical training, and consultancy services. KITES enables organizations to transition from traditional engineering methods to advanced simulation technologies.',
    'companies.kites.tag': 'Engineering Simulation & Training',
    'companies.creality.name': 'Creality Kuwait',
    'companies.creality.desc': 'The official Creality store in Kuwait, offering a comprehensive range of 3D printers, scanners, materials, and technical support for hobbyists and professionals.',
    'companies.creality.tag': '3D Printing Technology',
    'companies.abyan.name': 'Abyan Building Construction',
    'companies.abyan.desc': 'A forward-thinking construction company pioneering industrial-scale 3D printing solutions. Abyan is recognized for groundbreaking projects, including the world\'s first 3D-printed water tankers.',
    'companies.abyan.tag': '3D Construction & Innovation',
    'companies.visitWebsite': 'Visit Website',

    // Vision
    'vision.title': 'Vision',
    'vision.text': 'To lead engineering and construction innovation through advanced technology.',
    'mission.title': 'Mission',
    'mission.text': 'To empower industries by integrating simulation, manufacturing, and construction technologies into scalable solutions.',
    'values.title': 'Values',
    'values.innovation': 'Innovation',
    'values.excellence': 'Technical Excellence',
    'values.sustainability': 'Sustainability',
    'values.impact': 'Long-Term Impact',

    // Governance
    'governance.title': 'Governance & Leadership',
    'governance.text': 'KITES Holding Group operates under strong governance principles, ensuring strategic alignment, accountability, and sustainable growth across all portfolio companies.',

    // Footer
    'footer.rights': '© {year} KITES Holding Group. All rights reserved.',
    'footer.companies': 'Portfolio Companies',
    'contact.trust': 'We welcome strategic partnerships and innovation-driven collaborations.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عنا',
    'nav.innovation': 'الابتكار',
    'nav.companies': 'شركاتنا',
    'nav.vision': 'الرؤية',
    'nav.governance': 'الحوكمة',
    'nav.contact': 'تواصل معنا',

    // Hero
    'hero.title': 'مجموعة كايتس القابضة',
    'hero.subtitle': 'قيادة الابتكار الهندسي والتقني من خلال المحاكاة والتصنيع والبناء المتقدم.',
    'hero.cta.companies': 'شركاتنا',
    'hero.cta.contact': 'تواصل معنا',

    // About
    'about.title': 'نبذة عن مجموعة كايتس القابضة',
    'about.text': 'مجموعة كايتس القابضة هي شركة أم مقرها الكويت، تشرف على مجموعة من الشركات الهندسية المتقدمة المعتمدة على التكنولوجيا. تعمل المجموعة عبر سلسلة متكاملة من الابتكار الهندسي، بدءًا من المحاكاة والتطوير، وصولاً إلى التصنيع والبناء باستخدام تقنيات الطباعة ثلاثية الأبعاد.',
    'about.stat1': '3 شركات متخصصة',
    'about.stat2': 'تركيز هندسي وتقني',
    'about.stat3': 'عمليات داخل الكويت',

    // Innovation
    'innovation.title': 'منظومة متكاملة للابتكار الهندسي',
    'innovation.step1.title': 'المحاكاة والهندسة الذكية',
    'innovation.step1.text': 'المحاكاة الهندسية المتقدمة، النمذجة، التدريب، والاستشارات.',
    'innovation.step2.title': 'التصنيع الإضافي والنماذج الأولية',
    'innovation.step2.text': 'تقنيات وحلول الطباعة ثلاثية الأبعاد للاستخدام المهني والاستهلاكي.',
    'innovation.step3.title': 'البناء باستخدام الطباعة ثلاثية الأبعاد',
    'innovation.step3.text': 'التصنيع الإضافي واسع النطاق لقطاع البناء والبنية التحتية.',

    // Companies
    'companies.title': 'شركاتنا',
    'companies.kites.name': 'معهد الكويت للتدريب والمحاكاة الهندسية (كايتس)',
    'companies.kites.desc': 'شركة هندسية متخصصة تقدم خدمات المحاكاة الهندسية، والتدريب التقني، والاستشارات. تمكّن كايتس المؤسسات من الانتقال من الأساليب التقليدية إلى تقنيات المحاكاة المتقدمة.',
    'companies.kites.tag': 'المحاكاة الهندسية والتدريب',
    'companies.creality.name': 'كرياليتي الكويت',
    'companies.creality.desc': 'المتجر الرسمي لشركة Creality في الكويت، يوفر مجموعة متكاملة من الطابعات ثلاثية الأبعاد والماسحات والمواد والدعم الفني.',
    'companies.creality.tag': 'تقنيات الطباعة ثلاثية الأبعاد',
    'companies.abyan.name': 'شركة أبيان للمقاولات',
    'companies.abyan.desc': 'شركة إنشاءات متقدمة تقود الابتكار في الطباعة ثلاثية الأبعاد على نطاق صناعي. تشتهر أبيان بمشاريع رائدة، من بينها أول صهاريج مياه مطبوعة بتقنية الطباعة ثلاثية الأبعاد في العالم.',
    'companies.abyan.tag': 'البناء والطباعة ثلاثية الأبعاد',
    'companies.visitWebsite': 'زيارة الموقع',

    // Vision
    'vision.title': 'الرؤية',
    'vision.text': 'الريادة في الابتكار الهندسي والبنائي من خلال التكنولوجيا المتقدمة.',
    'mission.title': 'الرسالة',
    'mission.text': 'تمكين القطاعات المختلفة عبر دمج تقنيات المحاكاة والتصنيع والبناء في حلول عملية وقابلة للتوسع.',
    'values.title': 'القيم',
    'values.innovation': 'الابتكار',
    'values.excellence': 'التميز التقني',
    'values.sustainability': 'الاستدامة',
    'values.impact': 'الأثر طويل الأمد',

    // Governance
    'governance.title': 'الحوكمة والقيادة',
    'governance.text': 'تعمل مجموعة كايتس القابضة وفق مبادئ حوكمة قوية تضمن التوافق الاستراتيجي والمساءلة والنمو المستدام عبر جميع شركاتها.',

    // Footer
    'footer.rights': '© {year} مجموعة كايتس القابضة. جميع الحقوق محفوظة.',
    'footer.companies': 'شركاتنا',
    'contact.trust': 'نرحب بالشراكات الاستراتيجية والتعاون القائم على الابتكار.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial language from URL or fallback to 'en'
  const getInitialLanguage = (): Language => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'ar' || langParam === 'en') {
      return langParam;
    }
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update URL when language changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('lang') !== language) {
      params.set('lang', language);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }

    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguage(lang);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isRTL: language === 'ar', t }}>
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
