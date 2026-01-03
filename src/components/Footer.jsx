import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, lang } = useLanguage();

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Al-Rawaj Real Estate.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">Instagram</span>
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">Twitter</span>
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">LinkedIn</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
