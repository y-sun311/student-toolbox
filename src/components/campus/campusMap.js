import React, { Component } from "react";
import Sidebar from "./Sidebar";
import MapModal from "./MapModal";
import "./styles/campusMap.css";
import { useSession } from "next-auth/react";

function withSessionHandling(WrappedComponent) {
    return function SessionHandler(props) {
        const session = useSession();
        return <WrappedComponent {...props} session={session} />;
    };
}

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
            isModalVisible: false,
            currentLocationInput: "",
            travelMode: "WALKING",
        };
    }

    componentDidMount() {
        const { session } = this.props;
        const username = session?.data?.user?.name;
        if (username) {
            this.setState({ username });
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        window.initMap = this.initMap.bind(this);
    }

    initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 17,
            center: { lat: -36.8519173, lng: 174.7703293 },
        });
        this.setState({ mapInstance: map });
    }

    handleLocationSelect = (coords) => {
        const { mapInstance, markerInstance, directionsRenderer } = this.state;
        if (markerInstance) markerInstance.setMap(null);
        if (directionsRenderer) directionsRenderer.setMap(null);

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
            isModalVisible: true,
        });
    };

    handleRouteNavigation = (currentLocationInput, travelMode) => {
        const { mapInstance, selectedLocation } = this.state;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: currentLocationInput }, (results, status) => {
            if (status === "OK") {
                const currentLocation = results[0].geometry.location;
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(mapInstance);

                const request = {
                    origin: currentLocation,
                    destination: selectedLocation,
                    travelMode,
                };

                directionsService.route(request, (result, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(result);
                        this.setState({
                            directionsRenderer,
                            isDirectionsVisible: true,
                            isModalVisible: false, // Hide the modal
                        });
                    } else {
                        alert("Directions request failed: " + status);
                    }
                });
            } else {
                alert("Could not find the location. Please try again.");
            }
        });
    };

    // Implement the handleCloseModal function
    handleCloseModal = () => {
        this.setState({ isModalVisible: false });
    };

    render() {
        const { selectedLocation, isModalVisible } = this.state;
        return (
            <div className="campus-map-container">
                <Sidebar setFocusLocation={this.handleLocationSelect} />
                <div id="map" className="map">
                    {selectedLocation && isModalVisible && (
                        <MapModal
                            isVisible={isModalVisible}
                            onNavigate={this.handleRouteNavigation}
                            onClose={this.handleCloseModal} // Pass the handleCloseModal function
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default withSessionHandling(CampusMap);








