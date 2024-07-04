let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let savedTime = 0;
let laps = [];
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        if (paused) {
            startTime = new Date().getTime() - savedTime;
        } else {
            startTime = new Date().getTime();
        }
        tInterval = setInterval(updateTime, 1);
        running = true;
        paused = false;
        document.getElementById('start').innerText = 'Pause';
    } else {
        pauseTimer();
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = updatedTime - startTime;
        running = false;
        paused = true;
        document.getElementById('start').innerText = 'Resume';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    savedTime = 0;
    display.innerHTML = "00:00:00";
    laps = [];
    lapsContainer.innerHTML = "";
    document.getElementById('start').innerText = 'Start';
}

function lapTimer() {
    if (running || paused) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapDiv = document.createElement('div');
        lapDiv.innerHTML = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    display.innerHTML = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
