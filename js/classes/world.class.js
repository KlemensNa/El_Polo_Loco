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
        if (keyboard.THROW && this.character.bottles && !this.character.otherDirection > 0 && !this.hasThrown()) {
            let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right, this.character.y + (this.character.height / 2), 15);
            this.salsaBottles.push(bottle);
            this.character.bottles--;
            this.statusbarBottle.addBottle(this.character.bottles);
            this.lastThrow = new Date().getTime();
            this.character.keyPushed = new Date().getTime(); 
        } else if (keyboard.THROW && this.character.bottles && this.character.otherDirection > 0 && !this.hasThrown())  {
            let bottle = new ThrowableObject(this.character.x , this.character.y + (this.character.height / 2), -25);
            this.salsaBottles.push(bottle);
            this.character.bottles--;
            this.statusbarBottle.addBottle(this.character.bottles);
            this.lastThrow = new Date().getTime();
            this.character.keyPushed = new Date().getTime(); 
        }
    }    

    hasThrown() {
        let timespan = (new Date().getTime() - this.lastThrow) / 1000;
        return timespan < 0.6;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpOn(enemy) && this.character.speedY < 0) {

                const index = this.level.enemies.findIndex(enemy => this.character.jumpOn(enemy));
                    enemy.hitEnemy(this.level.enemies, index);
                    this.character.speedY = 18;
                    if (enemy instanceof Endboss){
                        this.statusbarBoss.setPercentage(enemy.energy);
                    }
            }
        });
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.jumpOn(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                //Index suchen und dann löschen
                const index = this.level.bottles.findIndex(bottle => this.character.isColliding(bottle));
                if (index !== -1) {
                    this.level.bottles.splice(index, 1);
                }
                this.character.addBottles();
                this.statusbarBottle.addBottle(this.character.bottles);
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                const index = this.level.coins.findIndex(coin => this.character.isColliding(coin));
                if (index !== -1) {
                    this.level.coins.splice(index, 1);
                }
                this.character.addCoin();
                this.statusbarCoins.addBottle(this.character.coins);
            }
        });
        this.level.enemies.forEach((enemy) => {
            this.salsaBottles.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    bottle.speedY = 0;
                    bottle.speedX = 0;
                    const index = this.level.enemies.findIndex(enemy => bottle.isColliding(enemy));
                    enemy.hitEnemy(this.level.enemies, index);
                    if (enemy instanceof Endboss){
                        console.log('Hola')
                        this.statusbarBoss.setPercentage(enemy.energy);
                    }

                }
            })
        });
        // this.level.brick.forEach((bric) => {
        //     if (this.character.jumpUnder(bric)) {
        //         this.character.speedY = 0;
        //     } 
        // });
        // this.level.brick.forEach((bric) => {
        //     if (this.character.jumpOnSiteRight(bric)) {
        //         this.character.x = bric.x + bric.offset.right - this.character.width + this.character.offset.right;
        //         this.character.speedY = 0;
        //     } 
        // });
        // this.level.brick.forEach((bric) => {
        //     if (this.character.jumpOnSiteLeft(bric)) {
        //         this.character.x = bric.x + bric.width - bric.offset.left -  this.character.offset.left;
        //         this.character.speedY = 0;
        //     } 
        // });
    }

    checkAttackRange(){
        if(this.level.enemies[this.level.enemies.length - 1].readyToAttack(this.character)){
            this.level.enemies[this.level.enemies.length - 1].attack();
        }else{
            this.level.enemies[this.level.enemies.length - 1].dontAttack();
        }
    }    

    checkCharInBack(){
        if((this.level.enemies[this.level.enemies.length - 1].x + 
        this.level.enemies[this.level.enemies.length - 1].width/2) < (this.character).x){
            this.level.enemies[this.level.enemies.length - 1].charInBack();
        } else {
            this.level.enemies[this.level.enemies.length - 1].charInFront();
        };
    }

    // hier
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);               //Kamera bewegt sich vorm neu zeichnen nach rechts
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        // this.addObjectsToMap(this.level.brick);
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