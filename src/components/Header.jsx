import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Menu, X } from 'lucide-react';

const Header = () => {
    const { t, lang, toggleLang } = useLanguage();
    const { isAdminLoggedIn } = useAdminAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navItems = [
        { path: '/', label: t('nav.home') },
        { path: '/properties', label: t('nav.properties') },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') }
    ];

    const adminLink = isAdminLoggedIn
        ? { path: '/admin', label: t('nav.admin') }
        : { path: '/login', label: lang === 'ar' ? 'دخول المشرف' : 'Admin Login', icon: Lock };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'glass-heavy py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 relative z-50 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div className={`hidden sm:block transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}>
                            <div className="text-white font-bold text-lg font-serif tracking-wide">{lang === 'ar' ? 'الروّاج' : 'Al-Rawaj'}</div>
                            <div className="text-primary-400 text-[10px] uppercase tracking-[0.2em] font-medium">{lang === 'ar' ? 'للعقارات' : 'Real Estate'}</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${isActive(item.path)
                                        ? 'text-white bg-primary-600 shadow-lg shadow-primary-500/20'
                                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className="px-4 py-2 rounded-xl bg-slate-800/50 text-slate-300 text-sm font-medium hover:bg-slate-700/50 hover:text-white transition-all border border-white/5 hover:border-white/20"
                        >
                            <span className="font-serif">{lang === 'en' ? 'العربية' : 'English'}</span>
                        </button>

                        <Link
                            to={adminLink.path}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${isAdminLoggedIn
                                    ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'border-white/10 text-slate-300 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/10'
                                }`}
                        >
                            {adminLink.icon && <adminLink.icon className="w-4 h-4" />}
                            {adminLink.label}
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Keeping access to Admin/Lang */}
                    <div className="flex items-center gap-3 md:hidden z-50">
                        <button
                            onClick={toggleLang}
                            className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10 border border-white/5"
                        >
                            {lang === 'en' ? 'AR' : 'EN'}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-2xl font-serif font-medium transition-all duration-300 ${isActive(item.path) ? 'text-primary-400' : 'text-white hover:text-primary-300'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="w-16 h-px bg-white/10 my-4" />

                    <Link
                        to={adminLink.path}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary-600/10 text-primary-400 border border-primary-500/20 font-bold"
                    >
                        {adminLink.icon && <adminLink.icon className="w-5 h-5" />}
                        {adminLink.label}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
