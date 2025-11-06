import React, { useState } from 'react';
import MissionList from '../components/MissionList';
import MissionFormModal from '../components/MissionFormModal';

export default function MissionsPage() {
const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [filtre, setFiltre] = useState('Toutes');
  const role = localStorage.getItem('role');

  const handleSaved = () => {
    setShowModal(false);
    setRefresh(!refresh);
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
          <h2 className="text-3xl font-bold text-emerald-800">
            {role === 'RESPONSABLE' ? 'Gestion des Missions' : 'Mes Missions'}
          </h2>
          <p className="text-gray-600 text-sm">
            {role === 'RESPONSABLE'
              ? 'Créez, assignez et suivez toutes les missions'
              : 'Consultez vos missions et leur état'}
          </p>
        </div>

        {/* Bouton visible uniquement pour le responsable */}
        {role === 'RESPONSABLE' && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow"
          >
            + Nouvelle Mission
          </button>
        )}
      </div>

      {/* Sous-onglets pour collaborateur */}
      {role === 'COLLABORATEUR' && (
        <div className="flex gap-4 mb-4">
          {['Toutes', 'À venir', 'En cours', 'Terminée'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filtre === f
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Liste des missions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <MissionList
          refresh={refresh}
          onEdit={handleEdit}
          filtre={role === 'COLLABORATEUR' ? filtre : null}
        />
      </div>

      {/* Modal création/édition */}
      {role === 'RESPONSABLE' && (
        <MissionFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSaved={handleSaved}
          selected={selectedMission}
        />
      )}
    </div>
  );
}
