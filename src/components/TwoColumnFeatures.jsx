import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeatureRow = ({ img, text, reverse = false }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20 my-20`}>
            {/* Text Side */}
            <motion.div
                style={{ opacity: textOpacity }}
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center md:text-left"
            >
                <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90">
                    {text}
                </p>
            </motion.div>

            {/* Image Side with Parallax */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: reverse ? -2 : 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 relative group"
            >
                <div className="absolute -inset-2 bg-gradient-to-r from-aurora-green via-aurora-purple to-aurora-blue rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <motion.div
                    style={{ y: imageY }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                >
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={img}
                        alt="Feature"
                        className="w-full h-auto object-cover"
                    />
                    {/* Overlay wash */}
                    <div className="absolute inset-0 bg-aurora-dark/20 group-hover:bg-transparent transition-colors"></div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const TwoColumnFeatures = () => {
    return (
        <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Background decorations */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-0 w-96 h-96 bg-aurora-green/10 rounded-full blur-[100px] pointer-events-none"
            ></motion.div>
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-1/4 right-0 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[100px] pointer-events-none"
            ></motion.div>

            <FeatureRow
                img="/aurora_stock_photos/Peaceful-Vanilla-Club-3.jpg"
                text={
                    <>
                        Join a chill, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">community-first</span> survival multiplayer world
                        where progress is earned, builds are meant to last, and the rules are simple, transparent, and consistently enforced.
                    </>
                }
            />

            <FeatureRow
                reverse={true}
                img="/aurora_stock_photos/Peaceful-Vanilla-Club-4.jpg"
                text={
                    <>
                        Here you can enjoy a peaceful vanilla experience, with no grief, no pay-to-win vip ranks, no map resets and no PvP
                        outside arenas. Play like you do on single player, but with friends! With no worries. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">LGBTQ+ Friendly</span>.
                    </>
                }
            />

            <FeatureRow
                img="/aurora_stock_photos/Screenshot_2026-01-29_212051.png"
                text={
                    <>
                        Immerse yourself in our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">player-driven economy</span>.
                        Open your own shop, trade rare items with others, and become the wealthiest merchant on the server.
                    </>
                }
            />

            <FeatureRow
                reverse={true}
                img="/aurora_stock_photos/minecraft-1618089_1920.jpg"
                text={
                    <>
                        Explore stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">custom biomes</span> and structures,
                        enhancing the vanilla feel without losing its essence. Every journey into the unknown brings a new discovery.
                    </>
                }
            />
        </section>
    );
};

export default TwoColumnFeatures;
