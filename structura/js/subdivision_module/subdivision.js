const reducer = (accumulator, curr) => accumulator + curr;

class Vector {
  constructor(...components) {
    this.components = components
  }

  add({ components }) {
    return new Vector(
      ...components.map((component, index) => this.components[index] + component)
    )
  }

  subtract({ components }) {
    return new Vector(
      ...components.map((component, index) => this.components[index] - component)
    )
  }

  //multiply
  scaleBy(number) {
    return new Vector(
      ...this.components.map(component => component * number)
    )
  }

  //magnitude
  length() {
  return Math.hypot(...this.components)
  }

  dotProduct({ components }) {
  return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
  }

  crossProduct({ components }) {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }

  //normalized
  normalize() {
  return this.scaleBy(1 / this.length())
  }
}


class Node extends Vector {
  constructor(...components){
    super(...components);
    //this.components = components
    this.id = -1
  }

  toString(){
    return `Node at ${this.components[0]}, ${this.components[1]}, ${this.components[2]}.`
  }
}

class Face {
  constructor(nodes = []) {
    this.nodes = nodes
  }

  add_node(n) {
		this.nodes.push(n)
	}

  get_centroid() {
    let num = this.nodes.length;
    //console.log(this.nodes, typeof(this.nodes))
    const x_values = this.nodes.map(n => n.components[0]);
    let avx = x_values.reduce(reducer) / num;
    const y_values = this.nodes.map(n => n.components[1]);
    let avy = y_values.reduce(reducer) / num;
    const z_values = this.nodes.map(n => n.components[2]);
    let avz = z_values.reduce(reducer) / num;
    return new Node(avx,avy,avz);
  }

  get_normal_of_length(l) {
    let fn = this.get_normal();
    let unit_normal = fn.normalize();
    return unit_normal.scaleBy(l)
  }

  get_normal() {
    let e1 = this.nodes[1].subtract(this.nodes[0]);
    let e2 = this.nodes[this.nodes.length - 1].subtract(this.nodes[0]);
    return e1.crossProduct(e2)
  }

  get_funky_point() {
    let cn = this.get_centroid()
    let betw = cn.subtract(this.nodes[0])
    let betw2 = betw.multiply(0.8)
    return this.nodes[0].addition(betw2)
  }

}

class Mesh {
  constructor() {
    this.nodes = [];
    this.faces = [];
  }

  add_face(f) {
    this.faces.push(f);
  }

  add_faces(facelist){
    this.faces.push(...facelist);
  }

  collect_nodes() {
    for (var f in this.faces) {
      for (var n in f.nodes) {
        if (n.id < 0) {
          this.nodes.push(n);
          n.id = this.nodes.length;
        }
      }
    }
  }
}


function calculate_link_length(source_object, target_object) {
  var source_pt = new THREE.Vector3(source_object.x, source_object.y, source_object.z);
  var target_pt = new THREE.Vector3(target_object.x, target_object.y, target_object.z);
  return source_pt.distanceTo(target_pt);
}


function space_frame_triprism_gData(frame_position, frame_dummy) {

  var origin = frame_position; // frame's position as Vector3, used for translation
  var matrix = frame_dummy.matrix; // frame's transform matrix as Matrix4, used only for rotation

  var source_idx, target_idx, link_length, link_visibility;
  var node_position_z, node_position_y, node_position_z;
  var noise_value_x, noise_value_y, noise_value_z;

  var gData = {'nodes': [], 'links': [], 'joints': [], 'cladding': [], 'mesh': []};
  var node_counter = 0;
  var frame_size_upper_grid = frame_size_x * frame_size_y;

  var node_position;

  // upper rectangle grid - just nodes
  for (var i = 0; i < frame_size_x; i++) {
    for (var j = 0; j < frame_size_y; j++) {

      node_position_x = i * frame_cell_w - ((frame_size_x - 1) * frame_cell_w) / 2.0 + origin.x;
      node_position_y = j * frame_cell_h - ((frame_size_y - 1) * frame_cell_h) / 2.0 + origin.y;
      node_position_z = origin.z + frame_cell_d / 2;

      node_position = new THREE.Vector3(node_position_x, node_position_y, node_position_z);
      node_position.applyMatrix4(matrix);
      node_position_x = node_position.x;
      node_position_y = node_position.y;
      node_position_z = node_position.z;

      noise_value_x = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z);
      noise_value_y = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z + noise_component_offset);
      noise_value_z = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z + noise_component_offset * 2);

      if (modulate_x) {node_position_x += noise_factor * noise_value_x;}
      if (modulate_y) {node_position_y += noise_factor * noise_value_y;}
      if (modulate_z) {node_position_z += noise_factor * noise_value_z;}

      source_idx = node_counter;
      gData['nodes'].push({'id': source_idx, 'connectivity': 0, 'visible': false, 'x': node_position_x, 'y': node_position_y, 'z': node_position_z, 'i': i, 'j': j});
      
      node_counter ++
    }
  }

  var nodes_in_upper_grid = node_counter; // record how many nodes we created in the upper grid
  node_counter = 0; // reset the counter, we need to iterate through the nodes from the beginning

  // upper rectangle grid - just vertical and horizontal links
  for (var i = 0; i < frame_size_x; i++) {
    for (var j = 0; j < frame_size_y; j++) {

      source_idx = node_counter;

      // vertical link
      if (j != frame_size_y - 1) {
        target_idx = node_counter + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[0];
        link_visibility = link_length > cutoff_vert_links ? false : frame_links_visibility[0];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[0], 'state': 0, 'visible': link_visibility, 'type': 'vert'});
      }

      // horizontal link
      if (i != frame_size_x - 1) {
        target_idx = node_counter + frame_size_y;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[1];
        link_visibility = link_length > cutoff_hor_links ? false : frame_links_visibility[1];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[1], 'state': 0, 'visible': link_visibility, 'type': 'hor'});
      }

      // joints - at vertical links
      if (j != frame_size_y - 1) {
        target_idx = node_counter + 1;
        gData['joints'].push({'source': source_idx, 'target': target_idx, 'value': joint_length, 'thickness': joint_thickness_f, 'state': 0, 'visible': joint_visibility});
      } else { // when we come to the top row, we need to point to the previous node, not the next one
        target_idx = node_counter - 1;
        gData['joints'].push({'source': source_idx, 'target': target_idx, 'value': joint_length, 'thickness': joint_thickness_f, 'state': 0, 'visible': joint_visibility});
      }

      // cladding - vertical orientation - upper grid
      if ((j != frame_size_y - 1) && (i != frame_size_x - 1) && (cladding_upper)) {
        source_idx_a = node_counter;
        target_idx_a = node_counter + 1;
        source_idx_b = node_counter + frame_size_y;
        target_idx_b = node_counter + frame_size_y + 1;
        link_length_a = calculate_link_length(gData['nodes'][source_idx_a], gData['nodes'][target_idx_a]) * links_length_reduction[0];
        link_length_b = calculate_link_length(gData['nodes'][source_idx_b], gData['nodes'][target_idx_b]) * links_length_reduction[0];
        cladding_visibility = gene() < cladding_panel_prob ? true : false;
        gData['cladding'].push({'source_a': source_idx_a, 'source_b': source_idx_b, 'target_a': target_idx_a, 'target_b': target_idx_b, 'value_a': link_length_a, 'value_b': link_length_b, 'thickness': cladding_thickness, 'width': cladding_w, 'location': 'upper', 'matrix': frame_dummy.matrix.clone(), 'visible': cladding_visibility});
      }

      node_counter ++
    }
  }

  // lower rectangle grid (smaller by one cell in width and shifted) - just nodes
  for (var i = 0; i < frame_size_x - 1; i++) {
    for (var j = 0; j < frame_size_y; j++) {

      node_position_x = i * frame_cell_w - ((frame_size_x - 1) * frame_cell_w) / 2.0 + origin.x + frame_cell_w / 2.0;
      node_position_y = j * frame_cell_h - ((frame_size_y - 1) * frame_cell_h) / 2.0 + origin.y;
      node_position_z = origin.z - frame_cell_d / 2;

      node_position = new THREE.Vector3(node_position_x, node_position_y, node_position_z);
      node_position.applyMatrix4(matrix);
      node_position_x = node_position.x;
      node_position_y = node_position.y;
      node_position_z = node_position.z;

      noise_value_x = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z);
      noise_value_y = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z + noise_component_offset);
      noise_value_z = perlin3D(node_position_x * noise_scale_x + noise_shift_x, node_position_y * noise_scale_y + noise_shift_y, node_position_z * noise_scale_z + noise_shift_z + noise_component_offset * 2);

      if (modulate_x) {node_position_x += noise_factor * noise_value_x;}
      if (modulate_y) {node_position_y += noise_factor * noise_value_y;}
      if (modulate_z) {node_position_z += noise_factor * noise_value_z;}

      source_idx = node_counter;
      gData['nodes'].push({'id':node_counter, 'connectivity': 0, 'visible': false, 'x': node_position_x, 'y': node_position_y, 'z':node_position_z, 'i': i, 'j': j});
      
      node_counter ++
    }
  }

  node_counter = nodes_in_upper_grid; // move the counter back so we start from the beggining of the lower grid

  // lower rectangle grid (smaller by one cell in width and shifted) - just nodes
  for (var i = 0; i < frame_size_x - 1; i++) {
    for (var j = 0; j < frame_size_y; j++) {

      source_idx = node_counter;

      gData['nodes'].push({'id':node_counter, 'connectivity': 0, 'visible': false, 'x': node_position_x,'y': node_position_y,'z':node_position_z, 'stage': 1});
      
      // vertical link
      if (j != frame_size_y - 1) {
        target_idx = node_counter + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[0];
        link_visibility = link_length > cutoff_vert_links ? false : frame_links_visibility[0];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[0], 'state': 0, 'visible': link_visibility, 'type': 'vert'});
      }

      // horizontal link
      if (i != frame_size_x - 2) {
        target_idx = node_counter + frame_size_y;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[1];
        link_visibility = link_length > cutoff_hor_links ? false : frame_links_visibility[1];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[1], 'state': 0, 'visible': link_visibility, 'type': 'hor'});
      }

      // joints - at vertical links
      if (j != frame_size_y - 1) {
        target_idx = node_counter + 1;
        gData['joints'].push({'source': source_idx, 'target': target_idx, 'value': joint_length, 'thickness': joint_thickness_f, 'state': 0, 'visible': joint_visibility, 'type': 'joint'});
      } else { // when we come to the top row, we need to point to the previous node, not the next one
        target_idx = node_counter - 1;
        gData['joints'].push({'source': source_idx, 'target': target_idx, 'value': joint_length, 'thickness': joint_thickness_f, 'state': 0, 'visible': joint_visibility, 'type': 'joint'});
      }

      // cladding - vertical orientation - lower grid
      if ((j != frame_size_y - 1) && (i != frame_size_x - 1) && (cladding_lower)) {
        source_idx_a = node_counter;
        target_idx_a = node_counter + 1;
        source_idx_b = node_counter + frame_size_y;
        target_idx_b = node_counter + frame_size_y + 1;
        link_length_a = calculate_link_length(gData['nodes'][source_idx_a], gData['nodes'][target_idx_a]) * links_length_reduction[0];
        link_length_b = calculate_link_length(gData['nodes'][source_idx_b], gData['nodes'][target_idx_b]) * links_length_reduction[0];
        cladding_visibility = gene() < cladding_panel_prob ? true : false;
        gData['cladding'].push({'source_a': source_idx_a, 'source_b': source_idx_b, 'target_a': target_idx_a, 'target_b': target_idx_b, 'value_a': link_length_a, 'value_b': link_length_b, 'thickness': cladding_thickness, 'width': cladding_w, 'location': 'lower', 'matrix': frame_dummy.matrix.clone(), 'visible': cladding_visibility});
      }

      // cladding - vertical orientation - left side
      if ((i == 0) && (j != frame_size_y - 1) && (cladding_left)) {
        source_idx_a = node_counter;
        target_idx_a = node_counter + 1;
        source_idx_b = node_counter - frame_size_upper_grid;
        target_idx_b = node_counter - frame_size_upper_grid + 1;
        link_length_a = calculate_link_length(gData['nodes'][source_idx_a], gData['nodes'][target_idx_a]) * links_length_reduction[0];
        link_length_b = calculate_link_length(gData['nodes'][source_idx_b], gData['nodes'][target_idx_b]) * links_length_reduction[0];
        cladding_visibility = gene() < cladding_panel_prob ? true : false;
        gData['cladding'].push({'source_a': source_idx_a, 'source_b': source_idx_b, 'target_a': target_idx_a, 'target_b': target_idx_b, 'value_a': link_length_a, 'value_b': link_length_b, 'thickness': cladding_thickness, 'width': cladding_w, 'location': 'left', 'matrix': frame_dummy.matrix.clone(), 'visible': cladding_visibility});
      }

      // cladding - vertical orientation - right side
      if ((i == frame_size_x - 2) && (j != frame_size_y - 1) && (cladding_right)) {
        source_idx_a = node_counter;
        target_idx_a = node_counter + 1;
        source_idx_b = node_counter - frame_size_upper_grid + frame_size_y;
        target_idx_b = node_counter - frame_size_upper_grid + frame_size_y + 1;
        link_length_a = calculate_link_length(gData['nodes'][source_idx_a], gData['nodes'][target_idx_a]) * links_length_reduction[0];
        link_length_b = calculate_link_length(gData['nodes'][source_idx_b], gData['nodes'][target_idx_b]) * links_length_reduction[0];
        cladding_visibility = gene() < cladding_panel_prob ? true : false;
        gData['cladding'].push({'source_a': source_idx_a, 'source_b': source_idx_b, 'target_a': target_idx_a, 'target_b': target_idx_b, 'value_a': link_length_a, 'value_b': link_length_b, 'thickness': cladding_thickness, 'width': cladding_w, 'location': 'right', 'matrix': frame_dummy.matrix.clone(), 'visible': cladding_visibility});
      }

      node_counter ++
    }
  }

  node_counter = 0; // reset the node counter as we will be iterating from the first node to create the cross-links

  // cross-links between rectangular grids
  for (var i = 0; i < frame_size_x; i++) {
    for (var j = 0; j < frame_size_y; j++) {

      source_idx = node_counter;

      // cross-link a
      if (i != frame_size_x - 1) {
        target_idx = node_counter + frame_size_upper_grid;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[2];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[2], 'state': 0, 'visible': frame_links_visibility[2], 'type': 'a'});
      }

      // cross-link b
      if (i != 0) {
        target_idx = node_counter + frame_size_upper_grid - frame_size_y;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[3];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[3], 'state': 0, 'visible': frame_links_visibility[3], 'type': 'b'});
      }

      // cross-link c
      if ((i != frame_size_x - 1) && (j != frame_size_y - 1) && !((j % 2 == 0) && alternating_cd_ef)) {
        target_idx = node_counter + frame_size_upper_grid + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[4];
        link_visibility = link_length > cutoff_cdef_links ? false : frame_links_visibility[4];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[4], 'state': 0, 'visible': link_visibility, 'type': 'c'});
        //detail part - at cross-link c in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[4] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_c'});
      }

      // cross-link d
      if ((i != 0) && (j != frame_size_y - 1) && !((j % 2 == 0) && alternating_cd_ef)) {
        target_idx = node_counter + frame_size_upper_grid - frame_size_y + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[5];
        link_visibility = link_length > cutoff_cdef_links ? false : frame_links_visibility[5];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[5], 'state': 0, 'visible': link_visibility, 'type': 'd'});
        //detail part - at cross-link d in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[5] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_d'});
      }

      // cross-link e
      if ((j != 0) && (i != frame_size_x - 1) && !((j % 2 == 0) && alternating_cd_ef)) {
        target_idx = node_counter + frame_size_upper_grid - 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[6];
        link_visibility = link_length > cutoff_cdef_links ? false : frame_links_visibility[6];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[6], 'state': 0, 'visible': link_visibility, 'type': 'e'});
        //detail part - at cross-link e in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[6] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_e'});
      }

      // cross-link f
      if ((j != 0) && (i != 0) && !((j % 2 == 0) && alternating_cd_ef)) {
        target_idx = node_counter + frame_size_upper_grid - frame_size_y - 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]) * links_length_reduction[7];
        link_visibility = link_length > cutoff_cdef_links ? false : frame_links_visibility[7];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[7], 'state': 0, 'visible': link_visibility, 'type': 'f'});
        //detail part - at cross-link f in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[7] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_f'});
      }


      var pattern_condition;

      // cross-link g_u (upper grid)
      if (alternating_gu_hu_pattern == 1) {pattern_condition = (i < frame_size_x - 1) && (j < frame_size_y - 1) && !((i % 2 == j % 2) && alternating_gu_hu);} // large diagrid (default pattern is dense diagrid)
      if (alternating_gu_hu_pattern == 2) {pattern_condition = (i < frame_size_x - 1) && (j < frame_size_y - 1) && !((i % 2 == 0) && alternating_gu_hu);} // triangles pointing up-down
      if (alternating_gu_hu_pattern == 3) {pattern_condition = (i < frame_size_x - 1) && (j < frame_size_y - 1) && !((i % 2 == 1) && alternating_gu_hu);} // mirrored image of the above pattern
      if (alternating_gu_hu_pattern == 4) {pattern_condition = (i < frame_size_x - 1) && (j < frame_size_y - 1) && !((j % 2 == 0) && alternating_gu_hu);} // triangles pointing left-right
      if (alternating_gu_hu_pattern == 5) {pattern_condition = (i < frame_size_x - 1) && (j < frame_size_y - 1) && !((j % 2 == 1) && alternating_gu_hu);} // mirrored image of the above pattern

      if (pattern_condition){
        target_idx = node_counter + frame_size_y + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]);
        link_visibility = link_length > cutoff_gh_links ? false : frame_links_visibility[8];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[8], 'state': 0, 'visible': link_visibility, 'type': 'g_u'});
        //detail part - at cross-link g_u (upper grid) in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[8] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_g_u'});
      }

      // cross-link h_u (upper grid)
      if (alternating_gu_hu_pattern == 1) {pattern_condition = (i < frame_size_x - 1) && !((i % 2 == j % 2) && alternating_gu_hu);} // large diagrid (default pattern is dense diagrid)
      if (alternating_gu_hu_pattern == 2) {pattern_condition = (i < frame_size_x - 1) && !((i % 2 == 1) && alternating_gu_hu);} // triangles pointing up-down
      if (alternating_gu_hu_pattern == 3) {pattern_condition = (i < frame_size_x - 1) && !((i % 2 == 0) && alternating_gu_hu);} // mirrored image of the above pattern
      if (alternating_gu_hu_pattern == 4) {pattern_condition = (i < frame_size_x - 1) && !((j % 2 == 0) && alternating_gu_hu);} // triangles pointing left-right
      if (alternating_gu_hu_pattern == 5) {pattern_condition = (i < frame_size_x - 1) && !((j % 2 == 1) && alternating_gu_hu);} // mirrored image of the above pattern

      if (pattern_condition) {
        target_idx = node_counter + frame_size_y - 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]);
        link_visibility = link_length > cutoff_gh_links ? false : frame_links_visibility[9];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[9], 'state': 0, 'visible': link_visibility, 'type': 'h_u'});
        //detail part - at cross-link h_u (upper grid) in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[9] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_h_u'});
      }



      // cross-link g_l (lower grid)
      if (alternating_gl_hl_pattern == 1) {pattern_condition = (i < frame_size_x - 2) && (j < frame_size_y - 1) && !((i % 2 == j % 2) && alternating_gl_hl);} // large diagrid (default pattern is dense diagrid)
      if (alternating_gl_hl_pattern == 2) {pattern_condition = (i < frame_size_x - 2) && (j < frame_size_y - 1) && !((i % 2 == 0) && alternating_gl_hl);} // triangles pointing up-down
      if (alternating_gl_hl_pattern == 3) {pattern_condition = (i < frame_size_x - 2) && (j < frame_size_y - 1) && !((i % 2 == 1) && alternating_gl_hl);} // mirrored image of the above pattern
      if (alternating_gl_hl_pattern == 4) {pattern_condition = (i < frame_size_x - 2) && (j < frame_size_y - 1) && !((j % 2 == 0) && alternating_gl_hl);} // triangles pointing left-right
      if (alternating_gl_hl_pattern == 5) {pattern_condition = (i < frame_size_x - 2) && (j < frame_size_y - 1) && !((j % 2 == 1) && alternating_gl_hl);} // mirrored image of the above pattern

      if (pattern_condition){
        source_idx = node_counter + frame_size_upper_grid;
        target_idx = node_counter + frame_size_upper_grid + frame_size_y + 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]);
        link_visibility = link_length > cutoff_gh_links ? false : frame_links_visibility[10];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[10], 'state': 0, 'visible': link_visibility, 'type': 'g_l'});
        //detail part - at cross-link g_l (lower grid) in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[10] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_g_l'});
      }

      // cross-link h_l (lower grid)
      if (alternating_gl_hl_pattern == 1) {pattern_condition = (i < frame_size_x - 2) && !((i % 2 == j % 2) && alternating_gl_hl);} // large diagrid (default pattern is dense diagrid)
      if (alternating_gl_hl_pattern == 2) {pattern_condition = (i < frame_size_x - 2) && !((i % 2 == 1) && alternating_gl_hl);} // triangles pointing up-down
      if (alternating_gl_hl_pattern == 3) {pattern_condition = (i < frame_size_x - 2) && !((i % 2 == 0) && alternating_gl_hl);} // mirrored image of the above pattern
      if (alternating_gl_hl_pattern == 4) {pattern_condition = (i < frame_size_x - 2) && !((j % 2 == 0) && alternating_gl_hl);} // triangles pointing left-right
      if (alternating_gl_hl_pattern == 5) {pattern_condition = (i < frame_size_x - 2) && !((j % 2 == 1) && alternating_gl_hl);} // mirrored image of the above pattern

      if (pattern_condition) {
        source_idx = node_counter + frame_size_upper_grid;
        target_idx = node_counter + frame_size_upper_grid + frame_size_y - 1;
        link_length = calculate_link_length(gData['nodes'][source_idx], gData['nodes'][target_idx]);
        link_visibility = link_length > cutoff_gh_links ? false : frame_links_visibility[11];
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': link_length, 'thickness': frame_links_thickness[11], 'state': 0, 'visible': link_visibility, 'type': 'h_l'});
        //detail part - at cross-link h_l (lower grid) in the middle
        var tightener_length = link_length * tightener_length_reduction;
        gData['links'].push({'source': source_idx, 'target': target_idx, 'value': tightener_length, 'thickness': frame_links_thickness[11] * tightener_thickness_f, 'state': 0, 'visible': link_visibility, 'type': 'tightener_h_l'});
      }


      node_counter ++
    }
  }

  return gData;
}