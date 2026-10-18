// Warrior behaviour is deterministic and independent of Phaser.
export const WARRIOR_AGGRO_RANGE=230;
export const WARRIOR_ATTACK_RANGE=65;
export const WARRIOR_CHASE_SPEED=235;
export const WARRIOR_RETURN_SPEED=185;
export function warriorTarget(home,hero,enemies){
 const eligible=enemies.filter(e=>e.hp>0&&!e.escaped&&Math.hypot(e.x-home.x,e.y-home.y-55)<=WARRIOR_AGGRO_RANGE);
 return eligible.reduce((best,e)=>!best||Math.hypot(e.x-hero.x,e.y-(hero.y-55))<Math.hypot(best.x-hero.x,best.y-(hero.y-55))?e:best,null);
}
export function warriorStep(hero,home,target,dt,stunned=false){
 if(stunned)return {x:hero.x,y:hero.y,moving:false,attacking:false};
 const tx=target?target.x:home.x,ty=target?target.y+55:home.y;
 const dx=tx-hero.x,dy=ty-hero.y,distance=Math.hypot(dx,dy);
 const stop=target?WARRIOR_ATTACK_RANGE:3;
 if(distance<=stop)return {x:hero.x,y:hero.y,moving:false,attacking:!!target};
 const speed=target?WARRIOR_CHASE_SPEED:WARRIOR_RETURN_SPEED;
 const move=Math.min(distance-stop,speed*dt);
 return {x:hero.x+dx/distance*move,y:hero.y+dy/distance*move,moving:true,attacking:false};
}
export function warriorDirection(dx,dy){return Math.abs(dx)>Math.abs(dy)?dx>0?'rechts':'links':dy>0?'vorne':'hinten'}
