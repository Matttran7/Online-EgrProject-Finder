import React, { useState, useEffect, useRef } from 'react';
//import './style.css';
import US_States from './US_States';
import { handleInputChangeLogic} from './SearchLogic';

function App() {
  const [placeholder, setPlaceholder] = useState('');
  const [setTxtList] = useState([]);
  const [inputValue, setInputValue] = useState(''); // input value
  const [filteredOptions, setFilteredOptions] = useState([]); // filtered options
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
    handleInputChangeLogic(e.target.value.trimStart(), setPlaceholder, setTxtList, setFilteredOptions);
  };

  // ========================================================================= //
  // Placeholder text
  // lets store on stack to push and pop, when can't push anymore from word pop
  // when can't pop anymore bc stack is empty, find a new word and push
  const txt_list = [];
  const speed = 100;
  var slept = false;
  let placeholderTemp = "";
  async function placeholder_fill2(){
    if (!txt_list.length && placeholderTemp){ 
        // slowly remove each character from placeholder
        if(!slept){ 
            await delay(2000);
        } 
        if(placeholderTemp.slice(-1) === " "){ // if it is a space character, remove another
            placeholderTemp = placeholderTemp.substring(0,placeholderTemp.length-1);
        }
        placeholderTemp = placeholderTemp.substring(0,placeholderTemp.length-1);
        setPlaceholder(placeholderTemp);
    }
    else{
        slept = false;
        if (!txt_list.length){
            // make a new list with each char of word
            let temp_word = getRandomState();
            for (let k = 0; k < temp_word.length;k++){
                txt_list.push(temp_word[k]);
            }
        }
        let letter =  txt_list.shift();
        placeholderTemp += letter;
        if(letter === " "){ // if it's a space, add the next aswell
            placeholderTemp += txt_list.shift();
        }
        setPlaceholder(placeholderTemp);
    }
    setTimeout(placeholder_fill2,speed);
  }
  function delay(milliseconds){
    slept = true;
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }
  //=============================================================================//
  
  useEffect(() => {
    placeholder_fill2();
    });

  /*useEffect(() => {
    placeholderFillLogic(
      placeholder,
      setPlaceholder,
      txtList,
      setTxtList,
      searchContainRef.current
    );
  }, [placeholder, setPlaceholder, txtList, setTxtList]);*/

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

function getRandomState() {
  const randIndex = Math.floor(Math.random() * US_States.length);
  return US_States[randIndex];
}

export default App;