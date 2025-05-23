
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const grid = 20;
const cols = canvas.width / grid;
const rows = canvas.height / grid;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

const arena = Array.from({length: rows}, () => Array(cols).fill(0));

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect((x + offset.x) * grid, (y + offset.y) * grid, grid - 1, grid - 1);
      }
    })
  );
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
  player.matrix.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value !== 0) arena[y + player.pos.y][x + player.pos.x] = value;
    })
  );
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  return m.some((row, y) =>
    row.some((value, x) => value !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0)
  );
}

function createPiece() {
  return [[1, 1], [1, 1]];
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }
  dropCounter = 0;
}

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') player.pos.x--;
  else if (event.key === 'ArrowRight') player.pos.x++;
  else if (event.key === 'ArrowDown') playerDrop();
});

const player = {
  pos: {x: 5, y: 0},
  matrix: createPiece(),
};

update();
