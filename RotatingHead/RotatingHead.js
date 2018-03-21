var head;

function preload() {
  head = loadModel('PiskorecLuka_HeadOnly_reduced_04.obj');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
}

function draw() {
  angleMode(DEGREES);
  ambientLight(150);
  pointLight(255, 0, 0, windowWidth, windowHeight, 0);
  pointLight(0, 0, 255, -windowWidth, windowHeight, 0);

  background(255);
  scale(10, 10);
  translate(0,10,0);
  rotateX(-89);
  rotateZ(frameCount * 0.01);
  model(head); 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
