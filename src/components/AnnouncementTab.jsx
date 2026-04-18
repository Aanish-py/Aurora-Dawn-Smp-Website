import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { useContent } from '../context/ContentContext';

const AnnouncementTab = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    const [visible, setVisible] = React.useState(true);
    const [scrolled, setScrolled] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const { content } = useContent();
    
    const announcements = content.marquee || [];
    const discordLink = content?.socialLinks?.find(link => link.name === 'Discord' || link.platform === 'Discord')?.url || 'https://dsc.gg/AuroraDawn';

    // Only render on the home page
    if (!isHomePage) return null;

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed ${scrolled ? 'top-20' : 'top-24'} left-0 right-0 z-40 transition-all duration-300 overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 shadow-2xl`}
        >
            <div className="absolute inset-0 bg-aurora-green/2 animate-pulse pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto flex items-center h-12 px-6">
                {/* Left Icon Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1 mr-6 rounded-md bg-white/5 border border-white/5 backdrop-blur-sm shrink-0">
                    <Bell className="w-3.5 h-3.5 text-aurora-green" />
                    <span className="text-[10px] font-black font-heading text-white uppercase tracking-[0.2em]">Live Status</span>
                </div>

                {/* Marquee Content */}
                <div className="flex-1 overflow-hidden relative flex items-center h-full">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear"
                        }}
                    >
                        {/* Render content twice for seamless loop */}
                        {[...announcements, ...announcements].map((text, i) => (
                            <div key={i} className="flex items-center mx-4 md:mx-10">
                                <Sparkles className="hidden xs:block w-3 h-3 text-aurora-green/40 mr-2 md:mr-4 shrink-0" />
                                <span className="text-[10px] md:text-xs font-bold text-white/90 tracking-[0.05em] md:tracking-[0.1em] uppercase hover:text-white transition-colors cursor-default whitespace-nowrap">
                                    {text}
                                </span>
                                <span className="mx-4 md:mx-10 text-white/5 font-black">/ /</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradients to fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
                </div>

                {/* Right Call to Action */}
                <div className="hidden md:flex shrink-0 ml-6">
                    <button 
                        onClick={() => window.open(discordLink, '_blank')}
                        className="text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group px-4 py-2 rounded-lg border text-aurora-green bg-aurora-green/5 hover:bg-aurora-green/10 border-aurora-green/20"
                    >
                        <span>Join Discord Community</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AnnouncementTab;
