import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ArticleManager = () => {
    const { articles, addArticle, updateArticle, deleteArticle } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'KAJIAN',
        date: '',
        image: ''
    });

    const openAddModal = () => {
        setEditingArticle(null);
        setFormData({ title: '', category: 'KAJIAN', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), image: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (article) => {
        setEditingArticle(article);
        setFormData({ ...article });
        setIsModalOpen(true);
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
                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    required
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
