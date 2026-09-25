import React, { useState } from 'react';
import VehiculeList from '../components/VehiculeList';
import VehiculeFormModal from '../components/VehiculeFormModal'; // modal à créer ou adapter depuis VehiculeForm

export default function VehiculesPage() {
    const [selectedVehicule, setSelectedVehicule] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (vehicule) => {
        setSelectedVehicule(vehicule);
        setShowModal(true);
    };

    const handleAdd = () => {
        setSelectedVehicule(null);
        setShowModal(true);
    };

    const handleSaved = () => {
        setSelectedVehicule(null);
        setShowModal(false);
        setRefresh(!refresh);
    };

    return (
        <div className="space-y-8 px-4 mt-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-emerald-800">Gestion des Véhicules</h2>
                    <p className="text-gray-600 text-sm">Ajoutez, modifiez et gérez vos véhicules</p>
                </div>

                <button
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow"
                >
                    + Nouveau Véhicule
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <VehiculeList refresh={refresh} onEdit={handleEdit} />
            </div>

            <VehiculeFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSaved={handleSaved}
                selected={selectedVehicule}
            />
        </div>
    );
}
