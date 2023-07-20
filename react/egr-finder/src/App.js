import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { handleInputChangeLogic ,placeholderFillLogic } from './SearchLogic';

function App() {
    const [placeholder, setPlaceholder] = useState('');
    const [txtList, setTxtList] = useState([]);
    const speed = 100; // speed value
    const [slept, setSlept] = useState(false);
    const searchContainRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
      handleInputChangeLogic(e.target.value.trimStart(), setPlaceholder, setTxtList, placeholder, txtList, dropdownRef.current);
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
   
    return (
    <div className="App">
       <div className="container"> {/* Added container */}
        <div className="header">
          <h1>project<br />monkey</h1>
        </div>
        <div className="search-container" ref={searchContainRef}>
          <div className="search">
            
            <input type="text"
              id="input_box"
              onChange={handleInputChange}
              placeholder={placeholder}></input>

            <div className="auto-complete-area" id="autoComplete" ref={dropdownRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
