// ECLIPSE: ASCENSION - World Tree V1.0
// Procedural Babylon.js mesh builder. No image-only assets.
// Usage: const tree = createWorldTree(scene, BABYLON, { position: new BABYLON.Vector3(0,0,0) });
// tree.root can be parented, scaled, moved, and disposed.
export function createWorldTree(scene, B, options = {}) {
 const V=B.Vector3, C=B.Color3, root=new B.TransformNode('WorldTree.Root',scene);
 root.position.copyFrom(options.position||V.Zero()); root.scaling.setAll(options.scale||1);
 let seed=104729;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const mat=(name,color,emissive)=>{const m=new B.PBRMaterial(name,scene);m.albedoColor=C.FromHexString(color);m.roughness=.94;m.metallic=0;if(emissive){m.emissiveColor=C.FromHexString(emissive);m.emissiveIntensity=1.6}return m};
 const bark=mat('WorldTree.AgedBark','#514936'),barkLight=mat('WorldTree.BarkHighlights','#786849'),barkDark=mat('WorldTree.DeepBark','#342f29'),leafA=mat('WorldTree.LeafEmerald','#277448'),leafB=mat('WorldTree.LeafSunlit','#5eaa60'),leafC=mat('WorldTree.LeafShadow','#185d42'),leafD=mat('WorldTree.LeafGold','#9db35b'),rune=mat('WorldTree.RunicTurquoise','#36bdb3','#24e4d3'),rootGlow=mat('WorldTree.RootGlow','#237a6e','#0f9c91');
 const meshes=[],glows=[],leaves=[];const own=m=>{m.parent=root;meshes.push(m);m.isPickable=false;return m};
 const tube=(name,pts,radius,material,tess=7)=>{const m=own(B.MeshBuilder.CreateTube(name,{path:pts,radius,tessellation:tess,cap:B.Mesh.CAP_ALL},scene));m.material=material;return m};
 const segment=(name,a,b,r1,r2,material,tess=9)=>{let d=b.subtract(a),h=d.length();const m=own(B.MeshBuilder.CreateCylinder(name,{height:h,diameterTop:r2*2,diameterBottom:r1*2,tessellation:tess},scene));m.position=a.add(b).scale(.5);const up=B.Axis.Y,unit=d.normalize(),axis=V.Cross(up,unit);const angle=Math.acos(Math.max(-1,Math.min(1,V.Dot(up,unit))));if(axis.lengthSquared()>1e-8)m.rotationQuaternion=B.Quaternion.RotationAxis(axis.normalize(),angle);else if(V.Dot(up,unit)<0)m.rotationQuaternion=B.Quaternion.RotationAxis(B.Axis.X,Math.PI);m.material=material;return m};
 const sphere=(name,pos,scale,material,segments=8)=>{let m=own(B.MeshBuilder.CreateSphere(name,{diameter:1,segments},scene));m.position.copyFrom(pos);m.scaling.copyFrom(scale);m.material=material;return m};
 // Central tapered trunk with irregular bends and buttress geometry.
 const spine=[new V(0,0,0),new V(.1,1.25,.06),new V(-.16,2.7,-.12),new V(.12,4.35,.1),new V(-.13,6.05,.07),new V(.1,7.65,-.15)];
 const radii=[1.18,1.01,.84,.69,.52,.34];
 for(let i=0;i<spine.length-1;i++)segment('Trunk.Bark.'+i,spine[i],spine[i+1],radii[i],radii[i+1],i%3===0?barkLight:bark,12);
 // Bark ridges climb around the trunk.
 for(let j=0;j<19;j++){let angle=j*2.399,pts=[];for(let k=0;k<7;k++){let y=.3+j*.3+k*.16;if(y>7.5)break;let r=Math.max(.43,1.19-y*.105);let a=angle+k*.11;pts.push(new V(Math.cos(a)*(r+.035),y,Math.sin(a)*(r+.035)))}if(pts.length>1)tube('Bark.SpiralRidge.'+j,pts,.035+(j%3)*.009,j%4?barkDark:barkLight,5)}
 // Dramatic arching buttress roots with faint magical seams.
 for(let j=0;j<11;j++){let a=j*Math.PI*2/11+.1,r=3.5+(j%3)*.44,pts=[new V(Math.cos(a)*.65,.92,Math.sin(a)*.65),new V(Math.cos(a)*1.05,.52,Math.sin(a)*1.05),new V(Math.cos(a)*1.75,.25,Math.sin(a)*1.75),new V(Math.cos(a)*r,.09,Math.sin(a)*r)];tube('Roots.Buttress.'+j,pts,.23+(j%3)*.05,bark,9);let glowPts=pts.slice(1).map(p=>p.add(new V(0,.13,0)));let g=tube('Roots.LuminousVein.'+j,glowPts,.024,rune,5);glows.push(g)}
 // Large spreading primary boughs with many secondary branches.
 let tips=[];
 for(let i=0;i<13;i++){let angle=i*2.39996,level=4.2+(i%5)*.62,reach=3.2+(i%4)*.7,dir=new V(Math.cos(angle),0,Math.sin(angle));let a=new V(.06,level,0),b=new V(dir.x*1.45,level+1.1,dir.z*1.45),c=new V(dir.x*reach,level+1.75+(i%3)*.23,dir.z*reach);tube('Branches.Primary.'+i,[a,b,c],.21+(i%3)*.035,bark,8);tips.push(c);for(let k=0;k<3;k++){let theta=angle+(k-1)*.5;let end=c.add(new V(Math.cos(theta)*(1.05+k*.25),.55+(k%2)*.25,Math.sin(theta)*(1.05+k*.25)));tube('Branches.Twig.'+i+'.'+k,[b.add(c).scale(.5),c,end],.08,barkLight,6);tips.push(end)}}
 // Organic crown assembled from clustered asymmetric leaf volumes.
 for(let i=0;i<tips.length;i++){const p=tips[i];for(let j=0;j<3;j++){let x=(rnd()-.5)*1.65,y=(rnd()-.5)*1.3,z=(rnd()-.5)*1.65;let pos=p.add(new V(x,y,z));let s=.85+rnd()*.8;let m=sphere('Canopy.Foliage.'+i+'.'+j,pos,new V(s*(1.1+rnd()*.45),s*(.7+rnd()*.3),s*(1+rnd()*.4)),[leafA,leafB,leafC,leafD][Math.floor(rnd()*4)],10);leaves.push({mesh:m,baseY:pos.y,phase:rnd()*6.28})}}
 // Crown apex to close canopy silhouette.
 for(let i=0;i<14;i++){let a=i*2.4,r=rnd()*2.4;let p=new V(Math.cos(a)*r,8.1+rnd()*2.1,Math.sin(a)*r);let s=.9+rnd()*.9;leaves.push({mesh:sphere('Canopy.Apex.'+i,p,new V(s*1.25,s*.8,s*1.2),i%3?leafA:leafB,10),baseY:p.y,phase:rnd()*6.28})}
 // Turquoise runic strokes on visible trunk, each is actual 3D emissive geometry.
 const runePaths=[
 [[.0,1.8,1.05],[.22,2.1,.96],[0,2.45,.94],[-.2,2.1,.98],[0,1.8,1.05]],
 [[-.2,3.05,.8],[0,3.48,.78],[.25,3.05,.78]],[[0,3.48,.78],[0,3.83,.76]],
 [[-.22,4.32,.7],[0,4.67,.66],[.24,4.3,.7]],[[0,4.67,.66],[0,5.02,.62]],
 [[-.12,5.45,.51],[.12,5.45,.51]],[[0,5.2,.58],[0,5.7,.48]],
 [[-.15,2.75,.86],[.14,2.75,.86]]];
 runePaths.forEach((p,i)=>{let g=tube('Runes.EngravedGlyph.'+i,p.map(q=>new V(...q)),.044,rune,6);glows.push(g)});
 // Scattered hovering motes anchored to this tree object.
 const motes=[];for(let i=0;i<35;i++){let a=rnd()*Math.PI*2,r=1.4+rnd()*5.5,y=.6+rnd()*10;let m=sphere('Magic.Mote.'+i,new V(Math.cos(a)*r,y,Math.sin(a)*r),new V(.045,.045,.045),i%3?rune:rootGlow,6);motes.push({mesh:m,base:y,phase:rnd()*6.28})}
 const shadow=B.MeshBuilder.CreateDisc('WorldTree.ShadowDisc',{radius:4.6,tessellation:32},scene);shadow.rotation.x=Math.PI/2;shadow.position.y=.025;shadow.parent=root;shadow.material=mat('WorldTree.GroundShadow','#253f29');shadow.material.alpha=.18;shadow.isPickable=false;meshes.push(shadow);
 let elapsed=0;const obs=scene.onBeforeRenderObservable.add(()=>{elapsed+=Math.min(.05,scene.getEngine().getDeltaTime()/1000);for(const l of leaves)l.mesh.position.y=l.baseY+Math.sin(elapsed*.72+l.phase)*.035;for(const m of motes){m.mesh.position.y=m.base+Math.sin(elapsed*1.1+m.phase)*.18;m.mesh.visibility=.5+.5*Math.sin(elapsed*1.6+m.phase)}rune.emissiveIntensity=1.4+.22*Math.sin(elapsed*1.4)});
 return {root,meshes,materials:{bark,barkLight,barkDark,leafA,leafB,leafC,leafD,rune,rootGlow},dispose(){scene.onBeforeRenderObservable.remove(obs);root.dispose(false,true)}};
}