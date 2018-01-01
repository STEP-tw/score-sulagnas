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
  console.log('food');
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

const turnIfSnakeIsInEast=function (snakeHead,food) {
  if(snakeHead.x>food.x){
    if(snakeHead.y>food.y){
      return game.turnLeft();
    }
    return game.turnRight();
  }
};

const turnIfSnakeIsInWest=function (snakeHead,food) {
  if(snakeHead.x<food.x){
    if(snakeHead.y>food.y){
      return game.turnRight();
    }
    return game.turnLeft();
  }
};

const chooseSnakeDirections=function (direction) {
  let snakeHead=game.snake.getHead();
  let food=game.food.position;
  let directions={
    'east':turnIfSnakeIsInEast,
    'west':turnIfSnakeIsInWest,
    'north':turnIfSnakeIsInNorth,
    'south':turnIfSnakeIsInSouth
  }
  return directions[direction](snakeHead,food);
}

const turnSnake=function () {
  let snakeHead=game.snake.getHead();
  chooseSnakeDirections(snakeHead.direction)
};

const updateGameAndBot=function () {
  ++counter;
  game.grow();
  updateScore(10);
  getNextFood();
  turnSnake();
}

const doIfFirstFoodIsBehindSnake=function () {
  if(game.snake.getHead().x>game.food.position.x){
    ++counter;
    if(game.snake.getHead().y<game.food.position.y){
      return game.turnRight();
    }
    return game.turnLeft();
  }
}

const makeSnakeBot=function () {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
}

let counter=0;
const animateSnakeBot=function() {
  makeSnakeBot();
  changeSnakeDirection();
  if(counter==0){
    doIfFirstFoodIsBehindSnake();
  }
  if(game.hasSnakeEatenFood()) {
    updateGameAndBot();
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
