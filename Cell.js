class Cell {
  constructor(i, j, w, a, b, c, d, p) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = this.i * this.w;
    this.y = this.j * this.w;
    this.walls = [true, true, true, true];
    this.line = [false, false, false, false];
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.p = p;
  }

  show() {
    strokeWeight(5);
    stroke(200);
		if(!this.p){
    if (this.a || this.b || this.c || this.d) {
      if (this.a)
        line(this.x + this.w, this.y + this.w, this.x, this.y + this.w);
      if (this.b)
        line(this.x, this.y + this.w, this.x, this.y);
      if (this.c)
        line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
      if (this.d)
        line(this.x, this.y, this.x + this.w, this.y);
    } else {
      line(this.x, this.y, this.x + this.w, this.y);

      line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);

      line(this.x + this.w, this.y + this.w, this.x, this.y + this.w);

      line(this.x, this.y + this.w, this.x, this.y);

    }
    }
  }

  showBolder() {

    if (this.a || this.b || this.c || this.d) {
      if (this.a) {
        if (onTheLine(this.x + this.w, this.y + this.w, this.x, this.y + this.w)) {
          this.line[2] = true;
          madeBold = true;
        }
      }
      if (this.b) {
        if (onTheLine(this.x, this.y + this.w, this.x, this.y)) {
          this.line[3] = true;
          madeBold = true;
        }
      }
      if (this.c) {
        if (onTheLine(this.x + this.w, this.y, this.x + this.w, this.y + this.w)) {
          this.line[1] = true;
          madeBold = true;
        }
      }
      if (this.d) {
        if (onTheLine(this.x, this.y, this.x + this.w, this.y)) {
          this.line[0] = true;
          madeBold = true;
        }
      }

    } else {
      var madeBold = false;
      if (onTheLine(this.x, this.y, this.x + this.w, this.y)) {
        this.line[0] = true;
        madeBold = true;
      }
      if (onTheLine(this.x + this.w, this.y, this.x + this.w, this.y + this.w)) {
        this.line[1] = true;
        madeBold = true;
      }
      if (onTheLine(this.x + this.w, this.y + this.w, this.x, this.y + this.w)) {
        this.line[2] = true;
        madeBold = true;
      }
      if (onTheLine(this.x, this.y + this.w, this.x, this.y)) {
        this.line[3] = true;
        madeBold = true;
      }

    }

    if (madeBold)
      return true;

    return false;
  }

  IsEnclosed(p1, p2) {
    if (this.line[0] == true && this.line[1] == true && this.line[2] == true && this.line[3] == true) {
      if (p1 == false && p2 == true)
        fill(255, 0, 255);
      if (p1 == true && p2 == false)
        fill(0, 255, 255);
      rect(this.x, this.y, this.w, this.w);
      return true;
    }
    return false;
  }


}