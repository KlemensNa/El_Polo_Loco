  const level1 = new Level(
    [   
        new Chicken(1100),
        new Chicken(700),
        new Chicken(1500),         
        // new ChickenSmall(500),
        // new ChickenSmall(900), 
        // new ChickenSmall(1300), 
        // new ChickenSmall(), 
        new Endboss(),
    ],
    [
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -10),   
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -10),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -10),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -10),
        new BackgroundObject('img/5_background/layers/air.png', 969),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 969),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 969),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 969),
        new BackgroundObject('img/5_background/layers/air.png', 969*2),   
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 969*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 969*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 969*2),
            
    ],
    [   
        new Coins(600, 50),
        new Coins(800, 150),
        new Coins(1000, 250),
        new Coins(1200, 350),
        new Coins(1400, 450),
    ],
    [
        new Bottle(400),
        new Bottle(1200),
        new Bottle(1600),
        new Bottle(800),
        new Bottle(1200),
        new BottleBottom(600),
        new BottleBottom(1000),
        new BottleBottom(1400),
        new BottleBottom(1800),
        new BottleBottom(2200),
    ]
    
)
