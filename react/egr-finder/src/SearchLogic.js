import US_States from './US_States';

let slept = false;


export function handleInputChangeLogic(inputValue, setPlaceholder, setTxtList, setFilteredOptions) {
  let i = inputValue.trimStart();
  let arr = [];
  
  if (i) {
    arr = US_States.filter((data) => data.toLowerCase().startsWith(i.toLowerCase()));
    setFilteredOptions(arr);
  } else {
    setFilteredOptions([]);
  }
}

/**
 * Returns a random state from the US_States array
 */
function getRandomState() {
  let randIndex = Math.floor(Math.random() * US_States.length);
  return US_States[randIndex];
}

// Helper function for delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}