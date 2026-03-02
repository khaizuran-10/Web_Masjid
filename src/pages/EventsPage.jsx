import { Clock, ArrowRight, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/PageHeader';
import '../components/NewsEvents.css';

const EventsPage = () => {
    const { events } = useData();

    return (
        <main className="events-page">
            <PageHeader
                title="Agenda Mendatang"
                subtitle="Kegiatan Masjid"
                description="Jangan lewatkan berbagai kegiatan bermanfaat yang diselenggarakan oleh Masjid Al Amir."
            />

            <section className="container" style={{ paddingBottom: '6rem' }}>
                <div className="events-list reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
        </main>
    );
};

export default EventsPage;
