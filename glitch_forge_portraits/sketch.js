/*


 █    ██  ███▄    █  ███▄    █  ▄▄▄       ███▄ ▄███▓▓█████ ▓█████▄
 ██  ▓██▒ ██ ▀█   █  ██ ▀█   █ ▒████▄    ▓██▒▀█▀ ██▒▓█   ▀ ▒██▀ ██▌
▓██  ▒██░▓██  ▀█ ██▒▓██  ▀█ ██▒▒██  ▀█▄  ▓██    ▓██░▒███   ░██   █▌
▓▓█  ░██░▓██▒  ▐▌██▒▓██▒  ▐▌██▒░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄ ░▓█▄   ▌
▒▒█████▓ ▒██░   ▓██░▒██░   ▓██░ ▓█   ▓██▒▒██▒   ░██▒░▒████▒░▒████▓
░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒ ░ ▒░   ▒ ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░ ▒▒▓  ▒
░░▒░ ░ ░ ░ ░░   ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░  ░      ░ ░ ░  ░ ░ ▒  ▒
 ░░░ ░ ░    ░   ░ ░    ░   ░ ░   ░   ▒   ░      ░      ░    ░ ░  ░
   ░              ░          ░       ░  ░       ░      ░  ░   ░
                                                            ░

WIP by {protocell:labs} and jrdsctt for Glitch Forge, 2022

*/



let input_img, img, frame_1, frame_2, frame_3;
let sortLength, randomColor, d, mixPercentage, pixelColor, colorHex;
let unsorted, sorted;
let gif, canvas;

let mode = 2; // pixel sorting color mode, 0 -> black, 1 -> bright, 2 -> white
//let sorting = 1; // pixel sorting type, 0 -> chaotic, 1 -> proper (NOT IMPLEMENTED YET!)

let blackValue = 10; // smallest is -16777216, this was before -13000000
let brigthnessValue = 50;
let whiteValue = 80; // pixels lighter than this will not be sorted, max is 100

let image_path = "assets/skllwrks_based_03_small.png"; // Path to input image
let image_border = [200, 200]; // Width of the border in pixels
let frame_duration = 200; // In mms

let row = 0;
let column = 0;




function preload() {
  input_img = loadImage(image_path);

  frame_1 = loadImage(image_path);
  frame_2 = loadImage(image_path);
  frame_3 = loadImage(image_path);
  frame_4 = loadImage(image_path);
  frame_5 = loadImage(image_path);

}


function setup() {

  let nr_of_levels = 1; // number of color levels for FS dithering
  let stripe_step = 10; // width of black stripes
  let dither_params_rand = [randInt(-24, 24)/16.0, randInt(-24, 24)/16.0, randInt(-24, 24)/16.0, randInt(-24, 24)/16.0]; //random error distribution parameters for Floyd-Steinberg dithering
  let contrast = 0; // Set image contrast - 0.0 is no change
  let dither_params = FS_params['standard']; // Read error distribution parameters from a JSON file
  let pix_scaling = 4.0; // Scales the size of pixels when applying effects

  pixelDensity(1.0); // Need to fix this so the gif.js exports the correct size
  canvas = createCanvas(input_img.width + image_border[0], input_img.height + image_border[1]);
  setupGif(); // Setup gif


  /*
  // Effects which can be used - these are loaded from effects.js

  input_img.resize(input_img.width / pix_scaling, 0); // Resize the image using smooth interpolation - 0 means image is scaled proportionally to the other parameter
  input_img.resizeNN(input_img.width * pix_scaling, 0); // Resize the image using nearest-neighbour interpolation - 0 means image is scaled proportionally to the other parameter
  grayscale(input_img, contrast); // Make image grayscale
  makeStriped(input_img, stripe_step); // Stripes the image with black bands
  makeDithered(input_img, nr_of_levels, dither_params); // Apply Floyd-Steinberg dithering with custom error diffusion parameters
  pixelSortColor(input_img); // Apply color pixel sorting with color abberation
  */


  // Here we create individual frames and apply effects to them

  pixelSortColor(frame_1);
  whiteValue += 2;
  pixelSortColor(frame_2);
  whiteValue += 2;
  pixelSortColor(frame_3);
  whiteValue += 2;
  pixelSortColor(frame_4);
  whiteValue += 2;
  pixelSortColor(frame_5);



  // Here we create a sequence of frames and add them to the gif animation

  background(0);
  image(frame_1, image_border[0]/2, image_border[1]/2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // Add frame to gif with canvas.elt which calls underlying HTML element

  background(0);
  image(frame_2, image_border[0]/2, image_border[1]/2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // Add frame to gif with canvas.elt which calls underlying HTML element

  background(0);
  image(frame_3, image_border[0]/2, image_border[1]/2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // Add frame to gif with canvas.elt which calls underlying HTML element

  background(0);
  image(frame_4, image_border[0]/2, image_border[1]/2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // Add frame to gif with canvas.elt which calls underlying HTML element

  background(0);
  image(frame_5, image_border[0]/2, image_border[1]/2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // Add frame to gif with canvas.elt which calls underlying HTML element


  gif.render(); // Render gif when done

}


// This code does not use function draw() {}
