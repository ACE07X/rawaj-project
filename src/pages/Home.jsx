import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProperties } from '../context/PropertiesContext';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Loader2, Home as HomeIcon } from 'lucide-react';

const Home = () => {
    const { t, lang } = useLanguage();
    const { properties, loading, error, fetchProperties } = useProperties();

    useEffect(() => {
        fetchProperties();
    }, []);

    const areas = [
        { id: 'hawana', name: 'Hawana Salalah', nameAr: 'هوانا صلالة', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop' }, // Luxury Resort/Villa style
        { id: 'saada', name: 'Saada', nameAr: 'السعادة', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop' }, // Modern Villa
        { id: 'dahariz', name: 'Dahariz', nameAr: 'الدهاريز', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop' }, // Land/Palm Trees/Nature
        { id: 'awqad', name: 'Awqad', nameAr: 'عوقد', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop' } // Modern House
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
                    <p className="text-slate-400 font-serif">{lang === 'ar' ? 'جار التحميل...' : 'Loading Salalah\'s Finest...'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section with Ken Burns Effect */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        alt="Salalah Landscape"
                        className="w-full h-full object-cover animate-zoom-slow opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm font-semibold mb-6 animate-fade-in-down backdrop-blur-md">
                        {lang === 'ar' ? 'اكتشف جوهر صلالة' : 'Experience the Essence of Salalah'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                        {lang === 'ar' ? 'اكتشف عقارات فاخرة في' : 'Discover Luxury Living in'} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
                            {lang === 'ar' ? 'جوهرة الساحل الجنوبي' : 'The Jewel of the South'}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light animate-fade-in-up [animation-delay:200ms]">
                        {lang === 'ar'
                            ? 'بوابتك إلى أرقى العقارات في محافظة ظفار، حيث تلتقي الفخامة بالطبيعة'
                            : 'Your gateway to the finest properties in the Dhofar region, where luxury meets nature.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:400ms]">
                        <Link
                            to="/properties"
                            className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-500 transition-all transform hover:scale-105 shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
                        >
                            {lang === 'ar' ? 'تصفح العقارات' : 'Browse Properties'}
                            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center"
                        >
                            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Areas Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {lang === 'ar' ? 'مناطق مميزة في ظفار' : 'Prime Locations in Dhofar'}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-transparent mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {areas.map((area, index) => (
                            <Link
                                to={`/properties?area=${area.id}`}
                                key={area.id}
                                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-black/50 shadow-lg"
                            >
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
                                <img
                                    src={area.image}
                                    alt={area.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-20" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 z-30 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                                        {lang === 'ar' ? area.nameAr : area.name}
                                    </h3>
                                    <p className="text-slate-300 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <span>{lang === 'ar' ? 'استكشف العقارات' : 'Explore properties'}</span>
                                        <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                {lang === 'ar' ? 'أحدث العقارات' : 'Latest Properties'}
                            </h2>
                            <p className="text-slate-400">
                                {lang === 'ar' ? 'اكتشف أحدث الإضافات إلى محفظتنا' : 'Discover the newest additions to our portfolio'}
                            </p>
                        </div>
                        <Link to="/properties" className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
                            {lang === 'ar' ? 'عرض الكل' : 'View All'}
                            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                    </div>

                    {error ? (
                        <div className="text-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.slice(0, 3).map((property, idx) => (
                                <Link
                                    key={property.id}
                                    to={`/properties/${property.id}`}
                                    className="glass-card group rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                                            {property.type === 'sale'
                                                ? (lang === 'ar' ? 'للبيع' : 'For Sale')
                                                : (lang === 'ar' ? 'للإيجار' : 'For Rent')}
                                        </div>
                                        <img
                                            src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=800&auto=format&fit=crop'}
                                            alt={property.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/properties" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium">
                            {lang === 'ar' ? 'عرض الكل' : 'View All'}
                            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
