import React, {useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';



const MapModal = ({isVisible, onNavigate, onClose}) => {
    const [currentLocationInput, setCurrentLocationInput] = useState("");
    const [travelMode, setTravelMode] = useState("WALKING");

    const handleSearchInputChange = (address) => {
        setCurrentLocationInput(address);
    };

    const handleTravelModeChange = (event) => {
        setTravelMode(event.target.value);
    };

    const handleNavigateClick = () => {
        onNavigate(currentLocationInput, travelMode);
    };

    const handleCloseClick = () => {
        onClose(); // Call the onClose function passed as a prop
    };

    if (!isVisible) return null;

    return (
        <div className="modal-in-map">
            <div>
                <PlacesAutocomplete
                    value={currentLocationInput}
                    onChange={handleSearchInputChange}
                >
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <input
                                {...getInputProps({placeholder: 'Enter start location'})}
                                className="location-input"
                            />
                            <div className="autocomplete-dropdown">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <div {...getSuggestionItemProps(suggestion, {className})}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>

            <div>
                <select
                    id="travelMode"
                    value={travelMode}
                    onChange={handleTravelModeChange}
                    className="location-input"
                >
                    <option value="WALKING">Walking</option>
                    <option value="DRIVING">Driving</option>
                    <option value="BICYCLING">Cycling</option>
                </select>
            </div>
            <div>
                <button onClick={handleNavigateClick} className="navigate-button">
                    Navigate
                </button>
            </div>
            <div>
            <button onClick={handleCloseClick} className="navigate-button">
                Close
            </button>
            </div>
        </div>
    );
};


export default MapModal;
