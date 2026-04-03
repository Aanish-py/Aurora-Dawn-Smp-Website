import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/siteContent.json';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('aurora_site_content');
        return saved ? JSON.parse(saved) : initialData;
    });

    useEffect(() => {
        localStorage.setItem('aurora_site_content', JSON.stringify(content));
    }, [content]);

    const updateContent = (newContent) => {
        setContent(newContent);
    };

    const resetContent = () => {
        setContent(initialData);
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, resetContent }}>
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
