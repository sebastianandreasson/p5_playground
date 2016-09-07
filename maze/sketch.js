var grid = [];
var width;
var size;
var cols;
var rows;
var current;
var stack = [];

function setup() {
    var canvasWidth = 600;
    var circle = true;
    createCanvas(canvasWidth, canvasWidth);
    background(51);
    frameRate(999);
    size = 10;
    rows = 30;
    cols = 30;
    width = size*rows;
    var r = rows/2;
    translate((canvasWidth-width)/2, (canvasWidth-width)/2);
    for (var i = 0; i < rows; i++) {
        grid[i] = [];
        for (var j = 0; j < cols; j++) {
            var inCircle = (((i - (rows/2)) * (i - (rows/2)) + (j - (cols/2)) * (j - (cols/2))) <= (rows/2) * (cols/2));
            var cell = new Cell({ i: i, j: j, size: size, dead: circle ? !inCircle : false });
            grid[i].push(cell);
        }
    }

    current = grid[20][20];
}

function draw() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            grid[i][j].draw();
            if (stack.indexOf(grid[i][j]) !== -1) {
                grid[i][j].stackHighlight();
            }
        }
    }
    current.visited = true;
    current.highlight();
    var next = current.getNeighbor();
    if (next) {
        stack.push(next);
        removeWalls(current, next);
        current = next;
    } else {
        current = stack.pop();
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
