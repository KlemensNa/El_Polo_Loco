class World {

    character = new Character();            // gehörrt IMMER in die Welt und werden deswegen darin erzeugt/definiert
    level = level1;                         //alle Variablen aus level1.js werden hier zu einer zusammengefasst
    ctx;
    canvas; //erstelle neue Variable Namens canvas
    keyboard;
    camera_x = 100;
    statusbar = new Statusbar();
    statusbarHealth = new Statusbar(this.statusbar.IMAGES, 10); 
    statusbarCoins = new Statusbar(this.statusbar.IMAGES_COINBAR, 100);    
    statusbarBottle = new Statusbar(this.statusbar.IMAGES_BOTTLEBAR, 190);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');                         // Sammlung von Funktionen um im Canvas etwas hinzuzufügen, zu bearbeiten oder ähnliches
        this.canvas = canvas;                                       //gib erstellter Variablen den Parameter canvas
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;          // Variable "world" in Object character bekommt alle Variablen von Obejekt "world" --> wichtig für keyboard
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);                    
                }
            });
        }, 100);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);               //Kamera bewegt sich vorm neu zeichnen nach rechts
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMaps(this.statusbarCoins);
        this.addToMaps(this.statusbarHealth);
        this.addToMaps(this.statusbarBottle);
        this.ctx.translate(this.camera_x, 0); 
        this.addToMaps(this.character);
        this.addObjectsToMap(this.level.enemies);        
               
        this.ctx.translate(-this.camera_x, 0);              //und nach dem zeichen des Levels und der Charaktere wieder nach links
        // Green rectangle


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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
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