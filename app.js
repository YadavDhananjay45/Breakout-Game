let board;
let boardHeight = 600;
let boardWidth = 500;
let context;

let playerWidth = 80;
let playerHeight = 10;
let dx;
let ballWidth = 7;
let ballHeight = 7;
let ballSpeedX = 5;
let ballSpeedY = 2;
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockRowsMax = 10;
let blockCount = 0;
let blockX = 15;
let blockY = 45;
let score = 0;
let gameOver = false;

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  dx: 20,
};

let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  radius: ballWidth,
  width: ballWidth,
  height: ballHeight,
  speedX: ballSpeedX,
  speedY: ballSpeedY,
  sAngle: 0,
};
let startBtn = document.getElementById("startbtn");
startBtn.addEventListener("click", startGame);
const img = new Image();
img.src = "/bg.jpeg";

let restartBtn = document.getElementById("restartbtn");
restartBtn.addEventListener("click", resetGame);

function startGame() {
  board = document.getElementById("box");
  context = board.getContext("2d");
  board.width = boardWidth;
  board.height = boardHeight;
  board.style.border = "2px solid red";
  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
  window.addEventListener("keydown", movePlayer);
  startBtn.style.display = "none";

  createBlocks();
}

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(img, 0, 0, boardWidth, boardHeight);

  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);

  context.fillStyle = "whitesmoke";
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, ball.sAngle, 2 * Math.PI);
  context.fill();

  if (ball.y <= 0) {
    ball.speedY *= -1;
  } else if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
    ball.speedX *= -1;
  } else if (ball.y + ball.height > boardHeight) {
    context.font = "25px sans-serif";
    context.fillText("Gameover :Press 'space' to Restart", 60, 350);
    gameOver = true;
    gameover();
  }
  if (onTopTouch(ball, player) || onBottomTouch(ball, player)) {
    ball.speedY *= -1;
  } else if (onRightTouch(ball, player) || onLeftTouch(ball, player)) {
    ball.speedX *= -1;
  }

  context.fillStyle = "gold";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      if (onTopTouch(ball, block) || onBottomTouch(ball, block)) {
        block.break = true;
        ball.speedY *= -1;
        blockCount -= 1;
        score += 1;
      } else if (onRightTouch(ball, block) || onLeftTouch(ball, block)) {
        block.break = true;
        ball.speedX *= -1;
        blockCount -= 1;
        score += 1;
      }
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }
  if (blockCount == 0) {
    score += 1 * blockColumns * blockRows;
    blockRows = Math.min(blockRows + 1, blockRowsMax);
    createBlocks();
  }
  context.font = "20px sans-serif";
  context.fillText(score, 10, 25);
}

function outOfBorder(xPos) {
  return xPos < 0 || xPos + playerWidth > boardWidth;
}

function movePlayer(e) {
  if (gameOver) {
    if (e.code == "Space") {
      resetGame();
    }
  }
  if (e.code == "ArrowLeft") {
    let nextPlayerX = player.x - player.dx;
    if (!outOfBorder(nextPlayerX)) {
      player.x -= player.dx;
    }
  } else if (e.code == "ArrowRight") {
    let nextPlayerX = player.x + player.dx;
    if (!outOfBorder(nextPlayerX)) {
      player.x += player.dx;
    }
  }
}

function onTouch(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function onTopTouch(ball, block) {
  return onTouch(ball, block) && ball.y + ball.height >= block.y;
}

function onBottomTouch(ball, block) {
  return onTouch(ball, block) && block.y + block.height >= ball.y;
}
function onLeftTouch(ball, block) {
  return onTouch(ball, block) && ball.x + ball.width >= block.x;
}
function onRightTouch(ball, block) {
  return onTouch(ball, block) && block.x + block.width >= ball.x;
}

function createBlocks() {
  blockArray = [];
  for (let c = 0; c < blockColumns; c++) {
    for (let r = 0; r < blockRows; r++) {
      let block = {
        x: blockX + c * blockWidth + c * 10,
        y: blockY + r * blockHeight + r * 10,
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
}
function resetGame() {
  gameOver = false;
  player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 10,
    width: playerWidth,
    height: playerHeight,
    dx: 10,
  };

  ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    radius: ballWidth,
    width: ballWidth,
    height: ballHeight,
    speedX: ballSpeedX,
    speedY: ballSpeedY,
    sAngle: 0,
  };

  blockArray = [];
  blockRows = 3;
  score = 0;
  createBlocks();
  restartBtn.style.display = "none";
}
function gameover() {
  restartBtn.style.display = "block";
  context.clearRect(0.0, board.width, board.height);
}
