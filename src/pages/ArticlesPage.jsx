import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import '../components/NewsEvents.css'; // Reusing existing styles

const ArticlesPage = () => {
    const { articles } = useData();

    return (
        <section className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="section-header">
                <h2 className="section-title-md">Artikel Islami</h2>
            </div>

            <div className="news-list">
                {articles.map((item) => (
                    <Link to={`/artikel/${item.id}`} key={item.id} className="news-item">
                        <div className="news-image-wrapper">
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
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ArticlesPage;
