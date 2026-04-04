import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, ThumbsUp, Calendar, User } from 'lucide-react';

const AnnouncementRow = ({ news, index, onClick }) => {
    // Mocking some stats since the newsData doesn't have them yet
    const stats = {
        replies: Math.floor(Math.random() * 200) + 50,
        views: (Math.floor(Math.random() * 50) + 10) + "K",
        reactions: Math.floor(Math.random() * 100) + 20,
    };

    const auroraGradient = "bg-gradient-to-r from-aurora-green to-aurora-blue";

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onClick(news)}
            className="group relative flex items-center gap-4 bg-[#111111] border-b border-white/5 hover:bg-white/[0.03] transition-all duration-200 p-4 first:rounded-t-lg last:rounded-b-lg overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
        >
            {/* Left Accent Glow on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-aurora-green opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Icon Group */}
            <div className="shrink-0 w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                {news.image ? (
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                ) : (
                    <Calendar className="w-6 h-6 text-white/20" />
                )}
            </div>

            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h3 className="text-base md:text-lg font-black text-aurora-green uppercase tracking-tighter hover:underline cursor-pointer truncate group-hover:text-aurora-blue transition-colors">
                        {news.title}
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span className="text-aurora-blue/60 font-black">Aurora Team</span>
                    <span>•</span>
                    <span>{news.date}</span>
                    <div className="hidden md:flex items-center gap-1 ml-2">
                        {[1, 2, 3].map(n => (
                            <span key={n} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded hover:bg-aurora-green hover:text-black transition-colors cursor-pointer">{n}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Last Post Info */}
            <div className="hidden sm:flex flex-col items-end text-right min-w-[150px]">
                <span className="text-xs font-black text-white/60 group-hover:text-aurora-green transition-colors">{news.date}</span>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{news.author}</span>
            </div>

            {/* Right Avatar */}
            <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden ml-2">
                <User className="w-4 h-4 text-white/20" />
            </div>
        </motion.div>
    );
};

export default AnnouncementRow;
