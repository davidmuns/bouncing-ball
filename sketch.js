/****************************************
 * Hi! This is DAVID G MUNS! 
 * For further information please click on Smiley button ----------------------->>>
 * Thanks for visiting!
 ***************************************/

class Cloud {
    // Cloud constructor that receives location parameters
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.vel = new p5.Vector(-0.8, 0);
    }
    // Class method that displays a cloud
    display() {
        fill(255);
        noStroke();
        ellipse(this.position.x - 31, this.position.y, 60, 60);
        ellipse(this.position.x + 31, this.position.y, 60, 60);
        ellipse(this.position.x, this.position.y, 80, 80);
    }
    // Class method that moves the cloud
    move() {
        this.position.add(this.vel);
        if (this.position.x < -60) { this.position.x = width + 60; }
    }
}

class Button {
    // Button constructor that receives location parameters
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.ancho = 62;
        this.alto = 62;
        this.mouseInside = false;
    }
    // Class method that receives both location and size parameters
    draw(texto, x, y, s) {
        fill(125, 115, 115);
        if (this.mouseInside) {
            fill(7, 224, 7);
        }
        strokeWeight(3);
        stroke(35, 232, 14);
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.ancho, this.alto, 10);
        fill(255, 255, 255);
        textSize(s);
        rectMode(CENTER);
        text(texto, x, y, 50, 75);
    }
    // Class method that receives mouse position as a location parameters
    checkMouseInButton(mx, my) {
        let distance = dist(mx, my, this.position.x, this.position.y);
        if (distance < this.alto / 2) {
            this.mouseInside = true;
        }
    }
    // Class method that checks if mouse is clicked and if so returns a boolean value
    mouseIsClicked() {
        return this.mouseInside;
    }
    // Class method that checks if mouse has been released
    mouseNotClicked() {
        this.mouseInside = false;
    }
}

class Smiley {
    // Smiley constructor that receives both mass an location parameters
    constructor(m, x, y) {
        this.mass = m;
        this.position = new p5.Vector(x, y);
        this.speed = new p5.Vector(0, 0);
        this.acc = new p5.Vector(0, 0);
        this.size = random(30, 70);
        this.mouseInside = false;
    }
    mouseInSmiley(mx, my) {
        let distance = dist(mx, my, this.position.x, this.position.y);
        if (distance < this.size / 2) { this.mouseInside = true; }
    }
    dragSmiley(mx, my) {
        if (this.mouseInside) {
            this.position.x = mx;
            this.position.y = my;
            this.speed.mult(0);
        }
    }
    releaseSmiley() {
        this.mouseInside = false;
    }
    // Class method that moves the Smiley according to the forces it is receiving.
    motion(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
        this.speed.add(this.acc);
        this.position.add(this.speed);
        this.acc.mult(0);
    }
    // Class method that displays a Smiley and receives an string parameter
    display(texto) {
        let angle = map(this.position.x, 0, width, 0, 50);
        let offSetTextoY = 9;
        textSize(this.size / 2);
        fill(10, 1, 69); // Text color
        text(texto, (this.position.x) - (this.size / 2) - this.size - texto.length,
            (this.position.y) - (this.size / 2) - offSetTextoY);
        fill(255, 255, 0, 200); // Face color
        if (this.mouseInside) { fill(255, 0, 0); } // Face color if mouse on face and mouse is pressed
        strokeWeight(2);
        stroke(0);
        if (this.mouseInside) {
            ellipse(this.position.x, this.position.y, this.size, this.size); // Face
            fill(0, 0, 0); // Eyes color
            ellipse(this.position.x - this.size / 7, this.position.y - this.size / 6,
                this.size / 10, this.size / 6); // Left eye
            ellipse(this.position.x + this.size / 7, this.position.y - this.size / 6,
                this.size / 10, this.size / 6); // Right eye
            if (this.mouseInside) {
                fill(0); // Mouth color
                stroke(10);
                ellipse(this.position.x, this.position.y + this.size / 3.5,
                    this.size / 3, this.size / 3); // Mouse is pressed mouth
            } else {
                arc(this.position.x, this.position.y,
                    this.size / 1.5, this.size / 1.5, 0, 180); // Smiling Mouth
            }
        } else {
            push();
            translate(this.position.x, this.position.y);
            rotate(angle);
            ellipse(0, 0, this.size, this.size); // Face
            fill(0, 0, 0); // Eyes color
            ellipse(0 - this.size / 7, 0 - this.size / 6,
                this.size / 10, this.size / 6); // Left eye
            ellipse(this.size / 7, -this.size / 6,
                this.size / 10, this.size / 6); // Right eye
            noFill();
            if (this.mouseInside) {
                fill(0); // Mouth color
                stroke(10);
                ellipse(0, this.size / 3.5,
                    this.size / 3, this.size / 3); // Mouse is pressed mouth
            } else {
                arc(0, 0, this.size / 1.5, this.size / 1.5, 0, PI); // Smiling Mouth
            }
            pop();
        }
    }
    // Class method that limits the Smiley bouncing within the area of the canvas 
    checkEdges() {
        if (this.position.x > width - this.size / 2) {
            this.speed.x *= -1;
            this.position.x = width - this.size / 2;
        }
        if (this.position.x < 0 + this.size / 2) {
            this.speed.x *= -1;
            this.position.x = 0 + this.size / 2;
        }
        if (this.position.y > height - this.size / 2) {
            this.speed.y *= -1;
            this.position.y = height - this.size / 2;
        }
        if (this.position.y < 0 + this.size / 2) {
            this.speed.y *= -1;
            this.position.y = 0 + this.size / 2;
        }
    }
}
// Main
let cloud;
let buttonSmiley;
let buttonReset;
let smiley;
let info;
let nSmilies;
let risingEdge;
let risingEdge2;
let fWind;
let fGravity;

// Blinking function
let blinking = function (time) {
    let n = round(frameCount / time % 2);
    return n % 2 === 0; // If 'n' is an even number return true
};

function setup() {
    cloud = [];
    buttonSmiley = new Button(360, 40);
    buttonReset = new Button(360, 110);
    smiley = [];
    info = [" Looking for a...", "...Fullstack Developer?", "  Contact me!", " David G Muns", "davidmuns@yahoo.es", "Thanks for visiting"];
    nSmilies = 0;
    risingEdge = false;
    risingEdge2 = false;
    fWind = 0.005; // Wind force value
    fGravity = 0.1; // Gravity force value
    // createCanvas(windowWidth, windowHeight);
    createCanvas(970, 450);
    for (let i = 0; i < 30; i++) { // Initialize array of clouds
        cloud[i] = new Cloud(random(0, 400) + 50, random(50, 350) + 10);
    }
}
// frameRate(30);
function draw() {
    background(144, 211, 245);
    for (let i = 0; i < cloud.length; i++) {
        cloud[i].display();
        cloud[i].move();
    }

    // Reset program and score if reset button is pressed
    if (buttonReset.mouseIsClicked()) {
        if (!risingEdge2) {
            risingEdge2 = true;
            location.reload();
            nSmilies = 0;
        }
    } else {
        risingEdge2 = false;
    }
    // Initialize an smiley object array each time the smiley button is pressed
    if (buttonSmiley.mouseIsClicked()) {
        if (!risingEdge) {
            risingEdge = true;
            smiley[nSmilies] = new Smiley(2, 0, 0);
            if (nSmilies < info.length) {
                nSmilies += 1;
            }
        }
    } else {
        risingEdge = false;
    }
    for (let i = 0; i < smiley.length; i++) {
        // New gravity force vector
        let gravity = new p5.Vector(0, fGravity * smiley[i].mass);
        // New wind force vector
        let wind = new p5.Vector(fWind, 0);
        // Friction force = -1 * c(friction coefficient) * Fn(normal force) * velocity vector
        let c = 0.01;
        let Fn = 1;
        let friction = smiley[i].speed.copy();
        friction.normalize();
        friction.mult(-1);
        friction.mult(c * Fn);
        smiley[i].motion(gravity);
        smiley[i].motion(wind);
        smiley[i].motion(friction);
        smiley[i].dragSmiley(mouseX, mouseY);
        if (i < info.length) {
            smiley[i].display(info[i]);
        }
        smiley[i].checkEdges();
    }
    // Display score and text
    if (nSmilies === 0) {
        if (blinking(25)) {
            fill(255, 129, 0);
            textSize(30);
            text("Click twice on the screen", 30, 190);
            text("to zoom!", 150, 220);
        }
    }
    fill(0);
    textSize(30);
    text("Score: " + nSmilies, 15, 40);
    if (blinking(25) && nSmilies !== 0) {
        textSize(16);
        text("click on the smiley to pick it up!", 10, 380);
    }
    if (nSmilies >= info.length) {
        fill(255, 129, 0);
        textSize(30);
        text("Score: " + nSmilies, 15, 40);
        textSize(20);

        if (blinking(25)) {
            textSize(16);
            text("New game", 250, 117);
        }
        fWind = -0.004;
        fGravity *= -1;

        fill(0);
        textSize(30);
        text("Game over", 130, 200);
    }
    buttonSmiley.draw("Smiley", 362, 70, 15);
    buttonReset.draw("Reset", 365, 140, 15);
};
mousePressed = function () {
    buttonReset.checkMouseInButton(mouseX, mouseY);
    buttonSmiley.checkMouseInButton(mouseX, mouseY);
    for (let i = 0; i < smiley.length; i++) {
        smiley[i].mouseInSmiley(mouseX, mouseY);
    }
};
mouseReleased = function () {
    buttonReset.mouseNotClicked();
    buttonSmiley.mouseNotClicked();
    for (let i = 0; i < smiley.length; i++) {
        smiley[i].releaseSmiley(mouseX, mouseY);
    }
};
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// };