import React from 'react';
import { FaDiscord, FaYoutube, FaTiktok, FaReddit, FaSpotify, FaCube } from 'react-icons/fa';

const LogoLoop = () => {
    const socialLinks = [
        {
            name: 'Discord',
            icon: FaDiscord,
            url: 'https://dsc.gg/AuroraDawn',
            color: '#5865F2',
            hoverColor: '#7289DA'
        },
        {
            name: 'YouTube',
            icon: FaYoutube,
            url: 'https://youtube.com/@auroradawnsmp?si=rAe_1-bVoM9GzuTz',
            color: '#FF0000',
            hoverColor: '#FF4444'
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            url: 'https://www.tiktok.com/@auroradawnsmps3?_r=1&_t=ZM-92ZZsHQdxFr',
            color: '#000000',
            hoverColor: '#69C9D0'
        },
        {
            name: 'Reddit',
            icon: FaReddit,
            url: 'https://www.reddit.com/u/ProfessionalHuman290/s/liRGOKz90s',
            color: '#FF4500',
            hoverColor: '#FF6A33'
        },
        {
            name: 'Spotify',
            icon: FaSpotify,
            url: 'https://open.spotify.com/playlist/39wyaWCbOTj6u9uOHytWCY?si=Z15sx1VuR9y4aDBosnGvVA',
            color: '#1DB954',
            hoverColor: '#1ED760'
        },
        {
            name: 'PaperMC',
            icon: FaCube,
            url: '#',
            color: '#00897B',
            hoverColor: '#00BFA5',
            label: 'v1.21.9'
        }
    ];

    // Duplicate for seamless loop
    const items = [...socialLinks, ...socialLinks];

    return (
        <div className="w-full overflow-hidden py-10 bg-gradient-to-r from-black/20 via-black/30 to-black/20 backdrop-blur-sm border-y border-white/5 z-20 relative">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-aurora-dark to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-aurora-dark to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container - hover to pause */}
            <div className="flex gap-4 md:gap-8 logo-loop-container group">
                {/* First set */}
                <div className="flex gap-4 md:gap-8 logo-loop-track">
                    {items.map((social, i) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={`first-${i}`}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-aurora-green/50 hover:scale-110 transition-all duration-300 cursor-pointer group/item min-w-[100px] md:min-w-[140px]"
                                style={{
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                                }}
                            >
                                <Icon
                                    className="text-2xl md:text-4xl transition-colors duration-300"
                                    style={{
                                        color: social.color,
                                    }}
                                />
                                <div className="flex flex-col items-center gap-px md:gap-1">
                                    <span className="text-[10px] md:text-sm font-bold text-white/90 group-hover/item:text-aurora-green transition-colors duration-300">
                                        {social.name}
                                    </span>
                                    {social.label && (
                                        <span className="text-[8px] md:text-xs text-white/90 font-mono">
                                            {social.label}
                                        </span>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Second set for seamless loop */}
                <div className="flex gap-4 md:gap-8 logo-loop-track" aria-hidden="true">
                    {items.map((social, i) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={`second-${i}`}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-aurora-green/50 hover:scale-110 transition-all duration-300 cursor-pointer group/item min-w-[100px] md:min-w-[140px]"
                                style={{
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                                }}
                            >
                                <Icon
                                    className="text-2xl md:text-4xl transition-colors duration-300"
                                    style={{
                                        color: social.color,
                                    }}
                                />
                                <div className="flex flex-col items-center gap-px md:gap-1">
                                    <span className="text-[10px] md:text-sm font-bold text-white/90 group-hover/item:text-aurora-green transition-colors duration-300">
                                        {social.name}
                                    </span>
                                    {social.label && (
                                        <span className="text-[8px] md:text-xs text-white/90 font-mono">
                                            {social.label}
                                        </span>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LogoLoop;
