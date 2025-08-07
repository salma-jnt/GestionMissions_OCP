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

export default function Sidebar() {
    const navigate = useNavigate();
    const role = getRole();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="w-64 h-full flex flex-col bg-white shadow-sm">
            {/* Navigation */}
            <nav className="px-4 py-6 space-y-1 text-sm font-medium text-black flex-1">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Tableau de Bord
                </NavLink>

                <NavLink
                    to="/missions"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    <MapPin className="w-5 h-5" />
                    Missions
                </NavLink>

                {role === "RESPONSABLE" && (
                    <>
                        <NavLink
                            to="/vehicules"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Car className="w-5 h-5" />
                            Véhicules
                        </NavLink>

                        <NavLink
                            to="/collaborateurs"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Users className="w-5 h-5" />
                            Collaborateurs
                        </NavLink>

                        <NavLink
                            to="/rapports"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <FileText className="w-5 h-5" />
                            Rapports
                        </NavLink>
                    </>
                )}

                <NavLink
                    to="/carte"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-green-50 text-green-800 border-r-4 border-green-600"
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    <Map className="w-5 h-5" />
                    Carte Interactive
                </NavLink>
            </nav>

            {/* Déconnexion toujours en bas */}
            <div className="px-4 py-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 font-medium text-sm text-red-600 hover:underline"
                >
                    <LogOut className="w-5 h-5" />
                    Se déconnecter
                </button>
                <p className="text-xs mt-2 text-center text-gray-400">
                    © OCP Safi 2025
                </p>
            </div>
        </div>
    );
}
