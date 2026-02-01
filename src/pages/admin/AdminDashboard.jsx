import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Clock, LogOut, ChevronRight, Users, MapPin } from 'lucide-react';
import ArticleManager from './ArticleManager';
import EventManager from './EventManager';
import PrayerManager from './PrayerManager';
import AboutManager from './AboutManager';
import ProgramsManager from './ProgramsManager';
import FooterManager from './FooterManager';
import DocumentationManager from './DocumentationManager';
import StructureManager from './StructureManager';
import './Admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('articles');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('masjid_admin_auth');
        if (!auth) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('masjid_admin_auth');
        navigate('/');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'articles': return <ArticleManager />;
            case 'events': return <EventManager />;
            case 'prayers': return <PrayerManager />;
            case 'about': return <AboutManager />;
            case 'programs': return <ProgramsManager />;
            case 'footer': return <FooterManager />;
            case 'documentation': return <DocumentationManager />;
            case 'structure': return <StructureManager />;
            default: return <ArticleManager />;
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="admin-avatar">A</div>
                    <div className="admin-info">
                        <h3>Administrator</h3>
                        <span>Masjid Al Amir</span>
                    </div>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`nav-item ${activeTab === 'articles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        <FileText size={20} />
                        <span>Kelola Artikel</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >
                        <Calendar size={20} />
                        <span>Kelola Agenda</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'prayers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prayers')}
                    >
                        <Clock size={20} />
                        <span>Jadwal Sholat</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Tentang Kami</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'programs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('programs')}
                    >
                        <Users size={20} />
                        <span>Program</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'footer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('footer')}
                    >
                        <MapPin size={20} />
                        <span>Footer</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'structure' ? 'active' : ''}`}
                        onClick={() => setActiveTab('structure')}
                    >
                        <Users size={20} />
                        <span>Struktur DKM</span>
                        <ChevronRight size={16} className="chevron" />
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                    <Link to="/" className="back-to-site">Lihat Website</Link>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-content-header">
                    <h2>
                        {activeTab === 'articles' && 'Manajemen Artikel'}
                        {activeTab === 'events' && 'Manajemen Agenda'}
                        {activeTab === 'prayers' && 'Jadwal Sholat'}
                        {activeTab === 'about' && 'Manajemen Tentang Kami'}
                        {activeTab === 'programs' && 'Manajemen Program'}
                        {activeTab === 'footer' && 'Pengaturan Footer'}
                        {activeTab === 'documentation' && 'Manajemen Dokumentasi'}
                        {activeTab === 'structure' && 'Manajemen Struktur DKM'}
                    </h2>
                </header>
                <div className="admin-content-body">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
