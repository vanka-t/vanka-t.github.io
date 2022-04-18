
//timer settings


const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('.startButton');

const resetContainer = document.getElementById('reset-container');
const resetButton = document.getElementById('.resetButton');



function startGame(){ // start/welcome page with the popup banner
    resetContainer.classList.add('remove');
   startContainer.addEventListener("click", ()=>{ // IF START BUTTON IS CLICKED:
    startContainer.classList.add('remove'); //WELCOME POPUP BANNER IS REMOVED
        var halfMinute = 30,//  --> change here if the seconds of the timer
        display = document.querySelector('#time');
        startTimer(halfMinute, display);
        timer = duration; //TIMER STARTS

        //you'll prolly want to insert your code somewhere *** HERE ***
    
    });
}



function startTimer(duration, display) { //TIMER SETTINGS 
    var timer = duration, seconds;
    setInterval(function () {
        //minutes = parseInt(timer / 60, 10); -->this is optional incase we want to show minutes, otherwise ignore
        seconds = parseInt(timer % 60, 10);

        //minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;//minutes + ":" + seconds;

        if (--timer === 0) { //IF TIMER GOES TO 00:00:
            
            gameOver();    //SHOW GAME OVER PAGE

        }
    }, 1000);
}

function gameOver(){

    resetContainer.classList.add('add');
    resetContainer.addEventListener("click", ()=>{
        startGame();
        count = 0
       // updateDisplay();
        
    
    });
    
    document.querySelector('#bg').classList.remove('body');
    document.querySelector('#bg').classList.add('gameOver');

}

window.onload = function () { // this is the main function that calls the chain of functions
    startGame()
    document.querySelector('#bg').classList.add('body');
};

