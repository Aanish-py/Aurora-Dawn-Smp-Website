import React, { useEffect } from 'react';
import LoreSection from '../components/LoreSection';
import SpotlightCard from '../components/SpotlightCard';
import { motion } from 'framer-motion';

const LorePage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen bg-aurora-dark overflow-hidden">
            {/* Background Image Container */}
            <div className="fixed inset-0 z-0">
                <img 
                    src="/images/lore-bg.png" 
                    alt="Lore Background" 
                    className="w-full h-full object-cover opacity-40 scale-105 animate-aurora-flow"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-aurora-dark via-aurora-dark/60 to-aurora-dark" />
            </div>

            <div className="relative z-10 pt-16">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <LoreSection />
                </motion.div>
                
                {/* Additional page content removed */}
            </div>
        </div>
    );
};

export default LorePage;
