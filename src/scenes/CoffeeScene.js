import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cl, sm, lerp } from '../animations/scrollAnimations';

// Builds the whole scroll-driven 3D scene. Returns a dispose function (or null if WebGL is unavailable).
export function createCoffeeScene(cv0, { onProgress, onReady, onThumbs, onFail }) {
const cv=cv0,mob=innerWidth<820,N=mob?140:320,PN=mob?120:260;
let R;try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!mob});if(!R.getContext())throw 0}catch(e){onFail&&onFail();return null}
R.setPixelRatio(Math.min(devicePixelRatio,2));
R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;R.outputEncoding=THREE.sRGBEncoding;
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(36,1,.1,60),root=new THREE.Group();S.add(root);
// studio environment (softboxes baked into a PMREM map for reflections)
{const pg=new THREE.PMREMGenerator(R),E=new THREE.Scene();
E.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0xd9c6a6,side:THREE.BackSide})));
const panel=(w,h,x,y,z,i)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(1,.95,.85).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);E.add(m)};
panel(14,8,0,13,2,6);panel(4,14,-12,2,4,5);panel(4,14,12,2,-2,3);panel(10,4,0,-1,13,3);
S.environment=pg.fromScene(E,.03).texture;pg.dispose()}
S.add(new THREE.HemisphereLight(0xfff3e0,0x8b5e3c,.5));
const dl=new THREE.DirectionalLight(0xfff0dc,1.1);dl.position.set(4,7,5);dl.castShadow=true;
dl.shadow.mapSize.set(mob?1024:2048,mob?1024:2048);Object.assign(dl.shadow.camera,{left:-5,right:5,top:6,bottom:-4,near:1,far:25});dl.shadow.bias=-.0005;dl.shadow.normalBias=.02;dl.shadow.radius=4;S.add(dl);
const rim=new THREE.DirectionalLight(0xffc88a,.8);rim.position.set(-5,3,-4);S.add(rim);const ff=new THREE.DirectionalLight(0xfff6ea,.55);ff.position.set(0,2,9);S.add(ff);
const pl=new THREE.PointLight(0xffb066,.6,20);pl.position.set(-3,0,4);S.add(pl);
// procedural PBR textures
const ct=(n,fn,srgb)=>{const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');fn(x,n);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(srgb)t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t};
const brushed=ct(256,(x,n)=>{x.fillStyle='#8a8a8a';x.fillRect(0,0,n,n);for(let i=0;i<1400;i++){const g=90+Math.random()*110|0;x.fillStyle=`rgba(${g},${g},${g},.5)`;x.fillRect(0,Math.random()*n,n,Math.random()*1.4)}});brushed.repeat.set(2,2);
const paper=ct(256,(x,n)=>{x.fillStyle='#efe6d4';x.fillRect(0,0,n,n);for(let i=0;i<2500;i++){const g=200+Math.random()*40|0;x.fillStyle=`rgba(${g},${g-10},${g-30},.35)`;x.fillRect(Math.random()*n,Math.random()*n,Math.random()*5+1,Math.random()*1.2)}},1);
const beanT=ct(128,(x,n)=>{x.fillStyle='#4a2a16';x.fillRect(0,0,n,n);for(let i=0;i<900;i++){const g=20+Math.random()*50|0;x.fillStyle=`rgba(${g+30},${g},${g-10},.35)`;x.beginPath();x.arc(Math.random()*n,Math.random()*n,Math.random()*3+.5,0,7);x.fill()}},1);
const M=(c,r=.5,m=0,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:r,metalness:m},o));
const steel=M(0x9a9ea3,.32,1,{roughnessMap:brushed,bumpMap:brushed,bumpScale:.3});
const dark=new THREE.MeshPhysicalMaterial({color:0x24201d,metalness:.55,roughness:.38,clearcoat:.4,clearcoatRoughness:.3});
const cream=M(0xf1e8d8,.35,0);
const casing=new THREE.MeshPhysicalMaterial({color:0x34302c,metalness:.8,roughness:.4,roughnessMap:brushed,transparent:true,side:THREE.DoubleSide,clearcoat:.2});
const glassM=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:.02,transparent:true,opacity:.22,clearcoat:1,clearcoatRoughness:0,side:THREE.DoubleSide,depthWrite:false});
const ML=new THREE.MeshPhysicalMaterial({color:0x1c0c04,emissive:0x080301,roughness:.05,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:1.8});
const add=(g,m,x=0,y=0,z=0,par=root)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=m!==glassM;o.receiveShadow=true;par.add(o);return o};
const RB=(w,h,d,r=.06)=>{const s=new THREE.Shape(),x=-(w/2-r),y=-(h/2-r),ww=w-2*r,hh=h-2*r;s.moveTo(x,y);s.lineTo(x+ww,y);s.lineTo(x+ww,y+hh);s.lineTo(x,y+hh);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelThickness:r,bevelSize:r,bevelSegments:4,curveSegments:1});g.translate(0,0,-(d-2*r)/2);return g};
const Cy=(a,b,h,s=40,o=false)=>new THREE.CylinderGeometry(a,b,h,s,1,o),Tr=(r,t)=>new THREE.TorusGeometry(r,t,12,64);
// floor shadow + contact occlusion
const fl=new THREE.Mesh(new THREE.PlaneGeometry(16,16),new THREE.ShadowMaterial({opacity:.14}));fl.rotation.x=-Math.PI/2;fl.position.y=-2.36;fl.receiveShadow=true;root.add(fl);
const aoT=ct(128,(x,n)=>{const g=x.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);g.addColorStop(0,'rgba(40,25,15,.3)');g.addColorStop(1,'rgba(40,25,15,0)');x.fillStyle=g;x.fillRect(0,0,n,n)},1);
const ap=new THREE.Mesh(new THREE.PlaneGeometry(5.5,4.2),new THREE.MeshBasicMaterial({map:aoT,transparent:true,depthWrite:false}));ap.rotation.x=-Math.PI/2;ap.position.y=-2.355;root.add(ap);
// machine body: satin aluminium stack
const alu=M(0x2b2825,.42,.75,{roughnessMap:brushed,side:THREE.DoubleSide});
add(RB(2.6,.32,1.9,.1),alu,0,-2.2,0);add(RB(2,.06,1.3,.02),steel,0,-2.07,.1);add(RB(.7,5.4,.4,.1),alu,0,.5,-1.2);
add(new THREE.LatheGeometry([[.9,3.4],[.9,2.7],[.3,1.95],[.3,1.7],[.26,1.7],[.26,1.95],[.86,2.7],[.86,3.4]].map(p=>new THREE.Vector2(p[0],p[1])),64),glassM);
add(Tr(.9,.05),steel,0,3.4,0).rotation.x=Math.PI/2;
const lid=add(new THREE.SphereGeometry(.92,40,14,0,6.2832,0,1.5708),alu,0,3.42,0);lid.scale.y=.3;add(new THREE.SphereGeometry(.12,20,12),steel,0,3.58,0);
const ring=(a,b,y)=>add(new THREE.LatheGeometry([[a,0],[b,0],[b,.1],[a,.1]].map(p=>new THREE.Vector2(p[0],p[1])),64),alu,0,y,0);ring(.3,1.02,1.75);ring(.2,1.02,.6);
add(Cy(.14,.1,.5,28),steel,0,.45,0);add(RB(.2,.1,1.2,.03),alu,.2,.6,-.5);
const nz=add(Cy(.04,.03,.2,16),steel,.2,.58,.1);add(Tr(.56,.04),steel,0,.1,0).rotation.x=Math.PI/2;
// cutaway casing: two half shells, front one slides away
const sh=(s,l)=>new THREE.CylinderGeometry(1,1,1.1,64,1,true,s,l);
const fr=add(sh(-Math.PI/2,Math.PI),casing,0,1.2,0);add(sh(Math.PI/2,Math.PI),casing,0,1.2,0);
// grinder: conical burr with helical ribs
const gr=new THREE.Group();gr.position.set(0,1.2,0);root.add(gr);
add(Cy(.5,.5,.22,48),steel,0,.28,0,gr);add(Cy(.46,.2,.45,48),steel,0,-.05,0,gr);add(Cy(.18,.18,.2,24),dark,0,-.35,0,gr);
for(let i=0;i<24;i++){const pv=new THREE.Group();pv.rotation.y=i/24*6.2832;gr.add(pv);add(new THREE.BoxGeometry(.035,.5,.07),steel,.34,-.05,0,pv).rotation.set(.5,0,-.32)}
add(Tr(.5,.035),steel,0,.12,0,gr).rotation.x=Math.PI/2;for(let i=0;i<8;i++){const a=i/8*6.2832;add(new THREE.SphereGeometry(.03,12,8),steel,Math.cos(a)*.88,1.86,Math.sin(a)*.88)}add(Cy(.14,.14,.07,40).rotateX(Math.PI/2),steel,-.85,-2.2,.97);
const gears=[-.68,.68].map(x=>{const g=add(Cy(.28,.28,.1,32).rotateX(Math.PI/2),steel,x,1.2,0);for(let i=0;i<14;i++){const a=i/14*6.2832,t=add(new THREE.BoxGeometry(.07,.09,.1),steel,Math.cos(a)*.31,Math.sin(a)*.31,0,g);t.rotation.z=a}add(Cy(.08,.08,.14,16).rotateX(Math.PI/2),dark,0,0,0,g);return g});
// roasted beans: ellipsoid with S-curved center crease, speckled map, per-bean tone
const bg=new THREE.SphereGeometry(1,22,16),bp=bg.attributes.position;
for(let i=0;i<bp.count;i++){let x=bp.getX(i),y=bp.getY(i)*.72,z=bp.getZ(i)*.82;if(y>0){const zc=.1*Math.sin(x*3);y-=.2*Math.exp(-((z-zc)*(z-zc))/.02)*Math.max(0,1-x*x)}bp.setXYZ(i,x,y,z)}
bg.computeVertexNormals();
const bm=new THREE.InstancedMesh(bg,M(0xffffff,.45,0,{map:beanT,bumpMap:beanT,bumpScale:2}),N),D=new THREE.Object3D(),bd=[];
for(let i=0;i<N;i++){const y=1.95+(i/N)*1.2+Math.random()*.08,rd=(y>2.7?.8:.25+.55*(y-1.95)/.75)*.85,r=rd*Math.sqrt(Math.random()),a=Math.random()*6.28;bd.push({x:Math.cos(a)*r,z:Math.sin(a)*r,y,s:.1+Math.random()*.03,q:Math.random()*6});bm.setColorAt(i,new THREE.Color().setScalar(.6+Math.random()*.4))}
bm.castShadow=true;root.add(bm);
// powder
const pm=new THREE.InstancedMesh(new THREE.SphereGeometry(1,6,5),M(0x3a2312,.95),PN),pd=[];root.add(pm);
for(let i=0;i<PN;i++)pd.push({x:(Math.random()-.5)*.18,z:(Math.random()-.5)*.18,o:Math.random()});
// paper filter and grounds
add(Cy(.55,.02,.6,48,true),M(0xffffff,.95,0,{map:paper,bumpMap:paper,bumpScale:.5,side:THREE.DoubleSide}),0,-.2,0);
add(Tr(.55,.012),cream,0,.1,0).rotation.x=Math.PI/2;
const fg=new THREE.Group();fg.position.set(0,-.5,0);root.add(fg);
const fm=M(0xffffff,.98,0,{map:beanT,bumpMap:beanT,bumpScale:3});add(Cy(.5,0,.58,40),fm,0,.29,0,fg);
// water stream
const wm=add(Cy(.025,.025,.45,12),new THREE.MeshPhysicalMaterial({color:0xcfe8f5,roughness:.05,transparent:true,opacity:.55,clearcoat:1}),.2,.45,.1);
// glass tumbler and coffee liquid
add(Cy(.4,.4,1,48,true),glassM,0,-1.55,0);add(Cy(.4,.4,.06,48),glassM,0,-2.02,0);
const cf=add(Cy(.37,.37,1,48),new THREE.MeshPhysicalMaterial({color:0x0e0502,emissive:0x030100,roughness:.08,clearcoat:1,clearcoatRoughness:.04,envMapIntensity:.9}),0,-2,0);
const tp=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI;tp.push(new THREE.Vector2(Math.sin(a)*Math.sin(a/2)*.6,Math.cos(a)*.8))}
const tg=new THREE.LatheGeometry(tp,16),drops=[0,1,2,3].map(()=>add(tg,ML,0,-.6,0)),beads=[0,1,2,3].map(()=>add(tg,ML,0,-2,0)),
rips=[0,1,2,3].map(()=>{const m=new THREE.Mesh(Tr(.1,.01),new THREE.MeshBasicMaterial({color:0xd8ad7a,transparent:true,opacity:.5,depthWrite:false}));m.rotation.x=Math.PI/2;root.add(m);return m}),
stm=add(Cy(.02,.012,1,10),ML,0,-1,0),
cs=add(Cy(.37,.37,.012,48),new THREE.MeshPhysicalMaterial({color:0x24110a,roughness:.1,clearcoat:1,clearcoatRoughness:.05}),0,-2,0);
add(new THREE.SphereGeometry(.03,12,10),ML,0,-.5,0);
add(Tr(.4,.012),new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.05,clearcoat:1,transparent:true,opacity:.5}),0,-1.05,0).rotation.x=Math.PI/2;
// steam
const cc=document.createElement('canvas');cc.width=cc.height=32;const cx=cc.getContext('2d'),gg=cx.createRadialGradient(16,16,0,16,16,16);gg.addColorStop(0,'rgba(255,255,255,1)');gg.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gg;cx.fillRect(0,0,32,32);
const SN=mob?20:40,sp=new Float32Array(SN*3),sd=[];for(let i=0;i<SN;i++)sd.push({x:(Math.random()-.5)*.6,z:(Math.random()-.5)*.4,o:Math.random()});
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
const sMat=new THREE.PointsMaterial({size:.28,map:new THREE.CanvasTexture(cc),transparent:true,opacity:0,depthWrite:false,color:0xffffff});
root.add(new THREE.Points(sg,sMat));
// camera path
const K=[[0,[0,1,10.5],[0,.6,0]],[.18,[0,2.4,8],[0,2,0]],[.3,[1.6,1.4,5],[0,1.1,0]],[.5,[0,1.0,4.3],[0,.6,0]],[.62,[.8,-.2,4.2],[0,-.3,0]],[.8,[.5,-1.1,3.8],[0,-1.2,0]],[1,[0,-.4,10],[0,-.3,0]]];
const V=(a,b,t)=>new THREE.Vector3().fromArray(a).lerp(new THREE.Vector3().fromArray(b),t);
const zf=mob?1.6:1,look=new THREE.Vector3();
function cam(p){let i=0;while(i<K.length-2&&p>K[i+1][0])i++;const a=K[i],b=K[i+1],t=sm(a[0],b[0],p);const tg=V(a[2],b[2],t),ps=V(a[1],b[1],t);ps.sub(tg).multiplyScalar(zf).add(tg);C.position.copy(ps);C.lookAt(tg)}
function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();root.position.x=0}
size();window.addEventListener('resize',size);
let tgt=0,cur=0;
gsap.registerPlugin(ScrollTrigger);
const st=ScrollTrigger.create({trigger:'#track',start:'top top',end:'bottom bottom',onUpdate:s=>tgt=s.progress});
function frame(){
const p=cur,t=performance.now()/1000;
// beans
for(let i=0;i<N;i++){const b=bd[i],f=i/N,k=cl((p-f*.14)/.045),e=k*k,d=cl((p-(.3+f*.16))/.04);
let y=lerp(7,b.y,e)-d*1.3,s=k>0?b.s*(1-d):0;D.position.set(b.x*(1-d*.6),y,b.z*(1-d*.6));D.rotation.set(b.q+(1-k)*7,b.q*2+(1-k)*5,b.q);D.scale.set(s*1.5,s,s);D.updateMatrix();bm.setMatrixAt(i,D.matrix)}
bm.instanceMatrix.needsUpdate=true;
// casing
const o=sm(.18,.3,p);fr.position.x=o*2.4;fr.rotation.y=-o*.5;casing.opacity=1-o*.88;
// grinder
const gs=(p-.3)*45;gr.rotation.y=Math.max(0,gs)*(1-sm(.5,.54,p)*.0);gears[0].rotation.z=gs*.7;gears[1].rotation.z=-gs*.7;
// powder
const g=sm(.33,.37,p)*(1-sm(.57,.61,p));
for(let i=0;i<PN;i++){const q=pd[i],ph=(t*.7+q.o)%1;{const a=ph*8+q.o*6,rr=.04+.5*Math.pow(1-ph,2)*(ph<.55?1:.3);D.position.set(Math.cos(a)*rr,lerp(.95,.12,ph*ph),Math.sin(a)*rr)};D.rotation.set(0,0,0);const s=.022*g;D.scale.set(s,s,s);D.updateMatrix();pm.setMatrixAt(i,D.matrix)}
pm.instanceMatrix.needsUpdate=true;
// filter fill + wet
const acc=sm(.38,.58,p);fg.scale.setScalar(Math.max(.001,.12+.7*acc));{const wt=sm(.6,.72,p);fm.color.setScalar(1-.7*wt);fm.roughness=.98-.6*wt}
// water
const w=sm(.58,.62,p)*(1-sm(.78,.82,p));wm.scale.y=Math.max(.001,w);wm.position.y=.55-.225*w;nz.position.y=.58;
// coffee
const fill=sm(.68,.93,p),h=Math.max(.001,.9*fill);cf.scale.y=h;cf.position.y=-2.03+h/2;cs.position.y=-2.03+h+.006;cs.visible=h>.02;
const dv=sm(.64,.67,p),sf=-2.03+h,tip=-.52,st=sm(.74,.8,p)*(1-sm(.9,.93,p));
drops.forEach((d,k)=>{const ph=(((p-.64)*18+k/4)%1+1)%1,vr=.75+.5*((k*.37)%1),gw=cl(ph/.2),f=cl((ph-.2)/.8),y=ph<.2?tip-.03*gw:lerp(tip-.03,sf,f*f),sy=ph<.2?.5+.5*gw:1+f*1.6,sz=vr*.05*(ph<.2?gw:1)*dv*(1-.85*st)+.0001;
d.position.set(0,y,0);d.scale.set(sz/Math.sqrt(sy),sz*.8*sy,sz/Math.sqrt(sy));
const rg=rips[k],tau=ph<.35&&h>.02&&dv>0?ph/.35:-1;rg.visible=tau>=0;if(tau>=0){rg.position.set(0,sf+.004,0);rg.scale.setScalar(.3+tau*2.4);rg.material.opacity=.55*(1-tau)}
const b=beads[k],bt=ph<.22&&h>.02&&dv>0?ph/.22:-1;b.visible=bt>=0;if(bt>=0){b.position.set((k%2?1:-1)*bt*.08,sf+Math.sin(Math.PI*bt)*.1,0);const s2=.02*(1-bt*.5);b.scale.set(s2,s2*.8,s2)}});
const L=(tip-sf)*st;stm.visible=st>.01;stm.scale.set(1+.15*Math.sin(p*220),Math.max(.001,L),1+.15*Math.sin(p*220));stm.position.y=tip-L/2;
// steam
const sv=sm(.7,.8,p);sMat.opacity=.3*sv;
for(let i=0;i<SN;i++){const q=sd[i],ph=(t*.2+q.o)%1;sp[i*3]=q.x*(1+ph);sp[i*3+1]=-1.1+ph*1.3;sp[i*3+2]=q.z}
sg.attributes.position.needsUpdate=true;
cam(p);R.render(S,C)}
const tick=()=>{cur+=(tgt-cur)*.08;onProgress(cur);frame()};gsap.ticker.add(tick);
frame();onProgress(0);
const caps=[.12,.4,.66,.93].map(v=>{cur=v;frame();const c=document.createElement('canvas');c.width=480;c.height=360;const x=c.getContext('2d');x.fillStyle='#E9DDC9';x.fillRect(0,0,480,360);const sh=cv.height,sw=Math.min(cv.width,sh*4/3);x.drawImage(cv,(cv.width-sw)/2,0,sw,sh,0,0,480,360);return c.toDataURL('image/jpeg',.85)});cur=0;frame();onThumbs(caps);
const to=setTimeout(onReady,500);
return()=>{clearTimeout(to);gsap.ticker.remove(tick);st.kill();window.removeEventListener('resize',size);R.dispose()};

}
