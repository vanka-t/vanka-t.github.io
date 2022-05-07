const weaponImg = new Image()
weaponImg.src = 'assets-prova/embySprite.png'
const rivalImg = new Image()
rivalImg.src = 'assets-prova/zelda.png'


const fighters = {
    Rival:{
        position: {
            x: 730, // adjust position accordingly based on rival location
            y: 180
        },
        img: rivalImg,
        frames: {
            max:4, //crop pic to 4
            hold: 15
        },
        animate: true,
        isRival: true, //enables  hp bar settings to get attacked
        name: 'ENEMY',
        attacks: [attacks.TACKLE, attacks.THROW]

    },

    Weapon:{
        position: {
            x: 270, // adjust position accordingly based on rival location
            y: 340
        },
        img: weaponImg,
        frames: {
            max:4, //crop pic to 4
            hold: 15
        },
        animate: true,
        isRival: false, //not sure abt thi
        name: 'UR POKEMON',
        attacks: [attacks.TACKLE, attacks.THROW]
    }
    
}