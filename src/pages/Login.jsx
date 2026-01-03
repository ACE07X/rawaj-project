import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
    const { t, lang } = useLanguage();
    const { login } = useAdminAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Updated login returns { success, isAdmin, error }
            const result = await login(email, password);

            if (!result.success) {
                if (result.error.includes("Email not confirmed")) {
                    throw new Error(lang === 'ar' ? 'يرجى تأكيد بريدك الإلكتروني أولاً' : 'Please verify your email address first.');
                }
                throw new Error(result.error);
            }

            // Strict Redirection Logic
            if (result.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err) {
            setError(err.message || 'Invalid login credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Luxury Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=1920&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-110"
                    alt="Luxury Background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-md w-full relative z-10 glass-heavy rounded-3xl p-8 border border-white/10 shadow-2xl animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30 transform rotate-3 border border-white/10">
                        <span className="text-white font-serif text-3xl font-bold">R</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">
                        {lang === 'ar' ? 'مرحبًا بعودتك' : 'Welcome to Al-Rawaj'}
                    </h2>
                    <p className="text-slate-400 text-sm tracking-wide uppercase">
                        {lang === 'ar' ? 'بوابة العقارات الفاخرة' : 'Premium Real Estate Portal'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-start gap-3 animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In To Dashboard'}
                                <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-6 border-t border-white/5 space-y-4">
                        <p className="text-slate-400 text-sm">
                            {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-bold hover:underline transition-all">
                                {lang === 'ar' ? 'أنشئ حساباً' : 'Create Account'}
                            </Link>
                        </p>

                        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs uppercase tracking-widest hover:tracking-[0.15em]">
                            <ArrowLeft className={`w-3 h-3 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                        </Link>
                    </div>
                </form>
            </div>

            {/* Footer Credit */}
            <div className="absolute bottom-6 text-center w-full z-10 text-white/20 text-xs">
                &copy; 2024 Al-Rawaj Real Estate. Secured by SoulTech.
            </div>
        </div>
    );
};

export default Login;
