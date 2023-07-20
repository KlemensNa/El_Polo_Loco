class Bottle extends DrawableObject{

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.width = 100;
        this.height = 100;
        this.x = x;
        // this.x = 200 + (Math.random()* 2000); 
        // this.y = 650 - this.height; 
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}