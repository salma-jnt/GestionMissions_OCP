import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRole, isAuthenticated, logout } from "../services/authService";
import ocpLogo from "../assets/ocp-logo.png";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState(getRole());

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-emerald-700 text-white flex flex-col transition-all duration-300 ease-in-out shadow-lg">
                <div className="p-6 font-bold text-xl flex items-center gap-2 border-b border-emerald-600">
                    <img src={ocpLogo} alt="Logo OCP" className="w-8 h-8" />
                    <span>OCP Missions</span>
                </div>

                <nav className="flex-1 p-4 space-y-3 text-sm font-medium">
                    <Link to="/dashboard" className="block hover:bg-emerald-600 p-2 rounded transition">📊 Tableau de bord</Link>

                    {role === "RESPONSABLE" && (
                        <>
                            <Link to="/missions" className="block hover:bg-emerald-600 p-2 rounded transition">📋 Missions</Link>
                            <Link to="/vehicules" className="block hover:bg-emerald-600 p-2 rounded transition">🚗 Véhicules</Link>
                            <Link to="/collaborateurs" className="block hover:bg-emerald-600 p-2 rounded transition">👥 Collaborateurs</Link>
                            <Link to="/affectations" className="block hover:bg-emerald-600 p-2 rounded transition">✅ Affectations</Link>
                        </>
                    )}

                    {role === "COLLABORATEUR" && (
                        <>
                            <Link to="/missions" className="block hover:bg-emerald-600 p-2 rounded transition">📋 Mes Missions</Link>
                        </>
                    )}

                    <Link to="/carte" className="block hover:bg-emerald-600 p-2 rounded transition">🗺️ Carte interactive</Link>
                </nav>

                <div className="p-4 text-sm border-t border-emerald-600">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left hover:text-red-200 transition"
                    >
                        🚪 Se déconnecter
                    </button>
                    <div className="mt-2 text-xs text-emerald-200">© OCP Safi 2025</div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-emerald-800">
                        Application de gestion des missions
                    </h1>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=Slima"
                            alt="avatar"
                            className="w-8 h-8 rounded-full border"
                        />
                        <span className="text-sm text-gray-700 font-medium">
                            {role}
                        </span>
                    </div>
                </header>

                {/* Children content */}
                <main className="p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
