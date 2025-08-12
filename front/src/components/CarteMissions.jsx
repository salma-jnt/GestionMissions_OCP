import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getMissions } from '../services/missionService';
import L from 'leaflet';

// Corrige les erreurs d'icône manquante dans Leaflet
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
        <MapContainer
            center={[32.2320, -9.2565]} // Position initiale centrée sur Safi
            zoom={13.5}
            className="h-full w-full z-0"
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
    );
}

export default CarteMissions;
