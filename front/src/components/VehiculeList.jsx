import React, { useEffect, useState } from 'react';
import { getVehicules, deleteVehicule } from '../services/vehiculeService';
import { toast } from 'react-toastify';

export default function VehiculeList({ onEdit, refresh }) {
    const [vehicules, setVehicules] = useState([]);
    const [filtreType, setFiltreType] = useState("Tous");
    const [filtreDispo, setFiltreDispo] = useState("Tous");

    useEffect(() => {
        getVehicules()
            .then(res => setVehicules(res.data))
            .catch(() => toast.error("Erreur lors du chargement des véhicules"));
    }, [refresh]);

    const handleDelete = async (id) => {
        if (confirm("Supprimer ce véhicule ?")) {
            try {
                await deleteVehicule(id);
                toast.info("Véhicule supprimé");
                setVehicules(v => v.filter(x => x.id !== id));
            } catch {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    // 🧠 Extraire tous les types distincts
    const typesDisponibles = ["Tous", ...new Set(vehicules.map(v => v.type))];

    // 🧩 Appliquer les deux filtres
    const vehiculesFiltres = vehicules.filter(v => {
        const matchType = filtreType === "Tous" || v.type === filtreType;
        const matchDispo =
            filtreDispo === "Tous" ||
            (filtreDispo === "Disponibles" && v.disponibilite === "Disponible") ||
            (filtreDispo === "Occupés" && v.disponibilite === "Occupé") ||
            (filtreDispo === "Réservés" && v.disponibilite && v.disponibilite.includes("Réservé"));
        return matchType && matchDispo;
    });

    return (
        <>
            {/* 🔽 Filtres */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-3">
                <h2 className="text-xl font-semibold text-emerald-700">Liste des véhicules</h2>

                <div className="flex flex-wrap gap-3 items-center">
                    {/* Filtre Type */}
                    <div className="flex items-center gap-2">
                        <label className="text-gray-600 font-medium">Type :</label>
                        <select
                            value={filtreType}
                            onChange={(e) => setFiltreType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
                        >
                            {typesDisponibles.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtre Disponibilité */}
                    <div className="flex items-center gap-2">
                        <label className="text-gray-600 font-medium">Disponibilité :</label>
                        <select
                            value={filtreDispo}
                            onChange={(e) => setFiltreDispo(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
                        >
                            <option value="Tous">Tous</option>
                            <option value="Disponibles">Disponibles</option>
                            <option value="Occupés">Occupés</option>
                            <option value="Réservés">Réservés</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 🧾 Tableau */}
            <div className="overflow-x-auto shadow rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
                    <thead className="bg-emerald-100 text-emerald-900">
                        <tr>
                            <th className="px-4 py-3 text-left">Matricule</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Marque</th>
                            <th className="px-4 py-3 text-left">Disponibilité</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculesFiltres.map(v => (
                            <tr key={v.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium">{v.matricule}</td>
                                <td className="px-4 py-2">{v.type}</td>
                                <td className="px-4 py-2">{v.marque || '-'}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            v.disponibilite === "Disponible"
                                                ? "bg-green-100 text-green-700"
                                                : v.disponibilite && v.disponibilite.includes("Réservé")
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {v.disponibilite}
                                    </span>
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => onEdit(v)}
                                        className="text-yellow-600 hover:text-yellow-800 font-semibold"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(v.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {vehiculesFiltres.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    Aucun véhicule trouvé selon ces filtres.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
