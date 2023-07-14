class Coins extends DrawableObject{

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y){
        super().loadImage('img/8_coin/coin_2.png');
        this.width = 140;
        this.height = 140;
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}