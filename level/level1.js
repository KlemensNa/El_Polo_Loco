  const level1 = new Level(
    [   
        new Chicken(),
        new Chicken(),        
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
    [   new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ]
    
)
