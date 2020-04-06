import utils, { randomIntFromRange, randomColor } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", init);

let gravity = 1;
let friction = 0.97;
// Objects
class Ball {
  constructor(x, y, radius, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = dy;
    this.dx = dx;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx * friction;
    }

    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }
}

let balls = [];
// Implementation

function init() {
  balls = [];
  for (let i = 0; i < 100; i++) {
    const radius = randomIntFromRange(8, 20);
    var x = randomIntFromRange(0 + radius, canvas.width - radius * 2);
    var y = randomIntFromRange(0 + radius, canvas.height - radius * 2);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = randomColor(colors);
    balls.push(new Ball(x, y, radius, color, dy, dx));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  balls.forEach((ball) => ball.update());
}

init();
animate();
