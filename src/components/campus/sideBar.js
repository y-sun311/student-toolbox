import { useState } from "react";
import { placesData } from "./placeData";
import { FaBars } from "react-icons/fa"; // Hamburger icon for mobile

export default function Sidebar({ setFocusLocation }) {
    const [category, setCategory] = useState(null);

    const filteredData = category
        ? placesData.filter(place => place.type === category)
        : [];

    return (
        <>
            <div className="sidebar">
                <h2>Auckland University</h2>
                <FaBars className="sidebar-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>


                <div className="sidebar-content">
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
                                        onClick={() => setFocusLocation(place.coords)}
                                    >
                                        {place.label}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
        </>
    );
}

