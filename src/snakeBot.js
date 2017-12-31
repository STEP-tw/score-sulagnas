const foodIsOverHead=function (snakeHead) {
  if(snakeHead.direction=='east'){
    game.turnRight();
  }
  if(snakeHead.direction=='west'){
    game.turnLeft();
  }
};

const foodIsBelowHead=function (snakeHead) {
  if(snakeHead.direction=='west'){
    game.turnRight();
  }
  if(snakeHead.direction=='east'){
    game.turnLeft();
  }
};

const sameXCoordOfSnakeAndFood=function (snakeHead,food) {
  if(snakeHead.y<food.y){
    foodIsOverHead(snakeHead);
  }
  if(snakeHead.y>food.y){
    foodIsBelowHead(snakeHead);
  }
};

const foodIsInRightOfHead=function (snakeHead) {
  if(snakeHead.direction=='north'){
    game.turnRight();
  }
  if(snakeHead.direction=='south'){
    game.turnLeft();
  }
};

const foodIsInLeftOfHead=function (snakeHead) {
  if(snakeHead.direction=='south'){
    game.turnRight();
  }
  if(snakeHead.direction=='north'){
    game.turnLeft();
  }
};
const sameYCoordOfSnakeAndFood=function (snakeHead,food) {
  if(snakeHead.x<food.x){
    foodIsInRightOfHead(snakeHead);
  }
  if(snakeHead.x>food.x){
    foodIsInLeftOfHead(snakeHead);
  }
};

const changeSnakeDirection=function () {
  let snakeHead=game.snake.getHead();
  let food=game.food.position;
  if(snakeHead.x==food.x){
    sameXCoordOfSnakeAndFood(snakeHead,food);
  }
  if(snakeHead.y==food.y){
    sameYCoordOfSnakeAndFood(snakeHead,food);
  }
};

const getNextFood=function () {
  game.createFood();
  drawFood(game.getFood());
};

const turnIfSnakeIsInSouth=function (snakeHead,food) {
  if(snakeHead.x<food.x){
    return game.turnLeft();
  }
  return game.turnRight();
};

const turnIfSnakeIsInNorth=function (snakeHead,food) {
  if (snakeHead.x>food.x){
    return game.turnLeft();
  }
  return game.turnRight();
};

const turnSnake=function () {
  let snakeHead=game.snake.getHead();
  let food=game.food.position;
  if(snakeHead.direction=='south'){
    turnIfSnakeIsInSouth(snakeHead,food);
  }
  else{
    turnIfSnakeIsInNorth(snakeHead,food);
  }
  changeSnakeDirection();
};

const animateSnakeBot=function() {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  changeSnakeDirection();
  if(game.hasSnakeEatenFood()) {
    game.grow();
    updateScore(10);
    getNextFood();
    turnSnake();
  }
  if(game.isTouchedToWall(numberOfRows,numberOfCols) || game.snake.hasEatenItself()){
    gameOver();
  }
};

const startBotGame=function() {
  document.getElementById('score').style.visibility='visible';
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  animator=setInterval(animateSnakeBot,10);
};
