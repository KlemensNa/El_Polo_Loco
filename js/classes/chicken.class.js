class Chicken extends MovableObject {
    
    IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    height = 60;
    width = 60;
    currentImg = 0;
    energy = 20;
    offset = {
        top: 6,
        right: 13,
        bottom: 13,
        left: 6,
    }
    chickenSound = new Audio('audio/chicken.mp3');

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 430 - this.height;
        this.x = x;
        this.loadImages(this.IMAGES);
        this.animate();
        this.jumpen();
        this.downToBottom();
        this.fallingBorder = 430 - this.height;
        this.speed = 2;
        this.jumptime = Math.random() * 500;
        sounds.push(this.chickenSound)
    }

    animate() {
        this.moveLeft();
        this.dieing();
        this.chirpSound();
    }

    jumpen() {
        startInterval(() => {
            if (this.canJump()) {
                this.jumpAndSound();
            }
        }, 2000);
    }

    moveLeft() {
        startInterval(() => {
            if (!this.isDead()) {
                super.moveLeft();
                this.playAnimation(this.IMAGES)
            }
        }, 40);
    }

    dieing() {
        startInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
        }, 150);
    }

    canJump(){
        return !this.isAboveGround() && !this.isDead() && !this.isHurt()
    }


    jumpAndSound(){
        setTimeout(() => {
            this.speedY = 16;         
        }, this.jumptime);
    }


    chirpSound() {
        startInterval(() => {
            if (this.isHurt()) {
                if (!sounds[0].muted){
                    this.chickenSound.play();
                }                
                setTimeout(() => { this.chickenSound.pause() }, 600)
            }
        }, 150)
    }
}