import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError('Failed to load properties');
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
