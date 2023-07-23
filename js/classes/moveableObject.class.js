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
        this.speedY = 25 + (coins * 1.8);
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&                    // rechts oben mit linksOben-mo
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&                      // links unten mit linksOben-mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&                                    // links oben mit linksOben-mo
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom                        // links oben mit rechts untenda
    }
    
    jumpOn(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&                    // rechts oben mit linksOben-mo
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&                      // links unten mit linksOben-mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&                                    // links oben mit linksOben-mo
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&   // this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&                      // links oben mit rechts untenda
            this.speedY < 0;
    }

    jumpUnder(mo){
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&                    // rechts oben mit linksOben-mo
            // this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&                      // links unten mit linksOben-mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&                                    // links oben mit linksOben-mo
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.speedY > 0.5; 
    }

    charInBack() {
        this.flipBoss = 1;
    }

    charInFront() {
        this.flipBoss = 0;
    }

    readyToAttack(mo) {
        return this.x - (mo.x + mo.width) < 350
    }

    attack() {
        this.range = 1;

    }

    dontAttack() {
        this.range = 0;
    }

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
        return timespan < 0.05;
    }

    addCoin() {
        if (this.coins < 6 && !this.hasAdded()) {
            this.coins += 1;
            this.lastAdd = new Date().getTime();
            console.log('Coins:', this.coins);
        }
    }

    hitEnemy(enemies, index) {
        if (!this.hurtEnemy()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            if (this.energy <= 0) {
                this.energy = 0;

                setTimeout(() => { enemies.splice(index, 1) }, 600);
            }
        }
    }

    hurtEnemy() {
        let timespan = (new Date().getTime() - this.lastHit) / 1000;
        return timespan < 1;
    }

    noKeyPushed() {
        let timespan = (new Date().getTime() - this.keyPushed) / 1000;
        return timespan > 5;
    }





}