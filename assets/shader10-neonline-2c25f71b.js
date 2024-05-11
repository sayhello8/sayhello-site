import{O as u,a as i,l as h,z as v,n as p,C as m,b as f,bJ as g,B as w,L as x,ac as y}from"./OrbitControls-9c9ee6bc.js";import{M as _}from"./index-1453e2ee.js";import{D as P}from"./index-4ec0cc76.js";import{g as C}from"./index-4db78ffb.js";import{e as k}from"./GC-b02a3dbf.js";import{s as z}from"./stats.module-077ce25d.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";import{g as S,h as q,o as O,c as T}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";const B=`varying vec2 vUv;\r
// #define POINT_COUNT 20\r
\r
uniform vec2 uCoords[POINT_COUNT];\r
vec2 points[POINT_COUNT];\r
uniform vec2 uRatio;\r
uniform vec2 uSize;\r
uniform vec3 uColor;\r
const float scale = 1.0 / 120.0; // 缩放值为面板的1.0/ max(width,height)\r
float intensity = 1.3; // 强度\r
float radius = 0.015; // 发光半径\r
\r
//https://www.shadertoy.com/view/MlKcDD\r
//Signed distance to a quadratic bezier\r
float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {\r
    vec2 a = B - A;\r
    vec2 b = A - 2.0 * B + C;\r
    vec2 c = a * 2.0;\r
    vec2 d = A - pos;\r
    float kk = 1.0 / dot(b, b);\r
    float kx = kk * dot(a, b);\r
    float ky = kk * (2.0 * dot(a, a) + dot(d, b)) / 3.0;\r
    float kz = kk * dot(d, a);\r
    float res = 0.0;\r
    float p = ky - kx * kx;\r
    float p3 = p * p * p;\r
    float q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;\r
    float h = q * q + 4.0 * p3;\r
    if(h >= 0.0) {\r
        h = sqrt(h);\r
        vec2 x = (vec2(h, -h) - q) / 2.0;\r
        vec2 uv = sign(x) * pow(abs(x), vec2(1.0 / 3.0));\r
        float t = uv.x + uv.y - kx;\r
        t = clamp(t, 0.0, 1.0);\r
            // 1 root\r
        vec2 qos = d + (c + b * t) * t;\r
        res = length(qos);\r
    } else {\r
        float z = sqrt(-p);\r
        float v = acos(q / (p * z * 2.0)) / 3.0;\r
        float m = cos(v);\r
        float n = sin(v) * 1.732050808;\r
        vec3 t = vec3(m + m, -n - m, n - m) * z - kx;\r
        t = clamp(t, 0.0, 1.0);\r
            // 3 roots\r
        vec2 qos = d + (c + b * t.x) * t.x;\r
        float dis = dot(qos, qos);\r
        res = dis;\r
        qos = d + (c + b * t.y) * t.y;\r
        dis = dot(qos, qos);\r
        res = min(res, dis);\r
        qos = d + (c + b * t.z) * t.z;\r
        dis = dot(qos, qos);\r
        res = min(res, dis);\r
        res = sqrt(res);\r
    }\r
    return res;\r
}\r
\r
//https://www.shadertoy.com/view/3s3GDn\r
float getGlow(float dist, float radius, float intensity) {\r
    return pow(uSize.y / dist, intensity);\r
}\r
\r
float getSegment(vec2 pos) {\r
    for(int i = 0; i < POINT_COUNT; i++) {\r
        float x = uCoords[i][0];\r
        float y = uCoords[i][1];\r
        points[i] = vec2(x, y);\r
    }\r
\r
    vec2 c = (points[0] + points[1]) / 2.0;\r
    vec2 c_prev;\r
    float dist = 10000.0;\r
\r
    for(int i = 0; i < POINT_COUNT - 1; i++) {\r
        //https://tinyurl.com/y2htbwkm\r
        c_prev = c;\r
        c = (points[i] + points[i + 1]) / 2.0;\r
        dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));\r
        // dist = min(dist, sdBezier(pos, c_prev, points[i], c));\r
    }\r
    return max(0.0, dist);\r
}\r
\r
void main() {\r
    vec2 uv = vUv;\r
    vec2 pos = (uv - vec2(0.5, 0.5)) * uRatio;\r
\r
    // 获取分段\r
    float dist = getSegment(pos);\r
    // 获取发光\r
    float glow = getGlow(dist, radius, intensity);\r
    // 背景颜色\r
    vec3 col = vec3(0.0, 0.0, 0.0);\r
\r
    // smoothstep第一个参数,线条粗细\r
    col += 10.0 * vec3(smoothstep(uSize.x, 0.0, dist));\r
    // 叠加颜色\r
    col += glow * uColor;\r
\r
    //Tone mapping\r
    col = 1.0 - exp(-col);\r
\r
    //Gamma\r
    // col = pow(col, vec3(0.4545));\r
\r
    //Output to screen\r
    gl_FragColor = vec4(col, 1.0);\r
}`,M=`\r
varying vec2 vUv;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
    vUv = uv;\r
\r
}`;class N extends u{constructor(e,t){super(),this.config=Object.assign({curveData:[],radius1:.04,radius2:.2,shaderPoints:20,curvePoints:100,duration:3,width:60,height:120,color:65535,showTestLine:!0},t),this.material=null,this.points=null,this.init(),this.createCurve(),this.resize(),this.run()}init(){let e=this.config,t=new Array(e.shaderPoints).fill(0).map(()=>new i);const n=new h(e.width,e.height,1),r=new v({vertexShader:M,fragmentShader:B,transparent:!0,blending:p,defines:{POINT_COUNT:e.shaderPoints},uniforms:{uTime:{value:0},uCoords:{value:t},uRatio:{value:new i},uSize:{value:new i},uColor:{value:new m(e.color)}}});this.material=r;let s=new f(n,r);this.add(s)}createCurve(){let e=this.config,n=new g(e.curveData).getPoints(e.curvePoints);this.points=n;const r=new w().setFromPoints(n);if(e.showTestLine){const s=new x({color:16711680}),o=new y(r,s);this.add(o)}}run(){let e=this.config,t=this.points,n=this.material,r=e.shaderPoints,s=t.length-1,o=new Array(e.shaderPoints).fill(0).map((a,l)=>t[l]);t=[...t,...o];let d={index:0};this.gsapInstance=C.to(d,{index:s,duration:e.duration,repeat:-1,ease:"none",delay:0,onUpdate:()=>{let a=Math.floor(d.index),l=t.slice(a,a+r);n.uniforms.uCoords.value=l}})}resize(){let e=this.config;if(this.material){let t=this.material,n=e.width,r=e.height;t.uniforms.uSize.value.set(e.radius1,e.radius2),n>=r?(t.uniforms.uRatio.value.set(1,r/n),t.uniforms.uSize.value.multiplyScalar(1/n)):(t.uniforms.uRatio.value.set(n/r,1),t.uniforms.uSize.value.multiplyScalar(1/r))}}destroy(){this.gsapInstance&&this.gsapInstance.kill(),k(this)}}class U extends _{constructor(e){super(e),this.camera.instance.position.set(0,0,50),this.initSetting(),this.initModel()}initSetting(){this.debug=new P(!0),this.stats=new z,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){this.neoline=new N(this,{curveData:[new i(10,6),new i(10,-6),new i(-10,-6),new i(-10,6),new i(10,6)],radius1:.04,radius2:.2,shaderPoints:20,curvePoints:100,duration:3,width:60,height:120,color:16711935,showTestLine:!1}),this.scene.add(this.neoline)}update(){super.update(),this.stats&&this.stats.update()}resize(){super.resize(),this.neoline&&this.neoline.resize()}destroy(){super.destroy(),this.neoline&&this.neoline.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const I={id:"canvas"},D={__name:"shader10-neonline",setup(c){let e=null;return S(()=>{e=new U(document.getElementById("canvas"))}),q(()=>{e&&e.destroy()}),(t,n)=>(O(),T("canvas",I))}},J=b(D,[["__scopeId","data-v-40d8d097"]]);export{J as default};
