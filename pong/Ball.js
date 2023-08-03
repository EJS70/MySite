class Ball {
    constructor(x, y, vx, vy, rad, c) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.rad = rad;
        this.c = c;
    }

    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    bounceWall() {
        // TOP WALL
        if (this.y < this.rad) {
            this.vy = 1 * Math.abs(this.vy);
            let audio = new Audio("wall.wav");
            audio.play();
        }

        // BOTTOM WALL
        if (this.y > boardHeight - this.rad) {
            this.vy = -1 * Math.abs(this.vy);
            let audio = new Audio("wall.wav");
            audio.play();
        }
    }

    bouncePaddleL(paddle) {
        if (this.x - this.rad > paddle.w) return false;
        if (this.x - this.rad < 0) return true;
        if (this.y < paddle.y) return false;
        if (this.y > paddle.y + paddle.l) return false;
        if (this.vx < 0) {
            this.vx = paddleForce * Math.abs(this.vx);
            let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
            this.vy = this.vy + paddlePos*paddleSpin;
            let audio = new Audio("paddle.wav");
            audio.play();
        }
        return false;
    }

    bouncePaddleR(paddle) {
        if (this.x + this.rad < paddle.x) return false;
        if (this.x + this.rad > paddle.x + paddle.w) return true;
        if (this.y < paddle.y) return false;
        if (this.y > paddle.y + paddle.l) return false;
        if (this.vx > 0) {
            this.vx = -paddleForce * Math.abs(this.vx);
            let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
            this.vy = this.vy + paddlePos*paddleSpin;
            let audio = new Audio("paddle.wav");
            audio.play();
        }
        return false;
    }
}