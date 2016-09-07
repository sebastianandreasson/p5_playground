// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/E1B4UoSQMFw

var points = [];
var allPoints = [];
var rows = 8;
var cols = 8;
var done = false;


function setup() {
    createCanvas(400, 400);
    var rowWidth = width/rows;
    var colHeight = height/cols;
    var wiggle = colHeight / 4;

    for (var i = 0; i < rows; i++) {
        points[i] = [];
        for (var j = 0; j < cols; j++) {
            var point = new Point(i, j, j * rowWidth, i * colHeight, wiggle);
            points[i].push(point);
            allPoints.push(point);
        }
    }

    // for (var i = 0; i < 360; i++) {
    //     points.push(new Point(i));
    // }
}

function mouseClicked() {
    // console.log(points);
    // for (var i = 0; i < allPoints.length; i++) {
    //     allPoints[i]
    // }
    // var randPoint = allPoints[Math.floor(Math.random()*allPoints.length)];
    // if (!randPoint.merged) randPoint.merge(points);
    for (var i = 7; i < allPoints.length; i++) {
        if (!allPoints[i].merged && Math.random() > 0.5) {
            allPoints[i].merge(points);
        }
    }
}

function grow() {
    var pointsDone = 0;
    for (var i = 0; i < allPoints.length; i++) {
        if (allPoints[i].grow(allPoints)) {
            pointsDone++;
        }
    }
    if (pointsDone === allPoints.length) {
        done = true;
    }
    console.log(pointsDone);
}

function draw() {
    background(51);

    for (var i = 0; i < allPoints.length; i++) {
        allPoints[i].show();
    }
    if (!done) {
        grow();
    }
}
