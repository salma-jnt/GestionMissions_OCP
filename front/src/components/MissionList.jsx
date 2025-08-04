import React, { useEffect, useState } from 'react';
import { getMissions, deleteMission } from '../services/missionService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

function MissionList({ onEdit, refresh }) {
    const [missions, setMissions] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await getMissions();
            setMissions(res.data);
        } catch {
            toast.error("Erreur lors du chargement des missions");
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (confirm("Supprimer cette mission ?")) {
            try {
                await deleteMission(id);
                toast.success("🗑️ Mission supprimée");
                fetchData();
            } catch {
                toast.error("❌ Erreur lors de la suppression");
            }
        }
    };

    const getBadgeClass = (statut) => {
        switch (statut) {
            case 'Terminée':
                return 'bg-green-100 text-green-800';
            case 'En cours':
                return 'bg-blue-100 text-blue-800';
            case 'À venir':
                return 'bg-yellow-100 text-yellow-800';
            case 'Planifiée':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
                <thead className="bg-green-100 text-green-900">
                    <tr>
                        <th className="px-4 py-3 text-left">Titre</th>
                        <th className="px-4 py-3 text-left">Lieu</th>
                        <th className="px-4 py-3 text-left">Date Début</th>
                        <th className="px-4 py-3 text-left">Statut</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {missions.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{m.titre}</td>
                            <td className="px-4 py-2">{m.lieu}</td>
                            <td className="px-4 py-2">{m.dateDebut}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(m.statut)}`}>
                                    {m.statut}
                                </span>
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => onEdit(m)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Modifier"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Supprimer"
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    onClick={() => navigate(`/missions/${m.id}/affecter`)}
                                    className="text-emerald-600 hover:text-emerald-800"
                                    title="Affecter"
                                >
                                    <FaUserPlus />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MissionList;
