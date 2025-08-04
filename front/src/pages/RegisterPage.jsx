import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ocpLogo from '../assets/ocp-logo.png';

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
            await axios.post('http://localhost:8080/api/auth/register', form);
            toast.success("Inscription réussie. Connectez-vous.");
            navigate('/login');
        } catch {
            toast.error("Échec d’inscription");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex justify-center mb-6">
                    <img src={ocpLogo} alt="OCP Logo" className="h-12" />
                </div>
                <h2 className="text-2xl font-bold text-center text-green-800 mb-2">Créer un compte</h2>
                <p className="text-sm text-center text-gray-500 mb-6">Inscrivez-vous pour accéder à la plateforme</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="username"
                        placeholder="Nom d'utilisateur"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="COLLABORATEUR">Collaborateur</option>
                        <option value="RESPONSABLE">Responsable</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Vous avez déjà un compte ?
                    <Link to="/login" className="text-green-700 font-medium ml-1 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
