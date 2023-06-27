const search_contain = document.querySelector(".search")
const input = search_contain.querySelector("input")
const dropdown = search_contain.querySelector(".auto-complete-area")

/**
 * Allow and take in user input from input text box
 */
input.onkeyup = (e)=>{
    let i = e.target.value.trimStart();
    let arr = [];
    if(i){
        arr = US_States.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(i.toLocaleLowerCase());
        });
        arr = arr.map((data)=>{
            return data = '<li>'+ data +'</li>';
        });
        //console.log(i);
        search_contain.classList.add("active");
        showStates(arr);
        let full_arr = dropdown.querySelectorAll("li");
        //console.log(full_arr)
        for(let k = 0; k<full_arr.length; k++){
            // make each li clickable
            full_arr[k].setAttribute("onclick", "select(this)");
        }
    }
    else{
        search_contain.classList.remove("active");
    }
}

function select(element){
    let selectedU = element.textContent; // string
    console.log(selectedU);
    // Send data to php file
    //SendData(selectedU)
    let data = {
        loc: selectedU
    }
    fetch("GetData.php",{
        "method": "POST",
        "headers": {"Content-Type": "application/json; charset=utf-8"},
        "body": JSON.stringify(data)
    }).then(function(response){
        return response.text();
    }).then(function(data){
        console.log(data);
    })
}
function createCookie(name, value, days) {
    var expires;
      
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
      
    document.cookie = escape(name) + "=" + 
        escape(value) + expires + "; path=/";
}
/**
 * Send selected location to GetData.php [NOT WORKING IN DEVELOPMENT ONLY WORKS WITH CLIENT -> SERVER]
 */
function SendData(element){
    if (typeof element != "string"){
        return null
    } // if not string get out

    var data = {
        loc: element
    }

    var xhr = new XMLHttpRequest();
    var phpfile = "GetData.php"

    xhr.open("GET",phpfile,true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200){
            alert(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

function showStates(lst){
    let lst_data;
    // if list is empty, no show
    if(lst.length){
        lst_data = lst.join('');
    }
    else{
        search_contain.classList.remove("active");
    }
    dropdown.innerHTML = lst_data;
}

// Placeholder text
// lets store on stack to push and pop, when can't push anymore from word pop
// when can't pop anymore bc stack is empty, find a new word and push
let per_word = 0;
let placeholder = "";
const txt_list = [];
const speed = 100;
var slept = false;

async function placeholder_fill(){
    if (!txt_list.length && placeholder){ 
        // slowly remove each character from placeholder
        if(!slept){ 
            await delay(2000)
        } 
        if(placeholder.slice(-1) == " "){ // if it is a space character, remove another
            placeholder = placeholder.substring(0,placeholder.length-1);
        }
        placeholder = placeholder.substring(0,placeholder.length-1);
        document.getElementById("input_box").setAttribute("placeholder", placeholder);
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
        placeholder += letter;
        if(letter == " "){ // if it's a space, add the next aswell
            placeholder += txt_list.shift();
        }
        document.getElementById("input_box").setAttribute("placeholder", placeholder);
    }
    setTimeout(placeholder_fill,speed);
}
function getRandomState(){
    let rand_index = Math.floor(Math.random() * US_States.length);
    return US_States[rand_index];
}
/**
 * Delay issue solved by Alvaro Trigo 
 * site: https://alvarotrigo.com/blog/wait-1-second-javascript/
 */
function delay(milliseconds){
    slept = true;
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
placeholder_fill()