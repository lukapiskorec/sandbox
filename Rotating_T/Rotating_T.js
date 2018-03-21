var box_size = 50;
var b = 0;
var angleX = 0.0;
var angleY = 0.0;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
}


function draw() {
  background(0); 
  fill(0, 0, 0);
  
  pointLight(255, 255, 255, windowWidth, windowHeight, 0); 
  ambientLight(215, 215, 215);
  
  push();
  
  rotateY(radians(angleX));
  
  translate(0, -box_size-b);
  box(box_size);
  translate(box_size+b, 0);
  box(box_size);
  translate(-2*box_size-2*b, 0);
  box(box_size);
  translate(box_size+b, box_size+b);
  box(box_size);
  translate(0, box_size+b);
  box(box_size);
  
  pop();
  
  angleX -= (windowWidth/2-mouseX) * 0.001;
  angleY -= (windowHeight/2-mouseY) * 0.001;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
