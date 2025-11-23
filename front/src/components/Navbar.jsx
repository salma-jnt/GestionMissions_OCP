import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, isAuthenticated, logout } from '../services/authService';

function Navbar() {
    const role = getRole();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">OCP Missions</Link>
            <div className="navbar-nav">
                {isAuthenticated() ? (
                    <>
                        {role === 'RESPONSABLE' && (
                            <>
                                <Link className="nav-link" to="/collaborateurs">Collaborateurs</Link>
                                <Link className="nav-link" to="/missions">Missions</Link>
                                <Link className="nav-link" to="/vehicules">Véhicules</Link>
                                <Link className="nav-link" to="/affectations">Affectations</Link>
                            </>
                        )}
                        <Link className="nav-link" to="/carte">Carte</Link>
                        <button
                            className="btn btn-outline-light ms-3"
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">Connexion</Link>
                        <Link className="nav-link" to="/register">Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
