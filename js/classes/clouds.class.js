class Clouds extends MovableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = 0 + Math.random() * 3500;
        this.cloudsMove();
    }

    /**
     * starts moving of clouds in an interval
     */
    cloudsMove() {
        this.speed = 0.2;
        startInterval(() =>
            this.moveLeft(),
            50);
    }
}