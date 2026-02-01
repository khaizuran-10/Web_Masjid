import { BookOpen, Coffee, Users, HeartHandshake, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const ProgramsSection = () => {
    const { programs } = useData();

    const iconMap = {
        BookOpen: <BookOpen size={28} />,
        Coffee: <Coffee size={28} />,
        Users: <Users size={28} />,
        HeartHandshake: <HeartHandshake size={28} />,
        HelpCircle: <HelpCircle size={28} />
    };

    return (
        <section className="programs-section container-fluid">
            <div className="container">
                <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', border: 'none' }}>
                    <div className="title-group">
                        <span className="section-title-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Aktivitas Kami</span>
                        <h2 className="title-display" style={{ fontSize: '2.5rem' }}>Program Unggulan</h2>
                    </div>
                </div>

                <div className="programs-grid reveal">
                    {programs.map((prog) => (
                        <div key={prog.id} className="program-card">
                            <div className="program-icon-box">
                                {iconMap[prog.icon] || <HelpCircle size={28} />}
                            </div>
                            <h3 className="program-title">{prog.title}</h3>
                            <p className="program-desc">{prog.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;
