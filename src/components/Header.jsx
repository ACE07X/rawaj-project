import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import { Menu, X, Globe, User, LogIn, LayoutDashboard } from 'lucide-react';

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
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary-600/20">
                        <span className="text-white font-bold text-xl font-serif">R</span>
                    </div>
                    <span className="text-2xl font-bold text-white font-serif tracking-tight">
                        {lang === 'ar' ? 'الروّاج' : 'Al-Rawaj'}
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/5">
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
                        className="p-2 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Globe className="w-4 h-4" />
                        {lang === 'en' ? 'العربية' : 'English'}
                    </button>

                    {isAdmin ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                        </Link>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <User className="w-4 h-4" />
                                <span className="max-w-[100px] truncate">{user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                {lang === 'ar' ? 'خروج' : 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/5"
                            >
                                <LogIn className="w-4 h-4" />
                                {lang === 'ar' ? 'دخول' : 'Login'}
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20"
                            >
                                {lang === 'ar' ? 'تسجيل' : 'Sign Up'}
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
                <div className="absolute top-full left-0 w-full bg-slate-950 border-t border-white/10 p-4 md:hidden flex flex-col gap-4 animate-fade-in-down shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />

                    {user ? (
                        <>
                            <div className="px-4 py-2 text-slate-400 text-sm">{user.email}</div>
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-red-400 hover:text-red-300 transition-colors"
                            >
                                {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-4 py-3 rounded-xl hover:bg-white/5 text-primary-400 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {lang === 'ar' ? 'تسجيل الدخول / إنشاء حساب' : 'Login / Sign Up'}
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="block px-4 py-3 rounded-xl bg-primary-600/20 text-primary-400 font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {lang === 'ar' ? 'لوحة المشرف' : 'Admin Dashboard'}
                        </Link>
                    )}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 transition-colors"
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
