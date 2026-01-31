import { CheckCircle, Users } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container container">
                <div className="about-grid">
                    <div className="about-image-wrapper reveal">
                        <div className="glass-frame">
                            <img
                                src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2070&auto=format&fit=crop"
                                alt="Interior Masjid Al Amir"
                                className="about-image"
                            />
                        </div>
                        <div className="about-badge-glass">
                            <span className="badge-number">100%</span>
                            <span className="badge-text">Aman & Nyaman</span>
                        </div>
                    </div>

                    <div className="about-content reveal reveal-delay-200">
                        <span className="section-subtitle">Sekilas Tentang Kami</span>
                        <h2 className="section-title-large">
                            Masjid Al Amir
                        </h2>
                        <p className="about-description">
                            Sejak didirikan pada tahun 1985, Masjid Al Amir telah menjadi pusat spiritual dan komunitas bagi umat Muslim di wilayah ini. Kami berdedikasi untuk menyediakan fasilitas ibadah yang nyaman, program pendidikan yang mencerahkan, dan layanan sosial yang berdampak luas.
                        </p>

                        <div className="about-features">
                            <div className="feature-item">
                                <div className="feature-icon"><Users size={20} /></div>
                                <span className="feature-text">Komunitas Solid</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon"><CheckCircle size={20} /></div>
                                <span className="feature-text">Fasilitas Lengkap</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon"><CheckCircle size={20} /></div>
                                <span className="feature-text">Pendidikan Qur'an</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon"><CheckCircle size={20} /></div>
                                <span className="feature-text">Kajian Rutin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
