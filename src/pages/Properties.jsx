import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProperties } from '../context/PropertiesContext';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, ArrowRight, Loader2, Home, Filter, Ruler, Building2 } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

const Properties = () => {
    const { t, lang } = useLanguage();
    const { properties, loading, error, fetchProperties } = useProperties();
    const [searchParams] = useSearchParams();
    const areaFilter = searchParams.get('area');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProperties();
    }, []);

    // Helper for bilingual display
    const getLocalized = (en, ar) => lang === 'ar' ? (ar || en) : (en || ar);

    // Simple client-side filtering (ideally server-side for large datasets)
    const filteredProperties = areaFilter
        ? properties.filter(p => p.area_en?.toLowerCase().includes(areaFilter.toLowerCase()) || p.area_ar?.includes(areaFilter))
        : properties;

    if (loading) {
        return (
            <div className="min-h-screen pt-24 bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-down">
                        {lang === 'ar' ? 'عقاراتنا المميزة' : 'Our Exclusive Properties'}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {lang === 'ar'
                            ? 'تشكيلة مختارة من أرقى المنازل والأراضي الفرص الاستثمارية في سلطنة عمان'
                            : 'A curated selection of the finest homes, lands, and investment opportunities in Oman.'}
                    </p>
                </div>

                {/* Filters Row (Placeholder) */}
                <div className="mb-8 flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5 text-sm font-medium">
                        <Filter className="w-4 h-4" />
                        {lang === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
                    </button>
                </div>

                {error && (
                    <div className="text-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && filteredProperties.length === 0 && (
                    <div className="text-center py-24 text-slate-500 flex flex-col items-center">
                        <Home className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-lg">{lang === 'ar' ? 'لا توجد عقارات مطابقة حالياً' : 'No properties found matching your criteria.'}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property, idx) => (
                        <Link
                            key={property.id}
                            to={`/properties/${property.id}`}
                            className="glass-card group rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up hover:shadow-2xl hover:shadow-primary-900/10 border border-white/5 hover:border-primary-500/20"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="relative h-72 overflow-hidden">
                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                                    {/* Status Badge */}
                                    {property.status && property.status !== 'available' ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${property.status === 'sold' ? 'bg-red-600/90 text-white' : 'bg-orange-500/90 text-white'
                                            }`}>
                                            {property.status === 'sold' ? (lang === 'ar' ? 'تم البيع' : 'Sold') : (lang === 'ar' ? 'محجوز' : 'Reserved')}
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 bg-slate-900/60 backdrop-blur-md uppercase tracking-wide">
                                            {property.type === 'commercial' ? (lang === 'ar' ? 'تجاري' : 'Commercial') :
                                                property.type === 'land' ? (lang === 'ar' ? 'أرض' : 'Land') :
                                                    (lang === 'ar' ? 'سكني' : 'Residential')}
                                        </span>
                                    )}
                                </div>
                                <ImageWithFallback
                                    src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=800&auto=format&fit=crop'}
                                    alt={getLocalized(property.title_en, property.title_ar)}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${property.status === 'sold' ? 'grayscale opacity-80' : ''}`}
                                    fallbackSrc="https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=800&auto=format&fit=crop"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-4 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {property.size && (
                                            <div className="flex items-center gap-1">
                                                <Ruler className="w-3 h-3 text-primary-400" />
                                                {property.size} m²
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 capitalize">
                                            <Building2 className="w-3 h-3 text-primary-400" />
                                            {property.type}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col relative">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                                        {getLocalized(property.title_en, property.title_ar)}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-1 text-slate-400 text-sm mb-6">
                                    <MapPin className="w-4 h-4 text-primary-500" />
                                    {getLocalized(property.city_en, property.city_ar)}, {getLocalized(property.area_en, property.area_ar)}
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-white">
                                        {parseInt(property.price).toLocaleString()} <span className="text-sm text-primary-400 font-normal">OMR</span>
                                    </span>
                                    <span className="p-2 rounded-full bg-primary-500/10 text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors transform group-hover:rotate-[-45deg] rtl:group-hover:rotate-45">
                                        <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Properties;
