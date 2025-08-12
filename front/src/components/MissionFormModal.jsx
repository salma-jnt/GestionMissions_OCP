import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createMission, updateMission } from '../services/missionService';

export default function MissionFormModal({ isOpen, onClose, onSaved, selected }) {
    const [form, setForm] = useState({
        titre: '',
        description: '',
        lieu: '',
        latitude: '',
        longitude: '',
        statut: 'À venir',
        dateDebut: '',
        dateFin: ''
    });

    // Geocodage automatique
    useEffect(() => {
        const delay = setTimeout(() => {
            if (form.lieu) {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.lieu)}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            const { lat, lon } = data[0];
                            setForm(prev => ({
                                ...prev,
                                latitude: parseFloat(lat),
                                longitude: parseFloat(lon)
                            }));
                        } else {
                            toast.warn("❗ Lieu non trouvé");
                            setForm(prev => ({ ...prev, latitude: '', longitude: '' }));
                        }
                    })
                    .catch(() => toast.error("Erreur lors du géocodage du lieu"));
            }
        }, 1000);

        return () => clearTimeout(delay);
    }, [form.lieu]);

    // Initialiser le formulaire
    useEffect(() => {
        if (!isOpen) return;

        if (selected) {
            setForm({
                id: selected.id,
                titre: selected.titre || '',
                description: selected.description || '',
                dateDebut: selected.dateDebut || '',
                dateFin: selected.dateFin || '',
                lieu: selected.lieu || '',
                statut: selected.statut || 'À venir',
                latitude: selected.latitude || '',
                longitude: selected.longitude || ''
            });
        } else {
            setForm({
                titre: '',
                description: '',
                lieu: '',
                latitude: '',
                longitude: '',
                statut: 'À venir',
                dateDebut: '',
                dateFin: ''
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
                await updateMission(form.id, form);
                toast.success('✏️ Mission mise à jour');
            } else {
                await createMission(form);
                toast.success('✅ Mission créée');
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
                    {selected ? 'Modifier la mission' : 'Créer une mission'}
                </h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

                    <input
                        name="titre"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Titre"
                        value={form.titre}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="date"
                            name="dateDebut"
                            className="w-full border rounded px-3 py-2"
                            value={form.dateDebut}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="dateFin"
                            className="w-full border rounded px-3 py-2"
                            value={form.dateFin}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        name="lieu"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Lieu (ex: OCP Safi)"
                        value={form.lieu}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>Latitude: {form.latitude || '---'}</div>
                        <div>Longitude: {form.longitude || '---'}</div>
                    </div>

                    <select
                        name="statut"
                        className="w-full border rounded px-3 py-2"
                        value={form.statut}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner un statut</option>
                        <option value="À venir">À venir</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminée">Terminée</option>
                    </select>

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
                            {selected ? 'Mettre à jour' : 'Créer mission'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
