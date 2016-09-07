var tree = [];

function setup (){
    createCanvas(400, 400);
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - 100);
    var branch = new Branch(a, b);

    tree[0] = branch;
}

function mousePressed(){
    tree.forEach(function(branch){
        if (!branch.branched) {
            var branches = branch.branchOut();
            tree = tree.concat(branches);
        }
    });
};

function draw (){
    background(51);

    tree.forEach(function(branch){
        branch.show();
    });
}
