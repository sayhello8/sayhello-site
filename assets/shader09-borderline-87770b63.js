import{l as b,a as e,C as k,z as P,n as z,b as S,bJ as q,B,L as M,ac as T}from"./OrbitControls-9c9ee6bc.js";import{M as O}from"./index-1453e2ee.js";import{D as N}from"./index-4ec0cc76.js";import{g as U}from"./index-4db78ffb.js";import{s as I}from"./stats.module-077ce25d.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import{g as G,h as R,o as D,c as L}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";const j=`varying vec2 vUv;\r
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
}`,E=`\r
varying vec2 vUv;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
    vUv = uv;\r
\r
}`;class F extends O{constructor(t){super(t),this.camera.instance.position.set(31.654053063076066,18.17832104360899,31.654053063096544),this.initSetting(),this.initModel()}initSetting(){this.debug=new N(!0),this.stats=new I,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){const t=new b(60,120,1),n={radius1:.02,radius2:.2,shaderPoints:20,curvePoints:100,duration:3},d=60,l=120,f={value:new e},h={value:new e},w={value:new k(65535)};let s=new Array(n.shaderPoints).fill(0).map(()=>new e);const o=new P({vertexShader:E,fragmentShader:j,transparent:!0,blending:z,opacity:.2,defines:{POINT_COUNT:n.shaderPoints},uniforms:{uTime:{value:0},uCoords:{value:s},uRatio:f,uSize:h,uColor:w}});let i=new S(t,o);this.scene.add(i);let r=new q([new e(10,6),new e(10,-6),new e(-10,-6),new e(-10,6),new e(10,6)]).getPoints(n.curvePoints);const x=new B().setFromPoints(r),g=new M({color:16711680}),u=()=>{o.uniforms.uSize.value.set(n.radius1,n.radius2),o.uniforms.uRatio.value.set(d/l,1),o.uniforms.uSize.value.multiplyScalar(1/l)};window.addEventListener("resize",()=>{u()}),u();const y=new T(x,g);this.scene.add(y);let _=n.shaderPoints,C=r.length-1;s=s.map((a,c)=>r[c]),r=[...r,...s];let v={index:0};const p=this.debug.instance.addFolder("plane");p.add(i.scale,"x",-2,2,.001),p.add(i.scale,"y",-2,2,.001),U.to(v,{index:C,duration:n.duration,repeat:-1,ease:"none",delay:0,onUpdate:()=>{let a=Math.floor(v.index),c=r.slice(a,a+_);o.uniforms.uCoords.value=c}})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const W={id:"canvas"},H={__name:"shader09-borderline",setup(m){let t=null;return G(()=>{t=new F(document.getElementById("canvas"))}),R(()=>{t&&t.destroy()}),(n,d)=>(D(),L("canvas",W))}},en=A(H,[["__scopeId","data-v-b740a287"]]);export{en as default};
