import { Sun, CloudSun, Moon, Sunrise, Sunset } from 'lucide-react';
import './PrayerTimes.css';

const PrayerTimes = () => {
    // Mock data with Icons
    const times = [
        { name: 'Subuh', time: '04:45', icon: <Sunrise size={32} strokeWidth={1.5} /> },
        { name: 'Dzuhur', time: '12:15', icon: <Sun size={32} strokeWidth={1.5} /> },
        { name: 'Ashar', time: '15:30', active: true, icon: <CloudSun size={32} strokeWidth={1.5} /> },
        { name: 'Maghrib', time: '18:10', icon: <Sunset size={32} strokeWidth={1.5} /> },
        { name: 'Isya', time: '19:25', icon: <Moon size={32} strokeWidth={1.5} /> },
    ];

    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <section className="prayer-section container-fluid" id="prayer-times">
            <div className="container">
                <div className="prayer-header">
                    <span className="section-subtitle">{today}</span>
                    <h2 className="section-title-display">Jadwal Sholat Harian</h2>
                </div>

                <div className="prayer-grid">
                    {times.map((prayer) => (
                        <div key={prayer.name} className={`prayer-card ${prayer.active ? 'active' : ''}`}>
                            <div className="prayer-icon-wrapper">
                                {prayer.icon}
                            </div>
                            <span className="prayer-name">{prayer.name}</span>
                            <span className="prayer-time">{prayer.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrayerTimes;
