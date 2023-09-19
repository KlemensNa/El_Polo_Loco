class Chicken extends MovableObject {
    height = 60;
    width = 60;
    IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImg = 0;
    energy = 20;
    offset = {
        top: 6,
        right: 13,
        bottom: 13,
        left: 6,
    }
    chickenSound = new Audio('audio/chicken.mp3');

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 430 - this.height;
        this.x = x;
        this.loadImages(this.IMAGES);
        this.animate();
        this.jumpen();
        this.downToBottom();
        this.fallingBorder = 430 - this.height;
        // this.speed = 2;
        this.jumptime = Math.random() * 500;
        sounds.push(this.chickenSound)   
    }

    animate() {

        startInterval(() => {
            if(!this.isDead()){
            this.moveLeft();
            this.playAnimation(this.IMAGES)
        }
        }, 40);

        startInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');                
            }
        }, 150);

        
    }

    jumpen(){
        startInterval(() => {
            if(!this.isAboveGround() && !this.isDead() && !this.isHurt()){      
                setTimeout(() => {
                    this.speedY = 25;
                    this.chickenSound.play();
                    
                }, this.jumptime);                          
            }
        }, 2000);
    }


}