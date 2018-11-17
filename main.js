var img, x = 200,
  y = 200,
  rot = 0,
  spd = 0,
  canvas;
var t = {};

function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
}

// Movimentação
function move() {
  if (keyIsDown(68) || keyIsDown(39)) { // D
    if (rot >= 360) rot = 0;
    rot += 0.5;
  }
  if (keyIsDown(65) || keyIsDown(37)) { // A
    if (rot <= 0) rot = 360;
    rot -= 0.5;
  }
  if (keyIsDown(87) || keyIsDown(38)) { // W
    if (spd < 1) spd += 0.01;
  }
  if (keyIsDown(83) || keyIsDown(40)) { // S
    if (spd > -1) spd -= 0.01;
  }
}

// Interface
function dInterface(){
  textSize(20);
	text('Velocidade: '+Math.floor(spd*10)+' ', 10, 30);
  text('Rotação: '+Math.floor(rot)+' ', 150, 30);
}

function draw() {
  background('#37a2e7');
  // Interface
  	dInterface();
  // Elementos do mapa
  fill(12);
  quad(555, 300, 500, 400, 500, 100, 400, 100);
  
  // Personagem
  translate(x, y);
  //vmk = atan2(mouseY - y, mouseX - x);
  rotate(radians(rot));
  imageMode(CENTER);
  image(img, 0, 0, 100, 100);

  // Movimentação
  move();
  y += sin(radians(rot)) * spd;
  x += cos(radians(rot)) * spd;
}
