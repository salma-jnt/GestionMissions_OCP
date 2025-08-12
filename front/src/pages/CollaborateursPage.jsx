import React, { useState } from 'react';
import CollaborateurList from '../components/CollaborateurList';
import CollaborateurFormModal from '../components/CollaborateurFormModal';

function CollaborateursPage() {
    const [selectedCollaborateur, setSelectedCollaborateur] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false); // 👈 Ajouter cet état

    const handleEdit = (collaborateur) => {
        setSelectedCollaborateur(collaborateur);
        setShowModal(true); // 👈 Ouvrir le modal en mode édition
    };

    const handleSaved = () => {
        setSelectedCollaborateur(null);
        setShowModal(false);
        setRefresh(!refresh);
    };

    return (
        <div className="space-y-8 px-4 mt-6 max-w-7xl mx-auto">
            {/* Header avec bouton */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-emerald-800">Gestion des Collaborateurs</h2>
                    <p className="text-gray-600 text-sm">
                        Ajoutez, modifiez et gérez tous vos collaborateurs
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow"
                >
                    + Nouveau Collaborateur
                </button>
            </div>

            {/* Liste des collaborateurs */}
            <div className="bg-white p-6 rounded-lg shadow">
                <CollaborateurList refresh={refresh} onEdit={handleEdit} />
            </div>

            {/* Modale */}
            <CollaborateurFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSaved={handleSaved}
                selected={selectedCollaborateur}
            />
        </div>
    );
}

export default CollaborateursPage;
