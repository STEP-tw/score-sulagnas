const makeSnake=function () {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
}

const updateGame=function () {
  game.grow();
  updateScore(10);
  game.createFood();
  drawFood(game.getFood());
}

const animateSnake=function() {
  makeSnake()
  if(game.hasSnakeEatenFood()) {
    updateGame();
  }
  if(game.isTouchedToWall(numberOfRows,numberOfCols) || game.snake.hasEatenItself()){
    gameOver();
  }
};

const changeSnakeDirectionByKey=function(event) {
  switch (event.code) {
    case "KeyA":
      game.turnLeft();
      break;
    case "KeyD":
      game.turnRight();
      break;
    case "KeyC":
      game.grow();
      break;
    default:
  }
};

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirectionByKey;
  grid.focus();
};

const startPlayGame=function() {
  document.getElementById('score').style.visibility='visible';
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  addKeyListener();
  animator=setInterval(animateSnake,50);
};
