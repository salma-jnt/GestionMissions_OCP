import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getMissions } from '../services/missionService';
import L from 'leaflet';

// Pour corriger le problème d'icône manquante :
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function CarteMissions() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        getMissions().then(res => setMissions(res.data));
    }, []);

    return (
        <div className="container mt-4">
            <h3>Carte des missions</h3>
            <MapContainer
                center={[32.2320, -9.2565]} // Position initiale (Safi)
                zoom={13.5}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {missions
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
        </div>
    );
}

export default CarteMissions;
