// Collection of functions and effects for image manipulation and glitching
// collected by @LukaPiskorec



// Uses gif.js library to export individual frames as gif animation
// code downloaded from here
// https://github.com/jnordberg/gif.js
function setupGif() {
    gif = new GIF({
        workers: 2,
        quality: 10, //pixel sample interval, lower is better
        workerScript: 'libraries/gif.worker.js',
        width: input_img.width + image_border[0],
        height: input_img.height + image_border[1]
    });

    const uuid = parseInt(Math.random()*10000000);
    gif.on('finished', function(blob) {
        print('Finished creating gif')
        rendering = false;
        window.open(URL.createObjectURL(blob));
        saveAs(blob, `test_gif_${uuid}.gif`);
        setupGif();
    });
}



// ASDFPixelSort_Color - rewritten from Java to JavaScript by @lukapiskorec
//original Java code downloaded from here
//https://github.com/shmam/ASDFPixelSort_Color

function pixelSortColor(img) {

  // reset row and column for each image!
  row = 0;
  column = 0;

  img.loadPixels();

  while(column < img.width-1) {
    sortColumn(img);
    column++;
  }

  while(row < img.height-1) {
    sortRow(img);
    row++;
  }

  img.updatePixels();

}


// used for pixel sorting
function sortRow(img) {
  let x = 0;
  let y = row;
  let xend = 0;

  while(xend < img.width-1) {
    switch(mode) {
      case 0:
        x = getFirstNotBlackX(img, x, y);
        xend = getNextBlackX(img, x, y);
        break;
      case 1:
        x = getFirstBrightX(img, x, y);
        xend = getNextDarkX(img, x, y);
        break;
      case 2:
        x = getFirstNotWhiteX(img, x, y);
        xend = getNextWhiteX(img, x, y);
        break;
      default:
        break;
    }

    if(x < 0) {
      break;
    }

    sortLength = xend-x;
    unsorted = [];
    sorted = [];

    randomColor = color(random(255), random(255), random(255), 255);
    d = 0;

    if(random(100) < 5 ){
         d = random(1000);
    }

    for(let i=0; i<sortLength; i= i+1) {
      if (d > 0){
          mixPercentage = 0.5 + random(50)/100;
          pixelColor = getColorAtIndex(img, x + i, y);
          setColorAtIndex(img, x + i, y, lerpColor(pixelColor, randomColor, mixPercentage));
          d--;
      }

      // chaotic sorting
      unsorted[i] = getColorAtIndex(img, x + i, y);
      // proper sorting
      //colorHex = getColorAtIndex(img, x + i, y);
      //unsorted[i] = rgbToHex(red(colorHex), green(colorHex), blue(colorHex));

    }

    sorted = unsorted.sort();

    for(let i=0; i<sortLength; i=i+1) {
      // chaotic sorting
      setColorAtIndex(img, x + i, y, sorted[i]);
      // proper sorting
      //pixelColor = hexToRgb(unsorted[i]);
      //setColorAtIndex(img, x + i, y, pixelColor);
    }

    x = xend+1;
  }
}


// used for pixel sorting
function sortColumn(img) {
  let x = column;
  let y = 0;
  let yend = 0;

  while(yend < img.height-1) {
    switch(mode) {
      case 0:
        y = getFirstNotBlackY(img, x, y);
        yend = getNextBlackY(img, x, y);
        break;
      case 1:
        y = getFirstBrightY(img, x, y);
        yend = getNextDarkY(img, x, y);
        break;
      case 2:
        y = getFirstNotWhiteY(img, x, y);
        yend = getNextWhiteY(img, x, y);
        break;
      default:
        break;
    }

    if(y < 0) {
      break;
    }

    sortLength = yend-y;
    unsorted = [];
    sorted = [];

    randomColor = color(random(255), random(255), random(255), 255);
    d = 0;

    if(random(100) < 5 ){
         d = random(1000);
    }

    for(let i=0; i<sortLength; i++) {
      if (d > 0){
          mixPercentage = 0.5 + random(50)/100;
          pixelColor = getColorAtIndex(img, x + i, y);
          setColorAtIndex(img, x + i, y, lerpColor(pixelColor, randomColor, mixPercentage));
          d--;
      }
      // chaotic sorting
      unsorted[i] = getColorAtIndex(img, x + i, y);
      // proper sorting
      //colorHex = getColorAtIndex(img, x + i, y);
      //unsorted[i] = rgbToHex(red(colorHex), green(colorHex), blue(colorHex));
    }

    sorted = unsorted.sort();

    for(let i=0; i<sortLength; i++) {
      // chaotic sorting
      setColorAtIndex(img, x, y + i, sorted[i]);
      // proper sorting
      //pixelColor = hexToRgb(unsorted[i]);
      //setColorAtIndex(img, x, y + i, pixelColor);
    }

    y = yend+1;
  }
}




//BLACK X
// used for pixel sorting
function getFirstNotBlackX(img, _x, _y) {
  let x = _x;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) < blackValue) {
    x++;
    if(x >= img.width) return -1;
  }
  return x;
}

function getNextBlackX(img, _x, _y) {
  let x = _x+1;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) > blackValue) {
    x++;
    if(x >= img.width) return img.width-1;
  }
  return x-1;
}

//BRIGHTNESS X
// used for pixel sorting
function getFirstBrightX(img, _x, _y) {
  let x = _x;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) < brigthnessValue) {
    x++;
    if(x >= img.width) return -1;
  }
  return x;
}

function getNextDarkX(img, _x, _y) {
  let x = _x+1;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) > brigthnessValue) {
    x++;
    if(x >= img.width) return img.width-1;
  }
  return x-1;
}

//WHITE X
// used for pixel sorting
function getFirstNotWhiteX(img, _x, _y) {
  let x = _x;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) > whiteValue) {
    x++;
    if(x >= img.width) return -1;
  }
  return x;
}

function getNextWhiteX(img, _x, _y) {
  let x = _x+1;
  let y = _y;
  while(brightness(getColorAtIndex(img, x, y)) < whiteValue) {
    x++;
    if(x >= img.width) return img.width-1;
  }
  return x-1;
}

//BLACK Y
// used for pixel sorting
function getFirstNotBlackY(img, _x, _y) {
  let x = _x;
  let y = _y;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) < blackValue) {
      y++;
      if(y >= img.height) return -1;
    }
  }
  return y;
}

function getNextBlackY(img, _x, _y) {
  let x = _x;
  let y = _y+1;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) > blackValue) {
      y++;
      if(y >= img.height) return img.height-1;
    }
  }
  return y-1;
}

//BRIGHTNESS Y
// used for pixel sorting
function getFirstBrightY(img, _x, _y) {
  let x = _x;
  let y = _y;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) < brigthnessValue) {
      y++;
      if(y >= img.height) return -1;
    }
  }
  return y;
}

function getNextDarkY(img, _x, _y) {
  let x = _x;
  let y = _y+1;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) > brigthnessValue) {
      y++;
      if(y >= img.height) return img.height-1;
    }
  }
  return y-1;
}

//WHITE Y
// used for pixel sorting
function getFirstNotWhiteY(img, _x, _y) {
  let x = _x;
  let y = _y;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) > whiteValue) {
      y++;
      if(y >= img.height) return -1;
    }
  }
  return y;
}

function getNextWhiteY(img, _x, _y) {
  let x = _x;
  let y = _y+1;
  if(y < img.height) {
    while(brightness(getColorAtIndex(img, x, y)) < whiteValue) {
      y++;
    if(y >= img.height) return img.height-1;
    }
  }
  return y-1;
}




//Coding Challenge #90: Floyd-Steinberg dithering
//https://www.youtube.com/watch?v=0L2n8Tg2FwI
//code downloaded from here
//https://editor.p5js.org/codingtrain/sketches/-YkMaf9Ea

// Applies Floyd-Steinberg dithering with steps+1 number of levels on an image
function makeDithered(img, steps, dither_params) {
  img.loadPixels();
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      let clr = getColorAtIndex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);
      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError_params(img, x, y, errR, errG, errB, dither_params);

    }
  }
  img.updatePixels();
}


//Floyd-Steinberg algorithm achieves dithering using error diffusion (formula from Wikipedia)
function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}


//Floyd-Steinberg dithering algorithm with varable parameters
function distributeError_params(img, x, y, errR, errG, errB, params) {
  addError(img, params[0], x + 1, y, errR, errG, errB);
  addError(img, params[1], x - 1, y + 1, errR, errG, errB);
  addError(img, params[2], x, y + 1, errR, errG, errB);
  addError(img, params[3], x + 1, y + 1, errR, errG, errB);
}



//Floyd-Steinberg algorithm pushes (adds) the residual quantization error
//of a pixel onto its neighboring pixels
function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtIndex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);
  setColorAtIndex(img, x, y, clr);
}



//experiment with different Floyd-Steinberg dithering variations using this online tool:
//https://kgjenkins.github.io/dither-dream/
//repository link:
//https://github.com/kgjenkins/dither-dream



//these Floyd-Steinberg dithering functions below were taken from
//"CHX-1" BY THOMAS NOYA | GENERATIVE PROJECT FOR FX(HASH) | MAR 2022
//IG: @TSNOYA | TT: @O2HT | THOMASNOYA.COM | linktr.ee/tsnoya

function distributeError_0(img, x, y, errR, errG, errB) {
    addError_0(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError_0(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_0(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError_0(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_1(img, x, y, errR, errG, errB) {
    addError_0(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError_0(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_0(img, 5 >> 16.0, x, y + 1, errR, errG, errB);
    addError_0(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_2(img, x, y, errR, errG, errB) {
    addError_0(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError_0(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_0(img, 5 >> 16.0, x, y + 1, errR, errG, errB);
    addError_0(img, 1 % 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_3(img, x, y, errR, errG, errB) {
    addError_3(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError_3(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_3(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError_3(img, 1 >> 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_4(img, x, y, errR, errG, errB) {
    addError_0(img, 7 - 16.0, x + 1, y, errR, errG, errB);
    addError_0(img, 1 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_0(img, 1 / 16.0, x, y + 1, errR, errG, errB);
    addError_0(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_5(img, x, y, errR, errG, errB) {
    addError_5(img, 7 - 16.0, x + 1, y, errR, errG, errB);
    addError_5(img, 1 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_5(img, 1 / 16.0, x, y + 1, errR, errG, errB);
    addError_5(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function distributeError_6(img, x, y, errR, errG, errB) {
    addError_4(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError_4(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError_4(img, 5 >> 16.0, x, y + 1, errR, errG, errB);
    addError_4(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError_0(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height)
        return;
    let clr = getColorAtIndex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR * factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB * factor);
    setColorAtIndex(img, x, y, clr);
}

function addError_3(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height)
        return;
    let clr = getColorAtIndex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR - factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB - factor);
    setColorAtIndex(img, x, y, clr);
}

function addError_4(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height)
        return;
    let clr = getColorAtIndex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR - factor);
    clr.setGreen(g + errG - factor);
    clr.setBlue(b + errB - factor);
    setColorAtIndex(img, x, y, clr);
}

function addError_5(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height)
        return;
    let clr = getColorAtIndex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR / factor);
    clr.setGreen(g + errG / factor);
    clr.setBlue(b + errB * factor);
    setColorAtIndex(img, x, y, clr);
}





//_____________________________________________________
// Custom functions
//_____________________________________________________



// Convert RGB to HEX
// from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Convert RGB to HEX
// from https://editor.p5js.org/Kubi/sketches/IJp2TXHNJ
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return color(r, g, b);
}


//return random integer from min to max number
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//returns an index location (i) for pixel coordinates (x,y)
function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

//returns color of a pixel at coordinates (x,y)
function getColorAtIndex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

//sets a color of a pixel at coordinates (x,y)
function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / max) * floor(max / steps);
}



//make image grayscale
//adapted from https://github.com/kgjenkins/dither-dream
function grayscale(img, contrast) {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img, x, y);
      let r = red(clr);
      let g = green(clr);
      let b = blue(clr);
      let a = alpha(clr);
      // calculate greyscale following Rec 601 luma
      let v = (0.3*r + 0.58*g + 0.11*b) * a/255;
      //stretch to increase contrast
      v = v + (v-128)*contrast;
      let newClr = color(v, v, v, a);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}

//stripes the image with black bands
function makeStriped(img, stripe_step) {
  img.loadPixels();
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      let clr = getColorAtIndex(img, x, y);
      let r = y % stripe_step == 0 ? red(clr) : 0 ;
      let g = y % stripe_step == 0 ? green(clr) : 0 ;
      let b = y % stripe_step == 0 ? blue(clr) : 0 ;
      let newClr = color(r, g, b);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}



/**
 * Resize the image to a new width and height using nearest neighbor algorithm.
 * To make the image scale proportionally, use 0 as the value for the wide or high parameters.
 * For instance, to make the width of an image 150 pixels,
 * and change the height using the same proportion, use resize(150, 0).
 * Otherwise same usage as the regular resize().
 *
 * Note: Disproportionate resizing squashes the "pixels" from squares to rectangles.
 * This works about 10 times slower than the regular resize.
 * Any suggestions for performance increase are welcome.
 */

// https://GitHub.com/processing/p5.js/issues/1845
// https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c
// GitHub GoToLoop/resizeNN.js

p5.Image.prototype.resizeNN = function (w, h) {
  "use strict";

  // Locally cache current image's canvas' dimension properties:
  const {width, height} = this.canvas;

  // Sanitize dimension parameters:
  w = ~~Math.abs(w), h = ~~Math.abs(h);

  // Quit prematurely if both dimensions are equal or parameters are both 0:
  if (w === width && h === height || !(w | h))  return this;

  // Scale dimension parameters:
  w || (w = h*width  / height | 0); // when only parameter w is 0
  h || (h = w*height / width  | 0); // when only parameter h is 0

  const img = new p5.Image(w, h), // creates temporary image
        sx = w / width, sy = h / height; // scaled coords. for current image

  this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]

  // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
  const pixInt = new Int32Array(this.pixels.buffer),
        imgInt = new Int32Array(img.pixels.buffer);

  // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once:
  for (let y = 0; y < h; ) {
    const curRow = width * ~~(y/sy), tgtRow = w * y++;

    for (let x = 0; x < w; ) {
      const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
      imgInt[tgtIdx] = pixInt[curIdx];
    }
  }

  img.updatePixels(); // updates temporary 8-bit RGBa pixels[] w/ its current state

  // Resize current image to temporary image's dimensions:
  this.canvas.width = this.width = w, this.canvas.height = this.height = h;
  this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);

  return this;
};



// Stored Floyd-Steinberg parameters which can be called from JSON

const FS_params = {

  'standard' : [7/16.0, 3/16.0, 5/16.0, 1/16.0],
  'a' : [-1/16.0, 10/16.0, -1/16.0, 10/16.0],
  'b' : [-13/16.0, 13/16.0, -20/16.0, -11/16.0]

};
