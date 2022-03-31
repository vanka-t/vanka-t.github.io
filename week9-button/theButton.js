 
let counterDisplayElem = document.querySelector('.counter-display');
let resetButton = document.querySelector('.reset');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;
 
var line = document.querySelector("#msg");
var taco = document.querySelector("#taco");
var text5 = document.createTextNode("Keep on going!");
var text10 = document.createTextNode("You did it!!!!");

updateDisplay();


counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
    if (count === 5){
        document.querySelector('#bg').classList.add('bgChange1');
        line.appendChild(text5);
    }
    if (count === 10){
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#taco').src="happy-taco.gif";
        line.removeChild(text5) 
        line.appendChild(text10);
        
    }
});
 
resetButton.addEventListener("click", ()=>{
    count = 0
    updateDisplay();
});
function updateDisplay(){
    counterDisplayElem.innerHTML = count;
    
  
   
};

