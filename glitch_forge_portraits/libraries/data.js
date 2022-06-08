// Collection of json files for storing parameters and asset data
// by @LukaPiskorec


// Floyd-Steinberg dithering parameters
const dither_params_json = {
  'standard' : [0.4375, 0.1875, 0.3125, 0.0625], // [7/16.0, 3/16.0, 5/16.0, 1/16.0]
  'right only' : [1.0, 0.0, 0.0, 0.0],
  'down only' : [0.0, 0.0, 1.0, 0.0],
  'down-right only' : [0.0, 0.0, 0.0, 1.0],
  'down-left only' : [0.0, 1.0, 0.0, 0.0],
  'right down only' : [0.5, 0.0, 0.5, 0.0],
  'down-left down-right only' : [0.0, 0.5, 0.0, 0.5],
  'right down-left only' : [0.5, 0.5, 0.0, 0.0],
  'down down-right only' : [0.0, 0.0, 0.5, 0.5],
  'right down-right only' : [0.5, 0.0, 0.0, 0.5],

};


// Floyd-Steinberg dithering parameters
const extreme_dither_params_json = {
  'straight horizontal' : [-0.5, 0.25, 0.5, 0.0],
  'diagonal grained' : [-0.5, 0.0, -1.0, 1.0],
  'broken horizontal' : [-0.5, 1.25, 1.25, 0.0],
  'solid drip' : [-0.5, 0.5, -0.75, -0.5],
  'wiggly diagonal' : [1.0, -0.75, 0.25, 0.5],
  'blocky' : [-0.75, 0.25, -0.75, -0.75],
  'solid parallelogram' : [-0.25, -0.25, 0.25, 0.0],
  'drippy solid parallelogram' : [-0.5, 0.5, 0.0, -0.5],
  'dashed horizontal' : [-0.75, 0.5, 0.5, 0.5],
  'dense diagonal' : [0.5, -0.5, 1.0, -0.5],
  'grained noise' : [-1.0, -1.0, -1.0, 1.0],
  'noisy solid' : [-0.5, 0.5, -0.75, -0.5],
  'noisy patterned' : [-1.0, 0.5, -0.5, 0.5],
  'drippy solid' : [0.25, -0.25, -0.75, 0.25],
  'blurred solid' : [-1.0, -0.25, -0.25, -0.25],
  'melting solid' : [0.25, 0.75, -0.5, -0.75],
  'hairy diagonal' : [-1.0, 1.0, 0.75, -0.75],
  'hairy patterned' : [0.5, -1.0, 0.0, 1.0],
  'rainy' : [-1.0, 0.5, -0.5, 0.25],

};


// three-bit color palettes used for tinting
const three_bit_palette = {
  'red' : [255, 0, 0],
  'green' : [0, 255, 0],
  'blue' : [0, 0, 255],
  'magenta' : [255, 0, 255],
  'cyan' : [0, 255, 255],

};


// three-bit color palettes used for tinting
const three_bit_palette_reduced = {
  'red' : [255, 0, 0],
  'green' : [0, 255, 0],
  'blue' : [0, 0, 255],
  'white' : [255, 255, 255],

};


// color palettes used for color noise bias during pixel sorting
const color_bias_palette = {
  'red' : [1, 0, 0],
  'blue' : [0, 0, 1],
  'magenta' : [1, 0, 1],
  'red skewed blue' : [0.5, 0, 1],
  'blue skewed red' : [1, 0, 0.5],
  'cyan' : [0, 1, 1],
  'green skewed blue' : [0, 0.5, 1],
  'blue skewed green' : [0, 1, 0.5],

};


// parameters for changing effect stack values between different animation frames (5 frames total)
const animation_params = {
  'contrast t0' : [0.01, 0.01, 0.01, 0.01],
  'brightness t0' : [0.005, 0.005, 0.005, 0.005],
  'contrast t1' : [0.02, 0.02, -0.03, 0.02],
  'brightness t1' : [0.01, 0.01, -0.015, 0.01],

};
