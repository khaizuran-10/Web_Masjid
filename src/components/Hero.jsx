import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    // Mock countdown logic
    const [timeLeft, setTimeLeft] = useState('02:45:30');

    useEffect(() => {
        // Simple mock timer decrement
        const timer = setInterval(() => {
            // This is just a visual mock, ideally would calculate diff from actual prayer time
            setTimeLeft(prev => {
                // Simplified logic to just show it updates
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <span className="hero-subtitle">Selamat Datang di Masjid Al Amir</span>
                <h1 className="hero-title">
                    Rasakan Kedamaian <br /> & Ketenangan Jiwa
                </h1>
                <p className="hero-text">
                    Bergabunglah bersama kami di ruang suci yang dirancang untuk ibadah, pembelajaran, dan ukhuwah islamiyah di jantung kota.
                </p>

                <div className="hero-buttons">
                    <a href="#prayer-times" className="btn btn-primary-hero">Lihat Jadwal Sholat</a>
                </div>

                {/* Glassmorphism Prayer Card */}
                <div className="prayer-card-glass">
                    <div className="next-prayer-info">
                        <span className="next-prayer-label">Sholat Berikutnya</span>
                        <h3 className="next-prayer-name">Ashar</h3>
                        <span className="timer-label">15:30 WIB</span>
                    </div>

                    <div className="countdown-timer">
                        <div className="timer-digits">{timeLeft}</div>
                        <span className="timer-label">Menuju Adzan</span>
                    </div>

                    <div className="prayer-actions">
                        {/* Placeholder for small action icons if needed */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
