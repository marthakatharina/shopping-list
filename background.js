var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext("2d");

var circles = new Array();

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.opacity = 0.01 + Math.random() * 0.5;

    this.counter = 0;

    var signHelper = Math.floor(Math.random() * 3);

    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
    }
}

Circle.prototype.update = function () {
    this.counter += this.sign * this.speed;

    mainContext.beginPath();

    mainContext.arc(
        this.xPos + Math.cos(this.counter / 50) * this.radius,
        this.yPos + Math.sin(this.counter / 50) * this.radius,
        this.width,
        0,
        Math.PI * 2,
        false
    );

    mainContext.closePath();

    mainContext.fillStyle = "rgba(235, 245, 251," + this.opacity + ")";
    mainContext.fill();
};

function drawCircles() {
    for (var i = 0; i < 150; i++) {
        var randomX = Math.round(-100 + Math.random() * 1200);
        var randomY = Math.round(-100 + Math.random() * 1200);
        var speed = 0.2 + Math.random() * 3;
        var size = 1 + Math.random() * 40;

        var circle = new Circle(40, speed, size, randomX, randomY);
        circles.push(circle);
    }

    draw();
}

drawCircles();

function draw() {
    mainContext.clearRect(0, 0, 1500, 1500);

    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }

    requestAnimationFrame(draw);
}
