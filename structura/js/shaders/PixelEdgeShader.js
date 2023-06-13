/*
import {
	Vector2
} from './three.module.js';
*/
// custom shader template for threejs

// written by Galo Canizares aka itsgalo @GaloAndStuff

( function () {
const PixelEdgeShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'resolution': { value: new THREE.Vector2() }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		//simple noise
		float rand(vec2 n) { 
			return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
		}
		
		float noise(vec2 p){
			vec2 ip = floor(p);
			vec2 u = fract(p);
			u = u*u*(3.0-2.0*u);
			
			float res = mix(
				mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
				mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
			return res*res;
		}

		float blugausnoise(vec2 c1) {

			vec3 cx = c1.x+ vec3(-1,0,1);
			vec4 f0 = fract(vec4(cx* 9.1031,c1.y* 8.1030));
			vec4 f1 = fract(vec4(cx* 7.0973,c1.y* 6.0970));
			vec4 t0 = vec4(f0.xw,f1.xw);//fract(c0.xyxy* vec4(.1031,.1030,.0973,.0970));
			vec4 t1 = vec4(f0.yw,f1.yw);//fract(c1.xyxy* vec4(.1031,.1030,.0973,.0970));
			vec4 t2 = vec4(f0.zw,f1.zw);//fract(c2.xyxy* vec4(.1031,.1030,.0973,.0970));
			vec4 p0 = t0+ dot(t0,t0.wzxy+ 19.19);
			vec4 p1 = t1+ dot(t1,t1.wzxy+ 19.19);
			vec4 p2 = t2+ dot(t2,t2.wzxy+ 19.19);
			vec4 n0 = fract(p0.zywx* (p0.xxyz+ p0.yzzw));
			vec4 n1 = fract(p1.zywx* (p1.xxyz+ p1.yzzw));
			vec4 n2 = fract(p2.zywx* (p2.xxyz+ p2.yzzw));
		
			return dot(0.5* n1- 0.125* (n0+ n2),vec4(0.5));
		}

		void main() {
      			//set texel to single pixel
			vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );

			vec2 uv = gl_FragCoord.xy;
			vec3 noiseColors = vec3(blugausnoise(uv));

			//get the image
			vec4 color = texture2D(tDiffuse, vUv);

			vec4 texRight = texture2D(tDiffuse, vUv+vec2(texel.x, 0.0));
			vec4 texBottom = texture2D(tDiffuse, vUv+vec2(0.0, texel.y));
			float dx = length(color-texRight) / texel.x;
			float dy = length(color-texBottom) / texel.y;
		  
			float threshold = sqrt(pow(dx,2.0) + pow(dy,2.0)) * 0.004;
		  
			if(threshold > 0.6) {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
			} else {
			  //gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
				gl_FragColor = vec4(color.rgb+noiseColors, 1.0);
			}

		}`

};

THREE.PixelEdgeShader = PixelEdgeShader;

} )();
//export { PixelEdgeShader };