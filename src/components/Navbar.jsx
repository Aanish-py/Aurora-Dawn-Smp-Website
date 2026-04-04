import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false); // Scrolling down
            } else {
                setVisible(true); // Scrolling up
            }

            setScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // specific effect to update active tab based on route
    useEffect(() => {
        if (location.pathname === '/announcements') {
            setActiveTab("News");
        } else if (location.pathname === '/rules') {
            setActiveTab("Rules");
        } else if (location.pathname === '/join') {
            setActiveTab("Join");
        } else if (location.pathname === '/lore') {
            setActiveTab("Lore");
        } else if (location.pathname === '/' && !location.hash) {
            setActiveTab("Home");
        }
    }, [location]);

    const tabs = [
        { name: "Home", href: "/" },
        { name: "News", href: "/announcements" },
        { name: "Lore", href: "/lore" },
        { name: "Rules", href: "/rules" },
        { name: "Join", href: "/join" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: visible ? 0 : -120,
                    opacity: visible ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`pointer-events-auto transition-all duration-300 ${scrolled ? 'bg-aurora-dark/90 backdrop-blur-xl py-4' : 'bg-aurora-dark/60 backdrop-blur-md py-6'} border-b border-white/10 w-full flex items-center shadow-2xl shadow-aurora-green/5`}
            >
                <div className="max-w-[1920px] mx-auto w-full px-6 md:px-12 flex items-center">
                    {/* Left: Logo */}
                    <div className="flex-1 flex justify-start">
                        <Link to="/" className="font-heading text-2xl tracking-wider flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-aurora-green rounded-full shadow-[0_0_12px_#00D2A0] animate-pulse-glow group-hover:scale-125 transition-transform"></div>
                                <div className="absolute inset-0 bg-aurora-blue rounded-full blur-[6px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="bg-gradient-to-r from-aurora-green via-aurora-blue to-aurora-purple bg-clip-text text-transparent drop-shadow-sm font-bold">
                                AURORA
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation - Hidden on mobile */}
                    <div className="hidden lg:flex justify-center">
                        <ul className="flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/5">
                            {tabs.map((tab) => (
                                <li key={tab.name}>
                                    <Link
                                        to={tab.href}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`relative px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 block ${activeTab === tab.name ? "text-white" : "text-white/60 hover:text-white"}`}
                                    >
                                        {activeTab === tab.name && (
                                            <motion.div
                                                layoutId="pill-nav"
                                                className="absolute inset-0 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full z-0 shadow-[0_0_20px_rgba(0,210,160,0.4)]"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
                        <div className={`hidden xl:block w-px h-6 bg-white/10 transition-all ${scrolled ? 'opacity-0 w-0' : 'opacity-100'}`}></div>

                        <button
                            className={`px-4 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs md:text-base font-medium transition-all border whitespace-nowrap active:scale-95 ${
                                isCopied 
                                ? 'bg-aurora-green/20 border-aurora-green text-aurora-green shadow-[0_0_20px_rgba(0,210,160,0.2)]' 
                                : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-aurora-green/50 hover:shadow-[0_0_20px_rgba(0,210,160,0.15)]'
                            } group`}
                            onClick={() => {
                                navigator.clipboard.writeText('play.auroradawn.net');
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                            }}
                        >
                            <span className="transition-colors">
                                {isCopied ? "IP COPIED!" : "Copy IP"}
                            </span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                tabs={tabs} 
            />
        </div>
    );
};

export default Navbar;
