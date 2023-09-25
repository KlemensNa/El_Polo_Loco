/**
 * 
 * 
 * add Eventlsitener for pressing keyboard 
 */
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


/**
 * 
 * add Eventlistener for touch and mouseclicks on the buttons
 */
function addTouchListener(){
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnUp');
    const btnThrow = document.getElementById('btnThrow');

    btnLeft.addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    btnLeft.addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.LEFT = false;
    });

    btnLeft.addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    btnLeft.addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    btnRight.addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    
    btnRight.addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    btnRight.addEventListener('mousedown', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    
    btnRight.addEventListener('mouseup', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    btnJump.addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.UP = true;
    });
    
    btnJump.addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.UP = false;
    });

    btnJump.addEventListener('mousedown', (e) =>{
        e.preventDefault();
        keyboard.UP = true;
    });
    
    btnJump.addEventListener('mouseup', (e) =>{
        e.preventDefault();
        keyboard.UP = false;
    });

    btnThrow.addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.THROW = true;
    });
    
    btnThrow.addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.THROW = false;
    });

    btnThrow.addEventListener('mousedown', (e) =>{
        e.preventDefault();
        keyboard.THROW = true;
    });
    
    btnThrow.addEventListener('mouseup', (e) =>{
        e.preventDefault();
        keyboard.THROW = false;
    });

    
}