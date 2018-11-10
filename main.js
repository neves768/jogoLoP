function setup() {
	createCanvas(400, 400);
}

var x = 25,	move = 0;

function keyPressed() {
	if (keyCode === 65 || keyCode === 37) {
		move = -1;
	} else if (keyCode === 68 || keyCode === 39) {
		move = 1;
	}
}

function keyReleased() {
	if (keyCode === 65 || keyCode === 37 || keyCode === 68 || keyCode === 39) {
		move = 0;
	}
}

function draw() {
	background(220);
	if (move != 0) {
		if (move === -1) {
			x -= 0.5;
		} else if (move===1) {
			x+= 0.5;
		}
	}
	ellipseMode(CORNER);
	fill(2);
	ellipse(x, 25, 50, 50);
	ellipseMode(CENTER);
	fill(255, 0, 0);
	ellipse(x + 23, 20, 25, 25);
	quad(300, 20, 340, 20, 340, 60, 300, 60);
}
