import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email, password, metadata) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
                data: {
                    full_name: metadata.full_name,
                    phone_number: metadata.phone_number
                }
            }
        });

        if (data?.user && !error) {
            // Also insert into public.user_profiles table
            await supabase.from('user_profiles').upsert({
                id: data.user.id,
                full_name: metadata.full_name,
                phone_number: metadata.phone_number,
                email: email // Store email too for easier management
            });
        }
        return { data, error };
    };

    const login = async (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const logout = async () => {
        return supabase.auth.signOut();
    };

    return (
        <UserAuthContext.Provider value={{ user, signUp, login, logout, loading }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => useContext(UserAuthContext);
