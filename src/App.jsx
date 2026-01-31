import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import PrayerPage from './pages/PrayerPage';
import EventsPage from './pages/EventsPage';
import ArticlesPage from './pages/ArticlesPage';

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollReveal />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jadwal-sholat" element={<PrayerPage />} />
          <Route path="/agenda" element={<EventsPage />} />
          <Route path="/artikel" element={<ArticlesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
