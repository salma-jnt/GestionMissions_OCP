import React, { useEffect, useState } from 'react';
import { createMission, updateMission } from '../services/missionService';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { toast } from 'react-toastify';


function MissionForm({ selected, onSaved }) {
    const [form, setForm] = useState({
        nom: "",
        dateDebut: "",
        dateFin: "",
        description: "",
    });

    useEffect(() => {
        if (selected) {
            setForm(selected);
        } else {
            setForm({ nom: "", dateDebut: "", dateFin: "", description: "" });
        }
    }, [selected]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Appel API ou logique d’enregistrement ici...
        console.log("Mission enregistrée :", form);
        onSaved();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nom de la mission</label>
                <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-600 focus:border-emerald-600"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date de début</label>
                    <input
                        type="date"
                        name="dateDebut"
                        value={form.dateDebut}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-600 focus:border-emerald-600"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date de fin</label>
                    <input
                        type="date"
                        name="dateFin"
                        value={form.dateFin}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-600 focus:border-emerald-600"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-600 focus:border-emerald-600"
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition"
                >
                    {selected ? "Mettre à jour" : "Créer"} la mission
                </button>
            </div>
        </form>
    );
}

export default MissionForm;
