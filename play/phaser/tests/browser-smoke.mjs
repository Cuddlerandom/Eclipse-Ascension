import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1100,height:750},deviceScaleFactor:1});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
try {
 await page.goto('http://127.0.0.1:8765/play/phaser/',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.Phaser?.GAMES?.[0]?.scene?.getScene('WorldScene')?.sys?.isActive(),null,{timeout:45000}).catch(async e=>{console.log('Browser status:',await page.locator('#status').textContent().catch(()=>null));console.log('Browser errors:',errors);console.log('Loaded scripts:',await page.locator('script').evaluateAll(nodes=>nodes.map(n=>n.src)));await page.screenshot({path:'phaser-combat-smoke.png',fullPage:true});throw e});
 const result=await page.evaluate(()=>{
  const s=Phaser.GAMES[0].scene.getScene('WorldScene');
  s.gold=1000;
  s.pendingSpot={x:750,y:950};s.placeTower(1);
  s.pendingSpot={x:1100,y:950};s.placeTower(2);
  if(s.towers.length!==2)throw Error('Could not place both ranged heroes');
  s.startWave();s.spawnGoblin();
  if(!s.enemies.length)throw Error('No goblin spawned');
  const e=s.enemies[0];e.x=760;e.y=1000;e.body.setPosition(e.x,e.y);
  const before=e.hp;s.towers[0].cd=0;s.towers[0].priority=2;
  s.update(performance.now()+20000,16);
  if(!(e.hp<before))throw Error('Target fallback did not deal damage');
  const shaman={type:'schamane',x:760,y:1000,hp:80,maxHp:80,healAt:0};
  return {heroes:s.towers.length,wave:s.wave,damage:before-e.hp,canvas:!!document.querySelector('canvas')};
 });
 assert.ok(result.canvas);
 assert.equal(result.heroes,2);
 assert.equal(result.wave,1);
 assert.ok(result.damage>0);
 await page.screenshot({path:'phaser-combat-smoke.png',fullPage:true});
 assert.deepEqual(errors,[],'Browser errors');
 console.log('Browser smoke passed:',JSON.stringify(result));
} finally {await browser.close()}
