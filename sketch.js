var rows, cols;
var w = 60;
var grid = [];
var gridScore = [];
var score = 0;
var canvas;

var player1 = true;
var player2 = false;
var score1 = 0;
var score2 = 0;

var a, b, c, d, p, q, r, s;
a = b = c = d = p = false;
var playerturn = 0;
var p1 = 0;
var p2 = 0;

var scorecard, p1Score, p2Score, msgPlayer, playerSelect, winningmsg;
var ps = 0;
var ps1 = true;
var ps2 = false;


function setup() {
  canvas = createCanvas(0.6 * windowWidth, 0.94 * windowHeight);
  background(251, 238, 193);

  canvas.position(10, 0.16 * windowHeight);
  canvas.style('border-radius: 35px;');

  rows = floor((height) / w);
  cols = floor((width) / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {

      if (j == 0 && i == 0 || j == 0 && i == (cols - 1) || j == (rows - 1) && i == (cols - 1) || j == (rows - 1) && i == 0) {
        p = true;
      } else {

        if (j == 0)
          a = true;
        else
          a = false;
        if (i == (cols - 1))
          b = true;
        else
          b = false;
        if (i == 0)
          c = true;
        else
          c = false;
        if (j == (rows - 1))
          d = true;
        else
          d = false;

        p = false;
      }

      var e = new Cell(i, j, w, a, b, c, d, p);
      grid.push(e);
      gridScore.push(e);

    }
  }

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  scorecard = select('.scorecard');
  scorecard.position(0.64 * windowWidth, 0.6 * height);

  p1Score = select('#p1Score');
  p2Score = select('#p2Score');
  msgPlayer = select('#msgPlayer');
  playerSelect = select('.playerSelect');
  winningmsg = select('#winningmsg');

  p1Score.html('Player1 : ' + score1);
  p2Score.html('Player2 : ' + score2);
  playerSelect.position(0.64 * windowWidth, 0.2 * windowHeight);

}


function draw() {
  if(ps>=0){
    if(ps == 1){
      ps1 = !ps1;
      ps2 = !ps2;
    }
    ps = 0;
  }
  if(ps1)
    msgPlayer.html('Player 2 turn');
  if(ps2)
    msgPlayer.html('Player 1 turn');
}


function mousePressed(){

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].showBolder()) {

      playerturn++;
      if (playerturn == 2) {
        ps++;
        playerturn = 0;

        if(p1 == 0 && p2 == 0){
        	player1 = !player1;
        	player2 = !player2;
        } else {
        	if(p1>0){
            player1 = true;
        		player2 = false;
          	p1 = 0;
        	}

        	if(p2>0){
            player1 = false;
        		player2 = true;
          	p2 = 0;
       	 	}
        }

        for (let i = (gridScore.length - 1); i >= 0; i--) {
          if (gridScore[i].IsEnclosed(player1, player2)) {
            ps++;
            if (player1 == true && player2 == false){
              score1++;
              player1 = true;
              player2 = false;
  						p1++;
              p1Score.html('Player1 : ' + score1);
            }
        	if (player2 == true && player1 == false){
              score2++;
            	player1 = false;
            	player2 = true;
            	p2++;
              p2Score.html('Player2 : ' + score2);
            }
          gridScore.splice(i, 1);
          if(gridScore.length <= (cols*2 + rows*2 - 4)){
            $('#myModal2').modal('show');
            if(score1 > score2)
              winningmsg.html("Player1 is the winner <br> Congrats!!");
            else if(score2 > score1)
              winningmsg.html("Player2 is the winner <br> Congrats!!");
            else
              winningmsg.html("Its a draw");
           }
          }
      	}

      }

    }
  }
}


function onTheLine(x1, y1, x2, y2) {

  var d = dist(x1, y1, x2, y2);
  var d1 = dist(mouseX, mouseY, x1, y1);
  var d2 = dist(mouseX, mouseY, x2, y2);
  var buffer = 0.1;

  if (d1 + d2 >= d - buffer && d1 + d2 <= d + buffer) {
    stroke(0);
    strokeWeight(5);
    line(x1, y1, x2, y2);
    return true;
  }
  return false;
}


function reset(){
  clear();
  canvas = createCanvas(0.6 * windowWidth, 0.94 * windowHeight);
  background(251, 238, 193);
  for(let i=0; i<grid.length; i++){
    grid[i].reset();
    grid[i].show();
  }
  gridScore = grid.slice(0, grid.length);
  score1 = 0;
  score2 = 0;
  p1Score.html('Player1 : ' + score1);
  p2Score.html('Player2 : ' + score2);

}
