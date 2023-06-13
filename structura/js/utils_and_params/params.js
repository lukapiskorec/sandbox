//////PARAMS//////


// SETTINGS

var loading_start_time = new Date().getTime();
var min_loading_time = 1000; // this is the minimum that the loading screen will be shown, in miliseconds
var debug = true;
var cam_factor = 4; //controls the "zoom" when using orthographic camera, default was 4
var aspect_ratio = 0.75; //// 0.5625 - 16:9 aspect ratio, 0.75 - portrait (used in O B S C V R V M)
var cam_factor_mod_den = 1500;
var stage = 6; // WORKAROUND - to remove later
var steps = get_steps(stage); // WORKAROUND - to remove later
var gif_frames = 8;
var captured_frames = 0;
var this_scene = null;


// ALLELES

const cylinder_params = {
  "standard" : [0.5, 0.5, 1, 6, 1],
  "square beam" : [0.5, 0.5, 1, 4, 1], // here the side length is less than 1.0 as the first parameter is radius
  "square 1x1" : [0.7, 0.7, 1, 4, 1] // first parameter is the radius, which gives us a square with a side close to 1.0
};

const allel_light_source_type = [
  ['west', 1],
  ['east', 1],
  ['north', 1],
  ['south', 1]
];

const allel_oblique_angles = [
  [Math.PI/4, 1],
  [Math.PI/8, 1],
  [0, 2],
  [-Math.PI/8, 1],
  [-Math.PI/4, 1]
];

const allel_oblique_angles_wall = [
  [Math.PI/8, 1],
  [0, 2],
  [-Math.PI/8, 1],
];

const allel_oblique_angles_hall = [
  [Math.PI/4, 1],
  [Math.PI/8, 1],
  [0, 2],
  [-Math.PI/8, 1],
  [-Math.PI/4, 1]
];

const allel_composition_type = [
  ["detail", 10],
  ["wall", 20],
  ["hall", 20],
  ["crossing", 20],
  ["narthex", 30]
];

const allel_narthex_type = [
  ["full", 60],
  ["only edges", 20],
  ["only middle", 20]
];

const allel_stripes_wall = [
  [1, 40],
  [2, 25],
  [3, 25],
  [4, 10]
];

const allel_stripes_crossing = [
  [2, 50],
  [3, 40],
  [4, 10]
];

const allel_gap_w_factor = [
  [0, 25],
  [1, 50],
  [2, 25]
];

const allel_detail_type = [
  ["Wachsmann", 1],
  ["Fuller", 1],
  ["van der Rohe", 1]
];

// options: 1, 2, 3, 4, 5 - visible only if alternating_gu_hu_pattern or alternating_gl_hl_pattern are set to true
const allel_alternating_cross_link_pattern = [
  [1, 60], // large diagrid, standard option
  [2, 10], // zig-zag horizontal
  [3, 10], // zig-zag horizontal - opposite direction
  [4, 10], // zig-zag vertical
  [5, 10] // zig-zag vertical - opposite direction
];

const allel_cladding_placement_wall = [
  [[true, false, false, false], 35], // just upper
  [[false, true, false, false], 35], // just lower
  [[true, true, false, false], 20], // lower and upper
  [[false, false, false, false], 10] // none
];

const allel_cladding_placement_hall = [
  [[true, false, true, true], 35], // just outside
  [[false, true, false, false], 35], // just inside
  [[true, true, true, true], 20], // outside and inside
  [[false, false, false, false], 10] // none
];

// because if a lower strip is width 2, inner cladding cannot appear, so we have to tweak these probabilities a bit
const allel_cladding_placement_narthex = [
  [[true, false, true, true], 30], // just outside
  [[false, true, false, false], 30], // just inside
  [[true, true, true, true], 35], // outside and inside
  [[false, false, false, false], 5] // none
];

const allel_lower_sides_missing = [
  [[false, false, false, false], 70], // all sides present
  [[true, false, false, false], 20], // front missing
  [[false, false, true, false], 10] // back missing
];

const allel_cladding_degradation_type = [
  ["maintained", 68],
  ["weathered", 20],
  ["damaged", 10],
  ["ruined", 2]
];

const allel_deconstruction_type = [
  ["minimal", 35],
  ["moderate", 50],
  ["significant", 10],
  ["maximal", 5]
];

const allel_deconstruction_modulation = [
  [[true, true, true], 55],
  [[true, false, false], 10],
  [[false, true, false], 10],
  [[false, false, true], 10],
  [[true, true, false], 5],
  [[true, false, true], 5],
  [[false, true, true], 5]
];



// ANIMATION

const light_frame_speed_param = {
  Fast: 25, // light increment per 1/100 of a second
  Normal: 50, // light increment per 1/30 of a second
  Slow: 500, // light increment per half-second
  SuperSlow: 1000, // light increment per second
}

const light_step_size_param = {
  Paused: 0,
  DaySync: 0.000072,//2*Math.PI/86400,
  SuperSmall: 0.00025,
  Small: 0.0005,
  Medium: 0.0010,
  Large: 0.0015
}

const gif_step_param = {
  8: 8,
  16: 16,
  32: 32,
  64: 64,
  128: 128
}