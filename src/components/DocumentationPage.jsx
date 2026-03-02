import React from 'react';
import { useData } from '../context/DataContext';
import PageHeader from './PageHeader';
import './DocumentationPage.css';

const DocumentationPage = () => {
    const { documentation } = useData();

    return (
        <div className="documentation-page-container">
            <PageHeader
                title="Dokumentasi"
                subtitle="Galeri Masjid"
                description="Kumpulan dokumentasi kegiatan, fasilitas, dan momen-momen berharga di Masjid Al Amir."
            />
            <div className="documentation-page container">
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
        </div>
    );
};

export default DocumentationPage;
