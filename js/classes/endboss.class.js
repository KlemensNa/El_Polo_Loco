class Endboss extends MovableObject{
    y = 250;
    height = 400;
    width = 400;

    IMAGES= [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',        
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',        
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    currentImg = 0;

    constructor(){
        super().loadImage(this.IMAGES[7]);     
        this.loadImages(this.IMAGES);
        this.x = 2600;
        this.animate();       
    }

    animate(){
        setInterval(() => {            
                this.playAnimation(this.IMAGES);            
        }, 150);
    }

   
}