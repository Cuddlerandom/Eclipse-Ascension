const W=2400,H=1600;
const route=[[130,1370],[480,1370],[480,1080],[930,1080],[930,1350],[1500,1350],[1500,920],[1910,920],[1910,560],[1330,560],[1330,280],[2200,280]];
const dirs=['vorne','hinten','links','rechts'],motions={idle:[6,7],run:[8,11],attack:[8,12],hit:[4,8]};
export class WorldScene extends Phaser.Scene{
constructor(){super('WorldScene');this.touches=new Map();this.lastPinch=null;this.enemies=[];this.wave=0;this.lives=20;this.kills=0;this.spawns=0;this.nextSpawn=0;this.nextAttack=0;this.currentDir='vorne'}
preload(){for(const d of dirs)for(const motion of Object.keys(motions))this.load.spritesheet(d+'_'+motion,'../../../assets/heroes/krieger/level1-v1/sheet_'+d+'_'+motion+'.png',{frameWidth:160,frameHeight:160});this.load.on('loaderror',f=>document.querySelector('#status').textContent='Ladefehler: '+f.key)}
create(){
const g=this.add.graphics();g.fillStyle(0x31543a).fillRect(0,0,W,H);
g.lineStyle(110,0x745a3d).beginPath();route.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokePath();
g.lineStyle(83,0xc4a77b).beginPath();route.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokePath();
g.fillStyle(0x1b3829);for(let i=0;i<90;i++){const x=(i*431+37)%W,y=(i*739+59)%H;if(route.some(([rx,ry])=>Math.hypot(rx-x,ry-y)<160))continue;g.fillCircle(x,y,25+(i%4)*9)}
for(const d of dirs)for(const [motion,[frames,fps]]of Object.entries(motions))if(this.textures.exists(d+'_'+motion))this.anims.create({key:d+'_'+motion,frames:this.anims.generateFrameNumbers(d+'_'+motion,{start:0,end:frames-1}),frameRate:fps,repeat:motion==='attack'||motion==='hit'?0:-1});
this.hero=this.add.sprite(750,950,'vorne_idle').setOrigin(.5,.9).setDepth(10).setScale(1.2);
if(this.anims.exists('vorne_idle'))this.hero.play('vorne_idle');
this.add.circle(750,895,190,0x89e9b3,.04).setStrokeStyle(2,0x89e9b3,.27).setDepth(1);
this.cameras.main.setBounds(0,0,W,H);this.input.addPointer(2);
this.input.on('pointerdown',p=>{this.touches.set(p.id,{x:p.x,y:p.y});this.lastPinch=null});
this.input.on('pointerup',p=>{this.touches.delete(p.id);this.lastPinch=null});
this.input.on('pointermove',p=>{if(!p.isDown)return;const c=this.cameras.main,prior=this.touches.get(p.id);if(!prior)return;this.touches.set(p.id,{x:p.x,y:p.y});const pts=[...this.touches.values()];if(pts.length>=2){const dist=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);if(this.lastPinch>0)c.setZoom(Phaser.Math.Clamp(c.zoom*dist/this.lastPinch,.25,1.6));this.lastPinch=dist}else{this.lastPinch=null;c.scrollX-=(p.x-prior.x)/c.zoom;c.scrollY-=(p.y-prior.y)/c.zoom}});
this.resetCamera();
const start=document.createElement('button');start.textContent='⚔ Welle starten';start.id='waveButton';start.onclick=()=>this.startWave();document.querySelector('footer').prepend(start);
const hud=document.createElement('span');hud.id='battleHud';hud.style.cssText='font-size:12px;white-space:nowrap';document.querySelector('footer').append(hud);this.refreshHud();
document.querySelector('#status').textContent='Phaser Kampf V0.2 · Krieger bereit';
}
refreshHud(){const hud=document.querySelector('#battleHud');if(hud)hud.textContent='W'+this.wave+' · ❤'+this.lives+' · ⚔'+this.kills}
startWave(){if(this.spawns>0||this.enemies.length||this.lives<=0)return;this.wave++;this.spawns=3+this.wave*2;this.nextSpawn=0;this.refreshHud();document.querySelector('#status').textContent='Welle '+this.wave+' läuft'}
spawnGoblin(){const x=route[0][0],y=route[0][1];const body=this.add.circle(x,y,25,0x8fbd51).setStrokeStyle(5,0x36552c).setDepth(6);const label=this.add.text(x,y-39,'Goblin',{font:'bold 15px system-ui',color:'#fff'}).setOrigin(.5).setDepth(7);this.enemies.push({x,y,index:1,hp:55+this.wave*12,speed:125,body,label})}
removeEnemy(e){e.body.destroy();e.label.destroy();this.enemies.splice(this.enemies.indexOf(e),1)}
update(time,delta){const dt=Math.min(delta,50)/1000;if(this.spawns&&time>=this.nextSpawn){this.spawnGoblin();this.spawns--;this.nextSpawn=time+750}
for(const e of [...this.enemies]){const target=route[e.index],dx=target[0]-e.x,dy=target[1]-e.y,dist=Math.hypot(dx,dy),step=e.speed*dt;if(dist<=step){e.x=target[0];e.y=target[1];e.index++;if(e.index>=route.length){this.removeEnemy(e);this.lives--;this.refreshHud();continue}}else{e.x+=dx/dist*step;e.y+=dy/dist*step}e.body.setPosition(e.x,e.y);e.label.setPosition(e.x,e.y-39)}
const close=this.enemies.filter(e=>Math.hypot(e.x-this.hero.x,e.y-(this.hero.y-55))<190).sort((a,b)=>b.index-a.index);
if(close.length&&time>=this.nextAttack){const e=close[0],dx=e.x-this.hero.x,dy=e.y-this.hero.y;this.currentDir=Math.abs(dx)>Math.abs(dy)?dx>0?'rechts':'links':dy>0?'vorne':'hinten';const key=this.currentDir+'_attack';if(this.anims.exists(key))this.hero.play(key,true);this.nextAttack=time+800;e.hp-=40;const flash=this.add.circle(e.x,e.y,30,0xffd16b,.65).setDepth(12);this.time.delayedCall(140,()=>flash.destroy());if(e.hp<=0){this.removeEnemy(e);this.kills++;this.refreshHud()}}
if(time>=this.nextAttack&&this.hero.anims.currentAnim?.key!==this.currentDir+'_idle'){const key=this.currentDir+'_idle';if(this.anims.exists(key))this.hero.play(key,true)}
if(this.wave&&this.spawns===0&&this.enemies.length===0&&this.lastCompleted!==this.wave){this.lastCompleted=this.wave;document.querySelector('#status').textContent='Welle '+this.wave+' geschafft!'}}
resetCamera(){const c=this.cameras.main;c.setZoom(Math.min(this.scale.width/1250,this.scale.height/900));c.centerOn(850,1040)}
}
