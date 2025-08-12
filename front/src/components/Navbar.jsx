import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, isAuthenticated, logout } from '../services/authService';

export default function Navbar() {
    const role = getRole();
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
            {/* Logo + titre */}
            <div className="flex items-center gap-3">
                <img src="/assets/ocp-logo.png" alt="OCP" className="w-9 h-9" />
                <span className="text-lg font-semibold text-green-800">Gestion Missions</span>
            </div>

            {/* Liens */}
            <div className="flex items-center gap-6 text-sm font-medium">
                {isAuthenticated() ? (
                    <>
                        {role === 'RESPONSABLE' && (
                            <>
                                <Link
                                    to="/collaborateurs"
                                    style={{ textDecoration: 'none', color: '#1F2937' }}
                                    className="hover:text-green-700"
                                >
                                    Collaborateurs
                                </Link>
                                <Link
                                    to="/missions"
                                    style={{ textDecoration: 'none', color: '#1F2937' }}
                                    className="hover:text-green-700"
                                >
                                    Missions
                                </Link>
                                <Link
                                    to="/vehicules"
                                    style={{ textDecoration: 'none', color: '#1F2937' }}
                                    className="hover:text-green-700"
                                >
                                    Véhicules
                                </Link>
                                <Link
                                    to="/affectations"
                                    style={{ textDecoration: 'none', color: '#1F2937' }}
                                    className="hover:text-green-700"
                                >
                                    Affectations
                                </Link>
                            </>
                        )}
                        <Link
                            to="/carte"
                            style={{ textDecoration: 'none', color: '#1F2937' }}
                            className="hover:text-green-700"
                        >
                            Carte
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            style={{ textDecoration: 'none', color: '#1F2937' }}
                            className="hover:text-green-700"
                        >
                            Connexion
                        </Link>
                        <Link
                            to="/register"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: '600',
                                display: 'inline-block'
                            }}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded focus:outline-none"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
