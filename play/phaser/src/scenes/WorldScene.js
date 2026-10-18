const W=2400,H=1600;
const route=[[130,1370],[480,1370],[480,1080],[930,1080],[930,1350],[1500,1350],[1500,920],[1910,920],[1910,560],[1330,560],[1330,280],[2200,280]];
const goblins={pluenderer:{hp:100,speed:85,gold:1,color:0x8ebc58},spaeher:{hp:55,speed:155,gold:2,color:0xb4e943},schildtraeger:{hp:220,speed:55,gold:5,color:0x658a72,armor:.35},bannertraeger:{hp:90,speed:75,gold:6,color:0xe4c466},sprengmeister:{hp:75,speed:95,gold:8,color:0xd98546},schamane:{hp:80,speed:70,gold:10,color:0x75c7a0}};const types=Object.keys(goblins);const classes=[{name:'Krieger',cost:100,range:190,damage:40,rate:800,color:0xdb9e67},{name:'Bogenschütze',cost:90,range:300,damage:27,rate:420,color:0x77b5e8},{name:'Magier',cost:130,range:245,damage:34,rate:1050,color:0xbd8cf1,splash:90}];
const dirs=['vorne','hinten','links','rechts'],motions={idle:[6,7],run:[8,11],attack:[8,12],hit:[4,8]};
export class WorldScene extends Phaser.Scene{
constructor(){super('WorldScene');this.touches=new Map();this.lastPinch=null;this.enemies=[];this.wave=0;this.lives=20;this.kills=0;this.spawns=0;this.nextSpawn=0;this.nextAttack=0;this.currentDir='vorne';this.home={x:750,y:950};this.heroMode='idle';this.gold=150;this.towers=[];this.active=false;this.spawned=0;this.spawnTotal=0;this.selectedKind=0;this.gameOver=false}
preload(){for(const d of dirs)for(const motion of Object.keys(motions))this.load.spritesheet(d+'_'+motion,'../../assets/heroes/krieger/level1-v1/sheet_'+d+'_'+motion+'.png',{frameWidth:160,frameHeight:160});this.load.on('loaderror',f=>document.querySelector('#status').textContent='Ladefehler: '+f.key)}
create(){
const g=this.add.graphics();g.fillStyle(0x31543a).fillRect(0,0,W,H);
g.lineStyle(110,0x745a3d).beginPath();route.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokePath();
g.lineStyle(83,0xc4a77b).beginPath();route.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokePath();
g.fillStyle(0x1b3829);for(let i=0;i<90;i++){const x=(i*431+37)%W,y=(i*739+59)%H;if(route.some(([rx,ry])=>Math.hypot(rx-x,ry-y)<160))continue;g.fillCircle(x,y,25+(i%4)*9)}
for(const d of dirs)for(const [motion,[frames,fps]]of Object.entries(motions))if(this.textures.exists(d+'_'+motion))this.anims.create({key:d+'_'+motion,frames:this.anims.generateFrameNumbers(d+'_'+motion,{start:0,end:frames-1}),frameRate:fps,repeat:motion==='attack'||motion==='hit'?0:-1});
this.hero=this.add.sprite(750,950,this.textures.exists('vorne_idle')?'vorne_idle':'__MISSING').setOrigin(.5,.9).setDepth(10).setScale(1.2);
if(this.anims.exists('vorne_idle'))this.hero.play('vorne_idle');else document.querySelector('#status').textContent='FEHLER: Kriegergrafik fehlt – Asset-Pfad prüfen';
this.rangeCircle=this.add.circle(750,895,190,0x89e9b3,.04).setStrokeStyle(2,0x89e9b3,.27).setDepth(1);
this.cameras.main.setBounds(0,0,W,H);this.input.addPointer(2);
this.input.on('pointerdown',p=>{this.touches.set(p.id,{x:p.x,y:p.y});this.lastPinch=null});
this.input.on('pointerup',p=>{this.touches.delete(p.id);this.lastPinch=null});
this.input.on('pointermove',p=>{if(!p.isDown)return;const c=this.cameras.main,prior=this.touches.get(p.id);if(!prior)return;this.touches.set(p.id,{x:p.x,y:p.y});const pts=[...this.touches.values()];if(pts.length>=2){const dist=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);if(this.lastPinch>0)c.setZoom(Phaser.Math.Clamp(c.zoom*dist/this.lastPinch,.25,1.6));this.lastPinch=dist}else{this.lastPinch=null;c.scrollX-=(p.x-prior.x)/c.zoom;c.scrollY-=(p.y-prior.y)/c.zoom}});
this.resetCamera();
this.towers.push({x:750,y:950,kind:0,level:1,cd:0,hero:this.hero,home:this.home});
this.input.on('pointerup',p=>{if(this.touches.size>1||Math.hypot(p.upX-p.downX,p.upY-p.downY)>12||this.gameOver)return;const pos=this.cameras.main.getWorldPoint(p.x,p.y);this.placeTower(pos.x,pos.y)});
const start=document.createElement('button');start.textContent='⚔ Welle starten';start.id='waveButton';start.onclick=()=>this.startWave();document.querySelector('footer').prepend(start);
const hud=document.createElement('span');hud.id='battleHud';hud.style.cssText='font-size:12px;white-space:nowrap';document.querySelector('footer').append(hud);const picker=document.createElement('select');picker.id='heroClass';picker.style.cssText='max-width:125px;padding:8px;background:#203e30;color:white;border-radius:7px';classes.forEach((v,i)=>{const o=document.createElement('option');o.value=i;o.textContent=v.name+' '+v.cost+'🪙';picker.appendChild(o)});picker.onchange=()=>this.selectedKind=+picker.value;document.querySelector('footer').prepend(picker);
const reset=document.createElement('button');reset.textContent='↺ Neustart';reset.onclick=()=>location.reload();document.querySelector('footer').prepend(reset);this.refreshHud();
document.querySelector('#status').textContent='Phaser Kampf V0.2 · Krieger bereit';
}
refreshHud(){const hud=document.querySelector('#battleHud');if(hud)hud.textContent='🪙'+this.gold+' · W'+this.wave+' · ❤'+this.lives+' · ⚔'+this.kills}
startWave(){if(this.active||this.gameOver||this.wave>=100)return;this.wave++;this.active=true;this.spawned=0;this.spawnTotal=Math.min(100,Math.round(9+2.5*this.wave+4*Math.sqrt(this.wave)));this.spawns=this.spawnTotal;this.nextSpawn=0;this.refreshHud();document.querySelector('#status').textContent='Welle '+this.wave+' läuft'}
spawnGoblin(){const type=types[this.spawned%types.length],g=goblins[type],x=route[0][0],y=route[0][1],scale=1+Math.max(0,this.wave-10)*.035;const body=this.add.circle(x,y,type==='schildtraeger'?30:23,g.color).setStrokeStyle(4,0x36552c).setDepth(6);const label=this.add.text(x,y-42,type,{font:'bold 13px system-ui',color:'#fff'}).setOrigin(.5).setDepth(7);const bar=this.add.rectangle(x,y-30,48,6,0x8ee18d).setOrigin(0,.5).setDepth(8);this.enemies.push({type,x,y,index:1,hp:g.hp*scale,maxHp:g.hp*scale,speed:g.speed*(1+Math.min(.3,Math.max(0,this.wave-15)*.004)),body,label,bar,healAt:0,bombAt:0})}
placeTower(x,y){if(x<60||y<60||x>W-60||y>H-60)return;for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Phaser.Math.Clamp(((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy),0,1);if(Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)<100)return}const existing=this.towers.find(t=>Math.hypot(t.x-x,t.y-y)<65);if(existing){const cost=[0,0,50,90,150,250][existing.level+1];if(existing.level<5&&this.gold>=cost){this.gold-=cost;existing.level++;existing.label?.setText('Lv.'+existing.level);this.refreshHud()}return}if(this.towers.some(t=>Math.hypot(t.x-x,t.y-y)<95))return;const kind=this.selectedKind,cl=classes[kind],cost=cl.cost+25*this.towers.filter(t=>t.kind===kind).length;if(this.gold<cost){document.querySelector('#status').textContent='Zu wenig Gold für '+cl.name;return}this.gold-=cost;const body=this.add.circle(x,y,29,cl.color).setStrokeStyle(4,0xffffff).setDepth(10);const icon=this.add.text(x,y,kind===1?'➶':kind===2?'✦':'⚔',{font:'bold 33px system-ui',color:'#182a22'}).setOrigin(.5).setDepth(11);const label=this.add.text(x,y+44,'Lv.1',{font:'bold 15px system-ui',color:'#fff'}).setOrigin(.5).setDepth(11);this.towers.push({x,y,kind,level:1,cd:0,body,icon,label});this.refreshHud()}

removeEnemy(e){e.body.destroy();e.label.destroy();e.bar.destroy();this.enemies.splice(this.enemies.indexOf(e),1)}
update(time,delta){const dt=Math.min(delta,50)/1000;if(this.spawns&&time>=this.nextSpawn){this.spawnGoblin();this.spawned++;this.spawns--;this.nextSpawn=time+900}
for(const e of [...this.enemies]){const target=route[e.index],dx=target[0]-e.x,dy=target[1]-e.y,dist=Math.hypot(dx,dy),step=e.speed*dt;if(dist<=step){e.x=target[0];e.y=target[1];e.index++;if(e.index>=route.length){this.removeEnemy(e);this.lives--;this.refreshHud();if(this.lives<=0){this.gameOver=true;this.active=false;document.querySelector('#status').textContent='Verloren – Neustart versuchen'}continue}}else{e.x+=dx/dist*step;e.y+=dy/dist*step}e.body.setPosition(e.x,e.y);e.label.setPosition(e.x,e.y-42);e.bar.setPosition(e.x-24,e.y-30).setScale(Math.max(0,e.hp/e.maxHp),1)}
const hero=this.hero,home=this.home;
const candidates=this.enemies.filter(e=>Math.hypot(e.x-home.x,e.y-home.y)<330);
const target=candidates.sort((a,b)=>Math.hypot(a.x-hero.x,a.y-hero.y)-Math.hypot(b.x-hero.x,b.y-hero.y))[0];
let moving=false;
if(target){
const dx=target.x-hero.x,dy=target.y-(hero.y-55),dist=Math.hypot(dx,dy);
this.currentDir=Math.abs(dx)>Math.abs(dy)?dx>0?'rechts':'links':dy>0?'vorne':'hinten';
if(dist>95){const step=Math.min(dist-95,195*dt);hero.x+=dx/dist*step;hero.y+=dy/dist*step;moving=true}
else if(time>=this.nextAttack){const key=this.currentDir+'_attack';if(this.anims.exists(key))hero.play(key,true);this.heroMode='attack';this.nextAttack=time+800;target.hp-=40*this.towers[0].level*(target.type==='schildtraeger'?.65:1);const flash=this.add.circle(target.x,target.y,30,0xffd16b,.65).setDepth(12);this.time.delayedCall(140,()=>flash.destroy());if(target.hp<=0){this.gold+=goblins[target.type].gold;this.removeEnemy(target);this.kills++;this.refreshHud()}}
}else{
const dx=home.x-hero.x,dy=home.y-hero.y,dist=Math.hypot(dx,dy);
if(dist>3){this.currentDir=Math.abs(dx)>Math.abs(dy)?dx>0?'rechts':'links':dy>0?'vorne':'hinten';const step=Math.min(dist,195*dt);hero.x+=dx/dist*step;hero.y+=dy/dist*step;moving=true}
}
if(moving){const key=this.currentDir+'_run';if(this.anims.exists(key)&&hero.anims.currentAnim?.key!==key)hero.play(key,true);this.heroMode='run'}
else if(time>=this.nextAttack&&this.heroMode!=='idle'){const key=this.currentDir+'_idle';if(this.anims.exists(key))hero.play(key,true);this.heroMode='idle'}
for(const tower of this.towers.slice(1)){if(time<tower.cd)continue;const cl=classes[tower.kind],target=this.enemies.filter(e=>Math.hypot(e.x-tower.x,e.y-tower.y)<cl.range).sort((a,b)=>b.index-a.index)[0];if(!target)continue;tower.cd=time+cl.rate;const damage=cl.damage*(1+(tower.level-1)*.2)*(tower.kind!==2&&target.type==='schildtraeger'?.65:1);target.hp-=damage;if(cl.splash)for(const other of this.enemies)if(other!==target&&Math.hypot(other.x-target.x,other.y-target.y)<cl.splash)other.hp-=damage*.55;const beam=this.add.line(0,0,tower.x,tower.y,target.x,target.y,cl.color,.8).setOrigin(0).setLineWidth(5).setDepth(12);this.time.delayedCall(130,()=>beam.destroy())}
for(const e of [...this.enemies])if(e.hp<=0){this.gold+=goblins[e.type].gold;this.removeEnemy(e);this.kills++;this.refreshHud()}
if(this.wave&&this.spawns===0&&this.enemies.length===0&&this.lastCompleted!==this.wave){this.lastCompleted=this.wave;this.active=false;this.gold+=20+Math.floor(this.wave/10)*5;this.refreshHud();document.querySelector('#status').textContent='Welle '+this.wave+' geschafft! +Gold'}}
resetCamera(){const c=this.cameras.main;c.setZoom(Math.min(this.scale.width/1250,this.scale.height/900));c.centerOn(850,1040)}
}
