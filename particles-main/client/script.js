// go to roots page
function getRoot() {
    location.href = './roots/roots.html';
}

// go to circles page
function getCircles() {
    location.href = './circles/circles.html';
}

// go to geolocation page
function getGeolocation() {
    location.href = './geolocation/geolocation.html';
}

let canvas = document.getElementById('index-canvas');
let ctx = canvas.getContext('2d'); // give access to built-in canvas 2d (drawing methods canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// radius of a circle around the mouse within which the particles are allowed to randomly move
let edge = 50;

// mouse interaction
let mouse = {
    x: null,
    y: null
};

// event listener for mousemove event
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// class for the particles
class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    // calculate particles current position and draw it on canvas
    draw() {
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        this.x += this.speedX;
        this.y += this.speedY;

        let distanceX = this.x - this.centerX;
        let distanceY = this.y - this.centerY;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // size of the particle
        let side = (-distance / edge + 1) * edge / 5;

        // particle hasn't reach the edge of the area
        if (side > 0) {
            requestAnimationFrame(this.draw.bind(this)); // bind this to the current context
            ctx.beginPath();
            ctx.rect(this.x, this.y, side, side); // draw a square
            ctx.fillStyle = this.color;
            ctx.fill();
            // borders
            ctx.strokeStyle = 'orange';
            ctx.stroke();
        }
        
    }
}

function branchOut() {
    let centerX = mouse.x;
    let centerY = mouse.y;
    for (let i = 0; i < 3; i++) {
        let root = new Root(mouse.x, mouse.y, '#404040', centerX, centerY);
        root.draw();
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function() {
    // disappearing draw
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});
