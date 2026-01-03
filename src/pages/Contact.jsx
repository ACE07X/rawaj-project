import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const { t, lang } = useLanguage();
    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">{t('nav.contact')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8 animate-fade-in-left">
                    <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
                        <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {lang === 'ar' ? 'موقعنا' : 'Our Location'}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {lang === 'ar' ? 'صلالة، سلطنة عمان' : 'Salalah, Sultanate of Oman'}
                                <br />
                                {lang === 'ar' ? 'شارع السلام' : 'Al-Salam Street'}
                            </p>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
                        <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
                            </h3>
                            <div className="flex flex-col gap-1">
                                <a href="tel:99493888" className="text-slate-300 hover:text-white transition-colors text-lg font-bold dir-ltr text-left">
                                    +968 9949 3888
                                </a>
                                <a href="tel:93206066" className="text-slate-400 hover:text-white transition-colors dir-ltr text-left">
                                    +968 9320 6066
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
                        <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Us'}
                            </h3>
                            <a href="mailto:info@alrawaj.com" className="text-slate-300 hover:text-white transition-colors block">
                                info@alrawaj.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
