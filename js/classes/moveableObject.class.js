class MovableObject {
    x=120;
    y=250;
    img;
    height = 720;
    width = 960;
    imgCache = [];
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    
    downToBottom(){
        setInterval(() => {
            if(this.y < 420){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        }, 50)
    }

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

    moveRight(){
        console.log('Move right')
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 40);  
    }

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