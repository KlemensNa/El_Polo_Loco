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
    coinSounds = new Audio('audio/cash.mp3');


    downToBottom() {
        startInterval(() => {
            if (this.isInTheAir())
                this.fallToBottom()
            if (this.isOnGround())
                this.speedY = 0;
        }, 50)
    }


    isInTheAir() {
        return this.isAboveGround() || this.speedY > 0
    }


    fallToBottom() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    isOnGround() {
        return this.speedY < 0 && !this.isAboveGround()
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
        this.speedY = 18 + (coins * 1.8);
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&                    // rechts oben mit linksOben-mo
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&                      // links unten mit linksOben-mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&                                    // links oben mit linksOben-mo
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom                        // links oben mit rechts untenda
    }


    jumpOn(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom + 20 > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.offset.top &&
            this.speedY < 0;
    }

    /**
     * functions to inteact with bricks added to the world
     * @param {*} mo 
     * @returns 
     */
    jumpOnSiteRight(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom &&
            this.x + this.offset.left < mo.x + mo.offset.left - 60 &&
            !this.otherDirection;
    }


    jumpOnSiteLeft(mo) {
        return this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom &&
            this.x + this.width - this.offset.right > mo.x + mo.width - mo.offset.right + 60 &&
            this.otherDirection;
    }


    charInBack() {
        this.flipBoss = 1;
    }


    charInFront() {
        this.flipBoss = 0;
    }


    readyToAttack(mo) {
        return this.x - (mo.x + mo.width) < 250
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
        if (this.canCollectBottle()) {
            this.bottles += 1;
            this.lastAdd = new Date().getTime();
        }
    }


    canCollectBottle(){
        return this.bottles < 6 && !this.hasAdded()
    }


    hasAdded() {
        let timespan = (new Date().getTime() - this.lastAdd) / 1000;
        return timespan < 0.05;
    }


    addCoin() {
        if (this.canCollectCoins()) {
            this.coins += 1;
            this.lastAdd = new Date().getTime();
            if (!sounds[0].muted) {
                this.coinSounds.play();
                setTimeout(() => { this.coinSounds.pause() }, 500)
            }
        }
    }


    canCollectCoins(){
        return this.coins < 6 && !this.hasAdded();
    }


    hitEnemy(enemies, index) {
        if (!this.hurtEnemy()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            if (this.energy <= 0) {
                this.energy = 0;
                setTimeout(() => enemies.splice(index, 1) , 600);
            }
        }
    }


    hurtEnemy() {
        let timespan = (new Date().getTime() - this.lastHit) / 1000;
        return timespan < 1;
    }


    noKeyPushed() {
        let timespan = (new Date().getTime() - this.keyPushed) / 1000;
        return timespan > 3;
    }





}