import React, { useEffect, useState } from 'react';
import { getMissions, deleteMission } from '../services/missionService';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import AffectationModal from './AffectationModal';
import { saveAs } from 'file-saver';
import axios from '../api/axiosConfig';
import MissionDetailsModal from './MissionDetailsModal';

function MissionList({ onEdit, refresh }) {
    const [missions, setMissions] = useState([]);
    const [filtreStatut, setFiltreStatut] = useState("Tous");
    const [showAffectModal, setShowAffectModal] = useState(false);
    const [selectedForAffectation, setSelectedForAffectation] = useState(null);
    const [selectedMission, setSelectedMission] = useState(null);

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

    const handleAffect = (mission) => {
        setSelectedForAffectation(mission);
        setShowAffectModal(true);
    };

    const handleDownloadPdf = async (missionId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/rapports/mission/${missionId}`,
                {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            saveAs(response.data, `rapport_mission_${missionId}.pdf`);
        } catch (error) {
            console.error('Erreur PDF :', error);
            toast.error('Erreur lors du téléchargement du rapport.');
        }
    };

    const getBadgeClass = (statut) => {
        switch (statut) {
            case 'Terminée': return 'bg-green-100 text-green-800';
            case 'En cours': return 'bg-blue-100 text-blue-800';
            case 'À venir': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    // ✅ Filtrage des missions par statut
    const missionsFiltrees = 
        filtreStatut === "Tous" 
            ? missions 
            : missions.filter((m) => m.statut === filtreStatut);

    return (
        <>
            {/* 🔽 Section filtre */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-emerald-700">Liste des missions</h2>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 font-medium">Filtrer :</label>
                    <select
                        value={filtreStatut}
                        onChange={(e) => setFiltreStatut(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
                    >
                        <option value="Tous">Tous</option>
                        <option value="À venir">À venir</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminée">Terminée</option>
                    </select>
                </div>
            </div>

            {/* 🧾 Tableau */}
            <div className="overflow-x-auto shadow rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
                    <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="px-4 py-3 text-left">Titre</th>
                            <th className="px-4 py-3 text-left">Destination</th>
                            <th className="px-4 py-3 text-left">Horaires</th>
                            <th className="px-4 py-3 text-left">Statut</th>
                            <th className="px-4 py-3 text-left">Collaborateur</th>
                            <th className="px-4 py-3 text-left">Véhicule</th>
                            <th className="px-4 py-3 text-left">Rapport</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missionsFiltrees.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium">{m.titre}</td>
                                <td className="px-4 py-2">{m.lieu || m.lieuArrivee}</td>
                                <td className="px-4 py-2">{m.dateDebut}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(m.statut)}`}>
                                        {m.statut}
                                    </span>
                                </td>
                                <td>{m.collaborateur ? `${m.collaborateur.nom} ${m.collaborateur.prenom}` : '-'}</td>
                                <td>{m.vehicule ? `${m.vehicule.matricule} (${m.vehicule.type})` : '-'}</td>
                                <td className="px-4 py-2">
                                    {m.statut === 'Terminée' && (
                                        <button
                                            onClick={() => handleDownloadPdf(m.id)}
                                            className="text-cyan-700 hover:underline text-sm font-medium"
                                        >
                                            📄 Télécharger
                                        </button>
                                    )}
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
                                        onClick={() => handleAffect(m)}
                                        className="text-emerald-600 hover:text-emerald-800"
                                        title="Affecter"
                                    >
                                        <FaUserPlus />
                                    </button>
                                    <button
                                        onClick={() => setSelectedMission(m)}
                                        className="text-gray-600 hover:text-black"
                                        title="Voir les détails"
                                    >
                                        👁️
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {missionsFiltrees.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    Aucune mission trouvée pour ce statut.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modales */}
            <AffectationModal
                isOpen={showAffectModal}
                mission={selectedForAffectation}
                onClose={() => setShowAffectModal(false)}
                onSaved={() => {
                    setShowAffectModal(false);
                    fetchData();
                }}
            />

            {selectedMission && (
                <MissionDetailsModal
                    mission={selectedMission}
                    onClose={() => setSelectedMission(null)}
                />
            )}
        </>
    );
}

export default MissionList;
