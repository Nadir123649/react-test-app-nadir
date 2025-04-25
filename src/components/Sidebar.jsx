import React from 'react';

const Sidebar = ({ stations, onSelect }) => {
    return (
        <div style={{ width: "300px", background: "#eee", padding: "1rem" }}>
            <h3>Nearby Stations</h3>
            {stations.map((s) => (
                <div key={s.id} onClick={() => onSelect(s.id)} style={{ cursor: "pointer", marginBottom: "10px" }}>
                    <strong>{s.name}</strong>
                    <p>{s.address}</p>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
