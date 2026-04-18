import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import useIsMobile from '../hooks/useIsMobile';
import { useContent } from '../context/ContentContext';

const MainHero = () => {
    const isMobile = useIsMobile();
    const { content } = useContent();
    const [ripples, setRipples] = useState([]);
    const [isIpCopied, setIsIpCopied] = useState(false);

    const serverInfo = content?.serverInfo || {
        javaIP: 'play.auroradawn.net',
        bedrockIP: 'play.auroradawn.net:19132',
    };

    const discordLink = content?.socialLinks?.find(link => link.name === 'Discord' || link.platform === 'Discord')?.url || 'https://dsc.gg/AuroraDawn';

    const createRipple = (event, buttonId) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size,
            buttonId,
        };

        setRipples([...ripples, newRipple]);

        setTimeout(() => {
            setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);
    };

    const handleCopyIp = (e) => {
        createRipple(e, 'primary');
        navigator.clipboard.writeText(serverInfo.javaIP);
        setIsIpCopied(true);
        setTimeout(() => setIsIpCopied(false), 2000);
    };

    const handleJoinDiscord = (e) => {
        createRipple(e, 'secondary');
        window.open(discordLink, '_blank');
    };

    return (
        <main id="home" className="relative min-h-screen flex flex-col justify-start items-center pt-20 md:pt-28 pb-20 px-6 z-10 text-center">

            <motion.h1
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ willChange: "transform, opacity" }}
                className="text-6xl md:text-9xl font-heading tracking-tighter text-white mb-6 drop-shadow-2xl"
            >
                <motion.span
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{ willChange: "transform, opacity" }}
                    className="shiny-text"
                >
                    AURORA
                </motion.span>
                <br />
                <motion.span
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ willChange: "transform, opacity" }}
                    className="shiny-text"
                >
                    DAWN
                </motion.span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ willChange: "opacity" }}
                className="max-w-2xl text-lg md:text-xl text-white/90 font-light mb-10 leading-relaxed drop-shadow-lg px-4 py-2 bg-black/10 backdrop-blur-[2px] rounded-2xl md:bg-transparent md:backdrop-blur-none"
            >
                Immerse yourself in a <span className="text-aurora-green font-normal">beautifully crafted</span> survival experience.
                Where community comes first and the adventure never ends.
            </motion.p>

            <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{ willChange: "transform, opacity" }}
                className="flex flex-col md:flex-row gap-6 items-center"
            >
                <motion.button
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyIp}
                    className="relative group px-8 py-4 bg-aurora-green text-aurora-dark font-heading text-lg rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(0,210,160,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(0,210,160,0.8)] animate-float-delayed"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {isIpCopied ? (
                                <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2"
                                >
                                    IP Copied!
                                    <Check size={20} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="copy"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2"
                                >
                                    Copy Server IP
                                    <Copy size={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </span>
                    {ripples
                        .filter((r) => r.buttonId === 'primary')
                        .map((ripple) => (
                            <span
                                key={ripple.id}
                                className="absolute bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x,
                                    top: ripple.y,
                                    width: ripple.size,
                                    height: ripple.size,
                                }}
                            />
                        ))}
                </motion.button>

                <motion.button
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleJoinDiscord}
                    className="relative px-8 py-4 bg-white/10 text-white font-heading text-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Join Discord
                        <FaDiscord size={20} />
                    </span>
                    {ripples
                        .filter((r) => r.buttonId === 'secondary')
                        .map((ripple) => (
                            <span
                                key={ripple.id}
                                className="absolute bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x,
                                    top: ripple.y,
                                    width: ripple.size,
                                    height: ripple.size,
                                }}
                            />
                        ))}
                </motion.button>
            </motion.div>

            {!isMobile && (
                <motion.a
                    href="#why-join"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-10 left-0 right-0 flex justify-center opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </motion.a>
            )}
        </main>
    );
};

export default MainHero;

