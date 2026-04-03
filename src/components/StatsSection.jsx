import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const GradientCountUp = ({ end, label, suffix = "+" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        if (end === 0) {
            setCount(0);
            return;
        }

        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, stepTime);

        return () => clearInterval(timer);
    }, [end, isInView]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-colors text-center">
            <h3 className="text-4xl md:text-5xl font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                {count}{suffix}
            </h3>
            <p className="text-aurora-green text-xs md:text-sm mt-2 uppercase tracking-widest font-bold">{label}</p>
        </div>
    );
};

const StatsSection = () => {
    return (
        <section className="relative z-10 py-20 border-t border-white/5 bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                <GradientCountUp end={24} label="Uptime" suffix="/7" />
                <GradientCountUp end={225} label="Lifetime Player Joins" suffix="+" />
                <GradientCountUp end={10} label="Events Hosted" suffix="" />
                <GradientCountUp end={300} label="Discord Members" suffix="+" />
            </div>
        </section>
    );
};

export default StatsSection;
