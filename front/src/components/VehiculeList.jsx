import React, { useEffect, useState } from 'react';
import { getVehicules, deleteVehicule } from '../services/vehiculeService';
import { toast } from 'react-toastify';

function VehiculeList({ onEdit, refresh }) {
    const [vehicules, setVehicules] = useState([]);

    useEffect(() => {
        getVehicules().then(res => setVehicules(res.data));
    }, [refresh]);

    const handleDelete = async (id) => {
        if (confirm("Supprimer ce véhicule ?")) {
            try {
                await deleteVehicule(id);
                toast.info("Véhicule supprimé");
                setVehicules(v => v.filter(x => x.id !== id));
            } catch {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h3>Liste des véhicules</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Type</th>
                        <th>Marque</th>
                        <th>Actif</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicules.map(v => (
                        <tr key={v.id}>
                            <td>{v.matricule}</td>
                            <td>{v.type}</td>
                            <td>{v.marque}</td>
                            <td>{v.actif ? "Oui" : "Non"}</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(v)}>Modifier</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VehiculeList;
