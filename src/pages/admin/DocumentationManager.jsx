import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';

const DocumentationManager = () => {
    const { documentation, addDocumentation, updateDocumentation, deleteDocumentation } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Eksterior',
        url: ''
    });

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ title: '', category: 'Eksterior', url: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setIsModalOpen(true);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateDocumentation(editingItem.id, formData);
        } else {
            addDocumentation(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Manajemen Dokumentasi</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Total: {documentation.length} Foto</p>
                </div>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} />
                    Tambah Foto
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Judul</th>
                            <th>Kategori</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentation.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td><span className="badge-small">{item.category}</span></td>
                                <td className="actions-cell">
                                    <button className="btn-icon btn-edit" onClick={() => openEditModal(item)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteDocumentation(item.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content reveal active" style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h3>{editingItem ? 'Edit Foto' : 'Tambah Foto Baru'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Judul Foto</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Kategori</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Eksterior">Eksterior</option>
                                    <option value="Interior">Interior</option>
                                    <option value="Kegiatan">Kegiatan</option>
                                    <option value="Suasana">Suasana</option>
                                    <option value="Seni">Seni</option>
                                    <option value="Arsitektur">Arsitektur</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label>File Foto / Gambar</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className="image-input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            placeholder="URL Gambar atau Base64"
                                            style={{ flex: 1 }}
                                        />
                                        <label className="btn-icon btn-edit" style={{ cursor: 'pointer', minWidth: '42px', height: '42px', flexShrink: 0 }}>
                                            <Upload size={18} />
                                            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept="image/*" />
                                        </label>
                                    </div>

                                    {formData.url && (
                                        <div className="image-preview" style={{
                                            width: '100%',
                                            height: '180px',
                                            borderRadius: '1rem',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={formData.url}
                                                alt="Preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, url: '' })}
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
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="btn btn-accent">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentationManager;
