import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';

import { useContent } from '../context/ContentContext';

const AnnouncementTab = () => {
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

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed ${scrolled ? 'top-20' : 'top-24'} left-0 right-0 z-40 transition-all duration-300 overflow-hidden bg-gradient-to-r from-aurora-dark via-[#1a1f3c] to-aurora-dark border-b border-white/10 shadow-lg`}
        >
            <div className="absolute inset-0 bg-aurora-green/5 animate-pulse pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto flex items-center h-14 px-6">
                {/* Left Icon Badge */}
                <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 mr-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shrink-0">
                    <Bell className="w-4 h-4 text-aurora-green" />
                    <span className="text-sm font-bold font-heading text-white uppercase tracking-wider">Updates</span>
                </div>

                {/* Marquee Content */}
                <div className="flex-1 overflow-hidden relative mask-linear-gradient flex items-center">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear"
                        }}
                    >
                        {/* Render content twice for seamless loop */}
                        {[...announcements, ...announcements].map((text, i) => (
                            <div key={i} className="flex items-center mx-8">
                                <Sparkles className="w-4 h-4 text-aurora-blue mr-3 opacity-70" />
                                <span className="text-base font-medium text-aurora-text/90 tracking-wide hover:text-white transition-colors cursor-default">
                                    {text}
                                </span>
                                <span className="mx-8 text-white/10">•</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradients to fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-aurora-dark to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-aurora-dark to-transparent z-10 pointer-events-none"></div>
                </div>

                {/* Right Call to Action */}
                <div className="hidden md:flex shrink-0 ml-6">
                    <a href="#" className="text-sm text-aurora-green hover:text-white transition-colors font-semibold">Join Discord &rarr;</a>
                </div>
            </div>
        </motion.div>
    );
};

export default AnnouncementTab;
