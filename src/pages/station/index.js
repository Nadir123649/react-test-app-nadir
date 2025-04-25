import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import mockStations from "../../utils/mockStations";

const Station = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const station = mockStations.find((s) => s.id === id);
    if (!station) return <p>Station not found</p>;

    return (
        <div>
            <h2>{station.name}</h2>
            <p>{station.address}</p>
            <p>Connectors: {station.connectors.join(", ")}</p>
            <button onClick={() => navigate(`/tracking/${station.id}`)}>Get Directions</button>
        </div>
    );
}
    
export default Station;
