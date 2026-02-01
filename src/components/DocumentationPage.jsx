import { useData } from '../context/DataContext';
import './DocumentationPage.css';

const DocumentationPage = () => {
    const { documentation } = useData();

    return (
        <div className="documentation-page container">
            <div className="section-header reveal">
                <h2 className="section-title title-display" style={{ color: 'white' }}>Dokumentasi</h2>
                <div className="title-accent-line"></div>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem', maxWidth: '600px' }}>
                    Kumpulan momen dan arsip visual kegiatan Masjid Al Amir untuk syiar dan inspirasi umat.
                </p>
            </div>

            <div className="gallery-grid">
                {documentation.map((image, index) => (
                    <div
                        key={image.id || index}
                        className="gallery-item reveal"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="gallery-badge">{image.category || 'Galeri'}</div>
                        <img
                            src={image.url}
                            alt={image.title}
                            className="gallery-image"
                            loading="lazy"
                        />
                        <div className="gallery-overlay">
                            <span className="gallery-subtitle">{image.category}</span>
                            <span className="gallery-title">{image.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentationPage;
