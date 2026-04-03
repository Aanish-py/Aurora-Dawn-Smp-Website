import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // A simple password for this implementation - in production use real auth
        if (password === 'aurora-admin-2026') {
            sessionStorage.setItem('admin_auth', 'true');
            if (onLogin) {
                onLogin();
            } else {
                navigate('/portal-management');
            }
        } else {
            setError('Invalid credentials. Access denied.');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans selection:bg-aurora-green selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aurora-green/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aurora-blue/5 blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-aurora-green/5">
                        <Shield className="w-8 h-8 text-aurora-green" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight uppercase font-heading mb-2">Management Portal</h1>
                    <p className="text-white/40 text-sm font-medium tracking-wide uppercase">Secure Terminal Access Required</p>
                </div>

                <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 ml-1">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter secure key..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-aurora-green/50 transition-all font-medium"
                                />
                            </div>
                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500/80 text-xs mt-3 font-bold uppercase tracking-wider ml-1"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-aurora-green hover:bg-white text-black font-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn uppercase tracking-widest text-sm"
                        >
                            <span>Initiate Uplink</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Return to Main Terminal</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
