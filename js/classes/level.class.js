class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;   
    bottles;
    brick;

    level_end_x = 2500;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, brick){     
        this.brick = brick;   
        this.enemies = enemies;                                 
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}