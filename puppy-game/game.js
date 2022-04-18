
//timer settings


const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('.startButton');

const resetContainer = document.getElementById('reset-container');
const resetButton = document.getElementById('.resetButton');

const winContainer = document.getElementById('win-container');
const restartButton = document.getElementById('.restartButton');

const timeContainer = document.getElementById('time-container');
const background = document.getElementById('bg');
var halfMinute = 9;

window.onload = function () { // this is the main function that calls the chain of functions
    startGame();
    console.log("aha");
    //  --> change here if the seconds of the timer
   
    document.querySelector('#bg').classList.add('body');

    
};

function startGame(){ // start/welcome page with the popup banner
    timeContainer.classList.add('remove')
    winContainer.classList.add('remove');
    resetContainer.classList.add('remove');
    startContainer.classList.add('show');
    
   startContainer.addEventListener("click", ()=>{ // IF START BUTTON IS CLICKED:
    startContainer.classList.add('remove'); //WELCOME POPUP BANNER IS REMOVED
    console.log("hall0000o");
        //timer = duration; //TIMER STARTS
        //startTimer(halfMinute, display);
        
        display = document.querySelector('#time');
        startContainer.addEventListener("click", ()=>{ 
            console.log("fyckk");
        })
        //scoreCount();
        startTimer(halfMinute, display);
        //you'll prolly want to insert your code somewhere *** HERE ***
       
    });
}
function youWin(){
    timeContainer.classList.remove('show');
    winContainer.classList.remove('remove');
    winContainer.classList.add('show');
    //document.querySelector('#bg').classList.add('youWin');
    winContainer.addEventListener("click", ()=>{
       // document.querySelector('#bg').classList.remove('youWin');
       window.onload();
       
        display = document.querySelector('#time');
        if (display === "00") {
            display === "10"
        }
        startTimer(halfMinute, display);
        //scoreCount(); //enable this when you want to restart code after doing your own settings to it
        
       
    
    });
}

function gameOver(){
    timeContainer.classList.remove('show');
    timeContainer.classList.add('remove');
   // document.querySelector('#bg').classList.remove('body');
   // document.querySelector('#reset-container').classList.add('show');
    document.querySelector('#bg').classList.add('gameOver');
    resetContainer.classList.remove('remove');
    resetContainer.classList.add('show');
    resetContainer.addEventListener("click", ()=>{
        document.querySelector('#bg').classList.remove('gameOver');
       window.onload();
       //var halfMinute = 5,
        display = document.querySelector('#time');
        if (display === "00") {
            display === "10"
        }
        startTimer(halfMinute, display);
        scoreCount();
        
       
    
    });
}







