import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, User } from 'lucide-react';
import './StructurePage.css';

const StructurePage = () => {
    const { board } = useData();

    // Grouping members based on role/position
    const chairperson = board.find(m => m.position.toLowerCase().includes('ketua'));
    const coreMembers = board.filter(m =>
        m.id !== chairperson?.id &&
        (m.position.toLowerCase().includes('sekretaris') || m.position.toLowerCase().includes('bendahara'))
    );
    const divisions = board.filter(m =>
        m.id !== chairperson?.id &&
        !coreMembers.find(cm => cm.id === m.id)
    );

    const MemberCard = ({ member, size = 'normal' }) => (
        <div className={`board-card ${size}`}>
            <div className="member-image-container">
                {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="member-image" />
                ) : (
                    <div className="member-placeholder">
                        <User size={size === 'large' ? 64 : 48} />
                    </div>
                )}
            </div>
            <span className="member-position">{member.position}</span>
            <h3 className="member-name">{member.name}</h3>
            {member.phone && (
                <a href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} className="member-contact" target="_blank" rel="noopener noreferrer">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                </a>
            )}
        </div>
    );

    return (
        <div className="structure-page container">
            <div className="section-header reveal">
                <span className="section-subtitle">Kepengurusan Masjid</span>
                <h1 className="section-title-large">DKM / Takmir Masjid Al Amir</h1>
                <p className="section-desc">
                    Dedikasi dan kebersamaan dalam melayani rumah Allah dan umat melalui pengelolaan yang amanah dan transparan.
                </p>
                <div className="section-divider"></div>
            </div>

            <div className="hierarchy-container">
                {/* Top Row: Chairperson */}
                {chairperson && (
                    <div className="hierarchy-row hierarchy-top reveal">
                        <MemberCard member={chairperson} size="large" />
                    </div>
                )}

                {/* Middle Row: Secretaries and Treasurers */}
                {coreMembers.length > 0 && (
                    <div className="hierarchy-row hierarchy-middle reveal delay-1">
                        <div className="core-grid">
                            {coreMembers.sort((a, b) => (a.order || 0) - (b.order || 0)).map(member => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Section: Divisions */}
                {divisions.length > 0 && (
                    <div className="hierarchy-section hierarchy-bottom reveal delay-2">
                        <h2 className="category-title">Bidang-bidang & Divisi</h2>
                        <div className="structure-grid">
                            {divisions.sort((a, b) => (a.order || 0) - (b.order || 0)).map(member => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StructurePage;
