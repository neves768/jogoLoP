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
    if (rot >= 360) rot = 0;
    rot += 1;
  }
  if (keyIsDown(65) || keyIsDown(37)) { // A
    if (rot <= 0) rot = 360;
    rot -= 1;
  }
  if (keyIsDown(87) || keyIsDown(38)) { // W
    if (rot >= 0 && rot <= 90) { // único funcional até agora
      // rot = 90 => x=0; y+=1
      // rot = 0 => x+=1; y=0
      y += (spd/90) * rot;
      x += spd - (rot / 90); // rot90.x = 0; rot0.x = 1;
    } else if (rot >= 270 && rot <= 360) {
      // rot = 270 => x=0; y-=1;
      // rot = 360 => x+=1; y=0;
      newRot = 360-rot;
      console.log(rot);
      x += 1 - (rot / 270);
      y -= 0.0037037037037 * rot;
    } else if (rot > 90 && rot <= 180) {
      // rot = 180 => x-=1; y=0;
      // rot = 90 => x=0; y+=1;
    } else if (rot > 180 && rot < 270) {}

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
  quad(x + 100, y, 220, 220, 200, 300, 300, 220);
  translate(x, y);
  vmk = atan2(mouseY - y, mouseX - x);
  angleMode(DEGREES);
  rotate(rot);
  imageMode(CENTER);
  image(img, 0, 0, 200, 200);
  push();
}
