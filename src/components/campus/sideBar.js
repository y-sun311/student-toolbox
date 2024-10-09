import { useState } from "react";
import { placesData } from "./placeData";

export default function Sidebar({ setFocusLocation }) {
    const [category, setCategory] = useState(null);

    const filteredData = category
        ? placesData.filter(place => place.type === category)
        : [];

    const handleKeyDown = (event, callback) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
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
                        onKeyDown={(e) => handleKeyDown(e, () => setCategory("Building"))}
                        tabIndex={0}
                        role="button"
                    >
                        Buildings
                    </div>
                    <div
                        className="category-item"
                        onClick={() => setCategory("Accommodation")}
                        onKeyDown={(e) => handleKeyDown(e, () => setCategory("Accommodation"))}
                        tabIndex={0}
                        role="button"
                    >
                        Accommodation
                    </div>
                </div>
            )}
            {category && (
                <>
                    <button onClick={() => setCategory(null)} className="back-button">Back to Categories</button>
                    <div className="sidebar-list">
                        {filteredData.map((place, index) => (
                            <div
                                key={index}
                                className="sidebar-item"
                                onClick={() => setFocusLocation(place.coords)}
                                onKeyDown={(e) => handleKeyDown(e, () => setFocusLocation(place.coords))}
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
