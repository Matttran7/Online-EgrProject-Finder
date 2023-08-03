import React from "react";
import { useLocation } from 'react-router-dom';
import './locationStyle.css'

function Location(){
    const location = useLocation();
    let locationData = {};
    if (location.state && location.state.locationData) {
        locationData = location.state.locationData;
    }
    console.log("Received data:", JSON.stringify(locationData));

    return(
    <div>
        <h2>Locations</h2>
        <p>Received Data: {JSON.stringify(locationData)}</p>
      </div>
    );
}

export default Location;