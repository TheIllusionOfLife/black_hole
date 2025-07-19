let player = {
  x: 400,
  y: 300,
  w: 20,
  h: 20,
  vx: 0,
  vy: 0
};

let portals = {
  blue: null,
  orange: null
};

let walls = [
  { x: 0, y: 0, w: 800, h: 10 },
  { x: 0, y: 590, w: 800, h: 10 },
  { x: 0, y: 0, w: 10, h: 600 },
  { x: 790, y: 0, w: 10, h: 600 },
  { x: 100, y: 100, w: 100, h: 10 },
  { x: 200, y: 200, w: 100, h: 10 }
];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);

  // Draw the walls
  fill(255);
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.w, wall.h);
  }

  // Draw the player
  fill(255);
  rect(player.x, player.y, player.w, player.h);

  // Move the player
  if (keyIsDown(LEFT_ARROW)) {
    player.vx = -5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.vx = 5;
  } else {
    player.vx = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    player.vy = -5;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.vy = 5;
  } else {
    player.vy = 0;
  }

  player.x += player.vx;
  player.y += player.vy;

  // Check for wall collision
  for (let wall of walls) {
    if (
      player.x < wall.x + wall.w &&
      player.x + player.w > wall.x &&
      player.y < wall.y + wall.h &&
      player.y + player.h > wall.y
    ) {
      player.x -= player.vx;
      player.y -= player.vy;
    }
  }

  // Draw the portals
  if (portals.blue) {
    fill(0, 0, 255);
    ellipse(portals.blue.x, portals.blue.y, 20, 20);
  }
  if (portals.orange) {
    fill(255, 165, 0);
    ellipse(portals.orange.x, portals.orange.y, 20, 20);
  }

  // Check for portal collision
  if (portals.blue && dist(player.x, player.y, portals.blue.x, portals.blue.y) < 10) {
    if (portals.orange) {
      player.x = portals.orange.x;
      player.y = portals.orange.y;
    }
  }
  if (portals.orange && dist(player.x, player.y, portals.orange.x, portals.orange.y) < 10) {
    if (portals.blue) {
      player.x = portals.blue.x;
      player.y = portals.blue.y;
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    portals.blue = {
      x: mouseX,
      y: mouseY
    };
  } else if (mouseButton === RIGHT) {
    portals.orange = {
      x: mouseX,
      y: mouseY
    };
  }
}
