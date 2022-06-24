console.log("Welcome to the wonderful world of pokemon caffe");

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ui1 = document.querySelector('#ui-1')
const ui2 = document.querySelector('#ui-2')
const startButton = document.querySelector('#start-game')
const endButton = document.querySelector('#end-game')


/* SETUP */
const p1  = new Pokemon(['assets/pikachu.png', 'assets/pikachu.png'], 'pikachu', 200, 250, 250, 250, 100, 10, 10)
const p2  = new Pokemon(['assets/squirtle.png', 'assets/squirtleBack.png'], 'squirtle', 720, 20, 250, 250, 100, 10, 10)

function drawBackground() {
    const backgroundImage = new Image(canvas.width, canvas.height)
    backgroundImage.src = 'assets/battleBackground.png'
    
    ctx.drawImage(backgroundImage, 0, 0)
}

window.onload = () => {
    // drawBackground()
    startButton.addEventListener('click', () => startGame(p1, p1) )
    // startButton.addEventListener('click', () => gameState )
}
/* SETUP END */


function main() {
    window.requestAnimationFrame(main)
    
    // Update
    ui1.innerHTML = `
        <p>${ p1.name }</p>
        <p>${ p1.hp }</p>
    `
    ui2.innerHTML = `
        <p>${ p2.name }</p>
        <p>${ p2.hp }</p>
    `

    // Render
    drawBackground()
    p1.draw()
    // p2.swap()
    p2.draw()
}


const Game = {
    turn: 0,
    state: "paused", // || "running"
}

main()

