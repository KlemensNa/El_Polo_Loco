class Coins extends DrawableObject{

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.width = 140;
        this.height = 140;
        // this.x = 400;
        // this.y = 490;
        this.x = 200 + (Math.random()* 2000); 
        this.y = 200 + (Math.random()* 200); 
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}