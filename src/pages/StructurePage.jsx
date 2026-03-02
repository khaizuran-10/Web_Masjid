import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './StructurePage.css';

const StructurePage = () => {
    const { board } = useData();

    // Grouping members based on role/position/category
    const advisors = board.filter(m => m.category === 'Penasehat');
    const chairperson = board.find(m => m.position.toLowerCase().includes('ketua') && !m.position.toLowerCase().includes('wakil'));
    const viceChairperson = board.find(m => m.position.toLowerCase().includes('wakil'));

    const coreMembers = board.filter(m =>
        m.category === 'Pengurus Inti' &&
        m.id !== chairperson?.id &&
        m.id !== viceChairperson?.id
    );

    const divisions = board.filter(m => m.category === 'Bidang-bidang');

    const MemberCard = ({ member, size = 'normal' }) => (
        <div className={`board-card ${size} reveal`}>
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
        <main className="structure-page-container">
            <PageHeader
                title="Struktur Pengurus"
                subtitle="Kepengurusan Masjid"
                description="DKM / Takmir Masjid Al Amir yang berdedikasi dalam melayani rumah Allah dan umat melalui pengelolaan yang amanah."
            />

            <div className="structure-page container">

                <div className="hierarchy-container">
                    {/* Top Row: Advisors & Penanggung Jawab */}
                    {advisors.length > 0 && (
                        <div className="hierarchy-section hierarchy-top reveal">
                            <h2 className="category-title">Penanggung Jawab & Penasehat</h2>
                            <div className="structure-grid">
                                {advisors.sort((a, b) => (a.order || 0) - (b.order || 0)).map(member => (
                                    <MemberCard key={member.id} member={member} size="normal" />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Middle Row: Chairs */}
                    {(chairperson || viceChairperson) && (
                        <div className="hierarchy-section hierarchy-chairs reveal delay-1">
                            <h2 className="category-title">Pimpinan Pelaksana</h2>
                            <div className="chairs-grid">
                                {chairperson && <MemberCard member={chairperson} size="large" />}
                                {viceChairperson && <MemberCard member={viceChairperson} size="large" />}
                            </div>
                        </div>
                    )}

                    {/* Core Board: Secretaries and Treasurers */}
                    {coreMembers.length > 0 && (
                        <div className="hierarchy-section hierarchy-middle reveal delay-2">
                            <h2 className="category-title">Pengurus Harian</h2>
                            <div className="hierarchy-row">
                                <div className="core-grid">
                                    {coreMembers.sort((a, b) => (a.order || 0) - (b.order || 0)).map(member => (
                                        <MemberCard key={member.id} member={member} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom Section: Divisions */}
                    {divisions.length > 0 && (
                        <div className="hierarchy-section hierarchy-bottom reveal delay-3">
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
        </main>
    );
};

export default StructurePage;
