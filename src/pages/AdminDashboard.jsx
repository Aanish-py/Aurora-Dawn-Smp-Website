import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, Megaphone, Link as LinkIcon, 
    LogOut, Save, Plus, Trash2, ChevronRight, Settings, 
    ArrowLeft, Monitor, Check, AlertTriangle, RefreshCw, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import AdminLogin from './AdminLogin';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { content, updateContent, resetContent } = useContent();
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('admin_auth') === 'true');
    const [activeTab, setActiveTab] = useState('players');
    const [localContent, setLocalContent] = useState(content);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        if (content) {
            setLocalContent(content);
        }
    }, [content]);

    const handleSave = () => {
        setIsSaving(true);
        setSaveStatus(null);
        
        // Simulate save delay
        setTimeout(() => {
            updateContent(localContent);
            setIsSaving(false);
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        }, 800);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        navigate('/');
    };

    const updateField = (field, value) => {
        setLocalContent(prev => ({ ...prev, [field]: value }));
    };

    const addAnnouncement = () => {
        const newAnn = {
            id: Date.now(),
            title: "New Announcement",
            category: "Updates",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            author: "Admin",
            excerpt: "Write a short summary (~2 sentences) for the card view.",
            content: "Write the full announcement here. Use shift+enter for new paragraphs.",
            image: "/aurora_stock_photos/2024-10-08_03.webp",
            featured: false
        };
        updateField('announcements', [newAnn, ...localContent.announcements]);
    };

    const deleteAnnouncement = (id) => {
        updateField('announcements', localContent.announcements.filter(a => a.id !== id));
    };

    const addMarquee = () => {
        updateField('marquee', [...localContent.marquee, "New message for the strip..."]);
    };

    const deleteMarquee = (index) => {
        const newMarquee = [...localContent.marquee];
        newMarquee.splice(index, 1);
        updateField('marquee', newMarquee);
    };

    const addSocial = () => {
        const newSocial = { name: "New Social", url: "https://example.com", platform: "Discord" };
        updateField('socialLinks', [...localContent.socialLinks, newSocial]);
    };

    const deleteSocial = (index) => {
        const newSocials = [...localContent.socialLinks];
        newSocials.splice(index, 1);
        updateField('socialLinks', newSocials);
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-aurora-green selection:text-black flex">
            {/* Sidebar */}
            <div className="w-72 bg-[#0c0c0c] border-r border-white/5 flex flex-col p-6 fixed h-full z-20">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 rounded-lg bg-aurora-green/10 border border-aurora-green/20 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-aurora-green" />
                    </div>
                    <span className="font-heading font-black text-xl uppercase tracking-tighter">Portal Management</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'players', icon: Monitor, label: 'Infrastructure' },
                        { id: 'announcements', icon: Megaphone, label: 'News Center' },
                        { id: 'marquee', icon: RefreshCw, label: 'Alert Strip' },
                        { id: 'links', icon: LinkIcon, label: 'Social Matrix' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                                activeTab === item.id 
                                ? 'bg-white/5 text-aurora-green border border-white/10 shadow-lg shadow-aurora-green/5' 
                                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-3">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-72 p-12">
                <header className="flex items-center justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-aurora-green rounded-full animate-pulse-glow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">System Status: Active</span>
                        </div>
                        <h2 className="text-4xl font-heading font-black uppercase tracking-tighter">
                            {activeTab} Management
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${
                                saveStatus === 'success' 
                                ? 'bg-aurora-green text-black' 
                                : 'bg-white text-black hover:bg-aurora-green'
                            } disabled:opacity-50`}
                        >
                            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saveStatus === 'success' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            <span>{isSaving ? 'Processing' : saveStatus === 'success' ? 'Changes Applied' : 'Commit Changes'}</span>
                        </button>
                        
                        <button 
                            className="p-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/20 transition-all"
                            onClick={() => navigate('/')}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 max-w-5xl"
                >
                    {/* Infrastructure Tab */}
                    {activeTab === 'players' && (
                        <div className="space-y-6">
                            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 shadow-xl">
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Player Population Text</label>
                                <input 
                                    type="text"
                                    value={localContent.joinedPlayers}
                                    onChange={(e) => updateField('joinedPlayers', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-xl font-heading text-white focus:outline-none focus:border-aurora-green/50 transition-all"
                                    placeholder="e.g. 225+"
                                />
                                <p className="mt-4 text-xs text-white/20 font-medium">Displayed in the "Total Joined" matrix on the connection page.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-5 h-5 rounded bg-aurora-green/10 border border-aurora-green/20 flex items-center justify-center">
                                            <Monitor className="w-3 h-3 text-aurora-green" />
                                        </div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Connectivity</h3>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Java Edition IP</label>
                                        <input 
                                            type="text"
                                            value={localContent.serverInfo?.javaIP || ''}
                                            onChange={(e) => updateField('serverInfo', { ...localContent.serverInfo, javaIP: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-aurora-green/50 outline-none"
                                            placeholder="play.aurorasmp.net"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Bedrock Edition IP</label>
                                        <input 
                                            type="text"
                                            value={localContent.serverInfo?.bedrockIP || ''}
                                            onChange={(e) => updateField('serverInfo', { ...localContent.serverInfo, bedrockIP: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-aurora-green/50 outline-none"
                                            placeholder="bedrock.aurorasmp.net:19132"
                                        />
                                    </div>
                                </div>

                                <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-5 h-5 rounded bg-aurora-blue/10 border border-aurora-blue/20 flex items-center justify-center">
                                            <MapPin className="w-3 h-3 text-aurora-blue" />
                                        </div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Geolocation</h3>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Server Region</label>
                                        <input 
                                            type="text"
                                            value={localContent.serverInfo?.region || ''}
                                            onChange={(e) => updateField('serverInfo', { ...localContent.serverInfo, region: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-aurora-green/50 outline-none"
                                            placeholder="Asia - Singapore"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/20 font-medium leading-relaxed italic">
                                        Update the physical host location to provide transparency regarding latency for new recruits.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Announcements Tab */}
                    {activeTab === 'announcements' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{localContent.announcements.length} Chronicle Entries</span>
                                <button 
                                    onClick={addAnnouncement}
                                    className="flex items-center gap-2 px-4 py-2 bg-aurora-green/10 border border-aurora-green/20 rounded-lg text-aurora-green text-[10px] font-black uppercase tracking-widest hover:bg-aurora-green hover:text-black transition-all"
                                >
                                    <Plus className="w-3 h-3" />
                                    <span>New Entry</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {localContent.announcements.map((ann, idx) => (
                                    <div key={ann.id} className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 flex flex-col gap-6 group hover:border-white/10 transition-colors shadow-2xl">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[8px] font-black text-white/20 uppercase mb-2">Title</label>
                                                    <input 
                                                        value={ann.title}
                                                        onChange={(e) => {
                                                            const news = [...localContent.announcements];
                                                            news[idx].title = e.target.value;
                                                            updateField('announcements', news);
                                                        }}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-aurora-green/50 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[8px] font-black text-white/20 uppercase mb-2">Category</label>
                                                    <select 
                                                        value={ann.category}
                                                        onChange={(e) => {
                                                            const news = [...localContent.announcements];
                                                            news[idx].category = e.target.value;
                                                            updateField('announcements', news);
                                                        }}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-aurora-green/50 outline-none"
                                                    >
                                                        {["Updates", "Community", "Devblog", "Events"].map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => deleteAnnouncement(ann.id)}
                                                className="ml-4 p-2 text-white/10 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[8px] font-black text-white/20 uppercase mb-2">Image Resource (Path or URL)</label>
                                            <input 
                                                value={ann.image || ''}
                                                onChange={(e) => {
                                                    const news = [...localContent.announcements];
                                                    news[idx].image = e.target.value;
                                                    updateField('announcements', news);
                                                }}
                                                placeholder="/aurora_stock_photos/your_image.webp"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-aurora-green/50 outline-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label className="block text-[8px] font-black text-white/20 uppercase mb-2">Lead Summary (Excerpt)</label>
                                                <textarea 
                                                    value={ann.excerpt}
                                                    onChange={(e) => {
                                                        const news = [...localContent.announcements];
                                                        news[idx].excerpt = e.target.value;
                                                        updateField('announcements', news);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-aurora-green/50 outline-none h-20 resize-none font-medium"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[8px] font-black text-white/20 uppercase mb-2">Full Announcement Content</label>
                                                <textarea 
                                                    value={ann.content || ''}
                                                    onChange={(e) => {
                                                        const news = [...localContent.announcements];
                                                        news[idx].content = e.target.value;
                                                        updateField('announcements', news);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm text-white focus:border-aurora-green/50 outline-none h-48 resize-y font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Marquee Tab */}
                    {activeTab === 'marquee' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{localContent.marquee.length} Message Strings</span>
                                <button 
                                    onClick={addMarquee}
                                    className="flex items-center gap-2 px-4 py-2 bg-aurora-green/10 border border-aurora-green/20 rounded-lg text-aurora-green text-[10px] font-black uppercase tracking-widest hover:bg-aurora-green hover:text-black transition-all"
                                >
                                    <Plus className="w-3 h-3" />
                                    <span>Add String</span>
                                </button>
                            </div>

                            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 shadow-xl space-y-4">
                                {localContent.marquee.map((text, idx) => (
                                    <div key={idx} className="flex gap-4 items-center">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black text-white/20">{idx + 1}</div>
                                        <input 
                                            value={text}
                                            onChange={(e) => {
                                                const m = [...localContent.marquee];
                                                m[idx] = e.target.value;
                                                updateField('marquee', m);
                                            }}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-aurora-green/50 outline-none"
                                        />
                                        <button 
                                            onClick={() => deleteMarquee(idx)}
                                            className="p-3 text-white/10 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links Tab */}
                    {activeTab === 'links' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{localContent.socialLinks.length} Social Interfaces</span>
                                <button 
                                    onClick={addSocial}
                                    className="flex items-center gap-2 px-4 py-2 bg-aurora-green/10 border border-aurora-green/20 rounded-lg text-aurora-green text-[10px] font-black uppercase tracking-widest hover:bg-aurora-green hover:text-black transition-all"
                                >
                                    <Plus className="w-3 h-3" />
                                    <span>Link Node</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {localContent.socialLinks.map((link, idx) => (
                                    <div key={idx} className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl group hover:border-white/10 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="px-3 py-1 bg-aurora-green/10 text-aurora-green text-[8px] font-black uppercase tracking-widest rounded">{link.platform}</div>
                                            <button 
                                                onClick={() => deleteSocial(idx)}
                                                className="p-1 text-white/10 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[8px] font-black text-white/20 uppercase mb-1">Display Name</label>
                                                <input 
                                                    value={link.name}
                                                    onChange={(e) => {
                                                        const s = [...localContent.socialLinks];
                                                        s[idx].name = e.target.value;
                                                        updateField('socialLinks', s);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-aurora-green/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[8px] font-black text-white/20 uppercase mb-1">Resource URL</label>
                                                <input 
                                                    value={link.url}
                                                    onChange={(e) => {
                                                        const s = [...localContent.socialLinks];
                                                        s[idx].url = e.target.value;
                                                        updateField('socialLinks', s);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-aurora-green/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[8px] font-black text-white/20 uppercase mb-1">Platform ID</label>
                                                <select 
                                                    value={link.platform}
                                                    onChange={(e) => {
                                                        const s = [...localContent.socialLinks];
                                                        s[idx].platform = e.target.value;
                                                        updateField('socialLinks', s);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[10px] text-white focus:border-aurora-green/50 outline-none font-bold uppercase tracking-widest"
                                                >
                                                    {["Discord", "YouTube", "TikTok", "Reddit", "Spotify"].map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Footer Sync Signal */}
                <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-white/20" />
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Local Buffer Storage Active</span>
                        </div>
                        {saveStatus === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-aurora-green"
                            >
                                <Check className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Matrix Synchronized</span>
                            </motion.div>
                        )}
                    </div>
                    <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em]">Matrix v1.0.4 - Secure Uplink</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
