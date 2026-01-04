import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users, MapPin, Shield } from 'lucide-react';

const About = () => {
    const { lang } = useLanguage();

    const stats = [
        {
            icon: Award,
            value: '10+',
            label_en: 'Years Experience',
            label_ar: 'سنوات من الخبرة'
        },
        {
            icon: Users,
            value: '500+',
            label_en: 'Happy Clients',
            label_ar: 'عميل راضٍ'
        },
        {
            icon: MapPin,
            value: '25+',
            label_en: 'Prime Locations',
            label_ar: 'موقع متميز'
        },
        {
            icon: Shield,
            value: '100%',
            label_en: 'Expert Advisory',
            label_ar: 'استشارات خبيرة'
        }
    ];

    const values = [
        {
            title_en: 'Integrity',
            title_ar: 'النزاهة',
            desc_en: 'We conduct all our business with the highest ethical standards and transparency.',
            desc_ar: 'نمارس أعمالنا بأعلى المعايير الأخلاقية والشفافية.'
        },
        {
            title_en: 'Excellence',
            title_ar: 'التميز',
            desc_en: 'We strive for excellence in every property and service we offer to our clients.',
            desc_ar: 'نسعى للتميز في كل عقار وخدمة نقدمها لعملائنا.'
        },
        {
            title_en: 'Innovation',
            title_ar: 'الابتكار',
            desc_en: 'We leverage the latest technology to provide cutting-edge real estate solutions.',
            desc_ar: 'نستخدم أحدث التقنيات لتقديم حلول عقارية متطورة.'
        },
        {
            title_en: 'Trust',
            title_ar: 'الثقة',
            desc_en: 'Building lasting relationships through trust and reliability with every client.',
            desc_ar: 'بناء علاقات دائمة من خلال الثقة والموثوقية مع كل عميل.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-primary-400 animate-fade-in-down">
                        {lang === 'ar' ? 'من نحن' : 'About Al-Rawaj'}
                    </h1>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        {lang === 'ar'
                            ? 'نحن شركة رائدة في مجال العقارات الفاخرة في سلطنة عمان، ملتزمون بتقديم تجربة استثنائية لعملائنا من خلال مجموعة مختارة من أرقى العقارات والخدمات المتميزة.'
                            : 'We are a leading premium real estate company in the Sultanate of Oman, committed to delivering an exceptional experience to our clients through a curated selection of the finest properties and distinguished services.'}
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="glass-card p-8 rounded-2xl text-center border border-white/5 hover:border-primary-500/30 transition-all group"
                        >
                            <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-500 group-hover:scale-110 transition-transform" />
                            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider">
                                {lang === 'ar' ? stat.label_ar : stat.label_en}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Our Story */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
                        {lang === 'ar' ? 'قصتنا' : 'Our Story'}
                    </h2>
                    <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 max-w-4xl mx-auto">
                        <p className="text-slate-300 leading-relaxed text-lg mb-6">
                            {lang === 'ar'
                                ? 'تأسست الرواج للعقارات على مبدأ بسيط: تقديم أفضل العقارات في سلطنة عمان مع خدمة عملاء لا مثيل لها. منذ بدايتنا، نجحنا في مساعدة مئات العائلات في العثور على منازل أحلامهم والمستثمرين في تحقيق أهدافهم المالية.'
                                : 'Al-Rawaj Real Estate was founded on a simple principle: to offer the finest properties in the Sultanate of Oman with unparalleled customer service. Since our inception, we have successfully helped hundreds of families find their dream homes and investors achieve their financial goals.'}
                        </p>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {lang === 'ar'
                                ? 'نحن متخصصون في العقارات السكنية والتجارية والأراضي الاستثمارية في ظفار. فريقنا من المحترفين ذوي الخبرة ملتزم بتوفير إرشادات خبيرة وخدمة شخصية لكل عميل.'
                                : 'We specialize in residential, commercial properties, and investment lands in Dhofar. Our team of experienced professionals is dedicated to providing expert guidance and personalized service to every client.'}
                        </p>
                    </div>
                </div>

                {/* Our Values */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                        {lang === 'ar' ? 'قيمنا' : 'Our Values'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, idx) => (
                            <div
                                key={idx}
                                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all"
                            >
                                <h3 className="text-2xl font-bold text-primary-400 mb-3">
                                    {lang === 'ar' ? value.title_ar : value.title_en}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm">
                                    {lang === 'ar' ? value.desc_ar : value.desc_en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
