import React, { useState } from 'react';
import VehiculeForm from '../components/VehiculeForm';
import VehiculeList from '../components/VehiculeList';

function VehiculesPage() {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const onSaved = () => {
        setSelected(null);
        setRefresh(!refresh);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Gestion des véhicules</h2>
            <VehiculeForm selected={selected} onSaved={onSaved} />
            <VehiculeList onEdit={setSelected} refresh={refresh} />
        </div>
    );
}

export default VehiculesPage;
