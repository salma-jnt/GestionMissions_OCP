import React, { useState } from 'react';
import MissionList from '../components/MissionList';
import MissionFormModal from '../components/MissionFormModal';
// import MissionStats from '../components/MissionStats'; // à ajouter plus tard
// import MissionFilter from '../components/MissionFilter'; // à ajouter plus tard

export default function MissionsPage() {
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);


    const handleSaved = () => {
        setShowModal(false);
        setRefresh(!refresh); // pour relancer fetch missions
    };

    const handleEdit = (mission) => {
        setSelectedMission(mission);
        setShowModal(true);
    };


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-emerald-800">Gestion des Missions</h2>
                    <p className="text-gray-600 text-sm">Créez, assignez et suivez toutes les missions</p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow"
                >
                    + Nouvelle Mission
                </button>
            </div>

            {/* Statistiques */}
            {/* <MissionStats /> */}

            {/* Filtres */}
            {/* <MissionFilter /> */}

            {/* Liste des missions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <MissionList refresh={refresh} onEdit={handleEdit} />
            </div>

            {/* Modale de création */}
            <MissionFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSaved={handleSaved}
                selected={selectedMission}
            />

        </div>
    );
}
