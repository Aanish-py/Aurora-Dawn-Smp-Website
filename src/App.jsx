import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnnouncementTab from './components/AnnouncementTab';
import Home from './pages/Home';
import AnnouncementsPage from './pages/AnnouncementsPage';
import RulesPage from './pages/RulesPage';
import JoinPage from './pages/JoinPage';
import LorePage from './pages/LorePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ContentProvider } from './context/ContentContext';
import './index.css';
import LiquidEther from './components/LiquidEther';
import SplashCursor from './components/SplashCursor';

function App() {
    return (
        <ContentProvider>
            <Router>
                <LiquidEther />
                <SplashCursor />
                <Routes>
                    {/* Admin/Portal Route - No layout */}
                    <Route path="/portal-management" element={<AdminDashboard />} />

                    {/* Regular pages with layout */}
                    <Route path="/*" element={
                        <div className="min-h-screen text-aurora-text overflow-x-hidden selection:bg-aurora-green selection:text-aurora-dark flex flex-col">
                            <AnnouncementTab />
                            <Navbar />

                            <main className="flex-grow pt-36 md:pt-40">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/announcements" element={<AnnouncementsPage />} />
                                    <Route path="/rules" element={<RulesPage />} />
                                    <Route path="/join" element={<JoinPage />} />
                                    <Route path="/lore" element={<LorePage />} />
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
