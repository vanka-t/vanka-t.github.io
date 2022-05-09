// const weaponImg = new Image()
// weaponImg.src = 'assets-prova/embySprite.png'
// const rivalImg = new Image()
// rivalImg.src = 'assets-prova/zelda.png'


const fighters = {
    Weapon:{
        position: {
            x: 270, // adjust position accordingly based on rival location
            y: 340
        },
        img:{
            src: 'assets-prova/embySprite.png'
        },
        frames: {
            max:4, //crop pic to 4
            hold: 15
        },
        animate: true,
        isRival: false,
        name: 'UR POKEMON',
        attacks: [attacks.TACKLE, attacks.THROW]
        
    },

    Rival:{
        position: {
            x: 730, // adjust position accordingly based on rival location
            y: 180
        },
        img: {
            src: 'assets-prova/zelda.png'
        },
        frames: {
            max:4, //crop pic to 4
            hold: 15
        },
        animate: true,
        isRival: true, //enables  hp bar settings to get attacked
        name: 'ENEMY',
        attacks: [attacks.TACKLE, attacks.THROW],
        //attackType: 'lil weapon'
        

    }
    
}