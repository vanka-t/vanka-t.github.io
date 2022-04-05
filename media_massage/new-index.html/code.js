
let resetButton = document.querySelector('.reset');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;
 
var line = document.querySelector("#msg");
var pics1 = document.querySelector("#pic1");

updateDisplay();


counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
    if (count === 1){
        document.querySelector('#bg').classList.remove('bgChange0');
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.add('bgChange1');
        
    }
    if (count === 2){
        
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.remove('bgChange1');
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#pic1').src="bg1.png";
      
        
    }
    if (count > 2){
        count = 0;
    }
    if (count === 0){
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.add('bgChange0');
        document.querySelector('#pic1').src="bg1.png";
      
        
    }
    updateDisplay();
});
 
resetButton.addEventListener("click", ()=>{
    count = 0
    updateDisplay();
    document.querySelector('#bg').classList.add('bgChange0');
        document.querySelector('#pic1').src="bg1.png";
        
});

function updateDisplay(){

    
  
   
};

