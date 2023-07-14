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
        // this.x -= 150;
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