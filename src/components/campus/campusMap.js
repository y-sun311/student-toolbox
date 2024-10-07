import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./styles/campusMap.css";
import { useSession } from "next-auth/react";


function withSessionHandling(WrappedComponent) {
    return function SessionHandler(props) {
        const session = useSession();
        return <WrappedComponent {...props} session={session} />;
    };
}

/**
 * CampusMap class component
 */
class CampusMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapInstance: null,
            selectedLocation: null,
            markerInstance: null,
            directionsRenderer: null,
            username: null,
        };
    }

    componentDidMount() {
        const { session } = this.props;

        // Get username from session
        const username = session?.data?.user?.name;
        if (username) {
            this.setState({ username });
        }

        // Load the Google Maps API and initialize the map
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFJwn49QS6TD-tv-EgR1HN9uP1eANTE9E&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        window.initMap = this.initMap.bind(this);
    }

    // Initialize Google Map
    initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: { lat: -36.8485, lng: 174.7633 },
        });

        this.setState({ mapInstance: map });
    }

    // Handle location selection: zoom in and place marker
    handleLocationSelect = (coords) => {
        const { mapInstance, markerInstance } = this.state;

        if (markerInstance) {
            markerInstance.setMap(null);
        }

        const marker = new google.maps.Marker({
            position: coords,
            map: mapInstance,
            title: "Selected Location",
        });

        mapInstance.setCenter(coords);
        mapInstance.setZoom(17);

        this.setState({ selectedLocation: coords, markerInstance: marker });
    };

    // Handle getting directions
    handleGetDirections = () => {
        const { selectedLocation, mapInstance } = this.state;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(mapInstance); // Set the renderer on the map

                const request = {
                    origin: currentLocation,
                    destination: selectedLocation,
                    travelMode: "WALKING",
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                        this.setState({ directionsRenderer });
                    } else {
                        alert("Directions failed" + status);
                    }
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    render() {
        const { selectedLocation } = this.state;

        return (
            <div className="campus-map-container">
                <Sidebar setFocusLocation={this.handleLocationSelect} />
                <div id="map" className="map"></div>
                {selectedLocation && (
                    <button onClick={this.handleGetDirections} className="directions-button">
                        Get Directions
                    </button>
                )}
            </div>
        );
    }
}


export default withSessionHandling(CampusMap);
