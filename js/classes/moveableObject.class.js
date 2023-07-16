class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;    
    acceleration = 1.5;
    fallingBorder;
    energy = 100;
    bottles = 0;
    coins = 0;
    lastHit = 0;

    downToBottom() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 50)
    }

    isAboveGround() {
        return this.y < this.fallingBorder;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump(coins) {
        this.speedY = 25 + (coins * 1.5);
    }

    // checkBottomContact(){
    //     if (this.y == this.fallingBorder){
    //         this.speedY = (this.coins * 0.2);
    //     }
    // }

    //character.isColliding(chicken)
    isColliding(mo) {
        if (this instanceof Character) {
            return this.x + this.width > mo.x &&                    // rechts oben mit linksOben-mo
                (this.y + (this.height * 0.3)) + (this.height - (this.height * 0.3)) > mo.y &&                      // links unten mit linksOben-mo 
                this.x < mo.x &&                                    // links oben mit linksOben-mo
                (this.y + (this.height * 0.3)) < mo.y + mo.height                           // links oben mit rechts unten
        } else {
            return this.x + this.width > mo.x &&                    // rechts oben mit linksOben-mo
                this.y + this.height > mo.y &&                      // links unten mit linksOben-mo 
                this.x < mo.x &&                                    // links oben mit linksOben-mo
                this.y < mo.y + mo.height                           // links oben mit rechts unten
        }
    }

    // isColliding (mo) {
    //     return  (this.x + this.width) >= obj.x && this.x <= (obj.X + obj.width) && 
    //             (this.x + this.offsetY + this.height) >= obj.Y &&
    //             (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    hit() {
        if (!this.isHurt()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            console.log('Energy:', this.energy);
        }
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timespan = (new Date().getTime() - this.lastHit) / 1000;
        return timespan < 1;
    }

    addBottles() {
        if (this.bottles < 6 && !this.hasAdded()) {
            this.bottles += 1;
            this.lastAdd = new Date().getTime();
            console.log('Bottles:', this.bottles);
        }
    }

    hasAdded() {
        let timespan = (new Date().getTime() - this.lastAdd) / 1000;
        return timespan < 0.1;
    }

    addCoin() {
        if (this.coins < 6 && !this.hasAdded()) {
            this.coins += 1;
            this.lastAdd = new Date().getTime();
            console.log('Coins:', this.coins);
        }
    }

    // enemyIsHurt(){
    //     if(this.enemies.energy = 0){
    //         const index = this.level.enemies.findIndex(bottle => this.level.enemies.isColliding(bottle));
    //             if (index !== -1) {
    //                 this.level.enemies.splice(index, 1);
    //             }
    //     }
    // }

}