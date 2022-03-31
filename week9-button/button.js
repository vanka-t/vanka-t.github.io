 
let counterDisplayElem = document.querySelector('.counter-display');
let resetButton = document.querySelector('.reset');
let counterPlusElem = document.querySelector('.counter-plus');
 
let count = 0;
 
updateDisplay();
 
counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});
 
resetButton.addEventListener("click", ()=>{
    count = 0
    updateDisplay();
});
function updateDisplay(){
    counterDisplayElem.innerHTML = count;
};
