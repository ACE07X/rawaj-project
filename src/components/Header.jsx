import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import { Menu, X, Globe, User, LogIn, LayoutDashboard, UserPlus } from 'lucide-react';

const Header = () => {
    const { t, lang, toggleLanguage } = useLanguage();
    const { isAdmin, loading: adminLoading } = useAdminAuth();
    const { user, logout: userLogout } = useUserAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await userLogout();
        navigate('/');
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.properties'), path: '/properties' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <header
            className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl' : 'bg-slate-900/20 backdrop-blur-sm py-6 border-b border-white/5'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-primary-900/50 border border-white/10">
                        <span className="text-white font-bold text-2xl font-serif">R</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white font-serif tracking-tight leading-none group-hover:text-primary-400 transition-colors">
                            {lang === 'ar' ? 'الروّاج' : 'Al-Rawaj'}
                        </span>
                        <span className="text-[10px] text-accent-400 uppercase tracking-[0.2em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                            {lang === 'ar' ? 'للعقارات الفاخرة' : 'Premium Real Estate'}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full backdrop-blur-md border border-white/5 shadow-inner">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="px-6 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center border border-white/5"
                        title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                    >
                        <Globe className="w-5 h-5" />
                    </button>

                    {isAdmin ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20 hover:scale-105 active:scale-95"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            {lang === 'ar' ? 'لوحة القيادة' : 'Dashboard'}
                        </Link>
                    ) : user ? (
                        <div className="flex items-center gap-3 bg-white/5 rounded-full pl-4 pr-1.5 py-1.5 border border-white/5">
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <User className="w-4 h-4 text-primary-500" />
                                <span className="max-w-[100px] truncate font-medium">{user.email?.split('@')[0]}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
                            >
                                {lang === 'ar' ? 'خروج' : 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-slate-300 font-bold hover:text-white transition-colors hover:bg-white/5 border border-transparent hover:border-white/10"
                            >
                                <LogIn className="w-4 h-4" />
                                {lang === 'ar' ? 'دخول' : 'Login'}
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/20 active:scale-95"
                            >
                                <UserPlus className="w-4 h-4" />
                                {lang === 'ar' ? 'إنشاء حساب' : 'Get Started'}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4 md:hidden flex flex-col gap-4 animate-fade-in-down shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors font-medium border border-transparent hover:border-white/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />

                    {user ? (
                        <div className="space-y-2">
                            <div className="px-4 py-2 text-slate-400 text-sm flex items-center gap-2">
                                <User className="w-4 h-4" /> {user.email}
                            </div>
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors"
                            >
                                {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to="/login"
                                className="text-center px-4 py-3 rounded-xl bg-white/5 text-slate-200 font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LogIn className="w-4 h-4" />
                                {lang === 'ar' ? 'دخول' : 'Login'}
                            </Link>
                            <Link
                                to="/signup"
                                className="text-center px-4 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-colors flex justify-center items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <UserPlus className="w-4 h-4" />
                                {lang === 'ar' ? 'حساب جديد' : 'Join'}
                            </Link>
                        </div>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="block px-4 py-3 rounded-xl bg-accent-500/20 text-accent-400 font-bold border border-accent-500/30"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {lang === 'ar' ? 'لوحة المشرف' : 'Admin Dashboard'}
                        </Link>
                    )}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 transition-colors mt-2"
                    >
                        <Globe className="w-5 h-5" />
                        {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
