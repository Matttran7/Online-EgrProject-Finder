import React from "react";
import { useLocation } from 'react-router-dom';
import './locationStyle.css'

function Location(){
    const location = useLocation();
    let locationData = [];
    let locationName = "";
    if (location.state && location.state.locationData) {
        locationData = location.state.locationData;
    }
    if (location.state && location.state.loc) {
        locationName = location.state.loc;
    }

    return(
    <div>
        <div className="location">
            <h1>{locationName}</h1>
        </div>
        <ul>
        {locationData.map((item) => (
          <li key={item._id}>
            <strong className="project"> {item.project}</strong><br />
            <strong className="group">{item.group}</strong><br />
            <strong className="description">{item.description}</strong><br /><br />
            <strong className="email">{item.email}</strong><br />
          </li>
        ))}
      </ul>
      </div>
    );
}

export default Location;