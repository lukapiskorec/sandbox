/*

_____/\\\\\\\\\\\____________________________________________________________________________________________________________________        
 ___/\\\/////////\\\__________________________________________________________________________________________________________________       
  __\//\\\______\///______/\\\____________________________________________________/\\\_________________________________________________      
   ___\////\\\__________/\\\\\\\\\\\__/\\/\\\\\\\___/\\\____/\\\_____/\\\\\\\\__/\\\\\\\\\\\__/\\\____/\\\__/\\/\\\\\\\___/\\\\\\\\\____     
    ______\////\\\______\////\\\////__\/\\\/////\\\_\/\\\___\/\\\___/\\\//////__\////\\\////__\/\\\___\/\\\_\/\\\/////\\\_\////////\\\___    
     _________\////\\\______\/\\\______\/\\\___\///__\/\\\___\/\\\__/\\\____________\/\\\______\/\\\___\/\\\_\/\\\___\///____/\\\\\\\\\\__   
      __/\\\______\//\\\_____\/\\\_/\\__\/\\\_________\/\\\___\/\\\_\//\\\___________\/\\\_/\\__\/\\\___\/\\\_\/\\\__________/\\\/////\\\__  
       _\///\\\\\\\\\\\/______\//\\\\\___\/\\\_________\//\\\\\\\\\___\///\\\\\\\\____\//\\\\\___\//\\\\\\\\\__\/\\\_________\//\\\\\\\\/\\_ 
        ___\///////////_________\/////____\///___________\/////////______\////////______\/////_____\/////////___\///___________\////////\//__       


                                  S t r u c t u r a  |  o f f i c e  c a  +  { p r o t o c e l l : l a b s }  |  2 0 2 3
*/


//////GEOMETRY GENERATION//////

var gDatas = [];
var gData;

var machine_param = false;


// VIEW AND LIGHT

var light_source_type = gene_weighted_choice(allel_light_source_type); // "north", "south", "east", "west"
var zy_shear_f = gene() > 0.5 ? 1 : -1; // influences view angle - from above or below


// SPACE FRAME

var composition_type = gene_weighted_choice(allel_composition_type); // "detail", "wall", "hall", "crossing", "narthex"


// DETAIL + WALL PARAMETERS
if ((composition_type == "detail") || (composition_type == "wall")) {
  var obliqueAngle = gene_weighted_choice(allel_oblique_angles_wall); // rotation around Y axis of the scene
  
  var nr_of_stripes = gene_weighted_choice(allel_stripes_wall); // applied only with "detail", "wall" and "crossing" composition_type
  var strip_size_x = 3; // applied only with "narthex" composition_type
  var frame_scale = composition_type == "wall" ? 1.0 : 2.0; // general scale for the frame

  var frame_cell_w = 30 * frame_scale;
  var frame_cell_h = 45 * frame_scale;
  var frame_cell_d = 30 * frame_scale;

  var total_frame_size_x = generateRandomInt(4 + nr_of_stripes, 10) * 2 / frame_scale;
  var max_size_y = obliqueAngle == 0 ? 10 : 8; // if the scene is rotated, the frame height is smaller
  var total_frame_size_y = generateRandomInt(6, max_size_y) * 2 / frame_scale;

  if (nr_of_stripes == 4) {var gap_factor = 1 / frame_scale;} // for four stripes - fixed gap
  else if (nr_of_stripes == 3) {var gap_factor = gene() < 0.5 ? 0 : 0.5;} // for three stripes - smaller gaps
  else {var gap_factor = gene_weighted_choice(allel_gap_w_factor);} // for one or two stripes - larger gaps

  var gap_w = frame_cell_w * gap_factor; // applied when stripes are used

// HALL PARAMETERS
} else if (composition_type == "hall") {
  var obliqueAngle = gene_weighted_choice(allel_oblique_angles_hall); // rotation around Y axis of the scene

  var nr_of_stripes = 1; // applied only with "detail", "wall" and "crossing" composition_type
  var strip_size_x = 3; // applied only with "narthex" composition_type
  var frame_scale = 1.0; // general scale for the frame
  
  var frame_cell_w = 30;
  var frame_cell_h = 45;
  var frame_cell_d = 30;
  var gap_w = frame_cell_w;

  // setting frame size for different oblique angles
  if (obliqueAngle == 0) {
    var total_frame_size_x = generateRandomInt(4, 9) * 2; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 13 ? 5 : 8;
    var total_frame_size_y = generateRandomInt(2, max_size_y) * 2; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
  
  } else if ((Math.abs(obliqueAngle) == Math.PI/8) || (Math.abs(obliqueAngle) == Math.PI/4)) {
    var total_frame_size_x = generateRandomInt(4, 8) * 2; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 13 ? 5 : 8;
    var total_frame_size_y = generateRandomInt(2, max_size_y) * 2; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
    
    // reduce the x or y size if both dimensions are too large
    if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x == 8)) {total_frame_size_y -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x == 10)) {total_frame_size_x -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x >= 12)) {total_frame_size_x -= 4;}
  } 

// CROSSING PARAMETERS
} else if (composition_type == "crossing") {
  var obliqueAngle = gene_weighted_choice(allel_oblique_angles_hall); // rotation around Y axis of the scene

  var nr_of_stripes = gene_weighted_choice(allel_stripes_crossing); // applied only with "detail", "wall" and "crossing" composition_type
  var strip_size_x = 3; // applied only with "narthex" composition_type
  var lower_sides_missing = gene_weighted_choice(allel_lower_sides_missing); // removes frame parts from the lower sides, [front, right, back, left]
  var frame_scale = 1.0; // general scale for the frame
  
  var frame_cell_w = 30;
  var frame_cell_h = 45;
  var frame_cell_d = 30;

  var gap_factor = gene() < 0.65 ? 1 : 2;
  var gap_w = frame_cell_w * gap_factor; // applied when stripes are used
  
  // setting frame size for different oblique angles
  if (obliqueAngle == 0) {
    var total_frame_size_x = generateRandomInt(4, 9) * 2; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 13 ? 5 : 8;
    var total_frame_size_y = generateRandomInt(2, max_size_y) * 2; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
  
    // reduce the x or y size if both dimensions are too large
    if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x == 8)) {total_frame_size_y -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x == 10)) {total_frame_size_x -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x >= 12)) {total_frame_size_x -= 4;}


  } else if ((Math.abs(obliqueAngle) == Math.PI/8) || (Math.abs(obliqueAngle) == Math.PI/4)) {
    var total_frame_size_x = generateRandomInt(4, 9 - gap_factor) * 2; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 13 ? 5 : 8 - gap_factor;
    var total_frame_size_y = generateRandomInt(2, max_size_y) * 2; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
    
    // reduce the x or y size if both dimensions are too large
    if ((total_frame_size_x + total_frame_size_y > 23 - gap_factor) && (total_frame_size_x == 8)) {total_frame_size_y -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23 - gap_factor) && (total_frame_size_x == 10)) {total_frame_size_x -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23 - gap_factor) && (total_frame_size_x >= 12)) {total_frame_size_x -= 4;}
  }

// NARTHEX PARAMETERS
} else if (composition_type == "narthex") {
  var obliqueAngle = gene_weighted_choice(allel_oblique_angles_hall); // rotation around Y axis of the scene

  var nr_of_stripes = 1; // NOT USED HERE - applied only with "detail", "wall" and "crossing" composition_type
  var narthex_type = gene_weighted_choice(allel_narthex_type); // "full", "only edges", "only middle"
  var strip_size_x = gene() < 0.5 ? 2 : 3; // applied only with "narthex" composition_type
  if (narthex_type == "only middle") {strip_size_x = strip_size_x * 2;} // "only middle" has thicker stripe

  var lower_sides_missing = gene_weighted_choice(allel_lower_sides_missing); // removes frame parts from the lower sides, [front, right, back, left]
  var frame_scale = 1.0; // general scale for the frame

  var frame_cell_w = 30;
  var frame_cell_h = 45;
  var frame_cell_d = 30;
  var gap_w = frame_cell_w;

  var odd_toggle = strip_size_x % 2 == 1 ? 0 : 1; // 0 is strip_size_x is odd, 1 if strip_size_x is even

  // setting frame size for different oblique angles
  if (obliqueAngle == 0) {
    var total_frame_size_x = generateRandomInt(4, 8) * 2 + odd_toggle; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 13 ? 6 : 8;
    var total_frame_size_y = generateRandomInt(4, max_size_y) * 2 + odd_toggle; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
  
    // reduce the x or y size if both dimensions are too large
    if (total_frame_size_x + total_frame_size_y > 25) {total_frame_size_y -= 2; total_frame_size_x -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x == 8 + odd_toggle)) {total_frame_size_y -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 23) && (total_frame_size_x >= 10 + odd_toggle)) {total_frame_size_x -= 2;}
    

  } else if ((Math.abs(obliqueAngle) == Math.PI/8) || (Math.abs(obliqueAngle) == Math.PI/4)) {
    var total_frame_size_x = generateRandomInt(4, 7) * 2 + odd_toggle; // doesn't work smaller than 8 with "hall", 6, 12, 10
    var max_size_y = total_frame_size_x > 11 ? 6 : 7;
    var total_frame_size_y = generateRandomInt(4, max_size_y) * 2 + odd_toggle; // with "hall", even numbers work best, 9, 18, 23, 15
     
    if ((gene() < 0.5) && (total_frame_size_y >= 8)) {[total_frame_size_x, total_frame_size_y] = [total_frame_size_y, total_frame_size_x];} // chance that x size and y size swap values
  
    // reduce the x or y size if both dimensions are too large
    if (total_frame_size_x + total_frame_size_y > 25) {total_frame_size_y -= 2; total_frame_size_x -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 21) && (total_frame_size_x == 8 + odd_toggle)) {total_frame_size_y -= 2;}
    else if ((total_frame_size_x + total_frame_size_y > 21) && (total_frame_size_x >= 10 + odd_toggle)) {total_frame_size_x -= 2;}
  }

}


// LINKS

var detail_type = gene_weighted_choice(allel_detail_type); // "Wachsmann", "Fuller", "van der Rohe"

//                           [vert, hor,  a,    b,    c,    d,    e,    f,    g_u,  h_u,  g_l,  h_l]
var frame_links_visibility = [true, true, true, true, true, true, true, true, true, true, true, true];

if (detail_type == "Wachsmann" ) {var frame_links_thickness  = [2.0,  2.0,  1.0,  1.0,  0.5,  0.5,  0.5,  0.5,  1.0,  1.0,  1.0,  1.0];} // stronger orthogonal links
else if (detail_type == "Fuller") {var frame_links_thickness  = [1.0,  1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  1.0,  1.0,  1.0,  1.0];} // stronger diagonal links
else if (detail_type == "van der Rohe") {var frame_links_thickness  = [2.0,  2.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5];} // stronger orthogonal links, very weak diagonal links

frame_links_thickness = frame_links_thickness.map(function(val) {return val * Math.sqrt(frame_scale);}); // scale the frame links by the root of the frame scale
var links_length_reduction = [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]; // no reduction of link length

// higher chance of getting alternating patterns
var alternating_cd_ef = gene() < 0.75 ? true : false; 
var alternating_gu_hu = gene() < 0.75 ? true : false;
var alternating_gl_hl = gene() < 0.75 ? true : false;
var alternating_gu_hu_pattern = gene_weighted_choice(allel_alternating_cross_link_pattern); // options: 1, 2, 3, 4, 5 - visible only if alternating_gu_hu_pattern = true
var alternating_gl_hl_pattern = alternating_gu_hu_pattern; // options: 1, 2, 3, 4, 5 - visible only if alternating_gl_hl_pattern = true

// length at which the link will not be displayed anymore
var cutoff_vert_links = frame_cell_h * 2.0; 
var cutoff_hor_links = frame_cell_w * 2.0;
var cutoff_cdef_links = frame_cell_h * 2.0;
var cutoff_gh_links = frame_cell_h * 2.0;


// JOINTS

var joint_visibility = detail_type == "van der Rohe" ? false : true; // joint at vertical links, always true unless detail type is "van der Rohe"
var joint_length = frame_links_thickness[0]; // joint at vertical links

if (detail_type == "Wachsmann") {var joint_thickness_f = frame_links_thickness[0] * 2;} // joint at vertical links
else if (detail_type == "Fuller") {var joint_thickness_f = frame_links_thickness[0] * 4;} // joint at vertical links
else {var joint_thickness_f = frame_links_thickness[0] * 2;} // other detail types have no joints anyways

if (detail_type == "Fuller") {
  var tightener_length_reduction = 0.8; // detail in the middle of cross-links c, d, e, f, g, h
  var tightener_thickness_f = 2.0; // detail in the middle of cross-links c, d, e, f, g, h
} else {
  var tightener_length_reduction = 0.1; // detail in the middle of cross-links c, d, e, f, g, h
  var tightener_thickness_f = 2.0; // detail in the middle of cross-links c, d, e, f, g, h
}


// CLADDING

var cladding_offset = 10; // distance from the space frame
var cladding_nr = 8; // number of slats in a panel
var cladding_w = 3 * frame_scale; // slat width
var cladding_thickness = 1 * frame_scale; // slat depth
var cladding_degradation_type = gene_weighted_choice(allel_cladding_degradation_type);

if (cladding_degradation_type == "maintained") {
  var cladding_panel_prob = 1.0; // probability that a cladding panel appears
  var cladding_degradation = 0.0; // probability for missing cladding slats
} else if (cladding_degradation_type == "weathered") {
  var cladding_panel_prob = 1.0; // probability that a cladding panel appears
  var cladding_degradation = 0.1; // probability for missing cladding slats
} else if (cladding_degradation_type == "damaged") {
  var cladding_panel_prob = 0.85; // probability that a cladding panel appears
  var cladding_degradation = 0.15; // probability for missing cladding slats
} else if (cladding_degradation_type == "ruined") {
  var cladding_panel_prob = 0.35; // probability that a cladding panel appears
  var cladding_degradation = 0.2; // probability for missing cladding slats
}

var cladding_type = cladding_degradation_type; // this term will be printed in the console under Cladding ->

if ((composition_type == "detail") || (composition_type == "wall")) {var cladding_placement = gene_weighted_choice(allel_cladding_placement_wall);}
else if (composition_type == "narthex") {var cladding_placement = gene_weighted_choice(allel_cladding_placement_narthex);}
else {var cladding_placement = gene_weighted_choice(allel_cladding_placement_hall);} // "hall", "crossing" have the same rules for cladding

if (strip_size_x < 3) {cladding_placement[1] = false;} // with "narthex" and strip_size_x = 2 we cannot have inner / lower cladding

var cladding_upper = cladding_placement[0]; // turn on caldding for the upper grid
var cladding_lower = cladding_placement[1]; // turn on caldding for the lower grid
var cladding_left = cladding_placement[2]; // turn on caldding for the left side
var cladding_right = cladding_placement[3]; // turn on caldding for the right side

// if all clading positions are false, change cladding_type to "none"
if ((cladding_upper == false) && (cladding_lower == false) && (cladding_left == false) && (cladding_right == false)) {
  cladding_type = "none";
}


// NOISE - affects node displacement

var noise_shift_x = gene_range(-100, 100);
var noise_shift_y = gene_range(-100, 100);
var noise_shift_z = gene_range(-100, 100);
var noise_scale_x = 0.005;
var noise_scale_y = 0.005;
var noise_scale_z = 0.005;
var noise_component_offset = 1.0;
var deconstruction_type = gene_weighted_choice(allel_deconstruction_type);

if (deconstruction_type == "minimal") {var noise_factor = 1.0;}
else if (deconstruction_type == "moderate") {var noise_factor = 4.0;} 
else if (deconstruction_type == "significant") {var noise_factor = 8.0;}
else if (deconstruction_type == "maximal") {var noise_factor = 16.0;}

var deconstruction_modulation = gene_weighted_choice(allel_deconstruction_modulation);
var modulate_x = deconstruction_modulation[0]; // if noise is applied in x direction
var modulate_y = deconstruction_modulation[1]; // if noise is applied in y direction
var modulate_z = deconstruction_modulation[2]; // if noise is applied in z direction


// ROCK PARAMS

let booleanEdge = gene_range(5, 20);
let booleanTotal = gene_range(8, 18);

let noise = openSimplexNoise(Date.now());
let noiseFreq = gene_range(0.01, 0.09);
let noiseIter = gene_range(5, 9);

let voxOffset = [0, 2][Math.floor(gene_range(0,2))];


// COLORS

var background_lightness = 0.75; // background lightness will be set to this value (in %)
var pigments = gene_pick_key(palette_pigments); // choose pigments at random from a palette pigment list
var palette_name = gene_pick_key(palette_pigments[pigments]); // choose palette name at random from a palette pigment list
var palette = palette_pigments[pigments][palette_name].slice(0); // make a copy of the chosen color palette
shuffleArray(palette); // randomly shuffle the colors in the palette - this way we can keep the order of probabilities the same in the loop below

new THREE.Color(palette[0]).getHSL(color_target = new THREE.Color()); // copy HSL values into color_target
var color_background = new THREE.Color().setHSL(color_target.h, color_target.s / 2.0, background_lightness);
new THREE.Color(palette[1]).getHSL(color_target = new THREE.Color()); // copy HSL values into color_target
var color_amorphe = new THREE.Color().setHSL(color_target.h, color_target.s / 2.0, color_target.l);
new THREE.Color(palette[2]).getHSL(color_target = new THREE.Color()); // copy HSL values into color_target
var color_frame = new THREE.Color().setHSL(color_target.h, color_target.s, color_target.l);
new THREE.Color(palette[3]).getHSL(color_target = new THREE.Color()); // copy HSL values into color_target
var color_cladding = new THREE.Color().setHSL(color_target.h, color_target.s / 2.0, color_target.l);


// FRAME COMPOSITION

var frame_position, frame_dummy;
var frame_size_x, frame_size_y;

if ((composition_type == "detail") || (composition_type == "wall")) {

  frame_size_x = Math.floor(total_frame_size_x / nr_of_stripes) + 1;
  frame_size_y = total_frame_size_y;
  var total_width = (frame_size_x - 1) * frame_cell_w + (nr_of_stripes - 1) * gap_w;
  var x_placement;

  for (var i = 0; i < nr_of_stripes; i++) {
    if (nr_of_stripes == 1) {x_placement = 0;}
    else if (nr_of_stripes == 2) {x_placement = total_width / 2.0 - i * (total_width * 2) / nr_of_stripes;}
    else {x_placement = total_width - i * (total_width * 2) / (nr_of_stripes - 1);} //total_width - i * (total_width * 2) / (nr_of_stripes - 1);
    
    frame_position = new THREE.Vector3(x_placement, 0, 0);
    frame_dummy = new THREE.Object3D();
    frame_dummy.updateMatrix();
  
    gData = space_frame_triprism_gData(frame_position, frame_dummy);
    gDatas.push(gData);
  }

} else if (composition_type == "hall") {

  // right, left and back walls
  frame_size_y = total_frame_size_y;
  frame_size_x = total_frame_size_x + 1;
  var frame_center_offset = (total_frame_size_x) * frame_cell_w / 2;
  frame_position = new THREE.Vector3(0, 0, frame_center_offset);
  var angle_factors = [-0.5, 0.5, 1]; // quick way to iterate through the correct angles - skips zero

  for (var i = 0; i < angle_factors.length; i++) {
    frame_dummy = new THREE.Object3D();
    frame_dummy.rotateY(angle_factors[i] * Math.PI);
    frame_dummy.updateMatrix();
    gData = space_frame_triprism_gData(frame_position, frame_dummy);
    gDatas.push(gData);
  }

  // front wall - upper full part
  frame_size_y = Math.floor(total_frame_size_y / 2) + 1; // 6
  var frame_y_offset = total_frame_size_y % 2 == 0 ? -frame_cell_h / 2 : 0; // additional y offset depending on if total_frame_size_y is odd or even
  frame_position = new THREE.Vector3(0, (frame_size_y - 1) * frame_cell_h / 2 + frame_y_offset, frame_center_offset);

  frame_dummy = new THREE.Object3D();
  frame_dummy.updateMatrix();
  gData = space_frame_triprism_gData(frame_position, frame_dummy);
  gDatas.push(gData);

  // front wall - lower left and lower right half
  frame_size_y = total_frame_size_y - Math.floor(total_frame_size_y / 2); // 5
  frame_size_x =  Math.floor(total_frame_size_x / 2) - 1; // 4
  var frame_x_offset = total_frame_size_x % 2 == 0 ? 1 : 1.25; // additional x offset depending on if total_frame_size_x is odd or even
  var trans_vec_factors = [-1, 1]; // quick way to iterate through the correct translation factors - skips zero

  for (var i = 0; i < trans_vec_factors.length; i++) {
    frame_position = new THREE.Vector3(trans_vec_factors[i] * (total_frame_size_x / 4 + frame_x_offset) * frame_cell_w, -(frame_size_y - 1) * frame_cell_h / 2 + frame_y_offset, frame_center_offset);
    frame_dummy = new THREE.Object3D();
    frame_dummy.updateMatrix();
    gData = space_frame_triprism_gData(frame_position, frame_dummy);
    gDatas.push(gData);
  }

} else if (composition_type == "crossing") {

  frame_size_x = Math.floor(total_frame_size_x / nr_of_stripes) + 1;
  frame_size_y = total_frame_size_y;
  var total_width = (frame_size_x - 1) * frame_cell_w + (nr_of_stripes - 1) * gap_w;
  var frame_center_offset = (total_frame_size_x) * frame_cell_w / 2 + (nr_of_stripes - 1) * gap_w / 2 ;

  var x_placement;

  for (var n = 0; n < 4; n++) {
    // early termination rules for sides
    if (lower_sides_missing[n] == true) {continue;} // skip this side

    for (var i = 0; i < nr_of_stripes; i++) {

      if (nr_of_stripes == 1) {x_placement = 0;}
      else if (nr_of_stripes == 2) {x_placement = total_width / 2.0 - i * (total_width * 2) / nr_of_stripes;}
      else {x_placement = total_width - i * (total_width * 2) / (nr_of_stripes - 1);} //total_width - i * (total_width * 2) / (nr_of_stripes - 1);
      
      frame_position = new THREE.Vector3(x_placement, 0, frame_center_offset);
      frame_dummy = new THREE.Object3D();
      frame_dummy.rotateY(n * Math.PI/2);
      frame_dummy.updateMatrix();
    
      gData = space_frame_triprism_gData(frame_position, frame_dummy);
      gDatas.push(gData);
    }
  }

} else if (composition_type == "narthex") {
  
  // top full walls
  frame_size_x = total_frame_size_x + 1;
  frame_size_y = Math.floor(total_frame_size_y / 2) + 1; // 6
  var frame_center_offset = (total_frame_size_x) * frame_cell_w / 2;
  var frame_y_offset = total_frame_size_y % 2 == 0 ? -frame_cell_h / 2 : 0; // additional y offset depending on if total_frame_size_y is odd or even
  frame_position = new THREE.Vector3(0, (frame_size_y - 1) * frame_cell_h / 2 + frame_y_offset, frame_center_offset);

  for (var n = 0; n < 4; n++) {
    // early termination rules for sides
    if (lower_sides_missing[n] == true) {continue;} // skip this side

    frame_dummy = new THREE.Object3D();
    frame_dummy.rotateY(n * Math.PI/2);
    frame_dummy.updateMatrix();
    gData = space_frame_triprism_gData(frame_position, frame_dummy);
    gDatas.push(gData);
  }

  // lower stripes
  frame_size_x = strip_size_x;

  for (var n = 0; n < 4; n++) {
    // early termination rules for sides
    if (lower_sides_missing[n] == true) {continue;} // skip this side

    for (var i = -1; i < 2; i++) { //-1, 0, 1
      // early termination rules for stripes
      if ((i == 0) && (narthex_type == "only edges")) {continue;} // skip the middle strip
      else if ((i != 0) && (narthex_type == "only middle")) {continue;} // skip the edge strips

      x_placement = i * (total_frame_size_x / 2 - (strip_size_x - 1) / 2) * frame_cell_w;

      frame_position = new THREE.Vector3(x_placement, -(frame_size_y - 1) * frame_cell_h / 2 + frame_y_offset, frame_center_offset);
      frame_dummy = new THREE.Object3D();
      frame_dummy.rotateY(n * Math.PI/2);
      frame_dummy.updateMatrix();

      gData = space_frame_triprism_gData(frame_position, frame_dummy);
      gDatas.push(gData);
    }
  }

}


// CONSOLE LOG

var structura_logo =    "%c                                                                                               \n"
                      + "%c     S t r u c t u r a  |  o f f i c e  c a  +  { p r o t o c e l l : l a b s }  |  2 0 2 3     \n"
                      + "%c                                                                                               \n";

console.log( structura_logo,
            'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
            'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
            'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;');

var frame_description = "%cFRAME\n\n"
                        + "%cComposition -> " + composition_type
                        + "\nSize -> " + total_frame_size_x + " x " + total_frame_size_y
                        + "\nDetails -> " + detail_type
                        + "\nCladding -> " + cladding_type
                        + "\nDeconstruction -> " + deconstruction_type + "\n";

console.log( frame_description,
            "color: white; background: #000000;",
            "color: black; background: #ffffff;");

var color_description = "%cCOLOR\n\n" 
                        + "%cPigments -> " + pigments // pigments are groups of color palletes
                        + "\nPalette -> " + palette_name // palette is where the colors are stored (ordered is shuffled)
                        + "\n\nBackground ->\t%c    "
                        + "%c\nAmorphe ->   \t%c    "
                        + "%c\nFrame ->     \t%c    "
                        + "%c\nCladding ->  \t%c    "  + "\n";

console.log( color_description,
            "color: white; background: #000000;",
            "color: black; background: #ffffff;",
            `color: white; background: #${color_background.getHexString()};`,
            "color: black; background: #ffffff;",
            `color: white; background: #${color_amorphe.getHexString()};`,
            "color: black; background: #ffffff;",
            `color: white; background: #${color_frame.getHexString()};`,
            "color: black; background: #ffffff;",
            `color: white; background: #${color_cladding.getHexString()};`);

var controls_description = "%cCONTROLS\n\n"
                           + "%cLIGHT\n"
                           + "l : rotate light\n"
                           + "f : cycle light framerate\n"
                           + "t : cycle light tick\n\n"
                           + "CAPTURE\n"
                           + "g : gif capture 10 fps\n"
                           + "1-5 : image capture 1-5x\n\n"
                           + "MISC\n"
                           + "i : info\n"
                           + "b : white/black background\n"
                           + "n : cycle gif frames and rot angle\n"
                           + "<- -> : rotate camera"  + "\n";

console.log( controls_description,
            "color: white; background: #000000;",
            "color: black; background: #ffffff;")


// TOKEN FEATURES

window.$artifact = {
  features: {
    Composition : composition_type,
    Size : total_frame_size_x.toString() + " x " + total_frame_size_y.toString(),
    Details : detail_type,
    Cladding : cladding_type,
    Deconstruction : deconstruction_type,
    Pigments : pigments,
    Palette : palette_name
  }
}


// TIMING

var pre_calc = 0.000;
var viz_update = 0.00000;
var composer_pass = 0.00000;


// VIEWPORT SETUP

var viewport = document.getElementById("viewport");
var margin_left = 0;
var margin_top = 0;
var viewportHeight;
var viewportWidth;

var light_framerate_change;
var base_light_angle_step;
var light_angle;
var background_toggle = false;
var controller;

var renderer = new THREE.WebGLRenderer({antialias: false, alpha: true, preserveDrawingBuffer: true}); //antialias: true
const composer = new THREE.EffectComposer(renderer);
let snap = false;
let quality = 0;
var capturer = null;
let recording = false;

function View(viewArea) {
  if (window.innerWidth/aspect_ratio>window.innerHeight) { //If target viewport height is larger then inner height

    viewportHeight = window.innerHeight; //Force Height to be inner Height
    viewportWidth = aspect_ratio*window.innerHeight;  //Scale width proportionally

    margin_top = 0;
    margin_left = (window.innerWidth - viewportWidth)/2;
  } else {  //If target viewport width is larger then inner width

    viewportHeight = window.innerWidth/aspect_ratio; //Scale viewport height proportionally
    viewportWidth = window.innerWidth; //Force Width  to be inner Height

    margin_top = (window.innerHeight - viewportHeight)/2;
    margin_left = 0;
  }

  viewport.style.marginTop=margin_top+'px';
  viewport.style.marginLeft=margin_left+'px';
    
  
  ///SCALING

  cam_factor_mod = cam_factor * Math.min(viewportWidth/cam_factor_mod_den, viewportHeight/cam_factor_mod_den);

  renderer.setSize( viewportWidth, viewportHeight );
  renderer.shadowMap.enabled = true;
  renderer.domElement.id = 'structuracanvas';

  viewport.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  
  //oblique transform
  scene.matrixAutoUpdate = false;
  scene.matrix.makeShear(0, 0, 0, 0, 0, zy_shear_f);
  scene.updateMatrixWorld(true);

  //globalise scene to be accessible later.
  this_scene = scene;

  //cam_factor controls the "zoom" when using orthographic camera
  var camera = new THREE.OrthographicCamera( -viewportWidth/cam_factor_mod, viewportWidth/cam_factor_mod, viewportHeight/cam_factor_mod, -viewportHeight/cam_factor_mod, 0, 5000 );
  camera.position.set(0, 0, 2000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  composer.setSize(window.innerWidth, window.innerHeight)

  // change scene background to solid color
  scene.background = new THREE.Color(color_background);

  const light_color = 0xffffff;
  const amb_intensity = 0.1; //0-1, zero works great for shadows with strong contrast

  // ADD LIGHTING
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 0, 2000);
 
  light.castShadow = true;
  light.shadow.camera.near = 200;
  light.shadow.camera.far = 2000;
  light.shadow.bias = - 0.000222;

  scene.add(light);

  const amblight = new THREE.AmbientLight(light_color, amb_intensity);
  scene.add(amblight);

  this.winHeight = viewportHeight;
  this.winWidth = viewportWidth;
  this.scale = 1;
  this.scene = scene;
  this.camera = camera;
  this.composer = composer;
  this.light = light;
  this.renderer = renderer;
  this.wire = null;
  this.lines = null;
  this.meshline_data = [];
  this.meshline_mesh = [];

  this.curves = [];

  // Renders the Scene
  const renderPass = new THREE.RenderPass(this.scene, this.camera);
  this.composer.addPass(renderPass);

  //Pixel edge shader
  const effectPixelEdge = new THREE.ShaderPass( THREE.PixelEdgeShader);
  effectPixelEdge.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio * 4.0; // increased the resolution of the texture to get finer edge detection
  effectPixelEdge.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio * 4.0; // same as above
  this.composer.addPass(effectPixelEdge);

}



View.prototype.addSpaceFrame = function () {

  for (var n = 0; n < gDatas.length; n++) {
    var gData = gDatas[n];
    var dummy = new THREE.Object3D()
    var c_type = "standard";
    var geometry = new THREE.CylinderGeometry( cylinder_params[c_type][0], cylinder_params[c_type][1], cylinder_params[c_type][2], cylinder_params[c_type][3], cylinder_params[c_type][4], false ); // capped cylinder
    var material = new THREE.MeshPhongMaterial( {color: color_frame} ); //THREE.MeshBasicMaterial( {color: 0xff0000} ); THREE.MeshNormalMaterial();
    
    // LINKS
    var imesh = new THREE.InstancedMesh( geometry, material, gData.links.length )
    var axis = new THREE.Vector3(0, 1, 0);
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    for (var i = 0; i < gData.links.length; i++) {
      if (gData.links[i]['visible'] == false) {continue;} // early termination - skip this link if it is not visible
      var source_index = gData.links[i]['source'];
      var target_index = gData.links[i]['target'];
      var vector = new THREE.Vector3(gData.nodes[target_index].x-gData.nodes[source_index].x, gData.nodes[target_index].y-gData.nodes[source_index].y, gData.nodes[target_index].z-gData.nodes[source_index].z);
      dummy.scale.set(gData.links[i]['thickness'], gData.links[i]['value'], gData.links[i]['thickness']); // (1, gData.links[i]['value'], 1)
      dummy.quaternion.setFromUnitVectors(axis, vector.clone().normalize());
      dummy.position.set((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2);
      dummy.updateMatrix();
      imesh.setMatrixAt(i, dummy.matrix);
    }

    imesh.instanceMatrix.needsUpdate = true
    imesh.rotateY(obliqueAngle);
    this.scene.add(imesh);


    // JOINTS
    if (detail_type == "Wachsmann" ) {var joint_geometry = new THREE.CylinderGeometry( cylinder_params[c_type][0], cylinder_params[c_type][1], cylinder_params[c_type][2], cylinder_params[c_type][3], cylinder_params[c_type][4], false );} // capped cylinder
    else if (detail_type == "Fuller" ) {var joint_geometry = new THREE.SphereGeometry( cylinder_params[c_type][0], 6, 4 );}
    else {var joint_geometry = new THREE.CylinderGeometry( cylinder_params[c_type][0], cylinder_params[c_type][1], cylinder_params[c_type][2], cylinder_params[c_type][3], cylinder_params[c_type][4], false );} // in any other case, capped cylinder

    var imesh = new THREE.InstancedMesh( joint_geometry, material, gData.joints.length )
    var axis = new THREE.Vector3(0, 1, 0);
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    for (var i = 0; i < gData.joints.length; i++) {
      if (gData.joints[i]['visible'] == false) {continue;} // early termination - skip this joint if it is not visible
      var source_index = gData.joints[i]['source'];
      var target_index = gData.joints[i]['target'];
      var vector = new THREE.Vector3(gData.nodes[target_index].x-gData.nodes[source_index].x, gData.nodes[target_index].y-gData.nodes[source_index].y, gData.nodes[target_index].z-gData.nodes[source_index].z);
      dummy.scale.set(gData.joints[i]['thickness'], gData.joints[i]['value'], gData.joints[i]['thickness']); // (1, gData.joints[i]['value'], 1)
      dummy.quaternion.setFromUnitVectors(axis, vector.clone().normalize());
      dummy.position.set(gData.nodes[source_index].x, gData.nodes[source_index].y, gData.nodes[source_index].z);
      dummy.updateMatrix();
      imesh.setMatrixAt(i, dummy.matrix);
    }

    imesh.instanceMatrix.needsUpdate = true
    imesh.rotateY(obliqueAngle);
    this.scene.add(imesh);


    // CLADDING
    var cladding_offset_vec_upper = new THREE.Vector3(0, 0, 1);
    var cladding_offset_vec_lower = new THREE.Vector3(0, 0, -1);
    var cladding_offset_vec_left = new THREE.Vector3(-0.5, 0, 0);
    var cladding_offset_vec_right = new THREE.Vector3(0.5, 0, 0);
    var cladding_offset_vec, base_x_vec;
    var first_dim, second_dim, orientation_check;

    c_type = "square 1x1";
    var cladding_geometry = new THREE.CylinderGeometry( cylinder_params[c_type][0], cylinder_params[c_type][1], cylinder_params[c_type][2], cylinder_params[c_type][3], cylinder_params[c_type][4], false, Math.PI * 0.25 ); // capped cylinder
    var cladding_material = new THREE.MeshPhongMaterial( {color: color_cladding, flatShading: true} );
    var imesh = new THREE.InstancedMesh( cladding_geometry, cladding_material, gData.cladding.length * cladding_nr );
    var axis = new THREE.Vector3(0, 1, 0);
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    // CLADDING PANEL - repeat for every cladding panel defined between two vertical frame members
    for (var i = 0; i < gData.cladding.length; i++) {
      if (gData.cladding[i]['visible'] == false) {continue;} // early termination - skip this cladding panel if it is not visible
      var source_index_a = gData.cladding[i]['source_a'];
      var target_index_a = gData.cladding[i]['target_a'];
      var source_index_b = gData.cladding[i]['source_b'];
      var target_index_b = gData.cladding[i]['target_b'];
      var vector_a = new THREE.Vector3(gData.nodes[target_index_a].x-gData.nodes[source_index_a].x, gData.nodes[target_index_a].y-gData.nodes[source_index_a].y, gData.nodes[target_index_a].z-gData.nodes[source_index_a].z);
      var vector_b = new THREE.Vector3(gData.nodes[target_index_b].x-gData.nodes[source_index_b].x, gData.nodes[target_index_b].y-gData.nodes[source_index_b].y, gData.nodes[target_index_b].z-gData.nodes[source_index_b].z);

      // CLADDING SLAT - repeat for every cladding slat in the panel
      for (var p = 0; p < cladding_nr; p++) {
        if (gene() < cladding_degradation) {continue;} // early termination - skip this cladding slat if it is not visible
        var lerp_f = p / cladding_nr; // interpolation factor
        var vector_lerp = new THREE.Vector3().lerpVectors(vector_a, vector_b, lerp_f); // interpolate between vectors
        var cladding_length = lerp(gData.cladding[i]['value_a'], gData.cladding[i]['value_b'], lerp_f); // length interpolation

        base_x_vec = new THREE.Vector3();
        gData.cladding[i]['matrix'].extractBasis(base_x_vec, new THREE.Vector3(), new THREE.Vector3());
        orientation_check = Math.round(Math.sin(base_x_vec.angleTo(new THREE.Vector3(1, 0, 0)))); // this will be 0 for 0 and 180 deg rotation, and 1 for 90 and 270 deg rotation of the space frame

        // choose the right scaling dimension for the cladding slat based on its location and the rotation of the space frame
        if (((gData.cladding[i]['location'] == 'upper') || (gData.cladding[i]['location'] == 'lower')) && (orientation_check == 0)) { // 0 and 180 deg rotation
          first_dim = gData.cladding[i]['width'];
          second_dim = gData.cladding[i]['thickness'];

        } else if (((gData.cladding[i]['location'] == 'upper') || (gData.cladding[i]['location'] == 'lower')) && (orientation_check == 1)) { // 90 and 270 deg rotation
          first_dim = gData.cladding[i]['thickness']; 
          second_dim = gData.cladding[i]['width'];

        } else if (((gData.cladding[i]['location'] == 'left') || (gData.cladding[i]['location'] == 'right')) && (orientation_check == 0)) { // 0 and 180 deg rotation
          first_dim = gData.cladding[i]['thickness'];
          second_dim = gData.cladding[i]['width'];

        } else if (((gData.cladding[i]['location'] == 'left') || (gData.cladding[i]['location'] == 'right')) && (orientation_check == 1)) { // 90 and 270 deg rotation
          first_dim = gData.cladding[i]['width'];
          second_dim = gData.cladding[i]['thickness'];
        }

        dummy.scale.set(first_dim, cladding_length, second_dim);
        dummy.quaternion.setFromUnitVectors(axis, vector_lerp.clone().normalize());
        dummy.position.set(lerp(gData.nodes[source_index_a].x, gData.nodes[source_index_b].x, lerp_f), lerp(gData.nodes[source_index_a].y, gData.nodes[source_index_b].y, lerp_f), lerp(gData.nodes[source_index_a].z, gData.nodes[source_index_b].z, lerp_f));

        if (gData.cladding[i]['location'] == 'upper') {cladding_offset_vec = cladding_offset_vec_upper.clone().applyMatrix4(gData.cladding[i]['matrix']);}
        else if (gData.cladding[i]['location'] == 'lower') {cladding_offset_vec = cladding_offset_vec_lower.clone().applyMatrix4(gData.cladding[i]['matrix']);}
        else if (gData.cladding[i]['location'] == 'left') {cladding_offset_vec = cladding_offset_vec_left.clone().applyMatrix4(gData.cladding[i]['matrix']);}
        else if (gData.cladding[i]['location'] == 'right') {cladding_offset_vec = cladding_offset_vec_right.clone().applyMatrix4(gData.cladding[i]['matrix']);}

        dummy.translateOnAxis(cladding_offset_vec, cladding_offset); // offseting the cladding from the surface
        dummy.translateOnAxis(vector_lerp.clone().normalize(), vector_lerp.length() / 2.0); // weird offset I had to introduce to make the cladding be there where it should
        dummy.rotateY((gene() - 0.5) * 1.0); // random jitter around member's axis

        dummy.updateMatrix();
        imesh.setMatrixAt(i * cladding_nr + p, dummy.matrix);
      }

    }

    imesh.instanceMatrix.needsUpdate = true
    imesh.rotateY(obliqueAngle);
    this.scene.add(imesh);

  }
}



View.prototype.addRock = function () {

  //custom material shader for voxels

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.1 );
  directionalLight.position.set( -0.5, 1, -0.5 ).normalize();

  let testVertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;

  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vUv = uv;
    vPos = vec4(projectionMatrix * instanceMatrix * vec4(position, 1.0)).rgb;
    vNormal = normal;
  }`
  let testFragmentShader = `
  uniform vec3 lightDirection;
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;

  //simple noise
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
  
  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);
  
      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);
  
      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);
  
      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));
  
      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  
      return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                          _radius+(_radius*0.01),
                          dot(dist,dist)*4.0);
  }

  float line(in vec2 p, in vec2 a, in vec2 b) {
    vec2 ba = b - a;
    vec2 pa = p - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
    return length(pa - h * ba);
  }
  
  void main() {
      vec3 norm = normalize(vNormal);
      float nDotL = clamp(dot(lightDirection, norm), 0.0, 0.1);
      float strength = step(nDotL, max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));
      vec3 col = vec3(${normCol(color_amorphe)})*vec3(noise(vPos*4.0)*0.9+0.9);
      gl_FragColor = vec4(col/vec3(line(vUv, vec2(-1.0, 0.0), vec2(0.0,1.0))+strength*2.0), 1.0);//circle(vUv, 0.05+strength)
  }`

  const outlineMat = new THREE.ShaderMaterial({
    uniforms: {
          lightDirection: { value: directionalLight.position.normalize() }
        },
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      side: THREE.DoubleSide
    });
  
  const voxelSize = 5;
  const voxel = new THREE.BoxGeometry( voxelSize, voxelSize, voxelSize );
  const voxMat = new THREE.Matrix4();
  const rock = new THREE.InstancedMesh( voxel, outlineMat, 1000000 );

  //array of random values for boolean locations
  let rands = [];
  for (let i = 0; i < 150; i++) {
    rands.push(map(gene(), 0, 1, -50, 50)*1);
  }

  //draw voxels
  for ( let i = 0; i < 100; i ++ ) {
    for (let j = 0; j < 100; j++ ) {
      for(let k = 0; k < 100; k++ ) {
        let idx = (j * 100 + i) * 100 + k;

        let p = [i-50+voxOffset*gene_range(-1,1), j-50+voxOffset*gene_range(-1,1), k-50+voxOffset*gene_range(-1,1)];
        let d = sdf(p, rands);
        if (d < -0.01) {
          let voxPos = new THREE.Vector3(p[0]*voxelSize, p[1]*voxelSize, p[2]*voxelSize);
          voxMat.setPosition(voxPos.x, voxPos.y, voxPos.z);
          rock.setMatrixAt(idx, voxMat);
        }
      }
    }
  }
  rock.rotateY(Math.PI/4);
  rock.rotateX(Math.PI/4);
  this.scene.add(rock);
}



View.prototype.render = function () {


    this.composer.render();
    //this.renderer.clear();
    
    requestAnimationFrame(this.render.bind(this));

    // On each transform change:
    /*
    this.scene.rotateY(Math.PI/4);  //Math.PI/4
    var rotScaleTranslation = new THREE.Matrix4();
    rotScaleTranslation.compose( this.scene.position, this.scene.quaternion, this.scene.scale );
    this.scene.updateMatrix();
    this.scene.matrix.makeShear(0, 0, 0, 0, 0, zy_shear_f).multiply( rotScaleTranslation )
    this.scene.updateMatrixWorld(true);*/


    if (debug){
      var start_timer = new Date().getTime();
    }

    if (debug){
      var end_timer = new Date().getTime();
      composer_pass = end_timer - start_timer
    }
    if(snap) {
      //console.log(controller)
      capture(controller);
      snap = false;
    }
    if(recording) {
      // On each transform change:
      this.scene.rotateY(2*Math.PI/gif_frames);  //Math.PI/4
      var rotScaleTranslation = new THREE.Matrix4();
      rotScaleTranslation.compose( this.scene.position, this.scene.quaternion, this.scene.scale );
      this.scene.updateMatrix();
      this.scene.matrix.makeShear(0, 0, 0, 0, 0, zy_shear_f).multiply( rotScaleTranslation )
      this.scene.updateMatrixWorld(true);
      capturer.capture( renderer.domElement );
      captured_frames++;
    }
    if (recording & (captured_frames == gif_frames)) {
      recording = !recording;
      capturer.stop();
      if (machine_param) {
        verse_capture_thumbnail_stop();
      } else {
        capturer_custom_save();
      }
      
      captured_frames = 0;
    }
    //this.renderer.render(this.scene, this.camera); // When no layers are used

};

function Controller(viewArea) {
  var view = new View(viewArea);
  view.cam_distance = 700 //1000 for ortho
  this.view = view; //referenced outside

  var ticker = 0;
  var sigmoid_ticker = 0;
  var ticker_set = [];

  for (var i = 0; i < stage; i++) {
    ticker_set.push(0);
  }

  const parallex_amplitude = view.cam_distance;
  const parallex_delay = 5000;
  const parallex_framerate = 200; //33ms for 30fps and 15fps for 60fps
  const parallex_step = 0.5*Math.PI/parallex_framerate; //0.5*Math.PI/parallex_framerate
  const stopping_angle = Math.PI/2 //Change to desired sector angle IMPORTANT: Must fit in 2Pi with no remainder to get alignment every period

  //Sigmoid Function for motion
  const sigmoid_amplitude = 0.05 //0.113; //Best range to work from -Pi ti Pi

  const mid_sector = stopping_angle/2;
  var current_stage = 0
  var current_dir = 1

  const up = new THREE.Vector3(0,1,0)

  // LIGHT TRAVEL PARAMETERS
  var light_framerate = 50;
  light_framerate_change = 50; // needs to be the same as above
  var base_light_angle = Math.PI/3; // starting angle, angle 0 is straight behind the camera
  base_light_angle_step = 0.0000; // zero makes the light not travel, before 0.0005 - obscvrvm
  var light_angle_step;

  if (light_source_type == 'west') {
    light_angle = -base_light_angle;
    light_angle_step = base_light_angle_step;
  } else if (light_source_type == 'east') {
    light_angle = base_light_angle;
    light_angle_step = -base_light_angle_step;
  } else if (light_source_type == 'north') {
    light_angle = base_light_angle;
    light_angle_step = -base_light_angle_step;
  } else if (light_source_type == 'south') {
    light_angle = -base_light_angle;
    light_angle_step = base_light_angle_step;
  }


  // LIGHT TRAVEL LOGIC
  var arc_division = 1.0;
  const lp = view.light.position;
  function update_light_position () {
    light_angle += light_angle_step*arc_division;

    if ((light_source_type == 'west') || (light_source_type == 'east')) {
      // rotation in XY plane
      view.light.position.set(Math.sin(light_angle)*parallex_amplitude, lp.y, Math.cos(light_angle)*parallex_amplitude); //1000,1000,1000
    } else if ((light_source_type == 'north') || (light_source_type == 'south')) {
    // rotation in YZ plane
    view.light.position.set(lp.x, Math.sin(light_angle)*parallex_amplitude, Math.cos(light_angle)*parallex_amplitude);
    }
  }
 
  var lightIntervalInstance = setInterval(function () {update_light_position()}, light_framerate);

  setTimeout(function ()  {
    setInterval(function () {
      start_timer = new Date().getTime()

      if (base_light_angle_step != Math.abs(light_angle_step)) { //if step changed update step
        //console.log(base_light_angle_step, Math.abs(light_angle_step));
        if (getKeyByValue(light_step_size_param, base_light_angle_step) == "DaySync") { //light_step_size_param.DaySync
          arc_division = base_light_angle_step*1000/light_framerate;
          //console.log("Arc Division Factor: " + arc_division.toString())
          if (light_angle_step == 0) {
            light_angle_step = base_light_angle_step;
          } else {
            light_angle_step = Math.sign(light_angle_step)*base_light_angle_step;
          }
          
          //console.log("After", Math.sign(light_angle_step) ,base_light_angle_step)
        } else {
          arc_division = 1.0;
          if (light_angle_step == 0) {
            light_angle_step = base_light_angle_step;
          } else {
            light_angle_step = Math.sign(light_angle_step)*base_light_angle_step;//use new amplitude with same sign, avoids another if statement
          }
        }
      }

      if (light_framerate != light_framerate_change) {
        clearInterval(lightIntervalInstance); //remove previous interval
        if (getKeyByValue(light_step_size_param, Math.abs(light_angle_step)) == "DaySync") { //light_step_size_param.DaySync
          arc_division = Math.abs(light_angle_step)*1000/light_framerate;
          console.log("Arc Division Factor: " + arc_division.toString())
        
        } else { arc_division = 1.0; }//Update light step as well if framerate is changed and
        light_framerate = light_framerate_change;
        lightIntervalInstance = setInterval(function () {update_light_position()}, light_framerate); //create new interval with updated framerate
      }

    
      if (debug) {
        var end_timer = new Date().getTime();
        pre_calc = (end_timer - start_timer);
      }

      if (debug) {
        end_timer = new Date().getTime();
        viz_update =  (end_timer - start_timer - pre_calc);
      }

      ticker += parallex_step; //parallex_step;

      for (var i = 0; i < stage; i++) {
        ticker_set[i] += steps[i];
      }

    }, parallex_framerate);
  }, parallex_delay)


  // ADDING GEOMETRY TO THE SCENE

  view.addSpaceFrame();
  view.addRock();
  view.render();


  // remove loading screen once the app is loaded to this point and min_loading_time has elapsed
  var loading_end_time = new Date().getTime();
  var loading_time = loading_end_time - loading_start_time;
  if (loading_time > min_loading_time) {
    for (i = 0; i < 21; i++) {
      let k = i; // we need to do this because: https://codehandbook.org/understanding-settimeout-inside-for-loop-in-javascript/
      setTimeout(function () {document.querySelector("#loading").style.opacity = 1.00 - k * 0.05;}, 100 * k);
    }
    setTimeout(function () {document.querySelector("#loading").style.display = "none";}, 2000);
  } else {
    for (i = 0; i < 21; i++) {
      let k = i; // we need to do this because: https://codehandbook.org/understanding-settimeout-inside-for-loop-in-javascript/
      setTimeout(function () {document.querySelector("#loading").style.opacity = 1.00 - k * 0.05;}, min_loading_time - loading_time + 100 * k);
    }
    setTimeout(function () {document.querySelector("#loading").style.display = "none";}, min_loading_time - loading_time + 2000);
  }
  
  // trigger preview capture on complete render
  setTimeout(function () {capturePreview();}, min_loading_time+3000);

  function onWindowResize() {
    //console.log("resize")
    viewportAdjust(document.getElementById('viewport'), false);
    fitCameraToViewport(view, viewportWidth, viewportHeight);
    }
  
    window.addEventListener( 'resize', onWindowResize );
}

function structura () {
  controller = new Controller('viewport');
}


function viewportAdjust(vp, inner=true) {
  /// ADJUST SIZE AND MARGIN

  if (inner) {
    if (window.innerWidth/aspect_ratio>window.innerHeight) { //If target viewport height is larger then inner height

      viewportHeight = window.innerHeight; //Force Height to be inner Height
      viewportWidth = aspect_ratio*window.innerHeight;  //Scale width proportionally
  
      margin_top = 0;
      margin_left = (window.innerWidth - viewportWidth)/2;
    } else {  //If target viewport width is larger then inner width
  
      viewportHeight = window.innerWidth/aspect_ratio; //Scale viewport height proportionally
      viewportWidth = window.innerWidth; //Force Width  to be inner Height
  
      margin_top = (window.innerHeight - viewportHeight)/2;
      margin_left = 0;
    }

    /// SCALING

    cam_factor_mod = cam_factor * Math.min((viewportWidth/cam_factor_mod_den)*quality, (viewportHeight/cam_factor_mod_den)*quality);
    
  } else {
    if (window.innerWidth/aspect_ratio>window.innerHeight) { //If target viewport height is larger then inner height
      
      //document.documentElement.scrollWidth/scrollHeight
      viewportHeight = window.innerHeight; //Force Height to be inner Height
      viewportWidth = aspect_ratio*window.innerHeight;  //Scale width proportionally
  
      margin_top = 0;
      margin_left = (window.innerWidth - viewportWidth)/2;
    } else {  //If target viewport width is larger then inner width
  
      viewportHeight = window.innerWidth/aspect_ratio; //Scale viewport height proportionally
      viewportWidth = window.innerWidth; //Force Width  to be inner Height
  
      margin_top = (window.innerHeight - viewportHeight)/2;
      margin_left = 0;
    }

    /// SCALING

    cam_factor_mod = cam_factor * Math.min(viewportWidth/cam_factor_mod_den, viewportHeight/cam_factor_mod_den);
  }
  vp.style.marginTop=margin_top+'px';
  vp.style.marginLeft=margin_left+'px';

}

function fitCameraToViewport(view_instance, w,h, adjust=true) {
  view_instance.renderer.setSize(w, h);
  view_instance.composer.setSize(w, h);
  if (adjust) {
    view_instance.camera.left = -w / cam_factor_mod;
    view_instance.camera.right = w / cam_factor_mod;
    view_instance.camera.top = h / cam_factor_mod;
    view_instance.camera.bottom = -h / cam_factor_mod;
  }

  view_instance.camera.updateProjectionMatrix();
}


function capturer_custom_save() {
  setTimeout(() => {
    capturer.save(function( blob ) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Structura_${palette_name.replace(/\s+/g, '')}_${Math.floor(viewportWidth)}x${Math.floor(viewportHeight)}pix_${gif_frames}frames_${parseInt(Math.random()*10000000)}.gif`; // ${gif_frames}frames
      a.click();
      URL.revokeObjectURL(url);
      });
      setTimeout(() => {
        capturer = null; // set capturer back to null after download
      }, 250);
    }, 0);
}


function verse_capture_thumbnail_start(){
    //settings for thumbnail 
    gif_frames = 16

    //Start capturer
    recording = !recording;
    if(recording){
      //new capturer instance
      capturer = new CCapture( {
        verbose: false,
        display: false,
        quality: 99,
        framerate: 10, // gif_framerate
        format: 'gif',
        workersPath: 'js/capture/src/'
      } );
    capturer.start();
    }
}

function verse_capture_thumbnail_stop(){

  //End capturer //save and create blob by saving
  setTimeout(() => {
    capturer.save(function( blob ) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        window.$artifact.preview = reader.result;
        dispatchEvent(new Event("capture-preview"));
      };
    });
      //setTimeout(() => {
      //  capturer = null; // set capturer back to null after download
      //}, 250);
    }, 0);
}

try {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  machine_param = urlParams.get('machine');
  if (machine_param) {
    verse_capture_thumbnail_start()
  }
} catch (error) {
  
}


function check_drawing_buffer(q) {
  const max_side = 5500; // looks like the max buffer for Chrome on desktop is 5760, so we take a bit lower to be safe
  var taget_size = q*Math.max(viewportWidth, viewportHeight);
  if (taget_size > max_side) {
    var reduced_quality = q*max_side/taget_size;
    console.log("Browser drawing buffer exceed. Reverting to the following quality multiplier: " + reduced_quality.toFixed(2).toString());
    return reduced_quality;
  } else {
    return q
  }
}

// define a handler
function doc_keyUp(e) {
  // Example double key use: e.ctrlKey && e.key === 'ArrowDown'
  // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
  if (e.keyCode === 49 || e.keyCode === 97) { // 1 or NumPad 1   
    snap = true;
    quality = 1;
  } else if (e.keyCode === 50 || e.keyCode === 98) {// 2 or NumPad 2
    snap = true;
    quality = check_drawing_buffer(2);
  } else if (e.keyCode === 51 || e.keyCode === 99) {// 3 or NumPad 3
    snap = true;
    quality = check_drawing_buffer(3);
  } else if (e.keyCode === 52 || e.keyCode === 100) { // 4 or NumPad 4
    snap = true;
    quality = check_drawing_buffer(4);
  } else if (e.keyCode === 53 || e.keyCode === 101) { // 5 or NumPad 5
    snap = true;
    quality = check_drawing_buffer(5);
    
  } else if (e.keyCode === 78 ) { // n number of gif frames
    gif_frames = findNextValueByValue(gif_frames, gif_step_param);
    console.log("gif frames per revolution changed to: " + getKeyByValue(gif_step_param, gif_frames) + "\nrotation angle changed to: " + Math.round(radToDeg(2*Math.PI/gif_frames)) + " deg");
  } else if (e.keyCode === 71 ) {  //"g" = Gif
    recording = !recording;
    if(recording){
      //new capturer instance
      capturer = new CCapture( {
        verbose: false,
        display: false,
        quality: 99,
        //name: variant_name,
        framerate: 10, // gif_framerate
        //autoSaveTime:, //does not work for gif
        //timeLimit: 4000,
        format: 'gif',
        workersPath: 'js/capture/src/'
      } );
      capturer.start();
      /*setTimeout(() => {
        if (capturer != null) {
          capturer.stop();
          capturer_custom_save();
        }
      },4000)*/ //If capturer is not stopped manually save after 4 sectonds
    }
    else if (capturer != null) { //If capturer in ongoing and button press the "g" button again
      capturer.stop();
      capturer_custom_save();
      captured_frames = 0;
    }
  } else if (e.keyCode === 70 ) {  //"f" = increment light travel framerate
    light_framerate_change = findNextValueByValue(light_framerate_change, light_frame_speed_param);
    console.log("light framerate changed to: " + getKeyByValue(light_frame_speed_param, light_framerate_change));
  } else if (e.keyCode === 84 ) {  //"t" = increase travel speed
    base_light_angle_step = findNextValueByValue(base_light_angle_step, light_step_size_param)
    console.log("light angle step changed to: " + getKeyByValue(light_step_size_param, base_light_angle_step));
  } else if (e.keyCode === 76 ) {  //"l" = jump light angle by 30 degrees
    light_angle += Math.PI/6; //advance light angle by 30 deg
    console.log("light rotated 30 degrees");
  } else if (e.keyCode === 37 ) { //arrow left - rotate camera
    this_scene.rotateY(-2*Math.PI/gif_frames);  
    var rotScaleTranslation = new THREE.Matrix4();
    rotScaleTranslation.compose( this_scene.position, this_scene.quaternion, this_scene.scale );
    this_scene.updateMatrix();
    this_scene.matrix.makeShear(0, 0, 0, 0, 0, zy_shear_f).multiply( rotScaleTranslation )
    this_scene.updateMatrixWorld(true);
  } else if (e.keyCode === 39 ) { //arrow right - rotate camera, before e.keyCode === 65, "a" = jump angle by one step 
    this_scene.rotateY(2*Math.PI/gif_frames);  
    var rotScaleTranslation = new THREE.Matrix4();
    rotScaleTranslation.compose( this_scene.position, this_scene.quaternion, this_scene.scale );
    this_scene.updateMatrix();
    this_scene.matrix.makeShear(0, 0, 0, 0, 0, zy_shear_f).multiply( rotScaleTranslation )
    this_scene.updateMatrixWorld(true);
  } else if (e.keyCode === 66 ) {  //"b" = flip background from black to white
    background_toggle = !background_toggle;
    if (background_toggle) {
      document.body.style.backgroundColor = "black";
      console.log("page background set to black");
    } else {
      document.body.style.backgroundColor = "white";
      console.log("page background set to white");
    }
    
  } 
  else if (e.keyCode === 73 && !e.ctrlKey) {  //i and not ctrl
    document.getElementById("keybinding").style.display = "block";
    document.querySelector("#keybinding").style.opacity = 1
    //Load modal with decription for all the keys for few 
    //seconds and make it fade to invisible after a few seconds. 
    //Each additional non active key press restarts the fade out animation
    if (typeof fade !== 'undefined') {
      clearInterval(fade)
      };
    var fade;
    setTimeout(function() {
      fade = setInterval(function () {
        document.querySelector("#keybinding").style.opacity -= 0.025;
        if (document.querySelector("#keybinding").style.opacity <= 0 ) {
          document.querySelector("#keybinding").style.display = "none";
          clearInterval(fade)
        }
      }, 100);
    },3000);
  }
}

const handler = (e) => {
    structura();
};

const capture = (contx) => {
  /// DOCSIZE
  document.documentElement.scrollWidth = viewportWidth*quality;
  document.documentElement.scrollHeight = viewportHeight*quality;
  /// SCALING
  cam_factor_mod = cam_factor * Math.min(viewportWidth*quality/cam_factor_mod_den, viewportHeight*quality/cam_factor_mod_den);
  /// SetMargin to 0
  document.getElementById('viewport').style.marginTop=0 +'px';
  document.getElementById('viewport').style.marginLeft=0 +'px';
  fitCameraToViewport(contx.view, viewportWidth*quality, viewportHeight*quality, true); //Projection Matrix Updated here

  composer.render();

  try {
    const urlBase64 = renderer.domElement.toDataURL('img/png'); 
    const a = document.createElement("a");
    a.href = urlBase64;
    a.download = `Structura_${palette_name.replace(/\s+/g, '')}_${parseInt(Math.random()*10000000)}.png`;
    a.click();
    URL.revokeObjectURL(urlBase64);
  }
  catch(e) {
    console.log("Browser does not support taking screenshot of 3d context");
    return;
  }
  // Set to standard quality
  quality = 1;

  viewportAdjust(document.getElementById('viewport'))
  cam_factor_mod = cam_factor * Math.min(viewportWidth*quality/cam_factor_mod_den, viewportHeight*quality/cam_factor_mod_den);
  
  fitCameraToViewport(contx.view, viewportWidth, viewportHeight); //Projection Matrix Updated
  
  composer.render();
};

// register the capture key handler 
document.addEventListener('keyup', doc_keyUp, false);

document.addEventListener('DOMContentLoaded', () => {
  handler();
});