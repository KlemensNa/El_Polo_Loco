class MovableObject extends DrawableObject{
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    fallingBorder;
    energy = 100;
    lastHit = 0;
    
    downToBottom(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        }, 50)
    }

    isAboveGround(){
        return this.y < this.fallingBorder;
    }
    

    moveRight(){
        this.x += this.speed;
         
        this.otherDirection = false;
    }

    moveLeft(){
            this.x -= this.speed;        
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

    //character.isColliding(chicken)
    isColliding(mo){
        return this.x + this.width > mo.x &&                    // rechts oben mit linksOben-mo
            this.y + this.height > mo.y &&                      // links unten mit linksOben-mo 
            this.x < mo.x &&                                    // links oben mit linksOben-mo
            this.y < mo.y + mo.height                           // links oben mit rechts unten
    }

    // isColliding (mo) {
    //     return  (this.x + this.width) >= obj.x && this.x <= (obj.X + obj.width) && 
    //             (this.x + this.offsetY + this.height) >= obj.Y &&
    //             (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    hit(){
        if(!this.isHurt())
        this.energy -= 20;
        this.x -= 150;
        console.log('Energy:', this.energy);
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.energy == 0;
    }

    isHurt(){
        let timespan = (new Date().getTime() - this.lastHit) /1000;
        return timespan < 1;
    }

}