import React, { useState } from 'react';

import CollaborateurForm from './components/CollaborateurForm';
import CollaborateurList from './components/CollaborateurList';

import MissionForm from './components/MissionForm';
import MissionList from './components/MissionList';

function App() {
    // Collaborateurs
    const [selectedCollaborateur, setSelectedCollaborateur] = useState(null);
    const [refreshCollaborateurs, setRefreshCollaborateurs] = useState(false);

    const onCollaborateurSaved = () => {
        setSelectedCollaborateur(null);
        setRefreshCollaborateurs(!refreshCollaborateurs);
    };

    // Missions
    const [selectedMission, setSelectedMission] = useState(null);
    const [refreshMissions, setRefreshMissions] = useState(false);

    const onMissionSaved = () => {
        setSelectedMission(null);
        setRefreshMissions(!refreshMissions);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Gestion des collaborateurs</h2>
            <CollaborateurForm selected={selectedCollaborateur} onSaved={onCollaborateurSaved} />
            <CollaborateurList onEdit={setSelectedCollaborateur} refresh={refreshCollaborateurs} />

            <hr className="my-5" />

            <h2 className="mt-4">Gestion des missions</h2>
            <MissionForm selected={selectedMission} onSaved={onMissionSaved} />
            <MissionList onEdit={setSelectedMission} refresh={refreshMissions} />
        </div>
    );
}

export default App;
