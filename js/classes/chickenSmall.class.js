class ChickenSmall extends MovableObject {

    IMAGES = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    
    energy = 20;
    offset = {
        top: 6,
        right: 16,
        bottom: 18,
        left: 11,
    };
    lilChicken = new Audio('audio/küken.mp3');
    chirped = false;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_DEAD);
        this.height = 60;
        this.width = 60;
        this.x = x;
        this.y = 430 - this.height;
        this.speed = 1 + Math.random() * 5;
        this.animate();
        sounds.push(this.lilChicken)
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
                this.playAnimation(this.IMAGES_DEAD)
        }, 150);
    }

    /**
     * starts chirpsound and set chirpBoolean to true
     */
    chirpSound() {
        startInterval(() => {
            if (this.isHurt()) {
                if (!sounds[0].muted && !this.chirped){
                    this.lilChicken.play();
                    this.chirped = true;
                }                
            }
        }, 150)
    }
}