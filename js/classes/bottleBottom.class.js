class BottleBottom extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
    offset = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 30,
    }

    constructor(x) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.width = 70;
        this.height = 70;
        this.x = x;
        this.y = 430 - this.height;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animations of the Bottle on the ground
     */
    animate() {
        startInterval(() => this.playAnimation(this.IMAGES), 700);
    }
}

