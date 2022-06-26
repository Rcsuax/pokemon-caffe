// classes.js
class Sprite {
    constructor(sprites, x, y, width, height ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.sprites = sprites
        this.image = new Image()
        this.image.src = sprites[0]
    }
    
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}


class Pokemon extends Sprite {
    constructor(src, name, x, y, width, height, hp, spe, atk ) {
        super(src, x, y, width, height)
        
        this.name = name;
        this.hp = hp;
        this.spe = spe;
        this.atk = atk;
        this.moves = ['tackle', 'growl', 'barrier', 'intimidate']

        this.spriteIndex = 0 // tracks which sprite to use
    }

    getHTML() {
        return `<p>${ this.name }</p> <p>${ this.hp }</p>`
    }

    swap() {
        this.spriteIndex++
        
        if (this.spriteIndex % 2 == 0 ) {
            this.image.src = this.sprites[0]
        }
        else {
            this.image.src = this.sprites[1]
        }
    }

    attack(target) {
        console.log(`${this.name} is attacking ${target.name}`)
        target.hp = target.hp - this.atk
    }
}
