globalThis.window=globalThis; require('../js/jie_data.js'); globalThis.KoreanLunarCalendar=require('korean-lunar-calendar');
const KF=require('../js/engine.js'); let all=[],ar={money:[],love:[],health:[]};
for(let i=0;i<300;i++){ const c=KF.chart({y:1950+i%60,m:1+i%12,d:1+(i*7)%28,hh:(i*5)%24,mm:0,gender:i%2?'M':'F'});
  for(let k=0;k<60;k++){ const d=KF.daily(c,2026,1+Math.floor(k/5)%12,1+k%28); all.push(d.scores.total); for(const a in ar) ar[a].push(d.scores[a]); } }
const st=a=>{a=a.slice().sort((x,y)=>x-y); const m=a.reduce((x,y)=>x+y)/a.length; return {mean:m.toFixed(1),p5:a[Math.floor(a.length*.05)],p50:a[Math.floor(a.length*.5)],p95:a[Math.floor(a.length*.95)],min:a[0],max:a.at(-1)};};
console.log('total',st(all)); for(const a in ar) console.log(a,st(ar[a]));
const c=KF.chart({y:1990,m:3,d:15,hh:10,mm:30,gender:'F'}); console.log(KF.daily(c,2026,11,24).scores, KF.weekly(c,2026,11,24).map(x=>x.scores.total).join(' '), c.daeun.list.map(x=>x.score).join(' '));
