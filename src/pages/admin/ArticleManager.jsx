import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ArticleManager = () => {
    const { articles, addArticle, updateArticle, deleteArticle } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'KAJIAN',
        date: '',
        image: '',
        content: ''
    });

    const openAddModal = () => {
        setEditingArticle(null);
        setFormData({
            title: '',
            category: 'KAJIAN',
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: '',
            content: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (article) => {
        setEditingArticle(article);
        setFormData({ ...article });
        setIsModalOpen(true);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingArticle) {
            updateArticle(editingArticle.id, formData);
        } else {
            addArticle(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <p>Total: {articles.length} Artikel</p>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} />
                    Tambah Artikel
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Kategori</th>
                            <th>Judul</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id}>
                                <td><span className="badge-small">{article.category}</span></td>
                                <td>{article.title}</td>
                                <td>{article.date}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon btn-edit" onClick={() => openEditModal(article)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteArticle(article.id)}>
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
                    <div className="modal-content reveal active">
                        <div className="modal-header">
                            <h3>{editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Judul Artikel</label>
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
                                    <option value="KAJIAN">KAJIAN</option>
                                    <option value="PEMBANGUNAN">PEMBANGUNAN</option>
                                    <option value="KOMUNITAS">KOMUNITAS</option>
                                    <option value="WARTA">WARTA</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tanggal (e.g. 22 Maret 2024)</label>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label>Gambar Artikel</label>
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
                                            height: '150px',
                                            borderRadius: '0.75rem',
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
                            <div className="form-group">
                                <label>Isi Artikel (Mendukung HTML dasar)</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Tulis isi artikel di sini..."
                                    style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'inherit' }}
                                />
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

export default ArticleManager;
