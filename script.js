let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (running) return;

    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
});

pauseBtn.addEventListener("click", () => {
    if (!running) return;

    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
    running = false;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapCount = 0;

    display.textContent = "00:00:00.00";

    lapList.innerHTML = `
        <p class="empty-message">No laps recorded yet</p>
    `;
});

lapBtn.addEventListener("click", () => {
    if (!running) return;

    if (lapCount === 0) {
        lapList.innerHTML = "";
    }

    lapCount++;

    const lapItem = document.createElement("div");
    lapItem.className = "lap-item";

    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span class="lap-time">${formatTime(elapsedTime)}</span>
    `;

    lapList.prepend(lapItem);
});