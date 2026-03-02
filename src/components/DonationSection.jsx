import './DonationSection.css';
import { ShieldCheck, Heart, MessageCircle } from 'lucide-react';

const DonationSection = () => {
    // WhatsApp configuration
    const phoneNumber = "6285213303940";
    const message = encodeURIComponent("Assalamualaikum, saya ingin konfirmasi donasi untuk Masjid Al Amir.");
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    const vaInfo = {
        bank: "Virtual Account (VA)",
        number: "900166220546",
        name: "a.n. DKM Masjid Al-Amir"
    };

    return (
        <section className="donation-section" id="donate">
            <div className="donation-container">
                {/* Left Side */}
                <div className="donation-content">
                    <h2 className="title-display">
                        Salurkan Infaq Terbaik <br />Melalui <span className="highlight-gold">Masjid Al Amir</span>
                    </h2>
                    <p className="donation-text-sub">
                        Infaq dan Wakaf Anda membantu kami memelihara masjid, mendukung program pendidikan Al-Qur'an, dan memberikan manfaat bagi umat.
                    </p>

                    <div className="va-card">
                        <div className="va-header">
                            <span className="va-bank">{vaInfo.bank}</span>
                        </div>
                        <div className="va-number">{vaInfo.number}</div>
                        <div className="va-name">{vaInfo.name}</div>
                    </div>

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
                        <h3 className="widget-title">Konfirmasi Donasi</h3>
                        <span className="widget-subtitle">Informasikan donasi Anda melalui WhatsApp untuk pendataan</span>
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
