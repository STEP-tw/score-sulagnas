let Game=function (numberOfRows,numberOfCols) {
  this.rows=numberOfRows;
  this.cols=numberOfCols;
  this.snake={};
  this.score=0;
};

Game.prototype={
  addSnake:function (snake) {
    this.snake=snake;
    return this.snake;
  },
  newScore:function () {
    this.score+=10;
    return this.score;
  }
}
