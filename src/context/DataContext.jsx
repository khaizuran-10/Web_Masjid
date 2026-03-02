import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const INITIAL_ARTICLES = [
    {
        id: 1,
        category: 'KOMUNITAS',
        title: 'Refleksi Ramadhan: Melayani 500+ Paket Berbuka',
        date: '22 Maret 2024',
        image: 'https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        category: 'PEMBANGUNAN',
        title: 'Update Proyek Perluasan Pusat Pendidikan Al Amir',
        date: '13 Maret 2024',
        image: 'https://images.unsplash.com/photo-1594956107871-08520ba63d76?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 3,
        category: 'KAJIAN',
        title: 'Keutamaan Malam Lailatul Qadar',
        date: '10 Maret 2024',
        image: 'https://images.unsplash.com/photo-1532334803456-145612f9a537?q=80&w=2070&auto=format&fit=crop'
    }
];

const INITIAL_EVENTS = [
    {
        id: 1,
        day: '25',
        month: 'MAR',
        title: 'Malam Khataman Al-Quran',
        time: '20:00 WIB',
        location: 'Ruang Sholat Utama'
    },
    {
        id: 2,
        day: '28',
        month: 'MAR',
        title: 'Pesantren Kilat Pemuda',
        time: '09:00 WIB',
        location: 'Gedung Serbaguna'
    },
    {
        id: 3,
        day: '05',
        month: 'APR',
        title: 'Sholat Idul Fitri Berjamaah',
        time: '07:00 WIB',
        location: 'Stadion Kota'
    }
];

const INITIAL_PRAYERS = [
    { name: 'Subuh', time: '05:11' },
    { name: 'Dzuhur', time: '12:29' },
    { name: 'Ashar', time: '15:48' },
    { name: 'Maghrib', time: '18:43' },
    { name: 'Isya', time: '19:53' },
];

const INITIAL_ABOUT = {
    title: 'Masjid Al Amir',
    subtitle: 'Masjid Al Wildan Islamic International School 20 Mataram',
    description: 'Masjid Al Amir adalah pusat ibadah dan dakwah Al Wildan Islamic International School 20 Mataram yang berlandaskan Al-Qur’an dan Sunnah. Diresmikan pada 14 Februari 2026 oleh Yayasan Metro Insan Pendidikan, masjid ini hadir sebagai sarana ibadah yang representatif bagi siswa maupun masyarakat umum.\n\nBeroperasi selama 24 jam, Masjid Al Amir berkomitmen mendukung pembinaan karakter Islami, pendidikan Al-Qur’an, serta kepedulian sosial bagi seluruh lapisan masyarakat.',
    image: '/al amir.jpeg',
    badgeNumber: '24 Jam',
    badgeText: 'Operasional Ibadah',
    features: [
        { text: 'Terbuka Untuk Umum', icon: 'Users' },
        { text: 'Berlandaskan Sunnah', icon: 'CheckCircle' },
        { text: 'Pusat Dakwah & Ilmu', icon: 'CheckCircle' },
        { text: 'Pendidikan Al-Qur\'an', icon: 'CheckCircle' }
    ]
};

const INITIAL_PROGRAMS = [
    {
        id: 1,
        icon: 'BookOpen',
        title: "Tahfidz Al-Qur'an",
        desc: "Program menghafal Al-Qur'an untuk anak-anak dan remaja dengan metode yang menyenangkan."
    },
    {
        id: 2,
        icon: 'Coffee',
        title: "Kajian Subuh",
        desc: "Memulai hari dengan ilmu dan keberkahan melalui kajian rutin ba'da subuh setiap akhir pekan."
    },
    {
        id: 3,
        icon: 'HeartHandshake',
        title: "Jumat Berkah",
        desc: "Berbagi kebahagiaan dengan membagikan makanan gratis kepada jamaah dan kaum dhuafa setiap Jumat."
    },
    {
        id: 4,
        icon: 'Users',
        title: "Remaja Masjid",
        desc: "Wadah kreativitas dan kepemimpinan pemuda dengan berbagai kegiatan positif dan produktif."
    }
];

const INITIAL_DOCUMENTATION = [
    { id: 1, url: '/al amir.jpeg', title: 'Masjid Al Amir', category: 'Eksterior', size: 'large' },
    { id: 2, url: '/dalam.jpeg', title: 'Kedamaian Interior', category: 'Interior', size: 'normal' },
    { id: 3, url: '/dokumentasi.jpeg', title: 'Momen Berjamaah', category: 'Kegiatan', size: 'tall' },
    { id: 4, url: '/hero.jpeg', title: 'Cahaya Iman', category: 'Arsitektur', size: 'wide' },
    { id: 5, url: '/malam.jpeg', title: 'Kemuliaan Malam', category: 'Suasana', size: 'normal' },
    { id: 6, url: '/masjid.jpeg', title: 'Gerbang Cahaya', category: 'Eksterior', size: 'tall' },
    { id: 7, url: '/samping.jpeg', title: 'Detail Arsitektur', category: 'Eksterior', size: 'normal' }
];

const INITIAL_FOOTER = {
    brandDesc: 'Masjid Al Wildan Islamic International School 20 Mataram. Pusat ibadah, dakwah, dan pendidikan Al-Qur\'an yang melayani jamaah dan masyarakat umum 24 jam.',
    phone: '0852-1330-3940',
    email: 'alamirmosque@gmail.com',
    address: 'Mataram, Nusa Tenggara Barat\n(Lokasi Al Wildan 20 Mataram)',
    copyright: '2026 Masjid Al Amir. Part of Al Wildan 20 Mataram.'
};

const INITIAL_BOARD = [
    // Penanggung Jawab
    { id: 1, name: 'Risqi Aguspianto, M. Pd.', position: 'Penanggung Jawab', category: 'Penasehat', order: 1 },
    { id: 2, name: 'Amirullah, M. Pd.', position: 'Penanggung Jawab', category: 'Penasehat', order: 2 },
    { id: 3, name: 'Galuh Pramananda, M. Pd.', position: 'Penanggung Jawab', category: 'Penasehat', order: 3 },
    { id: 4, name: 'Habibullah, M. A.', position: 'Penanggung Jawab', category: 'Penasehat', order: 4 },

    // Penasehat
    { id: 5, name: 'Abu Muhammad', position: 'Penasehat', category: 'Penasehat', order: 5 },

    // Pelaksana (Pengurus Inti)
    { id: 6, name: 'Ammar Abdurrahman, S. Ag.', position: 'Ketua', category: 'Pengurus Inti', order: 6 },
    { id: 7, name: 'Ulumuddin, S. Ag.', position: 'Wakil Ketua', category: 'Pengurus Inti', order: 7 },
    { id: 8, name: 'Ahmad Fadhil Al Faruqi, S. Ag.', position: 'Sekretaris', category: 'Pengurus Inti', order: 8 },
    { id: 9, name: 'Yuyun Astri, S. Ag.', position: 'Bendahara', category: 'Pengurus Inti', order: 9 },

    // Bidang-bidang (Divisi)
    { id: 10, name: 'Ustadz Muhammad Ryan Kurniawan, M.Pd', position: 'Imarah', category: 'Bidang-bidang', order: 10 },
    { id: 11, name: 'Muhammad Amin Al-Kutbi, S.Sos', position: 'Imarah', category: 'Bidang-bidang', order: 11 },
    { id: 12, name: 'Muhammad, S.Pd', position: 'Idarah', category: 'Bidang-bidang', order: 12 },
    { id: 13, name: 'Muhammad Sa’i Ar Rosyidi', position: 'Riayah', category: 'Bidang-bidang', order: 13 },
    { id: 14, name: 'Muhammad Bagis, Lc.', position: 'Pendidikan dan Dakwah', category: 'Bidang-bidang', order: 14 },
    { id: 15, name: 'Nawwaf Nazmi Bafadh, S. Ag.', position: 'Pendidikan dan Dakwah', category: 'Bidang-bidang', order: 15 },
    { id: 16, name: 'Thufail Mujaddid Al-Qoyyim, S. Pd.', position: 'Sosial', category: 'Bidang-bidang', order: 16 },
    { id: 17, name: 'Lalu Umar Harun, S. T.', position: 'Sosial', category: 'Bidang-bidang', order: 17 },
    { id: 18, name: 'Aulia Azka, S.H., M.H.', position: 'Humas dan Publikasi', category: 'Bidang-bidang', order: 18 },
    { id: 19, name: 'Syifa Sabriani, S. Pd.', position: 'Humas dan Publikasi', category: 'Bidang-bidang', order: 19 },
    { id: 20, name: 'Gazwan Firdaus', position: 'Sarana dan Prasarana', category: 'Bidang-bidang', order: 20 },
    { id: 21, name: 'Muhammad Anwar Effendi, S. Pd.', position: 'Media', category: 'Bidang-bidang', order: 21 },
];

export const DataProvider = ({ children }) => {
    const [articles, setArticles] = useState(() => {
        const saved = localStorage.getItem('masjid_articles');
        return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    });

    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('masjid_events');
        return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    });

    const [prayers, setPrayers] = useState(() => {
        const saved = localStorage.getItem('masjid_prayers');
        return saved ? JSON.parse(saved) : INITIAL_PRAYERS;
    });

    const [about, setAbout] = useState(() => {
        const saved = localStorage.getItem('masjid_about');
        return saved ? JSON.parse(saved) : INITIAL_ABOUT;
    });

    const [programs, setPrograms] = useState(() => {
        const saved = localStorage.getItem('masjid_programs');
        return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
    });

    const [footer, setFooter] = useState(() => {
        const saved = localStorage.getItem('masjid_footer');
        return saved ? JSON.parse(saved) : INITIAL_FOOTER;
    });

    const [documentation, setDocumentation] = useState(() => {
        const saved = localStorage.getItem('masjid_documentation');
        return saved ? JSON.parse(saved) : INITIAL_DOCUMENTATION;
    });

    const [board, setBoard] = useState(() => {
        const saved = localStorage.getItem('masjid_board');
        return saved ? JSON.parse(saved) : INITIAL_BOARD;
    });

    useEffect(() => {
        localStorage.setItem('masjid_articles', JSON.stringify(articles));
    }, [articles]);

    useEffect(() => {
        localStorage.setItem('masjid_events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('masjid_prayers', JSON.stringify(prayers));
    }, [prayers]);

    useEffect(() => {
        localStorage.setItem('masjid_about', JSON.stringify(about));
    }, [about]);

    useEffect(() => {
        localStorage.setItem('masjid_programs', JSON.stringify(programs));
    }, [programs]);

    useEffect(() => {
        localStorage.setItem('masjid_footer', JSON.stringify(footer));
    }, [footer]);

    useEffect(() => {
        localStorage.setItem('masjid_documentation', JSON.stringify(documentation));
    }, [documentation]);

    useEffect(() => {
        localStorage.setItem('masjid_board', JSON.stringify(board));
    }, [board]);

    // CRUD for Articles
    const addArticle = (article) => {
        setArticles(prev => [{ ...article, id: Date.now() }, ...prev]);
    };
    const updateArticle = (id, updatedArticle) => {
        setArticles(prev => prev.map(a => a.id === id ? { ...updatedArticle, id } : a));
    };
    const deleteArticle = (id) => {
        setArticles(prev => prev.filter(a => a.id !== id));
    };

    // CRUD for Events
    const addEvent = (event) => {
        setEvents(prev => [{ ...event, id: Date.now() }, ...prev]);
    };
    const updateEvent = (id, updatedEvent) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...updatedEvent, id } : e));
    };
    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    // Update for Prayers
    const updatePrayer = (name, time) => {
        setPrayers(prev => prev.map(p => p.name === name ? { ...p, time } : p));
    };

    // Update for About
    const updateAbout = (updatedAbout) => {
        setAbout(updatedAbout);
    };

    // CRUD for Programs
    const addProgram = (program) => {
        setPrograms(prev => [...prev, { ...program, id: Date.now() }]);
    };
    const updateProgram = (id, updatedProgram) => {
        setPrograms(prev => prev.map(p => p.id === id ? { ...updatedProgram, id } : p));
    };
    const deleteProgram = (id) => {
        setPrograms(prev => prev.filter(p => p.id !== id));
    };

    // Update for Footer
    const updateFooter = (updatedFooter) => {
        setFooter(updatedFooter);
    };

    // CRUD for Documentation
    const addDocumentation = (item) => {
        setDocumentation(prev => [{ ...item, id: Date.now() }, ...prev]);
    };
    const updateDocumentation = (id, updatedItem) => {
        setDocumentation(prev => prev.map(d => d.id === id ? { ...updatedItem, id } : d));
    };
    const deleteDocumentation = (id) => {
        setDocumentation(prev => prev.filter(d => d.id !== id));
    };

    // CRUD for Board
    const addBoardMember = (member) => {
        setBoard(prev => [...prev, { ...member, id: Date.now() }]);
    };
    const updateBoardMember = (id, updatedMember) => {
        setBoard(prev => prev.map(m => m.id === id ? { ...updatedMember, id } : m));
    };
    const deleteBoardMember = (id) => {
        setBoard(prev => prev.filter(m => m.id !== id));
    };

    return (
        <DataContext.Provider value={{
            articles, addArticle, updateArticle, deleteArticle,
            events, addEvent, updateEvent, deleteEvent,
            prayers, updatePrayer,
            about, updateAbout,
            programs, addProgram, updateProgram, deleteProgram,
            footer, updateFooter,
            documentation, addDocumentation, updateDocumentation, deleteDocumentation,
            board, addBoardMember, updateBoardMember, deleteBoardMember
        }}>
            {children}
        </DataContext.Provider>
    );
};
