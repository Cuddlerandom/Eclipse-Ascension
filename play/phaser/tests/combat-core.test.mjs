import { selectTarget, calculateDamage, nextAttackAt } from '../src/combat/CombatCore.js';
import assert from 'node:assert/strict';
const route=[[0,0],[100,0],[200,0]];
const tower={x:100,y:20,priority:2,secondary:0};
const regular={type:'pluenderer',x:70,y:0,index:1,hp:100};
const tank={type:'schildtraeger',x:120,y:0,index:2,hp:200};
const support={type:'schamane',x:80,y:0,index:1,hp:80};
assert.equal(selectTarget(tower,[regular,tank],200,route),tank); // fallback when no support
assert.equal(selectTarget(tower,[regular,tank,support],200,route),support);
assert.equal(selectTarget(tower,[regular],200,route),regular);
assert.equal(selectTarget(tower,[regular],10,route),null);
assert.equal(selectTarget({...tower,priority:0,secondary:0},[regular,tank],200,route),regular);
assert.equal(selectTarget({...tower,priority:1,secondary:3},[tank,{...tank,hp:30}],200,route).hp,30);
assert.equal(calculateDamage(40,1,'schildtraeger'),26);
assert.equal(calculateDamage(40,1,'schildtraeger',true),40);
assert.equal(calculateDamage(40,3,'pluenderer'),56);
assert.equal(nextAttackAt(1000,420),1420);
assert.equal(nextAttackAt(1000,420,true),1168);
console.log('CombatCore tests passed');
