const Game=function(topLeft,bottomRight) {
  this.topLeft=topLeft;
  this.bottomRight=bottomRight;
  this.snake={};
  this.food={};
  this.score=0;
}

Game.prototype.addSnake=function(snake) {
  this.snake=snake;
}

Game.prototype.getSnake=function() {
  return snake;
}

Game.prototype.turnLeft=function() {
  return this.snake.turnLeft();
}

Game.prototype.turnRight=function() {
  return this.snake.turnRight();
}

Game.prototype.grow=function() {
  let growthFactor=this.food.getGrowthFactor();
  return this.snake.grow(growthFactor);
}

Game.prototype.getFood=function() {
  return this.food;
}

Game.prototype.move=function() {
  let details={};
  details.oldHead=this.snake.getHead();
  details.oldTail=this.snake.move();
  details.head=this.snake.getHead();
  return details;
}

Game.prototype.hasSnakeEatenFood=function() {
  return this.snake.head.isSameCoordAs(this.food.getPosition());
}

Game.prototype.createFood=function() {
  let position=generateRandomPosition(this.bottomRight.x,this.bottomRight.y);
  let random=generateRandomNumberBetween(0,10);
  let growthFactor=1;
  let superFood=false;
  if(random>5) {
    growthFactor=10;
    superFood=true;
  }
  this.food=new Food(position,growthFactor,superFood);
}

Game.prototype.incrementScore=function (points) {
  this.score+=points;
  return this.score;
}

Game.prototype.isTouchedToWall=function () {
  let touchInEast = (this.snake.head.direction=='east' && this.snake.head.x==numberOfCols-1);
  let touchInWest = (this.snake.head.direction=='west' && this.snake.head.x==0);
  let touchInNorth = (this.snake.head.direction=='north' && this.snake.head.y==0);
  let touchInSouth = (this.snake.head.direction=='south' && this.snake.head.y==numberOfRows-1);
  return touchInEast||touchInWest||touchInNorth||touchInSouth;
}
