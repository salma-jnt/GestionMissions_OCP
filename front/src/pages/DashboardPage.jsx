import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        activeMissions: 12,
        doneMissions: 156,
        vehicules: 8,
        collaborateurs: 24,
    });

    const [missionsRecentes, setMissionsRecentes] = useState([
        {
            code: "M001",
            collaborateur: "Youssef Alami",
            destination: "Maroc Phosphore I",
            vehicule: "Toyota Hilux - MAT-1234",
            statut: "En cours",
            heure: "08:30",
        },
        {
            code: "M002",
            collaborateur: "Fatima Zahra",
            destination: "Port de Safi",
            vehicule: "Iveco Daily - MAT-5678",
            statut: "Terminée",
            heure: "07:15",
        },
        {
            code: "M003",
            collaborateur: "Mohammed Bennani",
            destination: "Maroc Chimie",
            vehicule: "Renault Master - MAT-9012",
            statut: "À venir",
            heure: "14:00",
        },
    ]);

    const getStatColor = (statut) => {
        switch (statut) {
            case "En cours":
                return "bg-blue-100 text-blue-700";
            case "Terminée":
                return "bg-green-100 text-green-700";
            case "À venir":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de Bord</h1>
            <p className="text-sm text-gray-500 mb-6">Vue d'ensemble des missions et véhicules OCP Safi</p>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Missions Actives" icon="📍" count={stats.activeMissions} trend="+3 cette semaine" />
                <StatCard title="Véhicules en Service" icon="🚗" count={stats.vehicules} trend="+1 cette semaine" />
                <StatCard title="Collaborateurs" icon="👤" count={stats.collaborateurs} trend="0 cette semaine" />
                <StatCard title="Missions Terminées" icon="✔️" count={stats.doneMissions} trend="+12 cette semaine" />
            </div>

            {/* Missions Récentes */}
            <div className="bg-white rounded-lg shadow p-4 mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Missions Récentes</h2>
                    <Link to="/missions" className="text-green-600 hover:underline">Voir tout</Link>
                </div>
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-2">MISSION</th>
                            <th>COLLABORATEUR</th>
                            <th>DESTINATION</th>
                            <th>VÉHICULE</th>
                            <th>STATUT</th>
                            <th>HEURE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missionsRecentes.map((m) => (
                            <tr key={m.code} className="border-b hover:bg-gray-50">
                                <td className="py-2 font-medium">{m.code}</td>
                                <td>{m.collaborateur}</td>
                                <td>{m.destination}</td>
                                <td>{m.vehicule}</td>
                                <td>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatColor(m.statut)}`}>
                                        {m.statut}
                                    </span>
                                </td>
                                <td>{m.heure}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard title="Nouvelle Mission" subtitle="Créer et assigner une mission" buttonText="Créer Mission" color="blue" to="/affecter-mission" />
                <ActionCard title="Rapport Mensuel" subtitle="Générer un rapport détaillé" buttonText="Générer Rapport" color="green" to="/rapports" />
                <ActionCard title="Suivi Temps Réel" subtitle="Voir les missions actives" buttonText="Voir Carte" color="purple" to="/carte" />
            </div>
        </div>
    );
}

function StatCard({ title, count, icon, trend }) {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <p className="text-green-600 text-xs mt-1">{trend}</p>
            </div>
            <div className="text-3xl">{icon}</div>
        </div>
    );
}

function ActionCard({ title, subtitle, buttonText, color, to }) {
    const colors = {
        blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        green: "bg-green-100 text-green-700 hover:bg-green-200",
        purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700">{title}</p>
            <p className="text-xs text-gray-500 mb-4">{subtitle}</p>
            <Link
                to={to}
                className={`block text-center py-2 rounded font-semibold ${colors[color]} transition`}
            >
                {buttonText}
            </Link>
        </div>
    );
}
