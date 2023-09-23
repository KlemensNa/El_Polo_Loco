let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let intervalsID = [];
let stoppedIntervalsID = [];
let sounds = [];
let mainTheme = new Audio('audio/mexican_music.mp3');
let thememusic = new Audio('audio/theme.mp3');
sounds.push(mainTheme);
sounds.push(thememusic);
winLose = false;


function restartAudio(audioElement) {
    audioElement.currentTime = 0; // Setze die Wiedergabezeit auf den Anfang
    audioElement.play(); // Starte die Wiedergabe erneut
}


function loadStartscreenMusic(){    
    disableSounds();
    document.getElementById("btnMute").addEventListener("click", function() {
        loadThememusic();
    });
}


function loadThememusic(){
    if(!document.getElementById('startScreen').classList.contains("d-none")){
        thememusic.play();
    }    
}

function initGame(){
    canvas = document.getElementById('canvas');
    initLevel();
    fadeOutStartscreen();
    changeMusic();
    // gibt "canvas" als Argument mit, um in der Welt alles zu erstellen
    world = new World(canvas, keyboard);
    addTouchListener();    
}


function changeMusic(){
    thememusic.pause();
    mainTheme.play();
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


function toggleDescriptions(){
    document.getElementById('settingsScreen').classList.toggle("d-flex");
}


function fadeOutStartscreen(){
    document.getElementById('startScreen').classList.add("d-none");
}


function startInterval(fn, time){
    let id = setInterval(fn, time)
    intervalsID.push(id);
}


function stopIntervals(){
    intervalsID.forEach(clearInterval);
}


function openExit(){
    document.getElementById('exitQuestionScreen').classList.add("d-flex");
}


function openWinScreen(){
    if(winLose){
        document.getElementById('winScreen').classList.add("d-flex");
        stopIntervals();
        }
    winLose = false;
}


function openLoseScreen(){
    if(winLose){
        document.getElementById('loseScreen').classList.add("d-flex");
        stopIntervals();
        }
    winLose = false;  
}


function quitGame(){
    stopIntervals();
    stopAllSounds();    
    closeAndOpenScreens();
    loadThememusic();
}

function closeAndOpenScreens(){
    document.getElementById('startScreen').classList.remove("d-none");
    document.getElementById('exitQuestionScreen').classList.remove("d-flex"); 
    document.getElementById('winScreen').classList.remove("d-flex");
    document.getElementById('loseScreen').classList.remove("d-flex"); 
}


function openRestart(){
    document.getElementById('restartQuestionScreen').classList.add("d-flex");
}


function restartGame(){
    returnToGame('restartQuestionScreen');
    stopAllSounds();
    stopIntervals();
    initGame();
}


function newGame(){
    quitGame();
    initGame();
}


function returnToGame(i){
    document.getElementById(i).classList.remove("d-flex");
}

function disableSounds(){
    document.getElementById('btnMusik').classList.remove('d-flex');
    document.getElementById('btnMute').classList.remove('d-none');
    muteAllSounds();
}

function enableSounds(){
    document.getElementById('btnMusik').classList.add('d-flex');
    document.getElementById('btnMute').classList.add('d-none');
    unmuteAllSounds();
}



function muteAllSounds() {    
    sounds.forEach((audio) => audio.muted = true)
  }
  
  
function unmuteAllSounds() {   
    sounds.forEach((audio) => audio.muted = false)
}


function createSound(path){
    let sound = new Audio(path)
    sounds.push(sound);
}


function stopAllSounds(){
    sounds.forEach((audio) => audio.pause())
}

/**
 * Eventlistener to create music loops 
 */
thememusic.addEventListener('ended', function() {
    restartAudio(thememusic);
});


mainTheme.addEventListener('ended', function() {
    restartAudio(mainTheme);
});





/**
 * Eventlistener for Mobilescreen 
 */

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);

function checkScreenSize() {
    if (mobileMode()) {
        document.getElementById('rotateScreen').classList.add("d-flex")
    }else{
        document.getElementById('rotateScreen').classList.remove("d-flex")
    }
}

function mobileMode(){
     return window.innerWidth < 700 && window.innerHeight > window.innerWidth
}