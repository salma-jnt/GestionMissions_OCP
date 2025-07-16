import React, { useEffect, useState } from 'react';
import { createMission, updateMission } from '../services/missionService';

function MissionForm({ selected, onSaved }) {
    const empty = {
        titre: '', description: '', lieu: '',
        statut: '', latitude: '', longitude: '',
        dateDebut: '', dateFin: ''
    };

    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (selected) setForm(selected);
    }, [selected]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) await updateMission(form.id, form);
        else await createMission(form);
        setForm(empty);
        onSaved();
    };

    return (
        <div className="container mt-4">
            <h3>{form.id ? "Modifier" : "Ajouter"} une mission</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col"><input className="form-control" name="titre" placeholder="Titre" value={form.titre} onChange={handleChange} /></div>
                    <div className="col"><input className="form-control" name="lieu" placeholder="Lieu" value={form.lieu} onChange={handleChange} /></div>
                </div>
                <div className="mb-2"><textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea></div>
                <div className="row mb-2">
                    <div className="col"><input className="form-control" name="dateDebut" placeholder="Date début" type="date" value={form.dateDebut} onChange={handleChange} /></div>
                    <div className="col"><input className="form-control" name="dateFin" placeholder="Date fin" type="date" value={form.dateFin} onChange={handleChange} /></div>
                </div>
                <div className="row mb-2">
                    <div className="col"><input className="form-control" name="statut" placeholder="Statut" value={form.statut} onChange={handleChange} /></div>
                    <div className="col"><input className="form-control" name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} /></div>
                    <div className="col"><input className="form-control" name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} /></div>
                </div>
                <button type="submit" className="btn btn-primary">{form.id ? "Mettre à jour" : "Ajouter"}</button>
            </form>
        </div>
    );
}

export default MissionForm;
