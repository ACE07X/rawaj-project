import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            checkAdmin(session?.user?.id);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            checkAdmin(session?.user?.id);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkAdmin = async (userId) => {
        if (!userId) {
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('admins')
                .select('id')
                .eq('id', userId)
                .single();

            setIsAdmin(!!data && !error);
        } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAdmin(false);
    };

    return (
        <AdminAuthContext.Provider value={{
            session,
            isAdmin,
            isAdminLoggedIn: isAdmin, // Alias for legacy support
            loading,
            login,
            logout
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
