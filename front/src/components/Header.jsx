import React, { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { getUserName, getRole } from "../services/authService";

export default function Header({ pageTitle = "Tableau de Bord", pageDescription = "Vue d'ensemble des missions et véhicules OCP Safi" }) {
    const userName = getUserName() || "Ahmed Benali"; // Fallback si pas de nom
    const role = getRole();
    const [notificationCount] = useState(3); // Vous pouvez connecter ça à votre API

    // Fonction pour générer les initiales
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
            {/* Titre de la page actuelle */}
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
                    <p className="text-sm text-gray-500">{pageDescription}</p>
                </div>
            </div>

            {/* Section droite avec notifications et profil */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {notificationCount}
                        </span>
                    )}
                </button>

                {/* Profil utilisateur */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {getInitials(userName)}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 uppercase">{role}</p>
                    </div>
                    
                    {/* Settings */}
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}