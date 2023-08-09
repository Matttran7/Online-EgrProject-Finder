import React, { useState } from "react";
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
    const [expandedStates, setExpandedStates] = useState(Array(locationData.length).fill(false));

    const handleToggleExpansion = (index) => {
      setExpandedStates(prevStates => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    };
  
    return(
    <div className="page-container">
        <div className="header-container">
            <div className="location">
                <h1>{locationName}</h1>
            </div>
        </div>
      <div className="main-container">
          {locationData.map((item, index) => (
              <div
                  key={item._id}
                  className={`expandContainer ${expandedStates[index] ? "expanded" : ""}`}
                  onClick={() => handleToggleExpansion(index)}
              >
                  <div className="noDrop">
                      <strong className="project">{item.project}</strong><br />
                      <strong className="group">{item.group}</strong><br />
                  </div>
                  <div className={`drop ${expandedStates[index] ? "expanded" : ""}`}>
                      <strong className="description">{item.description}</strong><br /><br />
                      <strong className="email">{item.email}</strong><br />
                  </div>
              </div>
          ))}
      </div>
  </div>
    );
}
export default Location;