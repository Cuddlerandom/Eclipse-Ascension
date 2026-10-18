// Four milestone bosses with deterministic, telegraphed mechanics.
export const BOSS_NAMES=Object.freeze({25:'Goblin-Kriegshäuptling',50:'Eisenkoloss',75:'Seuchenhexer',100:'Schattenfürst'});
export function bossName(wave){return BOSS_NAMES[wave]??null}
export function bossMechanic(boss,time,enemies,towers){
 if(boss.type!=='boss'||boss.hp<=0)return null;
 const wave=boss.bossWave;
 if(wave===25){
  if(time<(boss.abilityAt??0))return null;
  const allies=enemies.filter(e=>e!==boss&&e.hp>0&&Math.hypot(e.x-boss.x,e.y-boss.y)<=240);
  if(!allies.length)return null;
  return {kind:'warcry',targets:allies,until:time+3500,nextAt:time+11000};
 }
 if(wave===50){
  const active=Math.floor(time/7000)%2===0;
  return {kind:'armor',active};
 }
 if(wave===75){
  if(time<(boss.abilityAt??0))return null;
  const targets=towers.filter(t=>Math.hypot(t.x-boss.x,t.y-boss.y)<=290);
  if(!targets.length)return null;
  return {kind:'curse',targets,until:time+2800,nextAt:time+12500};
 }
 if(wave===100){
  const fast=Math.floor(time/6500)%2===0;
  return {kind:'phase',fast};
 }
 return null;
}
export function bossDamageMultiplier(boss,time){
 if(boss?.type!=='boss')return 1;
 if(boss.bossWave===50)return Math.floor(time/7000)%2===0?.3:1;
 if(boss.bossWave===100)return Math.floor(time/6500)%2===0?1:.45;
 return 1;
}
export function bossSpeedMultiplier(boss,time){
 return boss?.type==='boss'&&boss.bossWave===100&&Math.floor(time/6500)%2===0?1.9:1;
}
