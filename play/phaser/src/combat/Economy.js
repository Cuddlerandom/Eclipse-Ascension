// Wave economy: guaranteed income prevents soft-locks; buying and upgrades scale.
export const STARTING_GOLD = 200;
export const HERO_BASE_COSTS = Object.freeze([125,115,165]);
export const UPGRADE_COSTS = Object.freeze([0,0,80,145,235,360]);
export function heroPurchaseCost(kind, owned) {
  if (!Number.isInteger(kind) || kind < 0 || kind >= HERO_BASE_COSTS.length || !Number.isInteger(owned) || owned < 0) throw new RangeError('Invalid hero or count');
  return HERO_BASE_COSTS[kind] + owned * 35;
}
export function upgradeCost(level) {
  if (!Number.isInteger(level) || level < 1 || level > 5) throw new RangeError('Invalid hero level');
  return level === 5 ? null : UPGRADE_COSTS[level+1];
}
export function waveCompletionBonus(wave) {
  if (!Number.isInteger(wave) || wave < 1 || wave > 100) throw new RangeError('Invalid wave');
  return 35 + 2 * Math.floor((wave - 1) / 10);
}

// High-wave kills no longer flood the economy; early waves keep full rewards.
export function enemyGoldReward(baseGold, wave, isBoss=false) {
 if (!Number.isInteger(wave) || wave<1 || wave>100 || !Number.isFinite(baseGold) || baseGold<0) throw new RangeError('Invalid reward');
 if (isBoss) return 60 + 20 * (wave / 25 - 1);
 return wave <= 20 ? baseGold : Math.max(1, Math.ceil(baseGold * (wave <= 50 ? 0.75 : 0.5)));
}
