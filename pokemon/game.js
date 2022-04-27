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
    constructor({pos, velocity, bckground}) {
        this.pos = pos //position
        this.bckground = bckground 
    }

    draw(){
        c.drawImage(this.bckground,this.pos.x, this.pos.y)// change starting position of background
    }
}


const background = new Sprite({pos: {
    x: offset.x,
    y: offset.y 
    },
    bckground: bckground
})

const testBoundary  = new Boundary({
    position: {
        x:400,
        y:400
    }
})
const movables = [background,testBoundary]
function animate() {
    window.requestAnimationFrame(animate) 
    background.draw()
    testBoundary.draw()

    // boundaries.forEach(boundary => {//collisions drawn
    //     boundary.draw()
    // }),
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
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    { //bckground view goes down
        background.pos.y += 3
        testBoundary.position.y +=3
    } 
    if (keys.ArrowDown.pressed && lastKey === 'ArrowDown'){//bckground view goes up
        background.pos.y -= 3
        testBoundary.position.y -=3
    } 
    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){ //bckground view goes left
        background.pos.x += 3
        testBoundary.position.x +=3
       // console.log(" x: " , background.pos.x)
    } 
    if (keys.ArrowRight.pressed && lastKey === 'ArrowRight'){ //bckground view goes left
        background.pos.x -= 3
        testBoundary.position.x -=3
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
