import React, { useState, useEffect, useRef } from 'react';
import '../style.css';
import US_States from '../US_States';
import { handleInputChangeLogic} from '../SearchLogic';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const [placeholder, setPlaceholder] = useState('');
  const [setTxtList] = useState([]);
  const [inputValue, setInputValue] = useState(''); // input value
  const [filteredOptions, setFilteredOptions] = useState([]); // filtered options
  const dropdownRef = useRef(null);
  const txtListRef = useRef([]);
  const timeoutIdRef = useRef(null);
  const speed = 100;
  var slept = false;
  let placeholderTemp = "";
  const [satelliteClicked, setSatelliteClicked] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
    handleInputChangeLogic(e.target.value.trimStart(), setPlaceholder, setTxtList, setFilteredOptions);
    if (!e.target.value.trim()) {
      // If input value is empty, reset animation
      setIsAnimationRunning(true);
      slept = false;
      placeholderTemp = '';
      txtListRef.current = [];
      clearTimeout(timeoutIdRef.current);
    } else {
      setIsAnimationRunning(false); // Stop animation when user starts typing
    }
  };

  const handleSelectOption = (option) => { // Function that occurs when user selects location (option)
    if (option === "Remote" && !satelliteClicked) {
      // Your code here to handle the option
      console.log("Option selected:", option);

      // Mark the satellite as clicked
      setSatelliteClicked(true);
    }
    setFilteredOptions([]); // Hide dropdown setting filteredOptions to empty array
    option = option.toString();
    console.log(option);
    fetch("/api/locations",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({location:option})
      }).then(response => response.json())
      .then(data => { // Once get data, go to second site and show
        navigate('/locations', {state: {locationData: data, loc: option}});
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  };


  // ==========================PLACE HOLDER FILLING================================ //
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // Placeholder text
  // lets store on stack to push and pop, when can't push anymore from word pop
  // when can't pop anymore bc stack is empty, find a new word and push
  const PlaceHolderFill = async () => {
    if (isAnimationRunning) {
    if (!txtListRef.current.length && placeholderTemp) {
      // Slowly remove each character from placeholder
      if (!slept) {
        await delay(2000);
        slept = true;
      }
      if (placeholderTemp.slice(-1) === ' '){
        // If it is a space character, remove another
        placeholderTemp = placeholderTemp.substring(0, placeholderTemp.length - 1);
      }
      placeholderTemp = placeholderTemp.substring(0, placeholderTemp.length - 1);
      setPlaceholder(placeholderTemp);
    } else {
      slept = false;
      if (txtListRef.current.length < 1) {
        // Make a new list with each letter
        let temp_word = getRandomState();
        for (let k = 0; k < temp_word.length; k++) {
          txtListRef.current.push(temp_word[k]);
        }
      }
      let letter = txtListRef.current.shift();
      placeholderTemp += letter;
      if (letter === ' ') {
        // If its a space, add next as well
        placeholderTemp += txtListRef.current.shift();
      }
      setPlaceholder(placeholderTemp);
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(PlaceHolderFill, speed);
  }
  };
  //=============================================================================//

  useEffect(() => {
    PlaceHolderFill();
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [isAnimationRunning]);
  
  /**
   * satelite code to prevent user spamming the satelite button
   */
  let satelliteContent;
  if (satelliteClicked) {
    satelliteContent = (
      <img className='satelite' src="https://i.postimg.cc/8kWWTzLV/Satelite.png" alt="Satellite" />
    );
  } else {
    satelliteContent = (
      <a href="#" onClick={() => handleSelectOption("Remote")}>
        <img className='satelite' src="https://i.postimg.cc/8kWWTzLV/Satelite.png" alt="Satellite" />
      </a>
    );
  }

  return (
    <div className="home">
      <div className="container">
        <div className="header">
          <h1>project<br />monkey</h1>
        </div>
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              id="input_box"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
            />
            {/* Show the dropdown if filteredOptions is not empty */}
            {filteredOptions.length > 0 && (
              <div className="auto-complete-area" id="autoComplete" ref={dropdownRef}>
                <ul>
                  {filteredOptions.map((option, index) => (
                    <li key={index} onClick={() => handleSelectOption(option)}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className='sateliteDiv'>
              {/* Clickable Image, will scale on hover */}
              {satelliteContent}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function getRandomState() {
  const randIndex = Math.floor(Math.random() * US_States.length);
  return US_States[randIndex];
}

export default Home;