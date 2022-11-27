/**
 * @author @LukaPiskorec
 */

THREE.MosaicShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },

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
		"varying vec2 vUv;",

		"void main() {",

			//condition for square doted pattern
			//((x == 0 && y == 0) || (x == 0 && y == 1) || (x == 1 && y == 0) || (x == 1 && y == 1))
			//condition for vertical lines pattern
			//(x == 0 || x == 1)
			//condition for horizontal lines pattern
			//(y == 0 || y == 1)

			"vec2 xy = gl_FragCoord.xy;",
			"int x = int(mod(xy.x, 4.0));",
			"int y = int(mod(xy.y, 4.0));",

			//line or dot pattern
			"if (y == 0 || y == 1) {",
				"vec4 texel = texture2D( tDiffuse, vUv );",
				"gl_FragColor = texel;",
			"} else {",
				"vec4 texel = vec4(0.0, 0.0, 0.0, 1.0);",
				"gl_FragColor = texel;",
			"}",

		"}"

	].join("\n")

};
