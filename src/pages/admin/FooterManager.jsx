import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const FooterManager = () => {
    const { footer, updateFooter } = useData();
    const [formData, setFormData] = useState({ ...footer });
    const [status, setStatus] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        updateFooter(formData);
        setStatus('Data Footer berhasil diperbarui!');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <div className="manager-container">
            {status && <div className="login-error" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem' }}>{status}</div>}

            <form onSubmit={handleSave} className="admin-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="form-section">
                        <div className="form-group">
                            <label>Deskripsi Singkat Masjid</label>
                            <textarea
                                value={formData.brandDesc}
                                onChange={(e) => setFormData({ ...formData, brandDesc: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nomor Telepon</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-group">
                            <label>Alamat Lengkap</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Gunakan Newline untuk baris baru"
                                style={{ minHeight: '120px' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Copyright Teks</label>
                            <input
                                type="text"
                                value={formData.copyright}
                                onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn btn-accent">
                        <Save size={18} style={{ marginRight: '8px' }} />
                        Simpan Footer
                    </button>
                </div>
            </form>

            <div className="prayer-quote" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    Catatan: Footer muncul di setiap halaman website. Pastikan informasi kontak valid.
                </p>
            </div>
        </div>
    );
};

export default FooterManager;
