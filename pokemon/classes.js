class Sprite { //character movement
    constructor({position, velocity, img, frames = {max: 1}}) {
        this.position = position //position
        this.img = img 
        this.frames = {...frames, val: 0, elapsed:0}
        this.img.onload = () => {
            this.width = this.img.width / this.frames.max
            this.height = this.img.height 
            console.log(this.width, this.height)

        }
        this.moving = false
    }

    draw() {
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
            this.img.height
        )

        if (!this.moving) return //if moving == True, return
            if (this.frames.max > 1) {  //slow down loop animation
                this.frames.elapsed += 1
            }
            if (this.frames.elapsed % 10 === 0){ 
                if (this.frames.val  < this.frames.max - 1){
                    this.frames.val ++ //going through the sprite sheet
                } else {
                    this.frames.val = 0 //loops thru the sheet
                }
            }
        
        
        
    }
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
        c.fillStyle = ' rgba(0,0,0,0)'//'black'
        c.fillRect(this.position.x, this.position.y, this.width,this.height)//this.width, this.height)
    }
}