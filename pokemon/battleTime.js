const battleBackImg = new Image() //BATTLE BACKGROUND
battleBackImg.src = 'assets-prova/battleGround.png'

const battleBack  = new Sprite({position: {
    x:0,
    y:0
},
img: battleBackImg
})
let weapon //declaring it here so it refernces function --> program runs the same no matter how many times u enter battleZone in one game
let rival
let renderedSprites 

let battleTimeId //decclare so its easier to take the whole battle scene in and out of game
let queue 
function initBattle(){ //inititalizing battle
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogue-box').style.display = 'none'
    document.querySelector('#rival-hp').style.width = '100%' //sets scores back to 100%
    document.querySelector('#player-hp').style.width = '100%' //sets scores back to 100%
    document.querySelector('#attacks-box').replaceChildren() //removes everything and resets it
    weapon = new Monster(fighters.Weapon)
    rival = new Monster(fighters.Rival)
    renderedSprites = [rival, weapon]//putting rival before weapon so weapon renders last -- so it + fireball show up on top of canvas
    queue = []
    weapon.attacks.forEach((attack) => {
        const button  = document.createElement('button')
        button.innerHTML = attack.name //BUTTON
        document.querySelector('#attacks-box').append(button)
    
    })
}


function battleTime() {
    battleTimeId = window.requestAnimationFrame(battleTime);
    battleBack.draw()
    // rival.draw()
    // weapon.draw()
   // document.querySelector('#attacks-box').append(button)

    renderedSprites.forEach((sprite) => { //by default sprites are gonna be pushed
        sprite.draw()

    })

    //event listeners for button
document.querySelectorAll('button').forEach((button) => { //clicking attack buttons
    button.addEventListener('click' , (e)=> {
        const selectedAttack = attacks[e.currentTarget.innerHTML] //targets n links attack on attacks.js with HTML buttons
        weapon.attack({
             attack: selectedAttack,
             recipient: rival,
             renderedSprites
        })
        if (rival.health <= 0) { //only fights while still having health points
            queue.push(() => {
                rival.faint()
            })
            queue.push(() => {
                gsap.to('#overlappingDiv', { // game over fade into black
                    opacity: 1,
                    onComplete: ()=> {
                        cancelAnimationFrame(battleTimeId)
                        animate() //back to game
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv', { //remove transition frame
                            opacity: 0
                        })
                        battle.initiated = false
                        audio.Map.play()
                    }
                })
            })
            

        }

        const randomAttack = rival.attacks[Math.floor[Math.random() * rival.attacks.length]] //randomize which attack is used (Math.floor = python's round())
        queue.push(() => {
            rival.attack({
                attack: randomAttack,
                recipient: weapon,
                renderedSprites
           })
           if (weapon.health <= 0) { //only fights while still having health points
            queue.push(() => {
                weapon.faint()//ptherwise fails
            })
            queue.push(() => {    
                gsap.to('#overlappingDiv', { // game over fade into black
                        opacity: 1,
                        onComplete: ()=> {
                            cancelAnimationFrame(battleTimeId)
                            animate() //back to game
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', { //remove transition frame
                                opacity: 0
                            })
                            battle.initiated = false //gonna control whether we can move animation in map when returning
                            audio.Map.play()
                        }
                    })
                })   

            }
        })
        
        
        console.log(e.currentTarget.innerHTML)
       
        
        //console.log(attacks[e.currentTarget.innerHTML])
    })
    button.addEventListener('mouseenter',(e)=>{ // what to do when u hover on button  
        
        const selectedAttack = attacks[e.currentTarget.innerHTML] //TARGET
        console.log(selectedAttack)
        document.querySelector('#attack-type').innerHTML = selectedAttack.attackType //change text
        document.querySelector('#attack-type').style.color = selectedAttack.color //change color
    })
})

}
animate();
// initBattle();
// battleTime();



document.querySelector('#dialogue-box').addEventListener('click', (e) => { //e = event object inaide of it
    if(queue.length >1){ //if sums been added -- aka attack
        queue[0]() //call attack
        queue.shift()//queue is reset after action
    } else {
        e.currentTarget.style.display = 'none' //remove dialogue box
    }
})



