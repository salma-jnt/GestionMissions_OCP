import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionById, updateMission } from '../services/missionService';
import { getCollaborateurs } from '../services/collaborateurService';
import { getVehicules } from '../services/vehiculeService';
import { toast } from 'react-toastify';

function AffecterMissionPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mission, setMission] = useState(null);
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [vehicules, setVehicules] = useState([]);
    const [collaborateurId, setCollaborateurId] = useState('');
    const [vehiculeId, setVehiculeId] = useState('');

    useEffect(() => {
        getMissionById(id).then(res => setMission(res.data));
        getCollaborateurs().then(res => setCollaborateurs(res.data));
        getVehicules().then(res => setVehicules(res.data));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!collaborateurId || !vehiculeId) {
            toast.warn("Veuillez sélectionner les deux champs");
            return;
        }

        try {
            await updateMission(id, {
                ...mission,
                collaborateur: { id: collaborateurId },
                vehicule: { id: vehiculeId }
            });
            toast.success("Mission affectée avec succès !");
            navigate('/missions');
        } catch {
            toast.error("Erreur lors de l’affectation !");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Affecter la mission : {mission?.titre}</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label>Collaborateur</label>
                    <select
                        className="form-select"
                        value={collaborateurId}
                        onChange={e => setCollaborateurId(e.target.value)}
                    >
                        <option value="">-- Choisir un collaborateur --</option>
                        {collaborateurs.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nom} {c.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Véhicule</label>
                    <select
                        className="form-select"
                        value={vehiculeId}
                        onChange={e => setVehiculeId(e.target.value)}
                    >
                        <option value="">-- Choisir un véhicule --</option>
                        {vehicules.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.matricule} ({v.type})
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary">Valider l'affectation</button>
            </form>
        </div>
    );
}
export default AffecterMissionPage;

