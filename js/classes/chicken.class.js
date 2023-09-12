class Chicken extends MovableObject {
    height = 90;
    width = 90;
    IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImg = 0;
    energy = 20;
    offset = {
        top: 10,
        right: 20,
        bottom: 20,
        left: 10,
    }

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 640 - this.height;
        this.x = x;
        this.loadImages(this.IMAGES);
        this.animate();
        this.jumpen();
        this.downToBottom();
        this.fallingBorder = 640 - this.height;
        this.speed = 2;
        this.jumptime = Math.random() * 500;
    }

    animate() {

        setInterval(() => {
            if(!this.isDead()){
            this.moveLeft();
            this.playAnimation(this.IMAGES)
        }
        }, 40);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');                
            }
        }, 150);

        
    }

    jumpen(){
        setInterval(() => {
            if(!this.isAboveGround() && !this.isDead() && !this.isHurt()){      
                setTimeout(() => {
                    this.speedY = 25
                }, this.jumptime);         
                           
            }
        }, 2000);
    }


}