import { BookOpen, Coffee, Users, HeartHandshake } from 'lucide-react';

const ProgramsSection = () => {
    const programs = [
        {
            icon: <BookOpen size={28} />,
            title: "Tahfidz Al-Qur'an",
            desc: "Program menghafal Al-Qur'an untuk anak-anak dan remaja dengan metode yang menyenangkan."
        },
        {
            icon: <Coffee size={28} />,
            title: "Kajian Subuh",
            desc: "Memulai hari dengan ilmu dan keberkahan melalui kajian rutin ba'da subuh setiap akhir pekan."
        },
        {
            icon: <HeartHandshake size={28} />,
            title: "Jumat Berkah",
            desc: "Berbagi kebahagiaan dengan membagikan makanan gratis kepada jamaah dan kaum dhuafa setiap Jumat."
        },
        {
            icon: <Users size={28} />,
            title: "Remaja Masjid",
            desc: "Wadah kreativitas dan kepemimpinan pemuda dengan berbagai kegiatan positif dan produktif."
        }
    ];

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
                    {programs.map((prog, idx) => (
                        <div key={idx} className="program-card">
                            <div className="program-icon-box">
                                {prog.icon}
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
