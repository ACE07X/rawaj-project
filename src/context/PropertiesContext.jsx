import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        setLoading(true);
        setError(null);
        try {
            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Connection timed out. Please check your internet or try again later.')), 15000)
            );

            const fetchPromise = supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            // Race between fetch and timeout
            const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

            if (error) throw error;
            setProperties(data || []);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err.message || 'Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <PropertiesContext.Provider value={{ properties, loading, error, fetchProperties }}>
            {children}
        </PropertiesContext.Provider>
    );
};

export const useProperties = () => useContext(PropertiesContext);
