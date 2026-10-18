import assert from 'node:assert/strict';
import { plundererHealth, enemyHealthMultiplier, enemySpeedMultiplier } from '../src/combat/EnemyBalance.js';
import { calculateDamage } from '../src/combat/CombatCore.js';
for(let w=1;w<=5;w++){
 const hp=plundererHealth(w);
 assert.equal(hp,25);
 for(const base of [40,27,34]) assert.ok(calculateDamage(base,1,'pluenderer')>=hp,'Level 1 must one-shot wave '+w);
}
assert.ok(plundererHealth(12)>27,'Archer needs two hits later');
assert.ok(plundererHealth(16)>40,'Warrior needs two hits later');
assert.ok(plundererHealth(20)>48,'Level 2 warrior needs two hits later');
assert.ok(plundererHealth(100)<=65);
for(let w=2;w<=100;w++)assert.ok(plundererHealth(w)>=plundererHealth(w-1));
console.log('Plunderer health thresholds passed');

for(let w=1;w<=25;w++)assert.equal(enemyHealthMultiplier(w,'schildtraeger'),1);
for(const w of [26,50,51,75,76,100])assert.ok(enemyHealthMultiplier(w,'spaeher')>=1);
assert.ok(enemyHealthMultiplier(100,'schildtraeger')>enemyHealthMultiplier(75,'schildtraeger'));
assert.ok(enemyHealthMultiplier(100,'schamane')>enemyHealthMultiplier(50,'schamane'));
assert.ok(enemySpeedMultiplier(100,'spaeher')>enemySpeedMultiplier(50,'spaeher'));
