const assert=require('node:assert/strict');
const road=require('../play/road-v1.2.js');
const points=[[0,0],[100,0],[100,100],[200,100]];
const smooth=road.smooth(points);
assert.deepEqual(smooth[0],points[0]);assert.deepEqual(smooth.at(-1),points.at(-1));
for(let i=1;i<smooth.length;i++)assert(Math.hypot(smooth[i][0]-smooth[i-1][0],smooth[i][1]-smooth[i-1][1])<=2.1,'continuous sampling');
assert(smooth.some(p=>p[0]<100&&p[0]>77&&p[1]>0&&p[1]<23),'rounded corner');
assert.equal(road.files.length,20);assert.equal(new Set(road.files).size,20);
console.log('PASS: endpoints, rounded corners, continuous samples, 20 unique originals');
