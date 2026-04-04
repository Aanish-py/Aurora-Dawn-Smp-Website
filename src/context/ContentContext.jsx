import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/siteContent.json';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load from Global API
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content');
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                    // Also save to local storage as a "snapshot"
                    localStorage.setItem('aurora_site_content', JSON.stringify(data));
                } else {
                    // Fallback to local storage if API fails
                    const saved = localStorage.getItem('aurora_site_content');
                    if (saved) setContent(JSON.parse(saved));
                }
            } catch (error) {
                console.error('Failed to fetch global content:', error);
                const saved = localStorage.getItem('aurora_site_content');
                if (saved) setContent(JSON.parse(saved));
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    const updateContent = async (newContent, isGlobal = false) => {
        // Update local state immediately for UI responsiveness
        setContent(newContent);
        localStorage.setItem('aurora_site_content', JSON.stringify(newContent));

        if (isGlobal) {
            try {
                const response = await fetch('/api/content', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer aurora-admin-2026'
                    },
                    body: JSON.stringify(newContent)
                });
                
                if (!response.ok) {
                    throw new Error('Server sync failed');
                }
                return true;
            } catch (error) {
                console.error('Global update failed:', error);
                return false;
            }
        }
        return true;
    };

    const resetContent = () => {
        setContent(initialData);
        localStorage.removeItem('aurora_site_content');
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
