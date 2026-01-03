import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const { t, lang } = useLanguage();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (data) setProperty(data);
            setLoading(false);
        };
        fetchProperty();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white"><Loader2 className="animate-spin" /></div>;

    if (!property) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Property not found</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <Link to="/properties" className="inline-flex items-center gap-2 text-primary-400 mb-8 hover:text-white transition-colors">
                    <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    {lang === 'ar' ? 'العودة للعقارات' : 'Back to Properties'}
                </Link>

                <div className="glass-heavy rounded-2xl overflow-hidden">
                    <img
                        src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?q=80&w=1200'}
                        alt={property.title}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    {property.location}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-primary-400">
                                {parseInt(property.price).toLocaleString()} OMR
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed max-w-2xl">{property.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
