// game.js
console.log("Welcome to the wonderful world of pokemon caffe")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ui1 = document.querySelector('#ui-1')
const ui2 = document.querySelector('#ui-2')
const startButton = document.querySelector('#start-game')


/* SETUP */
const p1  = new Pokemon(['assets/pikachu.png', 'assets/pikachuBack.png'], 'pikachu', 200, 250, 250, 250, 100, 10, 10)
const p2  = new Pokemon(['assets/squirtle.png', 'assets/squirtleBack.png'], 'squirtle', 720, 20, 250, 250, 100, 10, 10)
p2.moves = ['tackle', 'squirt', 'roll', 'splash']

function drawBackground() {
    const backgroundImage = new Image(canvas.width, canvas.height)
    backgroundImage.src = 'assets/battleBackground.png'
    
    ctx.drawImage(backgroundImage, 0, 0)
}

window.onload = () => {
    drawBackground() // only works on safari? / not chrome - but ideally this function should only need to be called once
    startButton.addEventListener('click', () => startOrNext() )
}
/* SETUP END */



const Game = {
    turn: 0,
    state: 'paused', // || "running" || playing
    swap: () => {
        const temp = { x: p1.x, y: p1.y }
        p1.x = p2.x
        p1.y = p2.y
        p2.x = temp.x
        p2.y = temp.y
        p1.swap()
        p2.swap()
    }
}


function startOrNext() {

    const updateButtons = () => {
        let player = Game.turn % 2 === 0 ? p1 : p2
        let other = Game.turn % 2 !== 0  ? p1 : p2

        return player.moves.map( (move, index) => {
            const button = document.querySelector(`#move-${index + 1}`)
            if ( button ) {
                button.innerHTML = `<p>${ move }</p>`
                //TODO: Fix Player not changing attack event handler bug - player.attack is not dynamic
                button.addEventListener('mousedown',  () => player.attack(other)  ) 
            }
        })
    }

    switch(Game.state) {
        case 'paused':
            ui1.style.display = 'block'
            ui2.style.display = 'block'
            startButton.innerHTML = '<p>Next Turn</p>'

            updateButtons()
            p1.swap() // p1 facing wrong way
            Game.state = 'playing'
            break;
        
        case 'playing':

            updateButtons()
            Game.swap()
            Game.turn++
            break;
        
        default:
            break;
    }

}

function main() {
    window.requestAnimationFrame(main)
    
    // Update
    if (Game.state == 'playing' ) {
        
        if( Game.turn % 2 == 0 ) {
            // p1 turn
            ui1.innerHTML = p1.getHTML()
            ui2.innerHTML = p2.getHTML()

            p1.moves.map( (move, index) => {
                const button = document.querySelector(`#move-${index + 1}`)
                if ( button ) button.innerHTML = `<p>${ move }</p>`

                // button.addEventListener('click', p1.attack(p2), { once: true })
            })
        }
        else {
            // p2 turn
            ui1.innerHTML = p2.getHTML()
            ui2.innerHTML = p1.getHTML()

            p2.moves.map( (move, index) => {
                const button = document.querySelector(`#move-${index + 1}`)
                if ( button ) button.innerHTML = `<p>${ move }</p>`
            })
        }
        
    }

    // Render
    drawBackground()
    p1.draw()
    p2.draw()
}

main()

