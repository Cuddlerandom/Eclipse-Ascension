// Warrior abilities: level 2 cleave, level 4 guard, level 5 ultimate.
export const WARRIOR_SKILLS=Object.freeze({
 cleave:{level:2,radius:105,baseDamage:24,cooldown:5500,minTargets:2},
 guard:{level:4,radius:125,stunMs:1700,cooldown:14000,minTargets:2},
 titan:{level:5,radius:165,baseDamage:105,stunMs:2400,cooldown:26000,minTargets:2}
});
export function warriorSkillTargets(enemies,x,y,skill){
 return enemies.filter(e=>e.hp>0&&Math.hypot(e.x-x,e.y-y)<=skill.radius);
}
export function warriorSkillReady(level,time,nextAt,targets,skill){
 return level>=skill.level&&time>=nextAt&&targets.length>=skill.minTargets;
}
