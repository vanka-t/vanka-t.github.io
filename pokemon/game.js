const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //ctx = context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'blue'
c.fillRect(0,0,canvas.width,canvas.height);

const bckground = new Image()
bckground.src = 'assets-prova/map.png'

bckground.onload = () => {
    c.drawImage(bckground,-800,-350)// change starting position of background

}
