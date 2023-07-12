class BackgroundObject extends MovableObject{

    width = 980;
    height = 720;
    x = 0;
    y = 0;


    constructor(path, x){
        super().loadImage(path);
        this.x = x;
    }
}