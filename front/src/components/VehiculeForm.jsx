import React, { useState, useEffect } from 'react';
import { createVehicule, updateVehicule } from '../services/vehiculeService';
import { toast } from 'react-toastify';

function VehiculeForm({ selected, onSaved }) {
    const empty = { matricule: '', type: '', marque: '', actif: true };
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (selected) setForm(selected);
    }, [selected]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await updateVehicule(form.id, form);
                toast.success("Véhicule mis à jour");
            } else {
                await createVehicule(form);
                toast.success("Véhicule ajouté");
            }
            setForm(empty);
            onSaved();
        } catch {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    return (
        <div className="container mt-4">
            <h3>{form.id ? "Modifier" : "Ajouter"} un véhicule</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col"><input className="form-control" name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} /></div>
                    <div className="col"><input className="form-control" name="type" placeholder="Type" value={form.type} onChange={handleChange} /></div>
                </div>
                <div className="row mb-2">
                    <div className="col"><input className="form-control" name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} /></div>
                    <div className="col form-check">
                        <input type="checkbox" className="form-check-input" name="actif" checked={form.actif} onChange={handleChange} />
                        <label className="form-check-label">Actif</label>
                    </div>
                </div>
                <button className="btn btn-primary">{form.id ? "Mettre à jour" : "Ajouter"}</button>
            </form>
        </div>
    );
}

export default VehiculeForm;
