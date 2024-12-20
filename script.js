const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;

function gameLoop() {
  // Move Snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  // Check Food Collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
  } else {
    snake.pop();
  }

  // Check Wall Collision
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head)) {
    alert("Game Over! Your score: " + score);
    document.location.reload();
  }

  // Draw
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  snake.forEach((part) => ctx.fillRect(part.x, part.y, 20, 20));

  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, 20, 20);
}

function collision(head) {
  return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

function changeDirection(event) {
  const keyMap = {
    ArrowUp: { x: 0, y: -20 },
    ArrowDown: { x: 0, y: 20 },
    ArrowLeft: { x: -20, y: 0 },
    ArrowRight: { x: 20, y: 0 },
  };
  const newDirection = keyMap[event.key];
  if (newDirection) {
    direction = newDirection;
  }
}

document.addEventListener("keydown", changeDirection);

setInterval(gameLoop, 200);

