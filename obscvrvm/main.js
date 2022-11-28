/*

     ██████╗  ██████╗  ███████╗  ██████╗ ██╗   ██╗ ██████╗  ██╗   ██╗ ███╗   ███╗
    ██╔═══██╗ ██╔══██╗ ██╔════╝ ██╔════╝ ██║   ██║ ██╔══██╗ ██║   ██║ ████╗ ████║
    ██║   ██║ ██████╔╝ ███████╗ ██║      ██║   ██║ ██████╔╝ ██║   ██║ ██╔████╔██║
    ██║   ██║ ██╔══██╗ ╚════██║ ██║      ╚██╗ ██╔╝ ██╔══██╗ ╚██╗ ██╔╝ ██║╚██╔╝██║
    ╚██████╔╝ ██████╔╝ ███████║ ╚██████╗  ╚████╔╝  ██║  ██║  ╚████╔╝  ██║ ╚═╝ ██║
     ╚═════╝  ╚═════╝  ╚══════╝  ╚═════╝   ╚═══╝   ╚═╝  ╚═╝   ╚═══╝   ╚═╝     ╚═╝
                                            
     
          O B S C V R V M  |  { p r o t o c e l l : l a b s }  |  2 0 2 2
*/



//////LATTICE GENERATION//////

var gDatas = [];
var lattice_params, gData;
var composition_params;

// COMPOSITION - generate parameters for the composition of the piece
composition_params = generate_composition_params(); // all input parameters are optional, they will be chosen at random if not passed into the function

var { aspect_ratio, frame_type, center_piece_type, explosion_type, light_source_type, explosion_center_a, explosion_center_b, celestial_object_types } = composition_params; // unpacking parameters we need in main.js and turning them into globals
//explosion_type = 0; ////OVERRIDE////
//center_piece_type = 'none'; ////OVERRIDE////
//frame_type = 'narrow'; ////OVERRIDE////
//celestial_object_types = ['none']; ////OVERRIDE//// 'none', 'comet', 'eclipse', 'ultra eclipse', 'moon', 'planet', 'orbit', 'meteor shower', 'quasar', 'nova', 'rapture', 'nebula'
  

// LATTICE 1 - FRAME, plane primitive, full size
if (frame_type == 'narrow') {
  lattice_params = generate_frame_params(6, 'narrow'); // all input parameters are optional, they will be chosen at random if not passed into the function
  gData = generate_lattice(lattice_params);
  gDatas.push(gData);

} else if (frame_type == 'dominating') {
  lattice_params = generate_frame_params(4, 'extra_narrow');
  gData = generate_lattice(lattice_params);
  gDatas.push(gData);
  lattice_params = generate_frame_params(6, 'dominating');
  gData = generate_lattice(lattice_params);
  gDatas.push(gData);

} else if (frame_type == 'none') {
  // in this case we are not drawing a frame at all
}


// LATTICE 2 - CENTER, random primitive, smaller size
if (center_piece_type != 'none') {
  lattice_params = generate_lattice_params(center_piece_type); // all input parameters are optional, they will be chosen at random if not passed into the function
  lattice_params['start_bounds'] = lattice_params['start_bounds'] / 2;
  gData = generate_lattice(lattice_params);
  gDatas.push(gData);

  // generate another triangle with same parameters but rotated 180 degrees
  if (center_piece_type == 'double_triangle') {
    lattice_params['start_rot'] = lattice_params['start_rot'] == -30 ? 150 : -30;
    gData = generate_lattice(lattice_params);
    gDatas.push(gData);
  }

} else if (center_piece_type == 'none') {
  // in this case we are not drawing a center piece at all
}


var nDatas = [];
var nData;

// LATTICE 3 - STARS, ordered, triangles
lattice_params = generate_lattice_params('plane', 6); // all input parameters are optional, they will be chosen at random if not passed into the function
nData = generate_lattice(lattice_params);
nDatas.push(nData);


var { stage, transformation_index, steps } = lattice_params; // WORKAROUND FOR NOW - all the params we need in main.js to make it run, but in the end we will have multiple lattices with multiple params


//////FXHASH FEATURES//////

// window.$fxhashFeatures = {
// "Primitive": primitive,
// "Stage": stage,
// "Order": order_type,
// };



/* function Features(){
  this.paper = paper;
  this.ink = ink;
  //this.line_style = line_style;
  //this.dash_speed_type = dash_speed_type;
  this.primitive = primitive;
  this.stage = stage;
  this.transformation = transformation_type;
  //this.ring_type = ring_type;
}

function Settings(){
  this.camera_control = true
  this.timer_debug = debug
  this.triangulate_mesh = triangulate;
  this.dashRatio = 'custom function';
  this.dashArray;
  this.dashSpeed;
  this.lineWidth;
  this.double_sided = double_sided;
  this.start_rot = start_rot;
  this.sub_rules = sub_rules.map(x=>['PYR', 'TAP'][x]).join();
  this.extrude_face = extrude_face.map(x=>x.toFixed(2).toString()).join();
  this.contract_middle = contract_middle.map(x=>x.toFixed(2).toString()).join();
  this.leave_middle = leave_middle.map(x=>x.toString()).join();

  //this.texture = texture;
  //this.color_mode = color_mode;
  //this.background = background;
  this.flip_dash = flip_dash;
}


function Stats(){
  this.node_count = gData.nodes.length;
  this.connection_count = gData.links.length;
  this.meshface_count = gData.mesh.length;
} */


//////CONSOLE LOG//////

var obscvrvm_logo =         "%c                                                                         \n"
                          + "%c     O B S C V R V M  |  { p r o t o c e l l : l a b s }  |  2 0 2 2     \n"
                          + "%c                                                                         \n";

console.log(            obscvrvm_logo,
                        'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
                        'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
                        'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;');


//console.log('%c {protocell:labs}, 2022', 'color: black; font-weight: bold;');

/* console.log('%c Features', 'color: orange; font-weight: bold');
my_features = new Features()
console.table(my_features);

console.log('%c Settings', 'color: orange; font-weight: bold');
my_settings = new Settings()
console.table(my_settings);

console.log('%c Stats', 'color: orange; font-weight: bold');
my_stats = new Stats()
console.table(my_stats); */

//////END CONSOLE LOG//////

var pre_calc = 0.000;
var viz_update = 0.00000;
var composer_pass = 0.00000;

///VIEWPORT SETUP///

var viewport = document.getElementById("viewport");
var margin_left = 0;
var margin_top = 0;
var viewportHeight;
var viewportWidth;


var light_framerate_change;
var base_light_angle_step;
var light_angle;

var controller;

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
const composer = new THREE.EffectComposer( renderer );
let snap = false;
let quality = 0;
var capturer = null;
let recording = false;

const elem = document.getElementById('hyprornament');

function View(viewArea) {
  if (debug){
    console.time("view initialisation")
  }




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
  cam_factor_mod = cam_factor * Math.min(viewportWidth/1000, viewportHeight/1000);

  console.log(cam_factor_mod)

//window.innerHeight//document.getElementById(viewArea).offsetHeight;
//document.getElementById(viewArea).offsetWidth;

  //renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  //renderer.shadowMap.enabled = true;
  renderer.setSize( viewportWidth, viewportHeight );
  renderer.shadowMap.enabled = true;
  //renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  renderer.setPixelRatio(window.devicePixelRatio);
  //renderer.autoClear = false;
  //renderer.setClearColor(0x101000);
  viewport.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  //var camera = new THREE.PerspectiveCamera( 75, viewportWidth / viewportHeight, 0.1, 10000 );
  //camera.position.set(0,0, 100);


  //cam_factor controls the "zoom" when using orthographic camera
  var camera = new THREE.OrthographicCamera( -viewportWidth/cam_factor_mod, viewportWidth/cam_factor_mod, viewportHeight/cam_factor_mod, -viewportHeight/cam_factor_mod, 0, 5000 );
  camera.position.set(0, 0, 2000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

/*   if (my_settings.camera_control) {
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
  } */
  //var controls = new THREE.OrbitControls(camera, renderer.domElement);


  //composer = new THREE.EffectComposer( renderer );
  composer.setSize(window.innerWidth, window.innerHeight)

  // load the background texture
  //this.backgroundtexture = new THREE.TextureLoader().load( 'white_paper_background.jpg' );
  //scene.background = this.backgroundtexture;

  // change scene background to solid color
  scene.background = new THREE.Color( 0x000000 ); //0xffffff, 0x000000

  const color = 0xffffff; //0xffffff
  const intensity = 0.0; //0-1, zero works great for shadows with strong contrast

  // ADD LIGHTING
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 0, 2000); //1000,1000,1000
 
  light.castShadow = true;
  light.shadow.camera.near = 200;
  light.shadow.camera.far = 2000;
  light.shadow.bias = - 0.000222;
  light.shadow.mapSize.width = 2048; //increase for better quality of shadow, standard is 2048, used 4096, 512 works on mobile, 1024 works on mobile
  light.shadow.mapSize.height = 2048; //increase for better quality of shadow, standard is 2048, used 4096, 512 works on mobile, 1024 works on mobile

  scene.add(light);

  const amblight = new THREE.AmbientLight(color, intensity);
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

  // segment_lengths = [1, 0.5, 0.25, 0.125, 0.75, 0.333, 0.1, 0.618, 1.5, 1.75]
  // ring_sizes = [50, 5, 20, 100, 10, 15, 25, 30]
  //
  // switch(ring_type_index) {
  //   case 0:
  //     this.addRing(250, Math.PI, 50, false, x=0, y=0, nodex=null);
  //
  //   case 1:
  //     for (var i = 0; i < 5; i++) { //focal
  //       this.addRing(50+25*i, Math.PI, 50, [true, false][i%2], x=0, y=0, nodex=null)
  //     }
  //
  //   case 2:
  //     for (var i = 0; i < gData.nodes.length; i++) {
  //       if (gData.nodes[i].connectivity > 10) {
  //         this.addRing(25, Math.PI*segment_lengths[i%10], 50, [true, false][i%2], x=0, y=0, nodex=i) // x=gData.nodes[i].x, y=gData.nodes[i].y
  //       }
  //     }
  //
  //   case 3:
  //     this.addRing(250, Math.PI, 50, false, x=0, y=0, nodex=null)
  //     for (var i = 0; i < gData.nodes.length; i++) {
  //       if (gData.nodes[i].connectivity > 10) {
  //         this.addRing(25, Math.PI*segment_lengths[i%10], 50, [true, false][i%2], x=0, y=0, nodex=i) // x=gData.nodes[i].x, y=gData.nodes[i].y
  //       }
  //     }
  //
  //   case 4:
  //     for (var i = 0; i < gData.nodes.length; i++) {
  //       if (gData.nodes[i].connectivity > 10) {
  //         this.addRing(ring_sizes[i%8], Math.PI*segment_lengths[i%10], 50, [true, false][i%2], x=0, y=0, nodex=i) // x=gData.nodes[i].x, y=gData.nodes[i].y
  //       }
  //     }
  // }

  // Renders the Scene
  const renderPass = new THREE.RenderPass(this.scene, this.camera);
  this.composer.addPass( renderPass );


  //Bloom
  const bloomPass = new THREE.UnrealBloomPass();
  bloomPass.strength = 0.30;
  bloomPass.radius = 0.0;
  bloomPass.threshold = 0.0;
  this.composer.addPass(bloomPass)

  // // Pixelate pass
  // var effectPixelate = new THREE.ShaderPass( THREE.PixelateShader );
  // effectPixelate.uniforms[ 'size' ].value.x = this.winWidth*this.scale;  //winWidth*scale
  // effectPixelate.uniforms[ 'size' ].value.y = this.winHeight*this.scale;  //winHeight*scale
  // effectPixelate.uniforms[ 'pixelSize' ].value = 400;
  // this.composer.addPass(effectPixelate)
  //
  //
  // // Simple film grain shader pass
  // var grainPass = new THREE.ShaderPass( THREE.SimpleFilmGrainShader );
  // grainPass.material.uniforms[ 'tint' ].value = paper_tint;
  // this.composer.addPass(grainPass);
  //
  //
  // // FXAA shader pass (for antialiasing)
  // var fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
  // var pixelRatio = renderer.getPixelRatio();
  // var uniforms = fxaaPass.material.uniforms;
  // uniforms[ 'resolution' ].value.x = 1 / ( viewportWidth * pixelRatio );
  // uniforms[ 'resolution' ].value.y = 1 / ( viewportHeight * pixelRatio );
  // this.composer.addPass(fxaaPass);
  //
  //
  // // Bokeh pass (depth of field)
  // // http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html
  // // https://jsfiddle.net/5nxy0tqp/
  // var effectBokeh= new THREE.BokehPass( this.scene, this.camera, {
  //   focus: 500.0, //1.0
  //   aperture:	5.0, //1.0, 0.025
  //   maxblur:	0.0025, //1.0, 0.01, 0.0025
  //   width: this.winWidth,
  //   height: this.winHeight
  // } );
  // this.composer.addPass(effectBokeh);
  // // turn this on if you want to add more effects after Bokeh pass
  // effectBokeh.needsSwap = true;

  if (debug){
    console.timeEnd("view initialisation")
  }
}

View.prototype.addInstances = function  () {

  var c_type = "standard";
  var c_xy_scale = thickness_scale_per_stage['getting_thinner']; // how much is thickness of the member scaled for every stage

  var cull_dist_bands; // culling of members happens at different rates at each of these distance bands
  var cull_precentage_bands; // culling precentages per distance bands (first one is 100%, all members get removed)
  var explosion_strength; // overall factor for translation during explosion - will be divided with the distance from the axis (closer to the axis, stronger the offset)
  var explosion_rot_range; // maximum range for the random rotation angle (in radians) while applying explosion
  var explosion_rot_reduction; // reduction of random rotation angle for each band (closer to the axis means more chaos)

  if ((explosion_type == 1) || (explosion_type == 2) || (explosion_type == 3) || (explosion_type == 4)) {
    // explosion along an axis
    cull_dist_bands = [20, 40, 60, 80];
    cull_precentage_bands = [1.0, 0.8, 0.6, 0.4];
    explosion_strength = 1000;
    explosion_rot_range = Math.PI/2;
    explosion_rot_reduction = [1.0, 0.6, 0.3];
  } else if ((explosion_type == 5) || (explosion_type == 6)) {
    // explosion from a point
    cull_dist_bands = [40, 80, 120, 160];
    cull_precentage_bands = [1.0, 0.8, 0.6, 0.4];
    explosion_strength = 1000;
    explosion_rot_range = Math.PI/2;
    explosion_rot_reduction = [1.0, 0.6, 0.3];
  }

  var triangle_radius = 0.5;
  var debris_multiplier = 5; // multiply the number of debris particles
  var debris_spread = 50; // distance range to randomly spread out the debris particles

  for (var n = 0; n < gDatas.length; n++) {
    var gData = gDatas[n];
    var dummy = new THREE.Object3D()
    var geometry = new THREE.CylinderGeometry( cylinder_params[c_type][0], cylinder_params[c_type][1], cylinder_params[c_type][2], cylinder_params[c_type][3], cylinder_params[c_type][4], true );
    var material = new THREE.MeshPhongMaterial( {color: 0xffffff} ); //THREE.MeshBasicMaterial( {color: 0xff0000} ); THREE.MeshNormalMaterial();
    var imesh = new THREE.InstancedMesh( geometry, material, gData.links.length )
    var axis = new THREE.Vector3(0, 1, 0);
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
    var c = new THREE.Color()

    var exploded_dummies = []; // array to hold our transform matrices of exploded elements so we can use them to add more debris around the explosion area
    var debris_position_temp = new THREE.Vector3(); // temporary holder for positions of exploded members so we can use them for debris

    for (var i = 0; i < gData.links.length; i++) {
      var source_index = gData.links[i]['source'];
      var target_index = gData.links[i]['target'];
      var vector = new THREE.Vector3(gData.nodes[target_index].x-gData.nodes[source_index].x, gData.nodes[target_index].y-gData.nodes[source_index].y, gData.nodes[target_index].z-gData.nodes[source_index].z);
      dummy.scale.set(c_xy_scale[gData.nodes[source_index]['stage']], gData.links[i]['value'], c_xy_scale[gData.nodes[source_index]['stage']]); // (1, gData.links[i]['value'], 1)
      dummy.quaternion.setFromUnitVectors(axis, vector.clone().normalize());
      dummy.position.set((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2)
      dummy.updateMatrix();

      
      // cull members according to their proximity to the axis
      // var cull_member_x_axis = (Math.abs((gData.nodes[source_index].x + gData.nodes[target_index].x) / 2) < cull_band_width) || (Math.abs(gData.nodes[source_index].x) < cull_band_min) || (Math.abs(gData.nodes[target_index].x) < cull_band_min); //(gene() < 0.95)
      // var cull_member_y_axis = (Math.abs((gData.nodes[source_index].y + gData.nodes[target_index].y) / 2) < cull_band_width) || (Math.abs(gData.nodes[source_index].y) < cull_band_min) || (Math.abs(gData.nodes[target_index].y) < cull_band_min); //(gene() < 0.95)

      // !cull_member_x_axis - cull members along x-axis
      // !cull_member_y_axis - cull members along y-axis
      // !(cull_member_x_axis || cull_member_y_axis) - cull members along x-axis and y-axis

      /*if (cull_member_y_axis) {
        if ( gene() < 0.05 ) { //5/(Math.abs((gData.nodes[source_index].y + gData.nodes[target_index].y) / 2))
          cull_member_y_axis = false;
        }
      }*/

      // EXPLODING LATTICE MEMBERS

      // setting default for all members not to get culled 
      var cull_member = false;
      var cull_member_x_axis = false;
      var cull_member_y_axis = false;
      
      // in case we have to calculate explosion, proceede below, otherwise skip
      if (explosion_type != 0) {

        var dist_to_x_axis = Math.abs((gData.nodes[source_index].y + gData.nodes[target_index].y) / 2); // from member mid point to axis
        var dist_to_y_axis = Math.abs((gData.nodes[source_index].x + gData.nodes[target_index].x) / 2); // from member mid point to axis
        var end_to_x_axis = Math.min(Math.abs(gData.nodes[source_index].y), Math.abs(gData.nodes[target_index].y)); // from member end point to axis
        var end_to_y_axis = Math.min(Math.abs(gData.nodes[source_index].x), Math.abs(gData.nodes[target_index].x)); // from member end point to axis

        var projected_member_cent =  new THREE.Vector3((gData.nodes[source_index].x + gData.nodes[target_index].x) / 2, (gData.nodes[source_index].y + gData.nodes[target_index].y) / 2, 0);
        var projected_source = new THREE.Vector3(gData.nodes[source_index].x, gData.nodes[source_index].y, 0);
        var projected_target = new THREE.Vector3(gData.nodes[target_index].x, gData.nodes[target_index].y, 0);

        var dist_to_cent_a = projected_member_cent.distanceTo(explosion_center_a);
        var dist_to_cent_b = projected_member_cent.distanceTo(explosion_center_b);
        var dist_source_to_cent_a = projected_source.distanceTo(explosion_center_a);
        var dist_target_to_cent_a = projected_target.distanceTo(explosion_center_a);
        var dist_end_to_cent_a = Math.min(dist_source_to_cent_a, dist_target_to_cent_a);
        var dist_source_to_cent_b = projected_source.distanceTo(explosion_center_b);
        var dist_target_to_cent_b = projected_target.distanceTo(explosion_center_b);
        var dist_end_to_cent_b = Math.min(dist_source_to_cent_b, dist_target_to_cent_b);

        var explosion_axis = new THREE.Vector3((gData.nodes[source_index].x + gData.nodes[target_index].x) / 2, (gData.nodes[source_index].y + gData.nodes[target_index].y) / 2, (gData.nodes[source_index].z + gData.nodes[target_index].z) / 2).normalize();
        var dist_to_axis_explosion;
        
        // defining parameters for each explosion type
        
        if (explosion_type == 1) {
          dist_to_axis = dist_to_x_axis;
          dist_to_axis_explosion = dist_to_x_axis;
          end_to_axis = end_to_x_axis;

        } else if (explosion_type == 2) {
          dist_to_axis = dist_to_x_axis;
          dist_to_axis_explosion = dist_to_y_axis;
          end_to_axis = end_to_x_axis;

        } else if (explosion_type == 3) {
          dist_to_axis = dist_to_y_axis;
          dist_to_axis_explosion = dist_to_y_axis;
          end_to_axis = end_to_y_axis;

        } else if (explosion_type == 4) {
          dist_to_axis = dist_to_y_axis;
          dist_to_axis_explosion = dist_to_x_axis;
          end_to_axis = end_to_y_axis;

        } else if (explosion_type == 5) {
          dist_to_axis = dist_to_cent_a;
          dist_to_axis_explosion = dist_to_cent_a;
          end_to_axis = dist_end_to_cent_a;

        } else if (explosion_type == 6) {
          dist_to_axis = Math.min(dist_to_cent_a, dist_to_cent_b);
          dist_to_axis_explosion = Math.min(dist_to_cent_a, dist_to_cent_b);
          end_to_axis = Math.min(dist_end_to_cent_a, dist_end_to_cent_b);
        }


        if ((end_to_axis < cull_dist_bands[0]) || (dist_to_axis < cull_dist_bands[0])) {
          // apply explosion offset and random rotation for member within the explosion zone
          dummy.translateOnAxis(explosion_axis, explosion_strength / dist_to_axis_explosion);
          dummy.updateMatrix();
          // first band, closest, every member gets culled
          if (gene() < cull_precentage_bands[0]) {
            cull_member_x_axis = true;
            debris_position_temp = new THREE.Vector3((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2);
            debris_position_temp.add(explosion_axis.multiplyScalar(explosion_strength / dist_to_axis_explosion)); // debris will be pushed away from the axis the same as the members
            for (var d = 0; d < debris_multiplier; d++) {exploded_dummies.push(debris_position_temp);}
          }

        } else if ((end_to_axis < cull_dist_bands[1]) || (dist_to_axis < cull_dist_bands[1])) {
          // apply explosion offset and random rotation for member within the explosion zone
          dummy.translateOnAxis(explosion_axis, explosion_strength / dist_to_axis_explosion);
          dummy.rotateX(explosion_rot_reduction[0] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateY(explosion_rot_reduction[0] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateZ(explosion_rot_reduction[0] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.updateMatrix();
          // second band, 80% of members get culled
          if (gene() < cull_precentage_bands[1]) {
            cull_member_x_axis = true;
            debris_position_temp = new THREE.Vector3((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2);
            debris_position_temp.add(explosion_axis.multiplyScalar(explosion_strength / dist_to_axis_explosion)); // debris will be pushed away from the axis the same as the members
            for (var d = 0; d < debris_multiplier; d++) {exploded_dummies.push(debris_position_temp);}
          }

        } else if ((end_to_axis < cull_dist_bands[2]) || (dist_to_axis < cull_dist_bands[2])) {
          // apply explosion offset and random rotation for member within the explosion zone
          dummy.translateOnAxis(explosion_axis, explosion_strength / dist_to_axis_explosion);
          dummy.rotateX(explosion_rot_reduction[1] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateY(explosion_rot_reduction[1] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateZ(explosion_rot_reduction[1] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.updateMatrix();
          // third band, 60% of members get culled
          if (gene() < cull_precentage_bands[2]) {
            cull_member_x_axis = true;
            debris_position_temp = new THREE.Vector3((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2);
            debris_position_temp.add(explosion_axis.multiplyScalar(explosion_strength / dist_to_axis_explosion)); // debris will be pushed away from the axis the same as the members
            for (var d = 0; d < debris_multiplier; d++) {exploded_dummies.push(debris_position_temp);}
          }

        } else if ((end_to_axis < cull_dist_bands[3]) || (dist_to_axis < cull_dist_bands[3])) {
          // apply explosion offset and random rotation for member within the explosion zone
          dummy.translateOnAxis(explosion_axis, explosion_strength / dist_to_axis_explosion);
          dummy.rotateX(explosion_rot_reduction[2] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateY(explosion_rot_reduction[2] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.rotateZ(explosion_rot_reduction[2] * (Math.random() * explosion_rot_range * 2 - explosion_rot_range));
          dummy.updateMatrix();
          // third band, 40% of members get culled
          if (gene() < cull_precentage_bands[3]) {
            cull_member_x_axis = true;
            debris_position_temp = new THREE.Vector3((gData.nodes[source_index].x+gData.nodes[target_index].x)/2, (gData.nodes[source_index].y+gData.nodes[target_index].y)/2, (gData.nodes[source_index].z+gData.nodes[target_index].z)/2);
            debris_position_temp.add(explosion_axis.multiplyScalar(explosion_strength / dist_to_axis_explosion)); // debris will be pushed away from the axis the same as the members
            for (var d = 0; d < debris_multiplier; d++) {exploded_dummies.push(debris_position_temp);}
          }
        }

        cull_member = cull_member_x_axis;

      }
      // end of explosion part

      // cull_member is set per default to false, unless explosion part above defined it to be true
      if (!cull_member) {
        imesh.setMatrixAt( i, dummy.matrix );
      }

    }

    imesh.instanceMatrix.needsUpdate = true

    imesh.castShadow = true;
    imesh.receiveShadow = true;

    this.scene.add(imesh);

    //ref.current.instanceMatrix.needsUpdate = true


    // EXPLOSION DUST CLOUD

    // one triangle
    const vertices = [
      0, 1, 0, // top
      1, 0, 0, // right
      -1, 0, 0 // left
    ];
    const faces = [ 2, 1, 0 ]; // only one face
    
    var dummy = new THREE.Object3D();
    var triangle = new THREE.PolyhedronGeometry(vertices, faces, triangle_radius, 0);
    triangle.scale(0.5, 10, 0.5);
    var imesh_debris = new THREE.InstancedMesh( triangle, material, exploded_dummies.length )
    imesh_debris.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    //console.log('exploded_dummies.length ->', exploded_dummies.length);
    //console.log(exploded_dummies);

    for (var i = 0; i < exploded_dummies.length; i++) {
      dummy.position.set(exploded_dummies[i].x, exploded_dummies[i].y, exploded_dummies[i].z);
      var random_axis = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
      dummy.translateOnAxis(random_axis, Math.random() * debris_spread);

      var uniscale = 0.2 + Math.random();
      dummy.scale.set(uniscale, uniscale, uniscale); //Dynamically assign this to give different sizes (eg add attribute to nData.nodes and call it here)
      
      dummy.rotateX(Math.random() * Math.PI/3 - Math.PI/6);
      dummy.rotateY(Math.random() * Math.PI/3 - Math.PI/6);
      dummy.rotateZ(Math.random() * Math.PI/3 - Math.PI/6);

      dummy.updateMatrix();
      imesh_debris.setMatrixAt( i, dummy.matrix );

    }


    imesh_debris.instanceMatrix.needsUpdate = true
    //imesh_debris.castShadow = true; // remove for performance
    imesh_debris.receiveShadow = true;
    this.scene.add(imesh_debris);
    


  }

}

View.prototype.addLandscape = function (level = 1, resolution = 1000, mod = 0.01) {
  const geometry = new THREE.PlaneGeometry( 1000, 1000, resolution, resolution); //.rotateX(Math.PI/2 );
  //geometry.applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI/2 ));
  const material = new THREE.MeshPhongMaterial( {color: 0xA0A0A0, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  const { position } = geometry.attributes;
  for (var i=0; i < position.count; i++) {
    //position.array[i * 3 + 2] = 50 * (perlin2D(position.array[i * 3]*mod, position.array[i * 3 + 1]*mod))+ 10 * (perlin2D(position.array[i * 3]*mod*5, position.array[i * 3 + 1]*mod*5))-200;
    position.array[i * 3 + 1] = 50 * (perlin2D(position.array[i * 3]*mod, position.array[i * 3 + 2]*mod))+ 10 * (perlin2D(position.array[i * 3]*mod*5, position.array[i * 3 + 2]*mod*5))-200; //Math.random() //perlin2D(Math.abs(position.array[i * 3])*mod, Math.abs(position.array[i * 3 + 2])*mod)
  }
  console.log(perlin2D(Math.abs(position.array[3])*mod, Math.abs(position.array[3 + 2])*mod))

  position.needsUpdate = true
  geometry.computeVertexNormals()

  this.scene.add( plane );
}

View.prototype.addRing = function (radius, segment_length, resolution = 50, clockwise = false, x=0, y=0, nodex=null)
{
  if (nodex != null) {
    x = gData.nodes[nodex].x;
    y = gData.nodes[nodex].y;
  }

  const curve = new THREE.EllipseCurve(
  x, y,
  radius, radius,
  0, segment_length,
  clockwise,
  0
  )

  const points = curve.getPoints( resolution );
  const orb_ring = new THREE.BufferGeometry().setFromPoints( points );
  const orb_material = new THREE.LineBasicMaterial( { color: ink } );
  const ring = new THREE.Line( orb_ring, orb_material );
  this.curves.push({'proto':curve, 'geo': ring, 'clockwise':clockwise ? -1 : 1, 'node_index': nodex})

  this.scene.add(ring);
}

View.prototype.addFlatNodes = function ()
{
  var pointMaterial =  new THREE.PointsMaterial({
  size: 5,
  map: createCircleTexture('#0000aa', 256),
  transparent: true,
  depthWrite: false
  });

  var temp_node_array = new Float32Array(3*gData.nodes.length);
  for (var i = 0; i < gData.nodes.length; i++) {
    temp_node_array[3*i] = gData.nodes[i].x
    temp_node_array[3*i+1] = gData.nodes[i].y
    temp_node_array[3*i+2] = gData.nodes[i].z
  }
  var node_geo = new THREE.BufferGeometry();
  node_geo.setAttribute( 'position', new THREE.BufferAttribute( temp_node_array, 3));

  //var material = new THREE.PointsMaterial( {size:10,color:0x999999} );
  var nodeSystem = new THREE.Points( node_geo, pointMaterial );
  //node_geo.setAttribute( 'position', new THREE.BufferAttribute( temp_node_array, 3));
  this.scene.add(nodeSystem)
}


View.prototype.addNodes = function (random_scale = false, random_color = false, random_position = false, resolution = 10, qty=null)
{
  const dummy = new THREE.Object3D()

  const geometry = new THREE.SphereGeometry( 0.5, resolution, resolution );
  //const material = new THREE.MeshNormalMaterial();
  //const material = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff} );//new THREE.ShadowMaterial( { color: 0x000000, opacity: 0.8 } ); //new THREE.MeshPhongMaterial( {color: 0xffffff} ) //new THREE.ShadowMaterial( { color: 0x000000, opacity: 0.2 } );
  
  const color = new THREE.Color();
	const nodePalette = [ 0x5A5A5A, 0x676767, 0x737373, 0x808080, 0x8D8D8D, 0x9A9A9A, 0XA6A6A6 ]; //0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405  //DONOTWORK 0x6B93D6, 0xE9EFF9, 0x9FC164, 0xD8C596, 0x4F4CB0

  //var axis = new THREE.Vector3(0, 1, 0);
  //const c = new THREE.Color()


  for (var n = 0; n < nDatas.length; n++) {
    var nData = nDatas[n];

    const imesh = new THREE.InstancedMesh( geometry, material, nData.nodes.length )
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    if ((qty != null) && (n == 0)) {
      qty=qty
    } else { qty = nData.nodes.length}

    for (var i = 0; i < qty; i++) {
      if (random_scale) {
        var uniscale = Math.floor( Math.random() * 15 ) + 2.5
        dummy.scale.set(uniscale,uniscale,uniscale); //Dynamically assign this to give different sizes (eg add attribute to nData.nodes and call it here)
      }

      if (random_position) {
        dummy.position.set(Math.random() * 2000-1000 , Math.random() * 2000-1000,  Math.random() * 250 - 400);
      } else {
        dummy.position.set(nData.nodes[i].x, nData.nodes[i].y, nData.nodes[i].z);
      }


      dummy.updateMatrix();
      imesh.setMatrixAt( i, dummy.matrix );

      if (random_color) {
        color.setHex(nodePalette[Math.floor( Math.random() * nodePalette.length )])
        imesh.setColorAt(i, color)
      }

  }

  /*for (var i = 0; i < nData.nodes.length; i++) {
    color.setHex(nodePalette[Math.floor( Math.random() * nodePalette.length )])
    imesh.setColorAt(i, color)
  }*/
  imesh.instanceMatrix.needsUpdate = true
  //imesh.castShadow = true; // remove for performance
  imesh.receiveShadow = true;
  this.scene.add(imesh);

  }

}


View.prototype.addStars = function (random_position = false, bounds = 100, qty = null)
{
  var star_plane_distance = -2000; // z coordinate of the plane where stars reside (they also recieve no shadow)
  // one triangle
  const vertices = [
    0, 1, 0, // top
    1, 0, 0, // right
    -1, 0, 0 // left
  ];
  // only one face
  const faces = [ 2, 1, 0 ];
  const triangle_radius = 0.30; //0.5

  const geometry = new THREE.PolyhedronGeometry(vertices, faces, triangle_radius, 0);
  geometry.scale(1, 1.5, 1);
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
  
  for (var n = 0; n < nDatas.length; n++) {
    var nData = nDatas[n];

    if ((qty != null) && (n == 0)) {
      qty=qty;
    } else { qty = nData.nodes.length;}

    const imesh = new THREE.InstancedMesh( geometry, material, qty )
    imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

    for (var i = 0; i < qty; i++) {
      const dummy = new THREE.Object3D();

      var uniscale = 0.5 + Math.random();
      dummy.scale.set(uniscale,uniscale,uniscale); // dynamically assign this to give different sizes (eg add attribute to nData.nodes and call it here)
      
      if (random_position) {
        dummy.position.set(Math.random() * bounds - bounds/2, Math.random() * bounds - bounds/2,  star_plane_distance);
      } else {
        dummy.position.set(nData.nodes[i].x, nData.nodes[i].y, star_plane_distance);
      }

      dummy.rotateX(Math.random() * Math.PI/3 - Math.PI/6);
      dummy.rotateY(Math.random() * Math.PI/3 - Math.PI/6);
      dummy.rotateZ(Math.random() * Math.PI/3 - Math.PI/6);

      dummy.updateMatrix();
      imesh.setMatrixAt( i, dummy.matrix );
  }

  imesh.instanceMatrix.needsUpdate = true
  //imesh.castShadow = true; // remove for performance
  //imesh.receiveShadow = true; // stars recieve no shadow
  this.scene.add(imesh);

  }

}


View.prototype.addCelestialObject = function (celestial_object_type)
{
  var radius_x, radius_y, radius_planet_x, radius_planet_y, radius_moon_x, radius_moon_y, radius_moon_2nd_x, radius_moon_2nd_y, r_x, r_y, radius_offset, radius_atmosphere, radius_nova_x, radius_nova_y, radius_ring_x, radius_ring_y, ring_y_scale, rapture_size, radius_rapture_x, radius_rapture_y, bounds_x, bounds_y;
  var cent_x, cent_y, cent_planet_x, cent_planet_y, cent_moon_x, cent_moon_y, cent_moon_2nd_x, cent_moon_2nd_y, moon_offset_x, moon_offset_y, celestial_x, celestial_y, celestial_x_rot, celestial_y_rot, centers_x, centers_y;
  var angle, r, tilt_angle, comet_rot, nr_of_triangles, nr_of_meteors;
  var customGaussian, stdev, stdevs, ringGaussian, secondRingGaussian, customGaussian2nd, stdev2nd, hasDoubleRing, hasMoon, hasAtmosphere, orbitFlipped, perlin_shift, perlin_scale;

  var celestial_plane_distance = -1800; // z coordinate of the plane where stars reside (they also recieve no shadow)
  var monteCarloHit = true; // this will draw the triangle and is true by default, except for nebula case where it can become false
  var nr_of_tries = 100; // number of tries to try to displace the center of the celestial (used in a for loop)
  var cent_offset = center_piece_type != 'none' ? 100 : 0; // center offset is set if there is a lattice in the center, otherwise it's zero

  if (celestial_object_type == 'comet') {
    radius_x = 500;
    radius_y = 500;
    // here we are trying to choose the center until at least one coordinate is not close to the center (so it doesn't overlap with the lattice in the center)
    for (var i = 0; i < nr_of_tries; i++) {
      cent_x = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      cent_y = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      if (Math.max(Math.abs(cent_x), Math.abs(cent_y)) > cent_offset) {break;}
    }
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    comet_rot = gene() < 0.5 ? Math.PI/4 : -Math.PI/4; // clockwise, anti-clockwise
    nr_of_triangles = 10000;
    customGaussian = gaussian(0, gene_range(0.01, 0.20)); // used for the comet, second param determines the width of the trail
  
  } else if (celestial_object_type == 'eclipse') {
    radius_x = gene_range(10, 75);
    radius_y = radius_x;
    // here we are trying to choose the center until at least one coordinate is not close to the center (so it doesn't overlap with the lattice in the center)
    for (var i = 0; i < nr_of_tries; i++) {
      cent_x = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      cent_y = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      if (Math.max(Math.abs(cent_x), Math.abs(cent_y)) > cent_offset) {break;}
    }
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = Math.ceil(1000 * Math.sqrt(radius_x));
    stdev = gene() < 0.25 ? 2.0 : 0.4;
    customGaussian = gaussian(0, stdev);

  } else if (celestial_object_type == 'ultra eclipse') {
    radius_x = 100;
    radius_y = radius_x;
    cent_x = 0;
    cent_y = 0;
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 20000;
    stdev = gene() < 0.5 ? 2.0 : 0.4;
    customGaussian = gaussian(0, stdev);

  } else if (celestial_object_type == 'moon') {
    radius_planet_x = gene_range(10, 75);
    radius_planet_y = radius_planet_x;
    radius_x = radius_planet_x; // we have to define this here as well so that the dark disc can be positioned
    radius_y = radius_planet_x; // same as above
    // here we are trying to choose the center until at least one coordinate is not close to the center (so it doesn't overlap with the lattice in the center)
    for (var i = 0; i < nr_of_tries; i++) {
      cent_planet_x = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      cent_planet_y = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      if (Math.max(Math.abs(cent_planet_x), Math.abs(cent_planet_y)) > cent_offset) {break;}
    }
    cent_x = cent_planet_x; // we have to define this here as well so that the dark disc can be positioned
    cent_y = cent_planet_y; // same as above
    moon_offset_x = gene_range(-100, 100); 
    moon_offset_y = gene_range(-100, 100);
    cent_moon_x = cent_planet_x + moon_offset_x; // approximation - moon is close to the center of the planet
    cent_moon_y = cent_planet_y + moon_offset_y; // same as above
    cent_moon_2nd_x = cent_planet_x - moon_offset_x * 0.5; // second moon is right opposite the center but closer
    cent_moon_2nd_y = cent_planet_y - moon_offset_y * 0.5; // same as above
    radius_moon_x = radius_planet_x * gene_range(0.05, 0.25);
    radius_moon_y = radius_moon_x;
    radius_moon_2nd_x = radius_moon_x * 0.5; // second moon is half the size
    radius_moon_2nd_y = radius_moon_2nd_x;
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = Math.ceil(1000 * Math.sqrt(radius_planet_x));
    customGaussian = gaussian(0, 0.4);
    hasMoon = gene() < 0.50 ? true : false; // chance of a planet having a moon
    has2ndMoon = gene() < 0.25 ? true : false; // chance of a planet having a second moon
    hasAtmosphere = gene() < 0.25 ? true : false; // chance of a planet having an atmosphere

  } else if (celestial_object_type == 'planet') {
    radius_x = gene_range(10, 75);
    radius_y = radius_x * 0.25;
    // here we are trying to choose the center until at least one coordinate is not close to the center (so it doesn't overlap with the lattice in the center)
    for (var i = 0; i < nr_of_tries; i++) {
      cent_x = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      cent_y = gene_range(-100 - cent_offset/2, 100 + cent_offset/2);
      if (Math.max(Math.abs(cent_x), Math.abs(cent_y)) > cent_offset) {break;}
    }
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = Math.ceil(1000 * Math.sqrt(radius_x));
    customGaussian = gaussian(0, 0.4);
    stdev = gene_range(0.01, 0.15);
    ringGaussian = gaussian(1, stdev);
    hasDoubleRing = gene() < 0.35 ? true : false; // chance of a planet having a second ring
    secondRingGaussian = gaussian(1, 0.01);
    radius_offset = gene_range(1.2, 1.4); // scale factor for the second ring

  } else if (celestial_object_type == 'orbit') {
    radius_planet_x = 1000;
    radius_planet_y = radius_planet_x;
    radius_x = radius_planet_x; // we have to define this here as well so that the dark disc can be positioned
    radius_y = radius_planet_x; // same as above
    radius_atmosphere = radius_planet_x * gene_range(1.01, 1.05);
    orbitFlipped = gene() < 0.5 ? true : false; // determines if the planet is above or below the frame
    cent_planet_x = gene_range(-100, 100);
    cent_planet_y =  orbitFlipped ? gene_range(1000, 1100) : gene_range(-1000, -1100);
    cent_x = cent_planet_x; // we have to define this here as well so that the dark disc can be positioned
    cent_y = cent_planet_y; // same as above
    cent_moon_x = gene_range(-200, 200);
    cent_moon_y = orbitFlipped ? gene_range(-150, -50) : gene_range(50, 150);
    radius_moon_x = gene_range(5, 15);
    radius_moon_y = radius_moon_x;
    tilt_angle = 0; // full 360 degrees
    nr_of_triangles = 100000; //Math.ceil(2000 * Math.sqrt(radius_planet_x));
    customGaussian = gaussian(0, 0.4);
    hasMoon = gene() < 0.70 ? true : false; // chance of a planet having a moon
    hasAtmosphere = true; // chance of a planet having an atmosphere
    
  } else if (celestial_object_type == 'meteor shower') {
    radius_x = 500;
    radius_y = 500;
    centers_x = [];
    centers_y = [];
    stdevs = []
    nr_of_meteors = gene_range(20, 100);
    for (var i = 0; i < nr_of_meteors; i++) {
      centers_x.push(gene_range(-350, 350));
      centers_y.push(gene_range(-350, 350));
      stdevs.push(gene_range(0.001, 0.01));
    }
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 50000;
    
  } else if (celestial_object_type == 'quasar') {
    radius_nova_x = 500;
    radius_nova_y = radius_nova_x * gene_range(0.001, 0.02); // spread of the quasar beam
    radius_ring_y = gene_range(50, 100);
    radius_ring_x = radius_ring_y * gene_range(0.05, 0.20); // width of the cloud elipse
    cent_x = gene_range(-100, 100);
    cent_y = gene_range(-100, 100);
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 50000;
    stdev = gene_range(0.01, 0.5);
    customGaussian = gaussian(1, stdev); // spread of the cloud ring 1, 0.1

  } else if (celestial_object_type == 'nova') {
    radius_nova_x = gene_range(5, 50);
    radius_nova_y = radius_nova_x;
    radius_ring_y = gene_range(50, 100);
    ring_y_scale = gene_range(0.05, 0.20); // width of the cloud elipse
    radius_ring_x = radius_ring_y * ring_y_scale;
    radius_offset = gene_range(1.5, 3.0); // scale factor for the second ring
    cent_x = gene_range(-100, 100);
    cent_y = gene_range(-100, 100);
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 50000;
    stdev = gene_range(0.01, 0.5);
    customGaussian = gaussian(1, stdev); // spread of the cloud ring
    stdev2nd = gene_range(0.01, 0.5);
    customGaussian2nd = gaussian(1, stdev2nd); // spread of the cloud ring
    hasDoubleRing = gene() < 0.80 ? true : false; // chance of having a second ring

  } else if (celestial_object_type == 'rapture') {
    radius_rapture_x = 500;
    radius_rapture_y = 500;
    rapture_size = gene_range(0.05, 0.15);
    radius_x = radius_rapture_x * rapture_size; // we have to define this here as well so that the dark disc can be positioned
    radius_y = radius_rapture_x * rapture_size; // same as above
    cent_x = gene_range(-100, 100);
    cent_y = gene_range(-100, 100);
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 50000;
  
  } else if (celestial_object_type == 'nebula') {
    bounds_x = 400;
    bounds_y = 400;
    cent_x = 0;
    cent_y = 0;
    tilt_angle = gene_range(-Math.PI, Math.PI); // full 360 degrees
    nr_of_triangles = 50000;
    perlin_shift = gene_range(-100, 100); // this will make sure the perlin pattern is not always the same
    perlin_scale = gene_range(0.001, 0.02); // scale of perlin features
  
  }

  // place dark disk behind the celestial objects but in front of the stars so they are covered
  if (celestial_object_type == 'eclipse' || celestial_object_type == 'ultra eclipse' || celestial_object_type == 'moon' || celestial_object_type == 'planet' || celestial_object_type == 'orbit' || celestial_object_type == 'rapture') {
    const dark_disc_geo = new THREE.CircleGeometry(radius_x, 16);
    const dark_disc_material = new THREE.MeshBasicMaterial({color: 0x000000});
    const dark_disc_mesh = new THREE.Mesh(dark_disc_geo, dark_disc_material);
    dark_disc_mesh.position.set(cent_x, cent_y, celestial_plane_distance - 100);
    this.scene.add(dark_disc_mesh);
  }

  // one triangle
  const vertices = [
    0, 1, 0, // top
    1, 0, 0, // right
    -1, 0, 0 // left
  ];
  // only one face
  const faces = [ 2, 1, 0 ];
  const triangle_radius = 0.30; //0.5

  const geometry = new THREE.PolyhedronGeometry(vertices, faces, triangle_radius, 0);
  geometry.scale(1, 1.5, 1);
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
  
  const imesh = new THREE.InstancedMesh( geometry, material, nr_of_triangles )
  imesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

  // main loop that calcupates positions of all triangles
  for (var i = 0; i < nr_of_triangles; i++) {

    // special parameters for each celestial type

    if (celestial_object_type == 'comet') {
      angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - COMET
      r = gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense in the middle - COMET
    
    } else if (celestial_object_type == 'eclipse' || celestial_object_type == 'ultra eclipse') {
      angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - ECLIPSE
      r = 1 / (1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1))))); // solar eclipse - ECLIPSE
    
    } else if (celestial_object_type == 'moon') {
      if (gene() < 0.75) {
        // spherical planet
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - PLANET
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - PLANET
        radius_x = radius_planet_x;
        radius_y = radius_planet_y;
        cent_x = cent_planet_x;
        cent_y = cent_planet_y;

      } else if (hasAtmosphere) {
        // spherical atmosphere
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - PLANET
        r = 1 - gene_range(0, gene_range(0, gene_range(0, 1))); // less dense at the edge - ATMOSPHERE
        radius_x = radius_planet_x * 1.1;
        radius_y = radius_planet_y * 1.1;
        cent_x = cent_planet_x;
        cent_y = cent_planet_y;
      }
      
      if (hasMoon && (gene() < 0.1)) {
        // spherical moon
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - MOON
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - MOON
        radius_x = radius_moon_x;
        radius_y = radius_moon_y;
        cent_x = cent_moon_x;
        cent_y = cent_moon_y;
      }

      if (has2ndMoon && (gene() < 0.05)) {
        // spherical 2nd moon
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - 2nd MOON
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - 2nd MOON
        radius_x = radius_moon_2nd_x;
        radius_y = radius_moon_2nd_y;
        cent_x = cent_moon_2nd_x;
        cent_y = cent_moon_2nd_y;
      }

    } else if (celestial_object_type == 'planet') {
      if (gene() < 0.65) {
        // spherical planet
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - PLANET
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge
        r_x = radius_x * 0.6;
        r_y = radius_x * 0.6;

      } else {
        // elipse ring
        angle = gene_range(2 * Math.PI / 3, 7 * Math.PI / 3); // top arc taken out
        r = ringGaussian(); // cloud aroud the edge
        r_x = radius_x;
        r_y = radius_y;
      }

      if (hasDoubleRing && (gene() < 0.1)) {
        // second elipse ring
        angle = gene_range(2 * Math.PI / 3, 7 * Math.PI / 3); // top arc taken out
        r = secondRingGaussian(); // cloud aroud the edge
        r_x = radius_x * radius_offset;
        r_y = radius_y * radius_offset;
      }

    }  else if (celestial_object_type == 'orbit') {
      if (gene() < 0.75) {
        // spherical planet
        angle = orbitFlipped ? gene_range(5 * Math.PI / 4, 7 * Math.PI / 4) : gene_range(-5 * Math.PI / 4, -7 * Math.PI / 4); // bottom or top 90 degrees
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - PLANET
        radius_x = radius_planet_x;
        radius_y = radius_planet_y;
        cent_x = cent_planet_x;
        cent_y = cent_planet_y;

      } else if (hasAtmosphere) {
        // spherical atmosphere
        angle = orbitFlipped ? gene_range(5 * Math.PI / 4, 7 * Math.PI / 4) : gene_range(-5 * Math.PI / 4, -7 * Math.PI / 4); // bottom or top 90 degrees
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - ATMOSPHERE
        radius_x = radius_atmosphere;
        radius_y = radius_atmosphere;
        cent_x = cent_planet_x;
        cent_y = cent_planet_y;
      }

      if (hasMoon && (gene() < 0.01)) {
        // spherical moon
        angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - MOON
        r = 1 - gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense at the edge - MOON
        radius_x = radius_moon_x;
        radius_y = radius_moon_y;
        cent_x = cent_moon_x;
        cent_y = cent_moon_y;
      }

    } else if (celestial_object_type == 'meteor shower') {
      rand_idx = generateRandomInt(0, centers_x.length); // we choose a random index from the list that holds meteor coordinates
      customGaussian = gaussian(0, stdevs[rand_idx]); // used for the comet, second param determines the width of the trail
      angle = gene_range(-Math.PI * customGaussian(), Math.PI * customGaussian()); // puts a bias on one side of the circle - angle is determined by the tilt_angle - METEOR SHOWER
      r = gene_range(0, gene_range(0, gene_range(0, gene_range(0, 1)))); // more dense in the middle - METEOR SHOWER
      cent_x = centers_x[rand_idx]; // draw random meteor from the coordinate list
      cent_y = centers_y[rand_idx]; // same as above

    } else if (celestial_object_type == 'quasar') {
      angle = gene_range(0, Math.PI * 2); // full 360 degrees
      if (gene() < 0.75) {
        // quasar beam - elongated super nova
        r = perlin2D(radius_x * Math.cos(angle) * 1.0, radius_y * Math.sin(angle) * 1.0); // supernova - QUASAR
        radius_x = radius_nova_x;
        radius_y = radius_nova_y;
      } else {
        // elipsoid ring
        r = customGaussian(); // cloud aroud the edge
        radius_x = radius_ring_x;
        radius_y = radius_ring_y;
      }

    } else if (celestial_object_type == 'nova') {
      angle = gene_range(0, Math.PI * 2); // full 360 degrees
      if (gene() < 0.75) {
        // super nova
        r = perlin2D(radius_x * Math.cos(angle) * 1.0, radius_y * Math.sin(angle) * 1.0); // supernova - NOVA
        radius_x = radius_nova_x;
        radius_y = radius_nova_y;
      } else {
        // elipsoid ring
        r = customGaussian(); // cloud aroud the edge
        radius_x = radius_ring_x;
        radius_y = radius_ring_y;
      }

      if (hasDoubleRing && (gene() < 0.25)) {
        // second elipsoid ring
        r = customGaussian2nd(); // cloud aroud the edge
        radius_x = radius_ring_x * radius_offset;
        radius_y = radius_ring_y * radius_offset;
      }

    } else if (celestial_object_type == 'rapture') {
      angle = gene_range(0, Math.PI * 2); // full 360 degrees
      r = rapture_size / (1 - perlin2D(radius_x * Math.cos(angle) * 0.1, radius_y * Math.sin(angle) * 0.1)); // dark central object bursting with light rays - RAPTURE
      radius_x = radius_rapture_x;
      radius_y = radius_rapture_y;

    } else if (celestial_object_type == 'nebula') {
      rand_x = gene_range(-bounds_x, bounds_x);
      rand_y = gene_range(-bounds_y, bounds_y);
      monteCarloHit = gene() < perlin2D(perlin_shift + rand_x * perlin_scale, perlin_shift + rand_y * perlin_scale) * 1.0; // perlin field influences the probability of a star appearing - NEBULA

    }


    // determining the position of each triangle

    if (celestial_object_type == 'nebula') {
      // not based on a circle equation, just on perlin noise
      celestial_x = rand_x;
      celestial_y = rand_y;

    } else if (celestial_object_type == 'planet') {
      // exception because we have to draw planet and its ring at the same time (one is a sphere, the other an elipse)
      celestial_x = cent_x + r * r_x * Math.cos(angle) * Math.cos(tilt_angle) - r * r_y * Math.sin(angle) * Math.sin(tilt_angle);
      celestial_y = cent_y + r * r_x * Math.cos(angle) * Math.sin(tilt_angle) + r * r_y * Math.sin(angle) * Math.cos(tilt_angle);

    } else {
      // default case
      // general parametrization for a tilted ellipse
      //https://math.stackexchange.com/questions/2645689/what-is-the-parametric-equation-of-a-rotated-ellipse-given-the-angle-of-rotatio
      celestial_x = cent_x + r * radius_x * Math.cos(angle) * Math.cos(tilt_angle) - r * radius_y * Math.sin(angle) * Math.sin(tilt_angle);
      celestial_y = cent_y + r * radius_x * Math.cos(angle) * Math.sin(tilt_angle) + r * radius_y * Math.sin(angle) * Math.cos(tilt_angle);
    }

    if (celestial_object_type == 'comet') {
      // additional rotation of points proportional to r - COMET
      celestial_x_rot = celestial_x * Math.cos(comet_rot * r) - celestial_y * Math.sin(comet_rot * r);
      celestial_y_rot = celestial_x * Math.sin(comet_rot * r) + celestial_y * Math.cos(comet_rot * r);
      celestial_x = celestial_x_rot;
      celestial_y = celestial_y_rot;
    }
    
    if (celestial_object_type == 'nebula') {
      // rotation of points proportional to tilt_angle - NEBULA
      celestial_x_rot = celestial_x * Math.cos(tilt_angle) - celestial_y * Math.sin(tilt_angle);
      celestial_y_rot = celestial_x * Math.sin(tilt_angle) + celestial_y * Math.cos(tilt_angle);
      celestial_x = celestial_x_rot;
      celestial_y = celestial_y_rot;
    }

    const dummy = new THREE.Object3D();
    var uniscale = 0.5 + Math.random();
    dummy.scale.set(uniscale, uniscale, uniscale); // dynamically assign this to give different sizes (eg add attribute to nData.nodes and call it here)
    dummy.position.set(celestial_x, celestial_y, celestial_plane_distance);
    
    dummy.rotateX(Math.random() * Math.PI/3 - Math.PI/6);
    dummy.rotateY(Math.random() * Math.PI/3 - Math.PI/6);
    dummy.rotateZ(Math.random() * Math.PI/3 - Math.PI/6);

    dummy.updateMatrix();
    // if any triangle ends up too far from the center, we don't draw it
    // also monteCarloHit == false can appear in nebula type
    if (Math.max(Math.abs(celestial_x), Math.abs(celestial_y)) < 1000 && monteCarloHit) {
      imesh.setMatrixAt( i, dummy.matrix );
    }
  }

  
  imesh.instanceMatrix.needsUpdate = true
  //imesh.castShadow = true; // remove for performance
  //imesh.receiveShadow = true; // stars recieve no shadow
  this.scene.add(imesh);

}


View.prototype.addLineMesh = function (data, dash_array, dash_ratio, line_thickness, dash_speed) {
  var temp_array = new Float32Array(6);
  //console.log(gData.nodes[data['source']].x)
  temp_array[0] = gData.nodes[data['source']].x;
  temp_array[1] = gData.nodes[data['source']].y;
  temp_array[2] = gData.nodes[data['source']].z;
  temp_array[3] = gData.nodes[data['target']].x;
  temp_array[4] = gData.nodes[data['target']].y;
  temp_array[5] = gData.nodes[data['target']].z;

  var geo = new THREE.BufferGeometry()

  geo.setAttribute( 'position', new THREE.BufferAttribute( temp_array, 3 ) );

  var g = new MeshLine();
  g.setGeometry( geo );
  //g.setFromPoints()
  this.meshline_data.push(g)

  var material = new MeshLineMaterial( {
    antialias: true,
    useMap: false,
    color: new THREE.Color( my_features.ink),
    opacity: 1,
    transparent: true, // switch to false is opacity is 1, switch to true when using dashed lines
    dashArray: dash_array, // 0.05, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
    dashOffset: 0,
    dashRatio: dash_ratio, // 0.0 -> full line ; 0.5 -> balancing ; 1.0 -> full void
    //resolution: resolution,
    sizeAttenuation: false, // makes the line width constant regardless distance (1 unit is 1px on screen) (false - attenuate, true - don't attenuate)
    lineWidth: line_thickness, // 0.002, float defining width (if sizeAttenuation is true, it's world units; else is screen pixels)
  });

  var mesh = new THREE.Mesh( g.geometry, material );
  this.meshline_mesh.push(mesh);

  this.scene.add(mesh);
}



View.prototype.render = function () {

    requestAnimationFrame(this.render.bind(this));

    //this.renderer.clear();  //
    if (debug){
      var start_timer = new Date().getTime();
    }
    this.composer.render();
    //this.renderer.clear();  //
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
      capturer.capture( renderer.domElement );
    }
    //this.renderer.render(this.scene, this.camera); // When no layers are used
};

function Controller(viewArea) {
  if (debug){
    console.time("controller")
  }

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
  const parallex_framerate = 50; //33ms for 30fps and 15fps for 60fps
  const parallex_step = 0.5*Math.PI/parallex_framerate; //0.5*Math.PI/parallex_framerate
  const stopping_angle = Math.PI/2 //Change to desired sector angle IMPORTANT: Must fit in 2Pi with no remainder to get alignment every period

  //Sigmoid Function for motion
  const sigmoid_amplitude = 0.05 //0.113; //Best range to work from -Pi ti Pi

  const mid_sector = stopping_angle/2;
  var current_stage = 0
  var current_dir = 1

  const up = new THREE.Vector3(0,1,0)

  // LIGHT TRAVEL PARAMETERS
  var light_framerate = 10; 
  light_framerate_change = 10; //Needs to be the same
  var base_light_angle = Math.PI/3; // starting angle, angle 0 is straight behind the camera
  base_light_angle_step = 0.0005; //0.05
  //var light_angle;
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
  const lp = view.light.position;
  function update_light_position () {
    light_angle += light_angle_step;

    if ((light_source_type == 'west') || (light_source_type == 'east')) {
      // rotation in XY plane
      view.light.position.set(Math.sin(light_angle)*parallex_amplitude, lp.y, Math.cos(light_angle)*parallex_amplitude); //1000,1000,1000
    } else if ((light_source_type == 'north') || (light_source_type == 'south')) {
    // rotation in YZ plane
    view.light.position.set(lp.x, Math.sin(light_angle)*parallex_amplitude, Math.cos(light_angle)*parallex_amplitude);
    }
    // rotation in XZ plane
    //view.light.position.set(Math.sin(light_angle)*parallex_amplitude, Math.cos(light_angle)*parallex_amplitude, lp.z);
  }

  var lightIntervalInstance = setInterval(function () {update_light_position()}, light_framerate);


  setTimeout(function ()  {
    setInterval(function () {

      start_timer = new Date().getTime()

      if (base_light_angle_step != Math.abs(light_angle_step)) { //if step changed update step
        light_angle_step = Math.sign(light_angle_step)*base_light_angle_step; //use new amplitude with same sign, avoids another if statement
      }

      if (light_framerate != light_framerate_change) {
        clearInterval(lightIntervalInstance) //remove previous interval
        light_framerate == light_framerate_change;
        lightIntervalInstance = setInterval(function () {update_light_position()}, light_framerate); //create new interval with updated framerate
      }

      /*
      const camera_rev = ticker % (Math.PI*2);
      const sectors_passed = Math.floor(camera_rev/stopping_angle)
      const sector_rev = ticker % stopping_angle; //Goes from 0 -> stopping angle (PI/2)
      const mid_sector_rev =  ticker % mid_sector;
      var tween_f;
      var camera_angle;
      if (sector_rev < mid_sector){
        //console.log("run cycle")
          tween_f = sigmoid(mid_sector_rev-mid_sector/2, sigmoid_amplitude)
          camera_angle = tween_f*stopping_angle + sectors_passed*stopping_angle
          }
      else {
          //console.log("stop cycle")
          tween_f = -sigmoid(mid_sector_rev-mid_sector/2, sigmoid_amplitude)+1
          camera_angle =  (sectors_passed+1)*stopping_angle
      }


      //CAMERA UPDATE
      // const cp = view.camera.position;
      // view.camera.position.set(Math.sin(camera_angle)*parallex_amplitude, cp.y , Math.cos(camera_angle)*parallex_amplitude)
      // view.camera.lookAt(new THREE.Vector3(0, 0, 0));


      var tween_ff = [];
      for (var i = 0; i < stage; i++) {
        tween_ff.push(Math.cos(ticker_set[i])) //TODO change speed
      }

      //Update all BufferGeo Attribute data
      switch(transformation_index) {

        case 0: //no animation

        case 1: //synchronous
          for (var i = 0; i < gData.nodes.length; i++) {
            node = gData.nodes[i]
            node.x = node.x0 + tween_f*(node.x0 - node.x1)
            node.y = node.y0 + tween_f*(node.y0 - node.y1)
            node.z = node.z0 + tween_f*(node.z0 - node.z1)
            }

        case 2: //sequential
          var count_stage = {0:0, 1:0, 2:0}
          for (var i = 0; i < gData.nodes.length; i++) {
            node = gData.nodes[i]

            if (current_stage == node.stage) {
              count_stage[current_stage] ++
              node.x = node.x0 + tween_f*(node.x0 - node.x1)//*current_dir
              node.y = node.y0 + tween_f*(node.y0 - node.y1)//*current_dir
              node.z = node.z0 + tween_f*(node.z0 - node.z1)//*current_dir
            }

            if (current_stage <= stage-1 || current_stage >= 0) {
              //console.log(current_dir)
              current_stage = current_stage + current_dir
            }

            if (current_stage >= stage-1 || current_stage == 0) {
              current_dir = -current_dir
            }
          }

        case 3: //asynchronous
          for (var i = 0; i < gData.nodes.length; i++) {
            node = gData.nodes[i]
            //console.log(tween_ff)
            node.x = node.x0 + tween_ff[node.stage]*(node.x0 - node.x1)
            node.y = node.y0 + tween_ff[node.stage]*(node.y0 - node.y1)
            node.z = node.z0 + tween_ff[node.stage]*(node.z0 - node.z1)
            }

        case 4: //temporal
          for (var i = 0; i < gData.nodes.length; i++) {
            node = gData.nodes[i]
            node.x = node.x0 + 0.1*tween_f*(node.x0 - node.x1)
            node.y = node.y0 + 0.1*tween_f*(node.y0 - node.y1)
            node.z = node.z0 + 0.1*tween_f*(node.z0 - node.z1)
            }

        case 5: //modal
          for (var i = 0; i < gData.nodes.length; i++) {
            node = gData.nodes[i]
            node.x = node.x0 + tween_f*(node.x0 - node.x1)
            node.y = node.y0 + tween_f*(node.y0 - node.y1)
            node.z = node.z0 + tween_f*(node.z0 - node.z1)
            var mod = 0.02
            var scalar = perlin3D(Math.abs(node.x)*mod, Math.abs(node.y)*mod, Math.abs(node.z)*mod) + 1 //abs for symmetry

            node.x *= scalar
            node.y *= scalar
            node.z *= scalar

            }
      }
      */
      if (debug) {
        var end_timer = new Date().getTime();
        pre_calc = (end_timer - start_timer);
      }

      //update_linemesh_position();
      //update_curves(camera_angle);


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


  function update_curves(camera_angle) {
    for (var i = 0; i < view.curves.length; i++) {
      if (view.curves[i]['node_index'] != null) {
        view.curves[i]['proto'].aX = Math.cos(camera_angle)*gData.nodes[view.curves[i]['node_index']].x;
        view.curves[i]['proto'].aY= gData.nodes[view.curves[i]['node_index']].y
      }
      view.curves[i]['proto'].aRotation = ticker*view.curves[i]['clockwise'];
      const points = view.curves[i]['proto'].getPoints( 50 ); //
      view.curves[i]['geo'].geometry.setFromPoints( points );
      view.curves[i]['geo'].setRotationFromAxisAngle(up,camera_angle);
      view.curves[i]['geo'].geometry.attributes.position.needsUpdate = true;
    }
  }

  function update_linemesh_position() {

    for (var i = 0; i < gData.links.length; i++) {

      var source_array =  new Float32Array(6);

      source_array[0] = gData.nodes[gData.links[i]['source']].x
      source_array[1] = gData.nodes[gData.links[i]['source']].y
      source_array[2] = gData.nodes[gData.links[i]['source']].z

      source_array[3] = gData.nodes[gData.links[i]['source']].x
      source_array[4] = gData.nodes[gData.links[i]['source']].y
      source_array[5] = gData.nodes[gData.links[i]['source']].z



      var target_array =  new Float32Array(6);

      target_array[0] = gData.nodes[gData.links[i]['target']].x
      target_array[1] = gData.nodes[gData.links[i]['target']].y
      target_array[2] = gData.nodes[gData.links[i]['target']].z

      target_array[3] = gData.nodes[gData.links[i]['target']].x
      target_array[4] = gData.nodes[gData.links[i]['target']].y
      target_array[5] = gData.nodes[gData.links[i]['target']].z

      var position_list = [new THREE.Vector3(source_array[0],source_array[1],source_array[2]), new THREE.Vector3(target_array[0],target_array[1],target_array[2])];


      var point_step = view.meshline_data[i]
      var meshline_mesh = view.meshline_mesh[i]

      var positions = point_step._attributes.position.array
      var previous = point_step._attributes.previous.array
      var next = point_step._attributes.next.array

      //console.log(positions.length, previous.length, next.length)
      var l = positions.length

      // increment dash offset for the MeshLineMaterial to make dashes animated
      meshline_mesh.material.uniforms.dashOffset.value += dash_speed;

      // // 0.0 -> full line ; 0.5 -> balancing ; 1.0 -> full void
      // var dash_ratio = meshline_mesh.material.uniforms.dashRatio.value;
      //
      // // update meshline width based on the new lenght of the meshline
      // var distance = position_list[0].distanceTo(position_list[1]);
      // var line_thickness = distance * linewidth_scale;
      // // clamping linewidth to some min and max, dashed lines are additionally half the thickness
      // var clamped_thickness = Math.min(Math.max(line_thickness, linewidth_min), linewidth_max) * (1 - dash_ratio);
      //
      // //var clamped_distance = Math.min(Math.max(distance, linewidth_min), linewidth_max); // clamping distance and consequently linewidth to some min and max
      //
      // meshline_mesh.material.uniforms.lineWidth.value = clamped_thickness;


      // PREVIOUS
      //memcpy(source_array, 0, previous, 0, 12)

      previous[0] = source_array[0]
      previous[1] = source_array[1]
      previous[2] = source_array[2]
      previous[3] = source_array[3]
      previous[4] = source_array[4]
      previous[5] = source_array[5]
      previous[6] = source_array[0]
      previous[7] = source_array[1]
      previous[8] = source_array[2]
      previous[9] = source_array[3]
      previous[10] = source_array[4]
      previous[11] = source_array[5]

      // POSITIONS
      // memcpy(target_array, 0, positions, 0, 6)

      positions[0] = source_array[0]
      positions[1] = source_array[1]
      positions[2] = source_array[2]
      positions[3] = source_array[3]
      positions[4] = source_array[4]
      positions[5] = source_array[5]
      positions[6] = target_array[0]
      positions[7] = target_array[1]
      positions[8] = target_array[2]
      positions[9] = target_array[3]
      positions[10] = target_array[4]
      positions[11] = target_array[5]

      // NEXT
      //memcpy(positions, 6, next, 0, 6)
      //memcpy(target_array, 0, next, 0, l)

      next[0] = target_array[0]
      next[1] = target_array[1]
      next[2] = target_array[2]
      next[3] = target_array[3]
      next[4] = target_array[4]
      next[5] = target_array[5]
      next[6] = target_array[0]
      next[7] = target_array[1]
      next[8] = target_array[2]
      next[9] = target_array[3]
      next[10] = target_array[4]
      next[11] = target_array[5]


      point_step._attributes.position.needsUpdate = true
      point_step._attributes.previous.needsUpdate = true
      point_step._attributes.next.needsUpdate = true
    }
  }


  ////draw_mesh()

  ////geometry.computeBoundingSphere();


  // //Populate LineMesh Object for each link
  // for (var i = 0; i < gData.links.length; i++) {
  //
  //   var link_connectivity, dash_array, dash_ratio, line_thickness, clamped_thickness, linewidth_min, linewidth_max;
  //
  //   // to get the same connectivity for every link (and therefore symmetry) we combine the connectivities for source and target nodes into one number
  //   link_connectivity = gData.nodes[gData.links[i]['source']].connectivity + gData.nodes[gData.links[i]['target']].connectivity;
  //
  //
  //   // define parameters for the specific line style
  //   switch(line_style) {
  //
  //     case 'full':
  //       linewidth_min = 0.001; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.025; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       dash_ratio = 0; // full lines
  //       // line thickness is proportional to link length
  //       line_thickness = gData.links[i]['value'] * linewidth_scale;
  //       // clamping linewidth to some min and max, dashed lines are additionally half the thickness
  //       clamped_thickness = Math.min(Math.max(line_thickness, linewidth_min), linewidth_max) * (1 - dash_ratio);
  //       break;
  //
  //     case 'dashed':
  //       linewidth_min = 0.005; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.025; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       dash_ratio = 0.5; // dashed lines
  //       // line thickness is proportional to link length
  //       line_thickness = gData.links[i]['value'] * linewidth_scale;
  //       // clamping linewidth to some min and max, dashed lines are additionally half the thickness
  //       clamped_thickness = Math.min(Math.max(line_thickness, linewidth_min), linewidth_max) * (1 - dash_ratio);
  //       break;
  //
  //     case 'balanced':
  //       linewidth_min = 0.001; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.025; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       // this formula will oscillate dash_ratio based on modulus of connectivity between full line and dashed one (balanced)
  //       // 0 for full lines, 0.5 for dashed lines (50% - 50% ratio)
  //       dash_ratio = 0.5 - (link_connectivity % 2) * 0.5;
  //       dash_ratio = flip_dash == true ? 0.5 - dash_ratio : dash_ratio; // flip full and dashed lines
  //       // line thickness is proportional to link length
  //       line_thickness = gData.links[i]['value'] * linewidth_scale;
  //       // clamping linewidth to some min and max, dashed lines are additionally half the thickness
  //       clamped_thickness = Math.min(Math.max(line_thickness, linewidth_min), linewidth_max) * (1 - dash_ratio);
  //       break;
  //
  //     case 'thick':
  //       linewidth_min = 0.001; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.025; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       // this formula will oscillate dash_ratio based on modulus of connectivity between full line and dashed one (balanced)
  //       // 0 for full lines, 0.5 for dashed lines (33% - 66% ratio) (note: -0.5 appears as well)
  //       dash_ratio = 0.5 - (link_connectivity % 3) * 0.5;
  //       // line thickness is proportional to link length
  //       line_thickness = gData.links[i]['value'] * linewidth_scale;
  //       clamped_thickness = line_thickness * 20; // all lines are much thicker than normally and not clamped
  //       break;
  //
  //     case 'blocky':
  //       linewidth_min = 0.001; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.3; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       // this formula will oscillate dash_ratio based on modulus of connectivity between full line and dashed one (balanced)
  //       // 0 for full lines, 0.5 for dashed lines (50% - 50% ratio)
  //       //dash_ratio = 0.5 - (link_connectivity % 2) * 0.5;
  //       //dash_ratio = flip_dash == true ? 0.5 - dash_ratio : dash_ratio; // flip full and dashed lines
  //       dash_ratio = 0.85;
  //       clamped_thickness = linewidth_max; // all lines are much thicker than the maximal line thickness
  //       break;
  //
  //     case 'fragile':
  //       linewidth_min = 0.002; // linewidth will be clamped to this minimum
  //       linewidth_max = 0.05; // linewidth will be clamped to this maximum
  //       dash_array = 0.015; // 0.025, 0 -> no dash ; 1 -> half dashline length ; 2 -> dashline = length
  //       // this formula will oscillate dash_ratio based on modulus of connectivity between full line and void one
  //       // 0 for full lines, 1.0 for void lines (50% - 50% ratio) (note: -1.0 appears as well)
  //       dash_ratio = 1.0 - (link_connectivity % 2);
  //       clamped_thickness = linewidth_min; // all lines will have the minimal thickness
  //       break;
  //
  //     default:
  //       break;
  //   }
  //
  //   view.addLineMesh(gData.links[i], dash_array, dash_ratio, clamped_thickness, dash_speed) // passing material parameters for meshline
  //   //console.log("Added_linemesh")
  // }

  view.addInstances();
  //view.addNodes();
  //view.addLandscape();
  //view.addNodes(false, false, false, 3);

  view.addStars(); // ordered stars based on lattice nodes
  view.addStars(true, 800, 5000); // random stars - parameters > (random_position, bounds, qty)

  // all celestial objects from the celestial_object_types list will be added here
  if (celestial_object_types[0] != 'none') {
    for (var i = 0; i < celestial_object_types.length; i++) {
      view.addCelestialObject(celestial_object_types[i]);
    }
  }


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



  /*function viewportAdjust() {
    ///ADJUST SIZE AND MARGIN
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
    cam_factor_mod = cam_factor * Math.min(viewportWidth/1000, viewportHeight/1000);
  }*/




  function onWindowResize() {
    //console.log("resize")
    viewportAdjust(document.getElementById('viewport'), viewportWidth, viewportHeight, false);
    fitCameraToViewport(view, viewportWidth, viewportHeight);
    


      ///VIEWPORT SETUP///
    //view.renderer.setSize( window.innerWidth, window.innerHeight);
    //view.composer.setSize( window.innerWidth, window.innerHeight);
    //view.camera.left = -window.innerWidth / cam_factor;
    //view.camera.right = window.innerWidth / cam_factor;
    //view.camera.top = window.innerHeight / cam_factor;
    //view.camera.bottom = -window.innerHeight / cam_factor;
    //view.camera.updateProjectionMatrix();

    //KEEP ASPECT 


  /*  frustumSize = 2000;
    view.camera.left = -frustumSize / cam_factor;
    view.camera.right = frustumSize / cam_factor;
    view.camera.top = frustumSize * view.camera.aspect / cam_factor;
    view.camera.bottom = -frustumSize * view.camera.aspect / cam_factor;
    view.camera.aspect =  window.innerHeight/window.innerWidth;
    view.camera.updateProjectionMatrix();

    view.renderer.setSize( window.innerWidth, window.innerHeight);
    view.composer.setSize( window.innerWidth, window.innerHeight); */
    //console.log(scene)
    }
  
    window.addEventListener( 'resize', onWindowResize );

  if (debug){
    console.timeEnd("controller")
  }
}

function hyprornament () {
  controller = new Controller('viewport');
}


function viewportAdjust(vp, w, h, inner=true) {
  ///ADJUST SIZE AND MARGIN
  if (inner) {
    if (window.innerWidth/aspect_ratio>window.innerHeight) { //If target viewport height is larger then inner height

      h = window.innerHeight; //Force Height to be inner Height
      w = aspect_ratio*window.innerHeight;  //Scale width proportionally
  
      margin_top = 0;
      margin_left = (window.innerWidth - w)/2;
    } else {  //If target viewport width is larger then inner width
  
      h = window.innerWidth/aspect_ratio; //Scale viewport height proportionally
      w = window.innerWidth; //Force Width  to be inner Height
  
      margin_top = (window.innerHeight - h)/2;
      margin_left = 0;

      ///SCALING
      cam_factor_mod = cam_factor * Math.min((w/1000)*quality, (h/1000)*quality);
    }
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

      ///SCALING
      cam_factor_mod = cam_factor * Math.min(viewportWidth/1000, viewportHeight/1000);
    }
  }
  vp.style.marginTop=margin_top+'px';
  vp.style.marginLeft=margin_left+'px';

}

function fitCameraToViewport(view_instance, w,h, adjust=true) {
  view_instance.renderer.setSize( w, h);
  view_instance.composer.setSize( w, h);
  //view_instance.camera.aspect = w / h;
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
      a.download = `OBSCVRVM_${parseInt(Math.random()*10000000)}.gif`;
      a.click();
      URL.revokeObjectURL(url);
      });
      setTimeout(() => {
        capturer = null; //Set capturer back to null after download
      }, 250);
    }, 0);
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
    quality = 2;
  } else if (e.keyCode === 51 || e.keyCode === 99) {// 3 or NumPad 3
    snap = true;
    quality = 3;
  } else if (e.keyCode === 52 || e.keyCode === 100) { // 4 or NumPad 4
    snap = true;
    quality = 4;
  } else if (e.keyCode === 53 || e.keyCode === 101) { // 5 or NumPad 5
    snap = true;
    quality = 5;
  } else if (e.keyCode === 71 ) {  //"g" = Gif
    recording = !recording;
    if(recording){
      //new capturer instance
      capturer = new CCapture( {
        verbose: false,
        display: false,
        //quality: 99,
        //name: variant_name,
        //framerate:,
        //autoSaveTime:, //does not work for gif
        //timeLimit: 10000,
        format: 'gif',
        workersPath: 'js/capture/src/'
      } );
      capturer.start();
      setTimeout(() => {
        if (capturer != null) {
          capturer.stop();
          capturer_custom_save();
        }
      },5000)
    }
    else if (capturer != null) { //If capturer in ongoing and button press the "g" button again
      capturer.stop();
      capturer_custom_save();

    }
  } else if (e.keyCode === 70 ) {  //"f" = increment light travel framerate
    light_framerate_change = findNextValueByValue(light_framerate_change, light_frame_speed_param)
    console.log("light framerate changed to: " + light_framerate_change.toString())
  } else if (e.keyCode === 84 ) {  //"t" = increase travel speed
    base_light_angle_step = findNextValueByValue(base_light_angle_step, light_step_size_param)
    console.log("light angle step changed to: " + base_light_angle_step.toString())
  } else if (e.keyCode === 65 ) {  //"a" = jump light angle by 30 degrees
    light_angle += Math.PI/6; //advance light angle by 30deg
    console.log("Skipped 30degrees")
  } else {
    document.getElementById("keybinding").style.display = "block";
    document.querySelector("#keybinding").style.opacity = 1
    //Load modal with decription for all the keys for few 
    //seconds and make it fade to invisible after a few seconds. 
    //Each additional non active key press restarts the fade out animation
    if (typeof fade !== 'undefined') {
      clearInterval(fade)
      };
    var fade;
    fade = setInterval(function () {
      document.querySelector("#keybinding").style.opacity -= 0.025;
      if (document.querySelector("#keybinding").style.opacity <= 0 ) {
        document.querySelector("#keybinding").style.display = "none";
        clearInterval(fade)
      }
    }, 100);
  }
}



const handler = (e) => {
    hyprornament();
};

//console.log(controller.view)
const capture = (contx) => {
  // Increase the quality
  console.log(aspect_ratio)
  //viewportAdjust(document.getElementById('viewport'), viewportWidth, viewportHeight, false);
  ///DOCSIZE
  document.documentElement.scrollWidth = viewportWidth*quality;
  document.documentElement.scrollHeight = viewportHeight*quality;
  ///SCALING
  cam_factor_mod = cam_factor * Math.min(viewportWidth*quality/1000, viewportHeight*quality/1000);
  ///SetMargin to 0
  document.getElementById('viewport').style.marginTop=0 +'px';
  document.getElementById('viewport').style.marginLeft=0 +'px';
  fitCameraToViewport(contx.view, viewportWidth*quality, viewportHeight*quality, true); //Projection Matrix Updated here

  composer.render();

  try {
    const urlBase64 = renderer.domElement.toDataURL('img/png'); 
    const a = document.createElement("a");
    a.href = urlBase64;
    a.download = `OBSCVRVM_${parseInt(Math.random()*10000000)}.png`;
    a.click();
    URL.revokeObjectURL(urlBase64);
  }  
  catch(e) {
    console.log("Browser does not support taking screenshot of 3d context");
    return;
  }
  
  //console.log(devicePixelRatio)
  ////quality = 1; //Reset Quality
  //renderer.setPixelRatio(window.devicePixelRatio * 1.5);

  ////viewportAdjust(document.getElementById('viewport'), viewportWidth, viewportHeight)
  ////fitCameraToViewport(contx.view, viewportWidth, viewportHeight); //Projection Matrix Updated here
  
  composer.render();
  // Set to standard quality
  
};

// register the capture key handler 
document.addEventListener('keyup', doc_keyUp, false);

document.addEventListener('DOMContentLoaded', () => {
  console.log("Loaded")
  handler();
});
