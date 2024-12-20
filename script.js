const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // Size of each grid square
const rows = canvas.height / box;
const columns = canvas.width / box;

let snake = [{ x: 8 * box, y: 8 * box }];
let food = { x: Math.floor(Math.random() * columns) * box, y: Math.floor(Math.random() * rows) * box };
let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyMap = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
  };
  const oppositeDirection = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };
  const newDirection = keyMap[event.key];
  if (newDirection && newDirection !== oppositeDirection[direction]) {
    direction = newDirection;
  }
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw Snake
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

  // Move Snake
  const head = { ...snake[0] };
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Check Collision
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    alert("Game Over! Your score: " + score);
    document.location.reload();
  }

  snake.unshift(head);

  // Check Food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * columns) * box, y: Math.floor(Math.random() * rows) * box };
  } else {
    snake.pop();
  }

  // Draw Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

setInterval(draw, 100);
