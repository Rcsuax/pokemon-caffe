
class Sprite {
    
    constructor(src, x, y, width, height ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.image = new Image()
        this.image.src = src[0]
    }
    
    swap() {
        this.image.sec = src[1]
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
    }

    attack(target) {
        console.log(`${this.name} is attacking ${target.name}`)
        target.hp = target.hp - this.atk
    }
}
