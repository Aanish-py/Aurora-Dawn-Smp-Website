import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-aurora-dark/95 backdrop-blur-md">
            <div className="relative">
                {/* Glowing Background Pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-aurora-green/20 rounded-full blur-3xl"
                />
                
                {/* Logo / Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <img 
                        src="/aurora_stock_photos/favicon.png" 
                        alt="Aurora Logo" 
                        className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    />
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-col items-center"
            >
                <div className="text-xl md:text-2xl font-heading font-black tracking-[0.3em] text-white uppercase italic">
                    Entering <span className="text-aurora-green">The Dawn</span>
                </div>
                
                {/* Progress-ish Bar */}
                <div className="mt-4 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        animate={{
                            x: [-200, 200],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-aurora-green to-transparent"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default PageLoader;
