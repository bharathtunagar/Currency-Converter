const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); 
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// it is only to add all the other options int the select bar 
// with all the countries from and to
for(let select of dropdowns){
    for(currCode in countryList){
   let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // it is started by this default
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = true;
    }
    else if(select.name === "to" && currCode === "INR"){
        newOption.selected = true;
    }
    select.append(newOption);
   }

   select.addEventListener("change",(evt)=>{
         updateFlag(evt.target);
   });
}

// to change flags 
const updateFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode]; // IN,US
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

   //to change image
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

// button functionality

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 0;
        amount.value = "0";
    }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();

let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount = amtVal * rate;

msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});
