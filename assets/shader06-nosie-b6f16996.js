import{g as p,z as v,D as x,aF as u,a3 as d,b as h,B as y,a2 as _,t as g}from"./OrbitControls-9c9ee6bc.js";import{M as f}from"./index-1453e2ee.js";import{D as w}from"./index-4ec0cc76.js";import{g as m}from"./index-4db78ffb.js";import{s as z}from"./stats.module-077ce25d.js";import{_ as M}from"./_plugin-vue_export-helper-c27b6911.js";import{g as b,h as C,o as P,c as S}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";const N=`uniform float u_progress;
void main() {
    gl_FragColor = vec4(0.4, 0.4, 0.4, u_progress);
}`,k=`uniform float u_time;
void main() {
    vec3 p = position;

    p.y += 0.25*(sin(p.y * 5.0 + u_time) * 0.5 + 0.5);
    p.z += 0.05*(sin(p.y * 10.0 + u_time) * 0.5 + 0.5);


    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}`,D=`varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_normal;

void main() {

    vec3 light = vec3(0.0);
    vec3 skyColor = vec3(0.000, 1.000, 0.547);
    vec3 groundColor = vec3(0.0, 0.275, 0.111);

    vec3 lightDirection = normalize(vec3(0.0, -1.0, -1.0));
    light += dot(lightDirection, v_normal);

    light = mix(skyColor, groundColor, dot(lightDirection, v_normal));

    gl_FragColor = vec4(light * v_color, 1.0);
}`,j=`varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_normal;

uniform float u_time;
uniform float u_progress;



vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0 / 7.0; // N=7
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z); //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_); // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
    dot(p2, x2), dot(p3, x3)));
}

void main() {
    vUv = uv;
    float noise = snoise(position * u_progress + u_time / 10.0);
    vec3 newPos = position * (noise + 0.7);

    v_color = hsv2rgb(vec3(noise * 0.1 + 0.03, .7, 0.7));

    v_normal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}`;class B extends f{constructor(e){super(e),this.scene.fog=new p(0,1,100),this.scene.background=0,this.camera.instance.position.set(0,0,10),this.camera.instance.near=.01,this.camera.instance.far=1e3,this.camera.instance.updateProjectionMatrix(),this.initSetting(),this.initModel()}initSetting(){this.debug=new w(!0),this.stats=new z,document.body.appendChild(this.stats.dom)}initModel(){this.init()}init(){this.setup(),this.addToScene(),this.createParticles(),this.animate(),this.time.on("tick",()=>{this.material.uniforms.u_time.value=this.clock.getElapsedTime(),this.pointsMaterial.uniforms.u_time.value=this.clock.getElapsedTime(),this.points.rotation.y+=.005})}setup(){this.material=new v({vertexShader:j,fragmentShader:D,wireframe:!1,uniforms:{u_time:{value:0},u_progress:{value:0}}}),this.pointsMaterial=new v({vertexShader:k,fragmentShader:N,wireframe:!1,side:x,transparent:!0,uniforms:{u_time:{value:0},u_progress:{value:0}}}),this.clock=new u}addToScene(){this.geometry=new d(1,162,162);const e=new h(this.geometry,this.material);this.scene.add(e)}createParticles(){const t=new Float32Array(9e4);this.particleGeometry=new y;let s=Math.PI*(3-Math.sqrt(5)),r=2/3e4,o=2;for(let n=0;n<3e4;n++){let i=n*r-1+r/2,a=Math.sqrt(1-i*i),c=n*s;t[3*n]=o*Math.cos(c)*a,t[3*n+1]=o*i,t[3*n+2]=o*Math.sin(c)*a}this.particleGeometry.setAttribute("position",new _(t,3)),this.points=new g(this.particleGeometry,this.pointsMaterial),this.scene.add(this.points)}animate(){m.timeline({repeat:-1,yoyo:!0}).to(this.material.uniforms.u_progress,{value:5,duration:5,ease:"power3.inOut"}).to(this.material.uniforms.u_progress,{value:1,duration:5,ease:"power3.inOut"}),m.to(this.pointsMaterial.uniforms.u_progress,{value:.4,duration:5,ease:"power3.inOut"})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const F={id:"canvas"},G={__name:"shader06-nosie",setup(l){let e=null;return b(()=>{e=new B(document.getElementById("canvas"))}),C(()=>{e&&e.destroy()}),(t,s)=>(P(),S("canvas",F))}},V=M(G,[["__scopeId","data-v-092787fc"]]);export{V as default};
