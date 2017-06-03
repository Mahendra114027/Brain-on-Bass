var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = colorchanger;
    ctx.fill();
    ctx.closePath();
}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStuff(); 
}
resizeCanvas();

function drawStuff() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
}