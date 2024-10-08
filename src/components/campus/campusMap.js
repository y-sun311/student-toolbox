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
            isDirectionsVisible: false, // State to toggle directions view
            username: null,
        };
    }

    componentDidMount() {
        const { session } = this.props;

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
            zoom: 17,
            center: { lat: -36.8519173, lng: 174.7703293 }
        });

        this.setState({ mapInstance: map });
    }

    handleLocationSelect = (coords) => {
        const { mapInstance, markerInstance, directionsRenderer } = this.state;

        if (markerInstance) {
            markerInstance.setMap(null);
        }


        if (directionsRenderer) {
            directionsRenderer.setMap(null);
        }

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
            directionsRenderer: null,
            isDirectionsVisible: false,
        });
    };

    // Handle getting directions
    handleGetDirections = () => {
        const { selectedLocation, mapInstance } = this.state;

        const userConsent = window.confirm("We need your location to provide directions. Do you allow this?");


        if (userConsent) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(mapInstance);

                const request = {
                    origin: currentLocation,
                    destination: selectedLocation,
                    travelMode: "WALKING",
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

    handleGoBack = () => {
        const { directionsRenderer, mapInstance, markerInstance } = this.state;

        if (directionsRenderer) {
            directionsRenderer.setMap(null); // Clear the directions
        }

        if (markerInstance) {
            markerInstance.setMap(null);
        }

        // Reset state
        this.setState({
            directionsRenderer: null,
            markerInstance: null,
            isDirectionsVisible: false,
            selectedLocation: null,
        });

        mapInstance.setZoom(15);
    };

    render() {
        const { selectedLocation, isDirectionsVisible } = this.state;

        return (
            <div className="campus-map-container">
                <Sidebar setFocusLocation={this.handleLocationSelect}/>
                <div id="map" className="map">
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
            </div>
        );
    }
}

export default withSessionHandling(CampusMap);



