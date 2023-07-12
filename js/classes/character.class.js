class Character extends MovableObject {
    x = 300;
    y = 430;
    height = 200;
    width = 100;
    IMAGES_WALKIG = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    currentImg = 0;
    world;                                 // Variable in der alle varaiablen vom Object World gespecihert sind (s. Klasse World)
    walking_sound = new Audio('audio/running.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKIG);                                           //superconstuctor nur einmal aufrufbar, danach einfach mit this.
        this.animate();
    }

    animate() {
        
        setInterval(() => {
                if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.x += 15;
                    this.otherDirection = false;
                    this.walking_sound.play();
                }
                else if (keyboard.LEFT) {
                    this.otherDirection = true;
                    if(this.x > 200){
                    this.x -= 15;
                    }
                    this.walking_sound.play();
                } else {
                this.walking_sound.pause();
                this.walking_sound.currentTime = 0;
                }          
                this.world.camera_x = -this.x + 200;
        }, 50);

        setInterval(() => {
            if (keyboard.RIGHT || keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKIG);
            }
        }, 60);
    }



    jump() {

    }
}