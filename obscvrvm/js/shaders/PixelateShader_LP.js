/**
 * @author @oosmoxiecode
 */

THREE.PixelateShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"size":    { type: "v2", value: new THREE.Vector2( 512, 512 ) },
		"pixelSize":{ type: "f", value: 1000.0 } // inversed, small number large pixels, large number small pixels.

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform vec2 size;",
		"uniform sampler2D tDiffuse;",
		"uniform float pixelSize;",

		"varying vec2 vUv;",

		"void main() {",

			//original PixelateShader
			//"vec2 uv = gl_FragCoord.xy / size.xy;",
			//"vec2 div = vec2(size.x * pixelSize / size.y, pixelSize);",
			//"uv = floor(uv * div)/div;",
			//"gl_FragColor = texture2D(tDiffuse, uv);",


			"vec2 uv = gl_FragCoord.xy / size.xy;",
			"vec2 div = vec2(size.x * pixelSize / size.y, pixelSize);",
			"uv = floor(uv * div)/div;",

			//"vec4 color = vec4(texture2D(tDiffuse, uv));",
			"vec4 lum = vec4(0.299, 0.587, 0.114, 0.0);",
			"float grayscale = dot(texture2D(tDiffuse, uv), lum);",

			"if (grayscale > 0.05) {",
				"gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
			"} else {",
				"gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
			"}",

			//"gl_FragColor = color;",




		"}"

	].join("\n")

};
