// script.js
let startTime;
let updatedTime;
let difference;
let interval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        interval = setInterval(updateDisplay, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(interval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    startTime = null;
    updatedTime = null;
    difference = null;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = ''; // Clear the laps list
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
