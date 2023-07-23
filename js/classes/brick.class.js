class Brick extends DrawableObject{

    IMAGE = [
        'img/brick.png'
    ];
    offset = {
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
    }


    constructor(x, y){
        super(); 
        this.loadImage('img/brick.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;

    }
}