import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Settings, Save, Loader2, XCircle, AlertCircle, CheckCircle, Building2, Phone, Mail, Globe } from 'lucide-react';

const AdminSettings = ({ onClose }) => {
    const { lang } = useLanguage();
    const [settings, setSettings] = useState({
        company_name_en: 'Al-Rawaj Real Estate',
        company_name_ar: 'الروّاج للعقارات',
        phone_primary: '99493888',
        phone_secondary: '93206066',
        email: 'info@alrawaj.com',
        address_en: 'Salalah, Sultanate of Oman',
        address_ar: 'صلالة، سلطنة عمان',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) {
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            // Settings table might not exist yet - that's OK
            console.log('Settings not found, using defaults');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(false);
        try {
            // Try to upsert settings
            const { error } = await supabase
                .from('site_settings')
                .upsert([{ id: 1, ...settings }], { onConflict: 'id' });

            if (error) throw error;
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-white/5 p-6 flex items-center justify-between z-10">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary-500" />
                        {lang === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
                        </div>
                    ) : (
                        <>
                            {/* Company Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {lang === 'ar' ? 'معلومات الشركة' : 'Company Info'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Company Name (English)</label>
                                        <input
                                            type="text"
                                            value={settings.company_name_en}
                                            onChange={(e) => handleChange('company_name_en', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Company Name (Arabic)</label>
                                        <input
                                            type="text"
                                            value={settings.company_name_ar}
                                            onChange={(e) => handleChange('company_name_ar', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-right"
                                            dir="rtl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {lang === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Primary Contact Number</label>
                                        <input
                                            type="tel"
                                            value={settings.phone_primary}
                                            onChange={(e) => handleChange('phone_primary', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Secondary Contact Number</label>
                                        <input
                                            type="tel"
                                            value={settings.phone_secondary}
                                            onChange={(e) => handleChange('phone_secondary', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs text-slate-500">Email</label>
                                        <input
                                            type="email"
                                            value={settings.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    {lang === 'ar' ? 'العنوان' : 'Address'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Address (English)</label>
                                        <input
                                            type="text"
                                            value={settings.address_en}
                                            onChange={(e) => handleChange('address_en', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-500">Address (Arabic)</label>
                                        <input
                                            type="text"
                                            value={settings.address_ar}
                                            onChange={(e) => handleChange('address_ar', e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-right"
                                            dir="rtl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Feedback */}
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    {lang === 'ar' ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!'}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-800/50 border-t border-white/5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-colors font-medium"
                    >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-colors disabled:opacity-50"
                    >
                        {saving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {lang === 'ar' ? 'حفظ' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
