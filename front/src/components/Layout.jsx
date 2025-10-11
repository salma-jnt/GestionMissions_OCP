import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../services/authService";
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
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            {/* Main content avec margin-left pour compenser la sidebar fixed */}
            <main className="ml-56 min-h-screen p-6 overflow-y-auto bg-white">
                {children}
            </main>
        </div>
    );
}