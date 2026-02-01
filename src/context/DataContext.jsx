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
    subtitle: 'Sekilas Tentang Kami',
    description: 'Sejak didirikan pada tahun 1985, Masjid Al Amir telah menjadi pusat spiritual dan komunitas bagi umat Muslim di wilayah ini. Kami berdedikasi untuk menyediakan fasilitas ibadah yang nyaman, program pendidikan yang mencerahkan, dan layanan sosial yang berdampak luas.',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2070&auto=format&fit=crop',
    badgeNumber: '100%',
    badgeText: 'Aman & Nyaman',
    features: [
        { text: 'Komunitas Solid', icon: 'Users' },
        { text: 'Fasilitas Lengkap', icon: 'CheckCircle' },
        { text: 'Pendidikan Qur\'an', icon: 'CheckCircle' },
        { text: 'Kajian Rutin', icon: 'CheckCircle' }
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
    brandDesc: 'Membangun rasa kebersamaan dan keunggulan spiritual melalui pendidikan, amal, dan layanan masyarakat yang tak tergoyahkan sejak 1985.',
    phone: '+62 (370) 123-4567',
    email: 'info@alamirmasjid.com',
    address: 'Jl. Lingkar Selatan No.RT.01 369\nJempong Baru, Kec. Sekarbela\nKota Mataram, Nusa Tenggara Barat\n83361',
    copyright: '2026 Komunitas Masjid Al Amir. Didesain dengan Keunggulan.'
};

const INITIAL_BOARD = [
    {
        id: 1,
        name: 'H. Ahmad Syarifuddin',
        position: 'Ketua Umum DKM',
        category: 'Pengurus Inti',
        phone: '081234567890',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
        order: 1
    },
    {
        id: 2,
        name: 'Drs. M. Zaini',
        position: 'Sekretaris',
        category: 'Pengurus Inti',
        phone: '081234567891',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
        order: 2
    },
    {
        id: 3,
        name: 'Hj. Siti Aminah',
        position: 'Bendahara',
        category: 'Pengurus Inti',
        phone: '081234567892',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
        order: 3
    },
    {
        id: 4,
        name: 'Ust. Abdullah',
        position: 'Bidang Dakwah & Ibadah',
        category: 'Bidang-bidang',
        order: 4
    },
    {
        id: 5,
        name: 'Ir. Rahman Hakim',
        position: 'Bidang Pembangunan',
        category: 'Bidang-bidang',
        order: 5
    },
    {
        id: 6,
        name: 'Samsul Bahri',
        position: 'Bidang Keamanan',
        category: 'Bidang-bidang',
        order: 6
    }
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
