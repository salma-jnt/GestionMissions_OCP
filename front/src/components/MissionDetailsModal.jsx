import React from "react";
import { saveAs } from "file-saver";
import axios from "../api/axiosConfig";

export default function MissionDetailsModal({ mission, onClose }) {
    if (!mission) return null;

    const handleDownloadPdf = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/rapports/mission/${mission.id}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const filename = `rapport_mission_${mission.id}.pdf`;
            saveAs(response.data, filename);
        } catch (error) {
            console.error("Erreur PDF :", error);
            alert("Erreur lors du téléchargement du rapport.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in">
                {/* Bouton Fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>

                {/* Titre */}
                <h2 className="text-2xl font-bold text-emerald-700 mb-6 border-b pb-2">
                    🗂️ Détails de la mission
                </h2>

                <div className="space-y-4 text-sm text-gray-800 max-h-[65vh] overflow-y-auto pr-1">
                    <div>
                        <strong>Titre :</strong> {mission.titre}
                    </div>
                    <div>
                        <strong>Description :</strong> {mission.description}
                    </div>
                    <div>
                        <strong>Lieu :</strong> {mission.lieu}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <strong>Latitude :</strong> {mission.latitude || "-"}
                        </div>
                        <div>
                            <strong>Longitude :</strong> {mission.longitude || "-"}
                        </div>
                    </div>
                    <div>
                        <strong>Dates :</strong> {mission.dateDebut} → {mission.dateFin}
                    </div>
                    <div>
                        <strong>Statut :</strong>{" "}
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-emerald-700 font-semibold">
                            {mission.statut}
                        </span>
                    </div>

                    {/* Collaborateur */}
                    {mission.collaborateur && (
                        <div className="border-t pt-4">
                            <h3 className="text-emerald-600 font-semibold mb-1">👤 Collaborateur</h3>
                            <p>Nom : {mission.collaborateur.nom} {mission.collaborateur.prenom}</p>
                            <p>Email : {mission.collaborateur.email || "-"}</p>
                        </div>
                    )}

                    {/* Véhicule */}
                    {mission.vehicule && (
                        <div className="border-t pt-4">
                            <h3 className="text-emerald-600 font-semibold mb-1">🚗 Véhicule</h3>
                            <p>Matricule : {mission.vehicule.matricule}</p>
                            <p>Type : {mission.vehicule.type}</p>
                            <p>Marque : {mission.vehicule.marque || "-"}</p>
                        </div>
                    )}
                </div>

                {/* Bouton PDF */}
                {mission.statut === "Terminée" && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownloadPdf}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md font-medium transition"
                        >
                            📄 Télécharger le rapport PDF
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
