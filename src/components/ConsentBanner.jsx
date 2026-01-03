import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { lang, t } = useLanguage();

    useEffect(() => {
        const hasConsent = localStorage.getItem('rawaj_consent');
        if (!hasConsent) {
            // Delay slightly for animation effect
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = async () => {
        setIsVisible(false);
        localStorage.setItem('rawaj_consent', 'true');

        // Record consent in database for PDPL compliance
        try {
            await supabase.from('user_consents').insert({
                consent_type: 'all',
                ip_address: 'anonymized', // In a real app, you might capture IP via edge function
                user_agent: navigator.userAgent
            });
        } catch (err) {
            console.error('Consent logging failed', err);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
            <div className="max-w-4xl mx-auto glass-heavy rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-500/20 rounded-xl hidden sm:block">
                        <Cookie className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                            {lang === 'ar' ? 'نحترم خصوصيتك' : 'We Respect Your Privacy'}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                            {lang === 'ar'
                                ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وضمان الامتثال لقوانين حماية البيانات في سلطنة عمان.'
                                : 'We use cookies to enhance your experience and ensure compliance with Oman\'s data protection laws. '}
                            <Link to="/privacy" className="text-primary-400 hover:text-primary-300 underline underline-offset-4">
                                {lang === 'ar' ? 'اقرأ سياسة الخصوصية' : 'Read our Policy'}
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary-500/20 whitespace-nowrap"
                    >
                        {lang === 'ar' ? 'موافق' : 'Accept All'}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ConsentBanner;
