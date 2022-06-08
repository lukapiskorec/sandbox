// Collection of functions and effects for image manipulation and glitching
// by @LukaPiskorec



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



// EFFECT STACKS

// effect stack 0 -> Monochrome dither
function applyMonochromeDither(img) {

  setBrightness(img, new_brightness);
  grayscale(img, contrast);

  img_2 = img.get(); // copy image pixels
  img_3 = img.get(); // copy image pixels

  // 1. Full image
  blendMode(BLEND); // make sure to set blendMode back to default one just in case
  noTint();
  img.resize(img.width / pix_scaling, 0);
  makeDithered(img, nr_of_levels, dither_params_1);
  img.resizeNN(img.width * pix_scaling, 0);
  image(img, image_border[0]/2, image_border[1]/2);

  // 2. Bright part of the image
  blendMode(BLEND);
  brightnessMask(img_2, mask_contrast, light_treshold, invert_mask);
  makeDithered(img_2, nr_of_levels, dither_params_2);
  image(img_2, image_border[0]/2 + layer_shift, image_border[1]/2 + layer_shift);

  // 3. Dark part of the image
  blendMode(ADD);
  img_3.resize(img_3.width / pix_scaling_dark, 0);
  brightnessMask(img_3, mask_contrast, dark_treshold, !invert_mask);
  makeDithered(img_3, nr_of_levels, dither_params_3);
  tint(tint_palette[0], tint_palette[1], tint_palette[2]);
  img_3.resizeNN(img_3.width * pix_scaling_dark, 0);
  image(img_3, image_border[0]/2 + layer_shift, image_border[1]/2 + layer_shift);

  blendMode(BLEND);
  noTint();
}


// effect stack 1 -> Tinted dither
function applyTintedDither(img) {

  setBrightness(img, new_brightness);
  img_2 = img.get(); // copy image pixels

  // 1. Full image
  blendMode(BLEND);
  setContrast(img, contrast);
  img.resize(img.width / pix_scaling, 0);
  makeDithered(img, nr_of_levels, dither_params_1);
  tint(tint_palette[0], tint_palette[1], tint_palette[2]);
  img.resizeNN(img.width * pix_scaling, 0);
  image(img, image_border[0]/2, image_border[1]/2);

  // 2. Bright part of the image
  blendMode(ADD);
  noTint();
  grayscale(img_2, contrast);
  img_2.resize(img_2.width / (pix_scaling / 2), 0);
  brightnessMask(img_2, mask_contrast, light_treshold, invert_mask);
  makeDithered(img_2, nr_of_levels, dither_params_2);
  img_2.resizeNN(img_2.width * pix_scaling / 2, 0);
  image(img_2, image_border[0]/2 + layer_shift, image_border[1]/2 + layer_shift);

  blendMode(BLEND);
  noTint();
}


// effect stack 2 -> Color dither + pixel sorting
function applyDitherSorting(img) {

  setBrightness(img, new_brightness);
  img_2 = img.get(); // copy image pixels

  // 1. Full image
  blendMode(BLEND);
  setContrast(img, contrast);
  img.resize(img.width / pix_scaling, 0);
  makeDithered(img, nr_of_levels, dither_params_1);

  switch(sorting_order) {
    case 0:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 1:
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 2:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 3:
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    default:
      break;
  }

  makeDithered(img, nr_of_levels, dither_params_1);

  switch(tinting_mode) {
    case 1:
      tint_palette_key = 'magenta';
      tint_palette = three_bit_palette[tint_palette_key];
      tint(tint_palette[0], tint_palette[1], tint_palette[2]);
      break;
    case 2:
      tint_palette_key = 'cyan';
      tint_palette = three_bit_palette[tint_palette_key];
      tint(tint_palette[0], tint_palette[1], tint_palette[2]);
      break;
    default:
      // no tinting
      break;
  }

  img.resizeNN(img.width * pix_scaling, 0);
  image(img, image_border[0]/2, image_border[1]/2);

  // 2. Bright part of the image
  blendMode(ADD);
  noTint();
  grayscale(img_2, contrast);
  img_2.resize(img_2.width / pix_scaling, 0);
  brightnessMask(img_2, mask_contrast, light_treshold, invert_mask);
  makeDithered(img_2, nr_of_levels, dither_params_2);
  img_2.resizeNN(img_2.width * pix_scaling, 0);
  image(img_2, image_border[0]/2 + layer_shift, image_border[1]/2 + layer_shift);

  blendMode(BLEND);
  noTint();
}


// effect stack 3 -> Pixel sorting + color dither
function applySortingDither(img) {

  setBrightness(img, new_brightness);
  img_2 = img.get(); // copy image pixels

  // 1. Full image
  blendMode(BLEND);
  setContrast(img, contrast);
  img.resize(img.width / pix_scaling, 0);

  switch(sorting_order) {
    case 0:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 1:
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 2:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 3:
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    default:
      break;
  }

  makeDithered(img, nr_of_levels, dither_params_1);

  switch(tinting_mode) {
    case 1:
      tint_palette_key = 'magenta';
      tint_palette = three_bit_palette[tint_palette_key];
      tint(tint_palette[0], tint_palette[1], tint_palette[2]);
      break;
    case 2:
      tint_palette_key = 'cyan';
      tint_palette = three_bit_palette[tint_palette_key];
      tint(tint_palette[0], tint_palette[1], tint_palette[2]);
      break;
    default:
      // no tinting
      break;
  }

  img.resizeNN(img.width * pix_scaling, 0);
  image(img, image_border[0]/2, image_border[1]/2);

  // 2. Bright part of the image
  blendMode(ADD);
  noTint();
  grayscale(img_2, contrast);
  img_2.resize(img_2.width / pix_scaling, 0);
  brightnessMask(img_2, mask_contrast, light_treshold, invert_mask);
  makeDithered(img_2, nr_of_levels, dither_params_2);
  img_2.resizeNN(img_2.width * pix_scaling, 0);
  image(img_2, image_border[0]/2 + layer_shift, image_border[1]/2 + layer_shift);

  blendMode(BLEND);
  noTint();
}


// effect stack 4 -> Abstract dither
function applyAbstractDither(img) {

  setBrightness(img, new_brightness);

  // 1. Full image
  blendMode(BLEND);
  grayscale(img, contrast);
  img.resize(img.width / pix_scaling, 0);
  makeDithered(img, nr_of_levels, dither_params_1);
  img.resizeNN(img.width * pix_scaling / 2.0, 0); // we resize back only half way

  // here we had to take out pixelSortRow option as it didn't produce nice results
  switch(sorting_order) {
    case 0:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 1:
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    case 2:
      pixelSortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
      break;
    default:
      break;
  }

  makeDithered(img, nr_of_levels, dither_params_1);
  img.resizeNN(img.width * 2.0, 0); // we resize back double to get to the size of the original input image
  image(img, image_border[0]/2, image_border[1]/2);

  blendMode(BLEND);
  noTint();
}


// MAKE GIF ANIMATION

// create 5 frame animation using monochrome dither effect stack
function animateMonochromeDither(img) {

  setupGif(); // setup gif

  // make source image copies

  frame_1 = img.get();
  frame_2 = img.get();
  frame_3 = img.get();
  frame_4 = img.get();
  frame_5 = img.get();

  // apply effects to individual frames and add them to the gif animation

  background(0);
  applyMonochromeDither(frame_1);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[0] * delta_factor;
  new_brightness += brightness_delta[0] * delta_factor;

  background(0);
  applyMonochromeDither(frame_2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[1] * delta_factor;
  new_brightness += brightness_delta[1] * delta_factor;

  background(0);
  applyMonochromeDither(frame_3);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[2] * delta_factor;
  new_brightness += brightness_delta[2] * delta_factor;

  background(0);
  applyMonochromeDither(frame_4);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[3] * delta_factor;
  new_brightness += brightness_delta[3] * delta_factor;

  background(0);
  applyMonochromeDither(frame_5);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  gif.render(); // render gif when done

}


// create 5 frame animation using tinted dither effect stack
function animateTintedDither(img) {

  setupGif(); // setup gif

  // make source image copies

  frame_1 = img.get();
  frame_2 = img.get();
  frame_3 = img.get();
  frame_4 = img.get();
  frame_5 = img.get();

  // apply effects to individual frames and add them to the gif animation

  background(0);
  applyTintedDither(frame_1);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[0] * delta_factor;
  new_brightness += brightness_delta[0] * delta_factor;

  background(0);
  applyTintedDither(frame_2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[1] * delta_factor;
  new_brightness += brightness_delta[1] * delta_factor;

  background(0);
  applyTintedDither(frame_3);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[2] * delta_factor;
  new_brightness += brightness_delta[2] * delta_factor;

  background(0);
  applyTintedDither(frame_4);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[3] * delta_factor;
  new_brightness += brightness_delta[3] * delta_factor;

  background(0);
  applyTintedDither(frame_5);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  gif.render(); // render gif when done

}



// create 5 frame animation using color dither + pixel sorting effect stack
function animateDitherSorting(img) {

  setupGif(); // setup gif

  // make source image copies

  frame_1 = img.get();
  frame_2 = img.get();
  frame_3 = img.get();
  frame_4 = img.get();
  frame_5 = img.get();

  // apply effects to individual frames and add them to the gif animation

  background(0);
  applyDitherSorting(frame_1);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[0] * delta_factor;
  new_brightness += brightness_delta[0] * delta_factor;

  background(0);
  applyDitherSorting(frame_2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[1] * delta_factor;
  new_brightness += brightness_delta[1] * delta_factor;

  background(0);
  applyDitherSorting(frame_3);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[2] * delta_factor;
  new_brightness += brightness_delta[2] * delta_factor;

  background(0);
  applyDitherSorting(frame_4);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[3] * delta_factor;
  new_brightness += brightness_delta[3] * delta_factor;

  background(0);
  applyDitherSorting(frame_5);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  gif.render(); // render gif when done

}



// create 5 frame animation using pixel sorting + color dither effect stack
function animateSortingDither(img) {

  setupGif(); // setup gif

  // make source image copies

  frame_1 = img.get();
  frame_2 = img.get();
  frame_3 = img.get();
  frame_4 = img.get();
  frame_5 = img.get();

  // apply effects to individual frames and add them to the gif animation

  background(0);
  applySortingDither(frame_1);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[0] * delta_factor;
  new_brightness += brightness_delta[0] * delta_factor;

  background(0);
  applySortingDither(frame_2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[1] * delta_factor;
  new_brightness += brightness_delta[1] * delta_factor;

  background(0);
  applySortingDither(frame_3);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[2] * delta_factor;
  new_brightness += brightness_delta[2] * delta_factor;

  background(0);
  applySortingDither(frame_4);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[3] * delta_factor;
  new_brightness += brightness_delta[3] * delta_factor;

  background(0);
  applySortingDither(frame_5);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  gif.render(); // render gif when done

}




// create 5 frame animation using abstract dither effect stack
function animateAbstractDither(img) {

  setupGif(); // setup gif

  // make source image copies

  frame_1 = img.get();
  frame_2 = img.get();
  frame_3 = img.get();
  frame_4 = img.get();
  frame_5 = img.get();

  // apply effects to individual frames and add them to the gif animation

  background(0);
  applyAbstractDither(frame_1);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[0] * delta_factor;
  new_brightness += brightness_delta[0] * delta_factor;

  background(0);
  applyAbstractDither(frame_2);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[1] * delta_factor;
  new_brightness += brightness_delta[1] * delta_factor;

  background(0);
  applyAbstractDither(frame_3);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[2] * delta_factor;
  new_brightness += brightness_delta[2] * delta_factor;

  background(0);
  applyAbstractDither(frame_4);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  contrast += contrast_delta[3] * delta_factor;
  new_brightness += brightness_delta[3] * delta_factor;

  background(0);
  applyAbstractDither(frame_5);
  gif.addFrame(canvas.elt, {delay: frame_duration, copy: true }); // add frame to gif with canvas.elt which calls underlying HTML element

  gif.render(); // render gif when done

}




// ASDFPixelSort_Color - rewritten from Java to JavaScript by @lukapiskorec
// original Java code downloaded from here
//https://github.com/shmam/ASDFPixelSort_Color

function pixelSortColor(img, sorting_mode, sorting_type, color_noise_density = 5, color_noise_bias = [1,1,1], color_noise_variation = 1000) {
  // reset row and column for each image!
  row = 0;
  column = 0;

  img.loadPixels();

  while(column < img.width-1) {
    sortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
    column++;
  }

  while(row < img.height-1) {
    sortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
    row++;
  }

  img.updatePixels();
}


function pixelSortColumn(img, sorting_mode, sorting_type, color_noise_density = 5, color_noise_bias = [1,1,1], color_noise_variation = 1000) {
  // reset column for each image!
  column = 0;

  img.loadPixels();

  while(column < img.width-1) {
    sortColumn(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
    column++;
  }

  img.updatePixels();
}


function pixelSortRow(img, sorting_mode, sorting_type, color_noise_density = 5, color_noise_bias = [1,1,1], color_noise_variation = 1000) {
  // reset row for each image!
  row = 0;

  img.loadPixels();

  while(row < img.height-1) {
    sortRow(img, sorting_mode, sorting_type, color_noise_density, color_noise_bias, color_noise_variation);
    row++;
  }

  img.updatePixels();
}


// used for pixel sorting
function sortRow(img, sorting_mode, sorting_type, color_noise_density = 5, color_noise_bias = [1,1,1], color_noise_variation = 1000) {
  let x = 0;
  let y = row;
  let xend = 0;

  while(xend < img.width-1) {
    switch(sorting_mode) {
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

    //randomColor = color(random(255), random(255), random(255), 255);
    randomColor = color(random(255)*color_noise_bias[0], random(255)*color_noise_bias[1], random(255)*color_noise_bias[2], 255);
    d = 0;

    if(random(100) < color_noise_density){
         d = random(color_noise_variation);
    }

    for(let i=0; i<sortLength; i= i+1) {
      if (d > 0){
          mixPercentage = 0.5 + random(50)/100;
          pixelColor = getColorAtIndex(img, x + i, y);
          setColorAtIndex(img, x + i, y, lerpColor(pixelColor, randomColor, mixPercentage));
          d--;
      }

      switch(sorting_type) {
        case 0: // chaotic sorting
          unsorted[i] = getColorAtIndex(img, x + i, y);
          break;
        case 1: // proper sorting
          colorHex = getColorAtIndex(img, x + i, y);
          unsorted[i] = rgbToHex(red(colorHex), green(colorHex), blue(colorHex));
          break;
        default:
          break;
      }
    }

    sorted = unsorted.sort();

    for(let i=0; i<sortLength; i=i+1) {
      switch(sorting_type) {
        case 0: // chaotic sorting
          setColorAtIndex(img, x + i, y, sorted[i]);
          break;
        case 1: // proper sorting
          pixelColor = hexToRgb(unsorted[i]);
          setColorAtIndex(img, x + i, y, pixelColor);
          break;
        default:
          break;
      }
    }

    x = xend+1;
  }
}


// used for pixel sorting
function sortColumn(img, sorting_mode, sorting_type, color_noise_density = 5, color_noise_bias = [1,1,1], color_noise_variation = 1000) {
  let x = column;
  let y = 0;
  let yend = 0;

  while(yend < img.height-1) {
    switch(sorting_mode) {
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

    //randomColor = color(random(255), random(255), random(255), 255);
    randomColor = color(random(255)*color_noise_bias[0], random(255)*color_noise_bias[1], random(255)*color_noise_bias[2], 255);
    d = 0;

    if(random(100) < color_noise_density){
         d = random(color_noise_variation);
    }

    for(let i=0; i<sortLength; i++) {
      if (d > 0){
          mixPercentage = 0.5 + random(50)/100;
          pixelColor = getColorAtIndex(img, x + i, y);
          setColorAtIndex(img, x + i, y, lerpColor(pixelColor, randomColor, mixPercentage));
          d--;
      }

      switch(sorting_type) {
        case 0: // chaotic sorting
          unsorted[i] = getColorAtIndex(img, x + i, y);
          break;
        case 1: // proper sorting
          colorHex = getColorAtIndex(img, x + i, y);
          unsorted[i] = rgbToHex(red(colorHex), green(colorHex), blue(colorHex));
          break;
        default:
          break;
      }
    }

    sorted = unsorted.sort();

    for(let i=0; i<sortLength; i++) {
      switch(sorting_type) {
        case 0: // chaotic sorting
          setColorAtIndex(img, x, y + i, sorted[i]);
          break;
        case 1: // proper sorting
          pixelColor = hexToRgb(unsorted[i]);
          setColorAtIndex(img, x, y + i, pixelColor);
          break;
        default:
          break;
      }
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
      let oldA = alpha(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);
      let newA = closestStep(255, steps, oldA);
      let newClr = color(newR, newG, newB, newA);
      setColorAtIndex(img, x, y, newClr);
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;
      let errA = oldA - newA;

      distributeError_params(img, x, y, errR, errG, errB, errA, dither_params);

    }
  }
  img.updatePixels();
}


//Floyd-Steinberg algorithm achieves dithering using error diffusion (formula from Wikipedia)
function distributeError(img, x, y, errR, errG, errB, errA) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB, errA);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB, errA);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB, errA);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB, errA);
}


//Floyd-Steinberg dithering algorithm with varable parameters
function distributeError_params(img, x, y, errR, errG, errB, errA, params) {
  addError(img, params[0], x + 1, y, errR, errG, errB, errA);
  addError(img, params[1], x - 1, y + 1, errR, errG, errB, errA);
  addError(img, params[2], x, y + 1, errR, errG, errB, errA);
  addError(img, params[3], x + 1, y + 1, errR, errG, errB, errA);
}


//Floyd-Steinberg algorithm pushes (adds) the residual quantization error
//of a pixel onto its neighboring pixels
function addError(img, factor, x, y, errR, errG, errB, errA) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtIndex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  let a = alpha(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);
  clr.setAlpha(a + errA * factor);
  setColorAtIndex(img, x, y, clr);
}


//experiment with different Floyd-Steinberg dithering variations using this online tool:
//https://kgjenkins.github.io/dither-dream/
//repository link:
//https://github.com/kgjenkins/dither-dream





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

// return random integer from min to max number
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random(min, max));
}

// return a random key from JSON dictionary
function getRandomKey(json_dict){
    let obj_keys = Object.keys(json_dict);
    let ran_key = obj_keys[int(random(obj_keys.length))];
    return ran_key;
}

// return random element from a list with set weights in form:
// data = [ ["a", 50], ["b", 25], ["c", 25] ]; numbers are not strict probabilities so don't have to add up to 100
function weightedChoice(data){
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
      total += data[i][1];
  }
  const threshold = random(total);
  total = 0;
  for (let i = 0; i < data.length - 1; ++i) {
      total += data[i][1];
      if (total >= threshold) {
          return data[i][0];
      }
  }
  return data[data.length - 1][0];
}


// returns an index location (i) for pixel coordinates (x,y)
function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

// returns color of a pixel at coordinates (x,y)
function getColorAtIndex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

// sets a color of a pixel at coordinates (x,y)
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



// make image grayscale
// adapted from https://github.com/kgjenkins/dither-dream
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

// change image contrast
function setContrast(img, contrast) {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img, x, y);
      let r = red(clr);
      let g = green(clr);
      let b = blue(clr);
      let a = alpha(clr);
      //stretch to increase contrast
      r = r + (r-128)*contrast;
      g = g + (g-128)*contrast;
      b = b + (b-128)*contrast;
      let newClr = color(r, g, b, a);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}

// change image brightness
function setBrightness(img, brightness) {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img, x, y);
      let r = red(clr);
      let g = green(clr);
      let b = blue(clr);
      let a = alpha(clr);
      //multiply by the constant to change the brightness
      r = r * brightness;
      g = g * brightness;
      b = b * brightness;
      //constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      let newClr = color(r, g, b, a);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}

// stripes the image with black bands
function makeStriped(img, stripe_width, stripe_offset = 0, invert = false) {
  img.loadPixels();
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      let clr = getColorAtIndex(img, x, y);
      // here we use some smart boolean logic to quickly invert the black band pattern
      let r = y % stripe_width == stripe_offset ? red(clr)*!invert : red(clr)*invert ;
      let g = y % stripe_width == stripe_offset ? green(clr)*!invert : green(clr)*invert ;
      let b = y % stripe_width == stripe_offset ? blue(clr)*!invert : blue(clr)*invert ;
      let newClr = color(r, g, b, alpha(clr));
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}

// make parts of the image transparent based on brightness
function brightnessMask(img, contrast, treshold, invert = false) {
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
      // stretch to increase contrast
      v = v + (v-128)*contrast;
      let newAlpha = brightness(clr) > treshold ? 255*!invert : 255*invert;
      let newClr = color(r, g, b, newAlpha);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
}


// flip image horizontally
function flipHorizontal(img) {
  let img_temp = createImage(img.width, img.height);
  img_temp.loadPixels();
  img.loadPixels();
  // create a temporary image with flipped pixels
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img, img.width - x, y);
      let r = red(clr);
      let g = green(clr);
      let b = blue(clr);
      let a = alpha(clr);
      let newClr = color(r, g, b, a);
      setColorAtIndex(img_temp, x, y, newClr);
    }
  }
  // replace all pixels from the original image with the pixels from the flipped one
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img_temp, x, y);
      let r = red(clr);
      let g = green(clr);
      let b = blue(clr);
      let a = alpha(clr);
      let newClr = color(r, g, b, a);
      setColorAtIndex(img, x, y, newClr);
    }
  }
  img.updatePixels();
  img_temp.updatePixels();
}



/**
 * Resize the image to a new width and height using nearest neighbor algorithm.
 * To make the image scale proportionally, use 0 as the value for the wide or high parameters.
 * Note: Disproportionate resizing squashes the "pixels" from squares to rectangles.
 * This works about 10 times slower than the regular resize.
 */

// https://GitHub.com/processing/p5.js/issues/1845
// https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c
// GitHub GoToLoop/resizeNN.js

p5.Image.prototype.resizeNN = function (w, h) {
  "use strict";
  const {width, height} = this.canvas; // Locally cache current image's canvas' dimension properties
  w = ~~Math.abs(w), h = ~~Math.abs(h); // Sanitize dimension parameters
  if (w === width && h === height || !(w | h))  return this; // Quit prematurely if both dimensions are equal or parameters are both 0
  // Scale dimension parameters:
  w || (w = h*width  / height | 0); // when only parameter w is 0
  h || (h = w*height / width  | 0); // when only parameter h is 0
  const img = new p5.Image(w, h), // creates temporary image
        sx = w / width, sy = h / height; // scaled coords. for current image
  this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]
  // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
  const pixInt = new Int32Array(this.pixels.buffer),
        imgInt = new Int32Array(img.pixels.buffer);
  // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once
  for (let y = 0; y < h; ) {
    const curRow = width * ~~(y/sy), tgtRow = w * y++;
    for (let x = 0; x < w; ) {
      const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
      imgInt[tgtIdx] = pixInt[curIdx];
    }
  }
  img.updatePixels(); // updates temporary 8-bit RGBa pixels[] w/ its current state
  // Resize current image to temporary image's dimensions
  this.canvas.width = this.width = w, this.canvas.height = this.height = h;
  this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);
  return this;
};
