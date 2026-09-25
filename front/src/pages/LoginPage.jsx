import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ocpLogo from '../assets/ocp-logo.png'; // Assure-toi d’avoir ce logo

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
            navigate('/collaborateurs'); // ou '/dashboard' si tu as une page dédiée
        } catch {
            toast.error("Échec de connexion");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex justify-center mb-6">
                    <img src={ocpLogo} alt="OCP Logo" className="h-12" />
                </div>
                <h2 className="text-2xl font-bold text-center text-green-800 mb-2">Bienvenue</h2>
                <p className="text-sm text-center text-gray-500 mb-6">Connectez-vous à votre compte</p>

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
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                    >
                        Se connecter
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Vous n'avez pas de compte ?
                    <Link to="/register" className="text-green-700 font-medium ml-1 hover:underline">
                        Créez un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
