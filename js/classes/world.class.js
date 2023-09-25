class World {
    character = new Character();            // gehörrt IMMER in die Welt und werden deswegen darin erzeugt/definiert
    level = level1;                         //alle Variablen aus level1.js werden hier zu einer zusammengefasst
    ctx;
    canvas; //erstelle neue Variable Namens canvas
    keyboard;
    camera_x = 100;
    statusbarHealth = new Statusbar(Statusbar.IMAGES_HEALTHBAR, 10, 10);
    statusbarCoins = new Statusbar(Statusbar.IMAGES_COINBAR, 10, 60);
    statusbarBottle = new Statusbar(Statusbar.IMAGES_BOTTLEBAR, 10, 110);
    statusbarBoss = new Statusbar(Statusbar.IMAGES_BOSSBAR, 530, 70)
    salsaBottles = [];
    endboss = this.level.enemies.length - 1;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');                         // Sammlung von Funktionen um im Canvas etwas hinzuzufügen, zu bearbeiten oder ähnliches
        this.canvas = canvas;                                       //gib erstellter Variablen den Parameter canvas
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runInterval();
    }

    /**
     *  Variable "world" in Object character bekommt alle Variablen von Obejekt "world" --> wichtig für keyboard
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * start Interval with several checkFunctions
     */
    runInterval() {
        startInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkAttackRange();
            this.checkCharInBack();
        }, 16);
    }

    /**
     * creates bottle when condition is met
     */
    checkThrowObjects() {
        if (this.canThrowToRight()) {
            let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right, this.character.y + (this.character.height / 2), 15);
            this.createBottle(bottle);
            this.resetTimeParameters();
        } else if (this.canThrowToLeft()) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + (this.character.height / 2), -25);
            this.createBottle(bottle);
            this.resetTimeParameters();
        }
    }

    /**
     * @returns true if key is pressed, bottles in inventory and direction is right
     */
    canThrowToRight() {
        return keyboard.THROW && this.character.bottles && !this.character.otherDirection > 0 && !this.hasThrown()
    }

    /**
     * @returns true if key is pressed, bottles in inventory and direction is right
     */
    canThrowToLeft() {
        return keyboard.THROW && this.character.bottles && this.character.otherDirection > 0 && !this.hasThrown()
    }

    /**
     * pushs object in array and deletes bottle from inventory
     * @param {*} bottle bottleObject, which was created
     */
    createBottle(bottle) {
        this.salsaBottles.push(bottle);
        this.character.bottles--;
        this.statusbarBottle.addBottle(this.character.bottles);
    }

    /**
     * resets Throw and keyPressed variable
     */
    resetTimeParameters() {
        this.lastThrow = new Date().getTime();
        this.character.keyPushed = new Date().getTime();
    }

    /** 
     * @returns true when last bottleThrow is less than 600ms ago 
     */
    hasThrown() {
        let timespan = (new Date().getTime() - this.lastThrow) / 1000;
        return timespan < 0.6;
    }

    /**
     * check several collisions which can happen in game
     */
    checkCollisions() {
        this.CheckCharacterJumpsOnEnemy();
        this.checkEnemyHitsCharacter();
        this.checkCharacterCollectBottle();
        this.checkCharacterCollectCoin();
        this.checkBottleHitsEnemy();
    }

    /**
     * checks if character jumps on enemy from above
     */
    CheckCharacterJumpsOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterHitsFromAbove(enemy)) {
                this.findAndHitEnemy(enemy);
                this.letCharJump();
                this.hitEndboss(enemy);
            }
        })
    }

    /**
     * @param {*} enemy 
     * @returns true when char hits enemy from top and is on way to ground and there is no other collision
     */
    characterHitsFromAbove(enemy) {
        return this.character.jumpOn(enemy) && this.character.speedY < 0 && !this.character.isColliding(enemy)
    }

    /**
     * search index of enemy in enemiesArray and execute hitFunction 
     * @param {*} enemy 
     */
    findAndHitEnemy(enemy) {
        const index = this.level.enemies.findIndex(enemy => this.character.jumpOn(enemy));
        enemy.hitEnemy(this.level.enemies, index);
    }

    /**
     * sets vertical speed to 18
     */
    letCharJump() {
        this.character.speedY = 18;
    }

    /**
     * execute setPercentage if enemy is the endboss
     * @param {*} enemy 
     */
    hitEndboss(enemy) {
        if (enemy instanceof Endboss) {
            this.statusbarBoss.setPercentage(enemy.energy);
        }
    }

    /**
     * checks if character is colliding with enemy and reduces health
     */
    checkEnemyHitsCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (this.isEnemyHitting(enemy))
                this.decreaseCharacterHealth()
        })
    }

    /**
     * @param {*} enemy 
     * @returns true if enemy is colliding with char and char is not jumping on it
     */
    isEnemyHitting(enemy) {
        return this.character.isColliding(enemy) && !this.character.jumpOn(enemy) && !enemy.isDead()
    }

    /**
     * reduces health of char
     */
    decreaseCharacterHealth() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }

    /**
     * check collision of char and bottle and executes functions
     */
    checkCharacterCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.canCollectBottle(bottle)) {
                this.findBottleAndDelete(bottle);
                this.addBottleToCharacter();
            }
        });
    }

    /**
     * @param {*} bottle 
     * @returns true if colliding
     */
    canCollectBottle(bottle) {
        return this.character.isColliding(bottle)
    }

    /**
     * search for index of the colliding bottle and splice it from the array
     */
    findBottleAndDelete() {
        const index = this.level.bottles.findIndex(bottle => this.character.isColliding(bottle));
        if (index !== -1)
            this.level.bottles.splice(index, 1);
    }

    /**
     * add bottle to inventory
     */
    addBottleToCharacter() {
        this.character.addBottles();
        this.statusbarBottle.addBottle(this.character.bottles);
    }

    /**
     * check for collision of char and coins and executes functions
     */
    checkCharacterCollectCoin() {
        this.level.coins.forEach((coin) => {
            if (this.canCollectCoin(coin)) {
                this.findCoinAndDelete();
                this.addCoinToCharacter();
            }
        });
    }

    /**
     * @param {*} coin 
     * @returns true if colliding
     */
    canCollectCoin(coin) {
        return this.character.isColliding(coin)
    }

    /**
     * search for index of the colliding coin and splice it from the array
     */
    findCoinAndDelete() {
        const index = this.level.coins.findIndex(coin => this.character.isColliding(coin));
        if (index !== -1)
            this.level.coins.splice(index, 1);
    }

    /**
     * add coin to inventory
     */
    addCoinToCharacter() {
        this.character.addCoin();
        this.statusbarCoins.addBottle(this.character.coins);
    }

    /**
     * check collision of thrown bottle with enemy
     */
    checkBottleHitsEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.salsaBottles.forEach((bottle) => {
                if (this.canBottleHitEnemy(bottle, enemy)) {
                    this.stopBottle(bottle);
                    this.findAndDeleteHittedEnemy(bottle, enemy);
                    this.hitEndboss(enemy);
                }
            })
        });
    }

    /**
     * 
     * @param {*} bottle 
     * @param {*} enemy 
     * @returns true when colliding
     */
    canBottleHitEnemy(bottle, enemy) {
        return bottle.isColliding(enemy)
    }

    /**
     * set vertical and horizontal speed to 0
     * @param {*} bottle 
     */
    stopBottle(bottle) {
        bottle.speedY = 0;
        bottle.speedX = 0;
    }

    /**
     * search for index of the enemy coin and splice it from the array
     * @param {*} bottle 
     * @param {*} enemy 
     */
    findAndDeleteHittedEnemy(bottle, enemy) {
        const index = this.level.enemies.findIndex(enemy => bottle.isColliding(enemy));
        enemy.hitEnemy(this.level.enemies, index);
    }

    /**
     * check if endboss is in range to attack the char
     */
    checkAttackRange() {
        if (this.isEndbossInAttackRange()) {
            this.level.enemies[this.level.enemies.length - 1].attack();
        } else {
            this.level.enemies[this.level.enemies.length - 1].dontAttack();
        }
    }

    /**
     * @returns true if readyToAttack function is true
     */
    isEndbossInAttackRange() {
        return this.level.enemies[this.level.enemies.length - 1].readyToAttack(this.character)
    }

    /**
     * checks if char is behind or in front of endboss and executes functions
     */
    checkCharInBack() {
        if (this.isCharacterBehindEnboss()) {
            this.level.enemies[this.level.enemies.length - 1].charInBack();
        } else {
            this.level.enemies[this.level.enemies.length - 1].charInFront();
        };
    }

    /**
     * @returns true if enemy is behind boss
     */
    isCharacterBehindEnboss() {
        return (this.level.enemies[this.level.enemies.length - 1].x +
            this.level.enemies[this.level.enemies.length - 1].width / 2) < (this.character).x
    }

    /**
     * clears canvas, draws all objects on canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);               //Kamera bewegt sich vorm neu zeichnen nach rechts
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.salsaBottles);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMaps(this.statusbarCoins);
        this.addToMaps(this.statusbarHealth);
        this.addToMaps(this.statusbarBottle);
        this.addToMaps(this.statusbarBoss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMaps(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);              //und nach dem zeichen des Levels und der Charaktere wieder nach links
        //draw wird im Takt immer wieder ausgeführt --> Takt je nach Grafikkarte
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * executes addToMaps for every object in the array
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMaps(element)
        });
    }

    /**
     * flip image of boss and char if condition mets
     * @param {*} mo 
     */
    addToMaps(mo) {
        if (mo.otherDirection || mo.flipBoss) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection || mo.flipBoss) {
            this.flipImageBack(mo);
        }
    }

    /**
     * mirrowing whole image and x-axe
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();                                    //speichere alle Standarteigenschaften von Context
        this.ctx.translate(mo.width, 0);                    //spiegeln des Bildes
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;                                   //x-Achse des Elements spiegeln
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}