import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PrayerManager = () => {
    const { prayers, updatePrayer } = useData();
    const [localPrayers, setLocalPrayers] = useState([...prayers]);
    const [status, setStatus] = useState('');

    const handleChange = (name, time) => {
        setLocalPrayers(prev => prev.map(p => p.name === name ? { ...p, time } : p));
    };

    const handleSave = () => {
        localPrayers.forEach(p => {
            updatePrayer(p.name, p.time);
        });
        setStatus('Jadwal sholat berhasil diperbarui!');
        setTimeout(() => setStatus(''), 3000);
    };

    const resetToContext = () => {
        setLocalPrayers([...prayers]);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <p>Sesuaikan waktu sholat harian untuk wilayah Mataram.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-secondary" onClick={resetToContext}>
                        <RefreshCw size={18} style={{ marginRight: '8px' }} />
                        Reset
                    </button>
                    <button className="btn btn-accent" onClick={handleSave}>
                        <Save size={18} style={{ marginRight: '8px' }} />
                        Simpan Semua
                    </button>
                </div>
            </div>

            {status && <div className="login-error" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem' }}>{status}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Waktu Sholat</th>
                            <th>Jam (HH:mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localPrayers.map((prayer) => (
                            <tr key={prayer.name}>
                                <td style={{ fontWeight: '700' }}>{prayer.name}</td>
                                <td>
                                    <input
                                        type="time"
                                        value={prayer.time}
                                        onChange={(e) => handleChange(prayer.name, e.target.value)}
                                        style={{ width: '150px', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="prayer-quote" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(251, 191, 36, 0.05)', borderRadius: '1rem', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                    Tips: Gunakan format 24 jam untuk memastikan akurasi perhitungan waktu menuju sholat berikutnya di halaman depan.
                </p>
            </div>
        </div>
    );
};

export default PrayerManager;
