console.log("Welcome to the wonderful world of pokemon caffe");

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ui = document.querySelector('#user-interface')
const startButton = document.querySelector('#start-game')

startButton.addEventListener('click', () => {
    game(p1, p1)
})

const p1  = new Pokemon('assets/pikachu.png', 'pikachu', 200, 250, 250, 250, 100, 10, 10)

function drawBackground() {
    const backgroundImage = new Image(canvas.width, canvas.height)
    backgroundImage.src = 'assets/battleBackground.png'
    
    ctx.drawImage(backgroundImage, 0, 0)
}

function draw() {
    window.requestAnimationFrame(draw)
    
    drawBackground()

    ui.innerHTML = `
        <p>${ p1.name }</p>
        <p>${ p1.hp }</p>
    `
    p1.draw()
}

draw()



let gameState = true
let turns = 0

function game(pokemon1, pokemon2) {
    while (gameState) {
        let first
        let second 
    
        // decide who goes first
        if (pokemon1.spe > pokemon2.spe) {
            first = pokemon1
            second = pokemon2
        }
        else {
            first = pokemon2
            second = pokemon1
        }
        
        // pokemon hp = hp - (attack - defence)
        first.attack(second)
    
        // check if pokemon is dead
        if (second.hp <= 0) {
            console.log(`Thats Game! ${first.name} wins!`)
            gameState = false
        } 
        else {
            second.attack(first)
            if (first.hp <= 0) {
                console.log(`Thats Game! ${second.name} wins!`)
                gameState = false
            }
        }
        // update turn count
        turns++
    }
}
