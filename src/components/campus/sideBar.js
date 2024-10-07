import { placesData } from "./placeData"; // Import the places data

export default function Sidebar({ setFocusLocation }) {


    const filteredData = placesData.filter(
        (place) => place.type === "Building" || place.type === "Accommodation"
    );

    return (
        <div className="sidebar">
            <h2>Campus Map</h2>
            <ul className="sidebar-list">
                {filteredData.map((place, index) => (
                    <li key={index} className="sidebar-item" onClick={() => setFocusLocation(place.coords)}>
                        <img src={`/icons/${place.type.toLowerCase()}.png`} alt={place.label} className="icon" />
                        {place.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
