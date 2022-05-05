console.log(gsap)// to see library references




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

const player = new Sprite({
    position:{
        x: canvas.width/2 - 192 /4/2,//precise location for far left sprite in cropped png (192 = player IMAGE WIDTH)
        y: canvas.height/2 - 68/2 //68 = IMAGE HEIGHT
    },
    img: playerDownImg,
    frames: {
        max: 4,
        hold:10
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
const battle = {
    initiated: false
}
function animate() {
    const animationId = window.requestAnimationFrame(animate) 
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
    player.animate = false //by default player doesnt move when staying in place
    if (battle.initiated) {return}
    if (keys.ArrowUp.pressed || keys.ArrowDown.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed){ //battle zone called when player is in motion on battlezone area
        for(let i =0; i< battleZone.length; i++){
            const battleZone1 = battleZone[i]
            const overlappingArea =  
            (Math.min(
                player.position.x + player.width, 
                battleZone1.position.x + battleZone1.width
                ) - //right side of each being compared
                Math.max(player.position.x, battleZone1.position.x)) * 
                    (Math.min(
                        player.position.y + player.height, 
                        battleZone1.position.y + battleZone1.height
                        ) -//left side of each being compared
                Math.max(player.position.y, battleZone1.position.y))
            if ( rectangularCollision ({ //battle zone collision!
                rect1 : player,
                rect2: battleZone1
            }) &&
            overlappingArea > player.width * player.height /2 &&//overlaping area between player n battlezone when player is on top -- not necessary code but makes it more realistic
            Math.random() < 0.1 //10% chance that battle occurs
            ) { 
                battle.initiated = true
                window.cancelAnimationFrame(animationId) //removes map n everything from screen
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat:3, //shows battle screen 3 times
                    yoyo: true, //less harsh to the eye
                    duration: 0.5,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity:1, // starts battle screen flash
                            duration : 0.5, //--ease in
                            onComplete(){
                                battleTime(); //calls battle scene
                                gsap.to('#overlappingDiv', {
                                    opacity:0, // removes flash 
                                    duration : 0.5 //--ease out

                                })

                            }
                        })
                    
                    }
                })
                
                console.log("battle zone collision!")
                break
            }
        }
    }

    
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    { //bckground view goes down
        player.animate = true //looping motion within spritesheet
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
        player.animate = true
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
        player.animate = true
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
        player.animate = true
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


const renderedSprites = [rival, weapon]//putting rival before weapon so weapon renders last -- so it + fireball show up on top of canvas
function battleTime() {
    window.requestAnimationFrame(battleTime);
    battleBack.draw()
    // rival.draw()
    // weapon.draw()

    renderedSprites.forEach(sprite => { //by default sprites are gonna be pushed
        sprite.draw()

    })
}

//event listeners for button
document.querySelectorAll('button').forEach((button) => { //clicking attack buttons
    button.addEventListener('click' , (e)=> {
         const selectedAttack = attacks[e.currentTarget.innerHTML] //targets n links attack on attacks.js with HTML buttons
         weapon.attack({
             attack: selectedAttack,
             recipient: rival,
             renderedSprites
        })
        console.log(e.currentTarget.innerHTML)
        //console.log(attacks[e.currentTarget.innerHTML])
        
        
    })
    //console.log('button');
})

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
//animate();
battleTime();
