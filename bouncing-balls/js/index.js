class Ball {
  constructor(size, color, xSpeed, ySpeed, xPosition, yPosition) {
    this.size = size;
    this.color = color;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }


  collide() {
    if (this.yPosition - this.size <= 0 || this.yPosition + this.size >= height) {
      this.ySpeed *= -1; 
      this.changeColor();
    }

    if (this.xPosition - this.size <= 0 || this.xPosition + this.size >= width) {
      this.xSpeed *= -1; 
      this.changeColor();
    }
  }
  
  changeColor(){
    this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
  }

  update() {
    this.xPosition += this.xSpeed;
    this.yPosition += this.ySpeed;
  }
}

// Canvas
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let balls = [];
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
      size,
      `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
      random(-7, 7),
      random(-7, 7),
      random(0 + size, width - size),
      random(0 + size, height - size)
    );
    balls.push(ball);
  }

  for (let ball of balls) {
    ball.draw();
    ball.update();
    ball.collide();
  }

  requestAnimationFrame(loop);
}

loop();
