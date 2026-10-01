import * as THREE from './vendor/three/three.module.js';
const $=id=>document.getElementById(id);
const projects=[
 {title:'Finance Auditor',type:'Operasi & otomasi',body:'Finance Auditor mengisi sisi otomasi pekerjaan kantor dalam portfolio ini. Catatan lengkap tentang alur pemeriksaan dan kontribusi pengembangan belum disertakan.',object:'Berkas berlapis menjadi penanda proyek. Bukan dokumen keuangan atau hasil audit.'},
 {title:'AireshGPT',type:'Produk digital',body:'AireshGPT mewakili eksplorasi produk digital dan pengalaman toko melalui percakapan. Preview ini tidak mengirim pesan, pesanan, atau pembayaran.',object:'Dua lingkaran yang bertemu menandai percakapan. Ini objek navigasi, bukan antarmuka shopbot.'},
 {title:'Photobox',type:'Eksplorasi web',body:'Photobox adalah proyek web dalam koleksi Aice. Detail fitur, proses pengembangan, dan kontribusi akan dilengkapi dari sumber proyek.',object:'Bingkai kosong mengajak melihat komposisi. Tidak ada foto pengguna, akses kamera, atau penyimpanan gambar.'},
 {title:'Rail Nusantara',type:'Eksplorasi web',body:'Rail Nusantara adalah salah satu proyek web Aice. Catatan ini memperkenalkan proyek tanpa mengasumsikan fitur atau integrasi layanan transportasi.',object:'Dua jalur kuningan adalah studi bentuk. Bukan peta, jadwal, atau rute kereta yang sebenarnya.'},
 {title:'IDX Chart Rider',type:'Eksplorasi interaktif',body:'IDX Chart Rider berada dalam koleksi proyek interaktif Aice. Preview ini tidak menggunakan data pasar dan tidak memberikan saran investasi.',object:'Susunan bidang adalah komposisi spasial, bukan grafik harga atau hasil strategi trading.'}
];
let selected=0,opener;const dialog=$('detail');
function content(i){selected=i;const p=projects[i];$('detail-type').textContent=`0${i+1} / ${p.type}`;$('detail-title').textContent=p.title;$('detail-body').textContent=p.body;$('detail-object').textContent=p.object;}
function open(i,from){opener=from||$('list-toggle');content(i);dialog.showModal();document.body.style.overflow='hidden';$('close').focus();setTimeout(()=>$('close').focus(),50);}
$('close').onclick=()=>dialog.close();$('next').onclick=()=>content((selected+1)%5);
dialog.addEventListener('close',()=>{document.body.style.overflow='';(opener?.getClientRects().length?opener:$('list-toggle')).focus({preventScroll:true});});
dialog.addEventListener('keydown',e=>{if(e.key==='Tab'){if(e.shiftKey&&document.activeElement===$('close')){e.preventDefault();$('next').focus();}else if(!e.shiftKey&&document.activeElement===$('next')){e.preventDefault();$('close').focus();}}});
projects.forEach((p,i)=>{const b=document.createElement('button');b.innerHTML=`<span>0${i+1}</span>${p.title}<i aria-hidden="true">↗</i>`;b.onclick=()=>open(i,b);$('accessible-projects').append(b);});
$('list-toggle').onclick=()=>{window.scrollTo({top:$('project-list').offsetTop,behavior:'instant'});$('accessible-projects').firstElementChild.focus({preventScroll:true});};$('back-room').onclick=()=>window.scrollTo({top:0,behavior:'instant'});
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let motionOff=reduced;
function motion(){ $('motion').textContent=motionOff?'Aktifkan gerak':'Jeda gerak';$('motion').setAttribute('aria-pressed',String(motionOff)); }motion();$('motion').onclick=()=>{motionOff=!motionOff;motion();};matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{motionOff=e.matches;motion();});
window.sceneState={rendered:false};
function fallback(){document.body.classList.add('fallback');$('list-title').textContent='Proyek Aice Ruby Jane.';window.sceneState.fallback=true;}
try { await build(); } catch(e){console.warn('Ruang 3D tidak tersedia; daftar proyek tetap tersedia.',e.message);fallback();}
async function build(){
 const canvas=$('world');const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#eee8df');scene.fog=new THREE.Fog('#eee8df',24,48);const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.1,80);
 const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const plaster=mat('#e7e0d3'),stone=mat('#c9b9a1'),wood=mat('#78604b'),ruby=mat('#79414b',.4),lilac=mat('#aaa0b5',.45),paper=mat('#e4ddce'),brass=mat('#ad8b57',.3,.7),dark=mat('#49433e');
 const grain=document.createElement('canvas');grain.width=grain.height=256;const ctx=grain.getContext('2d');const image=ctx.createImageData(256,256);let seed=82;for(let i=0;i<image.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const v=195+(seed%50);image.data[i]=image.data[i+1]=image.data[i+2]=v;image.data[i+3]=255;}ctx.putImageData(image,0,0);const texture=new THREE.CanvasTexture(grain);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(6,6);plaster.map=texture;stone.bumpMap=texture;stone.bumpScale=.018;
 function mesh(geo,material,parent=scene,x=0,y=0,z=0){const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function box(w,h,d,m,p=scene,x=0,y=0,z=0){return mesh(new THREE.BoxGeometry(w,h,d),m,p,x,y,z);}
 function cyl(r,h,m,p=scene,x=0,y=0,z=0){return mesh(new THREE.CylinderGeometry(r,r,h,64),m,p,x,y,z);}
 box(60,.18,50,plaster,scene,0,-.12,0);box(28,11,.25,plaster,scene,0,5.4,-5.5);
 // Tall daylight openings, deep reveals and slender mullions, not a dollhouse.
 const daylight=new THREE.MeshBasicMaterial({color:'#fff9e9'});
 for(let i=0;i<3;i++){const x=-9+i*3.1;box(2.4,6.8,.09,daylight,scene,x,4.3,-5.32);box(.10,6.8,.25,wood,scene,x,4.3,-5.18);box(2.5,.1,.26,wood,scene,x,3.7,-5.18);box(2.65,.17,.65,stone,scene,x,.86,-5.03);}
 // A softly lit gallery alcove and one continuous, monolithic display.
 box(12.4,.28,3.3,stone,scene,0,1.8,0);box(.8,1.65,2.7,stone,scene,-4.4,.86,0);box(.8,1.65,2.7,stone,scene,4.4,.86,0);
 for(let i=0;i<12;i++)box(12.25,.008,.014,wood,scene,0,1.95,-1.4+i*.25);
 // Fine floor joints establish scale.
 for(let i=-12;i<13;i+=2)box(.012,.006,28,mat('#d5cbbb'),scene,i,-.025,0);
 // Warm linear sunlight lying across the floor; translucent physical-light study.
 const sunpatch=new THREE.MeshBasicMaterial({color:'#fff5d8',transparent:true,opacity:.22,depthWrite:false});
 for(let i=0;i<3;i++){const p=box(2.05,.009,10,sunpatch,scene,-5.5+i*3,.005,1.6);p.rotation.y=-.45;p.castShadow=false;}
 const ambient=new THREE.HemisphereLight('#fff9ee','#b0a08c',2.2);scene.add(ambient);const sun=new THREE.DirectionalLight('#fff1d3',4.1);sun.position.set(-7,12,7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-12,right:12,top:10,bottom:-10,near:1,far:35});sun.shadow.bias=-.00035;sun.shadow.normalBias=.035;sun.shadow.radius=4;scene.add(sun);scene.add(new THREE.AmbientLight('#e4deef',.35));
 const objects=[],anchors=[],labels=[];
 function project(i,x,z=0){const g=new THREE.Group();g.position.set(x,1.96,z);scene.add(g);g.userData.project=i;objects.push(g);return g;}
 const finance=project(0,-4.45,.12);finance.rotation.y=.10;for(let i=0;i<3;i++){const b=box(1.55,.16,1.1,i===2?ruby:paper,finance,0,.13+i*.19,0);b.rotation.y=i*.065;box(1.25,.024,.015,brass,finance,0,.59,.56);}box(.055,.08,1.11,brass,finance,-.48,.61,0);
 const ai=project(1,-2.13,-.13);cyl(.74,.12,stone,ai,0,.06,0);for(let i=0;i<2;i++){const ring=mesh(new THREE.TorusGeometry(.55,.105,24,80),i?lilac:brass,ai,i*.28-.14,.73,0);ring.rotation.y=i?-.55:.55;}
 const photo=project(2,.25,-.05);box(1.2,.1,.85,dark,photo,0,.05,0);for(const x of [-.55,.55])box(.10,1.7,.15,ruby,photo,x,.9,0);for(const y of [.1,1.7])box(1.2,.1,.15,ruby,photo,0,y,0);const inner=box(.94,1.4,.025,paper,photo,0,.9,.015);const art=mat('#b6a7ba');mesh(new THREE.CircleGeometry(.33,64),art,photo,0,1.09,.036);box(.92,.37,.018,stone,photo,0,.39,.04);
 const rail=project(3,2.58,0);box(1.5,.1,1.15,stone,rail,0,.05,0);for(const z of [-.22,.22]){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.64,.15,z),new THREE.Vector3(-.33,.36,z),new THREE.Vector3(.03,.55,z),new THREE.Vector3(.42,.42,z),new THREE.Vector3(.65,.16,z)]);mesh(new THREE.TubeGeometry(curve,60,.035,10,false),brass,rail);}for(let i=0;i<7;i++){const x=-.62+i*.2;box(.035,.03,.55,wood,rail,x,.16+Math.sin((i/6)*Math.PI)*.33,0);}
 const idx=project(4,4.85,.03);cyl(.73,.11,stone,idx,0,.05,0);for(let i=0;i<5;i++){const fin=box(.12,.6+Math.sin(i*1.7)*.22,.72,i%2?lilac:brass,idx,(i-2)*.23,.43,0);fin.rotation.y=-.25;}
 // One sculptural branch supplies scale and warmth without a toy-room inventory.
 const vase=scene;mesh(new THREE.SphereGeometry(.43,40,28),mat('#a29e8b'),vase,7,.52,-2.9);cyl(.20,.45,mat('#a29e8b'),vase,7,.85,-2.9);
 for(let i=0;i<3;i++){const stem=new THREE.CatmullRomCurve3([new THREE.Vector3(7,1,-2.9),new THREE.Vector3(6.9+i*.2,1.9,-2.9),new THREE.Vector3(6.3+i*.5,2.8-i*.2,-2.8)]);mesh(new THREE.TubeGeometry(stem,15,.015,6,false),wood);for(let j=0;j<4;j++){const leaf=mesh(new THREE.SphereGeometry(1,16,8),mat('#8e9276'),scene,6.5+i*.36+j*.05,1.6+j*.28,-2.85);leaf.scale.set(.2,.05,.09);leaf.rotation.z=.4+i;}}
 objects.forEach((g,i)=>{anchors.push(new THREE.Vector3(g.position.x,g.position.y+(i===2?2.02:1.6),g.position.z));const b=document.createElement('button');b.className='hotspot';b.setAttribute('aria-label','Buka '+projects[i].title);b.innerHTML=`<span>0${i+1}</span>${projects[i].title}`;b.onclick=()=>open(i,b);b.onpointerenter=()=>hover=i;b.onpointerleave=()=>hover=-1;$('labels').append(b);labels.push(b);g.traverse(m=>{if(m.isMesh)m.userData.project=i;});});
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let px=0,py=0,hover=-1,down=null;
 function pick(e){pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(objects,true)[0]?.object.userData.project;}
 canvas.addEventListener('pointermove',e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;hover=pick(e)??-1;canvas.style.cursor=hover>=0?'pointer':'default';});canvas.addEventListener('pointerleave',()=>{px=py=0;hover=-1;});canvas.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});canvas.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<12){const i=pick(e);if(i!==undefined)open(i,labels[i]);}down=null;});
 const chapters=[['01 / RUANG','Masuk, lihat lebih dekat.','Lima proyek Aice, dalam satu ruang. Gulir untuk mendekat.'],['02 / SISTEM','Dari berkas ke percakapan.','Finance Auditor dan AireshGPT. Pilih objek untuk membuka catatan.'],['03 / EKSPLORASI','Ruang untuk mencoba.','Photobox, Rail Nusantara, dan IDX Chart Rider. Tiga arah eksplorasi.']];
 renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
 let progress=0,lastChapter=-1,frames=0,lastTime=performance.now();const target=new THREE.Vector3();
 function maxScroll(){return $('journey').offsetHeight-innerHeight;}
 document.querySelectorAll('[data-stop]').forEach(b=>b.onclick=()=>window.scrollTo({top:maxScroll()*Number(b.dataset.stop)/2,behavior:motionOff?'instant':'smooth'}));
 function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);$('hint').textContent=innerWidth<650?'GESER LAYAR · KETUK OBJEK':'GERAKKAN POINTER · PILIH OBJEK';}resize();addEventListener('resize',resize);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback();});
 function render(){requestAnimationFrame(render);if(document.hidden||document.body.classList.contains('fallback'))return;const p=Math.max(0,Math.min(1,scrollY/maxScroll()));const now=performance.now(),alpha=1-Math.exp(-Math.min(1,(now-lastTime)/1000)*8);lastTime=now;progress=motionOff?Math.round(p*2)/2:THREE.MathUtils.lerp(progress,p,alpha);const mobile=innerWidth<650;const poses=mobile?[[10,10,19,0,1,0],[-4,6.6,12,-3.1,2,0],[5,6.7,12,2.8,2,0]]:[[10.5,8.3,14.5,0,1.2,0],[-5.8,5.3,9,-3.2,2,0],[5.8,5.3,9,2.4,2,0]];let k=Math.min(1,Math.floor(progress*2)),t=progress*2-k;t=t*t*(3-2*t);const a=poses[k],b=poses[k+1];camera.position.set(THREE.MathUtils.lerp(a[0],b[0],t)+(motionOff?0:px*.55),THREE.MathUtils.lerp(a[1],b[1],t)+(motionOff?0:py*.24),THREE.MathUtils.lerp(a[2],b[2],t));target.set(THREE.MathUtils.lerp(a[3],b[3],t),THREE.MathUtils.lerp(a[4],b[4],t),0);camera.lookAt(target);camera.updateMatrixWorld();
 const chapter=Math.round(progress*2);if(chapter!==lastChapter){lastChapter=chapter;$('chapter-index').textContent=chapters[chapter][0];$('chapter-title').textContent=chapters[chapter][1];$('chapter-copy').textContent=chapters[chapter][2];document.querySelectorAll('[data-stop]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.stop)===chapter)));}
 objects.forEach((g,i)=>{const y=1.96+(hover===i&&!motionOff?.13:0);g.position.y=motionOff?1.96:THREE.MathUtils.lerp(g.position.y,y,.12);labels[i].classList.toggle('active',i===hover);});
 const projected=[];anchors.forEach((v,i)=>{const s=v.clone().project(camera);const x=(s.x*.5+.5)*innerWidth,y=(-s.y*.5+.5)*innerHeight;let visible=s.z<1&&x>55&&x<innerWidth-55&&y>115&&y<innerHeight-245;if(mobile){visible=visible&&(chapter===0?(i===1||i===3):chapter===1?i<2:i>=2);}if(mobile&&chapter===1&&i<2)visible=true;const labelX=Math.max(85,Math.min(innerWidth-85,x));labels[i].style.left=labelX+'px';labels[i].style.top=y+'px';labels[i].style.display=visible?'flex':'none';projected.push({i,x,y,visible});});
 $('progress').style.width=progress*100+'%';renderer.render(scene,camera);$('loading').hidden=true;window.sceneState={rendered:true,frames:++frames,progress,camera:camera.position.toArray(),hover,motionOff,projected,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,objectCenters:objects.map(g=>{const v=g.position.clone();v.y+=.45;v.project(camera);return {x:(v.x*.5+.5)*innerWidth,y:(-.5*v.y+.5)*innerHeight};})};}
 render();
}
