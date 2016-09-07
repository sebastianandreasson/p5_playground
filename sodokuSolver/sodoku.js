function createGrid(cols, rows, Object, parent) {
    var array = []
    for (var i = 0; i < cols; i++) {
        array.push([]);
        for (var j = 0; j < rows; j++) {
            var object = new Object(i, j, parent);
            array[i].push(object);
        }
    }
    return array;
}

function SodokuBoard(size) {
    this.n = Math.floor(size / 3);
    this.horizontals = [];
    this.verticals = [];
    this.all = [];
    for (var i = 0; i < size; i++) {
        this.horizontals.push([]);
        this.verticals.push([]);
    }


    this.grid = createGrid(this.n, this.n, SodokuGrid, this);
    for (var i = 0; i < this.horizontals.length; i++) {
        for (var j = 0; j < this.horizontals[i].length; j++) {
            this.all.push(this.horizontals[i][j]);
        }
    }
}

function SodokuGrid(i, j, parent) {
    this.parent = parent;
    this.i = i;
    this.j = j;
    this.width = 150;
    this.pos = createVector(i * this.width, j * this.width);

    this.show = function() {
        stroke(255);
        noFill();
        rect(this.pos.x, this.pos.y, this.width, this.width);
        stroke(255, 0, 0);
    }
    this.showGrid = function() {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].show();
            }
        }
    }

    this.grid = createGrid(3, 3, SodokuItem, this);
};

function SodokuItem(i, j, parent) {
    this.parent = parent;
    this.i = i;
    this.j = j;
    this.gi = ((this.parent.i * this.parent.parent.n) + this.i);
    this.gj = ((this.parent.j * this.parent.parent.n) + this.j);
    this.id = "" + this.gi + this.gj;
    this.width = parent.width / 3;
    var x = parent.pos.x + (i * this.width);
    var y = parent.pos.y + (j * this.width);
    this.pos = createVector(x, y);
    this.center = createVector(x + (this.width/2), y + (this.width/2));
    this.value = 0;
    this.valid = null;

    this.parent.parent.verticals[this.gi].push(this);
    this.parent.parent.horizontals[this.gj].push(this);

    this.highlight = false;

    this.show = function() {
        stroke(color(255, 255, 255, 80));
        if (this.highlight) {
            fill(color(0, 255, 0, 80));
        } else {
            noFill();
        }
        rect(this.pos.x, this.pos.y, this.width, this.width);

        noFill();
        if (this.value > 0) {
            stroke(255);
            if (this.valid === true) {
                stroke(color(0, 255, 0, 80));
            } else if (this.valid === false) {
                stroke(color(255, 0, 0, 80));
            }
            textSize(13);
            text(this.value, this.center.x - 3, this.center.y + 3);
        }
    }

    this.checkValue = function(value) {
        console.log("checkValue: " + value);
        console.log(this);
        var isValid = true;
        var grid = this.parent.grid;
        // is in grid
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j].id !== this.id && value === grid[i][j].value) {
                    isValid = false;
                    break;
                }
            }
        }
        console.log(isValid);
        var mainGrid = this.parent.parent;
        // checkInHorizontal
        for (var i = 0; i < mainGrid.horizontals[this.gj].length; i++) {
            var horizontalItem = mainGrid.horizontals[this.gj][i];
            if (horizontalItem.id !== this.id && horizontalItem.value === value) {
                isValid = false;
                break;
            }
        }
        console.log(isValid);
        // checkInVertical
        for (var i = 0; i < mainGrid.verticals[this.gi].length; i++) {
            var verticalItem = mainGrid.verticals[this.gi][i];
            if (verticalItem.id !== this.id && verticalItem.value === value) {
                isValid = false;
                break;
            }
        }
        console.log(isValid);
        return isValid;
    }

    this.incValue = function() {
        this.value++;
        if (this.value > 9) this.value = 0;

        this.valid = this.checkValue(this.value);
    }

    this.toggleHighlightHorizontal = function() {
        var mainGrid = this.parent.parent;
        var lineArray = [];
        for (var i = 0; i < mainGrid.horizontals.length; i++) {
            if (mainGrid.horizontals[i].indexOf(this) != -1) {
                lineArray = mainGrid.horizontals[i];
            }
        }
        for (var i = 0; i < lineArray.length; i++) {
            lineArray[i].highlight = !lineArray[i].highlight;
        }
    }

    this.toggleHightlightVertical = function() {
        var mainGrid = this.parent.parent;
        var lineArray = [];
        for (var i = 0; i < mainGrid.verticals.length; i++) {
            if (mainGrid.verticals[i].indexOf(this) != -1) {
                lineArray = mainGrid.verticals[i];
            }
        }
        for (var i = 0; i < lineArray.length; i++) {
            lineArray[i].highlight = !lineArray[i].highlight;
        }
    }
}
