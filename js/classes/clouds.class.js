class Clouds extends MovableObject {
    x = 0;
    y = 0;
    height = 720;
    width = 960;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = 0 + Math.random() * 1500;
        this.cloudsMove();
    }

    cloudsMove() {
        this.speed = 0.2;

        setInterval(() =>
            this.moveLeft(),
            50);
    }
}