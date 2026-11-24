globalThis.window=globalThis; require('../js/jie_data.js'); globalThis.KoreanLunarCalendar=require('korean-lunar-calendar');
const KF=require('../js/engine.js');
const A=KF.chart({y:1990,m:3,d:15,hh:10,mm:30,gender:'F'}), B=KF.chart({y:1988,m:8,d:2,hh:7,mm:0,gender:'M'});
console.log(KF.gunghap(A,B));
for(const k of ['sell','invest','lend','contact','exam','promote','health','move']) { const r=KF.ask(k,A,k==='exam'?{date:{y:2026,m:12,d:3}}:{}); console.log(k,r.score,r.verdict,JSON.stringify(r.best),r.why); }
// 분포
let v=[0,0,0],g=[]; for(let i=0;i<200;i++){const X=KF.chart({y:1960+i%40,m:1+i%12,d:1+i%27,hh:i%24,mm:0,gender:i%2?'M':'F'}); const Y=KF.chart({y:1965+(i*7)%40,m:1+(i*5)%12,d:1+(i*3)%27,hh:(i*7)%24,mm:0,gender:i%2?'F':'M'}); g.push(KF.gunghap(X,Y).scores.total); for(const k of ['sell','invest','lend','move','promote']) v[KF.ask(k,X).verdict]++;}
g.sort((a,b)=>a-b); console.log('gung p5/50/95',g[10],g[100],g[190],'verdicts',v);
