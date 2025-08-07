import React from "react";
import ocpLogo from "../assets/ocp-logo.png";

export default function Header({ role }) {
    return (
        <header className="w-full bg-white border-b px-6 py-[15px] flex justify-between items-center">
            {/* Logo OCP + titre */}
            <div className="flex items-center gap-3">
                <img
                    src={ocpLogo}
                    alt="OCP Logo"
                    className="w-8 h-8 object-contain"
                />
                <h6 className="text-xs font-medium text-gray-700">
                    Gestion des Missions
                </h6>
            </div>


            {/* Profil utilisateur */}
            <div className="flex items-center gap-3">
                <img
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=Slima"
                    alt="avatar"
                    className="w-9 h-9 rounded-full border"
                />
                <span className="text-sm text-gray-700 font-medium uppercase">
                    {role}
                </span>
            </div>
        </header>
    );
}
