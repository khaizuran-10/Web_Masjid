import './DonationSection.css';
import { ShieldCheck, Heart, MessageCircle } from 'lucide-react';

const DonationSection = () => {
    // WhatsApp configuration
    const phoneNumber = "6282229583175";
    const message = encodeURIComponent("Assalamualaikum, saya ingin konfirmasi donasi untuk Masjid Al Amir.");
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <section className="donation-section" id="donate">
            <div className="donation-container">
                {/* Left Side */}
                <div className="donation-content">
                    <h2 className="title-display">
                        Berdayakan Umat Melalui <span className="highlight-gold">ZISWAF</span>
                    </h2>
                    <p className="donation-text-sub">
                        Zakat, Infaq, Sedekah, dan Wakaf Anda membantu kami memelihara masjid, mendukung program pendidikan, dan memberikan bantuan kepada mereka yang membutuhkan di komunitas kita.
                    </p>

                    <div className="trust-badges">
                        <div className="trust-item">
                            <ShieldCheck size={20} color="#fbbf24" />
                            <span>Aman & Transparan</span>
                        </div>
                        <div className="trust-item">
                            <Heart size={20} color="#fbbf24" />
                            <span>Fokus Melayani</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: CTA Button */}
                <div className="donation-widget" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem' }}>
                    <div className="widget-header">
                        <h3 className="widget-title">Salurkan Infaq Terbaik</h3>
                        <span className="widget-subtitle">Konfirmasi donasi Anda dengan mudah melalui WhatsApp</span>
                    </div>

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                        <MessageCircle size={24} />
                        Konfirmasi via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DonationSection;
