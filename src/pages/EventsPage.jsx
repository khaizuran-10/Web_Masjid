import { Clock, ArrowRight, MapPin } from 'lucide-react';
import '../components/NewsEvents.css'; // Reusing existing styles

const EventsPage = () => {
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
        <section className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="section-header">
                <h2 className="section-title-md">Agenda Mendatang</h2>
            </div>

            <div className="events-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {events.map((event) => (
                    <div key={event.id} className="event-item">
                        <div className="event-date-box">
                            <span className="event-day">{event.day}</span>
                            <span className="event-month">{event.month}</span>
                        </div>
                        <div className="event-info">
                            <h3 className="event-title">{event.title}</h3>
                            <span className="event-time">
                                <Clock size={14} /> {event.time}
                            </span>
                            <span className="event-location" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                                <MapPin size={14} /> {event.location}
                            </span>
                        </div>
                        <button className="event-btn">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventsPage;
