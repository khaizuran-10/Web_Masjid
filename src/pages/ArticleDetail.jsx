import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

const ArticleDetail = () => {
    const { id } = useParams();
    const { articles } = useData();

    const article = articles.find(a => a.id.toString() === id);

    if (!article) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh' }}>
                <h2 style={{ color: 'white' }}>Artikel tidak ditemukan</h2>
                <Link to="/artikel" className="btn btn-accent" style={{ marginTop: '1rem' }}>Kembali ke Artikel</Link>
            </div>
        );
    }

    return (
        <div className="article-detail-page" style={{ paddingTop: '120px', paddingBottom: '5rem', minHeight: '100vh', color: 'white' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Link to="/artikel" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', marginBottom: '2rem', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Kembali
                    </Link>

                    <header className="article-header" style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            <Tag size={14} /> {article.category}
                        </div>
                        <h1 style={{ fontSize: '2.75rem', fontFamily: 'var(--font-heading)', lineHeight: '1.2', marginBottom: '1.25rem' }}>{article.title}</h1>

                        <div style={{ display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={16} /> {article.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={16} /> Admin
                            </div>
                        </div>
                    </header>

                    <div className="article-featured-image" style={{ width: '100%', height: 'auto', maxHeight: '500px', borderRadius: '1.5rem', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <article className="article-body" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
                        {article.content ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
                        ) : (
                            <p>Konten artikel sedang dalam proses penulisan. Mohon nantikan update selanjutnya dari kami mengenai topik ini.</p>
                        )}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
