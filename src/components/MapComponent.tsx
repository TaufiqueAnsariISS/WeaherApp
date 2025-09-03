import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

type Props = {
  onLatLngSelect: (lat: number, lng: number) => void;
};

const ClickHandler: React.FC<{
  onLatLngSelect: (lat: number, lng: number) => void;
  setMarkerPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}> = ({ onLatLngSelect, setMarkerPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLatLngSelect(lat, lng);
      setMarkerPosition([lat, lng]);
    },
  });
  return null;
};

const MapComponent: React.FC<Props> = ({ onLatLngSelect }) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  return (
    <MapContainer center={[20, 0]} zoom={3} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler
        onLatLngSelect={onLatLngSelect}
        setMarkerPosition={setMarkerPosition}
      />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Latitude: {markerPosition[0].toFixed(4)}, Longitude: {markerPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
