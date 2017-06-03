/* #######################################################
 # Class used to manage Canvas Renderer and Simulation #
 #######################################################*/
if (window.addEventListener) window.addEventListener('load', onLoad, false);

function onLoad() {
    var canvas;
    var context;
    var renderer = new Renderer('rgba(0,0,0,0.1)'); // takes colour for canvas.
    var simulation;
    var ballArray = new Array();

    // frameRate Variables.
    var frameRate = 60;
    var frameTimer = 1000 / frameRate;

    // DeltaTime variables.
    var lastTime = Date.now(); // inistalise lastTime.
    var thisTime;
    var deltaTime;

    function initialiseCanvas() {
        //find the canvas element using its id attribute.
        canvas = document.getElementById('canvas');
        canvas.width=window.innerWidth-20;
        canvas.height=window.innerHeight-30;
        console.log(canvas.width);
        //once canvas is created, create the simulation passing the width and height of canvas
        simulation = new Simulation(canvas.width,canvas.height);

        /*########## Error checking to see if canvas is supported ############## */
        if (!canvas) {
            alert('Error: cannot find the canvas element!');
            return;
        }
        if (!canvas.getContext) {
            alert('Error: no canvas.getContent!');
            return;
        }
        context = canvas.getContext('2d');
        if (!context) {
            alert('Error: failed to getContent');
            return;
        }
        createBalls();
        mainLoop(); // enter the main loop.
    }
    function createBalls() {
        /* Ball takes X | Y | radius | Mass| vX | vY | colour */

        //red
        ballArray.push(new ball(canvas.width/2,100, 90, 150, 0.2, 0.2, 'rgba(255,0,0,0.4)'));
        //purple
        ballArray.push(new ball(canvas.width/2, 350, 100, 150, 0.2,0.2, 'rgba(127, 0, 130,0.7)'));
        //green
        ballArray.push(new ball(canvas.width/2, 600, 90, 150, 0.2, 0.2, 'rgba(5, 145, 10,0.6)'));
        //Blue
        ballArray.push(new ball(100, 100, 100, 100, 0.2, 0.2, 'rgba(1, 110, 162,0.8)'));
        //White
        ballArray.push(new ball(400, 100, 90, 350, 0.2, 0.2, 'rgba(255,255,255,0.7)'));
        //Yellow
        ballArray.push(new ball(200, 500, 100, 700, 0.2, 0.2, 'rgba(252, 248, 0,0.4)'));
    }

    function mainLoop() {
        thisTime = Date.now();
        deltaTime = thisTime - lastTime;

        renderer.draw(context, ballArray);
        simulation.update(deltaTime, ballArray);
        //context.clearRect(0, 0, canvas.width, canvas.height);

        lastTime = thisTime;

        setTimeout(mainLoop, frameTimer);
    }

    initialiseCanvas();
}

/*############################################################
 # Class is a ball object, only contains getters and setters #
 #############################################################*/

var ball = (function (context) {

    var position;
    var lastGoodPosition
    var velocity;
    var radius;
    var mass;
    var colour;
    var x;
    var y;

    function ball(inX,inY,inRadius,inMass,inVelX,inVelY, inColour) { // constructor
        this.position = new vector();
        this.position.setX(inX);        this.position.setY(inY);

        this.velocity = new vector();
        this.velocity.setX(inVelX);     this.velocity.setY(inVelY);

        this.setRadius(inRadius);
        this.setMass(inMass);
        this.setColour(inColour);
    }

    /* #######################
       # Getters and Setters #
       ####################### */

    ball.prototype.setX = function (inX) { this.position.setX(inX);}
    ball.prototype.setY = function (inY) { this.position.setY(inY);}

    ball.prototype.getX = function () {return this.position.getX();}
    ball.prototype.getY = function () {return this.position.getY();}

    ball.prototype.setRadius = function (inRadius) { this.radius = inRadius;}
    ball.prototype.getRadius = function () { return this.radius;}

    ball.prototype.setMass = function (inMass) { this.mass = inMass;}
    ball.prototype.getMass = function () { return this.mass;}
    ball.prototype.setColour = function (inColour) { this.colour = inColour;}
    ball.prototype.getColour = function () { return this.colour;}
    return ball;
})();

/*#######################################################
 # Class used Render simulation onto HTML5 canvas       #
 ########################################################*/
var Renderer = (function (Context) {

    var canvasColour;
    function Renderer(inCanvasColour) {
        canvasColour = inCanvasColour;
    };


    Renderer.prototype.draw = function(context, ballArray) {
        // draw Canvas Background.
        drawCanvasBackground(context);
        // draw Balls.
        drawBalls(context, ballArray);
    }

    function drawCanvasBackground(context) {
        context.beginPath();
        context.fillStyle = canvasColour;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawBalls(context,ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            context.beginPath();
            // draw ball using ball objects data.
            context.arc(ballArray[i].getX(), ballArray[i].getY(),ballArray[i].getRadius(), 0, Math.PI * 2, false);
            //context.strokeStyle = "000000";
            //context.stroke();
            context.fillStyle = ballArray[i].getColour();
            context.fill();
            context.closePath();

        }
    }

    return Renderer;
})();
/*####################################################################
 # Class used to manage collision responce and movement of the balls #
 #####################################################################*/
var Simulation = (function (Context) {
    var canvas_Width;
    var canvas_Height;

    function Simulation(inWidth,inHeight) {
        // set simulations canvas width and height.
        canvas_Width = inWidth;
        canvas_Height = inHeight;
    }
    Simulation.prototype.update = function (deltaTime, ballArray) {
        /*#### Move balls ####### */
        updateBallPos(deltaTime, ballArray);
        /*##### Wall collision ####### */
        checkWallCollision(ballArray);
        /*###### ball ball collision ######## */
        for (var i = 0; i < ballArray.length; i++) {
            for (var j = 0; j < ballArray.length; j++) {
                if (ballArray[i] != ballArray[j]) {
                    if (checkBallCollision(ballArray[i], ballArray[j])) {
                        ballCollisionResponce(ballArray[i], ballArray[j]);
                    }
                }
            }
        }
    }


    function updateBallPos(deltaTime, ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            ballArray[i].lastGoodPosition = ballArray[i].position; // save the balls last good position.
            ballArray[i].position = ballArray[i].position.add((ballArray[i].velocity.multiply(deltaTime/10))); // add the balls (velocity * deltaTime) to position.
        }
    }
    function checkWallCollision(ballArray) {
        for (var i = 0; i < ballArray.length; i++) {
            /*##### Collisions on the X axis ##### */
            if (ballArray[i].getX() + (ballArray[i].getRadius() / 2) >= canvas_Width || ballArray[i].getX() - (ballArray[i].getRadius() / 2) <= 0) {
                ballArray[i].velocity.setX(-ballArray[i].velocity.getX()); // if collided with a wall on x Axis, reflect Velocity.X.
                ballArray[i].position = ballArray[i].lastGoodPosition; // reset ball to the last good position (Avoid objects getting stuck in each other).
            }
            /*##### Collisions on the Y axis ##### */
            if (ballArray[i].getY() - (ballArray[i].getRadius() / 2) <= 0 || ballArray[i].getY() + (ballArray[i].getRadius() / 2) >= canvas_Height) { // check for y collisions.
                ballArray[i].velocity.setY(-ballArray[i].velocity.getY()); // if collided with a wall on x Axis, reflect Velocity.X.
                ballArray[i].position = ballArray[i].lastGoodPosition;
            }
        }
    }
    function checkBallCollision(ball1, ball2) {
        var xDistance = (ball2.getX() - ball1.getX()); // subtract the X distances from each other.
        var yDistance = (ball2.getY() - ball1.getY()); // subtract the Y distances from each other.
        var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); // the distance between the balls is the sqrt of X squard + Ysquared.

        var sumOfRadius = ((ball1.getRadius()) + (ball2.getRadius())); // add the balls radius together

        if (distanceBetween < sumOfRadius) { // if the distance between them is less than the sum of radius they have collided.
            return true;
        }
        else {
            return false;
        }
    }
    function ballCollisionResponce(ball1, ball2) {
        var xDistance = (ball2.getX() - ball1.getX());
        var yDistance = (ball2.getY() - ball1.getY());

        var normalVector = new vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
        normalVector = normalVector.normalise();

        var tangentVector = new vector((normalVector.getY() * -1), normalVector.getX());

        // create ball scalar normal direction.
        var ball1scalarNormal =  normalVector.dot(ball1.velocity);
        var ball2scalarNormal = normalVector.dot(ball2.velocity);

        // create scalar velocity in the tagential direction.
        var ball1scalarTangential = tangentVector.dot(ball1.velocity);
        var ball2scalarTangential = tangentVector.dot(ball2.velocity);

        var ball1ScalarNormalAfter = (ball1scalarNormal * (ball1.getMass() - ball2.getMass()) + 2 * ball2.getMass() * ball2scalarNormal) / (ball1.getMass() + ball2.getMass());
        var ball2ScalarNormalAfter = (ball2scalarNormal * (ball2.getMass() - ball1.getMass()) + 2 * ball1.getMass() * ball1scalarNormal) / (ball1.getMass() + ball2.getMass());

        var ball1scalarNormalAfter_vector = normalVector.multiply(ball1ScalarNormalAfter); // ball1Scalar normal doesnt have multiply not a vector.
        var ball2scalarNormalAfter_vector = normalVector.multiply(ball2ScalarNormalAfter);

        var ball1ScalarNormalVector = (tangentVector.multiply(ball1scalarTangential));
        var ball2ScalarNormalVector = (tangentVector.multiply(ball2scalarTangential));;

        ball1.velocity = ball1ScalarNormalVector.add(ball1scalarNormalAfter_vector);
        ball2.velocity = ball2ScalarNormalVector.add(ball2scalarNormalAfter_vector);

        ball1.position = ball1.lastGoodPosition;
        ball2.position = ball2.lastGoodPosition;
    }

    return Simulation;
})();

/*#######################################################
 # Simple 2D vector class including vector functions   #
 #######################################################*/
var vector = (
	function () {
	    var x;
	    var y;
	    function vector() { };
	    function vector(x, y) {
	        // vector constructor
	        this.setX(x);
	        this.setY(y);
	    };
        //getters and setters
	    vector.prototype.getX = function () {return this.x; };
	    vector.prototype.setX = function (x) { this.x = x; };

	    vector.prototype.getY = function () { return this.y;};
	    vector.prototype.setY = function (y) { this.y = y; };

	    vector.prototype.setXandY = function (x, y) {
	        this.setX(x);
	        this.setY(y);
	        return this;
	    }
	    vector.prototype.getMagnitude = function(){ return this.magnitude; }


        // Vector functions
	    vector.prototype.add = function(otherVector){
	        var newX = this.getX() + otherVector.getX();
	        var newY = this.getY() + otherVector.getY();
	        return new vector(newX, newY);
	    }

	    vector.prototype.subtract = function (otherVector) {
	        var newX = this.getX() - otherVector.getX();
	        var newY = this.getY() - otherVector.getY();
	        return new vector(newX, newY);
	    }

	    vector.prototype.multiply = function (scalar) {
	        var newX = this.getX() * scalar;
	        var newY = this.getY() * scalar;
	        //this.setX(this.getX() * scalar);
	        //this.setY(this.getY() * scalar);
	        return new vector(newX,newY);
	    }

	    vector.prototype.divide = function (scalar) {
	        this.setX(this.getX() / scalar);
	        this.setY(this.getY() / scalar);
	        return new vector(this.x, this.y);
	    }

	    vector.prototype.normalise = function () {
	        var newX = this.x;
	        var newY = this.y;
	        var xsquared = this.x * this.x;
	        var ysquared = this.y * this.y;
	        var distance = Math.sqrt(xsquared + ysquared);
	        newX = newX * (1.0 / distance);
	        newY = newY * (1.0 / distance);
	        return new vector(newX, newY);
	    }

	    vector.prototype.magnitude = function () {
	        var magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	        return magnitude;
	    }

	    vector.prototype.dot = function (otherVector) {
	        var dotProduct = ((this.x * otherVector.getX()) + (this.y * otherVector.getY()));
	        return dotProduct;
	        //var newX = this.x * otherVector.getX();
	        //var newY = this.y * otherVector.getY();
	        //return new vector(newX,newY);
	    }

	    return vector;
	}
)();
