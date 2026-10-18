// Deterministic 100-wave enemy roster. Each new type is introduced on its own wave.
export const UNLOCK_WAVES = Object.freeze({
  pluenderer: 1, spaeher: 6, schildtraeger: 12,
  bannertraeger: 20, sprengmeister: 30, schamane: 40
});
export function waveEnemyCount(wave) {
  if (!Number.isInteger(wave) || wave < 1 || wave > 100) throw new RangeError('Wave must be 1–100');
  return 8 + 2 * wave;
}
export function waveRoster(wave) {
  const count = waveEnemyCount(wave);
  const unlocked = Object.entries(UNLOCK_WAVES).filter(([,first]) => wave >= first);
  const newlyUnlocked = unlocked.find(([,first]) => first === wave)?.[0];
  const pool = [];
  for (const [type,first] of unlocked) {
    // Early waves are mostly basic goblins; advanced types become more common later.
    const weight = type === 'pluenderer' ? 6 : type === 'spaeher' ? 3
      : type === 'schildtraeger' ? 2 : type === 'bannertraeger' ? 2
      : type === 'sprengmeister' ? 2 : 2;
    const copies = Math.max(1, weight + Math.floor((wave - first) / 25));
    for (let i = 0; i < copies; i++) pool.push(type);
  }
  const roster = Array.from({length:count}, (_,i) => pool[(i * 7 + Math.floor(i / 3) + wave) % pool.length]);
  // Guarantee the debut is visible, but avoid special enemies in the first five waves.
  if (newlyUnlocked) roster[Math.floor(count / 2)] = newlyUnlocked;
  return roster;
}
