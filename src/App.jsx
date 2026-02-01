import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import PrayerPage from './pages/PrayerPage';
import EventsPage from './pages/EventsPage';
import ArticlesPage from './pages/ArticlesPage';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Global Scroll Reveal Hook Component
const ScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Initial check and re-check on DOM changes (simple approach)
    const handleMutation = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      revealElements.forEach((el) => observer.observe(el));
    };

    // Observer for DOM changes to catch new elements
    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initial run
    handleMutation();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin' || location.pathname === '/login';

  return (
    <div className="app">
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-sholat" element={<PrayerPage />} />
        <Route path="/agenda" element={<EventsPage />} />
        <Route path="/artikel" element={<ArticlesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <ScrollReveal />
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
