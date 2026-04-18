import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Copy, Check, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const MobileMenu = ({ isOpen, onClose, tabs }) => {
    const { content } = useContent();
    const [isIpCopied, setIsIpCopied] = useState(false);

    const discordLink = content?.socialLinks?.find(link => link.name === 'Discord' || link.platform === 'Discord')?.url || 'https://dsc.gg/AuroraDawn';
    const serverIP = content?.serverInfo?.javaIP || 'play.auroradawn.net';

    const handleCopyIp = () => {
        navigator.clipboard.writeText(serverIP);
        setIsIpCopied(true);
        setTimeout(() => setIsIpCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md lg:hidden pointer-events-auto"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[70] bg-[#0a0a0c] border-l border-white/10 lg:hidden flex flex-col shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                            <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-aurora-green text-xl tracking-tighter uppercase">Navigation</span>
                            <button 
                                onClick={onClose}
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-8">
                            <nav className="px-6 space-y-4">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.name}
                                        to={tab.href}
                                        onClick={onClose}
                                        className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-aurora-green/30 hover:bg-white/5 transition-all duration-300"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-xl font-black font-heading text-white group-hover:text-aurora-green uppercase tracking-tighter transition-colors">
                                                {tab.name}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-aurora-green group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Footer Section */}
                        <div className="p-8 border-t border-white/5 bg-black/20 space-y-4">
                            <button 
                                onClick={() => window.open(discordLink, '_blank')}
                                className="flex items-center justify-center w-full p-4 rounded-xl transition-all font-black uppercase tracking-widest text-xs shadow-lg bg-aurora-green text-black hover:brightness-110 shadow-aurora-green/20"
                            >
                                <span>Join Discord Link</span>
                            </button>
                            <button 
                                onClick={handleCopyIp}
                                className="w-full group"
                            >
                                <p className={`text-xs text-center uppercase tracking-[0.2em] font-bold transition-colors ${
                                    isIpCopied ? 'text-aurora-green' : 'text-white/40 group-hover:text-white/60'
                                }`}>
                                    {isIpCopied ? 'IP COPIED!' : serverIP}
                                </p>
                            </button>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-aurora-green/10 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;

