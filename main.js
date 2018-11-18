var img, img2, x = 200,
  y = 200,
  rot = 0,
  rotInfluenciatus = 0,
  spd = 0,
  movingTimao = false;
var t = {};

function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
  IAone = loadImage(a);
  img2 = loadImage(timao);
}

// Movimentação
function move() {
  if (keyIsDown(68) || keyIsDown(39)) { // D
    //if (rot >= 360) rot = 0;
    //rot += 0.3;
    if (rotInfluenciatus <= 80) rotInfluenciatus += 2;
    movingTimao = true;
  } else {
    movingTimao = false
  }
  if (keyIsDown(65) || keyIsDown(37)) { // A
    //if (rot <= 0.3) rot = 360;
    //rot -= 0.3;
    if (rotInfluenciatus >= -80) rotInfluenciatus -= 2;
    movingTimao = true;
  } else {
    movingTimao = false
  }
  if (keyIsDown(87) || keyIsDown(38)) { // W
    if (spd < 1) {
      if (spd >= 0 && spd <= 0.1) spd += 1 / frameCount;
    }
  }
  if (keyIsDown(83) || keyIsDown(40)) { // S
    if (spd > -1) spd -= 1 / 30;
  }
}

// Interface
function dInterface() {
  textSize(20);
  text('Velocidade: ' + Math.floor(spd * 10) + ' ', 10, 30);
  text('Rotação: ' + Math.floor(rot) + ' ', 150, 30);

  push();
  translate(400, 800);
  rotate(radians(rotInfluenciatus));
  imageMode(CENTER);
  image(img2, 0, 0, 200, 200);
  //quad(0, 50, 0, 50, 20, 1, 3, 1);
  pop();

  // Timão
  if (rotInfluenciatus > 0 && !movingTimao) rotInfluenciatus -= 0.5;
  else if (rotInfluenciatus < 0 && !movingTimao) rotInfluenciatus += 0.5;
}

function drawMap() {
  quad(555, 300, 500, 400, 500, 100, 400, 100);
}

function navio() {
  push();
  translate(x, y);
  //vmk = atan2(mouseY - y, mouseX - x);
  rotate(radians(rot));
  imageMode(CENTER);
  image(img, 0, 0, 100, 100);
  //quad(0, 50, 0, 50, 20, 1, 3, 1);
  pop();

  // Movimentação do Navio
  rot += rotInfluenciatus / 900;
  if (rot >= 360) rot = 0;
  if (rot < 0) rot = 360;
  move();
  y += sin(radians(rot)) * spd;
  x += cos(radians(rot)) * spd;
}

var shipIA_x = 0, shipIA_y=500;
function runShipIA() {
  push();
  if(shipIA_x > 850) shipIA_x = 0;
  shipIA_x += 1;
  translate(shipIA_x, shipIA_y);
  //rotate(radians(rot));
  imageMode(CENTER);
  image(IAone, 0, 0, 100, 100);
  pop();
}

function draw() {
  background('#37a2e7');
  // Interface
  dInterface();

  // Elementos do mapa
  drawMap();

  // Navio do Jogador
  navio();
  
  // Run IA
  runShipIA();

}
