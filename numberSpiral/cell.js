const compare = (a, b) => {
  return a.num < b.num ? -1 : a.num > b.num ? 1 : 0
}

class Cell {
  constructor(o) {
    this.pos = createVector(o.i * o.size, o.j * o.size);
    this.marked = false;
    this.i = o.i;
    this.j = o.j;
    this.size = o.size;
  }

  getSmallest() {
    const neighbours = []

    const top    = grid[this.i-1] ? grid[this.i-1][this.j] : null
    const right  = grid[this.i]   ? grid[this.i][this.j+1] : null
    const bottom = grid[this.i+1] ? grid[this.i+1][this.j] : null
    const left   = grid[this.i]   ? grid[this.i][this.j-1] : null

    if (top) neighbours.push(top)
    if (right) neighbours.push(right)
    if (bottom) neighbours.push(bottom)
    if (left) neighbours.push(left)

    if (neighbours.length > 0) {
      neighbours.sort(compare)
      return neighbours[0]
    }
    return
  }

  highlight () {
    noStroke()
    fill(255, 255, 51, 90)
    rect(this.pos.x, this.pos.y, this.size, this.size)

  }

  seekMiddle () {
    this.marked = true;

    if (this.num > 1) {
      return this.getSmallest()
    }
  }

  setNum (num, direction, amount, remaining, inc) {
    this.num = num;

    let next
    let nextDirection = direction
    switch (direction) {
      case 'up':
        next = grid[this.i-1] ? grid[this.i-1][this.j] : null
        if (remaining === amount) nextDirection = 'left'
        break;
      case 'right':
        next = grid[this.i] ? grid[this.i][this.j+1] : null
        if (remaining === amount) nextDirection = 'up'
        break;
      case 'down':
        next = grid[this.i+1] ? grid[this.i+1][this.j] : null
        if (remaining === amount) nextDirection = 'right'
        break;
      case 'left':
        next = grid[this.i] ? grid[this.i][this.j-1] : null
        if (remaining === amount) nextDirection = 'down'
        break;
    }
    if (amount === remaining) {
      remaining = 0
      if (inc) amount++
      inc = !inc
    }
    remaining++
    if (next) {
      return [next, this.num + 1, nextDirection, amount, remaining, inc]
    }
  }

  draw () {
    const x = this.pos.x
    const y = this.pos.y
    stroke(0)
    line(x, y, x + this.size, y)
    line(x + this.size, y, x + this.size, y + this.size)
    line(x + this.size, y + this.size, x, y + this.size)
    line(x, y + this.size, x, y)

    if (this.marked) {
      this.highlight()
    }
    if (this.num) {
      fill(255)
      textSize(12)
      const offset = 1 + (this.num.toString().length * 3)
      const width = ((this.size / 2) - offset)
      text(this.num, this.pos.x + width , this.pos.y + 20)
    }
  }
}
