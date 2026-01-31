import { ArrowRight } from 'lucide-react';
import '../components/NewsEvents.css'; // Reusing existing styles

const ArticlesPage = () => {
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
        },
        {
            id: 3,
            category: 'KAJIAN',
            title: 'Keutamaan Malam Lailatul Qadar',
            date: '10 Maret 2024',
            image: 'https://images.unsplash.com/photo-1532334803456-145612f9a537?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    return (
        <section className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="section-header">
                <h2 className="section-title-md">Artikel Islami</h2>
            </div>

            <div className="news-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
        </section>
    );
};

export default ArticlesPage;
