"use client"

import { useEffect } from 'react';

export default function CampusMap() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFJwn49QS6TD-tv-EgR1HN9uP1eANTE9E&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.initMap = function () {
            const campusLocation = { lat: -36.8485, lng: 174.7633 }; // Example coordinates for your campus
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: campusLocation,
            });

            const landmarks = [
                { position: { lat: -36.8485, lng: 174.7633 }, title: "Main Building" },
                { position: { lat: -36.8475, lng: 174.7643 }, title: "Library" },
                { position: { lat: -36.8490, lng: 174.7625 }, title: "Sports Center" },
            ];

            landmarks.forEach(landmark => {
                new google.maps.Marker({
                    position: landmark.position,
                    map: map,
                    title: landmark.title,
                });
            });
        };
    }, []);

    return (
        <div>
            <h1>Campus Map</h1>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}
