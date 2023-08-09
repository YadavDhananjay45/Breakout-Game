let board;
let boardHeight = 500;
let boardWidth = 500;
let context;

let playerWidth = 80;
let playerHeight = 10;
let dx;
let ballWidth=10;
let ballHeight=10;
let ballSpeedX=3;
let ballSpeedY=2;
let blockArray=[];
let blockWidth=50;
let blockHeight=10;
let blockColumns=8;
let blockRows=3;
let blockRowsMax=10;
let blockCount=0;
let blockX=15;
let blockY=45;


let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  dx: 10,
};

let ball={
  x:boardWidth/2,
  y:boardHeight/2,
  width:ballWidth,
  height:ballHeight,
  speedX:ballSpeedX,
  speedY:ballSpeedY,
}

window.onload = function () {
  board = document.getElementById("box");
  context = board.getContext("2d");
  board.style.border = "2px solid red";
  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
  window.addEventListener("keydown", movePlayer);

  createBlocks();

}

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);

  context.fillStyle="whitesmoke";
  ball.x +=ball.speedX;
  ball.y +=ball.speedY;
  context.fillRect(ball.x,ball.y,ball.width,ball.height)

  if((ball.y)<=0){
    ball.speedY*=-1;
  }
  else if(ball.x<=0 || (ball.x + ball.width)>=boardWidth){
    ball.speedX*=-1;
  }
  else if((ball.y+ball.height)>boardHeight+ball.height){

  }
  if (onTopTouch(ball,player) || onBottomTouch(ball,player)){
    ball.speedY*=-1;
  }
  else if(onRightTouch(ball,player) || onLeftTouch(ball,player)){
    ball.speedX*=-1;
  }

  context.fillStyle="gold";
  for (let i=0;i<blockArray.length;i++) {
    let block=blockArray[i];
    if (!block.break) {
      context.fillRect(block.x,block.y,block.width,block.height)
    }
  }
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

function onTouch(a,b) {
  return a.x<b.x+b.width && 
  a.x+a.width>b.x && 
  a.y<b.y+b.height &&
  a.y +a.height>b.y;
}

function onTopTouch(ball, block){
  return onTouch(ball,block) && ((ball.y+ball.height)>= block.y) 
}

function onBottomTouch(ball,block){
  return onTouch(ball,block) && ((block.y+block.height)>=ball.y)
}
function onLeftTouch(ball,block){
  return onTouch(ball,block) && ((ball.x+ball.width)>=block.x)
}
function onRightTouch(ball,block){
  return onTouch(ball,block) && ((block.x+block.width)>=ball.x)
}

function createBlocks(){
  blockArray = [];
  for (let c = 0; c < blockColumns; c++) {
      for (let r = 0; r < blockRows; r++) {
          let block = {
              x : blockX + c*blockWidth + c*10,
              y : blockY + r*blockHeight + r*10,
              width : blockWidth,
              height : blockHeight,
              break : false
          }
          blockArray.push(block);
      }
  }
  blockCount = blockArray.length;
}