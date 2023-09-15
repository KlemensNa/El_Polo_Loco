let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    // loadStartscreen();
    initLevel();
    // gibt "canvas" als Argument mit, um in der Welt alles zu erstellen
    world = new World(canvas, keyboard);
    addTouchListener();
    
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

function addTouchListener(){
    document.getElementById('btnLeft').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('btnLeft').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    
    document.getElementById('btnRight').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnUp').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.UP = true;
    });
    
    document.getElementById('btnUp').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.THROW = true;
    });
    
    document.getElementById('btnThrow').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.THROW = false;
    });

    document.getElementById('btnPlay').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.PAUSE = true;
    });

    document.getElementById('btnPause').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.PAUSE = false;
    });

    document.getElementById('btnMusik').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.MUSIC = true;
    });

    document.getElementById('btnMute').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.MUSIC = false;
    });
    
    
}

