import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../services/authService";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const navigate = useNavigate();
    const [role, setRole] = useState(getRole());

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header horizontal */}
            <Header role={role} />

            {/* Corps : Sidebar à gauche + Contenu à droite */}
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
