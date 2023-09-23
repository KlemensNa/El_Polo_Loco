class Character extends MovableObject {

    IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',

    ]

    world;                                 // Variable in der alle varaiablen vom Object World gespecihert sind (s. Klasse World)
    walking_sound = new Audio('audio/running.mp3');
    hitSound = new Audio('audio/autsch.mp3');
    bossSound = new Audio('audio/hahn.mp3');
    loseSound = new Audio('audio/loseSound.mp3')
    keyPushed;
    offset = {
        top: 110,
        right: 35,
        bottom: 12,
        left: 35,
    }

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');      //superconstuctor nur einmal aufrufbar, danach einfach mit this.
        this.height = 230;
        this.width = 110;
        this.y = 430 - this.height;
        this.x = 200;
        this.speed = 9;
        this.fallingBorder = 430 - this.height;
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEP);
        this.animate();
        this.downToBottom();
        sounds.push(this.walking_sound);
        sounds.push(this.hitSound);
        sounds.push(this.loseSound);
        sounds.push(this.bossSound);                                                 //fallen zum Boden
    }

    animate() {
        this.moveActions()
        this.AnimationsAndSounds();
    }

    /**
     * 
     * Moving Actions
     */

    moveActions() {
        startInterval(() => {
            if (this.canMoveRight())
                this.moveRight();
            else if (keyboard.LEFT)
                this.moveLeft();
            else
                this.stand()
            if (this.canJump())
                this.jump()
            if (this.canSleep()) {
                this.playAnimation(this.IMAGES_SLEEP)
            }
            this.world.camera_x = -this.x + 200;
        }, 50);
    }

    canMoveRight() {
        return keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    moveRight() {
        super.moveRight();
        if (!sounds[0].muted && !this.isAboveGround()) {
            this.walking_sound.play();
        }
        this.keyPushed = new Date().getTime();
    }

    moveLeft() {
        this.otherDirection = true;
        if (this.x > 200) {
            super.moveLeft();
        }
        if (!sounds[0].muted && !this.isAboveGround()) {
            this.walking_sound.play();
        }
        this.keyPushed = new Date().getTime();
    }

    stand() {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
    }

    canJump() {
        return (keyboard.SPACE || keyboard.UP) && !this.isAboveGround()
    }

    jump() {
        super.jump(this.coins);
        this.walking_sound.pause();
        this.keyPushed = new Date().getTime();
    }

    canSleep() {
        return this.noKeyPushed() && !this.isDead() && !this.isHurt()
    }


    /**
     * Animations
     * 
     */

    AnimationsAndSounds(){
        startInterval(() => {
            if (this.isDead()) 
                this.deadActions();
            else if (this.isHurt()) 
                this.hurtAnimations();
            else if (this.isAboveGround()) 
                this.playAnimation(this.IMAGES_JUMP)
            else if (keyboard.RIGHT || keyboard.LEFT) 
                this.playAnimation(this.IMAGES);
        }, 150);
    }

    deadActions() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!sounds[0].muted){
            this.playDeadSounds();
        };        
        winLose = true;
        
        this.openLosingScreen();
    }


    playDeadSounds() {
        this.loseSound.play();
        setTimeout(() => {
            this.loseSound.pause();
            this.bossSound.play();
        }, 2000)
    }


    openLosingScreen() {
        setTimeout(() => {
            openLoseScreen();
            this.bossSound.pause();
            this.loseSound.pause();
        }, 3500)
    }


    hurtAnimations() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtSounds();
    }


    hurtSounds(){
        if (!sounds[0].muted) {
            this.hitSound.play();
            setTimeout(() => {
                this.hitSound.pause();
                this.hitSound.currentTime = 0;
            }, 300);
        }
    }
}

