import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../components/NewsEvents.css'; // Reusing existing styles

const ArticlesPage = () => {
    const { articles } = useData();

    return (
        <section className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="section-header">
                <h2 className="section-title-md">Artikel Islami</h2>
            </div>

            <div className="news-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {articles.map((item) => (
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
