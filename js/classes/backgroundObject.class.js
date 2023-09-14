class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;
    x = 0;
    y = 0;


    constructor(path, x){
        super().loadImage(path);
        this.x = x;
    }
}