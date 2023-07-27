import US_States from './US_States';

let slept = false;


export function handleInputChangeLogic(inputValue, setPlaceholder, setTxtList, setFilteredOptions) {
  let i = inputValue.trimStart();
  let arr = [];

  if (i) {
    arr = US_States.filter((data) => data.toLowerCase().startsWith(i.toLowerCase()));
    setFilteredOptions(arr);
    console.log("2")
  } else {
    setFilteredOptions([]);
  }
}


export async function placeholderFillLogic(
  placeholder,
  setPlaceholder,
  txtList,
  setTxtList,
  speed,
  slept,
  search_contain,
  dropdown
) {
  if (txtList && txtList.length) {
    let letter = txtList.shift();
    placeholder += letter;
    if (letter === ' ') {
      placeholder += txtList.shift();
    }
    setPlaceholder(placeholder);
  } else if (placeholder) {
    if (!slept) {
      await delay(2000);
    }
    if (placeholder.slice(-1) === ' ') {
      placeholder = placeholder.substring(0, placeholder.length - 1);
    }
    placeholder = placeholder.substring(0, placeholder.length - 1);
    setPlaceholder(placeholder);
  }

  setTimeout(
    () =>
      placeholderFillLogic(
        placeholder,
        setPlaceholder,
        txtList,
        setTxtList,
        speed,
        slept,
        search_contain,
        dropdown
      ),
    speed
  );
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