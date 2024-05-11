import{l as i,z as a,D as c,n as l,a as r,b as d}from"./OrbitControls-9c9ee6bc.js";import{M as v}from"./index-1453e2ee.js";import{D as p}from"./index-4ec0cc76.js";import{s as m}from"./stats.module-077ce25d.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import{g as h,h as u,o as g,c as w}from"./index-9ee60282.js";import"./lil-gui.module.min-f00c3c61.js";const y=`// varying float vRandom;\r
// void main() {\r
//     gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);\r
// }\r
\r
// gelami has created a nice fix for the creases: https://www.shadertoy.com/view/7l3GDS\r
uniform vec3 iResolution;           // viewport resolution (in pixels)\r
uniform float iTime;                 // shader playback time (in seconds)\r
varying vec2 vUv;\r
#define POINT_COUNT 8\r
\r
vec2 points[POINT_COUNT];\r
const float speed = -0.5;\r
const float len = 0.25;\r
const float scale = 0.012;\r
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
\r
    float kk = 1.0 / dot(b, b);\r
    float kx = kk * dot(a, b);\r
    float ky = kk * (2.0 * dot(a, a) + dot(d, b)) / 3.0;\r
    float kz = kk * dot(d, a);\r
\r
    float res = 0.0;\r
\r
    float p = ky - kx * kx;\r
    float p3 = p * p * p;\r
    float q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;\r
    float h = q * q + 4.0 * p3;\r
\r
    if(h >= 0.0) {\r
        h = sqrt(h);\r
        vec2 x = (vec2(h, -h) - q) / 2.0;\r
        vec2 uv = sign(x) * pow(abs(x), vec2(1.0 / 3.0));\r
        float t = uv.x + uv.y - kx;\r
        t = clamp(t, 0.0, 1.0);\r
\r
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
\r
        // 3 roots\r
        vec2 qos = d + (c + b * t.x) * t.x;\r
        float dis = dot(qos, qos);\r
\r
        res = dis;\r
\r
        qos = d + (c + b * t.y) * t.y;\r
        dis = dot(qos, qos);\r
        res = min(res, dis);\r
\r
        qos = d + (c + b * t.z) * t.z;\r
        dis = dot(qos, qos);\r
        res = min(res, dis);\r
\r
        res = sqrt(res);\r
    }\r
\r
    return res;\r
}\r
\r
//http://mathworld.wolfram.com/HeartCurve.html\r
vec2 getHeartPosition(float t) {\r
    return vec2(16.0 * sin(t) * sin(t) * sin(t), -(13.0 * cos(t) - 5.0 * cos(2.0 * t) - 2.0 * cos(3.0 * t) - cos(4.0 * t)));\r
}\r
\r
//https://www.shadertoy.com/view/3s3GDn\r
float getGlow(float dist, float radius, float intensity) {\r
    return pow(radius / dist, intensity);\r
}\r
\r
float getSegment(float t, vec2 pos, float offset) {\r
    for(int i = 0; i < POINT_COUNT; i++) {\r
        // points[i] = vec2(0.1, 0.1) * len + t * 6.28;//getHeartPosition(offset + float(i) * len + fract(speed * t) * 6.28);\r
        points[i] = getHeartPosition(offset + float(i) * len + fract(speed * t) * 6.28);\r
    }\r
\r
    vec2 c = (points[0] + points[1]) / 2.0;\r
    // vec2 c = (points[0] + points[1]);\r
    vec2 c_prev;\r
    float dist = 10000.0;\r
\r
    for(int i = 0; i < POINT_COUNT - 1; i++) {\r
        //https://tinyurl.com/y2htbwkm\r
        c_prev = c;\r
        c = (points[i] + points[i + 1]) / 2.0;\r
        dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));\r
    }\r
    return max(0.0, dist);\r
}\r
\r
void main() {\r
    vec2 uv = vUv; //gl_FragCoord.xy / iResolution.xy;\r
    float widthHeightRatio = iResolution.x / iResolution.y;\r
    vec2 centre = vec2(0.5, 0.5);\r
    vec2 pos = centre - uv;\r
    pos.y /= widthHeightRatio;\r
    //向上移动至中心\r
    pos.y += 0.03;\r
\r
    float t = iTime;\r
\r
    // 获取第一段\r
    float dist = getSegment(t, pos, 0.0);\r
    float glow = getGlow(dist, radius, intensity);\r
    // 背景颜色\r
    vec3 col = vec3(0.0);\r
\r
    //White core\r
    col += 10.0 * vec3(smoothstep(0.006, 0.003, dist));\r
    //Pink glow\r
    col += glow * vec3(1.0, 0.05, 0.3);\r
\r
    //Get second segment\r
    dist = getSegment(t, pos, 3.4);\r
    glow = getGlow(dist, radius, intensity);\r
\r
    //White core\r
    col += 10.0 * vec3(smoothstep(0.006, 0.003, dist));\r
    //Blue glow\r
    col += glow * vec3(0.1, 0.4, 1.0);\r
\r
    //Tone mapping\r
    col = 1.0 - exp(-col);\r
\r
    //Gamma\r
    // col = pow(col, vec3(0.4545));\r
\r
    //Output to screen\r
    gl_FragColor = vec4(col, 1.0);\r
}`,_=`\r
varying vec2 vUv;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
    vUv = uv;\r
\r
}`;class x extends v{constructor(t){super(t),this.camera.instance.position.set(31.654053063076066,18.17832104360899,31.654053063096544),this.initSetting(),this.initModel()}initSetting(){this.debug=new p(!0),this.stats=new m,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){const t=new i(40,20,1),n=new a({vertexShader:_,fragmentShader:y,side:c,transparent:!0,blending:l,opacity:.2,uniforms:{iResolution:{value:new r},iTime:{value:0}}});n.uniforms.iResolution.value=new r(this.sizes.width,this.sizes.height);let e=new d(t,n);e.rotateX(-Math.PI/2),this.scene.add(e),this.time.on("tick",(s,q)=>{n.uniforms.iTime.value+=s})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const k={id:"canvas"},b={__name:"shader04-glow",setup(o){let t=null;return h(()=>{t=new x(document.getElementById("canvas"))}),u(()=>{t&&t.destroy()}),(n,e)=>(g(),w("canvas",k))}},R=f(b,[["__scopeId","data-v-73f79cec"]]);export{R as default};
