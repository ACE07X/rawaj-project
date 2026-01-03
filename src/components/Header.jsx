import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import { Menu, X, Globe, User, LogIn, LayoutDashboard, UserPlus, LogOut, ChevronDown, Shield } from 'lucide-react';

const Header = () => {
    const { t, lang, toggleLang } = useLanguage();
    const { isAdmin, logout: adminLogout } = useAdminAuth();
    const { user, logout: userLogout } = useUserAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setIsProfileOpen(false);
        if (isProfileOpen) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isProfileOpen]);

    const handleLogout = async (e) => {
        if (e) e.stopPropagation();
        try {
            await (isAdmin ? adminLogout() : userLogout());
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate('/');
        } catch (err) {
            console.error("Logout failed:", err);
            localStorage.clear();
            navigate('/login');
        }
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.properties'), path: '/properties' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-slate-900/20 backdrop-blur-sm py-5 border-b border-white/5'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-primary-900/40 border border-white/10">
                        <span className="text-white font-bold text-xl font-serif">R</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white font-serif tracking-tight leading-none group-hover:text-primary-400 transition-colors">
                            {lang === 'ar' ? 'الروّاج' : 'Al-Rawaj'}
                        </span>
                        <span className="text-[9px] text-accent-400 uppercase tracking-[0.2em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                            {lang === 'ar' ? 'للعقارات الفاخرة' : 'Premium Real Estate'}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${window.location.hash === `#${link.path}` || (window.location.hash === '' && link.path === '/')
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleLang}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center border border-white/5 hover:border-white/20"
                    >
                        <Globe className="w-5 h-5" />
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
                                className={`flex items-center gap-3 pl-1.5 pr-3 py-1.5 rounded-full border transition-all duration-300 ${isProfileOpen
                                    ? 'bg-primary-600/20 border-primary-500/50 shadow-lg shadow-primary-900/20'
                                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                                    }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left hidden lg:block">
                                    <p className="text-xs font-bold text-white truncate max-w-[100px]">
                                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        {isAdmin ? (lang === 'ar' ? 'مسؤول' : 'Administrator') : (lang === 'ar' ? 'عضو' : 'Verified Member')}
                                    </p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-primary-400' : ''}`} />
                            </button>

                            {/* Premium Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-fade-in-up z-50">
                                    <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                                        <p className="text-sm font-bold text-white truncate">{user.user_metadata?.full_name || 'Al-Rawaj Guest'}</p>
                                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                                    </div>

                                    <div className="p-2 space-y-1">
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-primary-600/20 hover:text-primary-400 transition-all border border-transparent hover:border-primary-500/20"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span className="text-sm font-medium">{lang === 'ar' ? 'لوحة القيادة' : 'Admin Dashboard'}</span>
                                            </Link>
                                        )}
                                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 cursor-not-allowed">
                                            <User className="w-4 h-4" />
                                            <span className="text-sm font-medium">{lang === 'ar' ? 'الملف الشخصي (قريباً)' : 'My Profile (Soon)'}</span>
                                        </div>
                                    </div>

                                    <div className="px-2 pt-2 mt-2 border-t border-white/5">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm font-bold">{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-xl text-slate-300 font-bold hover:text-white hover:bg-white/5 transition-all text-sm"
                            >
                                {lang === 'ar' ? 'دخول' : 'Login'}
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/30 active:scale-95 text-sm border border-primary-500/20"
                            >
                                {lang === 'ar' ? 'إنشاء حساب' : 'Join Now'}
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
                <div className="absolute top-full left-0 w-full bg-slate-950/98 backdrop-blur-3xl border-t border-white/10 p-6 md:hidden flex flex-col gap-6 animate-fade-in-down shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[50vh] max-h-[calc(100vh-80px)] overflow-y-auto z-50">
                    {/* Mobile User Profile Section */}
                    {user && (
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-inner">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-lg border-2 border-primary-500/20">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-lg font-bold text-white truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                    <div className="mt-1">
                                        {isAdmin ? (
                                            <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-400 text-[10px] font-bold border border-primary-500/20 uppercase tracking-tighter">Administrator</span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded bg-white/10 text-slate-400 text-[10px] font-bold border border-white/10 uppercase tracking-tighter">Verified Member</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 mt-4">
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        {lang === 'ar' ? 'لوحة القيادة' : 'Admin Dashboard'}
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 ml-2">Main Menu</p>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white/5 text-slate-300 hover:text-white transition-all font-medium border border-transparent hover:border-white/5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-lg">{link.name}</span>
                                <ChevronDown className="-rotate-90 w-5 h-5 text-slate-600" />
                            </Link>
                        ))}
                    </div>

                    {!user && (
                        <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                            <Link
                                to="/signup"
                                className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-xl shadow-primary-900/40"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <UserPlus className="w-5 h-5" />
                                {lang === 'ar' ? 'إنشاء حساب جديد' : 'Join Al-Rawaj'}
                            </Link>
                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all border border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LogIn className="w-5 h-5" />
                                {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                            </Link>
                        </div>
                    )}

                    <div className="pt-6 mt-4 border-t border-white/5">
                        <button
                            onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/5 text-slate-300 transition-all hover:bg-white/10 border border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-primary-500" />
                                <span className="font-bold">{lang === 'en' ? 'Switch to Arabic' : 'تغيير للغة الإنجليزية'}</span>
                            </div>
                            <span className="text-xs text-slate-500 uppercase font-black">{lang === 'en' ? 'AR' : 'EN'}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
