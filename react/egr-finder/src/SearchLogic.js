import US_States from './US_States.js';
const search_contain = document.querySelector('.search');
let slept = false;

export function handleInputChangeLogic(inputValue, setPlaceholder, setTxtList, placeholder, txtList, dropdown) {
    let i = inputValue.trimStart();
  let arr = [];
  if (i) {
    arr = US_States.filter((data) => {
      return data.toLowerCase().startsWith(i.toLowerCase());
    });
    let lstData = arr.map((data) => '<li>' + data + '</li>').join('');

    if (!txtList.length && placeholder) {
      if (!slept) {
        delay(2000);
      }
      if (placeholder.slice(-1) === ' ') {
        placeholder = placeholder.substring(0, placeholder.length - 1);
      }
      placeholder = placeholder.substring(0, placeholder.length - 1);
      setPlaceholder(placeholder);
    } else {
      slept = false;
      if (!txtList.length) {
        let tempWord = getRandomState();
        let tempList = [];
        for (let k = 0; k < tempWord.length; k++) {
          tempList.push(tempWord[k]);
        }
        setTxtList(tempList);
      }

      let letter = txtList.shift();
      placeholder += letter;
      if (letter === ' ') {
        placeholder += txtList.shift();
      }
      setPlaceholder(placeholder);
    }
    document.getElementById('input_box').setAttribute('placeholder', placeholder);
    search_contain.classList.add('active');
    dropdown.innerHTML = lstData;
    let fullArr = dropdown.querySelectorAll('li');
    for (let k = 0; k < fullArr.length; k++) {
      fullArr[k].setAttribute('onclick', 'select(this);');
    }
  } else {
    search_contain.classList.remove('active');
  }
} // handleInputChange end
  
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
    // Check if txtList is defined before accessing its length property
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
    } else {
      search_contain.classList.remove('active');
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
  