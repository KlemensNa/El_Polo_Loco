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

    setWorld() {
        this.character.world = this;          // Variable "world" in Object character bekommt alle Variablen von Obejekt "world" --> wichtig für keyboard
    }

    runInterval() {
        startInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkAttackRange();
            this.checkCharInBack();
        }, 16);
    }


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


    canThrowToRight() {
        return keyboard.THROW && this.character.bottles && !this.character.otherDirection > 0 && !this.hasThrown()
    }


    canThrowToLeft() {
        return keyboard.THROW && this.character.bottles && this.character.otherDirection > 0 && !this.hasThrown()
    }


    createBottle(bottle) {
        this.salsaBottles.push(bottle);
        this.character.bottles--;
        this.statusbarBottle.addBottle(this.character.bottles);
    }


    resetTimeParameters() {
        this.lastThrow = new Date().getTime();
        this.character.keyPushed = new Date().getTime();
    }


    hasThrown() {
        let timespan = (new Date().getTime() - this.lastThrow) / 1000;
        return timespan < 0.6;
    }


    checkCollisions() {
        this.CheckCharacterJumpsOnEnemy();
        this.checkEnemyHitsCharacter();
        this.checkCharacterCollectBottle();
        this.checkCharacterCollectCoin();
        this.checkBottleHitsEnemy();
    }


    CheckCharacterJumpsOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterHitsFromAbove(enemy)) {
                this.findAndHitEnemy(enemy);
                this.letCharJump();
                this.hitEndboss(enemy);
            }
        })
    }


    characterHitsFromAbove(enemy) {
        return this.character.jumpOn(enemy) && this.character.speedY < 0 && !this.character.isColliding(enemy)
    }


    findAndHitEnemy(enemy) {
        const index = this.level.enemies.findIndex(enemy => this.character.jumpOn(enemy));
        enemy.hitEnemy(this.level.enemies, index);
    }


    letCharJump() {
        this.character.speedY = 18;
    }


    hitEndboss(enemy){
        if (enemy instanceof Endboss) {
            this.statusbarBoss.setPercentage(enemy.energy);
        }
    }


    checkEnemyHitsCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (this.isEnemyHitting(enemy))
                this.decreaseCharacterHealth()
        })
    }


    isEnemyHitting(enemy) {
        return this.character.isColliding(enemy) && !this.character.jumpOn(enemy) && !enemy.isDead()
    }


    decreaseCharacterHealth() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }


    checkCharacterCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.canCollectBottle(bottle)) {
                this.findBottleAndDelete(bottle);
                this.addBottleToCharacter();
            }
        });
    }


    canCollectBottle(bottle) {
        return this.character.isColliding(bottle)
    }


    findBottleAndDelete() {
        const index = this.level.bottles.findIndex(bottle => this.character.isColliding(bottle));
        if (index !== -1)
            this.level.bottles.splice(index, 1);
    }


    addBottleToCharacter() {
        this.character.addBottles();
        this.statusbarBottle.addBottle(this.character.bottles);
    }


    checkCharacterCollectCoin() {
        this.level.coins.forEach((coin) => {
            if (this.canCollectCoin(coin)) {
                this.findCoinAndDelete();
                this.addCoinToCharacter();
            }
        });
    }


    canCollectCoin(coin) {
        return this.character.isColliding(coin)
    }


    findCoinAndDelete() {
        const index = this.level.coins.findIndex(coin => this.character.isColliding(coin));
        if (index !== -1)
            this.level.coins.splice(index, 1);
    }


    addCoinToCharacter() {
        this.character.addCoin();
        this.statusbarCoins.addBottle(this.character.coins);
    }


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


    canBottleHitEnemy(bottle, enemy) {
        return bottle.isColliding(enemy)
    }


    stopBottle(bottle) {
        bottle.speedY = 0;
        bottle.speedX = 0;
    }


    findAndDeleteHittedEnemy(bottle, enemy) {
        const index = this.level.enemies.findIndex(enemy => bottle.isColliding(enemy));
        enemy.hitEnemy(this.level.enemies, index);
    }


    checkAttackRange() {
        if (this.isEndbossInAttackRange()) {
            this.level.enemies[this.level.enemies.length - 1].attack();
        } else {
            this.level.enemies[this.level.enemies.length - 1].dontAttack();
        }
    }


    isEndbossInAttackRange(){
        return this.level.enemies[this.level.enemies.length - 1].readyToAttack(this.character)
    }


    checkCharInBack() {
        if (this.isCharacterBehindEnboss()) {
            this.level.enemies[this.level.enemies.length - 1].charInBack();
        } else {
            this.level.enemies[this.level.enemies.length - 1].charInFront();
        };
    }


    isCharacterBehindEnboss(){
        return (this.level.enemies[this.level.enemies.length - 1].x +
            this.level.enemies[this.level.enemies.length - 1].width / 2) < (this.character).x
    }


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

    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMaps(element)
        });
    }


    addToMaps(mo) {
        if (mo.otherDirection || mo.flipBoss) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection || mo.flipBoss) {
            this.flipImageBack(mo);
        }
    }


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