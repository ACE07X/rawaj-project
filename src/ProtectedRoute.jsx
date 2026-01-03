import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const { isAdmin, loading } = useAdminAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
