import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, BookOpen, Coffee, Users, HeartHandshake, HelpCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ProgramsManager = () => {
    const { programs, addProgram, updateProgram, deleteProgram } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formData, setFormData] = useState({
        icon: 'BookOpen',
        title: '',
        desc: ''
    });

    const iconMap = {
        BookOpen: <BookOpen size={20} />,
        Coffee: <Coffee size={20} />,
        Users: <Users size={20} />,
        HeartHandshake: <HeartHandshake size={20} />,
        HelpCircle: <HelpCircle size={20} />
    };

    const openAddModal = () => {
        setEditingProgram(null);
        setFormData({ icon: 'BookOpen', title: '', desc: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (prog) => {
        setEditingProgram(prog);
        setFormData({ ...prog });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProgram) {
            updateProgram(editingProgram.id, formData);
        } else {
            addProgram(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <p>Kelola program atau aktivitas unggulan masjid.</p>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} />
                    Tambah Program
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Nama Program</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map((prog) => (
                            <tr key={prog.id}>
                                <td>{iconMap[prog.icon] || <HelpCircle size={20} />}</td>
                                <td style={{ fontWeight: '700' }}>{prog.title}</td>
                                <td style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{prog.desc}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon btn-edit" onClick={() => openEditModal(prog)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteProgram(prog.id)}>
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
                            <h3>{editingProgram ? 'Edit Program' : 'Tambah Program Baru'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Pilih Icon</label>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {Object.keys(iconMap).map(iconName => (
                                        <button
                                            key={iconName}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icon: iconName })}
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                background: formData.icon === iconName ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'white'
                                            }}
                                        >
                                            {iconMap[iconName]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Nama Program</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Deskripsi Singkat</label>
                                <textarea
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
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

export default ProgramsManager;
