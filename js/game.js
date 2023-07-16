let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');

    // gibt "canvas" als Argument mit, um in der Welt alles zu erstellen
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown", (event) => {
    
    var keyCode = event.which;
    
    if (keyCode == 87 || keyCode == 38) {
        keyboard.UP = true;    
    }
    if (keyCode == 83 || keyCode == 40) {
        keyboard.DOWN = true;          
    }
    if (keyCode == 65 || keyCode == 37) {
        keyboard.LEFT = true;            
    }
    if (keyCode == 68 || keyCode == 39) {
        keyboard.RIGHT = true;            
    }
    if (keyCode == 32) {
        keyboard.SPACE = true;            
    }
    if (keyCode == 69) {
        keyboard.THROW = true;            
    }
});

window.addEventListener("keyup", (event) => {
    
    var keyCode = event.which;
    
    if (keyCode == 87 || keyCode == 38) {
        keyboard.UP = false;    
    }
    if (keyCode == 83 || keyCode == 40) {
        keyboard.DOWN = false;          
    }
    if (keyCode == 65 || keyCode == 37) {
        keyboard.LEFT = false;            
    }
    if (keyCode == 68 || keyCode == 39) {
        keyboard.RIGHT = false;            
    }
    if (keyCode == 32) {
        keyboard.SPACE = false;            
    }
    if (keyCode == 69) {
        keyboard.THROW = false;            
    }
});
