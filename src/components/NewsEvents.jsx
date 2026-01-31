import './NewsEvents.css';
import { Calendar, ArrowRight, Clock, MapPin } from 'lucide-react';

const NewsEvents = () => {
    const news = [
        {
            id: 1,
            category: 'KOMUNITAS',
            title: 'Refleksi Ramadhan: Melayani 500+ Paket Berbuka',
            date: '22 Maret 2024',
            image: 'https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 2,
            category: 'PEMBANGUNAN',
            title: 'Update Proyek Perluasan Pusat Pendidikan Al Amir',
            date: '13 Maret 2024',
            image: 'https://images.unsplash.com/photo-1594956107871-08520ba63d76?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    const events = [
        {
            id: 1,
            day: '25',
            month: 'MAR',
            title: 'Malam Khataman Al-Quran',
            time: '20:00 WIB',
            location: 'Ruang Sholat Utama'
        },
        {
            id: 2,
            day: '28',
            month: 'MAR',
            title: 'Pesantren Kilat Pemuda',
            time: '09:00 WIB',
            location: 'Gedung Serbaguna'
        },
        {
            id: 3,
            day: '05',
            month: 'APR',
            title: 'Sholat Idul Fitri Berjamaah',
            time: '07:00 WIB',
            location: 'Stadion Kota'
        }
    ];

    return (
        <section className="news-events-section container" id="news">
            <div className="section-grid">
                {/* News Column */}
                <div className="news-col">
                    <div className="section-header">
                        <h2 className="section-title-md">Berita Terbaru</h2>
                        <a href="#" className="see-all">
                            Lihat Semua <ArrowRight size={16} />
                        </a>
                    </div>
                    {/* ... (news list mapped) ... */}
                    <div className="news-list">
                        {news.map((item) => (
                            <div key={item.id} className="news-item">
                                <div style={{ overflow: 'hidden' }}>
                                    <img src={item.image} alt={item.title} className="news-image" />
                                </div>
                                <div className="news-content">
                                    <span className="news-category">{item.category}</span>
                                    <h3 className="news-title">{item.title}</h3>
                                    <div className="news-footer">
                                        <span className="news-date">{item.date}</span>
                                        <div className="read-more">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events Column */}
                <div className="events-col">
                    <div className="section-header">
                        <h2 className="section-title-md">Agenda Mendatang</h2>
                        <a href="#" className="see-all">
                            Kalender <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="events-list">
                        {events.map((event) => (
                            <div key={event.id} className="event-item">
                                <div className="event-date-box">
                                    <span className="event-day">{event.day}</span>
                                    <span className="event-month">{event.month}</span>
                                </div>
                                <div className="event-info">
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-meta" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span className="event-time">
                                            <Clock size={14} /> {event.time}
                                        </span>
                                        <span className="event-location" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                                            <MapPin size={14} /> {event.location}
                                        </span>
                                    </div>
                                </div>
                                <button className="event-btn">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsEvents;
