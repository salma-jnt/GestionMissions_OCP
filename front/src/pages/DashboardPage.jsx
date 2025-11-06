import React, { useEffect, useMemo, useState } from 'react';
import { getMissions } from '../services/missionService';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { CheckCircleIcon, UsersIcon, MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const [missions, setMissions] = useState([]);
  const [collaborateurs, setCollaborateurs] = useState([]);
  const [vehicules, setVehicules] = useState([]);

  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  useEffect(() => {
    getMissions().then(res => setMissions(res?.data || []));
    getCollaborateurs().then(res => setCollaborateurs(res?.data || []));
    getVehicules().then(res => setVehicules(res?.data || []));
  }, []);

  // Pour collaborateur : ne garder que ses missions
  const missionsFiltrees =
    role === 'COLLABORATEUR'
      ? missions.filter(m => m.collaborateur?.email === email)
      : missions;

  const countByStatus = (status) => missionsFiltrees.filter(m => m.statut === status).length;

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'Terminée': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'À venir': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const fmt = (t) => (t === 0 ? '0' : (t ? String(t) : '—'));

  // Fonctions pour dates
  const parseDate = (s) => {
    if (!s) return null;
    const str = String(s).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(`${str}T00:00:00`);
    if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(str)) {
      const [d, h] = str.split(/\s+/);
      return new Date(`${d}T${h}:00`);
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  const missionDate = (m) => {
    const d = parseDate(m.dateDebut) ||
      (m.createdAt ? new Date(m.createdAt) : null) ||
      (m.updatedAt ? new Date(m.updatedAt) : null);
    return d ? d : new Date(0);
  };

  const extractHour = (s) => {
    const d = parseDate(s);
    if (!d) return '—';
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const recentMissions = useMemo(() => {
    return [...missionsFiltrees]
      .sort((a, b) => missionDate(b) - missionDate(a))
      .slice(0, 3);
  }, [missionsFiltrees]);

  const vehiculesEnService = vehicules.filter(v => v.etat === 'En service');

  const statCards = [
    { title: 'Missions Actives', count: countByStatus('En cours'), icon: MapPinIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Missions Terminées', count: countByStatus('Terminée'), icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  if (role === 'RESPONSABLE') {
    statCards.push(
      { title: 'Véhicules en Service', count: vehiculesEnService.length, icon: TruckIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
      { title: 'Collaborateurs', count: collaborateurs.length, icon: UsersIcon, color: 'text-black', bg: 'bg-gray-100' }
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">
        {role === 'RESPONSABLE' ? 'Tableau de Bord Global' : 'Mon Tableau de Bord'}
      </h1>
      <p className="text-gray-600 mb-6">
        {role === 'RESPONSABLE'
          ? "Vue d'ensemble des missions et véhicules OCP Safi"
          : 'Suivi de mes missions en cours et passées'}
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow text-center space-y-2">
            <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <p className="text-3xl font-bold">{card.count}</p>
          </div>
        ))}
      </div>

      {/* Missions Récentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {role === 'RESPONSABLE' ? 'Missions Récentes' : 'Mes Missions Récentes'}
          </h2>
          <a href="/missions" className="text-green-700 hover:underline font-medium">Voir tout</a>
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">MISSION</th>
              <th className="px-4 py-2 text-left">COLLABORATEUR</th>
              <th className="px-4 py-2 text-left">DESTINATION</th>
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
    </div>
  );
}

export default Dashboard;
