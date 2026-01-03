import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Code2, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    const { lang } = useLanguage();

    return (
        <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white font-bold text-2xl mb-4 font-serif">{lang === 'ar' ? 'الروّاج للعقارات' : 'Al-Rawaj Real Estate'}</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            {lang === 'ar'
                                ? 'بوابتك إلى أفضل العقارات في ظفار، عمان. نقدم خدمات عقارية متكاملة بأعلى معايير الجودة والاحترافية.'
                                : 'Your gateway to the finest properties in Dhofar, Oman. We provide comprehensive real estate services with the highest standards of quality and professionalism.'}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/properties" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'العقارات' : 'Properties'}</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                <span>{lang === 'ar' ? 'صلالة، سلطنة عمان' : 'Salalah, Sultanate of Oman'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                <span dir="ltr">+968 XXXX XXXX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                <span>info@alrawaj.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} Al-Rawaj Real Estate. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Code2 className="w-4 h-4" />
                        <span>Developed by <span className="font-semibold text-primary-400">SoulTech</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
