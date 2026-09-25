import React, { useEffect, useState } from 'react';
import { getCollaborateurs, deleteCollaborateur } from '../services/collaborateurService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function CollaborateurList({ onEdit, refresh }) {
    const [collaborateurs, setCollaborateurs] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getCollaborateurs();
            setCollaborateurs(res.data);
        } catch {
            toast.error("Erreur lors du chargement des collaborateurs");
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (confirm("Supprimer ce collaborateur ?")) {
            try {
                await deleteCollaborateur(id);
                toast.success("🗑️ Collaborateur supprimé");
                fetchData();
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
                        <th className="px-4 py-3 text-left">Nom</th>
                        <th className="px-4 py-3 text-left">Prénom</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Département</th>
                        <th className="px-4 py-3 text-left">Service</th>
                        <th className="px-4 py-3 text-left">Poste</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {collaborateurs.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{c.nom}</td>
                            <td className="px-4 py-2">{c.prenom}</td>
                            <td className="px-4 py-2">{c.email}</td>
                            <td className="px-4 py-2">{c.departement}</td>
                            <td className="px-4 py-2">{c.service}</td>
                            <td className="px-4 py-2">{c.poste}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => onEdit(c)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Modifier"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Supprimer"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CollaborateurList;
