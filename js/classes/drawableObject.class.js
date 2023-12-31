class DrawableObject{
    x = 0;
    y = 0;
    img;
    height = 0;
    width = 0;
    imgCache = [];
    currentImg = 0;

    /**
     * create new imageVariable and load Image in
     * 
     * @param {*} path img-path of an Image
     */
    loadImage(path){
        this.img = new Image;
        this.img.src = path;
    }

    /**
     * create and imgCache and loads in all Images of an array
     * 
     * @param {*} arr array with Images
     */
    loadImages(arr){        
    arr.forEach((path) => {            
        let img = new Image();
        img.src = path;
        this.imgCache[path] = img;
        });
    }
    
    /**
     * draw Image on canvas
     * 
     * @param {*} ctx canvas on which Images become drawn
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * draws Frames around Images
     * 
     * @param {*} ctx 
     */
    drawFrame(ctx){
        if (this instanceof Brick || this instanceof Character || this instanceof ChickenSmall || this instanceof Chicken || this instanceof Coins || this instanceof Bottle || this instanceof ThrowableObject || this instanceof BottleBottom || this instanceof Endboss){
            ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom -this.offset.top);
        ctx.stroke();
        }
    }

    /**
     * calcs modulo to choose Image of array and save it in a variable
     * 
     * @param {*} images array with Images
     */
    playAnimation(images){
        let i = this.currentImg % images.length;        // i = 0/6 =>  R0
        // i = 1/6 => R1, da 1/6 = 0.166 => 0 R1 bis zur 1
        // i = 2/6 => R2, da 2/6 = 0.33 => 0 R2 bis zur 2   usw.
        // i = 15/6 => R3, da 15/6 = 2.5 => 2 R3 bis zur 15 
        // => Modulo bleibt immer im Bereich von IMAGES_WALKING.length
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImg++;
}
}