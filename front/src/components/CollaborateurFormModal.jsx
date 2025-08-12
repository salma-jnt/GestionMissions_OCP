import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createCollaborateur, updateCollaborateur } from '../services/collaborateurService';

export default function CollaborateurFormModal({ isOpen, onClose, onSaved, selected }) {
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        role: 'COLLABORATEUR'
    });

    useEffect(() => {
        if (!isOpen) return;

        if (selected) {
            setForm({
                id: selected.id,
                nom: selected.nom || '',
                prenom: selected.prenom || '',
                email: selected.email || '',
                role: selected.role || 'COLLABORATEUR'
            });
        } else {
            setForm({
                nom: '',
                prenom: '',
                email: '',
                role: 'COLLABORATEUR'
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
                await updateCollaborateur(form.id, form);
                toast.success('✏️ Collaborateur mis à jour');
            } else {
                await createCollaborateur(form);
                toast.success('✅ Collaborateur créé');
            }
            onSaved();
        } catch {
            toast.error('❌ Erreur lors de la sauvegarde');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in">
                {/* Fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>

                {/* Titre */}
                <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2">
                    {selected ? 'Modifier le collaborateur' : 'Créer un collaborateur'}
                </h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="nom"
                            placeholder="Nom"
                            value={form.nom}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        <input
                            name="prenom"
                            placeholder="Prénom"
                            value={form.prenom}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                    <input
                        name="role"
                        placeholder="Role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                    {/* Boutons */}
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
                            {selected ? 'Mettre à jour' : 'Créer collaborateur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
