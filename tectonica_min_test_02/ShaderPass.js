!function(){class e extends THREE.Pass{constructor(e,r){super(),this.textureID=void 0!==r?r:"tDiffuse",e instanceof THREE.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=THREE.UniformsUtils.clone(e.uniforms),this.material=new THREE.ShaderMaterial({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new THREE.FullScreenQuad(this.material)}render(e,r,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}}THREE.ShaderPass=e}();