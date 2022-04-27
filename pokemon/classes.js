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