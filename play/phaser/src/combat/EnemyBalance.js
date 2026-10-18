// Early Plunderers are one-hit enemies for all three level-1 heroes.
// Their health grows into a two-hit threshold as waves progress.
export function plundererHealth(wave) {
 if(!Number.isInteger(wave)||wave<1||wave>100) throw new RangeError('Wave must be 1–100');
 if(wave<=5) return 25;
 return Math.min(65,25+Math.floor((wave-5)*2.5));
}

// Gradual challenge starts at wave 6, with noticeable checkpoints before each boss.
export function enemyHealthMultiplier(wave,type) {
 if(!Number.isInteger(wave)||wave<1||wave>100)throw new RangeError('Wave must be 1–100');
 if(wave<=5)return 1;
 const stages=[{start:6,end:15,rate:.018},{start:16,end:25,rate:.024},{start:26,end:50,rate:.016},{start:51,end:75,rate:.020},{start:76,end:100,rate:.022}];
 let multiplier=1;
 for(const {start,end,rate} of stages)multiplier+=Math.max(0,Math.min(wave,end)-start+1)*rate;
 if(type==='schildtraeger')multiplier*=1.12;
 if(type==='bannertraeger'||type==='schamane')multiplier*=1.08;
 return multiplier;
}
export function enemySpeedMultiplier(wave,type) {
 if(!Number.isInteger(wave)||wave<1||wave>100)throw new RangeError('Wave must be 1–100');
 if(wave<=5)return 1;
 const boost=Math.min(.16,(wave-5)*.0017);
 return type==='spaeher'?1+boost*1.3:1+boost;
}
