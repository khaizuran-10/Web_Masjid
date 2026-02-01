import React, { useState } from 'react';
import { Save, Plus, Trash2, Users, CheckCircle, Upload, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AboutManager = () => {
    const { about, updateAbout } = useData();

    // Ensure features is in the new format [{text, icon}] even if coming from old localStorage
    const initialFeatures = about.features.map(f =>
        typeof f === 'string' ? { text: f, icon: 'CheckCircle' } : f
    );

    const [formData, setFormData] = useState({
        ...about,
        features: initialFeatures
    });
    const [status, setStatus] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const iconOptions = {
        Users: <Users size={16} />,
        CheckCircle: <CheckCircle size={16} />
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateAbout(formData);
        setStatus('Data "Tentang Kami" berhasil diperbarui!');
        setTimeout(() => setStatus(''), 3000);
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, { text: '', icon: 'CheckCircle' }] });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleFeatureTextChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index].text = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const handleFeatureIconChange = (index, icon) => {
        const newFeatures = [...formData.features];
        newFeatures[index].icon = icon;
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="manager-container">
            {status && <div className="login-error" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem' }}>{status}</div>}

            <form onSubmit={handleSave} className="admin-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="form-section">
                        <div className="form-group">
                            <label>Judul Utama</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Sub-judul</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Deskripsi</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                style={{ minHeight: '150px' }}
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-group">
                            <label>Gambar Section</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="image-input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="URL Gambar (https://...)"
                                        style={{ flex: 1 }}
                                    />
                                    <label className="btn-icon btn-edit" style={{ cursor: 'pointer', minWidth: '42px', height: '42px', flexShrink: 0 }}>
                                        <Upload size={18} />
                                        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept="image/*" />
                                    </label>
                                </div>

                                {formData.image && (
                                    <div className="image-preview" style={{
                                        width: '100%',
                                        height: '180px',
                                        borderRadius: '1rem',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        position: 'relative'
                                    }}>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image: '' })}
                                            style={{
                                                position: 'absolute',
                                                top: '0.5rem',
                                                right: '0.5rem',
                                                background: 'rgba(0,0,0,0.5)',
                                                border: 'none',
                                                color: 'white',
                                                padding: '4px',
                                                borderRadius: '50%',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Badge Angka (e.g. 100%)</label>
                                <input
                                    type="text"
                                    value={formData.badgeNumber}
                                    onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Badge Teks</label>
                                <input
                                    type="text"
                                    value={formData.badgeText}
                                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Fitur Utama
                                <button type="button" className="btn-icon btn-edit" onClick={addFeature} style={{ width: '24px', height: '24px' }}>
                                    <Plus size={14} />
                                </button>
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {formData.features.map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            {Object.keys(iconOptions).map(iconName => (
                                                <button
                                                    key={iconName}
                                                    type="button"
                                                    onClick={() => handleFeatureIconChange(idx, iconName)}
                                                    className={`btn-icon ${feature.icon === iconName ? 'btn-edit' : ''}`}
                                                    style={{ width: '30px', height: '30px', background: feature.icon === iconName ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)' }}
                                                >
                                                    {iconOptions[iconName]}
                                                </button>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            value={feature.text}
                                            onChange={(e) => handleFeatureTextChange(idx, e.target.value)}
                                            placeholder="Nama Fitur"
                                            required
                                        />
                                        <button type="button" className="btn-icon btn-delete" onClick={() => removeFeature(idx)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn btn-accent">
                        <Save size={18} style={{ marginRight: '8px' }} />
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutManager;
