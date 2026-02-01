import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, User, Phone, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';

const StructureManager = () => {
    const { board, addBoardMember, updateBoardMember, deleteBoardMember } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        category: 'Bidang-bidang',
        phone: '',
        imageUrl: '',
        order: board.length + 1
    });

    const categories = ['Pengurus Inti', 'Bidang-bidang', 'Dewan Penasehat'];

    const openAddModal = () => {
        setEditingMember(null);
        setFormData({
            name: '',
            position: '',
            category: 'Bidang-bidang',
            phone: '',
            imageUrl: '',
            order: board.length + 1
        });
        setIsModalOpen(true);
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setFormData({ ...member });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMember) {
            updateBoardMember(editingMember.id, formData);
        } else {
            addBoardMember(formData);
        }
        setIsModalOpen(false);
    };

    const moveOrder = (id, direction) => {
        const index = board.findIndex(m => m.id === id);
        if (index === -1) return;

        const newBoard = [...board].sort((a, b) => (a.order || 0) - (b.order || 0));
        const currentIdx = newBoard.findIndex(m => m.id === id);

        if (direction === 'up' && currentIdx > 0) {
            const target = newBoard[currentIdx - 1];
            const current = newBoard[currentIdx];
            const tempOrder = target.order;
            target.order = current.order;
            current.order = tempOrder;
            updateBoardMember(target.id, target);
            updateBoardMember(current.id, current);
        } else if (direction === 'down' && currentIdx < newBoard.length - 1) {
            const target = newBoard[currentIdx + 1];
            const current = newBoard[currentIdx];
            const tempOrder = target.order;
            target.order = current.order;
            current.order = tempOrder;
            updateBoardMember(target.id, target);
            updateBoardMember(current.id, current);
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <p>Kelola susunan kepengurusan DKM / Takmir Masjid.</p>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} />
                    Tambah Pengurus
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Urutan</th>
                            <th>Nama / Foto</th>
                            <th>Jabatan</th>
                            <th>Kategori</th>
                            <th>Kontak</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...board].sort((a, b) => (a.order || 0) - (b.order || 0)).map((member, idx) => (
                            <tr key={member.id}>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                        <button className="btn-icon" onClick={() => moveOrder(member.id, 'up')} disabled={idx === 0}>
                                            <ChevronUp size={16} />
                                        </button>
                                        <span style={{ fontWeight: 'bold' }}>{idx + 1}</span>
                                        <button className="btn-icon" onClick={() => moveOrder(member.id, 'down')} disabled={idx === board.length - 1}>
                                            <ChevronDown size={16} />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)' }}>
                                            {member.imageUrl ? (
                                                <img src={member.imageUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}><User size={20} /></div>
                                            )}
                                        </div>
                                        <span style={{ fontWeight: '700' }}>{member.name}</span>
                                    </div>
                                </td>
                                <td>{member.position}</td>
                                <td><span className="badge">{member.category}</span></td>
                                <td style={{ fontSize: '0.85rem' }}>
                                    {member.phone ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Phone size={12} /> {member.phone}
                                        </div>
                                    ) : '-'}
                                </td>
                                <td className="actions-cell">
                                    <button className="btn-icon btn-edit" onClick={() => openEditModal(member)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteBoardMember(member.id)}>
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
                            <h3>{editingMember ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Contoh: H. Ahmad Syarifuddin"
                                    required
                                />
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Jabatan</label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        placeholder="Contoh: Ketua DKM"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>WhatsApp (Lengkap dengan 08...)</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Contoh: 081234567890"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL Foto (Opsional)</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
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

export default StructureManager;
