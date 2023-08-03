class Paddle {
    constructor(x, y, l, w, c) {
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.l = l;
        this.w = w;
        this.c = c;
    }

    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.l);
        ctx.strokeRect(this.x, this.y, this.w, this.l);
    }

    move() {
        let newY = this.vy + this.y

        if (newY < 0 || newY + this.l > boardHeight) return;

        this.y = newY;
    }

    moveCPU(ball) {
        // Use the properties of the ball to set a new velocity
        // Helpful pieces:
        //   Math.min() and Math.max() to limit the velocity
        //   ball.y to see where the ball is
        //   ball.vy to see where the ball is going

        this.vy = (ball.y - this.y - this.w) * 60 / boardHeight; // Modify this line to add your own code

        // Finally, call move to move the paddle normally
        this.move();
    }
}