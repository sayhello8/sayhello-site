import{a3 as c,z as l,n as v,a as o,b as m}from"./OrbitControls-9c9ee6bc.js";import{M as p,R as d}from"./index-1453e2ee.js";import{D as f}from"./index-4ec0cc76.js";import{s as u}from"./stats.module-077ce25d.js";import{g as h}from"./grid-3e023ca8.js";import{u as x}from"./uv-77714551.js";import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import{g as y,h as _,o as b,c as z}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";const S=`uniform vec3 iResolution;           // viewport resolution (in pixels)\r
uniform float iTime;                 // shader playback time (in seconds)\r
uniform sampler2D iChannel0;\r
uniform sampler2D iChannel1;\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
float sigma = 7.0;\r
const int mSize = 30;\r
\r
#define AA 2\r
//apply bloom effect\r
float normpdf(in float x, in float sigma) {\r
    return 0.39894 * exp(-0.5 * x * x / (sigma * sigma)) / sigma;\r
}\r
\r
vec3 bloom(vec2 uv) {\r
    //declare stuff\r
    const int kSize = (mSize - 1) / 2;\r
    float kernel[mSize];\r
    vec3 final_colour = vec3(0.0);\r
\r
    //create the 1-D kernel\r
    float Z = 0.0;\r
    for(int j = 0; j <= kSize; ++j) {\r
        kernel[kSize + j] = kernel[kSize - j] = normpdf(float(j), sigma);\r
    }\r
\r
    //get the normalization factor (as the gaussian has been clamped)\r
    for(int j = 0; j < mSize; ++j) {\r
        Z += kernel[j];\r
    }\r
\r
    //read out the texels\r
    for(int i = -kSize; i <= kSize; ++i) {\r
        vec3 c = texture(iChannel0, uv + vec2(0, i) / iResolution.xy).rgb;\r
        final_colour += kernel[kSize + i] * c;\r
        // final_colour += kernel[kSize + i];\r
\r
    }\r
    return final_colour / (Z);\r
}\r
vec2 iSphere(vec3 ro, vec3 rd) {\r
    float b = dot(ro, rd);\r
    float c = dot(ro, ro) - 1.0;\r
    float delta = b * b - c;\r
    if(delta < 0.0) {\r
        return vec2(-1.0);\r
    }\r
    return -b + vec2(-1.0, 1.0) * sqrt(delta);\r
}\r
\r
vec4 hexagon(vec2 p) //from https://www.shadertoy.com/view/Xd2GR3\r
{\r
    vec2 q = vec2(p.x * 2.0 * 0.5773503, p.y + p.x * 0.5773503);\r
\r
    vec2 pi = floor(q);\r
    vec2 pf = fract(q);\r
\r
    float v = mod(pi.x + pi.y, 3.0);\r
\r
    float ca = step(1.0, v);\r
    float cb = step(2.0, v);\r
    vec2 ma = step(pf.xy, pf.yx);\r
\r
    // distance to borders\r
    float e = dot(ma, 1.0 - pf.yx + ca * (pf.x + pf.y - 1.0) + cb * (pf.yx - 2.0 * pf.xy));\r
\r
	// distance to center	\r
    p = vec2(q.x + floor(0.5 + p.y / 1.5), 4.0 * p.y / 3.0) * 0.5 + 0.5;\r
    float f = length((fract(p) - 0.5) * vec2(1.0, 0.85));\r
\r
    return vec4(pi + ca - cb * ma, e, f);\r
}\r
\r
vec3 trace(vec3 ro, vec3 rd) {\r
    // vec2 sphere = iSphere(ro, rd);\r
    vec2 sphere = vec2(2.0, 2.0);\r
    float plane = -(ro.y - 0.2) / rd.y;\r
\r
    vec3 col = vec3(0.0);\r
    vec3 p = ro + sphere.x * rd;\r
    vec3 normal = p;\r
    vec2 uv = vUv;\r
    uv.x += iTime * 0.05;\r
    uv.y += iTime * 0.1;\r
    vec4 hexa = hexagon(uv * 29.4); // 调整纹理的大小\r
\r
    float frs = 1.0 + dot(normal, rd);\r
    frs = max(frs, 1.0 - abs((p.y - 0.2) * 7.0));\r
    frs = pow(frs, 3.0) * 3.0;\r
    col += vec3(0.690, 0.494, 0.905) * frs;\r
    col += 7.0 * vec3(0.376, 0.333, 0.847) * smoothstep(0.05, 0., hexa.z) * max(0.01, frs);\r
    col += vec3(0.121, 0.741, 0.615) * smoothstep(0.3, 0., hexa.z) * max(0.1, frs);\r
    col += vec3(0.121, 0.741, 0.615) * 0.1;\r
\r
    return vec3(col);\r
\r
}\r
\r
void main() {\r
\r
    vec2 uv = vUv;\r
    uv.x -= 0.5;\r
    uv.y -= 0.05;\r
\r
    vec3 camPos = vec3(0.0, 0.1, 1.0) * 2.7;\r
    vec3 dir0 = normalize(-camPos);\r
    vec3 up = vec3(0.0, 1.0, 0.0);\r
    vec3 right = normalize(cross(dir0, up));\r
    up += cross(dir0, right);\r
\r
    vec3 ro = camPos;\r
    vec3 col = vec3(0.0);\r
    for(int i = 0; i < AA; i++) {\r
        for(int j = 0; j < AA; j++) {\r
            vec3 rd = normalize(dir0 + up * (uv.y + float(j) / iResolution.y / float(AA)) + right * (uv.x + float(i) / iResolution.x / float(AA)));\r
            col += trace(ro, rd);\r
        }\r
    }\r
    col /= float(AA * AA);  // 加深边缘高亮\r
    gl_FragColor = vec4(col, 1.0);\r
\r
    // 菲涅尔效果\r
    vec3 z = vec3(0.0, 0.0, 1.0);//z轴方向单位向量\r
    float x = abs(dot(vNormal, z));//点乘结果余弦值绝对值范围[0,1]\r
    float alpha = pow(1.0 - x, 2.0);//透明度随着余弦值非线性变化  比如二次方  三次方 渲染不同的效果\r
    col *= vec3(0.0, 1.0, 1.0);\r
    gl_FragColor = vec4(col, alpha);\r
}`,w=`// uniform mat4 projectionMatrix;\r
// uniform mat4 viewMatrix;\r
// uniform mat4 modelMatrix;\r
\r
// attribute vec3 position;\r
varying vec3 vNormal;\r
varying vec2 vUv;\r
void main() {\r
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;\r
    gl_Position = projectionPosition;\r
    vUv = uv;\r
    vNormal = normalize(normalMatrix * normal);\r
\r
}`;class k extends p{constructor(r){super(r),this.camera.instance.position.set(31.654053063076066,18.17832104360899,31.654053063096544),this.initSetting(),this.assets=new d({}),this.assets.loadAll([{type:"Texture",name:"grid",path:h},{type:"Texture",name:"uv",path:x}]),this.assets.on("onLoad",()=>{this.initModel()})}initSetting(){this.debug=new f(!0),this.stats=new u,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){const r=new c(10,24,24),n=this.assets.getResource("uv"),t=this.assets.getResource("grid"),e=new l({vertexShader:w,fragmentShader:S,transparent:!0,opacity:1,blending:v,uniforms:{iResolution:{value:new o},iTime:{value:0},iChannel0:{value:n},iChannel1:{value:t}}});e.uniforms.iResolution.value=new o(this.sizes.width,this.sizes.height);let a=new m(r,e);this.scene.add(a),this.time.on("tick",(s,M)=>{e.uniforms.iTime.value+=s})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const j={id:"canvas"},A={__name:"shader05-shield",setup(i){let r=null;return y(()=>{r=new k(document.getElementById("canvas"))}),_(()=>{r&&r.destroy()}),(n,t)=>(b(),z("canvas",j))}},Z=g(A,[["__scopeId","data-v-b060166f"]]);export{Z as default};
