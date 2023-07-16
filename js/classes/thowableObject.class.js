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





    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.fallingBorder = 660 - this.height;
        // this.loadImages(this.IMAGES_THROW);
        // this.loadImages(this.IMAGES_SPLASH);
        this.throw(this.x, this.y);
        this.smash();
        // this.becomeSlower();
    }


    throw(x, y) {
                this.x = x;
                this.y = y;
                this.speedY = 20;
                this.speedX = 30;
                this.downToBottom();
                setInterval(() => {
                    this. x += this.speedX;
                }, 50);
    }

    smash(){
        setInterval(() => {
            if (!this.isAboveGround()){
                this.speedX = 0;
                this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
                
            }
            
        }, 50)
    }

    
}