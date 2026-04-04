import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnnouncementTab from './components/AnnouncementTab';
import { ContentProvider } from './context/ContentContext';
import './index.css';
import LiquidEther from './components/LiquidEther';
import SplashCursor from './components/SplashCursor';
import PageLoader from './components/PageLoader';
import { lazyWithRetry } from './utils/lazyLoading';

// Lazy load pages
const Home = lazyWithRetry(() => import('./pages/Home'));
const AnnouncementsPage = lazyWithRetry(() => import('./pages/AnnouncementsPage'));
const RulesPage = lazyWithRetry(() => import('./pages/RulesPage'));
const JoinPage = lazyWithRetry(() => import('./pages/JoinPage'));
const LorePage = lazyWithRetry(() => import('./pages/LorePage'));
const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));



function App() {
    return (
        <ContentProvider>
            <Router>
                <LiquidEther />
                <SplashCursor />
                <Routes>
                    {/* Admin/Portal Route - No layout */}
                    <Route 
                        path="/portal-management" 
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AdminDashboard />
                            </Suspense>
                        } 
                    />

                    {/* Regular pages with layout */}
                    <Route path="/*" element={
                        <div className="min-h-screen text-aurora-text overflow-x-hidden selection:bg-aurora-green selection:text-aurora-dark flex flex-col">
                            <AnnouncementTab />
                            <Navbar />

                            <main className="flex-grow pt-36 md:pt-40">
                                <Routes>
                                    <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
                                    <Route path="/announcements" element={<Suspense fallback={<PageLoader />}><AnnouncementsPage /></Suspense>} />
                                    <Route path="/rules" element={<Suspense fallback={<PageLoader />}><RulesPage /></Suspense>} />
                                    <Route path="/join" element={<Suspense fallback={<PageLoader />}><JoinPage /></Suspense>} />
                                    <Route path="/lore" element={<Suspense fallback={<PageLoader />}><LorePage /></Suspense>} />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    } />
                </Routes>
            </Router>
        </ContentProvider>
    );
}

export default App;
