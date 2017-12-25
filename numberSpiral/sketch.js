var canvasWidth = 800
var canvasHeight = 800
var grid = []
var rows = 16
var cellWidth = 30
var params
var started
var selectedCells = []

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  translate((canvasWidth-(rows*cellWidth)) / 2, (canvasWidth-(rows*cellWidth)) / 2);

  for (var x = 0; x < rows; x++) {
    grid[x] = []
    for (var y = 0; y < rows; y++) {
      var cell = new Cell({ i: x, j: y, size: cellWidth, dead: false })
      grid[x].push(cell)
    }
  }

  var middle = Math.floor(rows / 2) - 1
  params = grid[middle][middle].setNum(1, 'down', 1, 1, false)
}

const start = () => {
  started = true

  var random = grid[Math.floor(Math.random() * rows)][Math.floor(Math.random() * rows)]
  selectedCells.unshift(random.seekMiddle(), random)
}

const drawText = () => {
  fill(255)
  textSize(24)
  const width = ((this.size / 2) - 4)

  text(`Manhattan distance from ${selectedCells[selectedCells.length - 1].num} to middle is : ${selectedCells.length - 1}`, 0, -25)
}

function draw() {
  clear()
  background(50)

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].draw()
    }
  }

  if (params) params = params[0].setNum(params[1], params[2], params[3], params[4], params[5])
  if (!params && !started) {
    start()
  }
  if (started && selectedCells.length) {
    if (selectedCells[0]) selectedCells.unshift(selectedCells[0].seekMiddle())
  }
  if (started && !selectedCells[0]) drawText()
}
