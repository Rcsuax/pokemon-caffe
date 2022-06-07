console.log("Welcome to the wonderful world of pokemon caffe");

const canvas = document.getElementById("canvas")

class Pokemon {
    constructor(name, hp, spe, atk) {
        this.name = name;
        this.hp = hp;
        this.spe = spe;
        this.atk = atk;
    }

    attack(target) {
        console.log(`${this.name} is attacking ${target.name}`)
        target.hp = target.hp - this.atk
    }
}


const p1  = new Pokemon("pikachu", 100, 10, 10)
const p2 = new Pokemon("squirtle", 100, 5, 10)
const p3 = new Pokemon("charmander", 100, 7, 12)


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

game(p1, p2)