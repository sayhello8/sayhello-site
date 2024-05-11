import{l as m,a2 as u,z as c,D as l,a as p,b as v}from"./OrbitControls-9c9ee6bc.js";import{M as f}from"./index-1453e2ee.js";import{D as h}from"./index-4ec0cc76.js";import{s as _}from"./stats.module-077ce25d.js";import{_ as y}from"./_plugin-vue_export-helper-c27b6911.js";import{g as x,h as g,o as P,c as M}from"./index-9ee60282.js";import"./lil-gui.module.min-f00c3c61.js";const b=`// precision mediump float;\r
varying float vRandom;\r
void main() {\r
    gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);\r
}`,w=`// uniform mat4 projectionMatrix;\r
// uniform mat4 viewMatrix;\r
// uniform mat4 modelMatrix;\r
\r
// attribute vec3 position;\r
attribute float aRandom;\r
varying float vRandom;\r
uniform vec2 uFrequency;\r
uniform float uTime;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    modelPosition.x += sin(modelPosition.x * uFrequency.x + uTime);\r
    modelPosition.x += sin(modelPosition.z * uFrequency.x + uTime);\r
    modelPosition.z += sin(modelPosition.z * uFrequency.x + uTime);\r
    modelPosition.y += aRandom * 2.0 + sin(uTime) * aRandom;\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
    vRandom = aRandom;\r
}`;class F extends f{constructor(e){super(e),this.camera.instance.position.set(31.654053063076066,18.17832104360899,31.654053063096544),this.initSetting(),this.initModel()}initSetting(){this.debug=new h(!0),this.stats=new _,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){let e=new m(20,20,20,20);const n=e.attributes.position.count,i=new Float32Array(n);for(let o=0;o<n;o++)i[o]=Math.random();e.setAttribute("aRandom",new u(i,1));let s=new c({vertexShader:w,fragmentShader:b,side:l,uniforms:{uFrequency:{value:new p(100,50)},uTime:{value:0}}}),t=new v(e,s);t.rotateX(-Math.PI/2),this.scene.add(t);const a=this.debug.instance.addFolder("uFrequency");a.add(t.material.uniforms.uFrequency.value,"x",-100,200,.01),a.add(t.material.uniforms.uFrequency.value,"y",0,100,.01),this.time.on("tick",(o,d)=>{t.material.uniforms.uTime.value=d})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const R={id:"canvas"},q={__name:"shader01",setup(r){let e=null;return x(()=>{e=new F(document.getElementById("canvas"))}),g(()=>{e&&e.destroy()}),(n,i)=>(P(),M("canvas",R))}},k=y(q,[["__scopeId","data-v-aa0aa86c"]]);export{k as default};
