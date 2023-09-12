class ChickenSmall extends MovableObject {

    IMAGES = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    energy = 20;
    offset = {
        top: 10,
        right: 30,
        bottom: 25,
        left: 15,
    };


    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.height = 90;
        this.width = 90;
        this.x = x;
        this.y = 640 - this.height;
        this.speed = 1 + Math.random() * 5;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.IMAGES)
            }
        }, 40);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
            }

        }, 150);

    }
}