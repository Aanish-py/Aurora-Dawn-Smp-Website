import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, LayoutGrid, List, X, Calendar, User, ChevronRight } from 'lucide-react';
import AnnouncementRow from '../components/AnnouncementRow';
import newsHero from '../assets/news-hero.png';

import { useContent } from '../context/ContentContext';

const categories = ["All", "Updates", "Community", "Devblog", "Events"];

const AnnouncementsPage = () => {
    const { content } = useContent();
    const newsData = content.announcements;
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const filteredNews = (newsData || []).filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Determine layout: Featured post takes span 2 if it's in the list
    // For this design, we will map everything to cards, but maybe give the first one special treatment index-wise

    return (
        <div className="min-h-screen pt-24 pb-20 relative">

            {/* Hypixel-style background */}
            <div className="fixed inset-0 bg-[#0a0a0a] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-[300px] bg-[#FFAA00]/5 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative flex-1"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "120px" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-1.5 bg-aurora-green mb-6"
                        />
                        <h1 className="text-4xl md:text-8xl font-heading font-black text-aurora-green tracking-tighter uppercase drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                            Announcements
                        </h1>
                        <p className="text-xl text-white/40 font-medium max-w-lg border-l-4 border-aurora-blue/40 pl-6 py-2 mt-4">
                            The latest news, updates and community events from the Aurora SMP network.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full md:w-72 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-aurora-green/20 to-aurora-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center px-4 py-2.5 group-focus-within:border-aurora-green/50 transition-colors">
                            <Search className="w-4 h-4 text-white/40 mr-3" />
                            <input
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full font-medium"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Filter & Pagination Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-[#1a1a1a] p-4 border border-white/5 rounded-lg"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded text-xs font-black uppercase tracking-tighter transition-all duration-200 border-2
                                    ${activeCategory === cat
                                        ? 'bg-aurora-green border-aurora-green text-black shadow-[0_4px_0_#008a6a]'
                                        : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:border-white/30'
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Pagination Mockup */}
                    <div className="flex items-center gap-1.5 self-start lg:self-center">
                        <button className="px-3 py-1.5 bg-aurora-green text-black text-xs font-black rounded hover:brightness-110">1</button>
                        <button className="px-3 py-1.5 bg-black/40 border border-white/10 text-white/40 text-xs font-black rounded hover:bg-white/5 transition-colors">2</button>
                        <button className="px-3 py-1.5 bg-black/40 border border-white/10 text-white/40 text-xs font-black rounded hover:bg-white/5 transition-colors">3</button>
                        <span className="text-white/20 mx-1">...</span>
                        <button className="px-3 py-1.5 bg-black/40 border border-white/10 text-white/40 text-xs font-black rounded hover:bg-white/5 transition-colors">45</button>
                        <button className="px-4 py-1.5 bg-black/40 border border-white/10 text-white/40 text-xs font-black rounded hover:bg-white/5 transition-colors flex items-center gap-1 group/btn">
                            Next
                            <Sparkles className="w-3 h-3 group-hover/btn:text-aurora-blue transition-colors" />
                        </button>
                    </div>
                </motion.div>

                {/* News List - Hypixel Style Rectangular Grid */}
                <div className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-[#0c0c0c] shadow-2xl">
                    <AnimatePresence mode='popLayout'>
                        {filteredNews.length > 0 ? (
                            filteredNews.map((news, idx) => (
                                <AnnouncementRow
                                    key={news.id}
                                    news={news}
                                    index={idx}
                                    onClick={setSelectedAnnouncement}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                <p className="text-white/40 font-heading text-xl">No chronicles found.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Load More Trigger */}
                <div className="mt-20 flex justify-center">
                    <button className="group relative px-8 py-3 overflow-hidden rounded-full">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative text-xs font-bold text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-colors">
                            View All Archives
                        </span>
                    </button>
                </div>

            </div>

            {/* Announcement Detail Card Overlay */}
            <AnimatePresence>
                {selectedAnnouncement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAnnouncement(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-black/60"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass rounded-3xl border border-white/10 shadow-2xl p-8 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            <button
                                onClick={() => setSelectedAnnouncement(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col gap-8">
                                {/* Header / Hero */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-aurora-green/10 text-aurora-green text-xs font-black uppercase tracking-widest rounded-full border border-aurora-green/20">
                                            {selectedAnnouncement.category}
                                        </span>
                                        <span className="text-xs font-bold text-white/20 uppercase tracking-widest">•</span>
                                        <span className="text-xs font-black text-aurora-blue/60 uppercase tracking-widest">Official Post</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight uppercase tracking-tighter">
                                        {selectedAnnouncement.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                <User className="w-4 h-4 text-white/40" />
                                            </div>
                                            <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Written by <span className="text-aurora-green">{selectedAnnouncement.author}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-aurora-blue" />
                                            <span className="text-sm font-black text-white/40">{selectedAnnouncement.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-xl text-white/70 leading-relaxed italic mb-8 border-l-4 border-aurora-green pl-6 py-2 bg-aurora-green/5 rounded-r-lg">
                                        {selectedAnnouncement.excerpt}
                                    </p>
                                    
                                    <div className="space-y-6 text-white/60 leading-relaxed text-lg whitespace-pre-wrap">
                                        {selectedAnnouncement.content || "No detailed content provided."}
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest text-white/20">
                                            Persistent Content
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedAnnouncement(null)}
                                        className="inline-flex items-center gap-2 text-aurora-green font-bold group"
                                    >
                                        <span>Close Portal</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnnouncementsPage;
