const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //ctx = context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'blue'
c.fillRect(0,0,canvas.width,canvas.height);

const bckground = new Image()
bckground.src = 'assets-prova/map.png'

const playerImg = new Image() //FRONT CHAR
playerImg.src = 'assets-prova/char2-front.png' 

bckground.onload = () => {
    c.drawImage(bckground,-825,-335)// change starting position of background
    playerImg.onload = () => {
        c.drawImage(
            playerImg,
            canvas.width/2 - playerImg.width/2,
             canvas.height/2 - playerImg.height/2);
    }
    console.log()
   // c.fillRect(0,0,playerImg.width,playerImg.height);
}

