var rows, cols;
var w = 40;
var grid = [];
var gridScore = [];
var score = 0;

var player1 = true;
var player2 = false;
var score1 = 0;
var score2 = 0;

var a, b, c, d, p, q, r, s;
a = b = c = d = p = false;
var playerturn = 0;
var p1 = 0;
var p2 = 0;

function setup() {
  createCanvas(400, 400);
  background(220);

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


}


function draw() {



}


function mousePressed() {

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].showBolder()) {

      playerturn++;
      if (playerturn == 2) {
        
        playerturn = 0;
        // if (player1)
        //   console.log("Player1 turn");
        // if (player2)
        //   console.log("Player2 turn");
          
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
            if (player1 == true && player2 == false){
              score1++;
              player1 = true;
              player2 = false;
  						p1++;
            }
        	if (player2 == true && player1 == false){
              score2++;
            	player1 = false;
            	player2 = true;
            	p2++;
            }
          gridScore.splice(i, 1);
          print("Score1: " + score1 + "  Score2: " + score2);

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