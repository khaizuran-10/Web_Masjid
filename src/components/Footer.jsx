import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Footer.css';

const Footer = () => {
    const { footer } = useData();

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-icon-sm">A</div>
                        <span>Masjid Al Amir</span>
                    </div>
                    <p className="footer-desc">
                        {footer.brandDesc}
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={18} /></a>
                        <a href="https://instagram.com/masjidalamiralwildan20" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={18} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4 className="footer-title">Jelajahi</h4>
                    <ul>
                        <li><Link to="/#about">Tentang Kami</Link></li>
                        <li><Link to="/jadwal-sholat">Jadwal Sholat</Link></li>
                        <li><Link to="/agenda">Agenda Mendatang</Link></li>
                        <li><Link to="/artikel">Berita Umat</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4 className="footer-title">Kontak</h4>
                    <ul>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>{footer.phone}</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>{footer.email}</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-address">
                    <h4 className="footer-title">Alamat Kami</h4>
                    <div className="address-content">
                        <MapPin size={20} className="contact-icon" />
                        <p>
                            {footer.address.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}<br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom container">
                <p className="copyright">&copy; {footer.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
