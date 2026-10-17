/* Original PNGs remain untouched. Only the placement follows the road tangent. */
const RoadV12=(()=>{
 const files=['gerade_ns_a','gerade_ns_b','gerade_ew_a','gerade_ew_b','kurve_sw_a','kurve_sw_b','kurve_se','t_s_e_w_a','t_s_e_w_b','t_s_e_w_c','t_s_e_w_d','kreuzung','endstueck_n_a','endstueck_n_b','endstueck_n_wurzeln','endstueck_n_stein','uebergang_a','uebergang_b','uebergang_c','uebergang_d'];
 async function load(base='../assets/environments/smaragdwald/weg-v1.2/'){
  const images={};
  await Promise.all(files.map(name=>new Promise((resolve,reject)=>{
   const image=new Image();image.onload=()=>{images[name]=image;resolve()};
   image.onerror=()=>reject(Error('PNG fehlt: '+name));image.src=base+name+'.png';
  })));
  return images;
 }
 function smooth(points){
  const result=[points[0].slice()];
  function line(p){const a=result.at(-1),n=Math.max(1,Math.ceil(Math.hypot(p[0]-a[0],p[1]-a[1])/2));for(let j=1;j<=n;j++)result.push([a[0]+(p[0]-a[0])*j/n,a[1]+(p[1]-a[1])*j/n])}
  for(let i=1;i<points.length-1;i++){
   const a=points[i-1],b=points[i],d=points[i+1],la=Math.hypot(b[0]-a[0],b[1]-a[1]),lb=Math.hypot(d[0]-b[0],d[1]-b[1]);
   if(la<.01||lb<.01)continue;
   const r=Math.min(23,la*.38,lb*.38),enter=[b[0]-(b[0]-a[0])/la*r,b[1]-(b[1]-a[1])/la*r],leave=[b[0]+(d[0]-b[0])/lb*r,b[1]+(d[1]-b[1])/lb*r];
   line(enter);const n=Math.ceil(r*2);for(let j=1;j<=n;j++){const t=j/n,s=1-t;result.push([s*s*enter[0]+2*s*t*b[0]+t*t*leave[0],s*s*enter[1]+2*s*t*b[1]+t*t*leave[1]])}
  }
  line(points.at(-1));return result;
 }
 // B is the cleanest straight extraction: its soil is centred at y=76.
 // Sampling narrow strips bends the existing artwork, without a tile grid,
 // repainting, gaps at turns, or rotating whole plants upside down.
 function draw(ctx,path,images,width=52){
  const img=images.gerade_ew_b,scale=width/img.height;let distance=0;
  ctx.save();ctx.imageSmoothingEnabled=false;
  for(let i=1;i<path.length;i++){
   const a=path[i-1],b=path[i],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);if(length<.001)continue;
   // Ignore only the transparent extraction padding at x=0..11/176..185.
   // Mirror alternate repetitions so both soil and foliage meet exactly.
   const phase=(distance/scale)%328,reverse=phase>=164;
   const sx=reverse?176-(phase-164):12+phase,sw=Math.max(.1,Math.min(length/scale,reverse?sx-12:176-sx));
   ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(Math.atan2(dy,dx));
   if(reverse){ctx.translate(length,0);ctx.scale(-1,1)}ctx.drawImage(img,reverse?sx-sw:sx,0,sw,img.height,-.4,-76*scale,length+.8,width);ctx.restore();distance+=length;
  }
  ctx.restore();
 }
 return {files,load,smooth,draw};
})();
if(typeof module!=='undefined')module.exports=RoadV12;
