  const level1 = new Level(
    [   
        new Chicken(),
        new Chicken(),       
        new ChickenSmall(500),
        new ChickenSmall(900), 
        new ChickenSmall(1300), 
        new ChickenSmall(), 
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
    [   new Coins(600, 0),
        new Coins(600, 100),
        new Coins(600, 200),
        new Coins(600, 300),
        new Coins(600, 400),
    ],
    [
        new Bottle(400, 0),
        new Bottle(400, 100),
        new Bottle(400, 200),
        new Bottle(400, 300),
        new Bottle(400, 400),
    ]
    
)
