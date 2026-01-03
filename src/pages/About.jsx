import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">{t('nav.about')}</h1>
        </div>
    );
};
export default About;
