import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/PageHeader';
import '../components/NewsEvents.css'; // Reusing existing styles

const ArticlesPage = () => {
    const { articles } = useData();

    return (
        <main className="articles-page">
            <PageHeader
                title="Artikel Islami"
                subtitle="Berita & Wawasan"
                description="Kumpulan artikel, berita, dan kajian bermanfaat untuk memperdalam ilmu dan mempererat ukhuwah."
            />

            <section className="container" style={{ paddingBottom: '6rem' }}>
                <div className="news-list reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {articles.map((item) => (
                        <div key={item.id} className="news-item">
                            <div className="news-image-wrapper" style={{ overflow: 'hidden' }}>
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
        </main>
    );
};

export default ArticlesPage;
