var grid = [];
var size;
var cols;
var rows;
var width;
var canvasWidth;
var circle;
var current;
var stack = [];
var shouldGenerate = false;

var input;
var sizeInput;
var circleCheckbox;
var generateButton;

function setup() {
    size = 10;
    cols = 30;
    rows = 30;
    width = size*rows;
    canvasWidth = 600;
    circle = false;

    createCanvas(canvasWidth, canvasWidth);
    background(51);
    frameRate(999);
    input = createInput("set rows (30)");
    input.input(function(){
        cols = parseInt(this.value());
        rows = parseInt(this.value());
        if (typeof rows === "number" && rows > 0) {
            redrawGrid();
        }
    });

    sizeInput = createInput("set cell size (10)");
    sizeInput.input(function(){
        size = parseInt(this.value());
        if (typeof size === "number" && size > 0) {
            redrawGrid();
        }
    });

    circleCheckbox = createCheckbox("isCircle", false);
    circleCheckbox.changed(function(){
        circle = this.checked();
        redrawGrid();
    });

    generateButton = createButton("GenerateMaze");
    generateButton.mousePressed(startGeneration);

    redrawGrid();
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
    if (shouldGenerate && current) {
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
}

function startGeneration() {
    redrawGrid();
    current = grid[Math.floor(rows/2)][Math.floor(cols/2)];
    shouldGenerate = true;
}
function redrawGrid() {
    createCanvas(canvasWidth, canvasWidth);
    background(51);
    width = size*rows;
    translate((canvasWidth-width) / 2, (canvasWidth-width) / 2);
    shouldGenerate = false;
    grid = [];
    stack = [];

    var r = rows/2;
    for (var i = 0; i < rows; i++) {
        grid[i] = [];
        for (var j = 0; j < cols; j++) {
            var inCircle = (((i - (rows/2)) * (i - (rows/2)) + (j - (cols/2)) * (j - (cols/2))) <= (rows/2) * (cols/2));
            var cell = new Cell({ i: i, j: j, size: size, dead: circle ? !inCircle : false });
            grid[i].push(cell);
        }
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
