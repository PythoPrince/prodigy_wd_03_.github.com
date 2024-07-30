let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const tickSound = document.getElementById('tickSound');
const lapSound = document.getElementById('lapSound');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.style.backgroundColor = '#ffc107';
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    isRunning = false;
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
        lapSound.play();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
    tickSound.play();
}
