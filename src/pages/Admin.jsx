import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProperties } from '../context/PropertiesContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
    LogOut, Home, Building2, Users, Settings, PlusCircle,
    Trash2, Edit, MapPin, DollarSign, LayoutGrid, X, Loader2, Code2, Upload, Image as ImageIcon, CheckCircle, Smartphone
} from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';

const Admin = () => {
    const { logout } = useAdminAuth();
    const { properties, fetchProperties, loading } = useProperties();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [activeTab, setActiveTab] = useState('properties'); // 'properties' or 'users'

    // New Property State
    const [newProperty, setNewProperty] = useState({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: '',
        price: '',
        size: '',
        type: 'house', // default
        status: 'available', // default
        city_en: 'Salalah',
        city_ar: 'صلالة',
        area_en: '',
        area_ar: '',
        image_url: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleImageUpload = async (file) => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('property-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            alert('Error uploading image: ' + error.message);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const [editingId, setEditingId] = useState(null);

    const handleEditProperty = (property) => {
        setNewProperty({
            title_en: property.title_en || property.title,
            title_ar: property.title_ar,
            description_en: property.description_en,
            description_ar: property.description_ar,
            price: property.price,
            size: property.size,
            type: property.type,
            status: property.status,
            city_en: property.city_en || 'Salalah',
            city_ar: property.city_ar || 'صلالة',
            area_en: property.area_en,
            area_ar: property.area_ar,
            image_url: property.image_url
        });
        setEditingId(property.id);
        setShowAddModal(true);
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let finalImageUrl = newProperty.image_url;

            // If a file is selected, upload it first
            if (imageFile) {
                const uploadedUrl = await handleImageUpload(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const propertyData = {
                ...newProperty,
                price: parseFloat(newProperty.price) || 0,
                size: newProperty.size ? parseFloat(newProperty.size) : null,
                image_url: finalImageUrl
            };

            let error;
            if (editingId) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('properties')
                    .update(propertyData)
                    .eq('id', editingId);
                error = updateError;
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('properties')
                    .insert([propertyData]);
                error = insertError;
            }

            if (error) throw error;

            setShowAddModal(false);
            // Reset form
            setNewProperty({
                title_en: '', title_ar: '', description_en: '', description_ar: '',
                price: '', size: '', type: 'house', status: 'available',
                city_en: 'Salalah', city_ar: 'صلالة', area_en: '', area_ar: '', image_url: ''
            });
            setImageFile(null);
            setEditingId(null);
            fetchProperties();
            alert(editingId ? "Property Updated Successfully!" : "Property Published Successfully!");
        } catch (err) {
            alert('Failed to save property: ' + err.message);
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
        { label: 'Available', value: properties.filter(p => p.status === 'available').length, icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
        { label: 'Sold/Reserved', value: properties.filter(p => p.status !== 'available').length, icon: DollarSign, color: 'bg-blue-500/20 text-blue-400' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col hidden md:flex">
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
                    <button
                        onClick={() => setActiveTab('properties')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'properties' ? 'bg-primary-500/10 text-primary-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutGrid className="w-5 h-5" /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'users' ? 'bg-primary-500/10 text-primary-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Users className="w-5 h-5" /> Users
                    </button>
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <Settings className="w-5 h-5" /> Settings
                    </button>
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
            <main className="flex-1 overflow-y-auto h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Logout</span>
                    </button>
                </header>

                <div className="p-4 md:p-8 pb-32">
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
                    {activeTab === 'properties' ? (
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                                <h2 className="text-xl font-bold">Properties Management</h2>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-600/20"
                                >
                                    <PlusCircle className="w-5 h-5" /> <span className="font-semibold">Post New Property</span>
                                </button>
                            </div>

                            {loading ? (
                                <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" /></div>
                            ) : properties.length === 0 ? (
                                <div className="p-12 text-center text-slate-400">No properties found. Click "Post New Property" to start.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-800/50">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Property</th>
                                                <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Type</th>
                                                <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Status</th>
                                                <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Price</th>
                                                <th className="text-right px-6 py-4 text-slate-400 font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {properties.map((property) => (
                                                <tr key={property.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={property.image_url || 'https://via.placeholder.com/50'} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-800" />
                                                            <div>
                                                                <div className="font-medium line-clamp-1">{property.title_en || property.title}</div>
                                                                <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {property.area_en || property.location || '-'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-300 capitalize">{property.type}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${property.status === 'sold' ? 'bg-red-500/20 text-red-400' :
                                                            property.status === 'reserved' ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-green-500/20 text-green-400'
                                                            }`}>
                                                            {property.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-primary-400">{parseInt(property.price).toLocaleString()} OMR</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => handleEditProperty(property)} className="p-2 rounded-lg text-primary-400 hover:bg-primary-500/20 transition-colors" title="Edit Property">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleDeleteProperty(property.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors" title="Delete Property">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ) : (
                        <AdminUsers />
                    )}
                </div>
            </main>

            {/* Add Property Modal */}
            {/* Add Property Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl animate-zoom-in">
                        <div className="sticky top-0 bg-slate-900 border-b border-white/5 p-6 flex items-center justify-between z-10">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {editingId ? (
                                    <><Edit className="w-5 h-5 text-primary-500" /> Edit Property</>
                                ) : (
                                    <><PlusCircle className="w-5 h-5 text-primary-500" /> Post New Property</>
                                )}
                            </h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleAddProperty} className="p-6 space-y-6">
                            {/* Image Upload Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Property Image</label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors bg-slate-800/50">
                                    {(imageFile || newProperty.image_url) ? (
                                        <div className="relative inline-block">
                                            <img src={imageFile ? URL.createObjectURL(imageFile) : newProperty.image_url} alt="Preview" className="h-48 rounded-lg object-contain" />
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setNewProperty({ ...newProperty, image_url: '' }); }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-4 rounded-full bg-slate-800">
                                                <ImageIcon className="w-8 h-8 text-slate-500" />
                                            </div>
                                            <p className="text-slate-400">Drag & drop or click to upload</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImageFile(e.target.files[0])}
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium mt-2">
                                                Select Photo
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">English Title</label>
                                    <input type="text" placeholder="e.g. Luxury Villa in Hawana" value={newProperty.title_en} onChange={e => setNewProperty({ ...newProperty, title_en: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Arabic Title</label>
                                    <input type="text" placeholder="مثال: فيلا فاخرة في هوانا" value={newProperty.title_ar} onChange={e => setNewProperty({ ...newProperty, title_ar: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Property Type</label>
                                    <select value={newProperty.type} onChange={e => setNewProperty({ ...newProperty, type: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 capitalize">
                                        <option value="house">House / Villa</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="land">Land</option>
                                        <option value="hotel">Hotel / Resort</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Status</label>
                                    <select value={newProperty.status} onChange={e => setNewProperty({ ...newProperty, status: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 capitalize">
                                        <option value="available">Available (For Sale/Rent)</option>
                                        <option value="reserved">Reserved</option>
                                        <option value="sold">Sold</option>
                                    </select>
                                </div>

                                <input type="text" placeholder="Area (English)" value={newProperty.area_en} onChange={e => setNewProperty({ ...newProperty, area_en: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                                <input type="text" placeholder="المنطقة (عربي)" value={newProperty.area_ar} onChange={e => setNewProperty({ ...newProperty, area_ar: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" />
                                <input type="number" placeholder="Price (OMR)" value={newProperty.price} onChange={e => setNewProperty({ ...newProperty, price: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                                <input type="number" placeholder="Size (sqm)" value={newProperty.size} onChange={e => setNewProperty({ ...newProperty, size: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>

                            <textarea placeholder="Description (English)" value={newProperty.description_en} onChange={e => setNewProperty({ ...newProperty, description_en: e.target.value })} rows={3} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            <textarea placeholder="الوصف (عربي)" value={newProperty.description_ar} onChange={e => setNewProperty({ ...newProperty, description_ar: e.target.value })} rows={3} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-right" dir="rtl" />

                            <button type="submit" disabled={submitting || uploading} className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary-600/20">
                                {submitting || uploading ? (
                                    <><Loader2 className="w-6 h-6 animate-spin" /> {uploading ? 'Uploading Image...' : (editingId ? 'Updating Property...' : 'Publishing Property...')}</>
                                ) : (
                                    <><Upload className="w-6 h-6" /> {editingId ? 'Update Property' : 'Publish Now'}</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* Settings Modal */}
            {showSettingsModal && (
                <AdminSettings onClose={() => setShowSettingsModal(false)} />
            )}
        </div>
    );
};

export default Admin;
