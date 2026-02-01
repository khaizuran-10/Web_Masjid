import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';
import './Admin.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple auth for demonstration: admin / admin123
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('masjid_admin_auth', 'true');
            navigate('/admin');
        } else {
            setError('Username atau password salah');
        }
    };

    return (
        <div className="login-container">
            {/* Artistic Background Support */}
            <div className="login-bg-overlay"></div>
            <img
                src="https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=2070&auto=format&fit=crop"
                alt="Background"
                className="login-bg-image"
            />

            <div className="login-card reveal active">
                <div className="login-header">
                    <div className="login-brand">
                        <div className="logo-icon">A</div>
                        <span>Masjid Al Amir</span>
                    </div>
                    <h2>Admin Dashboard</h2>
                    <p>Selamat datang kembali, Admin.</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Nama Pengguna</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Kata Sandi</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="btn btn-accent btn-login" style={{ marginTop: '1rem' }}>
                        <LogIn size={20} style={{ marginRight: '10px' }} />
                        Masuk Sekarang
                    </button>

                    <button type="button" onClick={() => navigate('/')} className="btn-back-home" style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', cursor: 'pointer', display: 'block', margin: '1.5rem auto 0' }}>
                        Kembali Beranda
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
