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
let lastKey = '' //empty str for memory key



const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}
class Sprite {
    constructor({pos, velocity, bckground}) {
        this.pos = pos //position
        this.bckground = bckground 
    }

    draw(){
        c.drawImage(this.bckground, this.pos.x, this.pos.y)// change starting position of background
    }
}

const background = new Sprite({pos: {
    x: -825,
    y: -335 
    },
    bckground: bckground
})


function animate() {
    window.requestAnimationFrame(animate) 
    background.draw()
   // playerImg.onload = () => {
        c.drawImage(
            playerImg,
            //cropping of char.png
            0, //xpos
            0, //ypos
            playerImg.width/4,
            playerImg.height,
            //actual position of char
            canvas.width/2 - (playerImg.width/4) /2, //precise location for far left sprite in cropped png
            canvas.height/2 - playerImg.height/2,
            playerImg.width/4,
            playerImg.height
        )
    //}
    if (keys.ArrowUp.pressed){ //bckground view goes down
        background.pos.y += 3
        console.log(" y: " , background.pos.y)
    } 
    if (keys.ArrowDown.pressed){//bckground view goes up
        background.pos.y -= 3
        console.log(" y: " , background.pos.y)
    } 
    if (keys.ArrowLeft.pressed){ //bckground view goes left
        background.pos.x += 3
        console.log(" x: " , background.pos.x)
    } 
    if (keys.ArrowRight.pressed){ //bckground view goes left
        background.pos.x -= 3
        console.log(" x: " , background.pos.x)
    } 
}

window.addEventListener('keydown', (e) => { // === mousePressed
    //console.log(e.key)
    switch (e.key) { //if keyPressed
        case 'ArrowUp':
            console.log(" hihi up u go")
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown':
            console.log(" huhu down u go")
            keys.ArrowDown.pressed = true
            break
        case 'ArrowLeft':
            console.log(" hehe left u go")
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            console.log(" hoho right u go")
            keys.ArrowRight.pressed = true
            break
    }
}) 

window.addEventListener('keyup', (e) => { //equivalent to mouseReleased
    //console.log(e.key)
    switch (e.key) { //if keyPressed
        case 'ArrowUp':
            console.log(" hihi up u go")
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            console.log(" huhu down u go")
            keys.ArrowDown.pressed = false
            break
        case 'ArrowLeft':
            console.log(" hehe left u go")
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            console.log(" hoho right u go")
            keys.ArrowRight.pressed = false
            break
    }
}) 
animate();
