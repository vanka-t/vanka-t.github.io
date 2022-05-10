pixels = 40.5 //pixel size of tiles after zooming in at 400% == x(original pixels) * 4 (400%)

class Sprite { //character movement
    constructor({position, velocity, img, frames = {max: 1, hold:10}, sprites, animate=false, rotation = 0}){//, attackType}) {
        this.position = position //position
        this.img = new Image()
        this.frames = {...frames, val: 0, elapsed:0}
        this.img.onload = () => {
            this.width = this.img.width / this.frames.max
            this.height = this.img.height 
            //console.log(this.width, this.height)

        }
        this.img.src = img.src
        this.animate = animate // to loop sprites that dont need keyPressed to make them move, but move automatically
        this.sprites = sprites //changing between sections of sprite sheet (left right up down etc)
        this.opacity = 1
        //this.attackType = attackType 
        this.rotation = rotation 

    }

    draw() {
        c.save()//everything between this and c.restore is a global variable that affects all
        
        c.translate(this.position.x + this.width/2, this.position.y + this.height/2) //ala p5 -- moves canvas point to center of weapon
        c.rotate(this.rotation) //1 radians
        c.translate(-this.position.x - this.width/2, -this.position.y - this.height/2) //rotate everything back
        c.globalAlpha = this.opacity
        //c.drawImage(this.img,this.position.x, this.position.y)// change starting position of background
        c.drawImage(
            this.img,
            //cropping of char.png
            this.frames.val * this.width, //xpos 
            0, //ypos
            this.img.width/ this.frames.max,
            this.img.height,
            //actual position of char
            this.position.x,
            this.position.y,
            this.img.width / this.frames.max,
            this.img.height,

            
        )
        c.restore()

        if (!this.animate) return //if moving == True, return
            if (this.frames.max > 1) {  //slow down loop animation
                this.frames.elapsed ++
            }
            if (this.frames.elapsed % this.frames.hold === 0){  //"hold == rate of speed of animation
                if (this.frames.val  < this.frames.max - 1){
                    this.frames.val ++ //going through the sprite sheet
                } else {
                    this.frames.val = 0 //loops thru the sheet
                }
            }

    }
}


class Monster extends Sprite {
    constructor({position, velocity, img, frames = {max: 1, hold:10}, sprites, animate=false, isRival = false, rotation =0, name, attacks}){
        super({ //follows parent params
            position, velocity, img, frames, sprites, animate, rotation

        })
        this.health = 100 //max health hp bar
        this.isRival = isRival
        this.rotation = rotation
        this.name = name
        this.attacks = attacks
    }
    faint(){
        document.querySelector('#dialogue-box').innerHTML = this.name + 'FAINTED!' //formatting
        gsap.to(this.position, { //smoothly falls
            y: this.position.y + 20
        })
        gsap.to(this, { //smoothly disappears
            opacity: 0
        })
        audio.victory.play()
    }
    attack({attack, recipient, renderedSprites}){
        if (attack !== undefined) {
            document.querySelector('#dialogue-box').style.display = 'block' //show dialogue
            document.querySelector('#dialogue-box').innerHTML = 
            this.name + ' USED ' + attack.name + '!' //formatting
            recipient.health -= attack.damage //sa her q e gjun te ulet score repeatedly --declaring health points here so taht its updated during loops
           
            
            let hpBar = '#rival-hp'
            if (this.isRival) {hpBar = '#player-hp'} 
            let rotation = 5
            if (this.isRival) {
                rotation = -5
            }
    
    
            switch (attack.name) { 
                case 'THROW':
                    audio.initThrowBallSound.play()
                   
                    const throwBallImg = new Image()
                    throwBallImg.src = 'assets-prova/bubble-throw.png'
                    const throwBall = new Sprite({
                        position: {
                            x: this.position.x, // adjust position accordingly based on rival location
                            y: this.position.y
                        },
                        img: throwBallImg,
                        frames: {
                            max:4, //crop pic to 4
                            hold: 15
                        },
                        animate: true,
                        rotation //rotates  1 radians when rthown off
                    })
    
                    renderedSprites.splice(1,0, throwBall) //like python list.insert -- adding throwball in idx 1 of array so that its rendered appropriately//also 0 cause were not replacing anything
                    //
    
                    gsap.to(throwBall.position, {
                        x: recipient.position.x,
                        y: recipient.position.y,
                        onComplete: () => {
                            audio.throwBallSound.play()
                            //shake enemy after being hit w throwball
                            gsap.to(hpBar,{
                                width: recipient.health + '%'
                                
                            })
                            gsap.to(recipient.position, { //MOVEMENT of enemy when attacked
                                x: recipient.position.x + 10, //enemy jerks back
                                yoyo: true, //move back n forth according to x
                                duration: 0.1, 
                                repeat: 5 //repeat 5 times to imitate pokemon style
                            })
                            gsap.to(recipient, { //makes enemy invisible when hit n normal again (for dramatic og pokemon effect)
                                opacity: 0,
                                yoyo:true,
                                duration:0.2,
                                repeat:3
                            })
                            //remove throwBall
                            renderedSprites.splice(1,1) //from idx 1 of array remove 1 element -- removes throwBall from canvas
                        }
                    })
    
    
                    break
                case 'TACKLE': //if choosing tackle, run this
                //document.querySelector('#dialogue-box').innerHTML = 'TACKLE TIME WOOOO'
                    const timeline = gsap.timeline()
                    let movingDist = 20
                    if(this.isRival) { //if its true that this is the rival, make it move back
                    movingDist = -20
                    }
          
    
            timeline.to(this.position, { //moving(vrull) when ur about to attack 
                x: this.position.x - movingDist
                //duration: 0.05
            }).to(this.position, {
                x: this.position.x + movingDist*2, //go right 40 px -- attacking
                duration: 0.09, //faster motion
                onComplete: () => {
                    audio.tackleSound.play()
    
                    //lower enemy hp bar
                    console.log("hp bar:", hpBar)
                    console.log("recipient",recipient)
                    console.log("hp health:", recipient.health)
                    console.log("attack.damage",recipient.health )
                    
                    
                    gsap.to(hpBar,{
                        
                        width: recipient.health  + '%'
                        
                    })
    
                    gsap.to(recipient.position, { //MOVEMENT of enemy when attacked
                        x: recipient.position.x + 10, //enemy jerks back
                        yoyo: true, //move back n forth according to x
                        duration: 0.1, 
                        repeat: 5 //repeat 5 times to imitate pokemon style
                    })
                    gsap.to(recipient, { //makes enemy invisible when hit n normal again (for dramatic og pokemon effect)
                        opacity: 0,
                        yoyo:true,
                        duration:0.2,
                        repeat:3
                    })
                }
            }).to(this.position, {
                x: this.position.x, //player returns to roiginal pos after attacking
                //duration: 0.05
            })
            break
            }
    
        }
       
        
        
        
    }
 

}


class Boundary {
    static width = pixels
    static height = pixels 
    constructor({position}) {
        this.position = position
        this.width = pixels 
        this.height = pixels 
    }

    draw() {
        c.fillStyle = ' rgba(0,0,0,0)'//'black'
        c.fillRect(this.position.x, this.position.y, this.width,this.height)//this.width, this.height)
    }
}
