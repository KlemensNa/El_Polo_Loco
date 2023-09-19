class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    offset = {
        top: 12,
        right: 30,
        bottom: 20,
        left: 22,
    }

    bottleSound =  new Audio('audio/bottle-splash.mp3');



    constructor(x, y, speed) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.width = 70;
        this.height = 70;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.fallingBorder = 430 - this.height;
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(this.x, this.y, this.speed);
        sounds.push(this.bottleSound)   
    }


    throw(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speedY = 8;
        this.speedX = speed;
        this.downToBottom();

        startInterval(() => {
            this.x += this.speedX;
        }, 50);

        startInterval(() => {
            if (!this.isAboveGround() || this.speedX == 0) {        // kommt auf dem Boden auf
                this.speedX = 0;
                this.playAnimation(this.IMAGES_SPLASH);
                this.deleteBottle();      
            }else {
                this.playAnimation(this.IMAGES_THROW);
                
            }
        }, 100)
    }

    deleteBottle() {    
        if(!sounds[0].muted){
            this.bottleSound.play()
        }
        setTimeout(() => {delete this.x}, 200);
        setTimeout(() => {this.bottleSound.pause();}, 400);
        
    }




}