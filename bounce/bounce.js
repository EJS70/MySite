let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
let doBounce = true;
let doClear = true;
const canvas = document.getElementById(`myCanvas`);
const ctx = canvas.getContext("2d");
setInterval(start, 20);
let colors = ["red", "darkorange", "#e0c040", "green", "blue", "indigo", "violet"];
let color = 0;

function start() { 
    if (doBounce) {
     if (doClear) ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.fillStyle = colors[color];
    ctx.fillRect(x, y, 20, 20);
    ctx.stroke();
    x += dx;
    y += dy;
    if (x >= 418 || x <= 0) {dx *= -1; color++; color%=7;}
    if (y >= 298 || y <= 0) {dy *= -1; color++; color%=7;}
    }
}

function reset() {
    doBounce = !doBounce;
    if (doBounce) {
        document.getElementById("stopButton").innerHTML = "Stop";
    } else {
        document.getElementById("stopButton").innerHTML = "Start";
    }
}

function changeClear() {
    doClear = !doClear;
    if (doClear) {
        document.getElementById("clearButton").innerHTML = "Draw";
    } else {
        document.getElementById("clearButton").innerHTML = "Clear";
    }
}