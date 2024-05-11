import{ad as g,b as h,z as f,C as c,a2 as d,G as v,a as b,a3 as w,ae as x,m as u,V as C}from"./OrbitControls-9c9ee6bc.js";import"./index-1453e2ee.js";import{g as y}from"./index-4db78ffb.js";class S{constructor(o,e){Object.keys(o).forEach(a=>{let r=o[a],t=r.default;e[a]=t,Object.defineProperty(e,a,{get(){return t},set(s){r.default=s,r.onChange&&r.onChange(s,e)}})})}}const I=`
uniform vec3 color; // 颜色
uniform float coefficient; // 系数
uniform float power; // 幂
varying vec3 vVertexNormal;  
varying vec3 vVertexWorldPosition;
void main() {
  // 首先计算相机到顶点的向量
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  // 并将其变换到视图坐标系中
  vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  // 计算强度：使用dot函数计算顶点表面法线与视图坐标系中相机到顶点向量的点积，并将其与一个系数（coefficient）相加，并取其矩阵幂（power）
  float intensity	= pow(
    coefficient + dot(vVertexNormal, viewCameraToVertex),
    power
  );
  // 将计算出的颜色值作为 gl_FragColor 的值传递给渲染管线
  gl_FragColor = vec4(color, intensity);
}`,M=`
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
void main() {
  // 顶点表面法线：首先将法线归一化，以确保其长度为1。
  vVertexNormal	= normalize(normalMatrix * normal);
  // 顶点世界坐标
  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,A={backside:!0,coefficient:.5,color:"gold",size:2,power:1};function j(i,o,e){return new f({depthWrite:!1,fragmentShader:I,transparent:!0,uniforms:{coefficient:{value:i},color:{value:new c(o)},power:{value:e}},vertexShader:M})}function N(i,o){const e=i.clone(),a=new Float32Array(i.attributes.position.count*3);for(let r=0,t=a.length;r<t;r++){const s=i.attributes.normal.array[r],l=i.attributes.position.array[r];a[r]=l+s*o}return e.setAttribute("position",new d(a,3)),e}function O(i,o=A){const{backside:e,coefficient:a,color:r,size:t,power:s}=o,l=N(i,t),n=j(a,r,s);return e&&(n.side=g),new h(l,n)}class P{constructor(o,e){this.self=o,this.instance=new v,this.instance.rotation.offset={x:0,y:0},this.mouse={prevX:0,prevY:0,down:!1},this.globeObj=null,this.options=Object.assign({},{radius:100,drag:!1,globeColor:16777215,globeImage:null,globeNightImage:null,normalImage:null,normalScale:new b(1,1),bumpImage:null,bumpScale:4,specularImage:null,showAtmosphere:!0,atmosphereColor:"lightskyblue",atmosphereAltitude:.15,atmospherePower:3.5},e),this._proxyData(),this._init(),this._addEvent()}_proxyData(){const o={globeColor:{default:this.options.globeColor||16777215,onChange:e=>{console.log(e),this.globeObj.material.color=e}},globeImage:{default:this.options.globeImage||null,onChange:e=>{this.globeObj.material.map=e,this.globeObj.material.needsUpdate=!0}},normalImage:{default:this.options.normalImage||null,onChange:e=>{this.globeObj.material.normalMap=e,this.globeObj.material.needsUpdate=!0}},bumpImage:{default:this.options.bumpImage||null,onChange:e=>{this.globeObj.material.bumpMap=e,this.globeObj.material.needsUpdate=!0}},specularImage:{default:this.options.specularImage||null,onChange:e=>{this.globeObj.material.specularMap=e,this.globeObj.material.needsUpdate=!0}},showAtmosphere:{default:this.options.showAtmosphere||!1},atmosphereColor:{default:this.options.atmosphereColor||!1},atmosphereAltitude:{default:this.options.atmosphereAltitude||.15},atmosphereAltitude:{default:this.options.atmospherePower||.35}};new S(o,this)}_init(){this.createGlobe()}_addEvent(){this.options.drag&&this.sphereMove()}sphereMove(){window.addEventListener("mousedown",o=>{this.mouse.down=!0,this.mouse.prevX=o.clientX,this.mouse.prevY=o.clientY}),window.addEventListener("mousemove",o=>{if(this.mouse.down){o.preventDefault();let e=o.clientX-this.mouse.prevX,a=o.clientY-this.mouse.prevY;this.mouse.prevX=o.clientX,this.mouse.prevY=o.clientY,this.instance.rotation.offset.x+=a*.005,this.instance.rotation.offset.y+=e*.005,y.to(this.instance.rotation,{x:this.instance.rotation.offset.x,y:this.instance.rotation.offset.y,duration:1.5})}}),window.addEventListener("mouseup",()=>{this.mouse.down=!1})}createGlobe(){const{radius:o,globeImage:e,globeNightImage:a,normalImage:r,normalScale:t,specularImage:s,bumpImage:l,bumpScale:n}=this.options;let p=new w(o,128,128),m=new x({color:this.options.globeColor,map:e,normalMap:r,normalScale:t,bumpMap:l,bumpScale:n,specularMap:s,wireframe:!1,shininess:30,specular:new c("#ffffff")});console.log(m),this.globeObj=new h(p,m),this.instance.add(this.globeObj),a&&this.setDayNight(m)}setDayNight(o){const{globeImage:e,globeNightImage:a,globeColor:r}=this.options;e.colorSpace=u,a.colorSpace=u,o.onBeforeCompile=t=>{this.shader=t,t.uniforms={...t.uniforms,uColor:{value:new c(r)},sunDirection:{value:new C(1,1,0)},dayTexture:{value:e},nightTexture:{value:a}},t.vertexShader=t.vertexShader.replace("void main() {",`
        varying vec2 vUv;
        varying vec3 vNormall;

        void main() {
          vUv = uv;
        
          vNormall = normalMatrix * normal;
         
              `),t.fragmentShader=t.fragmentShader.replace("void main() {",`
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;

          uniform vec3 sunDirection;
          uniform vec3 uColor;

          varying vec2 vUv;
          varying vec3 vNormall;
              
          void main() {
        `),t.fragmentShader=t.fragmentShader.replace("#include <opaque_fragment>",`

              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif

              #ifdef USE_TRANSMISSION
              diffuseColor.a *= material.transmissionAlpha;
              #endif


              vec3 dayColor = texture2D(dayTexture, vUv).rgb;
              vec3 nightColor = texture2D(nightTexture, vUv).rgb;
              float cosineAngleSunToNormal = dot(normalize(vNormall), sunDirection);
              cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);
              float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;
              // 混合2张贴图
              vec3 color = mix(nightColor, dayColor, mixAmount);
              // 混合phong材质
              color *= mix(outgoingLight, uColor, 0.5);
              gl_FragColor = vec4(color , diffuseColor.a );
              // gl_FragColor = vec4(outgoingLight, 1.0);
              `)}}createAtmosphere(){const{radius:o,atmosphereColor:e,atmosphereAltitude:a,atmospherePower:r}=this.options;let t=O(this.globeObj.geometry,{backside:!0,color:e,size:o*a,power:r,coefficient:.15});this.atmosphere=t,this.instance.add(t)}setParent(o){o.add(this.instance)}add(o){this.instance.add(o)}}const G="/sayhello-site/assets/earth_clouds_1024-7d3b82ef.png",D="/sayhello-site/assets/earth_normal_2048-3fc43e96.jpg",U="/sayhello-site/assets/earth_specular_2048-2df48906.jpg",z="/sayhello-site/assets/高光-32c47430.jpg",E="/sayhello-site/assets/pointLight-5843d6d3.png",L="/sayhello-site/assets/光柱-aa132c89.png";export{P as G,D as a,U as b,G as e,z as h,L as l,E as p};
