import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import MapView from '../../components/MapView';
import mockStations from '../../utils/mockStations';


const Home = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [stations, setStations] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setUserLocation([coords.latitude, coords.longitude]);
            },
            () => alert("Location permission denied")
        );
    }, []);

    const handleSearch = () => {
        const result = mockStations.filter((station) =>
            station.name.toLowerCase().includes(query.toLowerCase())
        );
        setStations(result);
    };

    return (
        <div className="flex">
            <Sidebar stations={stations} onSelect={(id) => navigate(`/station/${id}`)} />
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search EV Station"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <MapView center={userLocation} markers={stations} />
            </div>
        </div>
    );
}

export default Home;
