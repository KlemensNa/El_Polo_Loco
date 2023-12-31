class Coins extends DrawableObject{

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    
    offset = {
        top: 35,
        right: 35,
        bottom: 35,
        left: 35,
    }

    constructor(x, y){
        super().loadImage('img/8_coin/coin_2.png');
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES);
        this.animate();
    }


    /**
     * starts animation interval
     */
    animate(){
        startInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}