import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const EventManager = () => {
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        day: '',
        month: '',
        title: '',
        time: '',
        location: ''
    });

    const openAddModal = () => {
        setEditingEvent(null);
        setFormData({ day: '', month: '', title: '', time: '', location: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setFormData({ ...event });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEvent) {
            updateEvent(editingEvent.id, formData);
        } else {
            addEvent(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <p>Total: {events.length} Agenda</p>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} />
                    Tambah Agenda
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Judul</th>
                            <th>Waktu</th>
                            <th>Lokasi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.day} {event.month}</td>
                                <td>{event.title}</td>
                                <td>{event.time}</td>
                                <td>{event.location}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon btn-edit" onClick={() => openEditModal(event)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteEvent(event.id)}>
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
                            <h3>{editingEvent ? 'Edit Agenda' : 'Tambah Agenda Baru'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Hari (Tgl)</label>
                                    <input
                                        type="text"
                                        value={formData.day}
                                        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                        placeholder="25"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bulan (3 Huruf)</label>
                                    <input
                                        type="text"
                                        value={formData.month}
                                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                        placeholder="MAR"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Judul Agenda</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Waktu</label>
                                <input
                                    type="text"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    placeholder="20:00 WIB"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Lokasi</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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

export default EventManager;
