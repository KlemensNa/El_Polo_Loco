  let level1 ;
  
  function initLevel(){

  level1 = new Level(
    [   
        // new Chicken(500), 
        // new Chicken(1000),
        // new Chicken(1500),
        // new Chicken(2000),
        // new Chicken(2500),
        // new Chicken(3000), 
        // new Chicken(3500),          
        // new ChickenSmall(600),
        // new ChickenSmall(1200), 
        // new ChickenSmall(1800),
        // new ChickenSmall(2400),  
        // new ChickenSmall(3000),
        // new ChickenSmall(2800), 
        // new ChickenSmall(2600),  
        new Endboss(),
    ],
    [
        new Clouds(),
        new Clouds(),
        new Clouds(),
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
        new BackgroundObject('img/5_background/layers/air.png', 709),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 709),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 709),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 709),
        new BackgroundObject('img/5_background/layers/air.png', 709*2),   
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 709*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 709*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 709*2),
        new BackgroundObject('img/5_background/layers/air.png', 709*3),   
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 709*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 709*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 709*3),
        new BackgroundObject('img/5_background/layers/air.png', 709*4),   
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 709*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 709*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 709*4),
        new BackgroundObject('img/5_background/layers/air.png', 709*5),   
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 709*5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 709*5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 709*5),
            
    ],
    [   
        new Coins(500, 300),
        new Coins(1000, 300),
        new Coins(1500, 300),
        new Coins(2000, 300),
        new Coins(2500, 300),
    ],
    [
        new Bottle(400),
        new Bottle(1200),        
        new Bottle(2200),        
        new BottleBottom(600),
        new BottleBottom(1400),
        new BottleBottom(2400),
        
    ]
    
);
}
