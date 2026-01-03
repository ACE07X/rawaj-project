import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProperties } from '../context/PropertiesContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
    LogOut, Home, Building2, Users, Settings, PlusCircle,
    Trash2, Edit, MapPin, DollarSign, LayoutGrid, X, Loader2, Code2
} from 'lucide-react';

const Admin = () => {
    const { logout } = useAdminAuth();
    const { properties, fetchProperties, loading } = useProperties();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProperty, setNewProperty] = useState({
        title_en: '', title_ar: '', description_en: '', description_ar: '',
        price: '', size: '', type: 'sale', status: 'available',
        city_en: 'Salalah', city_ar: 'صلالة', area_en: '', area_ar: '', image_url: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { error } = await supabase.from('properties').insert([newProperty]);
            if (error) throw error;
            setShowAddModal(false);
            setNewProperty({ title_en: '', title_ar: '', description_en: '', description_ar: '', price: '', size: '', type: 'sale', status: 'available', city_en: 'Salalah', city_ar: 'صلالة', area_en: '', area_ar: '', image_url: '' });
            fetchProperties();
        } catch (err) {
            alert('Failed to add property: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProperty = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        try {
            const { error } = await supabase.from('properties').delete().eq('id', id);
            if (error) throw error;
            fetchProperties();
        } catch (err) {
            alert('Failed to delete property: ' + err.message);
        }
    };

    const stats = [
        { label: 'Total Properties', value: properties.length, icon: Building2, color: 'bg-primary-500/20 text-primary-400' },
        { label: 'For Sale', value: properties.filter(p => p.type === 'sale').length, icon: DollarSign, color: 'bg-green-500/20 text-green-400' },
        { label: 'For Rent', value: properties.filter(p => p.type === 'rent').length, icon: Home, color: 'bg-blue-500/20 text-blue-400' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Al-Rawaj</h2>
                            <p className="text-xs text-slate-400">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400 font-medium">
                        <LayoutGrid className="w-5 h-5" /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-colors">
                        <Building2 className="w-5 h-5" /> Properties
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-colors">
                        <Users className="w-5 h-5" /> Users
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </a>
                </nav>

                {/* SoulTech Branding */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                        <Code2 className="w-4 h-4" />
                        <span>Made by <span className="font-semibold text-primary-400">SoulTech</span></span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </header>

                <div className="p-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="glass-card rounded-2xl p-6 flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Properties Table */}
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Properties</h2>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-500 transition-colors"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Property
                            </button>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" /></div>
                        ) : properties.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">No properties found. Add one to get started.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Property</th>
                                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Location</th>
                                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Price</th>
                                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Type</th>
                                            <th className="text-right px-6 py-4 text-slate-400 font-medium text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {properties.map((property) => (
                                            <tr key={property.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={property.image_url || 'https://via.placeholder.com/50'} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                        <span className="font-medium">{property.title_en || property.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4 text-primary-500" />
                                                        {property.area_en || property.location || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-primary-400">{parseInt(property.price).toLocaleString()} OMR</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.type === 'sale' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                        {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteProperty(property.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add Property Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Add New Property</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleAddProperty} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Title (English)" value={newProperty.title_en} onChange={e => setNewProperty({ ...newProperty, title_en: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                                <input type="text" placeholder="العنوان (عربي)" value={newProperty.title_ar} onChange={e => setNewProperty({ ...newProperty, title_ar: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" />
                                <input type="text" placeholder="Area (English)" value={newProperty.area_en} onChange={e => setNewProperty({ ...newProperty, area_en: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                                <input type="text" placeholder="المنطقة (عربي)" value={newProperty.area_ar} onChange={e => setNewProperty({ ...newProperty, area_ar: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" />
                                <input type="number" placeholder="Price (OMR)" value={newProperty.price} onChange={e => setNewProperty({ ...newProperty, price: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                                <input type="number" placeholder="Size (sqm)" value={newProperty.size} onChange={e => setNewProperty({ ...newProperty, size: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                                <select value={newProperty.type} onChange={e => setNewProperty({ ...newProperty, type: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>
                                <input type="url" placeholder="Image URL" value={newProperty.image_url} onChange={e => setNewProperty({ ...newProperty, image_url: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <textarea placeholder="Description (English)" value={newProperty.description_en} onChange={e => setNewProperty({ ...newProperty, description_en: e.target.value })} rows={3} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            <textarea placeholder="الوصف (عربي)" value={newProperty.description_ar} onChange={e => setNewProperty({ ...newProperty, description_ar: e.target.value })} rows={3} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" />
                            <button type="submit" disabled={submitting} className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Adding...</> : <><PlusCircle className="w-5 h-5" /> Add Property</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
