// go back
function back() {
    location.href = '../index.html';
}

/**
 * CIRCLES
 * 
 */
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(6);
}

let colors = [
    { r: 255, g: 162, b: 243 },
    { r: 251, g: 158, b: 244 },
    { r: 239, g: 144, b: 242 },
    { r: 193, g: 75, b: 228 },
    { r: 121, g: 44, b: 205 },
    { r: 47, g: 32, b: 172 },
    { r: 24, g: 54, b: 135 }
]

function draw() {
    let shapes = [ellipse, rect]

    for (let y = 0; y < windowHeight; y += 100) {
        for (let x = 0; x < windowWidth; x += 100) {
            let color = colors[Math.round(random(colors.length - 1))]
            let toFill = random(1)
            let shape = shapes[Math.round(random(1))]

            if (toFill >= 0.5) {
                fill(color.r, color.g, color.b)
                noStroke()
            } else {
                stroke(color.r, color.g, color.b)
                strokeWeight(4)
                noFill()
            }

            shape(x, y, 100, 100)
        }
    }
}