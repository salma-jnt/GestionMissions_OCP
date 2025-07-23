import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(form);
            toast.success("Connexion réussie");
            navigate('/');
        } catch {
            toast.error("Échec de connexion");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Connexion</h3>
            <form onSubmit={handleSubmit}>
                <input name="username" className="form-control mb-2" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} />
                <input name="password" type="password" className="form-control mb-2" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
                <button className="btn btn-primary">Se connecter</button>
            </form>
        </div>
    );
}

export default LoginPage;
