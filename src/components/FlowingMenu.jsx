import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

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
    const marqueeRef = useRef(null);
    const marqueeInnerRef = useRef(null);
    const animationRef = useRef(null);
    const [repetitions, setRepetitions] = useState(4);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text, image]);

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1
            });
        };

        // Small delay to ensure render
        const timer = setTimeout(setupMarquee, 100);

        // Also try again after image load if possible, or just a safe delay
        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [text, image, repetitions, speed]);

    const handleMouseEnter = ev => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = ev => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    return (
        <div
            className="flex-1 relative overflow-hidden text-center group py-4 md:py-8"
            ref={itemRef}
            style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
        >
            <a
                className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
            >
                {text}
            </a>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
                ref={marqueeRef}
                style={{ backgroundColor: marqueeBgColor }}
            >
                <div className="h-full w-fit flex items-center" ref={marqueeInnerRef}>
                    {[...Array(repetitions)].map((_, idx) => (
                        <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
                            <span className="whitespace-nowrap uppercase font-bold text-3xl md:text-5xl lg:text-6xl px-8 md:px-12">{text}</span>
                            <div
                                className="w-[150px] md:w-[250px] h-[60px] md:h-[100px] rounded-full bg-cover bg-center shrink-0 border-2 border-white/20"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;
