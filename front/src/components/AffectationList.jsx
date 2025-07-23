import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { saveAs } from "file-saver";

function AffectationList() {
    const [affectations, setAffectations] = useState([]);
    const [erreurChargement, setErreurChargement] = useState(false);

    const extractId = (rawId) => {
        if (typeof rawId === "string" && rawId.includes(":")) {
            return rawId.split(":")[0]; // ex: "6:1" -> "6"
        } else if (typeof rawId === "object" && rawId !== null && rawId.id) {
            return rawId.id;
        }
        return rawId;
    };

    const handleDownloadPdf = async (missionIdRaw) => {
        const missionId = extractId(missionIdRaw);
        console.log("📥 Téléchargement PDF pour missionId :", missionId);

        try {
            const response = await axios.get(
                `http://localhost:8080/api/rapports/mission/${missionId}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const filename = `rapport_mission_${missionId}.pdf`;
            saveAs(response.data, filename);
        } catch (error) {
            console.error("Erreur PDF :", error);
            alert("Erreur lors du téléchargement du rapport.");
        }
    };

    useEffect(() => {
        axios
            .get("/api/missions")
            .then((res) => {
                console.log("📦 Réponse missions :", res.data);

                if (!Array.isArray(res.data)) {
                    console.error("❌ Format inattendu :", res.data);
                    setErreurChargement(true);
                    return;
                }

                const missionsAffectees = res.data.filter(
                    (m) => m.collaborateur && m.vehicule
                );

                setAffectations(missionsAffectees);
            })
            .catch((err) => {
                console.error("❌ Erreur axios :", err);
                setErreurChargement(true);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Liste des affectations</h2>

            {erreurChargement ? (
                <div className="alert alert-danger">
                    Erreur lors du chargement des missions. Veuillez vérifier la
                    connexion ou les droits d’accès.
                </div>
            ) : affectations.length === 0 ? (
                <p>Aucune affectation trouvée.</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Mission</th>
                            <th>Collaborateur</th>
                            <th>Véhicule</th>
                            <th>Statut</th>
                            <th>Dates</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affectations.map((m, idx) => (
                            <tr key={idx}>
                                <td>{m.titre}</td>
                                <td>{m.collaborateur?.nom} {m.collaborateur?.prenom}</td>
                                <td>{m.vehicule?.matricule} ({m.vehicule?.type})</td>
                                <td>{m.statut}</td>
                                <td>{m.dateDebut} → {m.dateFin}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleDownloadPdf(m.id)}
                                    >
                                        📄 Rapport PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AffectationList;
