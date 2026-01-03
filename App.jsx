import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
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
import ProtectedRoute from './ProtectedRoute';

const Layout = ({ children, showHeaderFooter = true }) => {
    return (
        <>
            {showHeaderFooter && <Header />}
            {children}
            {showHeaderFooter && <Footer />}
        </>
    );
};

function App() {
    return (
        <HashRouter>
            <LanguageProvider>
                <AdminAuthProvider>
                    <PropertiesProvider>
                        <div className="min-h-screen bg-slate-900 text-white">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Layout><Home /></Layout>} />
                                <Route path="/properties" element={<Layout><Properties /></Layout>} />
                                <Route path="/properties/:id" element={<Layout><PropertyDetails /></Layout>} />
                                <Route path="/about" element={<Layout><About /></Layout>} />
                                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                                <Route path="/login" element={<Layout showHeaderFooter={false}><Login /></Layout>} />

                                {/* Protected Admin Route - wrapped with ProtectedRoute */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/admin" element={<Layout showHeaderFooter={false}><Admin /></Layout>} />
                                </Route>
                            </Routes>
                        </div>
                    </PropertiesProvider>
                </AdminAuthProvider>
            </LanguageProvider>
        </HashRouter>
    );
}

export default App;
