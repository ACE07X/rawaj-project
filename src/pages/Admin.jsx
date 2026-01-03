import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
            </div>
            <p>Welcome, Admin.</p>
        </div>
    );
};
export default Admin;
