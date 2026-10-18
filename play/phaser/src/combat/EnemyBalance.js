// Early Plunderers are one-hit enemies for all three level-1 heroes.
// Their health grows into a two-hit threshold as waves progress.
export function plundererHealth(wave) {
 if(!Number.isInteger(wave)||wave<1||wave>100) throw new RangeError('Wave must be 1–100');
 if(wave<=5) return 25;
 return Math.min(65,25+Math.floor((wave-5)*2.5));
}

export function enemyHealthMultiplier(wave,type) {
 if(!Number.isInteger(wave)||wave<1||wave>100)throw new RangeError('Wave must be 1–100');
 if(wave<=25)return 1;
 const stages=[{start:26,rate:.012},{start:51,rate:.020},{start:76,rate:.028}];
 let multiplier=1;
 for(const {start,rate} of stages)if(wave>=start)multiplier+=Math.min(25,wave-start+1)*rate;
 if(type==='schildtraeger')multiplier*=1.15;
 if(type==='bannertraeger'||type==='schamane')multiplier*=1.1;
 return multiplier;
}
export function enemySpeedMultiplier(wave,type) {
 if(wave<=25)return 1;
 const boost=Math.min(.18,(wave-25)*.0024);
 return type==='spaeher'?1+boost*1.35:1+boost;
}
