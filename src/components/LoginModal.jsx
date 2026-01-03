import React, { useState } from 'react';
import { X, Mail, Lock, UserPlus, LogIn, ArrowRight, Wallet, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserAuth } from '../context/UserAuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
    const { t, lang } = useLanguage();
    const { login: userLogin, signUp } = useUserAuth();
    const { login: adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        try {
            if (mode === 'login') {
                // Try Admin Login First (Implicit check)
                const adminResult = await adminLogin(email, password);
                if (adminResult.success && adminResult.isAdmin) {
                    onClose();
                    navigate('/admin');
                    return;
                }

                // If not admin, try User Login
                const { error: userError } = await userLogin(email, password);
                if (userError) throw userError;

                onClose();
                // Stay on current page, header updates automatically
            } else {
                // Signup
                const { error: signUpError } = await signUp(email, password);
                if (signUpError) throw signUpError;

                setSuccessMessage(lang === 'ar' ? 'تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.' : 'Account created! Please check your email to verify.');
                setMode('login'); // Switch to login view
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Header */}
                <div className="relative p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white font-serif">
                        {mode === 'login'
                            ? (lang === 'ar' ? 'تسجيل الدخول' : 'Welcome Back')
                            : (lang === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-2 gap-2 bg-slate-950/50">
                    <button
                        onClick={() => { setMode('login'); setError(null); }}
                        className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${mode === 'login'
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <LogIn className="w-4 h-4" />
                        {lang === 'ar' ? 'دخول' : 'Login'}
                    </button>
                    <button
                        onClick={() => { setMode('signup'); setError(null); }}
                        className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${mode === 'signup'
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <UserPlus className="w-4 h-4" />
                        {lang === 'ar' ? 'تسجيل' : 'Sign Up'}
                    </button>
                </div>

                {/* Form */}
                <div className="p-8">
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
                            {successMessage}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-500 font-medium ml-1">
                                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all font-medium"
                                    placeholder={lang === 'ar' ? 'name@example.com' : 'name@example.com'}
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-500 font-medium ml-1">
                                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all font-medium"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login'
                                        ? (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                                        : (lang === 'ar' ? 'إنشاء حساب' : 'Create Account')}
                                    <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {mode === 'login' && (
                    <div className="p-4 bg-slate-950/50 text-center border-t border-white/5">
                        <p className="text-xs text-slate-500">
                            {lang === 'ar' ? 'محمي بواسطة' : 'Secured by'} <span className="font-bold text-slate-400">SoulTech</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
