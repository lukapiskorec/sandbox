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

// Defining parameters

let img, input_img, input_img_2, input_img_3;
let frame_1, frame_2, frame_3, frame_4, frame_5;
let sortLength, randomColor, d, mixPercentage, pixelColor, colorHex;
let unsorted, sorted;
let gif, canvas;
let row, column;
let source_theme_nr, source_themes, source_theme, source_themes_size, source_theme_weights, source_nr, image_path;

let effects_stack_type; // Type of effects workflow to be used as a number
let effects_stack_names, effects_stack_name; // Type of effects workflow to be used as a string
let image_border; // Width of the border in pixels, [76, 76]
let frame_duration; // In mms

let blackValue; // Pixels darker than this will not be sorted, max is 100
let brigthnessValue; // Value for sorting pixels according to brightness
let whiteValue; // Pixels lighter than this will not be sorted, max is 100
let sorting_mode; // Pixel sorting color mode, 0 -> black, 1 -> bright, 2 -> white
let sorting_type; // Pixel sorting type, 0 -> chaotic, 1 -> proper
let sorting_order; // Determines order of sorting, 0 -> column, 1 -> row, 2 -> column-row, 3 -> row-column (there are exceptions to this notation, see Abstract workflow)
let color_noise_density; // Density of color noise (0-100)
let rand_color_bias_key; // JSON key for color noise bias parameters
let color_noise_bias; // Array which skews the rgb color values of the noise using this factor (0-1)
let color_noise_variation; // Variation of the color noise (10-10000)

let stripe_width; // Width of black stripes
let stripe_offset; // Offset of black stripes, note this cannot be bigger than stripe_width-1 !
let invert_stripes; // Inverts the striped pattern

let nr_of_levels; // Number of color levels for FS dithering, standard is 1
let contrast; // Set image contrast - 0.0 is no change
let new_brightness; // Set image brightness - 1.0 is no change
let contrast_delta, brightness_delta, delta_factor; // Ammount to change effect values between animation frames

let dither_group, dither_group_weights; // Number for the group of dither parameters to choose from
let rand_dither_key, rand_dither_key_2; // JSON key for dither error distribution parameters
let dither_params, dither_params_1, dither_params_2, dither_params_3; // Read error distribution parameters from a JSON file
let pix_scaling, pix_scaling_dark; // Scales the size of pixels when applying effects
let layer_shift; // Shift in x and y direction for every consecutive layer
let tint_palette_key; // JSON key for tint palette colors
let tint_palette; // RGB array with values for tinting, example three_bit_palette['magenta']
let tinting_mode; // Type of tinting selected, 0 is always no tinting

let mask_contrast; // Contrast value for the image when taking brightnessMask
let light_treshold; // Brightness treshold for the image when taking brightnessMask
let dark_treshold; // Brightness treshold for the image when taking brightnessMask
let invert_mask; // Invert brightnessMask

/*
// Examples of parameters

let source_themes = ['citizen', 'cityscape', 'covers', 'scenes'];
let source_themes_size = [354, 290, 220, 46]; // 910 in total,  citizen 39%, cityscape 32%, covers 24%, scenes 5%
let effects_stack_type = 1; // Type of effects workflow to be used
let effects_stack_name = "Monochrome"; // Type of effects workflow to be used as a string
let image_border = [100, 100]; // Width of the border in pixels, [76, 76]
let frame_duration = 200; // In mms

let blackValue = 15; // Pixels darker than this will not be sorted, max is 100
let brigthnessValue = 50; // Value for sorting pixels according to brightness
let whiteValue = 70; // Pixels lighter than this will not be sorted, max is 100
let sorting_mode = 2; // Pixel sorting color mode, 0 -> black, 1 -> bright, 2 -> white
let sorting_type = 1; // Pixel sorting type, 0 -> chaotic, 1 -> proper
let sorting_order = 0; // Determines order of sorting, 0 -> column, 1 -> row, 2 -> column-row, 3 -> row-column (there are exceptions to this notation, see Abstract workflow)
let color_noise_density = 5; // Density of color noise (0-100)
let rand_color_bias_key = getRandomKey(color_bias_palette); // JSON key for color noise bias parameters
let color_noise_bias = [1, 0, 1]; // Array which skews the rgb color values of the noise using this factor (0-1)
let color_noise_variation = 10000; // Variation of the color noise (10-10000)

let stripe_width = 5; // Width of black stripes
let stripe_offset = 1; // Offset of black stripes, note this cannot be bigger than stripe_width-1 !
let invert_stripes = false; // Inverts the striped pattern

let nr_of_levels = 1; // Number of color levels for FS dithering
let contrast = 0.25; // Set image contrast - 0.0 is no change
let new_brightness = 1.0; // Set image brightness - 1.0 is no change
let dither_group = 0; // Number for the group of dither parameters to choose from
let rand_dither_key = getRandomKey(dither_params_json); // Get random key for dither error distribution parameters
let dither_params = dither_params_json[rand_dither_key]; // Read error distribution parameters from a JSON fil
let pix_scaling = 2.0; // Scales the size of pixels when applying effects
let pix_scaling_dark = pix_scaling * 2;
let layer_shift = 4; // Shift in x and y direction for every consecutive layer
let tint_palette_key = 'blue'; // JSON key for tint palette colors
let tint_palette = three_bit_palette['magenta']; // RGB array with values for tinting
let tinting_mode = 0; // Type of tinting selected, 0 is always no tinting

let mask_contrast = 0.0; // Contrast value for the image when taking brightnessMask
let light_treshold = 80; // Brightness treshold for the image when taking brightnessMask
let dark_treshold = 20; // Brightness treshold for the image when taking brightnessMask
let invert_mask = true; // Invert brightnessMask
*/





function preload() {

  //randomSeed(44344446555); // set the seed of the random number generator

  image_border = [100, 100]; // width of the border in pixels, 900 + 100 = 1000 pix
  frame_duration = 100; // in mms

  // SELECTION OF EFFECTS STACK
  // 0 -> Monochrome dither
  // 1 -> Tinted dither
  // 2 -> Color dither + pixel sorting
  // 3 -> Pixel sorting + color dither
  // 4 -> Abstract dither

  effects_stack_weights = [ [0, 20], [1, 20], [2, 20], [3, 20], [4, 20] ]; // these represent probabilities for choosing an effects stack number [element, probability]
  effects_stack_type = weightedChoice(effects_stack_weights); // type of effects workflow to be used as a number, 0-4
  //effects_stack_type = 4; // override for the type of effects workflow to be used as a number, 0-4
  effects_stack_names = ["monochrome dither", "tinted dither", "color dither + pixel sorting", "pixel sorting + color dither", "abstract dither"]; // type of effects workflow to be used as a string
  effects_stack_name = effects_stack_names[effects_stack_type]; // type of effects workflow to be used as a string

  // SELECTION OF SOURCE THEME
  source_themes = ['citizen', 'cityscape', 'covers', 'scenes'];
  source_themes_size = [354, 290, 220, 46]; // 910 in total,  citizen 39%, cityscape 32%, covers 24%, scenes 5%
  source_theme_weights = [ [0, 35], [1, 35], [2, 25], [3, 5] ]; // these represent probabilities for choosing a source theme number [element, probability]
  source_theme_nr = weightedChoice(source_theme_weights); // 0 -> citizen, 1 -> cityscape, 2 -> covers, 3 -> scenes
  //source_theme_nr = 1; // override for the source theme

  // EXCEPTIONS - these skew the choice probabilities from above
  if (effects_stack_type == 4) {source_theme_nr = 0}; // Abstract dither effect stack works only with citizen theme

  // DEFINING THE PATH TO THE SOURCE IMAGE
  source_theme = source_themes[source_theme_nr]; // 'citizen', 'cityscape', 'covers', 'scenes'
  source_nr = int(random(source_themes_size[source_theme_nr])) + 1; // image number
  image_path = 'assets/midjourney/' + source_theme + '/' + source_theme + '_' + str(source_nr).padStart(3, '0') + '.png'; // path to source image like 'assets/midjourney/citizen/citizen_005.png'
  input_img = loadImage(image_path);

}



function setup() {

  /*
  // Effects which can be used - these are loaded from effects.js or sometimes from P5.min.js

  input_img.resize(input_img.width / pix_scaling, 0); // Resize the image using smooth interpolation - 0 means image is scaled proportionally to the other parameter
  input_img.resizeNN(input_img.width * pix_scaling, 0); // Resize the image using nearest-neighbour interpolation - 0 means image is scaled proportionally to the other parameter
  grayscale(input_img, contrast); // Make image grayscale
  makeStriped(input_img, stripe_step, invert_stripes); // Stripes the image with black bands
  makeDithered(input_img, nr_of_levels, dither_params); // Apply Floyd-Steinberg dithering with custom error diffusion parameters
  pixelSortColor(input_img, sorting_type, color_noise_density, color_noise_bias, color_noise_variation); // Apply color pixel sorting with color abberation
  pixelSortRow(input_img, sorting_type, color_noise_density, color_noise_bias, color_noise_variation); // Apply color pixel sorting with color abberation
  pixelSortColumn(input_img, sorting_type, color_noise_density, color_noise_bias, color_noise_variation); // Apply color pixel sorting with color abberation
  brightnessMask(input_img, contrast, treshold, invert); // Make parts of the image transparent based on brightness (0-100)
  tint(r, g, b); // Colorize the image using RGB values
  flipHorizontal(input_img); // Flip image horizontally
  applyMonochromeDither(input_img); // apply and draw monochrome dither effect stack
  applyTintedDither(img); // apply and draw tinted dither effect stack
  applyDitherSorting(input_img); // apply and draw color dither + pixel sorting effect stack
  applySortingDither(input_img); // apply and draw pixel sorting + color dither effect stack
  applyAbstractDither(input_img); // apply and draw abstract dither effect stack
  */


  // ARTWORK GENERATION

  pixelDensity(1.0); // Need to fix this so the gif.js exports the correct size
  canvas = createCanvas(input_img.width + image_border[0], input_img.height + image_border[1]);
  background(0); // set black background for all images


  // THE MAIN EFFECT STACK SWITCH

  switch(effects_stack_type) {

    case 0: // Monochrome dither

      // Custom stack params
      nr_of_levels = 1;
      contrast = 0.15;

      rand_dither_key_1 = getRandomKey(dither_params_json);
      rand_dither_key_2 = getRandomKey(extreme_dither_params_json);
      rand_dither_key_3 = getRandomKey(dither_params_json);

      dither_params_1 = dither_params_json[rand_dither_key_1];
      dither_params_2 = extreme_dither_params_json[rand_dither_key_2];
      dither_params_3 = dither_params_json[rand_dither_key_3];

      pix_scaling = 2.0;
      layer_shift = 4;
      mask_contrast = 0.0;
      dark_treshold = 20;
      light_treshold = 80;
      invert_mask = false;
      tint_palette_key = getRandomKey(three_bit_palette_reduced);
      tint_palette = three_bit_palette_reduced[tint_palette_key];
      // if tint color is white or green (these are very bright) then the size of dither pixels in darkest regions is smallest possible
      pix_scaling_dark = (tint_palette_key == 'white') || (tint_palette_key == 'green') ? 1.0 : pix_scaling * 2;

      new_brightness = 1.0; // brightness needs to increase at 50% rate of the contrast
      delta_factor = 0.5; // scaling animation effects
      contrast_delta = animation_params['contrast t1']; // values from this list will be added to the contrast for each frame
      brightness_delta = animation_params['brightness t1']; // values from this list will be added to the brightness for each frame

      //applyMonochromeDither(input_img); // apply and draw monochrome dither effect stack

      // make gif animation
      animateMonochromeDither(input_img);

      break;

    case 1: // Tinted dither

      // Custom stack params
      nr_of_levels = 1;
      contrast = 0.25;
      rand_dither_key_1 = getRandomKey(dither_params_json);
      rand_dither_key_2 = getRandomKey(dither_params_json);
      dither_params_1 = dither_params_json[rand_dither_key_1];
      dither_params_2 = dither_params_json[rand_dither_key_2];
      pix_scaling = 2.0;
      layer_shift = 4;
      mask_contrast = 0.25;
      light_treshold = 50;
      invert_mask = false;
      tint_palette_key = getRandomKey(three_bit_palette);
      tint_palette = three_bit_palette[tint_palette_key];

      new_brightness = 1.0; // brightness needs to increase at 50% rate of the contrast
      delta_factor = 0.5; // scaling animation effects
      contrast_delta = animation_params['contrast t1']; // values from this list will be added to the contrast for each frame
      brightness_delta = animation_params['brightness t1']; // values from this list will be added to the brightness for each frame

      //applyTintedDither(input_img); // apply and draw tinted dither effect stack

      // make gif animation
      animateTintedDither(input_img);

      break;


    case 2: // Color dither + pixel sorting

      // Custom stack params
      blackValue = 10;
      brigthnessValue = 50;
      whiteValue = 70;

      sorting_mode = randInt(0, 3); // 0, 1, 2
      sorting_type = randInt(0, 2); // 0, 1
      sorting_order = randInt(0, 4); // 0, 1, 2, 3
      color_noise_density = 5;
      rand_color_bias_key = getRandomKey(color_bias_palette);
      color_noise_bias = color_bias_palette[rand_color_bias_key];
      color_noise_variation = 10000;

      nr_of_levels = 1;
      contrast = 0.15;
      rand_dither_key_1 = getRandomKey(dither_params_json);
      rand_dither_key_2 = getRandomKey(dither_params_json);
      dither_params_1 = dither_params_json[rand_dither_key_1];
      dither_params_2 = dither_params_json[rand_dither_key_2];
      pix_scaling = 2.0;
      layer_shift = 4;
      mask_contrast = 0.25;
      light_treshold = 50;
      invert_mask = false;
      tinting_mode = randInt(0, 3); // 0, 1, 2

      new_brightness = 1.0; // brightness needs to increase at 50% rate of the contrast
      delta_factor = 0.5; // scaling animation effects
      contrast_delta = animation_params['contrast t1']; // values from this list will be added to the contrast for each frame
      brightness_delta = animation_params['brightness t1']; // values from this list will be added to the brightness for each frame

      //applyDitherSorting(input_img); // apply and draw color dither + pixel sorting effect stack

      // make gif animation
      animateDitherSorting(input_img);

      break;

    case 3: // Pixel sorting + color dither

      // Custom stack params
      blackValue = 10;
      brigthnessValue = 50;
      whiteValue = 70;

      sorting_mode = randInt(0, 3); // 0, 1, 2
      sorting_type = randInt(0, 2); // 0, 1
      sorting_order = randInt(0, 4); // 0, 1, 2, 3
      color_noise_density = 5;
      rand_color_bias_key = getRandomKey(color_bias_palette);
      color_noise_bias = color_bias_palette[rand_color_bias_key];
      color_noise_variation = 10000; //10000

      nr_of_levels = 1;
      contrast = 0.15; // 15
      rand_dither_key_1 = getRandomKey(dither_params_json);
      rand_dither_key_2 = getRandomKey(dither_params_json);
      dither_params_1 = dither_params_json[rand_dither_key_1];
      dither_params_2 = dither_params_json[rand_dither_key_2];
      pix_scaling = 2.0;
      layer_shift = 4;
      mask_contrast = 0.25;
      light_treshold = 50;
      invert_mask = false;
      tinting_mode = randInt(0, 3); // 0, 1, 2

      new_brightness = 1.0; // brightness needs to increase at 50% rate of the contrast
      delta_factor = 0.5; // scaling animation effects
      contrast_delta = animation_params['contrast t1']; // values from this list will be added to the contrast for each frame
      brightness_delta = animation_params['brightness t1']; // values from this list will be added to the brightness for each frame

      //applySortingDither(input_img); // apply and draw pixel sorting + color dither effect stack

      // make gif animation
      animateSortingDither(input_img);

      break;


    case 4: // Abstract dither

      // Custom stack params
      blackValue = 10;
      brigthnessValue = 50;
      whiteValue = 70;

      sorting_mode = 2; // this mode works best for this workflow
      sorting_type = randInt(0, 2); // 0, 1
      sorting_order = randInt(0, 3); // 0, 1, 2
      color_noise_density = 5;
      rand_color_bias_key = getRandomKey(color_bias_palette);
      color_noise_bias = color_bias_palette[rand_color_bias_key];
      color_noise_variation = 10000;

      nr_of_levels = 1;
      contrast = 0.25;

      dither_group_weights = [ [0, 75], [1, 25] ]; // these represent probabilities for choosing a dither group number [element, probability]
      dither_group = weightedChoice(dither_group_weights); // type of effects workflow to be used as a number, 0-4

      switch(dither_group) {
        case 0: // smaller pixels, less abstract, common
          rand_dither_key_1 = getRandomKey(dither_params_json);
          dither_params_1 = dither_params_json[rand_dither_key_1];
          break;
        case 1: // larger pixels, more abstract, rare
          rand_dither_key_1 = getRandomKey(extreme_dither_params_json);
          dither_params_1 = extreme_dither_params_json[rand_dither_key_1];
          break;
        default:
          break;
      }

      pix_scaling = dither_group == 0 ? 8.0 : 16.0; // larger dither pixels for extreme dither parameters
      layer_shift = 4;
      mask_contrast = 0.25;
      light_treshold = 50;
      invert_mask = false;
      tinting_mode = randInt(0, 3); // 0, 1, 2

      new_brightness = 1.0; // brightness needs to increase at 50% rate of the contrast
      delta_factor = 0.05; // scaling animation effects
      contrast_delta = animation_params['contrast t1']; // values from this list will be added to the contrast for each frame
      brightness_delta = animation_params['brightness t1']; // values from this list will be added to the brightness for each frame

      //applyAbstractDither(input_img); // apply and draw abstract dither effect stack

      // make gif animation
      animateAbstractDither(input_img);

      break;


    default:
      break;

  }




  // Print some info to the console

  print('Source theme: ', source_theme);
  print('Effect stack: ', effects_stack_name);

  print('Dither error distribution 1: ', rand_dither_key_1, dither_params_1);
  print('Dither error distribution 2: ', rand_dither_key_2, dither_params_2);
  print('Source image path: ', image_path);

  print('Sorting mode: ', sorting_mode);
  print('Sorting type: ', sorting_type);
  print('Sorting order: ', sorting_order);

  print('Tint palette: ', tint_palette_key);
  print('Color noise bias: ', rand_color_bias_key);

}


// This code does not use function draw() {}
