// Early Plunderers are one-hit enemies for all three level-1 heroes.
// Their health grows into a two-hit threshold as waves progress.
export function plundererHealth(wave) {
 if(!Number.isInteger(wave)||wave<1||wave>100) throw new RangeError('Wave must be 1–100');
 if(wave<=5) return 25;
 return Math.min(65,25+Math.floor((wave-5)*2.5));
}
