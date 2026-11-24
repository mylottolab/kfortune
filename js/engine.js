/* 한국전통운세 계산 엔진 — 만세력 · 사주 · 대운 · 일진 · 점수 · 토정비결
   필요: jie_data.js(12절 시각), korean-lunar-calendar(KASI 음력, 1000~2050)
   브라우저: window.KF / Node: module.exports */
(function (root) {
  'use strict';
  var JIE = root.KF_JIE, KLC = root.KoreanLunarCalendar;
  if (typeof module !== 'undefined' && module.exports && !JIE) { JIE = require('./jie_data_node.js'); KLC = require('korean-lunar-calendar'); }

  var STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  var STEMS_KO = ['갑','을','병','정','무','기','경','신','임','계'];
  var BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  var BRANCHES_KO = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var ELEM = ['wood','fire','earth','metal','water'];          // 0목 1화 2토 3금 4수
  var STEM_EL = [0,0,1,1,2,2,3,3,4,4];
  var BR_EL = [4,2,0,0,2,1,1,2,3,3,2,4];
  var BR_YIN = [0,1,0,1,0,1,0,1,0,1,0,1];                       // 子양 丑음 … (체: 子=양)
  // 지장간(본기 마지막): 여기·중기·본기
  var HIDDEN = [[9],[9,7,5],[4,2,0],[1],[1,9,4],[4,6,2],[2,5,3],[3,1,5],[4,8,6],[7],[7,3,4],[0,8]];
  var MAIN_HIDDEN = HIDDEN.map(function (h) { return h[h.length - 1]; });
  var TEN = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
  var TEN_KEY = ['bigyeon','geopjae','siksin','sanggwan','pyeonjae','jeongjae','pyeongwan','jeonggwan','pyeonin','jeongin'];
  var STAGE12 = ['장생','목욕','관대','건록','제왕','쇠','병','사','묘','절','태','양'];
  // 양간 장생 지지: 甲亥 丙寅 戊寅 庚巳 壬申 / 음간: 乙午 丁酉 己酉 辛子 癸卯
  var CHANGSAENG = [11,6,2,9,2,9,5,0,8,3];
  var LIUHE = {0:1,1:0,2:11,11:2,3:10,10:3,4:9,9:4,5:8,8:5,6:7,7:6};   // 육합
  var DOHWA = {2:3,6:3,10:3, 8:9,0:9,4:9, 5:6,9:6,1:6, 11:0,3:0,7:0};   // 연·일지 기준 도화(삼합 끝 다음)

  function mod(a, n) { return ((a % n) + n) % n; }
  function pillar(i) { i = mod(i, 60); return { i: i, s: i % 10, b: i % 12, txt: STEMS[i % 10] + BRANCHES[i % 12], ko: STEMS_KO[i % 10] + BRANCHES_KO[i % 12] }; }
  function sb2idx(s, b) { for (var k = 0; k < 60; k++) if (k % 10 === s && k % 12 === b) return k; return -1; }

  /* ── 날짜 · 시각 ── */
  function jdn(y, m, d) { // 그레고리력 율리우스 일수
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  function dayPillar(y, m, d) { return pillar(jdn(y, m, d) + 49); }   // 2000-01-01 = 戊午 검증됨
  var BASE = Date.UTC(1900, 0, 1);
  var JIE_CACHE = null;
  function jieOf(y) { // y년 12절 UTC ms [소한, 입춘, 경칩, 청명, 입하, 망종, 소서, 입추, 백로, 한로, 입동, 대설]
    if (!JIE_CACHE) JIE_CACHE = JIE.d.split(';').map(function (r) { return r.split(',').map(function (v) { return BASE + parseInt(v, 36) * 60000; }); });
    var row = JIE_CACHE[y - JIE.y0]; if (!row) throw new Error('범위 밖 연도 ' + y); return row;
  }
  // 한국 서머타임(일광절약) 구간 — 이 기간 출생 시각은 1시간 빼서 표준시로
  var KR_DST = [['1948-06-01T00','1948-09-13T00'],['1949-04-03T00','1949-09-11T00'],['1950-04-01T00','1950-09-10T00'],['1951-05-06T00','1951-09-09T00'],
    ['1955-05-05T00','1955-09-09T00'],['1956-05-20T00','1956-09-30T00'],['1957-05-05T00','1957-09-22T00'],['1958-05-04T00','1958-09-21T00'],['1959-05-03T00','1959-09-20T00'],['1960-05-01T00','1960-09-18T00'],
    ['1987-05-10T02','1987-10-11T03'],['1988-05-08T02','1988-10-09T03']];
  function inKrDst(y, m, d, hh) {
    var k = y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2) + 'T' + ('0' + hh).slice(-2);
    for (var i = 0; i < KR_DST.length; i++) if (k >= KR_DST[i][0] && k < KR_DST[i][1]) return true;
    return false;
  }

  /* 음력 → 양력 (KASI) */
  function lunarToSolar(y, m, d, leap) {
    var c = new KLC(); if (!c.setLunarDate(y, m, d, !!leap)) throw new Error('없는 음력 날짜');
    var s = c.getSolarCalendar(); return { y: s.year, m: s.month, d: s.day };
  }
  function solarToLunar(y, m, d) {
    var c = new KLC(); if (!c.setSolarDate(y, m, d)) throw new Error('범위 밖 날짜');
    var l = c.getLunarCalendar(); return { y: l.year, m: l.month, d: l.day, leap: !!l.intercalation };
  }
  function lunarMonthDays(y, m, leap) {
    var c = new KLC(); return c.getLunarMonthDays(y, m, !!leap);
  }

  /* ── 사주 세우기 ──
     p: {y,m,d, hh,mm (시간 모르면 hh=null), cal:'solar'|'lunar', leap, gender:'F'|'M',
         tz: 표준시 분(기본 540=UTC+9), lon: 태어난 곳 경도(기본 126.98 서울), lonFix: 경도 보정(기본 true), dst: 'kr'|false } */
  function chart(p) {
    var tz = p.tz == null ? 540 : p.tz, lon = p.lon == null ? 126.98 : p.lon;
    var sd = p.cal === 'lunar' ? lunarToSolar(p.y, p.m, p.d, p.leap) : { y: p.y, m: p.m, d: p.d };
    var known = p.hh != null;
    var hh = known ? p.hh : 12, mm = known ? (p.mm || 0) : 0;
    var dstApplied = false;
    if (known && (p.dst === 'kr' || (p.dst == null && tz === 540)) && inKrDst(sd.y, sd.m, sd.d, hh)) { hh -= 1; dstApplied = true; }
    // 실제 순간(UTC) — 연·월주 판단용
    var utc = Date.UTC(sd.y, sd.m - 1, sd.d, hh, mm) - tz * 60000;
    // 지방시(경도 보정) — 일·시주 판단용
    var fix = (p.lonFix === false || !known) ? 0 : Math.round((lon - tz / 4) * 4);   // 분
    var lm = new Date(Date.UTC(sd.y, sd.m - 1, sd.d, hh, mm) + fix * 60000);
    var ly = lm.getUTCFullYear(), lmo = lm.getUTCMonth() + 1, ld = lm.getUTCDate(), lh = lm.getUTCHours(), lmin = lm.getUTCMinutes();

    // 연주: 입춘 기준
    var Y = sd.y; var jy = jieOf(Y); if (utc < jy[1]) Y -= 1;
    var yp = pillar(Y - 4);
    // 월주: 지난 절
    var mIdx; // 0=寅月 … 11=丑月
    var rows = [jieOf(sd.y - 1), jieOf(sd.y), jieOf(sd.y + 1)], best = null;
    for (var r = 0; r < 3; r++) for (var k = 0; k < 12; k++) { var t = rows[r][k]; if (t <= utc && (!best || t > best.t)) best = { t: t, k: k, y: sd.y - 1 + r }; }
    mIdx = mod(best.k - 1, 12);                                  // 立春(k=1)→寅(0)
    var mBranch = mod(mIdx + 2, 12);
    var mStem = mod((yp.s % 5) * 2 + 2 + mIdx, 10);
    var mp = pillar(sb2idx(mStem, mBranch));
    // 일주: 지방시 23시부터 다음 날(자시 시작)
    var dDate = new Date(Date.UTC(ly, lmo - 1, ld) + (known && lh >= 23 ? 86400000 : 0));
    var dp = dayPillar(dDate.getUTCFullYear(), dDate.getUTCMonth() + 1, dDate.getUTCDate());
    // 시주
    var hp = null;
    if (known) { var hb = Math.floor(mod(lh * 60 + lmin + 60, 1440) / 120); var hs = mod((dp.s % 5) * 2 + hb, 10); hp = pillar(sb2idx(hs, hb)); }

    var pillars = { year: yp, month: mp, day: dp, hour: hp };
    var dm = dp.s;
    var res = { input: p, solar: sd, utc: utc, localMean: { y: ly, m: lmo, d: ld, h: lh, mi: lmin }, lonFixMin: fix, dst: dstApplied,
      timeKnown: known, pillars: pillars, dayMaster: dm, dayMasterEl: STEM_EL[dm] };
    analyze(res);
    res.daeun = daeun(res, p.gender || 'F', best);
    return res;
  }

  function tenGod(dm, otherStem) {
    var a = STEM_EL[dm], b = STEM_EL[otherStem], same = (dm % 2) === (otherStem % 2);
    var rel = mod(b - a, 5); // 0 같음, 1 내가 생, 2 내가 극, 3 나를 극, 4 나를 생
    var base = [0, 2, 4, 6, 8][rel];
    return base + (same ? 0 : 1);
  }
  function stage12(stem, branch) {
    var start = CHANGSAENG[stem]; var yang = stem % 2 === 0;
    return yang ? mod(branch - start, 12) : mod(start - branch, 12);
  }

  function analyze(c) {
    var P = c.pillars, dm = c.dayMaster, cnt = [0, 0, 0, 0, 0], w = [0, 0, 0, 0, 0];
    var list = [];
    ['year', 'month', 'day', 'hour'].forEach(function (k) {
      var p = P[k]; if (!p) return;
      cnt[STEM_EL[p.s]]++; cnt[BR_EL[p.b]]++;
      list.push({ pos: k, kind: 'stem', idx: p.s, ten: k === 'day' ? -1 : tenGod(dm, p.s) });
      list.push({ pos: k, kind: 'branch', idx: p.b, ten: tenGod(dm, MAIN_HIDDEN[p.b]), stage: stage12(dm, p.b) });
      // 세력(지장간 포함, 월지 가중)
      w[STEM_EL[p.s]] += 1;
      var hid = HIDDEN[p.b], mult = k === 'month' ? 2 : 1;
      hid.forEach(function (h, i) { w[STEM_EL[h]] += mult * (i === hid.length - 1 ? 0.7 : 0.3 / Math.max(1, hid.length - 1)); });
    });
    var me = STEM_EL[dm], mother = mod(me - 1, 5);
    var support = w[me] + w[mother], total = w.reduce(function (a, b) { return a + b; }, 0);
    var strength = support / total;          // 0.5 근처가 중화
    var strong = strength >= 0.5;
    // 희용 오행: 강하면 식상·재·관, 약하면 인·비. 빠진 오행은 더 반긴다
    var fav = [0, 0, 0, 0, 0];
    for (var e = 0; e < 5; e++) {
      var rel = mod(e - me, 5); // 0비 1식 2재 3관 4인
      var f = strong ? [-1, 1, 1, 0.6, -0.8][rel] : [0.8, -0.6, -0.8, -1, 1][rel];
      if (cnt[e] === 0) f += 0.5;
      if (cnt[e] >= 4) f -= 0.5;
      fav[e] = Math.max(-1.5, Math.min(1.5, f));
    }
    var tens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    list.forEach(function (x) { if (x.ten >= 0) tens[x.ten]++; });
    c.elements = cnt; c.weights = w.map(function (v) { return Math.round(v * 10) / 10; });
    c.strength = Math.round(strength * 100); c.strong = strong; c.fav = fav;
    c.items = list; c.tens = tens;
    c.missing = cnt.map(function (v, i) { return v === 0 ? i : -1; }).filter(function (i) { return i >= 0; });
    c.dayStage = stage12(dm, P.day.b);
  }

  /* 대운: 양남음녀 순행, 음남양녀 역행 · 절까지 날수 ÷ 3 = 대운수 */
  function daeun(c, gender, prevJie) {
    var yangYear = c.pillars.year.s % 2 === 0;
    var forward = (yangYear && gender === 'M') || (!yangYear && gender === 'F');
    var utc = c.utc, target;
    if (forward) { // 다음 절
      var y = c.solar.y, best = null;
      [jieOf(y), jieOf(y + 1)].forEach(function (row) { row.forEach(function (t) { if (t > utc && (!best || t < best)) best = t; }); });
      target = best;
    } else target = prevJie.t;
    var days = Math.abs(target - utc) / 86400000;
    var startAge = days / 3; var sy = Math.floor(startAge), smo = Math.round((startAge - sy) * 12);
    if (smo === 12) { sy++; smo = 0; }
    var list = [];
    for (var i = 1; i <= 9; i++) {
      var p = pillar(c.pillars.month.i + (forward ? i : -i));
      list.push({ age: sy + (i - 1) * 10, pillar: p, tenS: tenGod(c.dayMaster, p.s), tenB: tenGod(c.dayMaster, MAIN_HIDDEN[p.b]), score: periodScore(c, p) });
    }
    return { forward: forward, startAge: sy, startMonths: smo, list: list };
  }

  /* ── 점수 ── 들어오는 간지(p)가 이 사주에 얼마나 반가운가 */
  function rel5(c, el) { return mod(el - c.dayMasterEl, 5); }   // 0비 1식 2재 3관 4인
  function periodScore(c, p) {
    var f = c.fav, s = f[STEM_EL[p.s]] * 1.0 + f[BR_EL[p.b]] * 1.2;
    var db = c.pillars.day.b;
    if (LIUHE[db] === p.b) s += 0.6;            // 일지와 합
    if (mod(p.b - db, 12) === 6) s -= 0.9;      // 일지와 충
    return clamp(Math.round(73 + s * 5.5), 50, 95);
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }

  // 하루(또는 한 간지) 분야별 점수 — 총운·재물·일·대인·애정·건강
  function areaScores(c, p, seed) {
    var base = periodScore(c, p);
    var sEl = STEM_EL[p.s], bEl = BR_EL[p.b], rs = rel5(c, sEl), rb = rel5(c, bEl);
    var has = function (r) { return (rs === r ? 1 : 0) + (rb === r ? 0.8 : 0); };
    var g = c.input && c.input.gender === 'M' ? 'M' : 'F';
    var db = c.pillars.day.b, chung = mod(p.b - db, 12) === 6, hap = LIUHE[db] === p.b;
    var dohwa = DOHWA[c.pillars.year.b] === p.b || DOHWA[db] === p.b;
    var j = function (k) { return (hash(seed + k) % 7) - 3; };   // ±3 흔들림(같은 날 같은 값)
    var favOf = function (r) { return c.fav[mod(c.dayMasterEl + r, 5)]; };
    var money = base + has(2) * (2 + favOf(2) * 4) + has(1) * 2 + j('m');
    var work = base + has(3) * (2 + favOf(3) * 4) + has(4) * 2 + has(1) * 1 + j('w');
    var people = base + has(0) * (favOf(0) * 4) + (hap ? 4 : 0) - (chung ? 5 : 0) + j('p');
    var love = base + (g === 'M' ? has(2) : has(3)) * 3 + (dohwa ? 5 : 0) + (hap ? 3 : 0) - (chung ? 4 : 0) + j('l');
    var balance = c.missing.indexOf(sEl) >= 0 || c.missing.indexOf(bEl) >= 0 ? 3 : 0;
    var health = base + balance - (chung ? 6 : 0) - (c.elements[bEl] >= 4 ? 3 : 0) + j('h');
    var sc = { money: money, work: work, people: people, love: love, health: health };
    Object.keys(sc).forEach(function (k) { sc[k] = clamp(Math.round(sc[k]), 45, 97); });
    sc.total = clamp(Math.round((sc.money + sc.work + sc.people + sc.love + sc.health) / 5 * 0.6 + base * 0.4), 45, 98);
    return { scores: sc, tenS: tenGod(c.dayMaster, p.s), tenB: tenGod(c.dayMaster, MAIN_HIDDEN[p.b]), chung: chung, hap: hap, dohwa: dohwa, pillar: p };
  }

  function daily(c, y, m, d) {
    var p = dayPillar(y, m, d);
    var r = areaScores(c, p, 'd' + y + m + d + c.pillars.day.txt);
    r.date = { y: y, m: m, d: d };
    var fe = c.fav.indexOf(Math.max.apply(null, c.fav));
    r.lucky = luckyOf(fe, hash(y + '-' + m + '-' + d + c.pillars.day.txt));
    // 시간대: 오전(巳) · 오후(未) · 저녁(酉) 시주 간지로 비교
    var slots = [5, 7, 9].map(function (hb) { var hs = mod((p.s % 5) * 2 + hb, 10); var hp = pillar(sb2idx(hs, hb)); return { pillar: hp, score: periodScore(c, hp), ten: tenGod(c.dayMaster, hs) }; });
    r.slots = slots;
    return r;
  }
  function weekly(c, y, m, d) { // (y,m,d)가 들어 있는 주의 월~일
    var t = Date.UTC(y, m - 1, d), wd = new Date(t).getUTCDay(), mon = t - ((wd + 6) % 7) * 86400000, out = [];
    for (var i = 0; i < 7; i++) { var dt = new Date(mon + i * 86400000); out.push(daily(c, dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate())); }
    return out;
  }
  function yearly(c, Y) { // 세운
    var p = pillar(Y - 4); var r = areaScores(c, p, 'y' + Y + c.pillars.day.txt); r.year = Y; return r;
  }
  var LUCKY = { // 오행별 색 · 수 · 방향
    0: { colors: ['green', 'teal'], nums: [3, 8], dir: 'E' }, 1: { colors: ['red', 'purple'], nums: [2, 7], dir: 'S' },
    2: { colors: ['yellow', 'beige'], nums: [5, 10], dir: 'C' }, 3: { colors: ['white', 'silver'], nums: [4, 9], dir: 'W' },
    4: { colors: ['navy', 'black'], nums: [1, 6], dir: 'N' } };
  function luckyOf(el, h) { var L = LUCKY[el]; return { el: el, color: L.colors[h % 2], nums: L.nums, dir: L.dir }; }

  /* ── 토정비결 ──
     상괘 = (볼 해 세는나이 + 태세수) % 8 (0→8)
     중괘 = (볼 해 생월 날수 + 월건수) % 6 (0→6)
     하괘 = (생일 + 일진수) % 3 (0→3)
     간지 수: 천간 甲己9 乙庚8 丙辛7 丁壬6 戊癸5 / 지지 子午9 丑未8 寅申7 卯酉6 辰戌5 巳亥4 */
  var SN = [9, 8, 7, 6, 5, 9, 8, 7, 6, 5], BN = [9, 8, 7, 6, 5, 4, 9, 8, 7, 6, 5, 4];
  function gzNum(p) { return SN[p.s] + BN[p.b]; }
  function tojeong(birthLunar, targetYear) { // birthLunar {y,m,d} 음력 생일
    var age = targetYear - birthLunar.y + 1;
    var tp = pillar(targetYear - 4);
    var upper = mod(age + gzNum(tp), 8) || 8;
    var mdays = lunarMonthDays(targetYear, birthLunar.m, false);
    var mIdx = mod(birthLunar.m - 1, 12);                       // 정월=寅
    var mStem = mod((tp.s % 5) * 2 + 2 + mIdx, 10), mBranch = mod(mIdx + 2, 12);
    var mp = pillar(sb2idx(mStem, mBranch));
    var middle = mod(mdays + gzNum(mp), 6) || 6;
    var bd = Math.min(birthLunar.d, mdays);
    var sd = lunarToSolar(targetYear, birthLunar.m, bd, false);
    var dp = dayPillar(sd.y, sd.m, sd.d);
    var lower = mod(birthLunar.d + gzNum(dp), 3) || 3;
    return { year: targetYear, yearPillar: tp, age: age, upper: upper, middle: middle, lower: lower, code: '' + upper + middle + lower,
      monthPillar: mp, dayPillar: dp, monthDays: mdays };
  }

  var KF = { STEMS: STEMS, STEMS_KO: STEMS_KO, BRANCHES: BRANCHES, BRANCHES_KO: BRANCHES_KO, ELEM: ELEM, STEM_EL: STEM_EL, BR_EL: BR_EL,
    TEN: TEN, TEN_KEY: TEN_KEY, STAGE12: STAGE12, HIDDEN: HIDDEN,
    pillar: pillar, dayPillar: dayPillar, chart: chart, tenGod: tenGod, stage12: stage12, daily: daily, weekly: weekly, yearly: yearly,
    areaScores: areaScores, periodScore: periodScore, tojeong: tojeong, lunarToSolar: lunarToSolar, solarToLunar: solarToLunar, lunarMonthDays: lunarMonthDays,
    hash: hash, inKrDst: inKrDst, jieOf: jieOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = KF; else root.KF = KF;
})(typeof window !== 'undefined' ? window : globalThis);
