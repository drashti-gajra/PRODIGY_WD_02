let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0); // Ensure the stopwatch continues from where it left off
        timerInterval = setInterval(updateTime, 1000);
        startStopButton.textContent = "Pause";
        console.log("Stopwatch started");
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime; // Save the elapsed time
        startStopButton.textContent = "Start";
        console.log("Stopwatch paused");
    }
    running = !running;
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    lapCounter = 1;
    running = false;
    startStopButton.textContent = "Start";
    difference = 0;
    console.log("Stopwatch reset");
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCounter++;
        console.log("Lap recorded");
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    console.log("Time updated", display.textContent);
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
