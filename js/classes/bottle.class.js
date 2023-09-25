class Bottle extends DrawableObject{

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    
    offset = {
        top: 12,
        right: 25,
        bottom: 12,
        left: 25,
    }


    constructor(x){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.width = 70;
        this.height = 70;
        this.y = 300;
        this.x = x;
    }    
}