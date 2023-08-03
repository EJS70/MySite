const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const handicap = document.getElementById("handicap");
const ctx = gameboard.getContext("2d");

let boardWidth = 500;
let boardHeight = 500;
let paddleSpin = 1.5; // >= 0.0
let paddleForce = 1.1; // >= 1.0
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function resetGame() {
    clearInterval(intervalID); // clear the clock
    gameboard.width = boardWidth;
    gameboard.height = boardHeight;

    resetPaddles();
    resetBall();

    scoreL = 0;
    scoreR = 0;
    updateScore();

    nextTick(); // start running the clock
}

function resetPaddles() {
    scoreDifference = (scoreL - scoreR) * 5;
    scoreDifference = Math.min(Math.max(-50, scoreDifference), 50);
    scoreDifference = handicap.checked ? scoreDifference : 0;
    paddleL = new Paddle(0, boardHeight / 2 - paddleLength / 2, paddleLength - scoreDifference, paddleWidth, "red");
    paddleL.draw(ctx);
    paddleR = new Paddle(boardWidth-paddleWidth, boardHeight / 2 - paddleLength / 2, paddleLength + scoreDifference, paddleWidth, "cyan");
    paddleR.draw(ctx);
}

let colorInterval

function resetBall() {
    let vector = Math.random() * Math.PI;
    vector = vector < Math.PI / 2 ? vector - Math.PI / 4 : vector + Math.PI / 4;

    clearInterval(colorInterval);
    ball = new Ball(boardWidth/2, boardHeight / 2, Math.cos(vector) * 3, Math.sin(vector) * 3, ballRadius, "lime");

    colorInterval = setInterval( () => {ball.c = (ball.c == "lime" ? "orange" : "lime"); myTimer();}, 1000);
    ball.draw(ctx);
}

function clearBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            if (cpucheck.checked) {
                paddleR.moveCPU(ball);
            } else {
                paddleR.move();
            }

            ball.bounceWall();
            if (ball.bouncePaddleL(paddleL)) score("right");
            if (ball.bouncePaddleR(paddleR)) score("left");
            
            ball.move();

            draw();
            nextTick();
        }, 10
    );
}

function score(player) {
    if (player == "left") {scoreL++; loserPaddle = paddleL;}
    if (player == "right") {scoreR++; loserPaddle = paddleR;}
    let audio = new Audio("score.wav");
    audio.play();
    
    resetBall();
    resetPaddles();
    updateScore();
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    if (scoreL >= 15 && scoreL > scoreR) {
        scoreboard.innerHTML = `RED WINS!`;
    } else if (scoreR >= 15 && scoreR > scoreL) {
        scoreboard.innerHTML = `BLUE WINS!`;
    } else if (scoreR >= 15) {
        scoreboard.innerHTML = `IT'S A TIE!`;
    } else {
        scoreboard.innerHTML = `${scoreL} : ${scoreR}`;
    }
}