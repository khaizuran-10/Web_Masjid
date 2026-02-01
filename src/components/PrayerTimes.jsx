import { useState, useEffect } from 'react';
import { Sun, CloudSun, Moon, Sunrise, Sunset, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import './PrayerTimes.css';

const PrayerTimes = () => {
    const { prayers } = useData();

    const prayerTimesData = prayers.map(p => {
        let icon;
        switch (p.name) {
            case 'Subuh': icon = <Sunrise size={32} strokeWidth={1.5} />; break;
            case 'Dzuhur': icon = <Sun size={32} strokeWidth={1.5} />; break;
            case 'Ashar': icon = <CloudSun size={32} strokeWidth={1.5} />; break;
            case 'Maghrib': icon = <Sunset size={32} strokeWidth={1.5} />; break;
            case 'Isya': icon = <Moon size={32} strokeWidth={1.5} />; break;
            default: icon = <Clock size={32} strokeWidth={1.5} />;
        }
        return { ...p, icon };
    });

    const [now, setNow] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState(null);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const findNextPrayer = () => {
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

            // If no next prayer today, the next one is Subuh tomorrow
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

            setCountdown(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        findNextPrayer();
    }, [now, prayerTimesData]);

    const todayString = now.toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <section className="prayer-section container-fluid" id="prayer-times">
            <div className="container">
                <div className="prayer-header">
                    <span className="section-subtitle">{todayString}</span>
                    <h2 className="section-title-display">Jadwal Sholat Mataram</h2>
                </div>

                {nextPrayer && (
                    <div className="countdown-banner reveal">
                        <div className="countdown-content">
                            <span className="countdown-label">Menuju {nextPrayer.name}</span>
                            <div className="countdown-timer">
                                <Clock size={24} className="timer-icon" />
                                <span>{countdown}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="prayer-grid">
                    {prayerTimesData.map((prayer) => {
                        const isActive = nextPrayer && !nextPrayer.isTomorrow && nextPrayer.name === prayer.name;
                        return (
                            <div key={prayer.name} className={`prayer-card ${isActive ? 'active' : ''}`}>
                                <div className="prayer-icon-wrapper">
                                    {prayer.icon}
                                </div>
                                <span className="prayer-name">{prayer.name}</span>
                                <span className="prayer-time">{prayer.time}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="prayer-quote reveal" style={{ marginTop: '4rem' }}>
                    <div className="quote-container">
                        <p className="quote-text">
                            "Sesungguhnya shalat itu mencegah dari (perbuatan-perbuatan) keji dan mungkar."
                        </p>
                        <span className="quote-source">— QS. Al-Ankabut: 45</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrayerTimes;
