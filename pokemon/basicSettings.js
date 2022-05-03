const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //ctx = context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'blue'
c.fillRect(0,0,canvas.width,canvas.height);

const img = new Image()
img.src = 'assets-prova/map.png'

const playerImg = new Image() //FRONT CHAR
playerImg.src = 'assets-prova/char2-front.png' 

const playerUpImg = new Image() //BACK CHAR
playerUpImg.src = 'assets-prova/char2-back.png' 

const playerDownImg = new Image() //FRONT CHAR
playerDownImg.src = 'assets-prova/char2-front.png' 

const playerLeftImg = new Image() //LEFT CHAR
playerLeftImg.src = 'assets-prova/char2-left.png' 

const playerRightImg = new Image() //LEFT CHAR
playerRightImg.src = 'assets-prova/char2-right.png' 

let lastKey = '' //empty str for memory key

const foregroundImg = new Image() //FRONT CHAR
foregroundImg.src = 'assets-prova/foreground.png' 

const battleBackImg = new Image() //BATTLE BACKGROUND
battleBackImg.src = 'assets-prova/battleGround.png'
const battleBack  = new Sprite({position: {
     x:0,
     y:0
 },
img: battleBackImg
})

const rivalImg = new Image()
rivalImg.src = 'assets-prova/draggleSprite.png'
const rival = new Sprite({
    position: {
        x: 730, // adjust position accordingly based on rival location
        y: 180
    },
    img: rivalImg,
    frames: {
        max:4, //crop pic to 4
        hold: 15
    },
    animate: true
})

const weaponImg = new Image()
weaponImg.src = 'assets-prova/embySprite.png'
const weapon = new Sprite({
    position: {
        x: 270, // adjust position accordingly based on rival location
        y: 340
    },
    img: weaponImg,
    frames: {
        max:4, //crop pic to 4
        hold: 15
    },
    animate: true
})


const collisionsMap = []
for (let i = 0; i<collisions.length; i+= 70){ //70 bc its the map tile width!!  
    collisionsMap.push(collisions.slice(i, i+70))
}

const battleZoneMap = []
for (let i = 0; i<battleZoneData.length; i+= 70){ //70 bc its the map tile width!!  
    battleZoneMap.push(battleZoneData.slice(i, i+70))
}

const boundaries = []
const offset = { //syncing background + collisions pos
    x: -825,
    y: -335 
}