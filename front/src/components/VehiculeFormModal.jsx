import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createVehicule, updateVehicule } from '../services/vehiculeService';

export default function VehiculeFormModal({ isOpen, onClose, onSaved, selected }) {
    const [form, setForm] = useState({
        matricule: '',
        type: '',
        capacite: '',
        statut: ''
    });

    useEffect(() => {
        if (!isOpen) return;

        if (selected) {
            setForm({
                id: selected.id,
                matricule: selected.matricule || '',
                type: selected.type || '',
                capacite: selected.capacite || '',
                statut: selected.statut || ''
            });
        } else {
            setForm({
                matricule: '',
                type: '',
                capacite: '',
                statut: ''
            });
        }
    }, [isOpen, selected]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selected) {
                await updateVehicule(form.id, form);
                toast.success('✏️ Véhicule mis à jour');
            } else {
                await createVehicule(form);
                toast.success('✅ Véhicule créé');
            }
            onSaved();
        } catch {
            toast.error('❌ Erreur lors de la sauvegarde');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in">
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>

                {/* Titre */}
                <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2">
                    {selected ? 'Modifier le véhicule' : 'Créer un véhicule'}
                </h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <input
                        name="matricule"
                        placeholder="Matricule"
                        value={form.matricule}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="type"
                        placeholder="Type (ex: Camion, Voiture)"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="capacite"
                        placeholder="Capacité (ex: 2 tonnes)"
                        value={form.capacite}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        name="statut"
                        placeholder="Statut (ex: Disponible, En maintenance)"
                        value={form.statut}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
                        >
                            {selected ? 'Mettre à jour' : 'Créer véhicule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
