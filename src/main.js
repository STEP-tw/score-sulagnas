let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const updateScore=function (points) {
  let updatedScore=game.newScore(points);
  let score=document.getElementById('score');
  score.innerHTML=`your score is: ${updatedScore}`;
}

const gameOver=function () {
  clearInterval(animator);
  showGameOver();
}

const showGameOver=function () {
  let gameOver=document.getElementById('gameOver');
  let restart=document.getElementById('restart');
  gameOver.style.visibility='visible';
  restart.style.visibility='visible';
}

const changeSnakeDirection=function () {
  if(game.snake.getHead().x==game.food.position.x){
    if(game.snake.getHead().y<game.food.position.y){
      if(game.snake.getHead().direction=='east'){
        game.snake.turnRight();
      }
      if(game.snake.getHead().direction=='west'){
        game.snake.turnLeft();
      }
    }
    if(game.snake.getHead().y>game.food.position.y){
      if(game.snake.getHead().direction=='west'){
        game.snake.turnRight();
      }
      if(game.snake.getHead().direction=='east'){
        game.snake.turnLeft();
      }
    }
  }
  if(game.snake.getHead().y==game.food.position.y){
    if(game.snake.getHead().x<game.food.position.x){
      if(game.snake.getHead().direction=='north'){
        game.snake.turnRight();
      }
      if(game.snake.getHead().direction=='south'){
        game.snake.turnLeft();
      }
    }
    if(game.snake.getHead().x>game.food.position.x){
      if(game.snake.getHead().direction=='south'){
        game.snake.turnRight();
      }
      if(game.snake.getHead().direction=='north'){
        game.snake.turnLeft();
      }
    }
  }
}


const animateSnakeBot=function() {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  changeSnakeDirection();
  if(game.isTouchedToWall(numberOfRows,numberOfCols) || game.snake.hasEatenItself()){
    gameOver();
  }
  if(game.hasSnakeEatenFood()) {
    game.grow();
    updateScore(10);
    game.createFood();
    drawFood(game.getFood());
    if(game.snake.getHead().x<game.food.position.x&&game.snake.getHead().direction=='south'||game.snake.getHead().x>game.food.position.x&&game.snake.getHead().direction=='north'){
      game.turnLeft();
    }else if (game.snake.getHead().x>game.food.position.x&&game.snake.getHead().direction=='south'||game.snake.getHead().x<game.food.position.x&&game.snake.getHead().direction=='north'){
      game.turnRight();
    }
    changeSnakeDirection();
  }
}

const animateSnake=function() {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  if(game.isTouchedToWall(numberOfRows,numberOfCols) || game.snake.hasEatenItself()){
    gameOver();
  }
  if(game.hasSnakeEatenFood()) {
    game.grow();
    updateScore();
    game.createFood();
    drawFood(game.getFood());
  }
}

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
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirectionByKey;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
  game.addSnake(snake);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const createGame=function() {
  let topLeft=new Position(0,0,"east");
  let bottomRight=new Position(numberOfCols,numberOfRows,"east");
  game=new Game(topLeft,bottomRight);
}

const startBotGame=function() {
  document.getElementById('score').style.visibility='visible';
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  animator=setInterval(animateSnakeBot,10);
}

const startPlayGame=function() {
  document.getElementById('score').style.visibility='visible';
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  addKeyListener();
  animator=setInterval(animateSnake,100);
}

const startPlay=function () {
  document.getElementById('playerMode').disabled=true;
  document.getElementById('botMode').disabled=true;
  startPlayGame();
};

const startBot=function () {
  document.getElementById('playerMode').disabled=true;
  document.getElementById('botMode').disabled=true;
  startBotGame();
}
