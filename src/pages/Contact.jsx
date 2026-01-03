import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

const Contact = () => {
    const { t, lang } = useLanguage();

    const supportChannels = [
        {
            label_en: "Primary Support",
            label_ar: "الدعم المباشر",
            phone: "+968 9949 3888",
            link: "https://wa.me/96899493888"
        },
        {
            label_en: "Sales Support",
            label_ar: "دعم المبيعات",
            phone: "+968 9320 6066",
            link: "https://wa.me/93206066"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">
                        {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {lang === 'ar'
                            ? 'نحن هنا لمساعدتك في العثور على عقارك المثالي. تواصل مع فريقنا المتميز.'
                            : 'We are here to help you find your perfect property. Contact our dedicated team.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Location */}
                        <div className="glass-card p-8 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                            <div className="p-4 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'موقعنا' : 'Our Location'}</h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    {lang === 'ar' ? 'صلالة، سلطنة عمان' : 'Salalah, Sultanate of Oman'}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="glass-card p-8 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                            <div className="p-4 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Us'}</h3>
                                <a href="mailto:info@alrawaj.com" className="text-slate-300 hover:text-white transition-colors block font-light">
                                    info@alrawaj.com
                                </a>
                            </div>
                        </div>

                        {/* Work Hours */}
                        <div className="glass-card p-8 rounded-2xl flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                            <div className="p-4 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'ساعات العمل' : 'Work Hours'}</h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    {lang === 'ar' ? 'السبت - الخميس: ٩ ص - ٩ م' : 'Sat - Thu: 9:00 AM - 9:00 PM'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Channels Section */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {supportChannels.map((channel, idx) => (
                            <div key={idx} className="glass-card p-10 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/10 transition-colors" />

                                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                                    {lang === 'ar' ? channel.label_ar : channel.label_en}
                                </h3>

                                <div className="flex flex-col gap-4 relative z-10">
                                    <a href={`tel:${channel.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors bg-white/5 p-5 rounded-xl hover:bg-white/10 border border-white/5">
                                        <div className="p-3 rounded-lg bg-primary-500/20 text-primary-400">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-xl dir-ltr">{channel.phone}</span>
                                    </a>
                                    <a href={channel.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors bg-green-500/10 p-5 rounded-xl hover:bg-green-500/20 border border-green-500/20">
                                        <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-lg">{lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Chat'}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
