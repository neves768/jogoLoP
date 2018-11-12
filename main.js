var img, x = 200,
  y = 200,
  rot = 0,
  spd = 1;
var bico_x = 216,
  bico_y = 200;
var t = {};

function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
}

// Movimentação
function move() {
  if (keyIsDown(68) || keyIsDown(39)) { // D
    rot += 0.03;
  }
  if (keyIsDown(65) || keyIsDown(37)) { // A
    rot -= 0.03;
  }
  if (keyIsDown(87) || keyIsDown(38)) { // W
    y -= spd;
  }
  if (keyIsDown(83) || keyIsDown(40)) { // S
    y += spd;
  }
}

function draw() {
  background('#37a2e7');
  // Movimentação
  move();

  // Personagem
  translate(x, y);
  vmk = atan2(mouseY - y, mouseX - x);
  rotate(rot);
  imageMode(CENTER);
  image(img, 0, 0, 200, 200);
    quad(200, 0, 220, 220, 200, 300, 300, 220);
}
