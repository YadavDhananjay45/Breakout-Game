let board;
let boardHeight = 500;
let boardWidth = 500;
let context;

let playerWidth = 80;
let playerHeight = 10;
let dx;
let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  dx: 5,
};

window.onload = function () {
  board = document.getElementById("box");
  context = board.getContext("2d");
  board.style.border = "2px solid red";
  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
  window.addEventListener("keydown", movePlayer);
};
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);
}

function outOfBorder(xPos) {
  return xPos < 0 || xPos + playerWidth > boardWidth;
}

function movePlayer(e) {
  if (e.code == "ArrowLeft") {
    let nextPlayerX = player.x - player.dx;
    if (!outOfBorder(nextPlayerX)) {
      player.x -= player.dx;
    }
  } 
  else if (e.code == "ArrowRight") {
    let nextPlayerX = player.x + player.dx;
    if (!outOfBorder(nextPlayerX)) {
      player.x += player.dx;
    }
  }
}
