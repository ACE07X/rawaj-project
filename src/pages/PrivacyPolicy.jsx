import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const { lang } = useLanguage();

    const sections = [
        {
            title: lang === 'ar' ? 'جمع البيانات' : 'Data Collection',
            icon: Eye,
            content: lang === 'ar'
                ? 'نقوم بجمع البيانات الشخصية (الاسم، البريد الإلكتروني، الهاتف) بموافقتك الصريحة فقط لتحسين خدماتنا العقارية.'
                : 'We collect personal data (Name, Email, Phone) only with your explicit consent to improve our real estate services.'
        },
        {
            title: lang === 'ar' ? 'حماية البيانات' : 'Data Protection',
            icon: Lock,
            content: lang === 'ar'
                ? 'نلتزم بحماية بياناتك وفقاً للمرسوم السلطاني رقم 6/2022. بياناتك مشفرة ولا يتم مشاركتها مع أطراف ثالثة دون إذن.'
                : 'We are committed to protecting your data in accordance with Royal Decree 6/2022. Your data is encrypted and not shared with third parties without permission.'
        },
        {
            title: lang === 'ar' ? 'حقوق المستخدم' : 'User Rights',
            icon: Shield,
            content: lang === 'ar'
                ? 'لديك الحق في الوصول إلى بياناتك، وتصحيحها، أو طلب حذفها في أي وقت عبر التواصل معنا.'
                : 'You have the right to access, correct, or request deletion of your data at any time by contacting us.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-primary-400 mb-8 hover:text-white transition-colors">
                    <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                        {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {lang === 'ar' ? 'التزامنا بحماية خصوصيتك وفقاً لقوانين سلطنة عمان' : 'Our commitment to protecting your privacy under Omani Law'}
                    </p>
                </div>

                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all">
                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-primary-500/10 rounded-xl">
                                    <section.icon className="w-8 h-8 text-primary-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-slate-900/50 rounded-xl border border-white/5 text-center text-slate-400 text-sm">
                    {lang === 'ar'
                        ? 'آخر تحديث: يناير 2026. يخضع هذا الإشعار للمراجعة الدورية لضمان الامتثال المستمر.'
                        : 'Last Updated: January 2026. This policy is subject to periodic review to ensure ongoing compliance.'}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
