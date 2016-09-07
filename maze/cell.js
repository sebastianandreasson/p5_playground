var Cell = function(o){
    this.visited = o.dead ? true : false;
    this.dead = o.dead ? true : false;
    this.pos = createVector(o.i * o.size, o.j * o.size);
    this.i = o.i;
    this.j = o.j;
    this.size = o.size;

    this.walls = [true, true, true, true]; // top, right, bottom, left
    if (this.dead) {
        this.walls = [false, false, false, false];
    }

    this.getNeighbor = function () {
        var neighbors = [];

        var top    = grid[this.i-1] ? grid[this.i-1][this.j] : null;
        var right  = grid[this.i] ? grid[this.i][this.j+1] : null;
        var bottom = grid[this.i+1] ? grid[this.i+1][this.j] : null;
        var left   = grid[this.i] ? grid[this.i][this.j-1] : null;

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited && Math.random() <= 0.1) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.highlight = function() {
        noStroke();
        fill(0, 0, 255, 100);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }
    this.stackHighlight = function() {
        noStroke();
        fill(0, 0, 255, 50);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    this.draw = function() {
        var x = this.pos.x;
        var y = this.pos.y;
        if (!this.visited) {
            noFill();
        } else if (this.dead){
            noStroke();
            noFill();
            fill(51);
            rect(this.pos.x, this.pos.y, this.size, this.size);
        } else {
            noStroke();
            noFill();
            fill(255);
            rect(this.pos.x, this.pos.y, this.size, this.size);
        }
        stroke(0);
        for (var i = 0; i < this.walls.length; i++) {
            if (this.walls[i]) {
                switch (i) {
                    case 0: // top 
                        line(x, y, x + this.size, y);
                        break;
                    case 1: // right 
                        line(x + this.size, y, x + this.size, y + this.size);
                        break;
                    case 2: // bottom 
                        line(x + this.size, y + this.size, x, y + this.size);
                        break;
                    case 3: // left 
                        line(x, y + this.size, x, y);
                        break;
                    default:
                }
            }
        }
    };
};
