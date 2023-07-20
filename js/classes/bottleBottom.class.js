class BottleBottom extends MovableObject{
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(x){
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.width = 100;
        this.height = 100;
        this.x = x;
        // this.x = 200 + (Math.random()* 2000); 
        this.y = 650 - this.height; 
        this.loadImages(this.IMAGES);
    }

    
}