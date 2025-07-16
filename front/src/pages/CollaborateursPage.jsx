import React, { useState } from 'react';
import CollaborateurForm from '../components/CollaborateurForm';
import CollaborateurList from '../components/CollaborateurList';

function CollaborateursPage() {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const onSaved = () => {
        setSelected(null);
        setRefresh(!refresh);
    };

    return (
        <div className="container mt-4">
            <h2>Gestion des collaborateurs</h2>
            <CollaborateurForm selected={selected} onSaved={onSaved} />
            <CollaborateurList onEdit={setSelected} refresh={refresh} />
        </div>
    );
}

export default CollaborateursPage;
