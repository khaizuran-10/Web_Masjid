import { useData } from '../context/DataContext';
import './DocumentationPage.css';

const DocumentationPage = () => {
    const { documentation } = useData();

    return (
        <div className="documentation-page container">
            <div className="section-header reveal">
                <h2 className="section-title title-display" style={{ color: 'white' }}>Documentation</h2>
                <div className="title-accent-line"></div>
            </div>

            <div className="gallery-grid">
                {documentation.map((image, index) => (
                    <div
                        key={image.id || index}
                        className="gallery-item reveal"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className="gallery-image"
                            loading="lazy"
                        />
                        <div className="gallery-overlay">
                            <span className="gallery-title">{image.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentationPage;
