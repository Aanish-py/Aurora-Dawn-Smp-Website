import useIsMobile from '../hooks/useIsMobile';
const heroBg = '/aurora_stock_photos/aurora-hero-v3.jpg';

const HeroBackdrop = () => {
    const isMobile = useIsMobile();
    return (
        <>
            {/* 1. Base Dark Layer - Kept as fallback */}
            <div className="fixed inset-0 bg-aurora-dark z-[-3]"></div>

            {/* 2. Hero Image Background */}
            {/* z-index 0 to sit above LiquidEther (z-[-1]) but below content (z-10) */}
            <div className="fixed inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Aurora Dawn SMP Dramatic Minecraft Landscape"
                    className="w-full h-full object-cover"
                />
                {/* Tint overlay - Adjust opacity as needed */}
                <div className="absolute inset-0 bg-aurora-dark/30"></div>
            </div>

            {/* 3. Gradient Vignette */}

            {/* 4. Gradient Vignette */}
            <div className="fixed inset-0 z-1 bg-gradient-to-b from-transparent via-aurora-dark/20 to-aurora-dark/95 pointer-events-none"></div>
        </>
    );
};

export default HeroBackdrop;
