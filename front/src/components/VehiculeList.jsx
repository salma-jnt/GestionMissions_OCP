import React, { useEffect, useState } from 'react';
import { getVehicules, deleteVehicule } from '../services/vehiculeService';
import { toast } from 'react-toastify';

export default function VehiculeList({ onEdit, refresh }) {
    const [vehicules, setVehicules] = useState([]);

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

    return (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
                <thead className="bg-emerald-100 text-emerald-900">
                    <tr>
                        <th className="px-4 py-3 text-left">Matricule</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Marque</th>
                        <th className="px-4 py-3 text-left">Actif</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicules.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{v.matricule}</td>
                            <td className="px-4 py-2">{v.type}</td>
                            <td className="px-4 py-2">{v.marque || '-'}</td>
                            <td className="px-4 py-2">{v.actif ? "Oui" : "Non"}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => onEdit(v)}
                                    className="text-yellow-600 hover:text-yellow-800 font-semibold"
                                    title="Modifier"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                    title="Supprimer"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
