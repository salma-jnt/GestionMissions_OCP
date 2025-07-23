import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        role: 'COLLABORATEUR'
    });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', form);
            toast.success("Inscription réussie. Connectez-vous.");
            navigate('/login');

        } catch {
            toast.error("Échec d’inscription");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Créer un compte</h3>
            <form onSubmit={handleSubmit}>
                <input name="username" className="form-control mb-2" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} />
                <input name="password" type="password" className="form-control mb-2" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
                <select name="role" className="form-select mb-3" value={form.role} onChange={handleChange}>
                    <option value="COLLABORATEUR">Collaborateur</option>
                    <option value="RESPONSABLE">Responsable</option>
                </select>
                <button className="btn btn-success">S'inscrire</button>
            </form>
        </div>
    );
}

export default RegisterPage;
