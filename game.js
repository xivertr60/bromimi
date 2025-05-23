const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mario = new Image();
mario.src = 'assets/mario.png';

let x = 50;
let y = 300;
let velocityY = 0;
let jumping = false;

function drawMario() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mario, x, y, 50, 50);
}

function update() {
  if (jumping) {
    velocityY += 1.5; // gravedad
    y += velocityY;
    if (y >= 300) {
      y = 300;
      velocityY = 0;
      jumping = false;
    }
  }
  drawMario();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !jumping) {
    velocityY = -20;
    jumping = true;
  }
});

mario.onload = () => {
  update();
};

