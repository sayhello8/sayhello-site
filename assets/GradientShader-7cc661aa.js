import{V as u,M as h,l as p,b as f,C as n}from"./OrbitControls-9c9ee6bc.js";class c{constructor({time:o},e){this.time=o,this.options=Object.assign({},{width:10,scale:1,position:new u(0,0,0),needRotate:!1,rotateSpeed:.001,material:new h({transparent:!0,opacity:1,depthTest:!0})},e);let a=new p(this.options.width,this.options.width),t=new f(a,this.options.material);t.rotateX(-Math.PI/2),t.position.copy(this.options.position),t.scale.set(this.options.scale,this.options.scale,this.options.scale),this.instance=t}setParent(o){o.add(this.instance),this.time.on("tick",()=>{this.update()})}update(){this.options.needRotate&&(this.instance.rotation.z+=this.options.rotateSpeed)}}class v{constructor(o,e){this.shader=null,this.config=Object.assign({uColor1:2781042,uColor2:860197,size:15,dir:"x"},e),this.init(o)}init(o){let{uColor1:e,uColor2:a,dir:t,size:s}=this.config,l={x:1,y:2,z:3};o.onBeforeCompile=i=>{this.shader=i,i.uniforms={...i.uniforms,uColor1:{value:new n(e)},uColor2:{value:new n(a)},uDir:{value:l[t]},uSize:{value:s}},i.vertexShader=i.vertexShader.replace("void main() {",`
                attribute float alpha;
                varying vec3 vPosition;
                varying float vAlpha;
                void main() {
                  vAlpha = alpha;
                  vPosition = position;
              `),i.fragmentShader=i.fragmentShader.replace("void main() {",`
                varying vec3 vPosition;
                varying float vAlpha;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uDir;
                uniform float uSize;
              
                void main() {
              `),i.fragmentShader=i.fragmentShader.replace("#include <opaque_fragment>",`
              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif
              
              // https://github.com/mrdoob/three.js/pull/22425
              #ifdef USE_TRANSMISSION
              diffuseColor.a *= transmissionAlpha + 0.1;
              #endif
              // vec3 gradient = mix(uColor1, uColor2, vPosition.x / 15.0); 
              vec3 gradient = vec3(0.0,0.0,0.0);
              if(uDir==1.0){
                gradient = mix(uColor1, uColor2, vPosition.x/ uSize); 
              }else if(uDir==2.0){
                gradient = mix(uColor1, uColor2, vPosition.z/ uSize); 
              }else if(uDir==3.0){
                gradient = mix(uColor1, uColor2, vPosition.y/ uSize); 
              }
              outgoingLight = outgoingLight * gradient;
              
              
              gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
              `)}}}export{v as G,c as P};
