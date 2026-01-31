import { Link } from 'react-router-dom';
import './Footer.css';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-icon-sm">A</div>
                        <span>Masjid Al Amir</span>
                    </div>
                    <p className="footer-desc">
                        Membangun rasa kebersamaan dan keunggulan spiritual melalui pendidikan, amal, dan layanan masyarakat yang tak tergoyahkan sejak 1985.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={18} /></a>
                        <a href="#" className="social-link"><Twitter size={18} /></a>
                        <a href="#" className="social-link"><Instagram size={18} /></a>
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
                            <span>+62 (370) 123-4567</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>info@alamirmasjid.com</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-address">
                    <h4 className="footer-title">Alamat Kami</h4>
                    <div className="address-content">
                        <MapPin size={20} className="contact-icon" />
                        <p>
                            Jl. Lingkar Selatan No.RT.01 369<br />
                            Jempong Baru, Kec. Sekarbela<br />
                            Kota Mataram, Nusa Tenggara Barat<br />
                            83361
                        </p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom container">
                <p className="copyright">&copy; 2026 Komunitas Masjid Al Amir. Didesain dengan Keunggulan.</p>
            </div>
        </footer>
    );
};

export default Footer;
