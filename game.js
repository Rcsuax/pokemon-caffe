// game.js
console.log("Welcome to the wonderful world of pokemon caffe")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ui1 = document.querySelector('#ui-1')
const ui2 = document.querySelector('#ui-2')
const startButton = document.querySelector('#start-game')


/* SETUP */
const Game = {
    turn: 0,
    state: 'inital', // 'paused' || 'playing' || 'gameover'
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

const p1  = new Pokemon(['assets/pikachu.png', 'assets/pikachuBack.png'], 'pikachu', 200, 250, 250, 250, 100, 10, 10)
const p2  = new Pokemon(['assets/squirtle.png', 'assets/squirtleBack.png'], 'squirtle', 720, 20, 250, 250, 100, 10, 10)
p2.moves = ['tackle', 'squirt', 'roll', 'splash']

function drawBackground() {
    const backgroundImage = new Image()
    backgroundImage.src = 'assets/battleBackground.png'
    
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
}

window.onload = () => {
    drawBackground()     // only works on safari? / not chrome - but ideally this function should only need to be called once
    p1.draw()
    p2.draw()
    startButton.addEventListener('click', () => {
        if (Game.state == 'inital') {
            Game.state = 'started'
            window.requestAnimationFrame(main)
        } else if (Game.state == 'playing') {
            Game.swap()
            Game.turn++
        }
    })
}



/* Main */
function main() {
    window.requestAnimationFrame(main)

    switch(Game.state) {
        case 'started':
            startButton.innerHTML = '<p>Next Turn</p>'        
            ui1.style.display = 'block'
            ui2.style.display = 'block'
            ui1.innerHTML = p1.getHTML()
            ui2.innerHTML = p2.getHTML()
            p1.swap() // player starts facing wrong way

            Game.state = 'playing'
            break;

        case 'playing':
            if( Game.turn % 2 == 0 ) {
                // p1 turn
                ui1.innerHTML = p1.getHTML()
                ui2.innerHTML = p2.getHTML()

                p1.moves.map( (move, index) => {
                    const button = document.querySelector(`#move-${index + 1}`)
                    if ( button ) button.innerHTML = `<p>${ move }</p>`
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
        case 'gameover':
            break;
    }

    // Render
    drawBackground()
    p1.draw()
    p2.draw()
}