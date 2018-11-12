var img, x=200, y=200;
var t = {};
function setup() {
  createCanvas(800, 800);
  img = loadImage(a);
}

// Movimentação
function move(){
 if(keyIsDown(68) || keyIsDown(39)){
   x += 0.5;
 }
 if(keyIsDown(65) || keyIsDown(37)){
   x -= 0.5;
 }
 if(keyIsDown(87) || keyIsDown(38)){
   y -= 0.5;
 }
  if(keyIsDown(83) || keyIsDown(40)){
    y += 0.5;
  }
}

function draw() {
   background('#37a2e7');
  // Movimentação
  	move();
  // Personagem
   translate(x, y);
   vmk = atan2(mouseY - y, mouseX - x );
   rotate(vmk);
   imageMode(CENTER);
   image(img, 0, 0, 200, 200);
}
