import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    MapPin,
    Car,
    Users,
    Map,
    FileText,
    LogOut
} from "lucide-react";
import { getRole, logout } from "../services/authService";
import ocpLogo from "../assets/ocp-logo.png";

export default function Sidebar() {
    const navigate = useNavigate();
    const role = getRole();

    const getUserName = () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            return user?.nom || user?.prenom || user?.name || user?.username || 'Utilisateur';
        } catch {
            return 'Utilisateur';
        }
    };

    const userName = getUserName();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const getInitials = (name) => {
        if (!name || name === 'Utilisateur') return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="w-56 h-screen bg-green-50 fixed left-0 top-0 z-50 flex flex-col ">

            {/* Partie haute : Logo + Menu */}
            <div>
                {/* Logo */}
                <div className="px-4 py-6 border-b border-green-100">
                    <div className="flex items-center gap-2">
                        <img src={ocpLogo} alt="OCP Logo" className="w-8 h-8 object-contain" />
                        <span className="text-sm font-semibold text-gray-900">Gestion des Missions</span>
                    </div>
                </div>

                {/* Menu */}
                <nav className="px-2 py-4 space-y-1">
                    <NavLink to="/dashboard" className={({ isActive }) =>
                        `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                        }`
                    }>
                        <LayoutDashboard className="w-4 h-4" />
                        Tableau de Bord
                    </NavLink>

                    <NavLink to="/missions" className={({ isActive }) =>
                        `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                        }`
                    }>
                        <MapPin className="w-4 h-4" />
                        Missions
                    </NavLink>

                    {role === "RESPONSABLE" && (
                        <>
                            <NavLink to="/vehicules" className={({ isActive }) =>
                                `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                                }`
                            }>
                                <Car className="w-4 h-4" />
                                Véhicules
                            </NavLink>

                            <NavLink to="/collaborateurs" className={({ isActive }) =>
                                `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                                }`
                            }>
                                <Users className="w-4 h-4" />
                                Collaborateurs
                            </NavLink>

                            <NavLink to="/rapports" className={({ isActive }) =>
                                `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                                }`
                            }>
                                <FileText className="w-4 h-4" />
                                Rapports
                            </NavLink>
                        </>
                    )}

                    <NavLink to="/carte" className={({ isActive }) =>
                        `w-full flex items-center gap-2 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-green-100 border-r-4 border-green-600 active" : "hover:bg-green-100"
                        }`
                    }>
                        <Map className="w-4 h-4" />
                        Carte Interactive
                    </NavLink>
                </nav>
            </div>

            {/* Partie basse : Utilisateur */}
            <div className="mt-auto px-2 py-2 border-t border-green-100">
                <div className="flex items-center justify-between px-2 py-2 bg-green-100 rounded-lg">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs">
                                {getInitials(userName)}
                            </span>
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate leading-tight">
                                {userName}
                            </p>
                            <p className="text-xs text-gray-500 uppercase leading-tight">
                                {role}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Se déconnecter"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-xs text-center text-gray-400 mt-1">
                    © OCP Safi 2025
                </p>
            </div>
        </div>
    );
}
