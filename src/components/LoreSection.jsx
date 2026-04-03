import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Maximize2, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';

const LoreSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Generate random particles for the background effect
    const particles = Array.from({ length: 15 });

    return (
        <section className="relative pt-4 md:pt-8 pb-12 md:pb-20 px-4 overflow-hidden">
            {/* Animated Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-aurora-green/40 rounded-full blur-[2px]"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: Math.random() * 800,
                            opacity: 0 
                        }}
                        animate={{ 
                            y: [null, Math.random() * -100 - 50],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{ 
                            duration: Math.random() * 5 + 5, 
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aurora-green/10 border border-aurora-green/20 text-aurora-green text-sm font-heading tracking-widest uppercase mb-6">
                        <Sparkles size={14} />
                        Divine Knowledge
                    </div>
                    <h2 className="text-5xl md:text-7xl font-heading mb-6 text-white tracking-tight">
                        The Will of Aurora
                    </h2>
                    <p className="text-xl md:text-2xl font-body text-aurora-text/80 max-w-2xl mx-auto italic leading-relaxed">
                        "Ancient texts speak of a light that never fades, and a world where every block tells a story of gods and men."
                    </p>
                </motion.div>

                {/* Main Container with Magical Frame */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative p-1.5 md:p-3 rounded-[32px] overflow-hidden group"
                >
                    {/* Animated Border/Frame Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-aurora-green/40 via-aurora-blue/40 to-aurora-green/40 animate-aurora-flow z-0" />
                    
                    <div className="relative z-10 p-1 md:p-2 rounded-[28px] bg-[#0A0A0F] backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,210,160,0.2)]">
                        {/* Iframe Preview Container */}
                        <div className="relative aspect-[16/10] md:h-[700px] w-full rounded-[24px] overflow-hidden bg-[#050505]">
                            {/* Loading State Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-0">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="mb-4 text-aurora-green/20"
                                >
                                    <Sparkles size={48} />
                                </motion.div>
                                <p className="text-white/10 font-heading tracking-widest uppercase text-sm">Synchronizing Chronology...</p>
                            </div>

                            <iframe 
                                src="https://online.anyflip.com/ebmkm/buzz/mobile/index.html" 
                                className="relative w-full h-full border-none z-10"
                                title="Aurora Lore Flipbook"
                                loading="lazy"
                                allowFullScreen
                            />
                            
                            {/* Desktop Overlay to trigger modal */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-6 z-20 pointer-events-none md:pointer-events-auto">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleModal}
                                    className="hidden md:flex flex-row items-center gap-3 bg-white text-black font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-aurora-green transition-colors"
                                >
                                    <Maximize2 size={20} />
                                    EXPAND CHRONICLE
                                </motion.button>
                                
                                <a 
                                    href="https://online.anyflip.com/ebmkm/buzz/mobile/index.html" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    <ExternalLink size={14} />
                                    Open Direct Link
                                </a>
                            </div>

                            {/* Help indicator for potential 403 issues */}
                            <div className="absolute bottom-4 right-4 z-30 opacity-40 group-hover:opacity-100 transition-opacity hidden md:block">
                                <div className="group/help relative">
                                    <HelpCircle size={20} className="text-white/30 cursor-help" />
                                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-black/90 border border-white/10 rounded-xl text-[10px] text-white/60 leading-relaxed pointer-events-none opacity-0 group-hover/help:opacity-100 transition-opacity">
                                        If the chronicle fails to load, your browser may be blocking the divine connection. Try the **Direct Link** or check your shield/extension settings.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tablet/Mobile Action Button */}
                <div className="mt-12 flex justify-center">
                    <motion.button 
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleModal}
                        className="flex items-center gap-4 bg-gradient-to-r from-aurora-green to-aurora-blue text-black font-heading tracking-wider py-5 px-12 rounded-2xl shadow-[0_15px_40px_rgba(0,210,160,0.4)] hover:shadow-[0_20px_60px_rgba(0,210,160,0.6)] transition-all duration-300 group"
                    >
                        <BookOpen size={26} className="group-hover:rotate-12 transition-transform" />
                        READ THE LEGENDS
                    </motion.button>
                </div>
            </div>

            {/* Premium Fullscreen Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-2 md:p-6"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={toggleModal}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-all z-[10000] bg-white/5 hover:bg-white/20 p-3 rounded-full"
                        >
                            <X size={32} />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full h-full max-w-[1600px] max-h-[95vh] rounded-3xl overflow-hidden shadow-[0_0_150px_rgba(0,210,160,0.15)] border border-white/10"
                        >
                            <iframe 
                                src="https://online.anyflip.com/ebmkm/buzz/mobile/index.html" 
                                className="w-full h-full border-none bg-white"
                                title="Aurora Lore Fullscreen"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LoreSection;
