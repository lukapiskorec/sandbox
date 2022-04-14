/*
 * @name Kaleidoscope
 * @description A kaleidoscope is an optical instrument with two or more reflecting surfaces tilted to each other in an angle. This example tries to replicate the behavior of a kaleidoscope. Set the number of reflections at the symmetry variable and start drawing on the screen. Adjust the brush size with the help of the slider. The clear screen as it says clears the screen. The save button will download a .jpg file of the art that you have created.
 */


let saveButton, clearButton, fullscreenButton, brushSizeSlider, sizeSlider, symmetrySlider, symmetryDisplayer, brushSizeDisplayer;
let slider;
let canvas;
let offset_x, offset_y;
  
function setup() {
  // Place the canvas in the center of the webpage
  canvas = createCanvas(1000, 1000);
  centerCanvas();
  
  angleMode(DEGREES);
  background(255);

  // Creating the save button for the file
  saveButton = createButton('→ SAVE ←');
  saveButton.style('color', 'white');
  saveButton.style('background-color', 'black');
  saveButton.style('font-family', 'courier, serif');
  saveButton.style('cursor', 'pointer');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('→ CLEAR ←');
  clearButton.style('color', 'white');
  clearButton.style('background-color', 'black');
  clearButton.style('font-family', 'courier, serif');
  clearButton.style('cursor', 'pointer');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('→ FULLSCREEN ←');
  fullscreenButton.style('color', 'white');
  fullscreenButton.style('background-color', 'black');
  fullscreenButton.style('font-family', 'courier, serif');
  fullscreenButton.style('cursor', 'pointer');
  fullscreenButton.mousePressed(screenFull);
  
  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createSlider(1, 20, 1, 0.1);
  brushSizeSlider.style('width', '190px');
  
  brushSizeDisplayer = createP(); //Creates a <p></p> paragraph element in the DOM with given inner HTML
  brushSizeDisplayer.style('color', 'white');
  brushSizeDisplayer.style('background-color', 'black');
  
  // Setting up the slider for symmetry
  symmetrySlider = createSlider(2, 12, 6, 1);
  symmetrySlider.style('width', '170px');
  
  //Creates a <p></p> paragraph element in the DOM with given inner HTML
  symmetryDisplayer = createP(); //Creates a <p></p> paragraph element in the DOM with given inner HTML
  symmetryDisplayer.style('color', 'white');
  symmetryDisplayer.style('background-color', 'black');
  
  // Display sketch title
  titleDisplayer = createP(); //Creates a <p></p> paragraph element in the DOM with given inner HTML
  titleDisplayer.style('font-size', '32px');
  titleDisplayer.style('color', 'white');
  titleDisplayer.style('background-color', 'black');
  
  // Display sketch title
  creditsDisplayer = createP(); //Creates a <p></p> paragraph element in the DOM with given inner HTML
  creditsDisplayer.style('font-size', '16px');
  creditsDisplayer.style('color', 'black');
  creditsDisplayer.style('background-color', 'white');
}




function draw() {
  
  // Continuously update the position of all buttons and sliders
  saveButton.position(100 + offset_x, height + 20 + offset_y);
  clearButton.position(200 + offset_x, height + 20 + offset_y);
  fullscreenButton.position(300 + offset_x, height + 20 + offset_y);
  
  brushSizeSlider.position(480 + offset_x, height + 50 + offset_y);
  brushSizeDisplayer.position(480 + offset_x, height + 5 + offset_y);
  
  symmetrySlider.position(750 + offset_x, height + 50 + offset_y);
  symmetryDisplayer.position(750 + offset_x, height + 5 + offset_y);
  
  titleDisplayer.position(250 + offset_x, -125 + offset_y);
  creditsDisplayer.position(100 + offset_x, height + 90 + offset_y);
  
  // Display text for sliders and title
  brushSizeDisplayer.html('///   BRUSH SIZE ' + brushSizeSlider.value() + '   ///');
  symmetryDisplayer.html('///   SYMMETRY ' + symmetrySlider.value() + '   ///');
  titleDisplayer.html('///   KALEIDOSCOPE DRAWING   ///');
  creditsDisplayer.html('///   Code based on Kaleidoscope example in p5.js / web app by <a href="https://twitter.com/LukaPiskorec">@LukaPiskorec</a> / 2022  ///');
  
  translate(width / 2, height / 2);

  // Symmetry corresponding to the number of reflections
  let symmetry = symmetrySlider.value();
  let angle = 360 / symmetry;
    
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    
    let symmetry = symmetrySlider.value();
    let angle = 360 / symmetry;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = brushSizeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
  
}






// Save File Function
function saveFile() {
  save('kaleidoscope_drawing_' + year() + month() + day() + '_' + hour() + minute() + second() + '.png');
}

// Clear Screen function
function clearScreen() {
  background(255);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function centerCanvas() {
  offset_x = (windowWidth - width) / 2;
  offset_y = (windowHeight - height) / 2;
  canvas.position(offset_x, offset_y);
}

function windowResized() {
  centerCanvas();
}
