import{a8 as p,z as u,C as r,a9 as g,V as m,c as l,b as d,L as f,aa as y,A as v,h as _,i as x,G as b,R as h,l as w,M as C}from"./OrbitControls-9c9ee6bc.js";import{R as M,M as B}from"./index-1453e2ee.js";import{D as S}from"./index-4ec0cc76.js";import{S as z}from"./SkyBox-813c1e20.js";import{s as L}from"./stats.module-077ce25d.js";import{p as R,n as T,a as E,b as P,c as G,d as k}from"./negz-6d72d730.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import{g as F,h as N,o as O,c as I}from"./index-d838a7bb.js";import"./lil-gui.module.min-f00c3c61.js";class D{constructor(e={}){const s={mesh:null,border:!0,borderColor:"#3D41AE",baseColor:"#08074B",headerColor:"#3D41AE"};if(this.options=Object.assign({},s,e),!this.options.mesh)throw new Error("GradientRiseLine 请传入mesh参数");this.instance=null,this.line=null,this.shader=null,this.render(),this.options.border&&this.renderBorder()}renderBorder(){const{mesh:e,borderColor:s}=this.options,o=new p(e.geometry),t=new u({uniforms:{u_border_color:{value:new r(s)}},vertexShader:`
        void main(){
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,fragmentShader:`
        uniform vec3 u_border_color;
        void main(){
          gl_FragColor = vec4(u_border_color,1.0);
        }
      `});this.line=new g(o,t),this.line.position.copy(e.position),this.line.rotation.copy(e.rotation),this.line.scale.copy(e.scale)}computeBoundingBox(e){var s=new m;e.geometry.computeBoundingBox(),e.geometry.computeBoundingSphere();const{max:o,min:t}=e.geometry.boundingBox;return s.x=o.x-t.x,s.y=o.y-t.y,s.z=o.z-t.z,s}render(){const{mesh:e,baseColor:s,headerColor:o}=this.options,a=this.computeBoundingBox(e).y,n=new l({color:16777215});n.onBeforeCompile=i=>{this.shader=i,i.uniforms={...i.uniforms,u_header_color:{value:new r(o)},u_base_color:{value:new r(s)},u_size:{value:a}},i.vertexShader=i.vertexShader.replace("void main() {",`
      varying vec3 v_position;
        void main(){
          v_position = position;
      `),i.fragmentShader=i.fragmentShader.replace("void main() {",`
      uniform vec3 u_base_color;
      uniform vec3 u_header_color;
      uniform float u_size;
      varying vec3 v_position;
      void main(){
    `),i.fragmentShader=i.fragmentShader.replace("#include <opaque_fragment>",`
      #ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
vec3 color = mix(u_base_color,u_header_color,v_position.y / u_size);
vec3 gradient = mix(vec3(0.0,0.1,0.1), vec3(0.0,1.0,1.0),v_position.y / u_size);
outgoingLight = outgoingLight * color;
gl_FragColor = vec4(outgoingLight, diffuseColor.a);
      `)},this.instance=new d(e.geometry,n),this.instance.position.copy(e.position),this.instance.rotation.copy(e.rotation),this.instance.scale.copy(e.scale)}setParent(e){e.add(this.instance),this.options.border&&this.instance.add(this.line)}}class V{constructor(e){this.options=Object.assign({},{mesh:null,color:"#4d88ff",border:!1,borderColor:"#4d88ff",borderOpacity:.3},e),this.instance=null,this.renderMesh(),this.options.border&&this.renderEdge()}renderMesh(){let{color:e,mesh:s}=this.options;const o=new u({uniforms:{u_base_color:{value:new r(e)}},vertexShader:`
        varying vec3 vNormal;
        void main() 
        {
            vNormal = normalize( normalMatrix * normal ); 
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,fragmentShader:`
        varying vec3 vNormal;
        uniform vec3 u_base_color;
        void main() 
        {
            vec3 z = vec3(0.0,0.0,1.0);
            float x = abs(dot(vNormal, z));
            // float alpha = 1.0-x;
            float alpha = pow( 1.0 - x, 3.0 );
            gl_FragColor = vec4( u_base_color, alpha );
        }
      `,transparent:!0});s.material=o,this.instance=s}renderEdge(){let{borderColor:e,borderOpacity:s,mesh:o}=this.options;var t=new p(o.geometry,1),a=new f({color:new r(e),transparent:!0,opacity:s}),n=new g(t,a);o.add(n)}setParent(e){e.add(this.instance)}}const j="/sayhello-site/assets/shanghai-p-4c6f0ab3.glb",H="/sayhello-site/assets/changjiang-a4c29f56.glb",U="/sayhello-site/assets/上海中心大厦-852817f0.png";class W{constructor(e=null){this.onLoadCallback=e,this.init()}init(){this.instance=new M({dracoPath:"/draco/gltf/"}),this.instance.on("onProgress",(s,o,t)=>{let n=(o/t*100).toFixed(2)+"%!";console.log(n)}),this.instance.on("onLoad",()=>{console.log("资源加载完成"),this.onLoadCallback&&this.onLoadCallback()});let e=[{type:"GLTF",name:"shanghai",path:j},{type:"GLTF",name:"changjiang",path:H},{type:"Texture",name:"modelTexture",path:U},{type:"Texture",name:"posx",path:R},{type:"Texture",name:"negx",path:T},{type:"Texture",name:"posy",path:E},{type:"Texture",name:"negy",path:P},{type:"Texture",name:"posz",path:G},{type:"Texture",name:"negz",path:k}];this.instance.loadAll(e)}}class Y extends B{constructor(e){super(e),this.camera.instance.position.set(-4.138421885457592,2.910079031899965,14.790428639024),this.camera.instance.far=1e4,this.camera.instance.near=1,this.scene.background=new r("#2c2a92"),this.scene.fog=new y(2894482,.02),this.initSetting(),this.initEnvironment(),this.assets=new W(()=>{this.createModel(),this.createPlane()})}initEnvironment(){let e=new v(16777215,.5);this.scene.add(e);let s=new _(16777215,.5);s.position.set(10,15,-10),s.castShadow=!0;let o=new x(s,2);this.scene.add(s,o);const t=this.debug.instance.addFolder("Environment");t.add(s.position,"x",-30,30,1),t.add(s.position,"y",-30,30,1),t.add(s.position,"z",-30,30,1),t.onChange(a=>{o.update()})}initSetting(){this.debug=new S(!0),this.stats=new L,document.body.appendChild(this.stats.dom),this.setAxesHelper(10)}createModel(){this.cityGroup=new b,this.shanghai=this.assets.instance.getResource("shanghai"),this.changjiang=this.assets.instance.getResource("changjiang"),this.changjiang.scene.traverse(t=>{if(t.isMesh){const a=new d(t.geometry,new l({color:179711}));a.position.copy(t.position),a.rotation.copy(t.rotation),a.scale.copy(t.scale),this.scene.add(a)}});let e=["东方明珠塔","上海中心大厦","上海环球金融中心","上海金茂大厦","建筑底座","建筑底座2"],s=["build","landuse"],o=this.assets.instance.getResource("modelTexture");o.wrapS=h,o.wrapT=h,o.flipY=!1,e.map(t=>{let a=this.shanghai.scene.getObjectByName(t).clone();t==="东方明珠塔"?a.traverse(n=>{if(n&&!n.isMesh)return!1;new V({mesh:n,color:"#82a9f7",border:!0,borderColor:"#82a9f7",borderOpacity:.1}).setParent(this.scene)}):a.traverse(n=>{n.isMesh&&(n.material=new l({color:16777215,map:o}))}),this.scene.add(a)}),this.shanghai.scene.traverse(t=>{if(t.isMesh&&s.includes(t.name)){let a=new D({mesh:t.clone(),headerColor:"#4d88ff",baseColor:"#2c2a92",border:!0});a.setParent(this.cityGroup);const n=this.debug.instance.addFolder("build"+t.name);n.addColor(a.options,"baseColor").onChange(i=>{a.shader.uniforms.u_base_color.value=new r(i)}),n.addColor(a.options,"headerColor").onChange(i=>{a.shader.uniforms.u_header_color.value=new r(i)})}}),this.scene.add(this.cityGroup)}createPlane(){const e=new d(new w(100,100),new C({color:2894482}));e.rotateX(-Math.PI/2),e.position.setY(-.1),this.scene.add(e)}createSkyBox(){new z({size:100,textures:{posx:this.assets.instance.getResource("posx"),posy:this.assets.instance.getResource("posy"),posz:this.assets.instance.getResource("posz"),negx:this.assets.instance.getResource("negx"),negy:this.assets.instance.getResource("negy"),negz:this.assets.instance.getResource("negz")}}).setParent(this.scene)}update(){super.update(),this.stats&&this.stats.update()}destroy(){super.destroy(),this.debug.destroy(),document.body.removeChild(this.stats.dom)}}const q={id:"canvas"},Q={__name:"city",setup(c){let e=null;return F(()=>{e=new Y(document.getElementById("canvas"))}),N(()=>{e&&e.destroy()}),(s,o)=>(O(),I("canvas",q))}},ae=A(Q,[["__scopeId","data-v-be086345"]]);export{ae as default};
