var grid = [];
var rows = 10;
var cols = 10;

function point(i, j, x, y) {
    this.i = i;
    this.j = j;

    this.pos = createVector(x, y);
}

function setup() {
    createCanvas(400, 400);

    var rowWidth = width/rows;
    var colHeight = height/cols;

    for (var i = 0; i < rows; i++) {
        grid[i] = [];
        for (var i = 0; i < cols; i++) {
            grid[i].push(new point(i, j, j * rowWidth, i * colHeight));
        }
    }



}

function draw() {
}
