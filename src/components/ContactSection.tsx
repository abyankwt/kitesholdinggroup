import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactSection: React.FC = () => {
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

  const contactItems = [
    {
      icon: MapPin,
      label: 'Location',
      value: '4th Floor, Lulu Al Watan Complex, Beirut St., Hawally, Kuwait',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@kitesholding.com',
      href: 'mailto:info@kitesholding.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+965 22092260',
      href: 'tel:+96522092260',
    },
  ];

  const introText = isRTL
    ? 'تواصل معنا لمعرفة المزيد عن شركاتنا وفرص الاستثمار.'
    : 'Get in touch with us to learn more about our portfolio companies and investment opportunities.';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7F8FA]"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-divider" />

          {/* Title */}
          <h2
            className="animate-on-scroll opacity-0 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            {t('nav.contact')}
          </h2>

          {/* Trust-building sentence */}
          <p
            className="animate-on-scroll opacity-0 text-lg md:text-xl text-[#1E3A5F] font-semibold mb-4 leading-relaxed max-w-3xl mx-auto"
            style={{ animationDelay: '0.05s' }}
          >
            {t('contact.trust')}
          </p>

          <p
            className="animate-on-scroll opacity-0 text-base text-gray-600 mb-14 max-w-2xl mx-auto"
            style={{ animationDelay: '0.1s' }}
          >
            {introText}
          </p>

          {/* Contact Cards */}
          <div
            className={cn(
              'grid md:grid-cols-3 gap-8',
              isRTL && 'md:grid-flow-col-dense'
            )}
          >
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-3xl hover:shadow-md hover:-translate-y-2 transition-all duration-300 group h-full shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-[#1E3A5F]" size={28} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{item.label}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-900 font-bold text-xl hover:text-[#1E3A5F] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-gray-900 font-bold text-xl">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
