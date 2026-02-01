import { CheckCircle, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import './AboutSection.css';

const AboutSection = () => {
    const { about } = useData();

    const iconMap = {
        Users: <Users size={20} />,
        CheckCircle: <CheckCircle size={20} />,
    };

    return (
        <section className="about-section" id="about">
            <div className="about-container container">
                <div className="about-grid">
                    <div className="about-image-wrapper reveal">
                        <div className="glass-frame">
                            <img
                                src={about.image}
                                alt={about.title}
                                className="about-image"
                            />
                        </div>
                        <div className="about-badge-glass">
                            <span className="badge-number">{about.badgeNumber}</span>
                            <span className="badge-text">{about.badgeText}</span>
                        </div>
                    </div>

                    <div className="about-content reveal reveal-delay-200">
                        <span className="section-subtitle">{about.subtitle}</span>
                        <h2 className="section-title-large">
                            {about.title}
                        </h2>
                        <p className="about-description">
                            {about.description}
                        </p>

                        <div className="about-features">
                            {about.features.map((feature, idx) => {
                                const isObject = typeof feature === 'object' && feature !== null;
                                const text = isObject ? feature.text : feature;
                                const icon = isObject ? feature.icon : 'CheckCircle';

                                return (
                                    <div key={idx} className="feature-item">
                                        <div className="feature-icon">{iconMap[icon] || <CheckCircle size={20} />}</div>
                                        <span className="feature-text">{text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
