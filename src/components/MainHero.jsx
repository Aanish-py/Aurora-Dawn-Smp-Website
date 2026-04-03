import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Github } from 'lucide-react';

const MainHero = () => {
    const [ripples, setRipples] = useState([]);
    const [isCopied, setIsCopied] = useState(false);

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

    return (
        <main id="home" className="relative min-h-screen flex flex-col justify-start items-center pt-20 md:pt-28 pb-20 px-6 z-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-6"
            >
                <span className="py-2 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-aurora-green text-sm font-bold tracking-widest uppercase animate-float">
                    Welcome to 2026
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-7xl md:text-9xl font-heading tracking-tighter text-white mb-6 drop-shadow-2xl"
            >
                <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    AURORA
                </motion.span>
                <br />
                <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="shiny-text"
                >
                    DAWN
                </motion.span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-2xl text-xl text-white/90 font-light mb-10 leading-relaxed drop-shadow-lg"
            >
                Immerse yourself in a <span className="text-aurora-green font-normal">beautifully crafted</span> survival experience.
                Where community comes first and the adventure never ends.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col md:flex-row gap-6 items-center"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        createRipple(e, 'primary');
                        navigator.clipboard.writeText('play.auroradawn.net');
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="relative group px-8 py-4 bg-aurora-green text-aurora-dark font-heading text-lg rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(0,210,160,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(0,210,160,0.8)] animate-float-delayed"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {isCopied ? (
                                <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2"
                                >
                                    Copied!
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => createRipple(e, 'secondary')}
                    className="relative px-8 py-4 bg-white/10 text-white font-heading text-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Join Discord
                        <Github size={20} />
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

            <motion.div
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-10 left-0 right-0 flex justify-center opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </motion.div>
        </main>
    );
};

export default MainHero;
