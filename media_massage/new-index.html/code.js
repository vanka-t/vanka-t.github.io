
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
        
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.remove('bgChange1');
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#pic1').src="bg2.png";
      
        
    }
    if (count === 2){
        
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.remove('bgChange1');
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#pic1').src="bg3.png";
        
    }
    if (count === 3){
        
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.remove('bgChange1');
        document.querySelector('#bg').classList.add('bgChange2');
        document.querySelector('#pic1').src="bg4.png";
        
    }
 
    if (count > 3){
        count = 0;
    }
    if (count === 0){
        document.querySelector('#bg').classList.remove('bgChange2');
        document.querySelector('#bg').classList.add('bgChange0');
        document.querySelector('#pic1').src="bg1.png";
      
        
    }
    updateDisplay();
});
 

function updateDisplay(){

    
  
   
};

