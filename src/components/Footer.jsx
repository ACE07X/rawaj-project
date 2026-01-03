import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Building2, Code2 } from 'lucide-react';

const Footer = () => {
    const { t, lang } = useLanguage();

    return (
        <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg shadow-primary-900/50 border border-white/10">
                            <span className="text-white font-bold text-2xl font-serif">R</span>
                        </div>
                        <span className="text-3xl font-bold text-white font-serif tracking-tight">
                            {lang === 'ar' ? 'الروّاج' : 'Al-Rawaj'}
                        </span>
                    </div>
                    <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
                        {lang === 'ar'
                            ? 'نقدم لك تجربة عقارية استثنائية في ظفار، مع مجموعة مختارة من أرقى العقارات والخدمات المتميزة.'
                            : 'Delivering an exceptional real estate experience in Dhofar, with a curated selection of premium properties and distinguished services.'}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 font-serif">
                        {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/properties" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                {t('nav.properties')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                {t('nav.about')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                {t('nav.contact')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 font-serif">
                        {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </h4>
                    <div className="space-y-5">
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary-500/20 text-primary-500 transition-colors border border-white/5">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                    {lang === 'ar' ? 'صلالة، سلطنة عمان' : 'Salalah, Sultanate of Oman'}
                                </p>
                                <p className="text-slate-500 text-xs mt-1">{lang === 'ar' ? 'سلطنة عمان' : 'Sultanate of Oman'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary-500/20 text-primary-500 transition-colors border border-white/5">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <a href="tel:99493888" className="text-slate-300 hover:text-white transition-colors font-bold tracking-wider dir-ltr text-left">
                                    +968 9949 3888
                                </a>
                                <a href="tel:93206066" className="text-slate-500 hover:text-white transition-colors text-xs tracking-wide dir-ltr text-left">
                                    +968 9320 6066
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary-500/20 text-primary-500 transition-colors border border-white/5">
                                <Mail className="w-5 h-5" />
                            </div>
                            <a href="mailto:info@alrawaj.com" className="text-slate-300 hover:text-white transition-colors text-sm">
                                info@alrawaj.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-sm px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
                    <span>&copy; {new Date().getFullYear()} {lang === 'ar' ? 'الروّاج للعقارات' : 'Al-Rawaj Real Estate'}</span>
                    <span className="hidden md:inline text-white/10">|</span>
                    <span className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                        Developed by <span className="text-white font-bold tracking-wide">SoulTech</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
