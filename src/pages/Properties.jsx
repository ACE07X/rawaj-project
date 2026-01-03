import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProperties } from '../context/PropertiesContext';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, ArrowRight, Loader2, Home, Filter } from 'lucide-react';

const Properties = () => {
    const { t, lang } = useLanguage();
    const { properties, loading, error, fetchProperties } = useProperties();
    const [searchParams] = useSearchParams();
    const areaFilter = searchParams.get('area');

    useEffect(() => {
        fetchProperties();
    }, []);

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
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-down">
                        {lang === 'ar' ? 'عقاراتنا المميزة' : 'Our Exclusive Properties'}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'تشكيلة مختارة من أرقى المنازل والأراضي في ظفار'
                            : 'A curated selection of the finest homes and lands in Dhofar'}
                    </p>
                </div>

                {/* Filters Row (Placeholder) */}
                <div className="mb-8 flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5">
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
                    <div className="text-center py-24 text-slate-500">
                        <Home className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>{lang === 'ar' ? 'لا توجد عقارات مطابقة حالياً' : 'No properties found matching your criteria.'}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property, idx) => (
                        <Link
                            key={property.id}
                            to={`/properties/${property.id}`}
                            className="glass-card group rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                                    {/* Status Badge */}
                                    {property.status && property.status !== 'available' ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${property.status === 'sold' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                                            }`}>
                                            {property.status === 'sold' ? (lang === 'ar' ? 'تم البيع' : 'Sold') : (lang === 'ar' ? 'محجوز' : 'Reserved')}
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 bg-slate-900/80 backdrop-blur-sm">
                                            {property.type === 'sale'
                                                ? (lang === 'ar' ? 'للبيع' : 'For Sale')
                                                : (lang === 'ar' ? 'للإيجار' : 'For Rent')}
                                        </span>
                                    )}
                                </div>
                                <img
                                    src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=800&auto=format&fit=crop'}
                                    alt={property.title}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${property.status === 'sold' ? 'grayscale' : ''}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                                            {property.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                                            <MapPin className="w-4 h-4 text-primary-500" />
                                            {property.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-white">
                                        {parseInt(property.price).toLocaleString()} <span className="text-sm text-primary-400 font-normal">OMR</span>
                                    </span>
                                    <span className="p-2 rounded-full bg-primary-500/10 text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
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
