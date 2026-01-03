import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Users, Shield, User, Loader2, RefreshCw, Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AdminUsers = ({ onClose }) => {
    const { lang } = useLanguage();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [admins, setAdmins] = useState([]);

    // Fetch users from auth.users via a server function or user_profiles table
    // Since we can't directly access auth.users from client, we'll use a profiles approach
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch from user_profiles table (you'll need to create this)
            // For now, we'll show admins list
            const { data: adminData, error: adminError } = await supabase
                .from('admins')
                .select('*');

            if (adminError) throw adminError;
            setAdmins(adminData || []);

            // Try to get user profiles if table exists
            const { data: profileData, error: profileError } = await supabase
                .from('user_profiles')
                .select('*');

            if (!profileError && profileData) {
                setUsers(profileData);
            } else {
                // If user_profiles doesn't exist, show empty with setup message
                setUsers([]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleAdminRole = async (userId, isCurrentlyAdmin) => {
        try {
            if (isCurrentlyAdmin) {
                // Remove from admins
                const { error } = await supabase
                    .from('admins')
                    .delete()
                    .eq('id', userId);
                if (error) throw error;
            } else {
                // Add to admins
                const { error } = await supabase
                    .from('admins')
                    .insert([{ id: userId }]);
                if (error) throw error;
            }
            fetchUsers();
        } catch (err) {
            alert('Failed to update role: ' + err.message);
        }
    };

    const isAdmin = (userId) => admins.some(a => a.id === userId);

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number?.includes(searchTerm)
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-white/5 p-6 flex items-center justify-between z-10">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary-500" />
                        {lang === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
                    </h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchUsers}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder={lang === 'ar' ? 'بحث بالاسم أو البريد أو الهاتف...' : 'Search by name, email or phone...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {loading ? (
                        <div className="text-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
                            <p className="text-slate-400 mt-4">{lang === 'ar' ? 'جاري التحميل...' : 'Loading users...'}</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12 space-y-4">
                            <Users className="w-16 h-16 mx-auto text-slate-600" />
                            <div>
                                <p className="text-slate-400 text-lg font-medium">
                                    {lang === 'ar' ? 'لا يوجد مستخدمين حتى الآن' : 'No users registered yet'}
                                </p>
                                <p className="text-slate-500 text-sm mt-2">
                                    {lang === 'ar'
                                        ? 'سيظهر المستخدمون هنا بعد التسجيل'
                                        : 'Users will appear here after they register'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-lg">
                                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-bold">{user.full_name || 'No Name'}</p>
                                                {isAdmin(user.id) && (
                                                    <span className="px-2 py-0.5 rounded text-[10px] bg-primary-500 text-white font-black uppercase tracking-tighter">Admin</span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm">{user.email}</p>
                                            <p className="text-slate-500 text-xs mt-1">
                                                {user.phone_number && <span className="mr-3">📞 {user.phone_number}</span>}
                                                {lang === 'ar' ? 'انضم: ' : 'Joined: '}
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleAdminRole(user.id, isAdmin(user.id))}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isAdmin(user.id)
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                                                : 'bg-primary-500/10 text-primary-400 border-primary-500/20 hover:bg-primary-500 hover:text-white'
                                                }`}
                                        >
                                            <Shield className="w-4 h-4" />
                                            {isAdmin(user.id)
                                                ? (lang === 'ar' ? 'إزالة الإدارة' : 'Remove Admin')
                                                : (lang === 'ar' ? 'ترقية لمشرف' : 'Make Admin')
                                            }
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Setup Notice */}
                <div className="p-4 bg-slate-800/50 border-t border-white/5">
                    <p className="text-xs text-slate-500 text-center">
                        {lang === 'ar'
                            ? 'ملاحظة: يتم جلب المستخدمين من جدول user_profiles في Supabase'
                            : 'Note: Users are fetched from user_profiles table in Supabase'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
