const search_contain = document.querySelector(".search")
const input = search_contain.querySelector("input")
const dropdown = search_contain.querySelector(".auto-complete-area")

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
        let full_arr = dropdown.querySelectorAll('li');
        for(k = 0; k<full_arr.length;k++){
            // make each li clickable
            full_arr[k].setAttribute("onlick","select(this)");
        }
    }
    else{
        search_contain.classList.remove("active");
    }
}

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

