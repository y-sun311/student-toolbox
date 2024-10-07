import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./styles/campusMap.css";

export default function CampusMap() {
    const [mapInstance, setMapInstance] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markerInstance, setMarkerInstance] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    // Initialize the Google Map
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFJwn49QS6TD-tv-EgR1HN9uP1eANTE9E&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        window.initMap = function () {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: { lat: -36.8485, lng: 174.7633 },
            });
            setMapInstance(map); // Store the map instance
        };
    }, []);


    const handleLocationSelect = (coords) => {
        // Remove the previous marker if it exists
        if (markerInstance) {
            markerInstance.setMap(null);
        }

        const marker = new google.maps.Marker({
            position: coords,
            map: mapInstance,
            title: "Selected Location",
        });

        // Zoom in to the selected location
        mapInstance.setCenter(coords);
        mapInstance.setZoom(17);

        setSelectedLocation(coords);
        setMarkerInstance(marker);
    };

    // Function to get directions
    const handleGetDirections = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(mapInstance); // Set the renderer on the map

                // Create the route request
                const request = {
                    origin: currentLocation,
                    destination: selectedLocation,
                    travelMode: 'WALKING', // or DRIVING, BICYCLING, etc.
                };

                // Request the directions
                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                        setDirectionsRenderer(directionsRenderer); // Store the renderer for future use
                    } else {
                        alert("Directions request failed due to " + status);
                    }
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="campus-map-container">
            <Sidebar setFocusLocation={handleLocationSelect} />
            <div id="map" className="map"></div>
            {selectedLocation && (
                <button onClick={handleGetDirections} className="directions-button">
                    Get Directions
                </button>
            )}
        </div>
    );
}

