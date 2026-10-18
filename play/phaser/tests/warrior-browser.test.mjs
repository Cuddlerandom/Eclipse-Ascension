import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1100,height:750}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8765/play/phaser/',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.__eclipseGame?.scene?.getScene('WorldScene')?.sys?.isActive(),null,{timeout:45000});
 const result=await page.evaluate(()=>{
  const scene=window.__eclipseGame.scene.getScene('WorldScene');
  scene.gold=3000;scene.pendingSpot={x:750,y:950};scene.placeTower(0);
  const warrior=scene.towers[0];if(!warrior?.hero)throw Error('Warrior sprite not created');
  const checks=[];
  for(let level=1;level<=5;level++){
   warrior.level=level;warrior.skillAt=0;warrior.ultimateAt=0;warrior.titanAt=0;
   for(const e of [...scene.enemies])scene.removeEnemy(e);
   // Real Phaser circles and scene update; synthetic combat positioning, no wave spawning.
   const enemies=[];
   for(let i=0;i<5;i++){
    const x=warrior.hero.x+55+(i%2)*12,y=warrior.hero.y-55+(i-2)*17;
    const body=scene.add.circle(x,y,23,0x8ebc58),label=scene.add.text(x,y-42,'test'),bar=scene.add.rectangle(x,y-30,48,6,0x8ee18d);
    const e={type:'pluenderer',x,y,index:1,hp:1500,maxHp:1500,speed:0,body,label,bar,healAt:0,bombAt:0};
    scene.enemies.push(e);enemies.push(e);
   }
   scene.wave=1;scene.spawns=0;scene.active=true;scene.lastCompleted=0;
   warrior.nextAttack=0;
   const now=100000+level*40000;
   scene.update(now,16);
   const totalDamage=enemies.reduce((sum,e)=>sum+1500-e.hp,0);
   const triggered={cleave:warrior.skillAt>now,guard:warrior.ultimateAt>now,titan:warrior.titanAt>now};
   if(totalDamage<=0)throw Error('Warrior dealt no damage at level '+level);
   if(triggered.cleave!==(level>=2))throw Error('Cleave unlock wrong at level '+level);
   if(triggered.guard!==(level>=4))throw Error('Guard unlock wrong at level '+level);
   if(triggered.titan!==(level>=5))throw Error('Titan unlock wrong at level '+level);
   checks.push({level,totalDamage,triggered});
  }
  return checks;
 });
 assert.equal(result.length,5);assert.deepEqual(errors,[]);
 console.log('Warrior level 1-5 Phaser combat test passed:',JSON.stringify(result));
 await page.screenshot({path:'phaser-warrior-levels.png'});
}finally{await browser.close()}
