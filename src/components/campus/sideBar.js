import { useState } from "react";
import { placesData } from "./placeData";

export default function Sidebar({ setFocusLocation }) {
    const [category, setCategory] = useState(null);

    const filteredData = category
        ? placesData.filter(place => place.type === category)
        : [];

    const handleKeyPress = (event, callback) => {
        if (event.key === "Enter" || event.key === " ") {
            callback();
        }
    };

    return (
        <div className="sidebar">
            <h2>UoA Campus Map</h2>
            {!category && (
                <div className="sidebar-list">
                    <div
                        className="category-item"
                        onClick={() => setCategory("Building")}
                        tabIndex={0}
                        role="button"
                    >
                        Buildings
                    </div>
                    <div
                        className="category-item"
                        onClick={() => setCategory("Accommodation")}
                        tabIndex={0}
                        role="button"
                    >
                        Accommodation
                    </div>
                </div>
            )}
            {category && (
                <>
                    <button onClick={() => setCategory(null)}>Back to Categories</button>
                    <div className="sidebar-list">
                        {filteredData.map((place, index) => (
                            <div
                                key={index}
                                className="sidebar-item"
                                onClick={() => setFocusLocation(place.coords)}
                                tabIndex={0}
                                role="button"
                            >
                                {place.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
