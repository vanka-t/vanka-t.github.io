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
let lastKey = '' //empty str for memory key


const collisionsMap = []
for (let i = 0; i<collisions.length; i+= 70){ //70 bc its the map tile width!!
    
    collisionsMap.push(collisions.slice(i, i+70))
}
pixels = 40.5 //pixel size of tiles after zooming in at 400% == x(original pixels) * 4 (400%)
class Boundary {
    static width = pixels
    static height = pixels 
    constructor({position}) {
        this.position = position
        this.width = pixels 
        this.height = pixels 
    }

    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width,this.height)//this.width, this.height)
    }
}

const boundaries = []
const offset = { //syncing background + collisions pos
    x: -825,
    y: -335 
}

collisionsMap.forEach((row, i ) => {
    row.forEach((symbol, j) => { //j = index of row currently loopin over
        if (symbol > 0)  {

        
        console.log("yeehaw")

            
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,// -210, //found in static width //210 is from bad previous programming? ur not supposed to need it but u fucked up somewhere so now ur left addin extra space manually
                        y: i * Boundary.height + offset.y //-100
            }}))
        
        }
    })
})
console.log(boundaries)

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



class Sprite { //character movement
    constructor({position, velocity, img, frames = {max: 1}}) {
        this.position = position //position
        this.img = img 
        this.frames = frames
        this.img.onload = () => {
            this.width = this.img.width / this.frames.max
            this.height = this.img.height 
            console.log(this.width, this.height)

        }
        
    }

    draw() {
        //c.drawImage(this.img,this.position.x, this.position.y)// change starting position of background
        c.drawImage(
            this.img,
            //cropping of char.png
            0, //xpos
            0, //ypos
            this.img.width/ this.frames.max,
            this.img.height,
            //actual position of char
            this.position.x,
            this.position.y,
            this.img.width/ this.frames.max,
            this.img.height
        )
    }
 }
 // , 
// ,

const player = new Sprite({
    position:{
        x: canvas.width/2 - 192 /4/2,//precise location for far left sprite in cropped png (192 = player IMAGE WIDTH)
        y: canvas.height/2 - 68/2 //68 = IMAGE HEIGHT
    },
    img: playerImg,
    frames: {
        max: 4
    }
})

const background = new Sprite({position: {
    x: offset.x,
    y: offset.y 
    },
    img: img
})


function rectangularCollision({rect1, rect2}) { //rect1 = player, rect2 = testBoundary
    return (
        rect1.position.x + rect1.width >= rect2.position.x && //RIGHT SIDE of player
        rect1.position.x <= rect2.position.x + rect2.width && //left side of player
        rect1.position.y <= rect2.position.y + rect2.height && //under player
        rect1.position.y + rect1.height >= rect2.position.y
    )
}
const movables = [background, ...boundaries] //dots help since boundaries is an array within this array (weird syntax)
function animate() {
    window.requestAnimationFrame(animate) 
    background.draw()
    
    
    boundaries.forEach((boundary) => {//collisions drawn
        boundary.draw()
    
    })
    player.draw()
    let moving = true 

        




   // playerImg.onload = () => {
       
    //}
    //if (playerImg.position.x + playerImg.width) //right side of player icon
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    { //bckground view goes down
        for(let i =0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if ( rectangularCollision ({ //calling dimension for player to boundary collision
                rect1 : player,
                rect2: {...boundary, position:{
                    x: boundary.position.x,
                    y: boundary.position.y +3 //the +3 detects into the future whether or not were about to collide
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
                movable.position.y +=3
            })
        }
        
    } 
    if (keys.ArrowDown.pressed && lastKey === 'ArrowDown'){//bckground view goes up
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
       // console.log(" x: " , background.pos.x)
    } 
}

window.addEventListener('keydown', (e) => { // === mousePressed
    //console.log(e.key)
    switch (e.key) { //if keyPressed
        case 'ArrowUp':
           // console.log(" hihi up u go")
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            //console.log(" huhu down u go")
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
        case 'ArrowLeft':
           // console.log(" hehe left u go")
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
          //  console.log(" hoho right u go")
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
    }
}) 

window.addEventListener('keyup', (e) => { //equivalent to mouseReleased
    //console.log(e.key)
    switch (e.key) { //if keyPressed
        case 'ArrowUp':
            //console.log(" hihi up u go")
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
           // console.log(" huhu down u go")
            keys.ArrowDown.pressed = false
            break
        case 'ArrowLeft':
           // console.log(" hehe left u go")
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
           // console.log(" hoho right u go")
            keys.ArrowRight.pressed = false
            break
    }
}) 
animate();
