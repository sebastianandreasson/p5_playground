var sodoku = [];

function setup() {
    sodoku = new SodokuBoard(9);

    createCanvas(600, 600);
    console.log(sodoku);

    var string = "100002003040500600007000050080090000000103004600074000030000500009000070200040008";
    loadFromString(string);

    // setTimeout(function() {
    //     solve();
    // }, 2000);
}

function draw() {
    background(51);
    for (var i = 0; i < sodoku.grid.length; i++) {
        for (var j = 0; j < sodoku.grid[i].length; j++) {
            sodoku.grid[i][j].show();
            sodoku.grid[i][j].showGrid();
        }
    }
}

function solve() {
    for (var i = 0; i < sodoku.all.length; i++) {
        var sodokuItem = sodoku.all[i];
        var counter = 0;
        while (!sodokuItem.valid || counter >= 9) {
            sodokuItem.incValue();
            counter++;
        }
    }
}

function mouseClicked() {
    var x = mouseX;
    var y = mouseY;
    console.log("x: " + mouseX + ", y: " + mouseY);

    for (var i = 0; i < sodoku.grid.length; i++) {
        for (var j = 0; j < sodoku.grid[i].length; j++) {
            var sodokuGrid = sodoku.grid[i][j];
            for (var x = 0; x < sodokuGrid.grid.length; x++) {
                for (var y = 0; y < sodokuGrid.grid[x].length; y++) {
                    var sodokuItem = sodokuGrid.grid[x][y];
                    var xMatch = ((mouseX > sodokuItem.pos.x) && (mouseX < (sodokuItem.pos.x + sodokuItem.width)) );
                    var yMatch = ((mouseY > sodokuItem.pos.y) && (mouseY < (sodokuItem.pos.y + sodokuItem.width)) );
                    if (xMatch && yMatch) {
                        console.log(sodokuItem);
                        sodokuItem.incValue();
                        // sodokuItem.toggleHightlightVertical();
                        // sodokuItem.toggleHighlightHorizontal();
                    }
                }
            }
        }
    }
}

function loadFromString(string) {
    for (var i = 0; i < sodoku.all.length; i++) {
        var sodokuItem = sodoku.all[i];
        sodokuItem.value = parseInt(string[i]);
    }

}
