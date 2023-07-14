class DrawableObject{
    x = 0;
    y = 0;
    img;
    height = 0;
    width = 0;
    imgCache = [];
    currentImg = 0;


    loadImage(path){
        this.img = new Image;
        this.img.src = path;
    }

    loadImages(arr){        
    arr.forEach((path) => {            
        let img = new Image();
        img.src = path;
        this.imgCache[path] = img;
        });
    }
    
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken){      // filtert nur Instanzen von Character und Chicken
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'green';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }
}