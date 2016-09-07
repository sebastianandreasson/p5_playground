
var numBranches = 3;

function Branch (start, end) {
    this.start = start;
    this.end = end;

    this.branchOut = function() {
        // this.branched = true;
        var dir = p5.Vector.sub(this.end, this.start);
        dir.mult(0.67);
        var angleRange = PI; // 90 degrees
        var startRotation = PI / numBranches;
        var angle = startRotation;

        var branches = [];
        for (var i = 0; i < numBranches; i++) {
            dir.rotate(angle);
            var newEnd = p5.Vector.add(this.end, dir);
            var newBranch = new Branch(this.end, newEnd);
            branches.push(newBranch);
            angle += (angleRange);
        }
        return branches;
    };

    this.show = function() {
        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    };
};
