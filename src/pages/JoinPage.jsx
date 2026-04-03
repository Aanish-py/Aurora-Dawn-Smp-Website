import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube, FaTiktok, FaReddit, FaSpotify, FaCopy, FaCheck } from 'react-icons/fa';
import { FiServer, FiMapPin, FiCpu, FiLayers } from 'react-icons/fi';
import { fetchServerStats } from '../utils/serverStats';
import { useContent } from '../context/ContentContext';

const JoinPage = () => {
    const { content } = useContent();
    const [copiedJava, setCopiedJava] = useState(false);
    const [copiedBedrock, setCopiedBedrock] = useState(false);
    
    // Fallback to defaults if content is not yet loaded or missing fields
    const serverInfo = content.serverInfo || {
        javaIP: "play.auroradawn.net",
        bedrockIP: "play.auroradawn.net:19132",
        region: "Asia - Singapore"
    };

    const handleCopyJava = () => {
        navigator.clipboard.writeText(serverInfo.javaIP);
        setCopiedJava(true);
        setTimeout(() => setCopiedJava(false), 2000);
    };

    const handleCopyBedrock = () => {
        navigator.clipboard.writeText(serverInfo.bedrockIP);
        setCopiedBedrock(true);
        setTimeout(() => setCopiedBedrock(false), 2000);
    };

    const [stats, setStats] = useState({
        online: false,
        players: { online: 0, max: 0 },
        version: '',
        motd: []
    });

    React.useEffect(() => {
        const getStats = async () => {
            const data = await fetchServerStats(serverInfo.javaIP);
            setStats(data);
        };
        getStats();
        // Refresh every minute
        const interval = setInterval(getStats, 60000);
        return () => clearInterval(interval);
    }, [serverInfo.javaIP]);

    const serverDetails = [
        { icon: FiServer, label: "Java IP", value: serverInfo.javaIP, sub: "Default Port" },
        { icon: FiMapPin, label: "Region", value: serverInfo.region, sub: "Low Latency" },
        { icon: FiLayers, label: "Version", value: "1.21.9", sub: "Premium Performance" },
        { icon: FiServer, label: "Bedrock IP", value: serverInfo.bedrockIP.split(':')[0], sub: `Port: ${serverInfo.bedrockIP.split(':')[1] || '19132'}` },
    ];

    const socials = (content.socialLinks || []).map(link => {
        // Map platform names to icons and colors
        const platformMap = {
            'Discord': { icon: FaDiscord, color: 'hover:text-[#5865F2]' },
            'YouTube': { icon: FaYoutube, color: 'hover:text-[#FF0000]' },
            'TikTok': { icon: FaTiktok, color: 'hover:text-[#00f2ea]' },
            'Reddit': { icon: FaReddit, color: 'hover:text-[#FF4500]' },
            'Spotify': { icon: FaSpotify, color: 'hover:text-[#1DB954]' }
        };
        const meta = platformMap[link.platform] || { icon: FiLayers, color: 'hover:text-white' };
        return {
            ...link,
            icon: meta.icon,
            color: meta.color,
            link: link.url
        };
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <img
                    src="/aurora_stock_photos/2024-10-08_03.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                {/* Decorative gradients on top of image */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-aurora-green/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl w-full mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-wider">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aurora-green via-white to-purple-400 animate-gradient-x">
                            JOIN THE ADVENTURE
                        </span>
                    </h1>
                    <div className="h-1 w-32 bg-aurora-green mx-auto rounded-full shadow-[0_0_15px_rgba(0,210,160,0.5)]" />
                </motion.div>

                {/* Server Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex justify-center">
                            {/* Total Joined */}
                            <div className="bg-white/5 rounded-2xl p-8 border border-white/5 flex items-center justify-between max-w-md w-full shadow-lg shadow-aurora-green/5">
                                <div>
                                    <div className="text-white/40 text-sm font-bold uppercase tracking-wider mb-2">Total Joined</div>
                                    <div className="text-4xl font-bold text-white font-heading">{content.joinedPlayers || "225+"} players</div>
                                </div>
                                <div className="w-14 h-14 rounded-full bg-aurora-green/10 flex items-center justify-center text-aurora-green shadow-inner">
                                    <FiCpu size={28} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Server Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative group overflow-hidden h-full flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-aurora-green/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-8 font-heading flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-aurora-green shadow-lg shadow-aurora-green/10">
                                    <FiServer size={20} />
                                </span>
                                Connection Details
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                {serverDetails.map((detail, index) => (
                                    <div key={index} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-aurora-green/30 transition-all hover:bg-white/10">
                                        <div className="text-white/40 mb-2 text-sm uppercase tracking-wider font-semibold">{detail.label}</div>
                                        <div className="text-white font-bold text-xl mb-1">{detail.value}</div>
                                        <div className="text-aurora-green text-xs font-medium bg-aurora-green/10 py-1 px-2 rounded-lg inline-block">{detail.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Copy IP Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleCopyJava}
                                    className="w-full bg-aurora-green hover:bg-white hover:text-black text-aurora-dark font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-[0_0_20px_rgba(0,210,160,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                >
                                    <span className="text-xl tracking-wider font-heading uppercase">
                                        {copiedJava ? "Java Copied!" : "Copy Java IP"}
                                    </span>
                                    {copiedJava ? <FaCheck size={20} /> : <FaCopy size={20} className="group-hover/btn:scale-110 transition-transform" />}
                                </button>
                                <button
                                    onClick={handleCopyBedrock}
                                    className="w-full bg-black/40 hover:bg-aurora-green hover:text-aurora-dark text-white font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn border border-white/10 hover:border-aurora-green shadow-xl shadow-black/20"
                                >
                                    <span className="text-xl tracking-wider font-heading uppercase">
                                        {copiedBedrock ? "Bedrock Copied!" : "Copy Bedrock IP"}
                                    </span>
                                    {copiedBedrock ? <FaCheck size={20} /> : <FaCopy size={20} className="group-hover/btn:scale-110 transition-transform" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Socials & Community */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                            <h3 className="text-3xl font-bold text-white mb-6 font-heading relative z-10">Connect With Us</h3>
                            <p className="text-white/60 leading-relaxed mb-10 relative z-10 text-lg">
                                Join our thriving community across all platforms. Stay updated with the latest news,
                                watch community highlights, and listen to our curated vibes.
                            </p>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                {socials.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className={`flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group shadow-lg hover:shadow-xl ${social.name === 'Discord' ? 'sm:col-span-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border-[#5865F2]/30 shadow-[#5865F2]/10' : ''}`}
                                    >
                                        <span className={`text-3xl text-white/50 group-hover:text-white transition-colors duration-300 ${social.color}`}>
                                            <social.icon />
                                        </span>
                                        <div className="flex-grow">
                                            <div className="text-white font-bold text-lg group-hover:text-aurora-green transition-colors">{social.name}</div>
                                            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold">Follow Us</div>
                                        </div>
                                        {social.name === 'Discord' && (
                                            <div className="ml-auto px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(88,101,242,0.4)] transition-colors">
                                                JOIN NOW
                                            </div>
                                        )}
                                        {social.name !== 'Discord' && (
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </div>
                                        )}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
