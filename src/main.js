let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const updateScore=function (points) {
  let updatedScore=game.incrementScore(points);
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

const startPlay=function () {
  document.getElementById('playerMode').disabled=true;
  document.getElementById('botMode').disabled=true;
  startPlayGame();
}

const startBot=function () {
  document.getElementById('playerMode').disabled=true;
  document.getElementById('botMode').disabled=true;
  startBotGame();
}
