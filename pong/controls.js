const UPARROW = 38;
const DOWNARROW = 40;
const WKEY = 87;
const SKEY = 83;
let paddleVelocity = 5;

window.addEventListener("keydown", keyDown);
// CODE HERE
function keyDown(event) {
    const key = event.keyCode;
    console.log(`KEYDOWN: ${key}`);

    switch (key) {
        case (UPARROW):
            paddleR.vy = -paddleVelocity;
            break;
        case (DOWNARROW):
            paddleR.vy = paddleVelocity;
            break;
        case (WKEY):
            paddleL.vy = -paddleVelocity;
            break;
        case (SKEY):
            paddleL.vy = paddleVelocity;
            break;
    }
    // CODE HERE
}

window.addEventListener("keyup", keyUp);
// CODE HERE
function keyUp(event) {
    const key = event.keyCode;
    console.log(`KEYUP:   ${key}`);

    switch (key) {
        case (UPARROW):
        case (DOWNARROW):
            paddleR.vy = 0;
            break;
        case (WKEY):
        case (SKEY):
            paddleL.vy = 0;
            break;
    }
}