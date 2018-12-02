var img, img2, IAone, a, x = 200,
  y = 200,
  rot = 0,
  rotInfluenciatus = 0,
  spd = 0,
  maxSpd = 1,
  health = 100,
  movingTimao = false,
  // Câmera
  px = 0,
  py = 0;

function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
  IAone = loadImage(a);
  img2 = loadImage(timao);
  _logo = loadImage(logo);
  _balac = loadImage(bala);
  _ilha = loadImage(optmenu);
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

function atirar(x, y, rot) {
  tiros[tiros.length] = {
    x: x,
    y: y,
    rot: rot + 90
  };
}

function keyPressed() {
  if (keyCode == 32) {
    atirar(x, y, rot);
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
    if (spd < maxSpd) spd += 0.02;
  }
  if (keyIsDown(83) || keyIsDown(40)) { // S
    if (spd > -maxSpd) spd -= 0.02;
  }
}

/*################################
						Mapa
################################*/

function drawMap() {
  
  quad(555, 300, 500, 400, 500, 100, 400, 100);
  image(_ilha, 555, 300, 128, 128);
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
    maxi: 0.6
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
    rotation: 0,
    shipimg: navios[id].shipimg
  };
}
spawnAIShip(0);

/*
~~~~~~> Visual
*/

function drawShipName(name){
  //sh();
  rotate(radians(90));
  fill(color(255, 255, 255));
  textSize(10);
  text(name, -(name.length*2), 60);
  //p();
}

function healthBar(vida) {
  strokeWeight(1);
  fill(color(255, 0, 0));
  quad(-30, -30, -30, -20, 20, -20, 20, -30);
  strokeWeight(0);
  fill(color(0, 204, 0));
  quad(-30, -30, -30, -20, -10 + (vida * 0.3), -20, -10 + (vida * 0.3), -30);
}

/*
~~~~~~> Inteligência Artificial
*/

function drawShips() {
  for (i = 0; i < naviosAt.length; i++) {
    push();
    //console.log(i);
    translate(naviosAt[i].x + 100, naviosAt[i].y);
    rotate(naviosAt[i].rotation);
    imageMode(CENTER);
    healthBar(naviosAt[i].vida);
    image(IAone, 0, 0, 100, 100);
    if (naviosAt[i].vida <= 0) {
      naviosAt.splice(i, 1);
    }
    drawShipName(navios[naviosAt[i].ID].nome);
    pop();
  }
}

function runShipIA() {
  //drawShips();
  for(i = 0; i < naviosAt.length; i++){
    atirar(naviosAt[i].x, naviosAt[i].y, naviosAt[i].rotation);
  }
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
  healthBar(health);
  image(img, 0, 0, 100, 100);
  drawShipName("Navio Pirata");
  pop();

  // Movimentação do Navio
  rot += rotInfluenciatus / 800;
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

/*
	MENU PRINCIPAL
*/
var isActive = true,
  botao1_cor = "rgb(131,73,23)",
  botao1_cor_baixo = "rgb(177,126,81)";

function mousePressed() {
  if(!isActive) return;
  if (mouseX >= 320 && mouseX <= 440 && mouseY >= 270 && mouseY <= 300) {
    isActive = false;
  }
}

function hoverButton() {
  if (mouseX >= 320 && mouseX <= 440 && mouseY >= 270 && mouseY <= 300) {
    botao1_cor = "rgb(177,126,81)";
    botao1_cor_baixo = "rgb(131,73,23)";
  } else {
    botao1_cor = "rgb(131,73,23)";
    botao1_cor_baixo = "rgb(177,126,81)";
  }
}

function drawMenu() {
  background('#000000');
  push();
  image(_logo, 280, 50, 200, 200);
  text("Pirate Wars", 350, 225);
  pop();
  // Botão 1
  push();
  strokeWeight(0);
  fill(botao1_cor);
  quad(320, 270, 320, 300, 440, 300, 440, 270);
  fill(botao1_cor_baixo);
  quad(330, 295, 320, 300, 440, 300, 430, 295);
  fill(color(255, 255, 255));
  textSize(15);
  strokeWeight(0.5);
  fill(color(255, 255, 255));
  text("Jogarrr!", 350, 290);
  pop();
  strokeWeight(5);
  stroke(color(255, 255, 255));
  line(mouseX, mouseY, pmouseX, pmouseY);
  text("Pirate Wars foi desenvolvido por Christopher Neves e Alexandre", 200, 750);

  hoverButton();
}

function draw() {
  if (isActive) {
    drawMenu();
    return;
  }
  background('#37a2e7');
  // Elementos do mapa
  push();
  translate(-px, -py);
  drawMap();
  drawShips();
  // Mecanica dos Tiros [Necessita otimização e melhorias]
  for (i = 0; i < tiros.length; i++) {
    tiros[i].x += cos(radians(tiros[i].rot)) * 1;
    tiros[i].y += sin(radians(tiros[i].rot)) * 1;
    image(_balac, tiros[i].x, tiros[i].y, 10, 10);
  }
  pop();

  // Navio do Jogador
  navio();

  // Run IA
  if(frameCount % 200 == 0) runShipIA();

  // Interface
  dInterface();
}
