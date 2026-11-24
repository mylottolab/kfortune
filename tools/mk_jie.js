// 1899~2101년, 해마다 12절(節) 시각을 UTC 분(1900-01-01 기준)으로 → js/jie_data.js
const {Solar}=require('lunar-javascript');
const NAMES=['小寒','立春','惊蛰','清明','立夏','芒种','小暑','立秋','白露','寒露','立冬','大雪'];
const base=Date.UTC(1900,0,1);
const out=[];
for(let y=1899;y<=2101;y++){
  const t=Solar.fromYmd(y,6,1).getLunar().getJieQiTable();
  const row=NAMES.map(n=>{ const s=t[n]; const ms=Date.UTC(s.getYear(),s.getMonth()-1,s.getDay(),s.getHour(),s.getMinute(),s.getSecond())-8*3600e3; // 베이징시 → UTC
    if(s.getYear()!==y) throw new Error('year mismatch '+y+n);
    return Math.round((ms-base)/60000).toString(36); });
  out.push(row.join(','));
}
require('fs').writeFileSync('js/jie_data.js','/* 12절 입절 시각: 1899~2101, UTC 분(1900-01-01T00:00Z 기준), 36진수. 출처: lunar-javascript(MIT) 천문 계산 */\nwindow.KF_JIE={y0:1899,d:"'+out.join(';')+'"};\n');
console.log('years',out.length, require('fs').statSync('js/jie_data.js').size);
