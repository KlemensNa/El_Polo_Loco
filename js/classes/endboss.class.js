class Endboss extends MovableObject {

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
        top: 40,
        right: 42,
        bottom: 55,
        left: 34,
    };

    height = 230;
    width = 230;
    energy = 100;
    range;
    flipBoss;
    bossSound = new Audio('audio/hahn.mp3');
    winSound = new Audio('audio/WinSound.mp3')
    counter = 0;


    constructor() {
        super().loadImage(this.IMAGES_ALERT[7]);
        this.y = 430 - this.height;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.fallingBorder = 430 - this.height;
        this.x = 3500;
        this.animate();
        this.jumpen();
        this.downToBottom();
        this.speed = 0;
        sounds.push(this.bossSound)
        sounds.push(this.winSound)
    }

    animate() {
        this.animationsAndSounds();
    }

    /**
     * starts interval to jump every two seconds
     */
    jumpen() {
        startInterval(() => {
            if (this.canJump() && !winLose)
                this.jump();
        }, 2000);
    }

    /**
     * starts several move and sound intervals
     */
    animationsAndSounds() {
        startInterval(() => {
            if (this.isDead())
                this.deadAnimationAndSound();
            else if (this.isHurt() && !winLose)
                this.hurtAnimation();
            else if (this.canChangeDirection())
                this.changeDirection();
            else if (this.canWalkLeftNormal() && !winLose)
                this.moveLeft();
            else if (this.canAttack() && !winLose)
                this.attackMode();
        }, 150);
    }

    /**
     * starts animation and sounds if boss is dead; opens winningFunction
     */
    deadAnimationAndSound() {
        this.playAnimation(this.IMAGES_DEAD);
        winLose = true;
        mainTheme.pause();
        if (!sounds[0].muted) {
            this.winSound.play();
        }
        this.openWinningScreen()
    }

    /**
     * starts animation if boss is injured and sets speed to 10
     */     
    hurtAnimation() {
        this.speed = 10;
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * 
     * @returns variable if character is behind the boss
     */
    canChangeDirection() {
        return this.flipBoss == 1
    }


    /**
     * walk to the right, play walking animations, set Boolean to true
     */
    changeDirection() {
        this.moveRight();
        this.playAnimation(this.IMAGES_WALK);
        this.otherDirection = true;
    }

    /**
     * 
     * @returns boss is not dead or injured and definet range to character is great
     */
    canWalkLeftNormal() {
        return !this.isDead() && !this.isHurt() && this.range == 0
    }

    /**
     * move left, set speed, starts animations, set back crow counter and stops boss sound
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
        this.speed = 2;
        this.playAnimation(this.IMAGES_WALK);
        this.counter = 0;
        this.bossSound.pause()
    }

    /**
     * 
     * @returns boss is not dead or injured and definet range to character is small
     */
    canAttack() {
        return !this.isDead() && !this.isHurt() && this.range == 1
    }

    /**
     * move left, set speed, starts animations, crow counter plus one and starts boss sound
     */
    attackMode() {
        super.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_ATTACK);
        this.speed = 18;
        if (this.canSoundPlayed()) {
            this.bossSound.play();
            this.counter++
        }
    }

    /**
     * 
     * @returns is range small, counter 0 and sounds not muted
     */
    canSoundPlayed() {
        return this.range == 1 && this.counter < 1 && !sounds[0].muted
    }

    /**
     * 
     * @returns isalready in the air, range is small and is not dead or injured
     */
    canJump() {
        return !this.isAboveGround() && this.range == 1 && !this.isDead() && !this.isHurt()
    }

    /**
     * starts jump movement
     */
    jump() {
        setTimeout(() => this.speedY = 25, 1000);
    }

    /**
     * opens Endscreen 4seconds after beating the boss
     */
    openWinningScreen() {
        setTimeout(() => {
            openWinScreen();
        }, 4000)
    }
}