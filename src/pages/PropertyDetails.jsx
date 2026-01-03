import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, MapPin, Loader2, Maximize2, Home, CheckCircle, Phone, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PropertyDetails = () => {
    const { id } = useParams();
    const { t, lang } = useLanguage();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProperty = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) setProperty(data);
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const getLocalized = (en, ar) => lang === 'ar' ? (ar || en) : (en || ar);

    if (loading) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-primary-500">
            <Loader2 className="w-12 h-12 animate-spin" />
        </div>
    );

    if (!property) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
            <h2 className="text-2xl font-bold">Property Not Found</h2>
            <Link to="/properties" className="text-primary-400 hover:text-white transition-colors">Return to Properties</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-6xl">
                    {/* Back Button */}
                    <Link to="/properties" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary-400 mb-8 transition-colors group">
                        <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        {lang === 'ar' ? 'العودة للعقارات' : 'Back to Properties'}
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <div className="space-y-6">
                            <div className="glass-card rounded-3xl overflow-hidden p-2 shadow-2xl shadow-primary-900/10">
                                <img
                                    src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=1200'}
                                    alt={getLocalized(property.title_en, property.title_ar)}
                                    className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${property.status === 'sold' ? 'bg-red-500/20 text-red-400' :
                                            property.status === 'reserved' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-primary-500/20 text-primary-400'
                                        }`}>
                                        {lang === 'ar' ?
                                            (property.status === 'sold' ? 'تم البيع' : property.status === 'reserved' ? 'محجوز' : 'متاح') :
                                            property.status}
                                    </span>
                                    <span className="text-slate-500 text-sm flex items-center gap-1 capitalize">
                                        <Home className="w-4 h-4" /> {property.type}
                                    </span>
                                </div>

                                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                    {getLocalized(property.title_en, property.title_ar)}
                                </h1>

                                <div className="flex items-center gap-2 text-slate-400 text-lg mb-6">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    {getLocalized(property.city_en, property.city_ar)}, {getLocalized(property.area_en, property.area_ar)}
                                </div>

                                <div className="text-4xl font-bold text-primary-400 mb-8">
                                    {parseInt(property.price).toLocaleString()} <span className="text-xl text-primary-500/60">OMR</span>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="glass-card p-4 rounded-xl flex items-center gap-3">
                                        <Maximize2 className="w-8 h-8 text-slate-500" />
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'المساحة' : 'Area'}</p>
                                            <p className="font-bold text-lg">{property.size || '-'} m²</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4 rounded-xl flex items-center gap-3">
                                        <CheckCircle className="w-8 h-8 text-slate-500" />
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الحالة' : 'Status'}</p>
                                            <p className="font-bold text-lg capitalize">{property.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold mb-4">{lang === 'ar' ? 'التفاصيل' : 'Description'}</h3>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {getLocalized(property.description_en, property.description_ar)}
                                </p>
                            </div>

                            {/* Contact Box */}
                            <div className="bg-gradient-to-br from-primary-900/50 to-slate-900/50 p-8 rounded-2xl border border-primary-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'مهتم بهذا العقار؟' : 'Interested in this property?'}</h3>
                                    <p className="text-primary-200/80 text-sm">{lang === 'ar' ? 'تواصل معنا مباشرة للمزيد من المعلومات' : 'Contact us directly for more information.'}</p>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <a href="tel:+96899493888" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-900/50">
                                        <Phone className="w-5 h-5" /> Call
                                    </a>
                                    <a href="https://wa.me/96899493888" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-900/50">
                                        <Globe className="w-5 h-5" /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PropertyDetails;
