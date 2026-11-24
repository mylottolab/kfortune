globalThis.window=globalThis; require('../js/jie_data.js'); globalThis.KoreanLunarCalendar=require('korean-lunar-calendar');
const KF=require('../js/engine.js'); const {Solar}=require('lunar-javascript');
let bad=0,n=0; let rnd=12345; const R=()=>{rnd=(rnd*1103515245+12345)%2147483648; return rnd/2147483648;};
for(let i=0;i<6000;i++){
  const y=1901+Math.floor(R()*198), m=1+Math.floor(R()*12), d=1+Math.floor(R()*28), hh=Math.floor(R()*23), mi=Math.floor(R()*60);
  const c=KF.chart({y,m,d,hh,mm:mi,cal:'solar',gender:'F',tz:480,lonFix:false,dst:false});
  const ec=Solar.fromYmdHms(y,m,d,hh,mi,0).getLunar().getEightChar();
  const mine=[c.pillars.year.txt,c.pillars.month.txt,c.pillars.day.txt,c.pillars.hour.txt].join(' ');
  const theirs=[ec.getYear(),ec.getMonth(),ec.getDay(),ec.getTime()].join(' ');
  n++; if(mine!==theirs){ bad++; if(bad<8) console.log('DIFF',y,m,d,hh,mi,mine,'|',theirs); }
}
console.log('checked',n,'diff',bad);
// 예시 인물
const c=KF.chart({y:1990,m:3,d:15,hh:10,mm:30,gender:'F'});
console.log('예시', ['year','month','day','hour'].map(k=>c.pillars[k].txt).join(' '), 'fix',c.lonFixMin,'el',c.elements,'strength',c.strength,'fav',c.fav,'daeun',c.daeun.startAge,c.daeun.forward,c.daeun.list.map(x=>x.age+x.pillar.txt+':'+x.score).join(' '));
const dd=KF.daily(c,2026,11,24); console.log('오늘',dd.pillar.txt,dd.scores,KF.TEN[dd.tenS],KF.TEN[dd.tenB],dd.lucky);
console.log('주간',KF.weekly(c,2026,11,24).map(x=>x.pillar.txt+x.scores.total).join(' '));
const bl=KF.solarToLunar(1990,3,15); console.log('음력생일',bl, '토정2027',KF.tojeong(bl,2027),'토정2026',KF.tojeong(bl,2026).code);
// 서머타임 · 음력입력
console.log('dst', KF.chart({y:1988,m:7,d:1,hh:12,mm:0}).dst, KF.chart({y:1990,m:2,d:19,hh:10,mm:30,cal:'lunar'}).solar);
