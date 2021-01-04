class Boid {
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.maxForce = 1
    this.maxSpeed = 4
    this.perceptionRadius = 40
  }

  teleportFromEdges() {
    if (this.position.x > width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = width
    }
    if (this.position.y > height) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.acceleration.mult(0)
  }

  getNearbyBoids(quad) {
    let visionBoundary = new Boundary(
      this.position.x,
      this.position.y,
      this.perceptionRadius / 2,
      this.perceptionRadius / 2
    )
    return quad.query(visionBoundary)
  }

  updateSteeringVector(vector, total, update = () => {}) {
    vector.div(total)
    update()
    vector.setMag(this.maxSpeed)
    vector.sub(this.velocity)
    vector.limit(this.maxForce)
  }

  alignment(boids) {
    let steering = createVector()
    for (let other of boids) {
      steering.add(other.velocity)
    }
    this.updateSteeringVector(steering, boids.length)
    return steering
  }

  separation(boids) {
    let steering = createVector()
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      let diff = p5.Vector.sub(this.position, other.position)
      diff.div(d * d)
      steering.add(diff)
    }
    this.updateSteeringVector(steering, boids.length)
    return steering
  }

  cohesion(boids) {
    let steering = createVector()
    for (let other of boids) {
      steering.add(other.position)
    }
    this.updateSteeringVector(steering, boids.length, () => {
      steering.sub(this.position)
    })
    return steering
  }

  flock(quad) {
    let boids = this.getNearbyBoids(quad)

    let alignment = this.alignment(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    alignment.mult(alignSlider.value())
    cohesion.mult(cohesionSlider.value())
    separation.mult(separationSlider.value())

    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
  }

  show() {
    strokeWeight(5)
    stroke(255)
    point(this.position.x, this.position.y)
  }
}
