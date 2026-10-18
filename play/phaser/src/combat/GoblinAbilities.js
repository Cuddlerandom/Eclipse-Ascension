// Pure goblin ability rules: return effects, never mutate Phaser objects.
export function healingAction(shaman, enemies, now) {
  if(shaman.type!=='schamane'||shaman.hp<=0||now<(shaman.healAt??0))return null;
  const target=enemies.filter(e=>e!==shaman&&e.hp>0&&e.hp<e.maxHp&&Math.hypot(e.x-shaman.x,e.y-shaman.y)<=180).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];
  return target?{target,amount:30,nextAt:now+5000}:null;
}
export function stunAction(bomber,towers,now) {
  if(bomber.type!=='sprengmeister'||bomber.hp<=0||now<(bomber.bombAt??0))return null;
  const target=towers.filter(t=>t.kind!==0&&now>=(t.stunImmuneUntil??0)&&Math.hypot(t.x-bomber.x,t.y-bomber.y)<=180).sort((a,b)=>Math.hypot(a.x-bomber.x,a.y-bomber.y)-Math.hypot(b.x-bomber.x,b.y-bomber.y))[0];
  return target?{target,stunnedUntil:now+2000,immuneUntil:now+7000,nextAt:now+12000}:null;
}
export function movementMultiplier(enemy,enemies) {
  if(enemy.type==='bannertraeger')return 1;
  return enemies.some(b=>b!==enemy&&b.type==='bannertraeger'&&b.hp>0&&Math.hypot(b.x-enemy.x,b.y-enemy.y)<=180)?1.2:1;
}
