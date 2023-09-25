class Chicken extends MovableObject {
    
    IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png']
    
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
    chirped = false;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 430 - this.height;
        this.x = x;
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.jumpen();
        this.downToBottom();
        this.fallingBorder = 430 - this.height;
        this.speed = 2;
        this.jumptime = Math.random() * 500;
        sounds.push(this.chickenSound)
    }

    /**
     * starts several move and sound intervals
     */
    animate() {
        this.moveLeft();
        this.dieing();
        this.chirpSound();
    }


    /**
     * starts interval to jump every two seconds
     */
    jumpen() {
        startInterval(() => {
            if (this.canJump() && !winLose) {
                this.jumpAndSound();
            }
        }, 2000);
    }

    /**
     * move interval to move left and animate the moves
     */
    moveLeft() {
        startInterval(() => {
            if (!this.isDead() && !winLose) {
                super.moveLeft();
                this.playAnimation(this.IMAGES)
            }
        }, 40);
    }

    /**
     * starts animation if chicken is dead
     */
    dieing() {
        startInterval(() => {
            if (this.isDead()) 
                this.playAnimation(this.IMAGES_DEAD);
        }, 150);
    }

    /**
     * 
     * @returns chicken is not already in the air, is alive and not injured
     */
    canJump(){
        return !this.isAboveGround() && !this.isDead() && !this.isHurt() && !winLose
    }

    /**
     * starts jump movement in a ramdom generated time
     */
    jumpAndSound(){
        setTimeout(() => {
            this.speedY = 16;         
        }, this.jumptime);
    }

    /**
     * starts chirpsound and set chirpBoolean to true
     */
    chirpSound() {
        startInterval(() => {
            if (this.isHurt()) {
                if (!sounds[0].muted && !this.chirped){
                    this.chickenSound.play();
                    this.chirped = true
                }                
            }
        }, 150)
    }
}