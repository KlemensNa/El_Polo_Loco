class Clouds extends MovableObject{
    x = 0;
    y = 0;
    height = 720;
    width = 960;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/full.png');

        this.cloudsMove();
        }
    
    cloudsMove(){
        this.speed = 0.1;
        this.moveLeft();      
    }
}