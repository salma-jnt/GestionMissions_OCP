import React, { useState } from 'react';
import MissionForm from '../components/MissionForm';
import MissionList from '../components/MissionList';

function MissionsPage() {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const onSaved = () => {
        setSelected(null);
        setRefresh(!refresh);
    };

    return (
        <div className="container mt-4">
            <h2>Gestion des missions</h2>
            <MissionForm selected={selected} onSaved={onSaved} />
            <MissionList onEdit={setSelected} refresh={refresh} />
        </div>
    );
}

export default MissionsPage;
