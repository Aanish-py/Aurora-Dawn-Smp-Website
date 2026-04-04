import React from 'react';
import FlowingMenu from './FlowingMenu';

const FeatureGrid = () => {
    const items = [
        {
            text: "Community First",
            link: "#",
            image: "/aurora_stock_photos/Peaceful-Vanilla-Club-3.webp",
        },
        {
            text: "No Pay-to-Win",
            link: "#",
            image: "/aurora_stock_photos/Peaceful-Vanilla-Club-4.webp",
        },
        {
            text: "LGBTQ+ Friendly",
            link: "#",
            image: "/aurora_stock_photos/2024-09-17_19.webp",
        },
        {
            text: "Performance Optimized",
            link: "#",
            image: "/aurora_stock_photos/2024-10-08_03.webp",
        }
    ];

    return (
        <section className="py-24 px-0 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-green to-aurora-purple">Aurora Dawn?</span>
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    We're dedicated to providing the best vanilla survival experience with quality-of-life enhancements.
                </p>
            </div>

            <div className="w-full h-[600px] border-y border-white/10">
                <FlowingMenu
                    items={items}
                    backgroundColor="transparent"
                    textColor="#ffffff"
                    marqueeBgColor="#10b981" // Aurora Green
                    marqueeTextColor="#ffffff"
                />
            </div>
        </section>
    );
};

export default FeatureGrid;
