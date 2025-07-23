import React, { useEffect, useState } from 'react';
import {
    getCollaborateurs,
    deleteCollaborateur
} from '../services/collaborateurService';

function CollaborateurList({ onEdit }) {
    const [collaborateurs, setCollaborateurs] = useState([]);

    const fetchData = async () => {
        const res = await getCollaborateurs();
        setCollaborateurs(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Supprimer ce collaborateur ?")) {
            await deleteCollaborateur(id);
            fetchData();
        }
    };

    return (
        <div className="container mt-4">
            <h3>Liste des collaborateurs</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th><th>Prénom</th><th>Email</th><th>Rôle</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {collaborateurs.map(c => (
                        <tr key={c.id}>
                            <td>{c.nom}</td>
                            <td>{c.prenom}</td>
                            <td>{c.email}</td>
                            <td>{c.role}</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(c)}>Éditer</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CollaborateurList;
