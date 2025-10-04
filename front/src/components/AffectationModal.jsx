import React, { useEffect, useState } from 'react';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { affecterMission } from '../services/missionService';
import { toast } from 'react-toastify';

export default function AffectationModal({ isOpen, mission, onClose, onSaved }) {
    const [collaborateurId, setCollaborateurId] = useState('');
    const [vehiculeId, setVehiculeId] = useState('');
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [vehicules, setVehicules] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            getCollaborateurs().then(res => setCollaborateurs(res.data));
            getVehicules().then(res => setVehicules(res.data));
            setCollaborateurId(mission?.collaborateur?.id || '');
            setVehiculeId(mission?.vehicule?.id || '');
        }
    }, [isOpen, mission]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mission?.id) return;

        try {
            setSubmitting(true);
            const payload = {
                collaborateurId: collaborateurId ? Number(collaborateurId) : null,
                vehiculeId: vehiculeId ? Number(vehiculeId) : null,
            };

            const res = await affecterMission(mission.id, payload);

            toast.success('✅ Affectation enregistrée');
            // Renvoie la mission mise à jour au parent (si le parent fait une MAJ locale)
            onSaved && onSaved(res.data);
            onClose && onClose();
        } catch (err) {
            console.error(err);
            toast.error("❌ Erreur lors de l’affectation");
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen || !mission) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative">
                {/* Bouton Fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
                    disabled={submitting}
                >
                    &times;
                </button>

                {/* Titre */}
                <h2 className="text-2xl font-bold text-emerald-700 mb-6 border-b pb-2">
                    Affectation : {mission.titre}
                </h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Collaborateur */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">👤 Collaborateur</label>
                        <select
                            value={collaborateurId}
                            onChange={(e) => setCollaborateurId(e.target.value)}
                            required
                            className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="">Sélectionner un collaborateur</option>
                            {collaborateurs.map(c => (
                                <option key={c.id} value={c.id}>{c.nom} {c.prenom}</option>
                            ))}
                        </select>
                    </div>

                    {/* Véhicule */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🚗 Véhicule</label>
                        <select
                            value={vehiculeId}
                            onChange={(e) => setVehiculeId(e.target.value)}
                            required
                            className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="">Sélectionner un véhicule</option>
                            {vehicules.map(v => (
                                <option key={v.id} value={v.id}>{v.matricule} ({v.type})</option>
                            ))}
                        </select>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                            disabled={submitting}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-60"
                            disabled={submitting}
                        >
                            {submitting ? 'Enregistrement…' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
