class Endboss extends MovableObject{
    y = 480;
    height = 150;
    width = 150;
    IMAGES= [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',        
        'img/4_enemie_boss_chicken/2_alert/G7.png',
    ]

    constructor(){
        super().loadImage(this.IMAGES[0]);     
        this.loadImages(this.IMAGES);
        this.x = 800;
        this.animate();       
    }

    animate(){
        // setInterval(() => {
        //     this.playAnimation(this.IMAGES);
        // },150);
    }

   
}