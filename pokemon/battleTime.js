const weapon = new Monster(fighters.Weapon)
const rival = new Monster(fighters.Rival)
const renderedSprites = [rival, weapon]//putting rival before weapon so weapon renders last -- so it + fireball show up on top of canvas

weapon.attacks.forEach(attack => {
    const button  = document.createElement('button')
    button.innerHTML = attack.name //BUTTON
    document.querySelector('#attacks-box').append(button)

})

function battleTime() {
    window.requestAnimationFrame(battleTime);
    battleBack.draw()
    // rival.draw()
    // weapon.draw()
   // document.querySelector('#attacks-box').append(button)

    renderedSprites.forEach(sprite => { //by default sprites are gonna be pushed
        sprite.draw()

    })
}
const queue = []
//event listeners for button
document.querySelectorAll('button').forEach((button) => { //clicking attack buttons
    button.addEventListener('click' , (e)=> {
         const selectedAttack = attacks[e.currentTarget.innerHTML] //targets n links attack on attacks.js with HTML buttons
         weapon.attack({
             attack: selectedAttack,
             recipient: rival,
             renderedSprites
        })
        const random_attack = rival.attacks[Math.floor[Math.random() * rival.attacks.length]] //randomize which attack is used (Math.floor = python's round())
        console.log(e.currentTarget.innerHTML)
        queue.push(() => {
            rival.attack({
                attack: selectedAttack,
                recipient: weapon,
                renderedSprites
            })
        })
        //console.log(attacks[e.currentTarget.innerHTML])
    })
    button.addEventListener('mouseenter',()=>{ // what to do when button is clicked 
        console.log("attack type")
    })
})

document.querySelector('#dialogue-box').addEventListener('click', (e) => { //e = event object inaide of it
   
    if(queue.length >1){ //if sums been added -- aka attack
        queue[0]() //call attack
        queue.shift()//queue is reset after action
    } else {
        e.currentTarget.style.display = 'none' //remove dialogue box
    }
})