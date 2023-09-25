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

    bottleSound = new Audio('audio/bottle-splash.mp3');
    splashed = false;



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

    /**
     * starts several intervals when thrwoing a bottle
     * @param {*} x x-position of the character
     * @param {*} y y-position of the character
     * @param {*} speed 
     */
    throw(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speedY = 8;
        this.speedX = speed;
        this.downToBottom();
        this.setFlySpeed();
        this.splashAndFlyAnimation();
    }

    /**
     * progress of the bottle in horizontal line (speed)
     */
    setFlySpeed() {
        startInterval(() => {
            this.x += this.speedX;
        }, 50);
    }

    /**
     * animation of the bottle, depending if its still flying or on the ground or hits an enemy
     */
    splashAndFlyAnimation() {
        startInterval(() => {
            if (this.canSplash())        // kommt auf dem Boden auf
                this.splashAnimationAndDeleteBottle();
            else
                this.playAnimation(this.IMAGES_THROW);
        }, 100)
    }

    /**
     * 
     * @returns true when bottle hits ground or enemy
     */
    canSplash() {
        return !this.isAboveGround() || this.speedX == 0
    }

    /**
     * starts animation of the splash and deletes bottle
     */
    splashAnimationAndDeleteBottle() {
        this.speedX = 0;
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteBottle();
    }

    /**
     * play splash sound, delete bottle after 200ms
     */
    deleteBottle() {
        if (!sounds[0].muted && !this.splashed) {
            this.bottleSound.play();
            this.splashed = true;
        }
        setTimeout(() => { delete this.x }, 200);        
    }
}