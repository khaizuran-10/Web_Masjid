import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const DocumentationManager = () => {
    const { documentation, addDocumentation, updateDocumentation, deleteDocumentation } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Eksterior',
        url: '',
        size: 'normal'
    });

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ title: '', category: 'Eksterior', url: '', size: 'normal' });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setIsModalOpen(true);
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
                <p>Total: {documentation.length} Foto</p>
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
                            <th>Ukuran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentation.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.url} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td>{item.title}</td>
                                <td><span className="badge-small">{item.category}</span></td>
                                <td>{item.size}</td>
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
                    <div className="modal-content reveal active">
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
                            <div className="form-group">
                                <label>Image URL (Path relative to public folder or External URL)</label>
                                <input
                                    type="text"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="/nama-foto.jpeg atau https://..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Layout Size (Bento Grid)</label>
                                <select
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                >
                                    <option value="normal">Normal (1x1)</option>
                                    <option value="wide">Wide (2x1)</option>
                                    <option value="tall">Tall (1x2)</option>
                                    <option value="large">Large (2x2)</option>
                                </select>
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
