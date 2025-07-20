const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById('game-container').appendChild(canvas);

document.getElementById('loading').style.display = 'none';

// player state
const player = {
  x: 100,
  y: canvas.height - 40,
  width: 20,
  height: 20,
  vx: 0,
  vy: 0,
  onGround: false,
};

const keys = {};
window.addEventListener('keydown', (e) => { keys[e.code] = true; });
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

let bluePortal = null;
let orangePortal = null;

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  if (e.button === 0) {
    bluePortal = pos;
  } else if (e.button === 2) {
    orangePortal = pos;
  }
});
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

function update() {
  // apply gravity
  player.vy += 0.5;

  // horizontal movement
  if (keys['ArrowLeft']) player.vx = -3;
  else if (keys['ArrowRight']) player.vx = 3;
  else player.vx = 0;

  // jump
  if (keys['ArrowUp'] && player.onGround) {
    player.vy = -10;
    player.onGround = false;
  }

  player.x += player.vx;
  player.y += player.vy;

  // simple floor collision
  if (player.y + player.height > canvas.height - 20) {
    player.y = canvas.height - 20 - player.height;
    player.vy = 0;
    player.onGround = true;
  }

  // portal teleport
  if (bluePortal && orangePortal) {
    if (intersects(player, bluePortal)) {
      player.x = orangePortal.x;
      player.y = orangePortal.y;
    } else if (intersects(player, orangePortal)) {
      player.x = bluePortal.x;
      player.y = bluePortal.y;
    }
  }
}

function intersects(p, portal) {
  return (
    p.x < portal.x + 10 &&
    p.x + p.width > portal.x - 10 &&
    p.y < portal.y + 10 &&
    p.y + p.height > portal.y - 10
  );
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw ground
  ctx.fillStyle = '#444';
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

  // draw portals
  if (bluePortal) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(bluePortal.x, bluePortal.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  if (orangePortal) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(orangePortal.x, orangePortal.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // draw player
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
