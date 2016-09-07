var startWidth = 4;

function Point(i, j, x, y, wiggle) {

    this.merged = false;
    this.i = i;
    this.j = j;
    this.id = i + j;
    this.width = startWidth;
    this.height = startWidth;
    this.canGrowTop = true;
    this.canGrowBottom = true;
    this.canGrowRight = true;
    this.canGrowLeft = true;
    this.canGrowX = true;
    this.canGrowY = true;
    // this.center = createVector(random(width), random(height));
    this.center = createVector(x + (-wiggle + (random(wiggle*2))) , y + (-wiggle + (random(wiggle*2))));
    this.bottom = createVector(this.center.x, this.center.y + (startWidth/2));
    this.top = createVector(this.center.x, this.center.y - (startWidth/2));
    this.right = createVector(this.center.x + (startWidth/2), this.center.y);
    this.left = createVector(this.center.x - (startWidth/2), this.center.y);
    this.walls = [true, true, true, true];

    this.corners = [
        {
            pos: createVector(this.center.x - (startWidth/2), this.center.y - (startWidth/2)),
            type: "topLeft",
            growX: -1,
            growY: -1,
        },
        {
            pos: createVector(this.center.x + (startWidth/2), this.center.y - (startWidth/2)),
            type: "topRight",
            growX: 1,
            growY: -1,
        },
        {
            pos: createVector(this.center.x + (startWidth/2), this.center.y + (startWidth/2)),
            type: "bottomRight",
            growX: 1,
            growY: 1,
        },
        {
            pos: createVector(this.center.x - (startWidth/2), this.center.y + (startWidth/2)),
            type: "bottomLeft",
            growX: -1,
            growY: 1,
        }
    ];




    this.show = function() {
        // fill(255);
        // noStroke();
        // fill(this.merged ? 'red' : 255);
        // ellipse(this.center.x, this.center.y, 2, 2);
        // fill('blue');
        // ellipse(this.top.x, this.top.y, 2, 2);
        // ellipse(this.bottom.x, this.bottom.y, 2, 2);
        // ellipse(this.right.x, this.right.y, 2, 2);
        // ellipse(this.left.x, this.left.y, 2, 2);
        stroke(color(255, 255, 255, 125));

        for (var i = 0; i < this.corners.length; i++) {
            var corner = this.corners[i];
            var nextCorner = this.corners[i + 1] ? this.corners[i + 1] : this.corners[0];
            switch (this.corners[i].type) {
                case "topLeft":
                    if (this.walls[0]) line(corner.pos.x, corner.pos.y, nextCorner.pos.x, nextCorner.pos.y);
                    break;
                case "topRight":
                    if (this.walls[1]) line(corner.pos.x, corner.pos.y, nextCorner.pos.x, nextCorner.pos.y);
                    break;
                case "bottomRight":
                    if (this.walls[2]) line(corner.pos.x, corner.pos.y, nextCorner.pos.x, nextCorner.pos.y);
                    break;
                case "bottomLeft":
                    if (this.walls[3]) line(corner.pos.x, corner.pos.y, nextCorner.pos.x, nextCorner.pos.y);
                    break;
                default:
                break;
            }
        }

    }

    this.getNeighbors = function (grid) {
        var neighbors = [];
        var chance = 0.25;

        var top    = grid[this.i-1] ? grid[this.i-1][this.j] : null;
        var right  = grid[this.i] ? grid[this.i][this.j+1] : null;
        var bottom = grid[this.i+1] ? grid[this.i+1][this.j] : null;
        var left   = grid[this.i] ? grid[this.i][this.j-1] : null;

        if (top && !top.merged && Math.random() > 1 - chance) {
            neighbors.push(top);
        }
        if (right && !right.merged && Math.random() > 1 - chance) {
            neighbors.push(right);
        }
        if (bottom && !bottom.merged && Math.random() > 1 - chance) {
            neighbors.push(bottom);
        }
        if (left && !left.merged && Math.random() > 1 - chance) {
            neighbors.push(left);
        }

        return neighbors;
    }

    this.merge = function(pointGrid) {
        var neighbors = this.getNeighbors(pointGrid);
        for (var i = 0; i < neighbors.length; i++) {
            removeWalls(this, neighbors[i]);
            // neighbors[i].merged = true;
        }
        this.merged = true;
    }

    this.grow = function(points) {
        var canGrowTop = this.canGrowTop;
        var canGrowBottom = this.canGrowBottom;
        var canGrowLeft = this.canGrowLeft;
        var canGrowRight = this.canGrowRight;
        if (canGrowTop || canGrowBottom || canGrowLeft || canGrowRight) {
            for (var i = 0; i < points.length; i++) {
                if (points[i].id !== this.id) {
                    if (canGrowTop) {
                        canGrowTop = this.shouldGrowY(this.top, points[i].bottom, this.width);
                    }
                    if (canGrowBottom) {
                        canGrowBottom = this.shouldGrowY(this.bottom, points[i].top, this.width);
                    }
                    if (canGrowLeft) {
                        canGrowLeft = this.shouldGrowX(this.left, points[i].right, this.height);
                    }
                    if (canGrowRight) {
                        canGrowRight = this.shouldGrowX(this.right, points[i].left, this.height);
                    }
                }
            }
        }
        if (canGrowTop || canGrowBottom || canGrowLeft || canGrowRight) {
            for (var i = 0; i < this.corners.length; i++) {
                if (this.corners[i].pos.x >= width) {
                    canGrowRight = false;
                }
                if (this.corners[i].pos.x <= 0) {
                    canGrowLeft = false;
                }
                if (this.corners[i].pos.y >= height) {
                    canGrowBottom = false;
                }
                if (this.corners[i].pos.y <= 0) {
                    canGrowTop = false;
                }

                switch (this.corners[i].type) {
                    case "topRight":
                        if (canGrowRight) this.corners[i].pos.x += this.corners[i].growX;
                        if (canGrowTop) this.corners[i].pos.y += this.corners[i].growY;
                        break;
                    case "topLeft":
                        if (canGrowLeft) this.corners[i].pos.x += this.corners[i].growX;
                        if (canGrowTop) this.corners[i].pos.y += this.corners[i].growY;
                        break;
                    case "bottomRight":
                        if (canGrowRight) this.corners[i].pos.x += this.corners[i].growX;
                        if (canGrowBottom) this.corners[i].pos.y += this.corners[i].growY;
                        break;
                    case "bottomLeft":
                        if (canGrowLeft) this.corners[i].pos.x += this.corners[i].growX;
                        if (canGrowBottom) this.corners[i].pos.y += this.corners[i].growY;
                        break;
                    default:
                }
            }
            if (canGrowLeft) this.width++;
            if (canGrowRight) this.width++;
            if (canGrowTop) this.height++;
            if (canGrowBottom) this.height++;
            this.top = createVector(this.corners[0].pos.x + (this.width/2), this.corners[0].pos.y);
            this.bottom = createVector(this.corners[3].pos.x + (this.width/2), this.corners[3].pos.y);
            this.left = createVector(this.corners[0].pos.x, this.corners[0].pos.y + (this.height/2));
            this.right = createVector(this.corners[1].pos.x, this.corners[0].pos.y + (this.height/2));
        }
        this.canGrowTop = canGrowTop;
        this.canGrowBottom = canGrowBottom;
        this.canGrowRight = canGrowRight;
        this.canGrowLeft = canGrowLeft;
        if (!canGrowTop && !canGrowBottom && !canGrowLeft && !canGrowRight) {
            return true;
        } else {
            return false;
        }
    }

    this.shouldGrowY = function(a, b, height) {
        var shouldGrow = true;
        if (Math.abs(a.y - b.y) < 1 && (Math.abs(a.x - b.x) <= (this.height)) ) shouldGrow = false;
        return shouldGrow;
    }

    this.shouldGrowX = function(a, b, width) {
        var shouldGrow = true;
        if (Math.abs(a.x - b.x) < 1 && (Math.abs(a.y - b.y) <= (this.width))) shouldGrow = false;
        return shouldGrow;
    }
}

function removeWalls(a, b) {
    var x = a.j - b.j;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.i - b.i;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
