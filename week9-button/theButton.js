 
let counterDisplayElem = document.querySelector('.counter-display');
let resetButton = document.querySelector('.reset');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;
 
var line = document.querySelector("#msg");
var taco = document.querySelector("#taco");
var text5 = document.createTextNode("Keep on going!");
var text10 = document.createTextNode("You did it!!!!");
var text0 = document.createTextNode("");

updateDisplay();


counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
    if (count === 5){
        document.querySelector('#bg').classList.remove('bgChange0');
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.add('bgChange1');
        
        line.appendChild(text5);
    }
    if (count === 10){
        
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.remove('bgChange1');
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#taco').src="final-taco.gif";
        line.removeChild(text5) 
        line.appendChild(text10);
        
    }
    if (count === 0){
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.add('bgChange0');
        document.querySelector('#taco').src="taco.gif";
        line.removeChild(text10)
        line.appendChild(text0); 
        
    }
    updateDisplay();
});
 
resetButton.addEventListener("click", ()=>{
    count = 0
    updateDisplay();
    document.querySelector('#bg').classList.add('bgChange0');
        document.querySelector('#taco').src="taco.gif";
        line.removeChild(text10)
        line.appendChild(text0); 
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
    
  
   
};

