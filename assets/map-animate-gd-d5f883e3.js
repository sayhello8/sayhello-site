import{_ as $,a as H}from"./animate2-2f11d126.js";import{F as X,G as M,V as g,a as F,M as v,O as q,S as j,E as Q,b,c as U,D as S,C as x,R as w,d as O,e as W,L as A,B as Y,f as J,g as K,A as Z,h as ee,i as te,P as ae,j as re,k as ne,l as L,m as B,n as P,N as ie,o as oe}from"./OrbitControls-9c9ee6bc.js";import{R as se,g as T,V as le,m as ce,M as de}from"./index-1453e2ee.js";import{D as ue}from"./index-4ec0cc76.js";import{G as he}from"./Grid-77f5dd1e.js";import{L as pe}from"./Label3d-1a598e21.js";import{G as I,P as R}from"./GradientShader-7cc661aa.js";import{g as m}from"./index-4db78ffb.js";import{c as fe,s as me}from"./chinaBlurLine-b7b06be6.js";import{o as ge}from"./ocean-bg-19f8644c.js";import{h as ve,r as ye,g as we,a as be}from"./rotationBorder1-447bf02a.js";import{r as xe}from"./rotationBorder2-a143eae0.js";import{w as Ce}from"./szxs_logo-02219344.js";import{t as N}from"./utils-9af1928d.js";import{L as Me,a as Se}from"./Line2-7598ed88.js";import{l as E}from"./label-icon-aa0c6fbf.js";import{E as Le,R as Pe,S as _e}from"./RenderPass-5ccd0f1e.js";import{a as Ge}from"./three.interactive-c6512469.js";import{g as Be,h as Oe,o as Ae,c as Ee,b as _}from"./index-9ee60282.js";import"./lil-gui.module.min-f00c3c61.js";class ze{constructor(t=null){this.onLoadCallback=t,this.init()}init(){this.instance=new se,this.instance.addLoader(X,"FileLoader"),this.instance.on("onProgress",(r,e,n)=>{(e/n*100).toFixed(2)+""}),this.instance.on("onLoad",()=>{this.onLoadCallback&&this.onLoadCallback()});let t="/sayhello-site/",a=[{type:"Texture",name:"huiguang",path:ve},{type:"Texture",name:"watermark",path:Ce},{type:"Texture",name:"rotationBorder1",path:ye},{type:"Texture",name:"rotationBorder2",path:xe},{type:"Texture",name:"guangquan1",path:we},{type:"Texture",name:"guangquan2",path:be},{type:"Texture",name:"chinaBlurLine",path:fe},{type:"Texture",name:"ocean",path:ge},{type:"Texture",name:"side",path:me},{type:"File",name:"guangdong",path:t+"assets/json/广东省.json"},{type:"File",name:"china",path:t+"assets/json/中华人民共和国.json"}];this.instance.loadAll(a)}}class Te{constructor({assets:t,time:a},r={}){this.mapGroup=new M,this.assets=t,this.time=a,this.coordinates=[],this.config=Object.assign({position:new g(0,0,0),center:new F(0,0),data:"",renderOrder:1,topFaceMaterial:new v({color:1582651,transparent:!0,opacity:1}),sideMaterial:new v({color:464171,transparent:!0,opacity:1}),depth:.1},r),this.mapGroup.position.copy(this.config.position);let e=N(this.config.data);this.create(e),console.log(this.mapGroup)}geoProjection(t){return T().center(this.config.center).scale(120).translate([0,0])(t)}create(t){t.features.forEach(a=>{const r=new q;let{name:e,center:n=[],centroid:i=[]}=a.properties;this.coordinates.push({name:e,center:n,centroid:i});const d={depth:this.config.depth,bevelEnabled:!0,bevelSegments:1,bevelThickness:.1};let o=[this.config.topFaceMaterial,this.config.sideMaterial];a.geometry.coordinates.forEach(l=>{l.forEach((c,s)=>{const p=new j;for(let f=0;f<c.length;f++){if(!c[f][0]||!c[f][1])return!1;const[y,G]=this.geoProjection(c[f]);f===0&&p.moveTo(y,-G),p.lineTo(y,-G)}const u=new Q(p,d),h=new b(u,o);r.add(h)})}),this.mapGroup.add(r)})}createMaterial(){let t=new U({color:16777215,transparent:!0,opacity:1,fog:!1,side:S});t.onBeforeCompile=e=>{e.uniforms={...e.uniforms,uColor1:{value:new x(2781042)},uColor2:{value:new x(860197)}},e.vertexShader=e.vertexShader.replace("void main() {",`
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `),e.fragmentShader=e.fragmentShader.replace("void main() {",`
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `),e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.x/15.78); // 15.78
      
      outgoingLight = outgoingLight*gradient;
      float topAlpha = 0.5;
      if(vPosition.z>0.3){
        diffuseColor.a *= topAlpha;
      }
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `)};let a=this.assets.instance.getResource("side");a.wrapS=w,a.wrapT=w,a.repeat.set(1,1.5),a.offset.y+=.065;let r=new O({color:16777215,map:a,fog:!1,opacity:1,side:S});return this.time.on("tick",()=>{a.offset.y+=1e-4}),r.onBeforeCompile=e=>{e.uniforms={...e.uniforms,uColor1:{value:new x(2781042)},uColor2:{value:new x(2781042)}},e.vertexShader=e.vertexShader.replace("void main() {",`
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `),e.fragmentShader=e.fragmentShader.replace("void main() {",`
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `),e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2);
      
      outgoingLight = outgoingLight*gradient;
      
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `)},[t,r]}getCoordinates(){return this.coordinates}setParent(t){t.add(this.mapGroup)}}class D{constructor({},t={}){this.mapGroup=new M,this.coordinates=[],this.config=Object.assign({position:new le(0,0,0),center:new F(0,0),data:"",renderOrder:1,merge:!1,material:new v({color:1582651,transparent:!0,opacity:1})},t),this.mapGroup.position.copy(this.config.position);let a=N(this.config.data);this.create(a)}geoProjection(t){return T().center(this.config.center).scale(120).translate([0,0])(t)}create(t){let{merge:a}=this.config,r=[];if(t.features.forEach(e=>{const n=new q;let{name:i,center:d=[],centroid:o=[]}=e.properties;this.coordinates.push({name:i,center:d,centroid:o}),n.userData.name=i,e.geometry.coordinates.forEach(l=>{l.forEach(c=>{const s=new j;for(let u=0;u<c.length;u++){if(!c[u][0]||!c[u][1])return!1;const[h,f]=this.geoProjection(c[u]);u===0&&s.moveTo(h,-f),s.lineTo(h,-f)}const p=new W(s);if(a)r.push(p);else{const u=new b(p,this.config.material);u.userData.name=i,u.renderOrder=this.config.renderOrder,n.add(u)}})}),a||this.mapGroup.add(n)}),a){let e=ce(r);const n=new b(e,this.config.material);n.renderOrder=this.config.renderOrder,this.mapGroup.add(n)}}getCoordinates(){return this.coordinates}setParent(t){t.add(this.mapGroup)}}class z{constructor({},t={}){this.config=Object.assign({visibelProvince:"",center:[0,0],data:"",material:new A({color:16777215}),type:"LineLoop",renderOrder:1},t);let a=N(this.config.data),r=this.create(a);this.lineGroup=r}geoProjection(t){return T().center(this.config.center).scale(120).translate([0,0])(t)}create(t){const{type:a,visibelProvince:r}=this.config;let e=t.features,n=new M;for(let i=0;i<e.length;i++){const d=e[i];d.properties.name!==r&&d.geometry.coordinates.forEach(o=>{const l=[];let c=null;a==="Line2"?(o[0].forEach(s=>{const[p,u]=this.geoProjection(s);l.push(p,-u,0)}),c=this.createLine2(l)):o[0].forEach(s=>{const[p,u]=this.geoProjection(s);l.push(new g(p,-u,0)),c=this.createLine(l)}),n.add(c)})}return n}createLine2(t){const{material:a,renderOrder:r}=this.config,e=new Me;e.setPositions(t);let n=new Se(e,a);return n.name="mapLine2",n.renderOrder=r,n.computeLineDistances(),n}createLine(t){const{material:a,renderOrder:r,type:e}=this.config,n=new Y;n.setFromPoints(t);let i=new J(n,a);return i.renderOrder=r,i.name="mapLine",i}setParent(t){t.add(this.lineGroup)}}const Ne=[{name:"北京市",center:[116.405285,39.904989],centroid:[116.41995,40.18994],hide:!0},{name:"天津市",center:[117.190182,39.125596],centroid:[117.347043,39.288036],hide:!0},{name:"河北省",center:[114.502461,38.045474],centroid:[114.502461,38.045474],hide:!0},{name:"山西省",center:[112.549248,37.857014],centroid:[112.304436,37.618179],hide:!0},{name:"内蒙古自治区",center:[111.670801,40.818311],centroid:[114.077429,44.331087],hide:!0},{name:"辽宁省",center:[123.429096,41.796767],centroid:[122.604994,41.299712],hide:!0},{name:"吉林省",center:[125.3245,43.886841],centroid:[126.171208,43.703954],hide:!0},{name:"黑龙江省",center:[126.642464,45.756967],centroid:[127.693027,48.040465],hide:!0},{name:"上海市",center:[121.472644,31.231706],centroid:[121.438737,31.072559],hide:!0},{name:"江苏省",center:[118.767413,32.041544],centroid:[119.486506,32.983991],hide:!0},{name:"浙江省",center:[120.153576,30.287459],centroid:[120.109913,29.181466],hide:!0},{name:"安徽省",center:[117.283042,31.86119],centroid:[117.226884,31.849254],hide:!0},{name:"福建省",center:[119.306239,26.075302],centroid:[118.006468,26.069925],blur:!0},{name:"江西省",center:[115.892151,28.676493],centroid:[115.732975,27.636112],blur:!0},{name:"山东省",center:[117.000923,36.675807],centroid:[118.187759,36.376092],hide:!0},{name:"河南省",center:[113.665412,34.757975],centroid:[113.619717,33.902648],hide:!0},{name:"湖北省",center:[114.298572,30.584355],centroid:[112.271301,30.987527],hide:!0},{name:"湖南省",center:[112.982279,28.19409],centroid:[111.711649,27.629216],blur:!0},{name:"广东省",center:[113.280637,23.125178],centroid:[113.429919,23.334643],hide:!0},{name:"广西壮族自治区",center:[108.320004,22.82402],centroid:[108.7944,23.833381]},{name:"海南省",center:[110.33119,20.031971],centroid:[109.754859,19.189767],hide:!0},{name:"重庆市",center:[106.504962,29.533155],centroid:[107.8839,30.067297],blur:!0},{name:"四川省",center:[104.065735,30.659462],centroid:[102.693453,30.674545],hide:!0},{name:"贵州省",center:[106.713478,26.578343],centroid:[106.880455,26.826368],blur:!0},{name:"云南省",center:[102.712251,25.040609],centroid:[101.485106,25.008643],hide:!0},{name:"西藏自治区",center:[91.132212,29.660361],centroid:[88.388277,31.56375],hide:!0},{name:"陕西省",center:[108.948024,34.263161],centroid:[108.887114,35.263661],hide:!0},{name:"甘肃省",center:[103.823557,36.058039],centroid:[103.823557,36.058039],hide:!0},{name:"青海省",center:[101.778916,36.623178],centroid:[96.043533,35.726403],hide:!0},{name:"宁夏回族自治区",center:[106.278179,38.46637],centroid:[106.169866,37.291332],hide:!0},{name:"新疆维吾尔自治区",center:[87.617733,43.792818],centroid:[85.294711,41.371801],hide:!0},{name:"台湾省",center:[121.509062,25.044332],centroid:[120.971485,23.749452]},{name:"香港特别行政区",center:[114.173355,22.320048],centroid:[114.134357,22.377366],hide:!0},{name:"澳门特别行政区",center:[113.54909,22.198951],centroid:[113.566988,22.159307],hide:!0}],Ie=[{name:"广州市",enName:"guangzhou",center:[113.280637,23.125178],centroid:[113.544372,23.329249],value:100},{name:"韶关市",center:[113.591544,24.801322],centroid:[113.779323,24.81941],value:32},{name:"深圳市",enName:"shenzhen",center:[114.085947,22.547],centroid:[114.143142,22.643377],value:79},{name:"珠海市",enName:"zhuhai",center:[113.553986,22.224979],centroid:[113.337286,22.160135],value:68},{name:"汕头市",enName:"shantou",center:[116.708463,23.37102],centroid:[116.575361,23.322231],value:56},{name:"佛山市",enName:"foushan",center:[113.122717,23.028762],centroid:[112.949778,23.004314],value:52},{name:"江门市",center:[113.094942,22.590431],centroid:[112.676451,22.284348],value:18},{name:"湛江市",enName:"zhanjiang",center:[110.364977,21.274898],centroid:[110.109828,21.047893],value:48},{name:"茂名市",enName:"maoming",center:[110.919229,21.659751],centroid:[110.958736,22.008884],value:51},{name:"肇庆市",center:[112.472529,23.051546],centroid:[112.210411,23.536359],value:26},{name:"惠州市",center:[114.412599,23.079404],centroid:[114.507032,23.234461],value:23},{name:"梅州市",center:[116.117582,24.299112],centroid:[116.084478,24.201791],value:26},{name:"汕尾市",center:[115.364238,22.774485],centroid:[115.53778,23.004558],value:18},{name:"河源市",center:[114.697802,23.746266],centroid:[114.962729,24.043541],value:30},{name:"阳江市",center:[111.975107,21.859222],centroid:[111.779569,22.02617],value:31},{name:"清远市",center:[113.051227,23.685022],centroid:[112.879397,24.313361],value:32},{name:"东莞市",center:[113.746262,23.046237],centroid:[113.879966,22.931879],value:22},{name:"中山市",center:[113.382391,22.521113],centroid:[113.398784,22.517323],value:18},{name:"潮州市",center:[116.632301,23.661701],centroid:[116.790217,23.783155],value:22},{name:"揭阳市",center:[116.355733,23.543778],centroid:[116.124317,23.334057],value:31},{name:"云浮市",center:[112.044439,22.929801],centroid:[111.798791,22.813664],value:27}],Re={uniforms:{tDiffuse:{value:null},_Brightness:{value:1},_Saturation:{value:1},_Contrast:{value:1}},vertexShader:`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDiffuse;
		uniform float _Brightness;
		uniform float _Saturation;
		uniform float _Contrast;
		varying vec2 vUv;
		vec3 lerpColor(vec3 col1,vec3 col2, float value){
			vec3 newCol = vec3 ((col1.r * (1.0 - value) + col2.r * value), (col1.g * (1.0 - value) + col2.g * value), (col1.b * (1.0 - value) + col2.b * value));
			return newCol;
		}
		float mylerp(float a,float b, float value){
			return (a * (1.0 - value) + b * value);
		}
		void main() {
			// 获取原图的颜色rgba
			vec4 color = texture2D(tDiffuse, vUv);
			//brigtness亮度直接乘以一个系数，也就是RGB整体缩放，调整亮度
			vec3 finalColor = color.rgb * _Brightness;
			//saturation饱和度：首先根据公式计算同等亮度情况下饱和度最低的值：
			float gray = 0.2125 * color.r + 0.7154 * color.g + 0.0721 * color.b;
			vec3 grayColor = vec3(gray, gray, gray);
			//根据Saturation在饱和度最低的图像和原图之间差值
			finalColor = lerpColor(grayColor, finalColor, _Saturation);
			//contrast对比度：首先计算对比度最低的值
			vec3 avgColor = vec3(0.5, 0.5, 0.5);
			//根据Contrast在对比度最低的图像和原图之间差值
			finalColor = lerpColor(avgColor, finalColor, _Contrast);
			// 结果rgb,透明度保持原值即可
			gl_FragColor = vec4(vec3(finalColor), color.a);
		}`};function De(C){return C.sort((t,a)=>a.value-t.value),C}class Fe extends de{constructor(t,a){super(t,a),this.pointCenter=[113.280637,23.125178],this.scene.fog=new K(596769,1,50),this.scene.background=new x(596769),this.camera.instance.position.set(-13.767695123014105,12.990152163077308,39.28228164159694),this.camera.instance.near=1,this.camera.instance.far=1e4,this.camera.instance.updateProjectionMatrix(),this.interactionManager=new Ge(this.renderer.instance,this.camera.instance,this.canvas),this.initSetting(),this.initEnvironment(),this.createPost(),this.assets=new ze(()=>{this.labelGroup=new M,this.label3d=new pe(this),this.labelGroup.rotateX(-Math.PI/2),this.eventElement=[],this.defaultMaterial=null,this.defaultLightMaterial=null,this.scene.add(this.labelGroup),this.createFloor(),this.createChinaBlurLine(),this.createGrid(),this.createRotateBorder(),this.createLabel(),this.createModel(),this.createAnimateVideo(),this.createEvent();let r=m.timeline();r.addLabel("focusMap",3.5),r.addLabel("focusMapOpacity",4),r.addLabel("bar",5),r.add(m.to(this.camera.instance.position,{duration:2.5,delay:2,x:-.2515849818960619,y:12.397744557047988,z:14.647659671139275,ease:"circ.out"})),r.add(m.to(this.focusMapGroup.position,{duration:1,x:0,y:0,z:0}),"focusMap"),r.add(m.to(this.focusMapGroup.scale,{duration:1,x:1,y:1,z:1,ease:"circ.out"}),"focusMap"),r.add(m.to(this.focusMapTopMaterial,{duration:1,opacity:1,ease:"circ.out"}),"focusMapOpacity"),r.add(m.to(this.focusMapSideMaterial,{duration:1,opacity:1,ease:"circ.out",onComplete:()=>{this.focusMapSideMaterial.transparent=!1}}),"focusMapOpacity"),this.otherLabel.map((e,n)=>{let i=e.element.querySelector(".other-label");r.add(m.to(i,{duration:1,delay:.1*n,translateY:0,opacity:1,ease:"circ.out"}),"focusMapOpacity")}),r.add(m.to(this.guangdongLineMaterial,{duration:.5,delay:.3,opacity:1}),"focusMapOpacity"),r.add(m.to(this.rotateBorder1.scale,{delay:.3,duration:1,x:1,y:1,z:1,ease:"circ.out"}),"focusMapOpacity"),r.add(m.to(this.rotateBorder2.scale,{duration:1,delay:.5,x:1,y:1,z:1,ease:"circ.out"}),"focusMapOpacity"),this.allBar.map((e,n)=>{r.add(m.to(e.scale,{duration:1,delay:.1*n,x:1,y:1,z:1,ease:"circ.out"}),"bar")}),this.allBarMaterial.map((e,n)=>{r.add(m.to(e,{duration:1,delay:.1*n,opacity:1,ease:"circ.out"}),"bar")}),this.allProvinceLabel.map((e,n)=>{let i=e.element.querySelector(".provinces-label-wrap"),d=e.element.querySelector(".number .value"),o=Number(d.innerText),l={score:0};r.add(m.to(i,{duration:1,delay:.2*n,translateY:0,opacity:1,ease:"circ.out"}),"bar");let c=m.to(l,{duration:1,delay:.2*n,score:o,onUpdate:s});function s(){d.innerText=l.score.toFixed(0)}r.add(c,"bar")}),this.allGuangquan.map((e,n)=>{r.add(m.to(e.children[0].scale,{duration:1,delay:.1*n,x:1,y:1,z:1,ease:"circ.out"}),"bar"),r.add(m.to(e.children[1].scale,{duration:1,delay:.1*n,x:1,y:1,z:1,ease:"circ.out"}),"bar")})})}initEnvironment(){let t=new Z(16777215,3);this.scene.add(t);let a=new ee(16777215,8);if(a.position.set(-30,6,-8),a.castShadow=!0,a.shadow.radius=20,a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,this.scene.add(a),this.debug.active){let r=new te(a,2);this.scene.add(r);const e=this.debug.instance.addFolder("Environment");e.add(a.position,"x",-30,30,1),e.add(a.position,"y",-30,30,1),e.add(a.position,"z",-30,30,1),e.add(a,"intensity",1,100,1),e.add(t,"intensity",1,10,1),e.onChange(n=>{r.update()})}this.createPointLight({color:"#1d5e5e",intensity:600,distance:1e4,x:-9,y:3,z:-3}),this.createPointLight({color:"#1d5e5e",intensity:230,distance:1e4,x:0,y:2,z:5})}createPost(){let t={_Saturation:1,_Brightness:1,_Contrast:1};const a=new Le(this.renderer.instance);a.addPass(new Pe(this.scene,this.camera.instance));const r=new _e(Re);if(r.uniforms._Brightness.value=t._Brightness,r.uniforms._Saturation.value=t._Saturation,r.uniforms._Contrast.value=t._Contrast,a.addPass(r),this.composer=a,this.renderer.postprocessing=!1,this.renderer.composer=a,this.debug.active){const e=this.debug.instance.addFolder("postprocessing");e.add(t,"_Brightness",-3,3,.01).onChange(n=>{r.uniforms._Brightness.value=Number(n)}),e.add(t,"_Saturation",-3,3,.01).onChange(n=>{r.uniforms._Saturation.value=Number(n)}),e.add(t,"_Contrast",-3,3,.01).onChange(n=>{r.uniforms._Contrast.value=Number(n)}),e.add(this.renderer,"postprocessing")}}createPointLight(t){const a=new ae(1924702,t.intensity,t.distance,1);if(a.position.set(t.x,t.y,t.z),this.scene.add(a),this.debug.active){const r=new re(a,1);this.scene.add(r);const e=this.debug.instance.addFolder("Point"+Math.random());e.addColor(t,"color"),e.add(t,"intensity",1,2e4,10),e.add(t,"distance",100,1e5,10),e.add(t,"x",-30,30,1),e.add(t,"y",-30,30,1),e.add(t,"z",-30,30,1),e.onChange(({object:n})=>{a.color=new x(n.color),a.distance=n.distance,a.intensity=n.intensity,a.position.set(n.x,n.y,n.z),r.update()})}}initSetting(){this.debug=new ue(!1),this.renderer.instance.shadowMap.enabled=!1,this.renderer.resize()}createModel(){let t=new M,a=new M;this.focusMapGroup=a;let{china:r,chinaTopLine:e,chinaBottomLine:n}=this.createChina(),{guangdong:i,guangdongTop:d,guangdonLine:o}=this.createProvince();r.setParent(t),e.setParent(t),i.setParent(a),d.setParent(a),o.setParent(a),a.position.set(0,0,-.01),a.scale.set(1,1,0),t.add(a),t.rotateX(-Math.PI/2),t.position.set(0,.2,0),this.scene.add(t),this.createBar()}createChina(){let t=this.assets.instance.getResource("china"),a=new D(this,{data:t,center:this.pointCenter,merge:!1,material:new U({color:1190450,transparent:!0,opacity:1}),renderOrder:2}),r=new z(this,{center:this.pointCenter,visibelProvince:"广东省",data:t,material:new A({color:3969700}),renderOrder:3});r.lineGroup.position.z+=.01;let e=new z(this,{center:this.pointCenter,data:t,material:new A({color:3969700,transparent:!0,opacity:.4}),renderOrder:3});return e.lineGroup.position.z-=.59,{china:a,chinaTopLine:r,chinaBottomLine:e}}createProvince(){let t=this.assets.instance.getResource("guangdong"),[a,r]=this.createProvinceMaterial();this.focusMapTopMaterial=a,this.focusMapSideMaterial=r;let e=new Te(this,{center:this.pointCenter,position:new g(0,0,.11),data:t,depth:.5,topFaceMaterial:a,sideMaterial:r,renderOrder:9}),n=new O({color:16777215,transparent:!0,opacity:.5});new I(n),this.defaultMaterial=n,this.defaultLightMaterial=this.defaultMaterial.clone(),this.defaultLightMaterial.emissive.setHex(725293),this.defaultLightMaterial.emissiveIntensity=3.5;let i=new D(this,{center:this.pointCenter,position:new g(0,0,.72),data:t,material:n,renderOrder:2});i.mapGroup.children.map(o=>{o.children.map(l=>{l.type==="Mesh"&&this.eventElement.push(l)})}),this.guangdongLineMaterial=new A({color:16777215,opacity:0,transparent:!0,fog:!1});let d=new z(this,{center:this.pointCenter,data:t,material:this.guangdongLineMaterial,renderOrder:3});return d.lineGroup.position.z+=.73,{guangdong:e,guangdongTop:i,guangdonLine:d}}createProvinceMaterial(){let t=new O({color:16777215,transparent:!0,opacity:0,fog:!1,side:S});t.onBeforeCompile=e=>{e.uniforms={...e.uniforms,uColor1:{value:new x(2781042)},uColor2:{value:new x(860197)}},e.vertexShader=e.vertexShader.replace("void main() {",`
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `),e.fragmentShader=e.fragmentShader.replace("void main() {",`
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `),e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.x/15.78); // 15.78
      
      outgoingLight = outgoingLight*gradient;
      float topAlpha = 0.5;
      if(vPosition.z>0.3){
        diffuseColor.a *= topAlpha;
      }
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `)};let a=this.assets.instance.getResource("side");a.wrapS=w,a.wrapT=w,a.repeat.set(1,1.5),a.offset.y+=.065;let r=new O({color:16777215,map:a,fog:!1,opacity:0,side:S});return this.time.on("tick",()=>{a.offset.y+=.005}),r.onBeforeCompile=e=>{e.uniforms={...e.uniforms,uColor1:{value:new x(2781042)},uColor2:{value:new x(2781042)}},e.vertexShader=e.vertexShader.replace("void main() {",`
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `),e.fragmentShader=e.fragmentShader.replace("void main() {",`
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `),e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2);
      
      outgoingLight = outgoingLight*gradient;
      
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `)},[t,r]}createEvent(){let t=[];const a=e=>{e.traverse(n=>{n.isMesh&&(n.material=this.defaultMaterial)})},r=e=>{e.traverse(n=>{n.isMesh&&(n.material=this.defaultLightMaterial)})};this.eventElement.map(e=>{this.interactionManager.add(e),e.addEventListener("mousedown",n=>{console.log(n.target.userData.name)}),e.addEventListener("mouseover",n=>{t.includes(n.target.parent)||t.push(n.target.parent),document.body.style.cursor="pointer",r(n.target.parent)}),e.addEventListener("mouseout",n=>{t=t.filter(i=>i.userData.name!==n.target.parent.userData.name),t.length>0&&t[t.length-1],a(n.target.parent),document.body.style.cursor="default"})})}createBar(){let t=this,a=De(Ie).filter((o,l)=>l<7);const r=new M,e=.7,n=4*e,i=a[0].value;this.allBar=[],this.allBarMaterial=[],this.allGuangquan=[],this.allProvinceLabel=[],a.map((o,l)=>{let c=n*(o.value/i),s=new v({color:16777215,transparent:!0,opacity:0,depthTest:!1,fog:!1});new I(s,{uColor1:l>3?16506760:5291006,uColor2:l>3?16776948:7863285,size:c,dir:"y"});const p=new ne(.1*e,.1*e,c);p.translate(0,0,c/2);const u=new b(p,s);u.renderOrder=5;let h=u,[f,y]=this.geoProjection(o.centroid);h.position.set(f,-y,.95),h.scale.set(1,1,0);let G=this.createQuan(new g(f,.94,y),l),k=this.createHUIGUANG(c,l>3?16776948:7863285);h.add(...k),r.add(h),r.rotation.x=-Math.PI/2;let V=d(o,l,new g(f,-y,1.6+c));this.allBar.push(h),this.allBarMaterial.push(s),this.allGuangquan.push(G),this.allProvinceLabel.push(V)}),this.scene.add(r);function d(o,l,c){let s=t.label3d.create("","provinces-label",!1);return s.init(`<div class="provinces-label ${l>4?"yellow":""}">
      <div class="provinces-label-wrap">
        <div class="number"><span class="value">${o.value}</span><span class="unit">万人</span></div>
        <div class="name">
          <span class="zh">${o.name}</span>
          <span class="en">${o.enName.toUpperCase()}</span>
        </div>
        <div class="no">${l+1}</div>
      </div>
    </div>`,c),t.label3d.setLabelStyle(s,.01,"x"),s.setParent(t.labelGroup),s}}createHUIGUANG(t,a){let r=new L(.35,t);r.translate(0,t/2,0);const e=this.assets.instance.getResource("huiguang");e.colorSpace=B,e.wrapS=w,e.wrapT=w;let n=new v({color:a,map:e,transparent:!0,opacity:.4,depthWrite:!1,side:S,blending:P}),i=new b(r,n);i.renderOrder=10,i.rotateX(Math.PI/2);let d=i.clone(),o=i.clone();return d.rotateY(Math.PI/180*60),o.rotateY(Math.PI/180*120),[i,d,o]}createQuan(t,a){const r=this.assets.instance.getResource("guangquan1"),e=this.assets.instance.getResource("guangquan2");let n=new L(.5,.5),i=new v({color:16777215,map:r,alphaMap:r,opacity:1,transparent:!0,depthTest:!1,fog:!1,blending:P}),d=new v({color:16777215,map:e,alphaMap:e,opacity:1,transparent:!0,depthTest:!1,fog:!1,blending:P}),o=new b(n,i),l=new b(n,d);return o.renderOrder=6,l.renderOrder=6,o.rotateX(-Math.PI/2),l.rotateX(-Math.PI/2),o.position.copy(t),l.position.copy(t),l.position.y-=.001,o.scale.set(0,0,0),l.scale.set(0,0,0),this.quanGroup=new M,this.quanGroup.add(o,l),this.scene.add(this.quanGroup),this.time.on("tick",()=>{o.rotation.z+=.05}),this.quanGroup}createGrid(){new he(this,{gridSize:50,gridDivision:20,gridColor:1923944,shapeSize:.5,shapeColor:2655878,pointSize:.1,pointColor:1262670,diffuse:!0,diffuseSpeed:10,diffuseColor:3844268})}createFloor(){let t=new L(20,20);const a=this.assets.instance.getResource("ocean");a.colorSpace=B,a.wrapS=w,a.wrapT=w,a.repeat.set(1,1);let r=new v({map:a,opacity:1}),e=new b(t,r);e.rotateX(-Math.PI/2),e.position.set(0,-.7,0),this.scene.add(e)}createChinaBlurLine(){let t=new L(147,147);const a=this.assets.instance.getResource("chinaBlurLine");a.colorSpace=B,a.wrapS=w,a.wrapT=w,a.generateMipmaps=!1,a.minFilter=ie,a.repeat.set(1,1);let r=new v({color:3969700,alphaMap:a,transparent:!0,opacity:.5}),e=new b(t,r);if(e.rotateX(-Math.PI/2),e.position.set(-19.3,-.5,-19.7),this.scene.add(e),this.debug.active){const n=this.debug.instance.addFolder("blurLine");n.add(e.position,"x",-100,100,.1),n.add(e.position,"y",-100,100,.1),n.add(e.position,"z",-100,100,.1)}}createAnimateVideo(){this.createAnimateVideoItem(".map-gd-video1",new g(11,.4,1)),this.createAnimateVideoItem(".map-gd-video2",new g(-11,.4,2))}createAnimateVideoItem(t,a){let r=document.querySelector(t);window.addEventListener("pointerdown",()=>{r.play()});let e=new oe(r);e.colorSpace=B;let n=1.2,i=new L(2.5*n,1*n),d=new v({color:10807286,alphaMap:e,transparent:!0,opacity:1,blending:P}),o=new b(i,d);o.rotateX(-Math.PI/2),o.position.copy(a),o.renderOrder=10,this.scene.add(o)}createLabel(){let t=this,a=this.labelGroup,r=this.label3d,e=[];Ne.map(s=>{if(s.hide==!0)return!1;let p=o(s,r,a);e.push(p)});let n=l({name:"广东省",enName:"GUANGDONG PROVINCE",center:[113.280637,20.625178]},r,a),i=c({icon:E,center:[118.280637,21.625178],width:"40px",height:"40px",reflect:!0},r,a),d=c({icon:E,center:[106.280637,25.625178],width:"20px",height:"20px",reflect:!1},r,a);e.push(n),e.push(i),e.push(d),this.otherLabel=e;function o(s,p,u){let h=p.create("",`china-label ${s.blur?" blur":""}`,!1);const[f,y]=t.geoProjection(s.center);return h.init(`<div class="other-label"><img class="label-icon" src="${E}">${s.name}</div>`,new g(f,-y,.4)),p.setLabelStyle(h,.02,"x"),h.setParent(u),h}function l(s,p,u){let h=p.create("","guangdong-label",!1);const[f,y]=t.geoProjection(s.center);return h.init(`<div class="other-label"><span>${s.name}</span><span>${s.enName}</span></div>`,new g(f,-y,.4)),p.setLabelStyle(h,.02,"x"),h.setParent(u),h}function c(s,p,u){let h=p.create("",`decoration-label  ${s.reflect?" reflect":""}`,!1);const[f,y]=t.geoProjection(s.center);return h.init(`<div class="other-label"><img class="label-icon" style="width:${s.width};height:${s.height}" src="${s.icon}">`,new g(f,-y,.4)),p.setLabelStyle(h,.02,"x"),h.setParent(u),h}}createRotateBorder(){let t=12,a=this.assets.instance.getResource("rotationBorder1"),r=this.assets.instance.getResource("rotationBorder2"),e=new R(this,{width:t*1.178,needRotate:!0,rotateSpeed:.001,material:new v({map:a,color:2795692,transparent:!0,opacity:.2,side:S,depthWrite:!1,blending:P}),position:new g(0,.28,0)});e.instance.renderOrder=6,e.instance.scale.set(0,0,0),e.setParent(this.scene);let n=new R(this,{width:t*1.116,needRotate:!0,rotateSpeed:-.004,material:new v({map:r,color:2795692,transparent:!0,opacity:.4,side:S,depthWrite:!1,blending:P}),position:new g(0,.3,0)});n.instance.renderOrder=6,n.instance.scale.set(0,0,0),n.setParent(this.scene),this.rotateBorder1=e.instance,this.rotateBorder2=n.instance}createWatermark(){let t=this.assets.instance.getResource("watermark");t.wrapS=w,t.wrapT=w,t.repeat.set(50,50),t.rotation=Math.PI/5;let a=new L(100,100,1),r=new v({map:t,transparent:!0,opacity:.15}),e=new b(a,r);e.position.x-=10,e.position.y-=10,e.position.z-=10,e.renderOrder=999,this.camera.instance.add(e)}update(){super.update(),this.stats&&this.stats.update(),this.interactionManager&&this.interactionManager.update()}destroy(){super.destroy(),this.debug.destroy(),this.label3d&&this.label3d.destroy(),this.stats&&this.stats.dom&&document.body.removeChild(this.stats.dom)}}const qe={class:"map-gd"},je=_("canvas",{id:"canvas"},null,-1),Ue={ref:"video1",class:"map-gd-video map-gd-video1",width:"250",height:"100",loop:"",crossorigin:"anonymous",playsinline:"",style:{display:"none"}},ke=_("source",{src:$},null,-1),Ve=[ke],$e={ref:"video2",class:"map-gd-video map-gd-video2",width:"250",height:"100",loop:"",crossorigin:"anonymous",playsinline:"",style:{display:"none"}},He=_("source",{src:H},null,-1),Xe=[He],ft={__name:"map-animate-gd",setup(C){let t=null;return Be(()=>{t=new Fe(document.getElementById("canvas"),{geoProjectionCenter:[113.280637,23.125178]})}),Oe(()=>{t&&t.destroy()}),(a,r)=>(Ae(),Ee("div",qe,[je,_("video",Ue,Ve,512),_("video",$e,Xe,512)]))}};export{ft as default};
