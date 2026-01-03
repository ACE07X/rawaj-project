import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UserPlus, Mail, Lock, ArrowLeft, ArrowRight, User, Phone } from 'lucide-react';

const Signup = () => {
    const { t, lang } = useLanguage();
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { error } = await signUp(email, password, {
                full_name: fullName,
                phone_number: phone
            });
            if (error) throw error;
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-md w-full glass-card p-8 rounded-2xl relative z-10 border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-400 rotate-3 transition-transform hover:rotate-6">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-serif">
                        {lang === 'ar' ? 'انشئ حساباً جديداً' : 'Create an Account'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                        {lang === 'ar' ? 'انضم إلينا واحفظ عقاراتك المفضلة' : 'Join us and save your favorite properties'}
                    </p>
                </div>

                {success ? (
                    <div className="text-center bg-green-500/10 border border-green-500/20 p-6 rounded-xl animate-fade-in-up">
                        <h3 className="text-green-400 font-bold text-lg mb-2">
                            {lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration Successful!'}
                        </h3>
                        <p className="text-slate-300 text-sm mb-6">
                            {lang === 'ar'
                                ? 'يرجى التحقق من بريدك الإلكتروني لتأكيد التسجيل.'
                                : 'Please check your email to confirm your registration.'}
                        </p>
                        <Link to="/login" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium">
                            {lang === 'ar' ? 'الذهاب لتسجيل الدخول' : 'Go directly to Login'}
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="tel"
                                    required
                                    placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-mono"
                                    dir="ltr"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    placeholder={lang === 'ar' ? 'كلمة المرور' : 'Password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {lang === 'ar' ? 'اشتراك' : 'Sign Up'}
                                    <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                </>
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-white/5">
                            <p className="text-slate-400 text-sm">
                                {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                                    {lang === 'ar' ? 'سجل دخولك' : 'Log In'}
                                </Link>
                            </p>
                        </div>

                        <div className="text-center mt-6">
                            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm">
                                <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Signup;
