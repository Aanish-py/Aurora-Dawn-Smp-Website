import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

function FlowingMenu({
    items = [],
    speed = 15,
    textColor = '#fff',
    bgColor = 'transparent',
    marqueeBgColor = '#fff',
    marqueeTextColor = '#060010',
    borderColor = 'rgba(255, 255, 255, 0.1)'
}) {
    return (
        <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                        isFirst={idx === 0}
                    />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }) {
    const itemRef = useRef(null);
    const [repetitions, setRepetitions] = useState(4);
    const marqueeControls = useAnimation();
    const marqueeInnerControls = useAnimation();

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            const viewportWidth = window.innerWidth;
            // Rough estimate of content width until ref is available
            const contentWidth = text.length * 20 + 250; 
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text]);

    const handleMouseEnter = async (ev) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        const marqueeY = edge === 'top' ? '-101%' : '101%';
        const innerY = edge === 'top' ? '101%' : '-101%';

        // Set initial positions instantly
        marqueeControls.set({ y: marqueeY });
        marqueeInnerControls.set({ y: innerY });

        // Animate to center
        marqueeControls.start({ y: '0%', transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } });
        marqueeInnerControls.start({ y: '0%', transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } });
    };

    const handleMouseLeave = (ev) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        const marqueeTargetY = edge === 'top' ? '-101%' : '101%';
        const innerTargetY = edge === 'top' ? '101%' : '-101%';

        marqueeControls.start({ y: marqueeTargetY, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } });
        marqueeInnerControls.start({ y: innerTargetY, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } });
    };

    return (
        <div
            className="flex-1 relative overflow-hidden text-center group py-4 md:py-8"
            ref={itemRef}
            style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
        >
            <a
                className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-2xl md:text-5xl lg:text-6xl tracking-tighter z-10"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
            >
                {text}
            </a>
            <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-20"
                animate={marqueeControls}
                initial={{ y: '101%' }}
                style={{ backgroundColor: marqueeBgColor }}
            >
                <motion.div 
                    className="h-full w-fit flex items-center"
                    animate={marqueeInnerControls}
                    initial={{ y: '-101%' }}
                >
                    <motion.div
                        className="flex"
                        animate={{ x: [0, '-50%'] }}
                        transition={{ 
                            duration: speed * 2, 
                            ease: "linear", 
                            repeat: Infinity 
                        }}
                    >
                        {[...Array(repetitions * 2)].map((_, idx) => (
                            <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
                                <span className="whitespace-nowrap uppercase font-bold text-2xl md:text-5xl lg:text-6xl px-6 md:px-12">{text}</span>
                                <div
                                    className="w-[120px] md:w-[250px] h-[50px] md:h-[100px] rounded-full bg-cover bg-center shrink-0 border-2 border-white/20"
                                    style={{ backgroundImage: `url(${image})` }}
                                />
                                {/* Hidden img tag to trigger lazy loading of the source */}
                                <img src={image} alt={text} className="hidden" loading="lazy" />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default FlowingMenu;

