import React, { useEffect, useState } from 'react';
import { getMissions, deleteMission } from '../services/missionService';

function MissionList({ onEdit, refresh }) {
    const [missions, setMissions] = useState([]);

    const fetchData = async () => {
        const res = await getMissions();
        setMissions(res.data);
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (confirm("Supprimer cette mission ?")) {
            await deleteMission(id);
            fetchData();
        }
    };

    return (
        <div className="container mt-4">
            <h3>Liste des missions</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Titre</th><th>Lieu</th><th>Date Début</th><th>Statut</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {missions.map(m => (
                        <tr key={m.id}>
                            <td>{m.titre}</td>
                            <td>{m.lieu}</td>
                            <td>{m.dateDebut}</td>
                            <td>{m.statut}</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(m)}>Éditer</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MissionList;
