// Independent combat rules. No Phaser or DOM dependency.
// Target group is a preference: if absent, always fall back to another eligible enemy.
export const enemyGroup = enemy => enemy.type === 'schildtraeger' ? 1 : (enemy.type === 'bannertraeger' || enemy.type === 'schamane') ? 2 : 0;
export function routeProgress(enemy, route) {
  const segment = Math.max(1, Math.min(enemy.index, route.length - 1));
  let distance = 0;
  for (let i = 1; i < segment; i++) distance += Math.hypot(route[i][0]-route[i-1][0], route[i][1]-route[i-1][1]);
  return distance + Math.hypot(enemy.x-route[segment-1][0], enemy.y-route[segment-1][1]);
}
export function selectTarget(tower, enemies, range, route) {
  const eligible = enemies.filter(e => e.hp > 0 && !e.escaped && Math.hypot(e.x-tower.x,e.y-tower.y) <= range);
  if (!eligible.length) return null;
  const preferred = eligible.filter(e => enemyGroup(e) === (tower.priority ?? 0));
  const candidates = preferred.length ? preferred : eligible;
  const mode = tower.secondary ?? 0;
  const score = e => mode === 2 || mode === 3 ? e.hp : routeProgress(e,route);
  const direction = mode === 1 || mode === 3 ? 1 : -1;
  return candidates.reduce((best,e) => !best || direction*(score(e)-score(best)) < 0 ? e : best, null);
}
export function calculateDamage(base, level, type, ignoresArmor=false) {
  return base * (1+(level-1)*0.2) * (!ignoresArmor && type === 'schildtraeger' ? 0.65 : 1);
}
export function nextAttackAt(now, interval, killedTarget=false) {
  return now + (killedTarget ? Math.min(180,interval*0.4) : interval);
}
