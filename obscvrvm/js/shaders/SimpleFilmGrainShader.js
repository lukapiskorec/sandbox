/**
 * @author @lukapiskorec
 * originally from https://www.shadertoy.com/view/3sGGRz
 */

THREE.SimpleFilmGrainShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
    "tint":    { type: "v4", value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0) },

	},

	vertexShader: [

		"varying vec2 vUv;",
		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
    "uniform vec4 tint;",
		"varying vec2 vUv;",

		"void main() {",

			"vec4 tex = texture2D( tDiffuse, vUv );",

			// Calculate noise and sample texture
			"float noise = (fract(sin(dot(vUv, vec2(12.9898,78.233)*2.0)) * 43758.5453));",
			"vec4 col = tex - noise * 0.2;", // multiply noise with the factor for grain intensity

      // Calculate paper tint color
      "vec4 tint_col = mix(col, tint, 0.05);", // define mix ratio for the color of the paper

      // Calculate vignette
      // https://www.shadertoy.com/view/lsKSWR
      "vec2 uv =  vUv * (vec2(1.0) - vUv.yx);",
      "float vig = uv.x * uv.y * 50.0;", // 15.0, multiply with something for vignette intensity
      "vig = 1.0 - pow(vig, 0.08);", // 0.25, change pow for modifying the extend of the vignette
      "vec4 vig_tint_col = tint_col - vec4(vig);",

			// Output to screen
			"gl_FragColor = vig_tint_col;",

		"}"

	].join("\n")

};
