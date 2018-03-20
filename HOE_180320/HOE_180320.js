function setup() {
  createCanvas(640, 480);
  

}

function draw() {
  background(255, 255, 0);
  fill(255, 255, 255, 150);
  rectMode(CENTER);
  rect(100, 200, 75, 125);
  rect(mouseX, mouseY, 75, 125);
}
