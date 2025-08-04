import React, { useState, useEffect } from 'react';
import {
    createCollaborateur,
    updateCollaborateur
} from '../services/collaborateurService';

function CollaborateurForm({ selected, onSaved }) {
    const [form, setForm] = useState({ nom: '', prenom: '', email: '', role: '' });

    useEffect(() => {
        if (selected) setForm(selected);
    }, [selected]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            await updateCollaborateur(form.id, form);
        } else {
            await createCollaborateur(form);
        }
        setForm({ nom: '', prenom: '', email: '', role: '' });
        onSaved();
    };

    return (
        <div className="container mt-4">
            <h3>{form.id ? "Modifier" : "Ajouter"} un collaborateur</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col"><input name="nom" className="form-control" placeholder="Nom" value={form.nom} onChange={handleChange} /></div>
                    <div className="col"><input name="prenom" className="form-control" placeholder="Prénom" value={form.prenom} onChange={handleChange} /></div>
                </div>
                <div className="bg-red-500 text-white p-4 rounded">
                    ✅ Si tu vois ce bloc rouge, Tailwind fonctionne !
                </div>
                <div className="row mb-2">
                    <div className="col"><input name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} /></div>
                    <div className="col"><input name="role" className="form-control" placeholder="Rôle" value={form.role} onChange={handleChange} /></div>
                </div>
                <button type="submit" className="btn btn-primary">{form.id ? "Mettre à jour" : "Ajouter"}</button>
            </form>
        </div>
    );
}

export default CollaborateurForm;
