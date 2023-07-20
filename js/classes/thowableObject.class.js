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





    constructor(x, y, speed) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.fallingBorder = 660 - this.height;
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(this.x, this.y, this.speed);
    }


    throw(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.speedX = speed;
        this.downToBottom();

        setInterval(() => {
            this.x += this.speedX;
        }, 50);

        setInterval(() => {
            if (!this.isAboveGround() || this.speedX == 0) {        // kommt auf dem Boden auf
                this.speedX = 0;
                this.playAnimation(this.IMAGES_SPLASH);
                this.deleteBottle();
            }
            else {
                this.playAnimation(this.IMAGES_THROW)
            }
        }, 100)
    }

    deleteBottle() {      
        setTimeout(() => {delete this.x}, 200);
    }




}