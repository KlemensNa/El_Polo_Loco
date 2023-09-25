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

/**
 * restarts audioElement
 * @param {*} audioElement audioObejct given to this function
 */
function restartAudio(audioElement) {
    audioElement.currentTime = 0; // Setze die Wiedergabezeit auf den Anfang
    audioElement.play(); // Starte die Wiedergabe erneut
}

/**
 * turn off all sounds and set eventlistener which starts thememusic when click on the button
 */
function loadStartscreenMusic() {
    disableSounds();
    document.getElementById("btnMute").addEventListener("click", function () {
        loadThememusic();
    });
}

/**
 * if startscreen is actualy seen, starts thememusic
 */
function loadThememusic() {
    if (!document.getElementById('startScreen').classList.contains("d-none")) {
        thememusic.play();
    }
}


/**
 * gibt "canvas" als Argument mit, um in der Welt alles zu erstellen
 * build canvas, loads level and enemies within, d-none startscreen, start newMusic and create worldObejct
 */
function initGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    fadeOutStartscreen();
    changeMusic();
    world = new World(canvas, keyboard);
    addTouchListener();
}


/**
 * stops music from startscreen and starts ingame music
 */
function changeMusic() {
    thememusic.pause();
    mainTheme.play();
}

/**
 * fades setting/helpscreen in and out
 */
function toggleDescriptions() {
    document.getElementById('settingsScreen').classList.toggle("d-flex");
}

/**
 * d-none to startscreen
 */
function fadeOutStartscreen() {
    document.getElementById('startScreen').classList.add("d-none");
}

/**
 * starts and new interval and pushs the interval to an intervalArray
 * @param {*} fn 
 * @param {*} time 
 */
function startInterval(fn, time) {
    let id = setInterval(fn, time)
    intervalsID.push(id);
}


/**
 * stop all intervals from the intervalArray 
 */
function stopIntervals() {
    intervalsID.forEach(clearInterval);
}


/**
 * d-flex quit questionscreen
 */
function openExit() {
    document.getElementById('exitQuestionScreen').classList.add("d-flex");
}


/**
 * d-flex Endscreen when won, stops all Intervals and set winlose to false
 */
function openWinScreen() {
    if (winLose) {
        document.getElementById('winScreen').classList.add("d-flex");
        stopIntervals();
    }
    winLose = false;
}


/**
 * d-flex Endscreen when lose, stops all Intervals and set winlose to false
 */
function openLoseScreen() {
    if (winLose) {
        document.getElementById('loseScreen').classList.add("d-flex");
        stopIntervals();
    }
    winLose = false;
}

/**
 * starts function needed for quitting the game
 */
function quitGame() {
    stopIntervals();
    stopAllSounds();
    closeAndOpenScreens();
    loadThememusic();
}


/**
 * opens Startscreen and shut down exit-/ win- and losescreen
 */
function closeAndOpenScreens() {
    document.getElementById('startScreen').classList.remove("d-none");
    document.getElementById('exitQuestionScreen').classList.remove("d-flex");
    document.getElementById('winScreen').classList.remove("d-flex");
    document.getElementById('loseScreen').classList.remove("d-flex");
}



/**
 * d-flex restart questionscreen
 */
function openRestart() {
    document.getElementById('restartQuestionScreen').classList.add("d-flex");
}


/**
 * starts function needed for restart the game
 */
function restartGame() {
    returnToGame('restartQuestionScreen');
    stopAllSounds();
    stopIntervals();
    initGame();
}


/**
 * starts function needed for start new game
 */
function newGame() {
    quitGame();
    initGame();
}


/**
 * d-nones questionsscreen
 * @param {*} i id of the questionscreenwhich should be closed
 */
function returnToGame(i) {
    document.getElementById(i).classList.remove("d-flex");
}


/**
 * change music/mutebutton and start muteFunction
 */
function disableSounds() {
    document.getElementById('btnMusik').classList.remove('d-flex');
    document.getElementById('btnMute').classList.remove('d-none');
    muteAllSounds();
}


/**
 * change music/mutebutton and start unmuteFunction
 */
function enableSounds() {
    document.getElementById('btnMusik').classList.add('d-flex');
    document.getElementById('btnMute').classList.add('d-none');
    unmuteAllSounds();
}


/**
 * mutes everyaudio in the soundsArray
 */
function muteAllSounds() {
    sounds.forEach((audio) => audio.muted = true)
}

/**
 * unmutes every audio in soundsArray
 */
function unmuteAllSounds() {
    sounds.forEach((audio) => audio.muted = false)
}


function stopAllSounds() {
    sounds.forEach((audio) => audio.pause())
}

/**
 * Eventlistener to create music loops 
 */
thememusic.addEventListener('ended', function () {
    restartAudio(thememusic);
});


mainTheme.addEventListener('ended', function () {
    restartAudio(mainTheme);
});



/**
 * Eventlistener for Mobilescreen 
 */

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);


/**
 * shows rotateWarningScree if in mobileMode
 */
function checkScreenSize() {
    if (mobileMode()) {
        document.getElementById('rotateScreen').classList.add("d-flex")
    } else {
        document.getElementById('rotateScreen').classList.remove("d-flex");
    }
}


/**
 * 
 * @returns true if conditions of mobile mode are met
 */
function mobileMode() {
    return (window.innerWidth < 900 && window.innerHeight > window.innerWidth && window.innerHeight < 820) || window.innerWidth < 500;
}




