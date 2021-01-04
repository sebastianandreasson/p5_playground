let quadTree
let boids = []

const WIDTH = 900
let alignSlider, cohesionSlider, separationSlider

function setup() {
  createCanvas(WIDTH, WIDTH)
  alignSlider = createSlider(0, 2, 1.4, 0.1)
  cohesionSlider = createSlider(0, 2, 0.7, 0.1)
  separationSlider = createSlider(0, 2, 0.9, 0.1)

  for (let i = 0; i < 1000; i++) {
    boids.push(new Boid())
  }
}

function draw() {
  background(0)

  let boundary = new Boundary(WIDTH / 2, WIDTH / 2, WIDTH / 2, WIDTH / 2)
  quadTree = new Quadtree(boundary, 4)

  for (let boid of boids) {
    quadTree.insert(boid)
  }

  for (let boid of boids) {
    boid.teleportFromEdges()
    boid.flock(quadTree)
    boid.update()
    boid.show()
  }

  quadTree.show()
}
