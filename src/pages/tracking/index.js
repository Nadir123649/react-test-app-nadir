import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import mockStations from '../../utils/mockStations';

const Tracking = () => {

  const { id } = useParams();
  const station = mockStations.find((s) => s.id === id);
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setUserPos([coords.latitude, coords.longitude]);
      },
      (err) => console.log(err)
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!userPos || !station) return <p>Loading...</p>;

  return (
    <MapContainer center={userPos} zoom={13} style={{ height: "90vh" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userPos} />
      <Marker position={[station.lat, station.lng]} />
      <Polyline positions={[userPos, [station.lat, station.lng]]} />
    </MapContainer>
  );
}

export default Tracking;