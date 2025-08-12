import React, { useEffect, useMemo, useState } from 'react';
import { getMissions } from '../services/missionService';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { CheckCircleIcon, UsersIcon, MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';

function Dashboard() {
    const [missions, setMissions] = useState([]);
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [vehicules, setVehicules] = useState([]);

    useEffect(() => {
        getMissions().then(res => setMissions(res?.data || []));
        getCollaborateurs().then(res => setCollaborateurs(res?.data || []));
        getVehicules().then(res => setVehicules(res?.data || []));
    }, []);

    const countByStatus = (status) => missions.filter(m => m.statut === status).length;

    const getStatutColor = (statut) => {
        switch (statut) {
            case 'Terminée': return 'bg-green-100 text-green-800';
            case 'En cours': return 'bg-blue-100 text-blue-800';
            case 'À venir': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const fmt = (t) => (t === 0 ? '0' : (t ? String(t) : '—'));

    // --- Parsing robuste pour dateDebut (String)
    // Accepte: "2025-08-12T09:15", "2025-08-12 09:15", "2025-08-12", etc.
    const parseDate = (s) => {
        if (!s) return null;
        const str = String(s).trim();
        // normalize "YYYY-MM-DD HH:mm" -> "YYYY-MM-DDTHH:mm:00"
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(`${str}T00:00:00`);
        if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(str)) {
            const [d, h] = str.split(/\s+/);
            return new Date(`${d}T${h}:00`);
        }
        // let Date() try for ISO "YYYY-MM-DDTHH:mm[:ss]"
        const d = new Date(str);
        return isNaN(d.getTime()) ? null : d;
    };

    const missionDate = (m) => {
        const d =
            parseDate(m.dateDebut) ||
            (m.createdAt ? new Date(m.createdAt) : null) ||
            (m.updatedAt ? new Date(m.updatedAt) : null);
        return d ? d : new Date(0);
    };

    const extractHour = (s) => {
        const d = parseDate(s);
        if (!d) return '—';
        // HH:mm
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    };

    // --- Top 3 missions les plus récentes ---
    const recentMissions = useMemo(() => {
        return [...missions]
            .sort((a, b) => missionDate(b) - missionDate(a))
            .slice(0, 3);
    }, [missions]);

    // --- Stat cards ---
    const vehiculesEnService = vehicules.filter(v => v.etat === 'En service');
    const statCards = [
        { title: 'Missions Actives', count: countByStatus('En cours'), icon: MapPinIcon, trend: '+3 cette semaine', color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Véhicules en Service', count: vehiculesEnService.length, icon: TruckIcon, trend: '+1 cette semaine', color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Collaborateurs', count: collaborateurs.length, icon: UsersIcon, trend: '0 cette semaine', color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: 'Missions Terminées', count: countByStatus('Terminée'), icon: CheckCircleIcon, trend: '+12 cette semaine', color: 'text-black', bg: 'bg-gray-100' }
    ];

    // --- Disponibilité véhicule (Disponible / En mission / En panne)
    const vehiculeAvailability = (v) => {
        const active = missions.some(m => m.vehicule?.id === v.id && m.statut === 'En cours');
        if (active) return 'En mission';
        if (v.etat === 'En panne') return 'En panne';
        return 'Disponible';
    };
    const availabilityBadge = (status) => {
        switch (status) {
            case 'Disponible': return 'bg-green-100 text-green-800';
            case 'En mission': return 'bg-blue-100 text-blue-800';
            case 'En panne': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const dotColor = (status) => {
        switch (status) {
            case 'Disponible': return 'bg-green-500';
            case 'En mission': return 'bg-blue-500';
            case 'En panne': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-2">Tableau de Bord</h1>
            <p className="text-gray-600 mb-6">Vue d'ensemble des missions et véhicules OCP Safi</p>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow text-center space-y-2">
                        <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full ${card.bg}`}>
                            <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                        <p className="text-3xl font-bold">{card.count}</p>
                        <p className="text-sm text-green-600 font-semibold">↗ {card.trend}</p>
                    </div>
                ))}
            </div>

            {/* Missions Récentes */}
            <div className="bg-white rounded-lg shadow p-6 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Missions Récentes</h2>
                    <a href="/missions" className="text-green-700 hover:underline font-medium">Voir tout</a>
                </div>
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left">MISSION</th>
                            <th className="px-4 py-2 text-left">COLLABORATEUR</th>
                            <th className="px-4 py-2 text-left">DESTINATION</th>
                            <th className="px-4 py-2 text-left">VÉHICULE</th>
                            <th className="px-4 py-2 text-left">STATUT</th>
                            <th className="px-4 py-2 text-left">HEURE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentMissions.map((m, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-4 py-2 font-semibold">{fmt(m.titre)}</td>
                                <td className="px-4 py-2">{fmt(m.collaborateur?.nomComplet || m.collaborateur?.nom)}</td>
                                <td className="px-4 py-2">{fmt(m.lieu)}</td>
                                <td className="px-4 py-2">
                                    {m.vehicule
                                        ? `${fmt(m.vehicule.marque)} - ${fmt(m.vehicule.matricule)}`
                                        : '—'}
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(m.statut)}`}>
                                        {fmt(m.statut)}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{extractHour(m.dateDebut)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* État des véhicules */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">État des Véhicules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicules.map((v) => {
                        const status = vehiculeAvailability(v);
                        return (
                            <div key={v.id} className="border rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M3 7h10v8H3V7zm10 3h4l4 4v1h-2m-6 0h-2m-2 0H5m10-1a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">{fmt(v.marque)} - {fmt(v.matricule)}</p>
                                        <p className="text-sm text-gray-500">{fmt(v.type)}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-2 ${availabilityBadge(status)}`}>
                                    {status}
                                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor(status)}`}></span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
