import { Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect (only on home page or always transparent until scroll?)
  // For other pages, we might want it always solid
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled || !isHome ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <div className="logo-placeholder">A</div>
          </div>
          <span className="logo-text">Masjid Al Amir</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/jadwal-sholat">Jadwal Sholat</Link></li>
          <li><Link to="/agenda">Agenda</Link></li>
          <li><Link to="/artikel">Artikel</Link></li>
          <li><Link to="/dokumentasi">Dokumentasi</Link></li>

        </ul>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Beranda</Link></li>
            <li><Link to="/jadwal-sholat" onClick={() => setIsOpen(false)}>Jadwal Sholat</Link></li>
            <li><Link to="/agenda" onClick={() => setIsOpen(false)}>Agenda</Link></li>
            <li><Link to="/artikel" onClick={() => setIsOpen(false)}>Artikel</Link></li>
            <li><Link to="/dokumentasi" onClick={() => setIsOpen(false)}>Dokumentasi</Link></li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
