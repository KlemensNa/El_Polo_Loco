class ChickenSmall extends MovableObject {

    IMAGES = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    energy = 20;
    offset = {
        top: 6,
        right: 16,
        bottom: 18,
        left: 11,
    };
    lilChicken = new Audio('audio/küken.mp3');

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.height = 60;
        this.width = 60;
        this.x = x;
        this.y = 430 - this.height;
        // this.speed = 1 + Math.random() * 5;
        this.animate();
    }

    animate() {

        startInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.IMAGES)
            }
        }, 40);

        startInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
            }
        }, 150);

        startInterval(() => {
            if(this.isHurt()){
                this.lilChicken.play();
                setTimeout(() => {this.lilChicken.pause()}, 300)
            }
        }, 150)

    }
}