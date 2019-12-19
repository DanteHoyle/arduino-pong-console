function Paddle(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = h;

    this.speed = 5;

    this.dy = 0;

    this.update = function() {
        if (!(this.y <= 0) && this.dy == -1 || !(this.y + this.h >= height) && this.dy == 1) {
            this.y += this.dy * this.speed;
        }
    }

    this.draw = function() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    this.move = function(dir) {
        this.dy = dir;       
    }

}

function Ball(x, y, speed) {
    this.angles = [PI/4, PI/12, -PI/12, -PI/4];

    this.x = x;
    this.y = y;
    this.w = 10;
    this.speed = speed;
    this.speedIncrease = 0.5;
    this.maxSpeed = 9;

    this.dx = -cos(PI/4);
    this.dy = -sin(PI/4);

    this.update = function() {
        this.checkBounce();

        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        print(this.speed);
    }

    this.draw = function() {
        rect(this.x, this.y, this.w, this.w);
    }

    this.reset = function(side) {
        this.x = height / 2;
        this.y = width / 2;

        if (side == 1) {
            this.dx = cos(PI/4);
            this.dy = -sin(PI/4);
        } else {
            this.dx = -cos(PI/4);
            this.dy = -sin(PI/4);
        }

        this.speed = speed;

    }

    this.checkBounce = function() {
        // Check collision with left paddle
        if (this.x < 20) {
            if (collides(this.x, this.y, this.w, this.w, paddle.x, paddle.y, paddle.w, paddle.h)) {
                let midPoint = this.y + (0.5 * this.w);
                
                if (midPoint < paddle.y + .25 * paddle.h) {
                    var a = 0;
                } else if (midPoint < paddle.y + .5 * paddle.h) {
                    var a = 1;
                } else if (midPoint < paddle.y + .75 * paddle.h) {
                    var a = 2;
                } else {
                    var a = 3;
                }
    
                this.dx = cos(this.angles[a]);
                this.dy = -sin(this.angles[a]);

                if (this.speed < this.maxSpeed) {
                    this.speed += this.speedIncrease;
                }
            }

            if (this.x < 0) {
                score2 += 1;
                this.reset(1);
            }
        }
        
        if (this.x > height - 30) {
            if (collides(this.x, this.y, this.w, this.w, paddle2.x, paddle2.y, paddle2.w, paddle2.h)) {
                let midPoint = this.y + (0.5 * this.w);
                
                if (midPoint < paddle2.y + .25 * paddle2.h) {
                    var a = 0;
                } else if (midPoint < paddle2.y + .5 * paddle2.h) {
                    var a = 1;
                } else if (midPoint < paddle2.y + .75 * paddle2.h) {
                    var a = 2;
                } else {
                    var a = 3;
                }
    
                this.dx = -cos(this.angles[a]);
                this.dy = -sin(this.angles[a]);

                if (this.speed < this.maxSpeed) {
                    this.speed += this.speedIncrease;
                }
            }

            if (this.x + this.w > width) {
                score1 += 1;
                this.reset(-1)
            }
        }

        if (this.y <= 0 || this.y + this.w >= height) {
            this.dy *= -1;
        }
    }
}

function Box(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

function collides(x1, y1, w1, h1, x2, y2, w2, h2) {
    let box1 = new Box(x1, y1, w1, h1);
    let box2 = new Box(x2, y2, w2, h2);

    if (box1.x >  box2.x + box2.w) {
        return false;
    } else if (box1.x + box1.w < box2.x) {
        return false;
    } else if (box1.y > box2.y + box2.h) {
        return false;
    } else if (box1.y + box1.h < box2.y) {
        return false;
    }
    return true;
}

let paddle, paddle2, ball;
let score1 = 0; score2 = 0;

let retroFont;


function preload() {
    retroFont = loadFont("fonts/bit5x3.ttf");
}

function setup() {
    createCanvas(600, 480);
    paddle = new Paddle(10, height / 2, 40);
    paddle2 = new Paddle(width - 20, height / 2, 40);
    ball = new Ball(width / 2, height / 2, 5);

    //setup font
    textSize(72);
    textFont(retroFont);
}

function draw() {
    background(0);

    if (keyIsDown(UP_ARROW)) {
        paddle2.move(-1);
    } else if (keyIsDown(DOWN_ARROW)) {
        paddle2.move(1);
    } else {
        paddle2.move(0);
    }

    if (keyIsDown(87)) {
        paddle.move(-1);
    } else if (keyIsDown(83)) {
        paddle.move(1);
    } else {
        paddle.move(0);
    }

    paddle.update();
    paddle.draw();

    paddle2.update();
    paddle2.draw();

    ball.update();
    ball.draw();

    // Draw the scores
    text(score1.toString(), width / 2 - 80, 60);
    text(score2.toString(), width / 2 + 40, 60);
    
}