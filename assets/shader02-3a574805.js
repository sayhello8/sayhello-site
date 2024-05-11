import{C as a,l as u,z as l,D as d,a as c,b as m}from"./OrbitControls-9c9ee6bc.js";import{M as v,R as p}from"./index-1453e2ee.js";import{D as h}from"./index-4ec0cc76.js";import{s as f}from"./stats.module-077ce25d.js";import{f as y}from"./flag-5ab43538.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{g,h as x,o as w,c as P}from"./index-9ee60282.js";import"./lil-gui.module.min-f00c3c61.js";const b=`uniform sampler2D uTexture;\r
varying vec2 vUv;\r
varying float vElevation;\r
void main() {\r
    // 纹理\r
    vec4 textureColor = texture2D(uTexture, vUv);\r
    // 调整\r
    textureColor.rgb *= vElevation * 2.0 + 0.5;\r
    gl_FragColor = textureColor;\r
}`,M=`uniform vec2 uFrequency;\r
uniform float uTime;\r
\r
varying float vElevation;// 提升\r
varying vec2 vUv;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    // 构建波浪上下起伏\r
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.3;\r
    elevation += sin(modelPosition.z * uFrequency.y - uTime) * 0.3;\r
    modelPosition.y += elevation;\r
\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
\r
    vUv = uv;\r
    vElevation = elevation;\r
}`;class F extends v{constructor(e){super(e),this.camera.instance.position.set(31.654053063076066,18.17832104360899,31.654053063096544),this.scene.background=new a("#000000"),this.init()}async init(){this.initSetting(),await this.initAssets(),this.initModel()}initSetting(){this.debug=new h(!0),this.stats=new f,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initAssets(){return new Promise(e=>{this.assets=new p,this.assets.loadAll([{type:"Texture",name:"flag",path:y}]),this.assets.on("onLoad",()=>{e()})})}initModel(){let e=new u(20,20,20,20),o=this.assets.getResource("flag"),t=new l({vertexShader:M,fragmentShader:b,side:d,transparent:!0,uniforms:{uFrequency:{value:new c(100,50)},uTime:{value:0},uTexture:{value:o}}}),n=new m(e,t);n.scale.set(1,.5,1),n.rotateX(-Math.PI/2),this.scene.add(n);const s=this.debug.instance.addFolder("uFrequency");s.add(t.uniforms.uFrequency.value,"x",-100,200,.01),s.add(t.uniforms.uFrequency.value,"y",0,100,.01),this.time.on("tick",(S,i)=>{t.uniforms.uTime.value=i})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const T={id:"canvas"},C={__name:"shader02",setup(r){let e=null;return g(()=>{e=new F(document.getElementById("canvas"))}),x(()=>{e&&e.destroy()}),(o,t)=>(w(),P("canvas",T))}},I=_(C,[["__scopeId","data-v-8b336f5a"]]);export{I as default};
