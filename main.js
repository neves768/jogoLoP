var img, img2, IAone, a, x = 200,
  y = 200,
  rot = 0,
  rotInfluenciatus = 0,
  spd = 0,
  maxSpd = 1,
  movingTimao = false,
  // Câmera
  px = 0,
  py = 0;

function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
  IAone = loadImage(a);
  img2 = loadImage(timao);
}

function getRandomIntInclusive(min, max) { // Função de: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*################################
						Mecanicas
################################*/

/*
~~~~~~> Atirar
*/

tiros = [];

function atirar() {
  tiros[tiros.length] = {
    x: x,
    y: y,
    rot: rot + 90
  };
}

function keyPressed() {
  if (keyCode == 32) {
    atirar();
    spawnAIShip(0);
  }
}

/*
~~~~~~> Movimentação
*/

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
    if (spd < maxSpd) spd += 0.03;
  }
  if (keyIsDown(83) || keyIsDown(40)) { // S
    if (spd > -maxSpd) spd -= 0.03;
  }
}

/*################################
						Mapa
################################*/

function drawMap() {
  quad(555, 300, 500, 400, 500, 100, 400, 100);
}

/*################################
						Navios & IA
################################*/
/*
~~~~~~> Tipos de Embarcações
*/
navios = [{
  nome: "Navio Inglês",
  spd: {
    aceleracao: 0.3,
    maxi: 1
  },
  shipimg: IAone
}];

naviosAt = [];

function spawnAIShip(id) {
  if (id == -1) id = getRandomIntInclusive(0, navios.length - 1);
  naviosAt[naviosAt.length] = {
    ID: id,
    vida: 50,
    x: 60,
    y: 200,
    shipimg: navios[id].shipimg
  };
}
spawnAIShip(0);

/*
~~~~~~> Visual
*/

function healthBar(vida) {
  quad(-10, -40, -10, -30, 40, -30, 40, -40);
  quad(-10, -40, -10, -30, 10 + (vida * 0.3), -30, 10 + (vida * 0.3), -40);
}

/*
~~~~~~> Inteligência Artificial
*/

function drawShips() {
  for (i = 0; i < naviosAt.length; i++) {
    push();
    //console.log(i);
    translate(naviosAt[i].x + 100, naviosAt[i].y);
    imageMode(CENTER);
    //green();
    healthBar(naviosAt[i].vida);
    image(IAone, 0, 0, 100, 100);
    pop();
  }
}

function runShipIA() {
  //drawShips();
}

/*
~~~~~~> Navio do Usuário
*/

function navio() {
  push();
  translate(x, y);
  //vmk = atan2(mouseY - y, mouseX - x);
  rotate(radians(rot));
  imageMode(CENTER);
  image(img, 0, 0, 100, 100);
  pop();

  // Movimentação do Navio
  rot += rotInfluenciatus / 900;
  if (rot >= 360) rot = 0;
  if (rot < 0) rot = 360;
  move();
  addition = cos(radians(rot)) * spd;
  x += addition;
  px += addition;
  addition = sin(radians(rot)) * spd;
  y += sin(radians(rot)) * spd;
  py += addition;
}

/*################################
						Interface
################################*/

function dInterface() {
  push();
  textSize(20);
  text('Velocidade: ' + Math.floor(spd * 10) + ' ', 10, 30);
  text('Rotação: ' + Math.floor(rot) + ' ', 150, 30);


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

function draw() {
  background('#37a2e7');

  // Elementos do mapa
  push();
  translate(-px, -py);
  drawMap();
  drawShips();
  pop();

  // Mecanica dos Tiros [Necessita otimização e melhorias]
  push();
  for (i = 0; i < tiros.length; i++) {
    tiros[i].x += cos(radians(tiros[i].rot)) * 1;
    tiros[i].y += sin(radians(tiros[i].rot)) * 1;
    //translate(tiros[i].x, tiros[i].y);
    quad(tiros[i].x, tiros[i].y, tiros[i].x, tiros[i].y + 5, tiros[i].x + 5, tiros[i].y + 5, tiros[i].x + 5, tiros[i].y);
  }
  pop();

  // Navio do Jogador
  navio();

  // Run IA
  runShipIA();

  // Interface
  dInterface();
}
