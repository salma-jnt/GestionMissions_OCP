import React, { useEffect, useState } from 'react';
import { createMission, updateMission } from '../services/missionService';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { toast } from 'react-toastify';

function MissionForm({ selected, onSaved }) {
    const empty = {
        titre: '', description: '', lieu: '',
        statut: '', latitude: '', longitude: '',
        dateDebut: '', dateFin: '', collaborateur: null,
        vehicule: null
    };

    const [form, setForm] = useState(empty);
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [vehicules, setVehicules] = useState([]);

    useEffect(() => {
        getCollaborateurs().then(res => setCollaborateurs(res.data));
        getVehicules().then(res => setVehicules(res.data));
        if (selected) setForm(selected);
    }, [selected]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'collaborateur') {
            setForm({ ...form, collaborateur: value ? { id: Number(value) } : null });
        } else if (name === 'vehicule') {
            setForm({ ...form, vehicule: value ? { id: Number(value) } : null });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await updateMission(form.id, form);
                toast.success("✅ Mission mise à jour !");
            } else {
                await createMission(form);
                toast.success("✅ Mission ajoutée !");
            }
            setForm(empty);
            onSaved();
        } catch (err) {
            toast.error("❌ Erreur lors de l'enregistrement");
            console.error("Erreur create/update:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h3>{form.id ? "Modifier" : "Ajouter"} une mission</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col">
                        <input className="form-control" name="titre" placeholder="Titre" value={form.titre} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input className="form-control" name="lieu" placeholder="Lieu" value={form.lieu} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-2">
                    <textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <input className="form-control" name="dateDebut" type="date" value={form.dateDebut} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input className="form-control" name="dateFin" type="date" value={form.dateFin} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <input className="form-control" name="statut" placeholder="Statut" value={form.statut} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input className="form-control" name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input className="form-control" name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <select className="form-select" name="collaborateur" value={form.collaborateur?.id || ''} onChange={handleChange}>
                            <option value="">-- Collaborateur --</option>
                            {collaborateurs.map(c => (
                                <option key={c.id} value={c.id}>{c.nom} {c.prenom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col">
                        <select className="form-select" name="vehicule" value={form.vehicule?.id || ''} onChange={handleChange}>
                            <option value="">-- Véhicule --</option>
                            {vehicules.map(v => (
                                <option key={v.id} value={v.id}>{v.matricule} ({v.type})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    {form.id ? "Mettre à jour" : "Ajouter"}
                </button>
            </form>
        </div>
    );
}

export default MissionForm;
