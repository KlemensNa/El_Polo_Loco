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
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    static IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];
    static IMAGES_BOSSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    ];

    Images = [];
    percentageHealth = 100;
    amountCoins = 0;
    amountBottles = 0;


    constructor(bilder, x, y) {
        super();
        this.Images = bilder;
        this.loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.setPercentage(100);
        this.addBottle(0);
        this.x = x;
        this.y = y;    
        this.height = 50;
        this.width = 180;                
    }


    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.Images[this.getImageIndex()];   
        this.img = this.imgCache[path];        
    }

    addBottle(amount){
        this.amount = amount;
        let path = this.Images[this.getBottleIndex()];   
        this.img = this.imgCache[path];  
    }

    getBottleIndex(){
        if(this.amount == 0){
            return 0;
        } else if(this.amount == 1){
            return 1;
        } else if(this.amount == 2){
            return 2;
        } else if(this.amount == 3){
            return 3;
        } else if(this.amount == 4){
            return 4;
        } else{
            return 5;
        }
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