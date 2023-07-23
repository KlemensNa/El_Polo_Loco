class Endboss extends MovableObject{
    
    height = 400;
    width = 400;
    energy = 100;
    range;
    flipBoss;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',        
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',        
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    currentImg = 0;
    offset = {
        top: 85,
        right: 60,
        bottom: 70,
        left: 50,
    }

    constructor(){
        super().loadImage(this.IMAGES_ALERT[7]);    
        this.y = 660 - this.height;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.fallingBorder = 640 - this.height;
        this.x = 2200;
        // this.animate();
        // this.jumpen();
        // this.downToBottom(); 
        // this.speed = 3;
    }

    animate(){      

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if(this.isHurt()){
                this.speed = 5;
                this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.flipBoss == 1){
                this.moveRight();
                this.playAnimation(this.IMAGES_WALK);
                this.otherDirection = true;
            }
            else{
                this.moveLeft();
                this.otherDirection = false;
                this.speed = 5;
                this.playAnimation(this.IMAGES_WALK);
            }

            if(!this.isDead() && !this.isHurt() && this.range == 1){
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed = 26;          
            }

            
            
        }, 150 );
    }

    jumpen(){
        setInterval(() => {
            if(!this.isAboveGround() && this.range == 1 && !this.isDead() && !this.isHurt()){      
                setTimeout(() => {
                    this.speedY = 30
                }, 1000);          
                           
            }
        }, 2000);
    }

   
}