import React, { useState, useEffect, useRef } from 'react';
//import './style.css';
import US_States from './US_States';
import { handleInputChangeLogic, placeholderFillLogic } from './SearchLogic';

function App() {
  const [placeholder, setPlaceholder] = useState('');
  const [txtList, setTxtList] = useState([]);
  const [inputValue, setInputValue] = useState(''); // input value
  const [filteredOptions, setFilteredOptions] = useState([]); // filtered options
  const speed = 100;
  const [slept, setSlept] = useState(false);
  const searchContainRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
    handleInputChangeLogic(e.target.value.trimStart(), setPlaceholder, setTxtList, setFilteredOptions);
  };

  useEffect(() => {
    placeholderFillLogic(
      placeholder,
      setPlaceholder,
      txtList,
      setTxtList,
      speed,
      slept,
      searchContainRef.current,
      dropdownRef.current
    );
  }, [placeholder, setPlaceholder, txtList, setTxtList, speed, slept]);

  const handleSelectOption = (option) => {
    setInputValue(option);
    setFilteredOptions([]); // Hide dropdown setting filteredOptions to empty array
    console.log(option);
  };

  return (
    <div className="App">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;