
//timer settings
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            
            gameOver();
            timer = duration; //ideally have it freeze

            //FLASH GAME OVER AND RESET BUTTON HERE gameOver()

        }
    }, 1000);
}

window.onload = function () {
    var oneMinute = 5,//60,
        display = document.querySelector('#time');
    startTimer(oneMinute, display);
};

function gameOver(){
    document.querySelector('#bg').classList.add('bgChange0');

}