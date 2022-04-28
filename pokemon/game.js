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

collisionsMap.forEach((row, i ) => {
    row.forEach((symbol, j) => { //j = index of row currently loopin over
        if (symbol > 0)  {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,// -210, //found in static width //210 is from bad previous programming? ur not supposed to need it but u fucked up somewhere so now ur left addin extra space manually
                        y: i * Boundary.height + offset.y //-100
            }}))
        
        }
    })
})

const battleZone = []
battleZoneMap.forEach((row, i ) => {
    row.forEach((symbol, j) => { //j = index of row currently loopin over
        if (symbol > 0)  {
            battleZone.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,// -210, //found in static width //210 is from bad previous programming? ur not supposed to need it but u fucked up somewhere so now ur left addin extra space manually
                        y: i * Boundary.height + offset.y //-100
            }}))
        
        }
    })
})
console.log(battleZone)

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




 // , 
// ,

const player = new Sprite({
    position:{
        x: canvas.width/2 - 192 /4/2,//precise location for far left sprite in cropped png (192 = player IMAGE WIDTH)
        y: canvas.height/2 - 68/2 //68 = IMAGE HEIGHT
    },
    img: playerDownImg,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImg,
        down: playerDownImg,
        left: playerLeftImg,
        right: playerRightImg

    }
})

const background = new Sprite({position: {
    x: offset.x,
    y: offset.y 
    },
    img: img
})

const foreground = new Sprite({position: {
    x: offset.x +55.5, //make sure theyre actually rendered me same zoom in % mf :/
    y: offset.y +16
    },
    img: foregroundImg
})


function rectangularCollision({rect1, rect2}) { //rect1 = player, rect2 = testBoundary
    return (
        rect1.position.x + rect1.width >= rect2.position.x && //RIGHT SIDE of player
        rect1.position.x <= rect2.position.x + rect2.width && //left side of player
        rect1.position.y <= rect2.position.y + rect2.height && //under player
        rect1.position.y + rect1.height >= rect2.position.y
    )
}
const movables = [background, ...boundaries, foreground, ...battleZone] //dots help since boundaries is an array within this array (weird syntax)
function animate() {
    window.requestAnimationFrame(animate) 
    background.draw()
    
    boundaries.forEach((boundary) => {//collisions drawn
        boundary.draw()
    })

    battleZone.forEach((battleZone1) => {//collisions drawn
        battleZone1.draw()
    })

    player.draw()
    foreground.draw()
    let moving = true 
    player.moving = false //by default player doesnt move when staying in place
    if (keys.ArrowUp.pressed || keys.ArrowDown.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed){ //battle zone called when player is in motion on battlezone area
        for(let i =0; i< battleZone.length; i++){
            const battleZone1 = battleZone[i]
            if ( rectangularCollision ({ //battle zone collision!
                rect1 : player,
                rect2: battleZone1
            })  ) { 
                console.log("battle zone collision!")
                break
            }
        }
    }
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    { //bckground view goes down
        player.moving = true //looping motion within spritesheet
        player.img = player.sprites.up //changes to spprite lokin up
        for(let i =0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if ( rectangularCollision ({ //calling dimension for player to boundary collision
                rect1 : player,
                rect2: {...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y +3 //the +3 detects into the future whether or not were about to collide
                }}
            })  ) { 
                moving = false
                break
            }
        }

       

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y +=3
            })
        }
    } 
    if (keys.ArrowDown.pressed && lastKey === 'ArrowDown'){//bckground view goes up
        player.moving = true
        player.img = player.sprites.down
        for(let i =0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if ( rectangularCollision ({ //calling dimension for player to boundary collision
                rect1 : player,
                rect2: {...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y -3 //the +3 detects into the future whether or not were about to collide
                }}
            })
            ) { 
                moving = false
                break
                //console.log("player:", player.position.x,player.position.y )
                //console.log("boundary:", boundary.position.x,boundary.position.y )
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -=3
            })
        }
  
      
    } 
    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){ //bckground view goes left
        player.moving = true
        player.img = player.sprites.left
        for(let i =0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if ( rectangularCollision ({ //calling dimension for player to boundary collision
                rect1 : player,
                rect2: {...boundary, position:{
                    x: boundary.position.x +3,
                    y: boundary.position.y //the +3 detects into the future whether or not were about to collide
                }}
            })
            ) { 
                moving = false
                break
                //console.log("player:", player.position.x,player.position.y )
                //console.log("boundary:", boundary.position.x,boundary.position.y )
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x +=3
            })
        }
        
        
       // console.log(" x: " , background.pos.x)
    } 
    if (keys.ArrowRight.pressed && lastKey === 'ArrowRight'){ //bckground view goes left
        player.moving = true
        player.img = player.sprites.right
        for(let i =0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if ( rectangularCollision ({ //calling dimension for player to boundary collision
                rect1 : player,
                rect2: {...boundary, position:{
                    x: boundary.position.x - 3,
                    y: boundary.position.y //the +3 detects into the future whether or not were about to collide
                }}
            })
            ) { 
                moving = false
                break
                //console.log("player:", player.position.x,player.position.y )
                //console.log("boundary:", boundary.position.x,boundary.position.y )
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -=3
            })
        }
       
    } 
}

window.addEventListener('keydown', (e) => { // === mousePressed

    switch (e.key) { //if keyPressed
        
        case 'ArrowUp':

            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
    }
}) 

window.addEventListener('keyup', (e) => { //equivalent to mouseReleased
    switch (e.key) { //if keyPressed
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
}) 
animate();
