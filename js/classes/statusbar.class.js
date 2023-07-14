class Statusbar extends DrawableObject {  
    
    static IMAGES_HEALTHBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    ];
    static IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    ];
    static IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    ];
    static IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/orange.png',
    ];

    Images = [];

    percentageHealth = 100;
    amountCoins = 0;
    amountBottles = 0;


    constructor(bilder, y) {
        super();
        this.Images = bilder; 
        this.loadImages(this.Images);
        this.setPercentage(100);
        this.x = 10;
        this.y = y;    
        this.height = 80;
        this.width = 300;                
    }


    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.Images[this.getImageIndex()];   
        this.img = this.imgCache[path];        
    }

    getImageIndex(){
        if(this.percentage == 100){
            return 0;
        } else if(this.percentage >= 80){
            return 1;
        } else if(this.percentage >= 60){
            return 2;
        } else if(this.percentage >= 40){
            return 3;
        } else if(this.percentage >= 20){
            return 4;
        } else{
            return 5;
        }
    }
}