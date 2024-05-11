import{U as p,z as b,as as P,at as I,au as N,av as D,aw as F,ax as R,ay as A,az as U,a as S,W as x,H as C,n as z,C as h,aa as L,I as T,R as O,p as G,B as H,a2 as B,t as X,ar as g}from"./OrbitControls-9c9ee6bc.js";import{M as K,R as Q}from"./index-1453e2ee.js";import{D as k}from"./index-4ec0cc76.js";import{g as w}from"./index-4db78ffb.js";import{P as M,F as _,R as W,S as Y,E as j}from"./RenderPass-5ccd0f1e.js";import{_ as J}from"./_plugin-vue_export-helper-c27b6911.js";import{g as V,h as Z,o as $,c as q,b as d,u as v,p as ee,i as te}from"./index-9ee60282.js";import"./lil-gui.module.min-f00c3c61.js";const ie="/sayhello-site/assets/SuzanneModel-b2e855de.glb",se="/sayhello-site/assets/HuoJianModel-8b394a47.glb",ae="/sayhello-site/assets/CameraModel-cd53b5eb.glb",oe="/sayhello-site/assets/gradient-ad0fa16e.png",ne={name:"FilmShader",uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:.5},grayscale:{value:!1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		uniform float intensity;
		uniform bool grayscale;
		uniform float time;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			float noise = rand( fract( vUv + time ) );

			vec3 color = base.rgb + base.rgb * clamp( 0.1 + noise, 0.0, 1.0 );

			color = mix( base.rgb, color, intensity );

			if ( grayscale ) {

				color = vec3( luminance( color ) ); // assuming linear-srgb

			}

			gl_FragColor = vec4( color, base.a );

		}`};class re extends M{constructor(e=.5,t=!1){super();const i=ne;this.uniforms=p.clone(i.uniforms),this.material=new b({name:i.name,uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.uniforms.intensity.value=e,this.uniforms.grayscale.value=t,this.fsQuad=new _(this.material)}render(e,t,i,s){this.uniforms.tDiffuse.value=i.texture,this.uniforms.time.value+=s,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const le={name:"FocusShader",uniforms:{tDiffuse:{value:null},screenWidth:{value:1024},screenHeight:{value:1024},sampleDistance:{value:.94},waveFactor:{value:.00125}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float screenWidth;
		uniform float screenHeight;
		uniform float sampleDistance;
		uniform float waveFactor;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 color, org, tmp, add;
			float sample_dist, f;
			vec2 vin;
			vec2 uv = vUv;

			add = color = org = texture2D( tDiffuse, uv );

			vin = ( uv - vec2( 0.5 ) ) * vec2( 1.4 );
			sample_dist = dot( vin, vin ) * 2.0;

			f = ( waveFactor * 100.0 + sample_dist ) * sampleDistance * 4.0;

			vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2( f );

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.111964, 0.993712 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.846724, 0.532032 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.943883, -0.330279 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.330279, -0.943883 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.532032, -0.846724 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.993712, -0.111964 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.707107, 0.707107 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			color = color * vec4( 2.0 ) - ( add / vec4( 8.0 ) );
			color = color + ( add / vec4( 8.0 ) - color ) * ( vec4( 1.0 ) - vec4( sample_dist * 0.5 ) );

			gl_FragColor = vec4( color.rgb * color.rgb * vec3( 0.95 ) + color.rgb, 1.0 );

		}`},ue={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ce extends M{constructor(){super();const e=ue;this.uniforms=p.clone(e.uniforms),this.material=new P({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new _(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},I.getTransfer(this._outputColorSpace)===N&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===D?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===F?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===R?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===A?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===U&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const y={name:"ConvolutionShader",defines:{KERNEL_SIZE_FLOAT:"25.0",KERNEL_SIZE_INT:"25"},uniforms:{tDiffuse:{value:null},uImageIncrement:{value:new S(.001953125,0)},cKernel:{value:[]}},vertexShader:`

		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float cKernel[ KERNEL_SIZE_INT ];

		uniform sampler2D tDiffuse;
		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vec2 imageCoord = vUv;
			vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );

			for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {

				sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];
				imageCoord += uImageIncrement;

			}

			gl_FragColor = sum;

		}`,buildKernel:function(n){let t=2*Math.ceil(n*3)+1;t>25&&(t=25);const i=(t-1)*.5,s=new Array(t);let a=0;for(let o=0;o<t;++o)s[o]=de(o-i,n),a+=s[o];for(let o=0;o<t;++o)s[o]/=a;return s}};function de(n,e){return Math.exp(-(n*n)/(2*e*e))}class u extends M{constructor(e=1,t=25,i=4){super(),this.renderTargetX=new x(1,1,{type:C}),this.renderTargetX.texture.name="BloomPass.x",this.renderTargetY=new x(1,1,{type:C}),this.renderTargetY.texture.name="BloomPass.y",this.combineUniforms=p.clone(m.uniforms),this.combineUniforms.strength.value=e,this.materialCombine=new b({name:m.name,uniforms:this.combineUniforms,vertexShader:m.vertexShader,fragmentShader:m.fragmentShader,blending:z,transparent:!0});const s=y;this.convolutionUniforms=p.clone(s.uniforms),this.convolutionUniforms.uImageIncrement.value=u.blurX,this.convolutionUniforms.cKernel.value=y.buildKernel(i),this.materialConvolution=new b({name:s.name,uniforms:this.convolutionUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}}),this.needsSwap=!1,this.fsQuad=new _(null)}render(e,t,i,s,a){a&&e.state.buffers.stencil.setTest(!1),this.fsQuad.material=this.materialConvolution,this.convolutionUniforms.tDiffuse.value=i.texture,this.convolutionUniforms.uImageIncrement.value=u.blurX,e.setRenderTarget(this.renderTargetX),e.clear(),this.fsQuad.render(e),this.convolutionUniforms.tDiffuse.value=this.renderTargetX.texture,this.convolutionUniforms.uImageIncrement.value=u.blurY,e.setRenderTarget(this.renderTargetY),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCombine,this.combineUniforms.tDiffuse.value=this.renderTargetY.texture,a&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this.clear&&e.clear(),this.fsQuad.render(e)}setSize(e,t){this.renderTargetX.setSize(e,t),this.renderTargetY.setSize(e,t)}dispose(){this.renderTargetX.dispose(),this.renderTargetY.dispose(),this.materialCombine.dispose(),this.materialConvolution.dispose(),this.fsQuad.dispose()}}const m={name:"CombineShader",uniforms:{tDiffuse:{value:null},strength:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float strength;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = strength * texel;

		}`};u.blurX=new S(.001953125,0);u.blurY=new S(0,.001953125);class me extends K{constructor(e){super(e),this.scene.background=new h(855073),this.scene.fog=new L(855073,5e-4),this.renderer.instance.setClearColor(855073),this.renderer.instance.autoClear=!1,this.camera.instance.fov=75,this.camera.instance.near=1,this.camera.instance.far=5e4,this.camera.instance.position.set(0,0,1e3),this.camera.controls.enabled=!1,this.mouseX=0,this.mouseY=0,this.initRender(),this.initSetting(),this.initPost(),this.initAssets(()=>{this.initModel(),document.body.addEventListener("pointermove",t=>{this.onPointerMove(t)})})}initPost(){const e=new W(this.scene,this.camera.instance),t=new re,i=new Y(le);i.uniforms.screenWidth.value=window.innerWidth*window.devicePixelRatio,i.uniforms.screenHeight.value=window.innerHeight*window.devicePixelRatio;const s={strength:.75,radius:.42,threshold:.2,exposure:1,sampleDistance:5},a=new u(.85),o=new ce;if(o.renderToScreen=!0,this.composer=new j(this.renderer.instance),this.composer.addPass(e),this.composer.addPass(a),this.composer.addPass(t),this.composer.addPass(i),this.composer.addPass(o),this.renderer.postprocessing=!0,this.renderer.composer=this.composer,this.debug.active){const r=this.debug.instance.addFolder("post");r.add(s,"strength",0,3,.01).onChange(l=>{a.strength=Number(l)}),r.add(s,"radius",0,1,.01).onChange(l=>{a.radius=Number(l)}),r.add(s,"threshold",0,1,.01).onChange(l=>{a.threshold=Number(l)}),r.add(s,"exposure",.1,2,.01).onChange(l=>{this.renderer.instance.toneMappingExposure=Math.pow(l,4)})}}initRender(){this.renderer.instance.outputColorSpace=T}initSetting(){this.debug=new k(!1)}initAssets(e){let t=new Q({});t.loadAll([{type:"GLTF",name:"CameraModel",path:ae},{type:"GLTF",name:"SuzanneModel",path:ie},{type:"GLTF",name:"HuoJianModel",path:se},{type:"Texture",name:"particleTexture",path:oe}]),t.on("onLoad",()=>{e&&e()}),this.assets=t}initModel(){let e=this.assets.getResource("CameraModel").scene.getObjectByName("CameraModel"),t=this.assets.getResource("SuzanneModel").scene.getObjectByName("SuzanneModel"),i=this.assets.getResource("HuoJianModel").scene.getObjectByName("HuoJianModel");this.model={CameraModel:e,SuzanneModel:t,HuoJianModel:i},this.particleNumber=Math.max(e.geometry.getAttribute("position").count,t.geometry.getAttribute("position").count,i.geometry.getAttribute("position").count),this.currentCompleteNumber=0,this.currentModel=null,this.clickEnable=!1;let[s,a]=this.createParticle();w.to(s.rotation,{y:2*Math.PI,duration:5,ease:"none",onComplete:()=>{this.clickEnable=!0,this.toggleModel()}})}toggleModel(e="HuoJianModel"){if(this.currentModel===e||!this.clickEnable)return!1;this.currentModel=e,this.clickEnable=!1,this.currentCompleteNumber=0;let t=this.points,i=this.position,s=this.model,a=t.geometry.getAttribute("position"),o=s[e].geometry.getAttribute("position");for(let r=0;r<a.count;r++){const l=r%o.count;w.to(i,{[r*3]:o.array[l*3],[r*3+1]:o.array[l*3+1],[r*3+2]:o.array[l*3+2],duration:1*Math.random(),delay:Math.random()*1,ease:"power3.out",onUpdate:()=>{a.needsUpdate=!0},onComplete:()=>{this.currentCompleteNumber++,this.currentCompleteNumber>=this.particleNumber&&(this.clickEnable=!0)}})}}createParticle(){let e=this.assets.getResource("particleTexture");e.colorSpace=T,e.wrapS=e.wrapT=O;const t=new G({color:new h("#e5eeff"),map:e,alphaMap:e,sizeAttenuation:!0,transparent:!0,depthTest:!1,size:5}),i=this.particleNumber,s=new H,a=new Float32Array(i*3);for(let c=0;c<i;c++){var o=g.randFloatSpread(2e3),r=g.randFloatSpread(2e3),l=g.randFloatSpread(22e3);a[c]=o,a[c+1]=r,a[c+2]=l}s.setAttribute("position",new B(a,3));const f=new X(s,t);return this.scene.add(f),this.position=a,this.points=f,this.debug.active&&this.debug.instance.addFolder("point material").addColor(t,"color").onChange(E=>{t.color=new h(E)}),[f,a]}onPointerMove(e){if(e.isPrimary===!1)return!1;this.mouseX=e.clientX-window.innerWidth/2,this.mouseY=e.clientY-window.innerHeight/2}update(){super.update(),this.stats&&this.stats.update(),this.camera.instance.position.x-=(this.mouseX+this.camera.instance.position.x*2)*.05,this.camera.instance.position.y-=(-this.mouseY+this.camera.instance.position.y)*.001,this.camera.instance.lookAt(this.scene.position)}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const pe=n=>(ee("data-v-2452fa63"),n=n(),te(),n),fe={class:"particle-wrap"},he=pe(()=>d("canvas",{id:"canvas"},null,-1)),ge={class:"btn-group"},ve={__name:"particle01-model",setup(n){let e=null;return V(()=>{e=new me(document.getElementById("canvas"))}),Z(()=>{e&&e.destroy()}),(t,i)=>($(),q("div",fe,[he,d("div",ge,[d("div",{class:"btn",onClick:i[0]||(i[0]=s=>v(e).toggleModel("HuoJianModel"))},"火箭"),d("div",{class:"btn",onClick:i[1]||(i[1]=s=>v(e).toggleModel("CameraModel"))},"摄像机"),d("div",{class:"btn",onClick:i[2]||(i[2]=s=>v(e).toggleModel("SuzanneModel"))},"猴头")])]))}},ye=J(ve,[["__scopeId","data-v-2452fa63"]]);export{ye as default};
