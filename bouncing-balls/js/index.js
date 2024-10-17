class Ball{
  constructor(size, color, xSpeed, ySpeed, xPosition, yPosition){
    this.yPosition = yPosition;
    this.xPosition = xPosition;
    this.ySpeed = ySpeed;
    this.xSpeed = xSpeed;
    this.color = color;
    this.size = size; 
  }
}

// Canvas
let canvas = document.getElementsByTagName("canvas")[0];

let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max){
  return Math.floor(Math.random() * (max - min +1)) + min;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2*Math.PI)
  ctx.fill();
}

Ball.prototype.collide = function(){
  if (collideTop() | collideBott()) {

    this.ySpeed *= -1;

  } else if (collideLeft() | collideRight()) {

    this.xSpeed *= -1;

  }
}

Ball.prototype.update = function(){
  this.xPosition += this.xSpeed;
  this.yPosition += this.yPosition;
}

function collideTop(){
  return (this.yPosition + this.size <= 0);
}

function collideBott(){
  return (this.yPosition + this.size >= canvas.height);
}

function collideLeft(){
  return (this.xPosition + this.size <= 0);
}

function collideRight(){
  return (this.xPosition + this.size >= canvas.width);
}

let balls = [];
function loop(){
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,height,width);

 while(balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0+size, width - size),
    random(0+size, height - size),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    size
  );
  balls.push(ball);
 }

 console.log(balls)

 for (let i = 0; i < balls.length; i++) {
  balls[i].draw();
  balls[i].collide();
  balls[i].update();
 }

 requestAnimationFrame(loop);

}

loop();


