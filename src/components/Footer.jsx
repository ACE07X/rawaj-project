import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Code2, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const { lang } = useLanguage();

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-3 font-serif">{lang === 'ar' ? 'الروّاج للعقارات' : 'Al-Rawaj Real Estate'}</h3>
                        <p className="text-sm leading-relaxed">
                            {lang === 'ar'
                                ? 'بوابتك إلى أفضل العقارات في ظفار، عمان.'
                                : 'Your gateway to the finest properties in Dhofar, Oman.'}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/properties" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'العقارات' : 'Properties'}</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">{lang === 'ar' ? 'تابعنا' : 'Follow Us'}</h4>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} Al-Rawaj Real Estate. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Code2 className="w-4 h-4" />
                        <span>Made with ❤️ by <span className="font-semibold text-primary-400">SoulTech</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
