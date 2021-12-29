function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  //RGB - red, green, blue
  background(0, 0, 0);
  
  frameRate(30);

}


function draw() {
  
  //RGB - red, green, blue
  background(0, 0, 0);
  
  strokeWeight(0);
  
  fill(255, 0, 0);
  
  //position x, position y, diameter
  circle(windowWidth/2, windowHeight/2, 600 - frameCount);
  
  fill(255, 255, 0);
  
  circle(windowWidth/2 + frameCount, windowHeight/2, 300);

  
  
  

}
