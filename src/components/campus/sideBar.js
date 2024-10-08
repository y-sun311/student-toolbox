import { useState } from "react";
import { placesData } from "./placeData";

export default function Sidebar({ setFocusLocation }) {
    const [category, setCategory] = useState(null); // Track which category is selected

    const filteredData = category
        ? placesData.filter(place => place.type === category)
        : [];

    return (
        <div className="sidebar">
            <h2>UoA Campus Map</h2>
            {!category && (
                <ul className="sidebar-list">
                    <li className="category-item" onClick={() => setCategory("Building")}>Buildings</li>
                    <li className="category-item" onClick={() => setCategory("Accommodation")}>Accommodation</li>
                </ul>
            )}
            {category && (
                <>
                    <button onClick={() => setCategory(null)}>Back to Categories</button>
                    <ul className="sidebar-list">
                        {filteredData.map((place, index) => (
                            <li
                                key={index}
                                className="sidebar-item"
                                onClick={() => setFocusLocation(place.coords)} // Center map on the selected place
                            >
                                {place.label}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}