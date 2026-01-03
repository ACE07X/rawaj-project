import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { PropertiesProvider } from './context/PropertiesContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProtectedRoute from './ProtectedRoute';
import ConsentBanner from './components/ConsentBanner';

function App() {
    return (
        <LanguageProvider>
            <UserAuthProvider>
                <AdminAuthProvider>
                    <PropertiesProvider>
                        <HashRouter>
                            <div className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white min-h-screen flex flex-col">
                                <Header />
                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/properties" element={<Properties />} />
                                        <Route path="/properties/:id" element={<PropertyDetails />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/privacy" element={<PrivacyPolicy />} />

                                        {/* Protected Admin Routes */}
                                        <Route element={<ProtectedRoute />}>
                                            <Route path="/admin" element={<Admin />} />
                                        </Route>
                                    </Routes>
                                </main>
                                <Footer />
                                <ConsentBanner />
                            </div>
                        </HashRouter>
                    </PropertiesProvider>
                </AdminAuthProvider>
            </UserAuthProvider>
        </LanguageProvider>
    );
}

export default App;
