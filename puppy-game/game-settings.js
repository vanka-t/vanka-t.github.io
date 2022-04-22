// this is where the timer and score settings are 
function scoreCount(){ //SCORE COUNTING SETTINGS
    console.log("waweeewo");
    var score = 0;
    scoreCount = document.querySelector('#score')
    scoreCount.textContent = score;
    
    //this is probable where you're gonna wanna put some of your code
    //put "if" condition and then: 
    //    score += 1;
    // for score to grow

    if (score === 10){ //change total number of points if you want
        youWin();
    }
}

function startTimer(duration, display) { //TIMER SETTINGS 
    var timer = duration, seconds;
    timeInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        console.log(seconds);

        display.textContent = seconds;
        
        if (--timer < 0) {
        if (timer < 0) { 
           
            
            clearInterval(timeInterval) 
        }
        if (seconds == "00") {//IF TIMER GOES TO 00:00:
            clearInterval(timeInterval) 
            gameOver();

           // youWin()
            //resetContainer.classList.add('show');
        }
    }
    }, 1000);
}