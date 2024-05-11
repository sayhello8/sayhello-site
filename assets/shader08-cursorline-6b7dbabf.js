import{a as m,v as B,V as R,C as F,l as z,z as E,M as j,b as S,a2 as O,D as I}from"./OrbitControls-9c9ee6bc.js";import{M as U}from"./index-1453e2ee.js";import{D as X}from"./index-4ec0cc76.js";import{s as Y}from"./stats.module-077ce25d.js";import{_ as H}from"./_plugin-vue_export-helper-c27b6911.js";import{g as N,h as V,o as W,c as G}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";function K(q){const{domElement:e,onClick:i=()=>{},onEnter:p=()=>{},onMove:l=()=>{},onLeave:n=()=>{},onDragStart:d=()=>{},onDragMove:c=()=>{},onDragStop:y=()=>{}}=q,t=new m,s=new m,f=new m,h=new m,w=new m,a={position:t,nPosition:s,hover:!1,down:!1,removeListeners:r};return u(),a;function x(o){f.distanceTo(t)<20&&(v(o),i({position:t,nPosition:s}))}function P(o){a.hover=o.pointerType==="mouse",v(o),p({position:t,nPosition:s})}function _(o){a.down=!0,v(o),f.copy(t),h.copy(t),d({position:t,nPosition:s})}function M(o){v(o),w.copy(t).sub(h),a.down?c({position:t,nPosition:s,startPosition:f,lastPosition:h,delta:w}):a.hover||(a.hover=!0),l({position:t,nPosition:s,startPosition:f,lastPosition:h,delta:w}),h.copy(t)}function b(o){a.down=!1,y()}function k(o){a.down&&(a.down=!1,y()),a.hover=!1,n()}function v(o){const g=e.getBoundingClientRect();t.x=o.clientX-g.left,t.y=o.clientY-g.top,s.x=t.x/g.width*2-1,s.y=-(t.y/g.height)*2+1}function u(){e.addEventListener("click",x),e.addEventListener("pointerenter",P),e.addEventListener("pointerdown",_),e.addEventListener("pointermove",M),e.addEventListener("pointerup",b),e.addEventListener("pointerleave",k)}function r(){e.removeEventListener("click",x),e.removeEventListener("pointerenter",P),e.removeEventListener("pointerdown",_),e.removeEventListener("pointermove",M),e.removeEventListener("pointerup",b),e.removeEventListener("pointerleave",k)}}const J=`// precision mediump float;\r
varying float vRandom;\r
void main() {\r
    gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);\r
}`,Q=`// uniform mat4 projectionMatrix;\r
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
}`;class Z extends U{constructor(e){super(e),this.camera.instance.position.set(10,10,50),this.config=Object.assign(this.config,{shaderPoints:8,curvePoints:80,curveLerp:.75,radius1:3,radius2:5,velocityTreshold:10,sleepRadiusX:150,sleepRadiusY:150,sleepTimeCoefX:.0025,sleepTimeCoefY:.0025}),console.log(this.config),this.initSetting(),this.init()}init(){const e=this.config,i=new Array(e.curvePoints).fill(0).map(()=>new m),p=new B(i),l=new R,n=new R,d={value:new m},c={value:new m},y={value:new Array(e.shaderPoints).fill(0).map(()=>new m)},t={value:new F(16711935)},s=this.sizes.width,f=this.sizes.height,h=this.camera.wWidth;let w,a,x=!1;const P=new z(2,2);w=new E({uniforms:{uRatio:d,uSize:c,uPoints:y,uColor:t},defines:{SHADER_POINTS:e.shaderPoints},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,fragmentShader:`
        // https://www.shadertoy.com/view/wdy3DD
        // https://www.shadertoy.com/view/MlKcDD
        // Signed distance to a quadratic bezier
        float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
          vec2 a = B - A;
          vec2 b = A - 2.0*B + C;
          vec2 c = a * 2.0;
          vec2 d = A - pos;
          float kk = 1.0 / dot(b,b);
          float kx = kk * dot(a,b);
          float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
          float kz = kk * dot(d,a);
          float res = 0.0;
          float p = ky - kx*kx;
          float p3 = p*p*p;
          float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
          float h = q*q + 4.0*p3;
          if(h >= 0.0){
            h = sqrt(h);
            vec2 x = (vec2(h, -h) - q) / 2.0;
            vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
            float t = uv.x + uv.y - kx;
            t = clamp( t, 0.0, 1.0 );
            // 1 root
            vec2 qos = d + (c + b*t)*t;
            res = length(qos);
          } else {
            float z = sqrt(-p);
            float v = acos( q/(p*z*2.0) ) / 3.0;
            float m = cos(v);
            float n = sin(v)*1.732050808;
            vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
            t = clamp( t, 0.0, 1.0 );
            // 3 roots
            vec2 qos = d + (c + b*t.x)*t.x;
            float dis = dot(qos,qos);
            res = dis;
            qos = d + (c + b*t.y)*t.y;
            dis = dot(qos,qos);
            res = min(res,dis);
            qos = d + (c + b*t.z)*t.z;
            dis = dot(qos,qos);
            res = min(res,dis);
            res = sqrt( res );
          }
          return res;
        }

        uniform vec2 uRatio;
        uniform vec2 uSize;
        uniform vec2 uPoints[SHADER_POINTS];
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float intensity = 1.0;
          float radius = 0.015;

          vec2 pos = (vUv - 0.5) * uRatio;

          vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
          vec2 c_prev;
          float dist = 10000.0;
          for(int i = 0; i < SHADER_POINTS - 1; i++){
            c_prev = c;
            c = (uPoints[i] + uPoints[i + 1]) / 2.0;
            dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
          }
          dist = max(0.0, dist);

          float glow = pow(uSize.y / dist, intensity);
          vec3 col = vec3(0.0,0.0,0.0);
          col += 10.0 * vec3(smoothstep(uSize.x, 0.0, dist));
          col += glow * uColor;

          // Tone mapping
          col = 1.0 - exp(-col);
          col = pow(col, vec3(0.4545));

          gl_FragColor = vec4(col, 1.0);
        }
      `});let _=new j({color:16777215,depthTest:!1});a=new S(P,w);let M=new S(P,_);M.position.x+=5,this.scene.add(a,M);function b(){c.value.set(e.radius1,e.radius2),s>=f?(d.value.set(1,f/s),c.value.multiplyScalar(1/s)):(d.value.set(s/f,1),c.value.multiplyScalar(1/f))}function k(v,u){for(let r=1;r<e.curvePoints;r++)i[r].lerp(i[r-1],e.curveLerp);for(let r=0;r<e.shaderPoints;r++)p.getPoint(r/(e.shaderPoints-1),y.value[r]);if(x)t.value.r=l.z,t.value.g=0,t.value.b=1-l.z,l.multiplyScalar(.95);else{const r=u*e.sleepTimeCoefX,o=u*e.sleepTimeCoefY,g=Math.cos(r),C=Math.sin(o),L=e.sleepRadiusX*h/s,T=e.sleepRadiusY*h/s,D=L*g,A=T*C;p.points[0].set(D,A),t.value.r=.5+.5*Math.cos(u*.0015),t.value.g=0,t.value.b=1-t.value.r}}b(),this.initPointer({...e,onPointerMove:({nPosition:v,delta:u})=>{x=!0;const r=.5*v.x*d.value.x,o=.5*v.y*d.value.y;p.points[0].set(r,o),n.x=Math.min(l.x+Math.abs(u.x)/e.velocityTreshold,1),n.y=Math.min(l.y+Math.abs(u.y)/e.velocityTreshold,1),n.z=Math.sqrt(n.x*n.x+n.y*n.y),l.lerp(n,.05)},onPointerLeave(){x=!1}}),this.time.on("tick",(v,u)=>{k(v,u)})}initPointer(e){const i={};e.onPointerEnter&&(i.onEnter=e.onPointerEnter),e.onPointerMove&&(i.onMove=e.onPointerMove),e.onPointerMove&&(i.onLeave=e.onPointerLeave),Object.keys(i).length>0&&(this.pointer=K({domElement:this.canvas,...i}))}initSetting(){this.debug=new X(!0),this.stats=new Y,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}initModel(){let e=new z(20,20,20,20);const i=e.attributes.position.count,p=new Float32Array(i);for(let c=0;c<i;c++)p[c]=Math.random();e.setAttribute("aRandom",new O(p,1));let l=new E({vertexShader:Q,fragmentShader:J,side:I,uniforms:{uFrequency:{value:new m(100,50)},uTime:{value:0}}}),n=new S(e,l);n.rotateX(-Math.PI/2),this.scene.add(n);const d=this.debug.instance.addFolder("uFrequency");d.add(n.material.uniforms.uFrequency.value,"x",-100,200,.01),d.add(n.material.uniforms.uFrequency.value,"y",0,100,.01),this.time.on("tick",(c,y)=>{n.material.uniforms.uTime.value=y})}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const $={id:"canvas"},ee={__name:"shader08-cursorline",setup(q){let e=null;return N(()=>{e=new Z(document.getElementById("canvas"),{isOrthographic:!0})}),V(()=>{e&&e.destroy()}),(i,p)=>(W(),G("canvas",$))}},ce=H(ee,[["__scopeId","data-v-6ad48e89"]]);export{ce as default};
