import { useEffect, useState, useMemo } from 'react';
import './Hero.css';

const Hero = () => {
    // Mataram, Lombok accurate data for Jan 31, 2026
    const prayerTimesData = useMemo(() => [
        { name: 'Subuh', time: '05:11' },
        { name: 'Dzuhur', time: '12:29' },
        { name: 'Ashar', time: '15:48' },
        { name: 'Maghrib', time: '18:43' },
        { name: 'Isya', time: '19:53' },
    ], []);

    const [timeLeft, setTimeLeft] = useState('00:00:00');
    const [nextPrayer, setNextPrayer] = useState({ name: 'Ashar', time: '15:48' });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTimeInMinutes = currentHours * 60 + currentMinutes;

            let next = null;
            for (const prayer of prayerTimesData) {
                const [hours, minutes] = prayer.time.split(':').map(Number);
                const prayerTimeInMinutes = hours * 60 + minutes;

                if (prayerTimeInMinutes > currentTimeInMinutes) {
                    next = prayer;
                    break;
                }
            }

            if (!next) {
                next = { ...prayerTimesData[0], isTomorrow: true };
            }

            setNextPrayer(next);

            // Calculate countdown
            const [nextH, nextM] = next.time.split(':').map(Number);
            let targetDate = new Date(now);
            targetDate.setHours(nextH, nextM, 0, 0);

            if (next.isTomorrow) {
                targetDate.setDate(targetDate.getDate() + 1);
            }

            const diff = targetDate - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call

        return () => clearInterval(timer);
    }, [prayerTimesData]);

    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <span className="hero-subtitle">Selamat Datang di Masjid Al Amir</span>
                <h1 className="hero-title">
                    Masjid Al Wildan <br /> Islamic International School 20
                </h1>
                <p className="hero-text">
                    Pusat Ibadah, Dakwah, dan Pendidikan Al-Qur'an di Mataram. Melayani Jamaah dan Masyarakat Umum 24 Jam Berlandaskan Al-Qur'an dan Sunnah.
                </p>

                <div className="hero-buttons">
                    <a href="jadwal-sholat" className="btn btn-primary-hero">Lihat Jadwal Sholat</a>
                </div>

                {/* Glassmorphism Prayer Card */}
                <div className="prayer-card-glass">
                    <div className="next-prayer-info">
                        <span className="next-prayer-label">Sholat Berikutnya</span>
                        <h3 className="next-prayer-name">{nextPrayer.name}</h3>
                        <span className="timer-label">{nextPrayer.time} WITA</span>
                    </div>

                    <div className="countdown-timer">
                        <div className="timer-digits">{timeLeft}</div>
                        <span className="timer-label">Menuju Adzan</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
