import React, { useEffect, useState } from 'react';
import { getMissions } from '../services/missionService';

function AffectationList() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        getMissions().then(res => setMissions(res.data));
    }, []);

    return (
        <div className="container mt-4">
            <h3>Liste des affectations</h3>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Titre mission</th>
                        <th>Collaborateur</th>
                        <th>Véhicule</th>
                        <th>Statut</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {missions
                        .filter(m => m.collaborateur && m.vehicule)
                        .map(m => (
                            <tr key={m.id}>
                                <td>{m.titre}</td>
                                <td>{m.collaborateur.nom} {m.collaborateur.prenom}</td>
                                <td>{m.vehicule.matricule} ({m.vehicule.type})</td>
                                <td>{m.statut}</td>
                                <td>{m.dateDebut} → {m.dateFin}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default AffectationList;
