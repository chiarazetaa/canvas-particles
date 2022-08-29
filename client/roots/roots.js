let canvas = document.getElementById('roots-canvas');
let ctx = canvas.getContext('2d'); // give access to built-in canvas 2d (drawing methods canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// radius of a circle around the mouse within which the particles are allowed to randomly move
let edge = 50;

// want to draw only when i click
let drawing = false;

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
        let radius = (-distance / edge + 1) * edge / 10;

        // particle hasn't reach the edge of the area
        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this)); // bind this to the current context
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI); // draw a circle
            ctx.fillStyle = this.color;
            ctx.fill();
            // borders
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}

function randomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function branchOut() {
    if (drawing) {
        let centerX = mouse.x;
        let centerY = mouse.y;
        for (let i = 0; i < 3; i++) {
            let root = new Root(mouse.x, mouse.y, randomColor(), centerX, centerY);
            root.draw();
        }
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function() {
    // disappearing draw
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});

// clicking
window.addEventListener('mousedown', function() {
    drawing = true;
});

// not clicking
window.addEventListener('mouseup', function() {
    drawing = false;
});

// go back
function back() {
    location.href = '../index.html';
}


/**
 * COLOR PICKER
 */
 let colorWell;
 let defaultColor = "#0000ff";
 
 // setting up a load handler to do the main startup work once the page is fully loaded
 window.addEventListener("load", startup, false);

 // Once the page is loaded, our load event handler, startup(), is called:
 function startup() {
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", updateFirst, false);
    colorWell.addEventListener("change", updateAll, false);
    colorWell.select();
  }     

  function updateFirst(event) {
    var p = document.querySelector("p");
  
    if (p) {
      p.style.color = event.target.value;
    }
  }

  function updateAll(event) {
    document.querySelectorAll("p").forEach(function(p) {
      p.style.color = event.target.value;
    });
  }