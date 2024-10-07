import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { placesData } from "./placeData"; // Import the places data
import "./styles/campusMap.css";

export default function CampusMap() {
    const [focusLocation, setFocusLocation] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFJwn49QS6TD-tv-EgR1HN9uP1eANTE9E&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        window.initMap = function () {
            const campusLocation = { lat: -36.8485, lng: 174.7633 }; // Default campus location
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: campusLocation,
            });

            placesData.forEach(({ coords, label }) => {
                new google.maps.Marker({
                    position: coords,
                    map,
                    title: label,
                });
            });

            if (focusLocation) {
                map.setCenter(focusLocation);
            }
        };
    }, [focusLocation]);

    return (
        <div className="campus-map-container">
            <Sidebar setFocusLocation={setFocusLocation} />
            <div id="map" className="map"></div>
        </div>
    );
}
