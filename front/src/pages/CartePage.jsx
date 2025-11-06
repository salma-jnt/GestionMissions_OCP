import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getMissions } from '../services/missionService';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function CartePage() {
const [missions, setMissions] = useState([]);
const role = localStorage.getItem('role');
const email = localStorage.getItem('email');

useEffect(() => {
    getMissions().then(res => setMissions(res.data));
}, []);

const missionsAffichees =
    role === 'COLLABORATEUR'
    ? missions.filter(m => m.collaborateur?.email === email)
    : missions;

return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-2">
        {role === 'RESPONSABLE' ? 'Carte Interactive Globale' : 'Ma Carte de Mission'}
    </h2>
    <p className="text-gray-600 mb-6">
        {role === 'RESPONSABLE'
        ? 'Suivi en temps réel de toutes les missions et véhicules'
        : 'Suivez vos missions en temps réel'}
    </p>

    <div className="grid grid-cols-12 gap-6">
        {/* Missions Actives */}
        <div className="col-span-3 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Missions Actives</h3>
        {missionsAffichees.filter(m => m.statut === "En cours").map(m => (
            <div key={m.id} className="mb-4">
            <p className="text-sm font-semibold text-blue-600">{m.titre}</p>
            <p className="text-gray-600 text-sm">{m.collaborateur?.nom}</p>
            <p className="text-gray-500 text-sm">{m.vehicule?.marque}</p>
            </div>
        ))}
        </div>

        {/* Carte */}
        <div className="col-span-9 bg-white p-4 rounded shadow relative">
        <h3 className="text-lg font-semibold mb-4">Localisation en Temps Réel</h3>

        <div className="bg-green-50 border border-green-400 text-green-700 p-2 rounded w-fit mb-4">
            <span className="font-semibold">🟢 Position actuelle</span><br />
            <span className="text-sm text-gray-700">OCP Safi - Site Principal</span>
        </div>

        <div className="relative h-[400px] rounded overflow-hidden shadow">
            <MapContainer center={[32.2320, -9.2565]} zoom={13.5} className="h-full w-full z-0">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {missionsAffichees
                .filter(m => m.latitude && m.longitude)
                .map(m => (
                <Marker key={m.id} position={[m.latitude, m.longitude]}>
                    <Popup>
                    <strong>{m.titre}</strong><br />
                    {m.lieu}<br />
                    Du {m.dateDebut} au {m.dateFin}
                    </Popup>
                </Marker>
                ))}
            </MapContainer>

            <div className="absolute bottom-4 right-4 bg-white p-3 rounded shadow-lg z-10 w-[220px]">
            <div className="flex items-center gap-2 text-blue-500 font-medium mb-1">✈️ Destination</div>
            <p className="text-sm text-gray-700">Maroc Chimie - Safi</p>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default CartePage;
