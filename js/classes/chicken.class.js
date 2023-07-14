class Chicken extends MovableObject{    
    height = 90;
    width = 90;
    IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImg = 0;

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 640 - this.height; 
        this.x = 500 + (Math.random()* 2000);        
        this.loadImages(this.IMAGES);
        this.animate();
        this.speed = 1 + Math.random() * 1;
    }

    animate(){
        
        setInterval(() => {
            this.moveLeft();
        }, 40);  
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        },150);
    }



}