import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAdminAuth();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { success, error: loginError } = await login(email, password);

            if (success) {
                navigate('/admin');
            } else {
                setError(loginError || 'Invalid credentials');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-slate-950">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop"
                    alt="Salalah Background"
                    className="w-full h-full object-cover opacity-50 animate-zoom-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/90" />
            </div>

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
                >
                    <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                    <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
                </button>

                <div className="glass-heavy rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-serif">
                            {lang === 'ar' ? 'تسجيل دخول المشرف' : 'Admin Login'}
                        </h1>
                        <p className="text-slate-300 mt-2 text-sm">
                            {lang === 'ar' ? 'يرجى إدخال بيانات الاعتماد الخاصة بك' : 'Please enter your credentials to continue'}
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-sm text-center backdrop-blur-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 rtl:right-3 rtl:left-auto" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 rtl:right-3 rtl:left-auto" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={lang === 'ar' ? 'كلمة المرور' : 'Password'}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{lang === 'ar' ? 'جاري التحقق...' : 'Verifying...'}</span>
                                </>
                            ) : (
                                <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
