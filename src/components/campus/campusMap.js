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
            isDirectionsVisible: false,
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

        // Initialize the map
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        window.initMap = this.initMap.bind(this);
    }

    // Initialize the Google Map
    initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: { lat: -36.8485, lng: 174.7633 }, // Default map center
        });

        this.setState({ mapInstance: map });
    }

    // Handle location selection: zoom in and place marker
    handleLocationSelect = (coords) => {
        const { mapInstance, markerInstance } = this.state;

        // Remove the previous marker if it exists
        if (markerInstance) {
            markerInstance.setMap(null);
        }

        // Create a new marker
        const marker = new google.maps.Marker({
            position: coords,
            map: mapInstance,
            title: "Selected Location",
        });

        mapInstance.setCenter(coords);
        mapInstance.setZoom(17);

        this.setState({
            selectedLocation: coords,
            markerInstance: marker,
            isDirectionsVisible: false, // Reset to hide directions
        });
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
                    travelMode: "WALKING", // or DRIVING, BICYCLING, etc.
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                        this.setState({ directionsRenderer, isDirectionsVisible: true });
                    } else {
                        alert("Directions request failed due to " + status);
                    }
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Handle going back from directions
    handleGoBack = () => {
        const { directionsRenderer, mapInstance } = this.state;

        // Remove directions from the map
        if (directionsRenderer) {
            directionsRenderer.setMap(null); // Clear the directions
        }

        // Clear the directions renderer from state
        this.setState({
            directionsRenderer: null,
            isDirectionsVisible: false, // Hide the Back button and return to Get Directions state
        });

        // Optional: Reset zoom or any other map settings
        mapInstance.setZoom(15);
    };

    render() {
        const { selectedLocation, isDirectionsVisible } = this.state;

        return (
            <div className="campus-map-container">
                <Sidebar setFocusLocation={this.handleLocationSelect} />
                <div id="map" className="map"></div>
                {selectedLocation && !isDirectionsVisible && (
                    <button onClick={this.handleGetDirections} className="directions-button">
                        Get Directions
                    </button>
                )}
                {isDirectionsVisible && (
                    <button onClick={this.handleGoBack} className="back-button">
                        Back
                    </button>
                )}
            </div>
        );
    }
}

export default withSessionHandling(CampusMap);


