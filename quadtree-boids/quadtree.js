class Boundary {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  contains(point) {
    return (
      point.position.x >= this.x - this.w &&
      point.position.x < this.x + this.w &&
      point.position.y >= this.y - this.h &&
      point.position.y < this.y + this.h
    )
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    )
  }
}

class Quadtree {
  constructor(bounds, capacity) {
    this.bounds = bounds
    this.capacity = capacity
    this.points = []
    this.quad = []
  }

  subdivide() {
    const { x, y, w, h } = this.bounds

    return [
      new Quadtree(
        new Boundary(x + w / 2, y - h / 2, w / 2, h / 2),
        this.capacity
      ),
      new Quadtree(
        new Boundary(x - w / 2, y - h / 2, w / 2, h / 2),
        this.capacity
      ),
      new Quadtree(
        new Boundary(x + w / 2, y + h / 2, w / 2, h / 2),
        this.capacity
      ),
      new Quadtree(
        new Boundary(x - w / 2, y + h / 2, w / 2, h / 2),
        this.capacity
      ),
    ]
  }

  insert(point) {
    if (!this.bounds.contains(point)) return

    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    }

    if (!this.quad.length) {
      this.quad = this.subdivide()
    }

    for (let quad of this.quad) {
      if (quad.insert(point)) {
        return true
      }
    }
  }

  query(range) {
    let points = []

    if (!this.bounds.intersects(range)) return []
    for (let p of this.points) {
      if (range.contains(p)) points.push(p)
    }

    return this.quad.reduce((acc, curr) => {
      return [...acc, ...curr.query(range)]
    }, points)
  }

  show() {
    stroke(255)
    noFill()
    strokeWeight(1)
    rectMode(CENTER)
    rect(this.bounds.x, this.bounds.y, this.bounds.w * 2, this.bounds.h * 2)

    for (let p of this.points) {
      strokeWeight(2)
      point(p.x, p.y)
    }

    for (let quad of this.quad) {
      quad.show()
    }
  }
}
