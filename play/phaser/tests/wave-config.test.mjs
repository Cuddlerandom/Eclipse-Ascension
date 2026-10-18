import assert from 'node:assert/strict';
import { waveRoster, waveEnemyCount, UNLOCK_WAVES } from '../src/combat/WaveConfig.js';
for (let wave=1;wave<=100;wave++) {
  const roster=waveRoster(wave);
  assert.equal(roster.length,waveEnemyCount(wave));
  assert.deepEqual(roster,waveRoster(wave),'Roster must be deterministic');
  for(const type of roster) assert.ok(wave>=UNLOCK_WAVES[type],type+' appeared too early in wave '+wave);
  for(const [type,first] of Object.entries(UNLOCK_WAVES)) if(wave===first) assert.ok(roster.includes(type),'Missing debut '+type);
}
assert.deepEqual([...new Set(waveRoster(1))],['pluenderer']);
assert.ok(waveEnemyCount(100)<=90);
console.log('100 wave roster tests passed');
