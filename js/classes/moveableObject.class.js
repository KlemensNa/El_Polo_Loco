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

    /**
     * interval to check if is in the air or not and cause an action
     */
    downToBottom() {
        startInterval(() => {
            if (this.isInTheAir())
                this.fallToBottom()
            if (this.isOnGround())
                this.speedY = 0;
        }, 50)
    }

    /**
     * 
     * @returns is already in the air or falls down from somewhere
     */
    isInTheAir() {
        return this.isAboveGround() || this.speedY > 0
    }

    /**
     * calcs acceleartion and deduct value from position to fall
     */
    fallToBottom() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /**
     * 
     * @returns is not in tghe air falling speed is 0 or less
     */
    isOnGround() {
        return this.speedY <= 0 && !this.isAboveGround()
    }

    /**
     * 
     * @returns position is smaller than fix falling border
     */
    isAboveGround() {
        return this.y < this.fallingBorder;
    }

    /**
     * add speed to x-position to move right
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * reduce speed from x-position to move right
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * calcs jumping speed depented on the amounts of coins
     * 
     * @param {*} coins amount of collected coins
     */
    jump(coins) {
        this.speedY = 18 + (coins * 1.8);
    }

    /**
     * 
     * @param {*} mo other animal or item to collite with
     * @returns if there are requirements met of an collision
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&                    // rechts oben mit linksOben-mo
            this.y + this.height - this.offset.bottom - 10 > mo.y + mo.offset.top &&                      // links unten mit linksOben-mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&                                    // links oben mit linksOben-mo
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom                        // links oben mit rechts untenda
    }

    /**
     * 
     * @param {*} mo other animal or item to collite with
     * @returns if there are requirements met of an jumpOf
     */
    jumpOn(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom + 10 > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.offset.top &&
            this.speedY < 0;
    }

    /**
     * functions to interact with bricks added to the world
     * @param {*} mo other animal or item to collite with
     * @returns 
     */
    jumpOnSiteRight(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom &&
            this.x + this.offset.left < mo.x + mo.offset.left - 60 &&
            !this.otherDirection;
    }

    /**
     * functions to interact with bricks added to the world
     * @param {*} mo other animal or item to collite with
     * @returns 
     */
    jumpOnSiteLeft(mo) {
        return this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom &&
            this.x + this.width - this.offset.right > mo.x + mo.width - mo.offset.right + 60 &&
            this.otherDirection;
    }

    /**
     * sets varaiable to 1, so the boss can turn
     */
    charInBack() {
        this.flipBoss = 1;
    }

    /**
     * sets varaiable to 0, so the boss can turn back
     */
    charInFront() {
        this.flipBoss = 0;
    }

    /**
     * 
     * @param {*} mo other animal or item to collite with
     * @returns minimal distance of enemy and character for an attack
     */
    readyToAttack(mo) {
        return this.x - (mo.x + mo.width) < 250
    }

    /**
     * set varaibele to 1, so the boss can attack
     */
    attack() {
        this.range = 1;
    }

    /**
     * set varaibele to 0, so the boss can stop attacking
     */
    dontAttack() {
        this.range = 0;
    }

    /**
     * if enemy or character is not hurt, reduce energy and set lastHit Timer
     * if energy <= 0, then its set to 0
     */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
        }
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }

    /**
     * 
     * @returns if energy is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * 
     * @returns is timespan of last hit less than one second ago
     */
    isHurt() {
        let timespan = (new Date().getTime() - this.lastHit) / 1000;
        return timespan < 1;
    }

    /**
     * add Bottle to inventory if conditions met, set lastAdd variable
     */
    addBottles() {
        if (this.canCollectBottle()) {
            this.bottles += 1;
            this.lastAdd = new Date().getTime();
        }
    }

    /**
     * 
     * @returns true when bottles less than 6
     */
    canCollectBottle() {
        return this.bottles < 6 && !this.hasAdded()
    }

    /**
     * 
     * @returns true if timespan of lastAdd is less than 0.05 seconds 
     */
    hasAdded() {
        let timespan = (new Date().getTime() - this.lastAdd) / 1000;
        return timespan < 0.05;
    }

    /**
     * add coin to inventory if conditions met, set lastAdd variable
     * play coinCollectionsSound
     */
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

    /**
     * 
     * @returns true when coins less than 6
     */
    canCollectCoins() {
        return this.coins < 6 && !this.hasAdded();
    }


    /**
     * reduce energy of enemy if it's not already hurted, set timespan of lastHit
     * if energy is 0, erase the enemy
     * @param {*} enemies array of enemies
     * @param {*} index index of the enemy in the anemyArray
     */
    hitEnemy(enemies, index) {
        if (!this.hurtEnemy()) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            if (this.energy <= 0) {
                this.energy = 0;
                setTimeout(() => enemies.splice(index, 1), 600);
            }
        }
    }

    /**
     *
     * @returns set timespan of last hit of an enemy and return true when its less than a second ago
     */
    hurtEnemy() {
        let timespan = (new Date().getTime() - this.lastHit) / 1000;
        return timespan < 1;
    }

    /**
     * 
     * @returns true when timespan of last keydown is less than 3 seconds
     */
    noKeyPushed() {
        let timespan = (new Date().getTime() - this.keyPushed) / 1000;
        return timespan > 2;
    }
}