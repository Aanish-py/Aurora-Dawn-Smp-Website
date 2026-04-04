import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';

const NewsCard = ({ news, index, span = 1 }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-lg border-2 border-white/5 bg-[#1a1a1a] 
            hover:border-[#FFAA00]/50 transition-all duration-300
            ${span === 2 ? 'md:col-span-2' : 'col-span-1'}
            `}
        >
            {/* Subdued Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFAA00]/5 via-transparent to-transparent" />
            </div>

            <div className={`h-full flex flex-col ${span === 2 ? 'md:flex-row' : ''}`}>
                {/* Image Section */}
                <div className={`relative overflow-hidden ${span === 2 ? 'md:w-3/5 h-64 md:h-full' : 'h-52 w-full'}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-aurora-dark via-transparent to-transparent z-10 opacity-80" />
                    <img
                        src={news.image}
                        alt={news.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Category Prefix style */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 bg-black/80 border-2 border-white/20 rounded-md text-xs font-black uppercase tracking-tighter text-[#FFAA00]">
                            [{news.category}]
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`relative z-10 p-6 flex flex-col flex-grow ${span === 2 ? 'md:w-2/5 justify-center' : ''}`}>

                    {/* Meta Data */}
                    <div className="flex items-center gap-4 text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{news.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span>{news.author}</span>
                        </div>
                    </div>

                    {/* Title in Hypixel Gold */}
                    <h3 className={`font-heading font-black text-[#FFAA00] mb-3 leading-tight uppercase tracking-tighter group-hover:text-white transition-colors
                        ${span === 2 ? 'text-3xl md:text-5xl' : 'text-2xl'}
                    `}>
                        {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-white/60 font-light leading-relaxed mb-6 line-clamp-3">
                        {news.excerpt}
                    </p>

                    {/* Action - Hypixel style button */}
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                            <span className="text-sm font-black uppercase tracking-tighter text-white/40 group-hover:text-[#FFAA00]">
                                View Full Post
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#FFAA00]" />
                        </div>
                        <div className="px-4 py-2 bg-[#1a1a1a] border-2 border-white/10 rounded group-hover:bg-[#FFAA00] group-hover:border-[#FFAA00] group-hover:text-black transition-all shadow-[0_4px_0_rgba(255,170,0,0)] group-hover:shadow-[0_4px_0_#996600]">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsCard;
