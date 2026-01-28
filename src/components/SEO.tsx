import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const SEO: React.FC = () => {
    const { language, t, isRTL } = useLanguage();

    const title = t('hero.title');
    const description = t('hero.subtitle');
    const siteName = 'KITES Holding Group';
    const url = window.location.href;
    const image = '/og-image.png';

    return (
        <Helmet>
            {/* Visual & layout */}
            <html lang={language} dir={isRTL ? 'rtl' : 'ltr'} />
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={language === 'ar' ? 'ar_KW' : 'en_US'} />
            <meta property="og:locale:alternate" content={language === 'ar' ? 'en_US' : 'ar_KW'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Alternate links (Canonical handled basically by URL) */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
