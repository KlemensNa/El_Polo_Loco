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


function restartAudio(audioElement) {
    audioElement.currentTime = 0; // Setze die Wiedergabezeit auf den Anfang
    audioElement.play(); // Starte die Wiedergabe erneut
}


function loadStartscreenMusic(){
    loadThememusic();
}


function loadThememusic(){
    thememusic.play();
}

function init(){
    canvas = document.getElementById('canvas');
    initLevel();
    fadeOutStartscreen();
    thememusic.pause();
    mainTheme.play();
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


function quitGame(){
    stopIntervals();
    stopAllSounds();
    loadThememusic();
    document.getElementById('startScreen').classList.remove("d-none");
    document.getElementById('exitQuestionScreen').classList.remove("d-flex");
}


function openRestart(){
    document.getElementById('restartQuestionScreen').classList.add("d-flex");
}


function restartGame(){
    returnToGame('restartQuestionScreen');
    stopAllSounds();
    stopIntervals();
    init();
}


function returnToGame(i){
    document.getElementById(i).classList.remove("d-flex");
}

function disableSounds(){
    document.getElementById('btnMusik').classList.add('d-none');
    document.getElementById('btnMute').classList.add('d-flex');
}

function enableSounds(){
    document.getElementById('btnMusik').classList.remove('d-none');
    document.getElementById('btnMute').classList.remove('d-flex');
}



function muteAllSounds() {
    
    sounds.forEach((audio) => {
      audio.muted = true;
    });
  }
  
  
function unmuteAllSounds() {   

    sounds.forEach((audio) => {
      audio.muted = false;
    });
}


function createSound(path){
    let sound = new Audio(path)
    sounds.push(sound);
}


function stopAllSounds(){
    sounds.forEach((audio) => {
        audio.pause();
      });
}


thememusic.addEventListener('ended', function() {
    restartAudio(thememusic);
});

mainTheme.addEventListener('ended', function() {
    restartAudio(mainTheme);
});
  

  





