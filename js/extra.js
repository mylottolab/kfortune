/* KoreanFortune — 행운의 번호 · 이사 방향(구성九星) · 삼재                         2026-11-26
   화면(app.js)과 글(data/<lang>/extra.js)은 따로 — 여기는 계산만 합니다.
   ⚠ 행운의 번호는 재미로 보는 숫자입니다. 당첨을 약속하지 않습니다. */
(function (root) {
  'use strict';
  function mod(a, n) { return ((a % n) + n) % n; }
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = hash(String(seed)) || 1; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ── 행운의 번호: PaperLotto 와 같은 12종 · 같은 규칙 ── */
  var GAMES = [
    { id: 'kr_lotto645', flag: '🇰🇷', ko: '한국 로또 6/45', en: 'Korea Lotto 6/45', ja: '韓国ロト6/45', main: 6, range: 45 },
    { id: 'us_powerball', flag: '🇺🇸', ko: '미국 파워볼', en: 'US Powerball', ja: 'パワーボール', main: 5, range: 69, bonus: 1, bonusRange: 26 },
    { id: 'us_megamillions', flag: '🇺🇸', ko: '미국 메가밀리언스', en: 'US Mega Millions', ja: 'メガミリオンズ', main: 5, range: 70, bonus: 1, bonusRange: 24 },
    { id: 'eu_euromillions', flag: '🇪🇺', ko: '유로밀리언스', en: 'EuroMillions', ja: 'ユーロミリオンズ', main: 5, range: 50, bonus: 2, bonusRange: 12 },
    { id: 'jp_miniloto', flag: '🇯🇵', ko: '일본 미니로또', en: 'Japan Mini Loto', ja: 'ミニロト', main: 5, range: 31 },
    { id: 'jp_loto7', flag: '🇯🇵', ko: '일본 로또7', en: 'Japan Loto 7', ja: 'ロト7', main: 7, range: 37 },
    { id: 'jp_loto6', flag: '🇯🇵', ko: '일본 로또6', en: 'Japan Loto 6', ja: 'ロト6', main: 6, range: 43 },
    { id: 'ca_lottomax', flag: '🇨🇦', ko: '캐나다 로또맥스', en: 'Canada Lotto Max', ja: 'ロトマックス', main: 7, range: 50 },
    { id: 'ca_lotto649', flag: '🇨🇦', ko: '캐나다 로또 6/49', en: 'Canada Lotto 6/49', ja: 'ロト6/49', main: 6, range: 49 },
    { id: 'au_powerball', flag: '🇦🇺', ko: '호주 파워볼', en: 'Australia Powerball', ja: '豪パワーボール', main: 7, range: 35, bonus: 1, bonusRange: 20 },
    { id: 'au_ozlotto', flag: '🇦🇺', ko: '호주 오즈로또', en: 'Oz Lotto', ja: 'オズロト', main: 7, range: 47 },
    { id: 'au_tattslotto', flag: '🇦🇺', ko: '호주 새터데이로또', en: 'Saturday Lotto', ja: 'サタデーロト', main: 6, range: 45 }
  ];
  // 하도(河圖): 끝자리 1·6 물, 2·7 불, 3·8 나무, 4·9 쇠, 5·0 흙 → 오행 번호(0나무 1불 2흙 3쇠 4물)
  var DIGIT_EL = [2, 4, 1, 0, 3, 2, 4, 1, 0, 3];
  function elOf(n) { return DIGIT_EL[n % 10]; }
  // 내 사주에 힘이 되는 기운(fav가 큰 순) — 그 기운의 숫자를 조금 더 자주 뽑습니다
  function luckEls(c) { var f = c.fav.map(function (v, i) { return [v, i]; }).sort(function (a, b) { return b[0] - a[0]; }); return [f[0][1], f[1][1]]; }
  function weightOf(c, n) { var e = elOf(n), f = c.fav[e]; return Math.max(0.35, 1 + f * 0.9); }
  function draw(r, c, range, k) {
    var pool = []; for (var n = 1; n <= range; n++) pool.push({ n: n, w: weightOf(c, n) });
    var out = [];
    for (var j = 0; j < k; j++) {
      var tot = pool.reduce(function (a, x) { return a + x.w; }, 0), x = r() * tot, i = 0;
      while (i < pool.length - 1 && (x -= pool[i].w) > 0) i++;
      out.push(pool[i].n); pool.splice(i, 1);
    }
    return out.sort(function (a, b) { return a - b; });
  }
  // seed: 무료는 「사람+로또+날짜」(같은 날엔 같은 번호), 구매 묶음은 「주문번호+로또」
  function sets(c, gi, count, seed) {
    var g = GAMES[gi], r = rng(seed + '|' + g.id), out = [];
    for (var i = 0; i < count; i++) {
      var main = draw(r, c, g.range, g.main);
      var bonus = g.bonus ? draw(r, c, g.bonusRange, g.bonus) : null;
      out.push({ main: main, bonus: bonus });
    }
    return out;
  }
  function name(gi, lang) { var g = GAMES[gi]; if (!g) return ''; return lang === 'ko' ? g.ko : lang === 'ja' ? g.ja : g.en; }

  /* ── 이사 방향: 구성(九星) 연반 · 월반 + 대장군방 · 삼살방 ── */
  var DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var OPP = { N: 'S', S: 'N', E: 'W', W: 'E', NE: 'SW', SW: 'NE', SE: 'NW', NW: 'SE' };
  var FLY = ['C', 'NW', 'W', 'NE', 'S', 'N', 'SW', 'E', 'SE'];          // 중궁에서 날아가는 순서(낙서)
  var STAR_EL = [null, 4, 2, 0, 0, 2, 3, 3, 2, 1];                       // 1물 2흙 3·4나무 5흙 6·7쇠 8흙 9불
  var BR_DIR = ['N', 'NE', 'NE', 'E', 'SE', 'SE', 'S', 'SW', 'SW', 'W', 'NW', 'NW'];   // 子~亥 방향
  function digitStar(y) { var s = String(y).split('').reduce(function (a, d) { return a + +d; }, 0); while (s > 9) s = String(s).split('').reduce(function (a, d) { return a + +d; }, 0); var st = 11 - s; while (st > 9) st -= 9; return st; }
  function ipchunYear(y, m, d) { return (m < 2 || (m === 2 && d < 4)) ? y - 1 : y; }   // 입춘(2/4 무렵) 전이면 앞 해
  function board(center) { var b = {}; FLY.forEach(function (pos, k) { b[pos] = mod(center - 1 + k, 9) + 1; }); return b; }
  function posOf(b, star) { for (var k in b) if (b[k] === star) return k; return null; }
  function gen(a, b) { return mod(b - a, 5) === 1; }       // a가 b를 낳음 (0나무→1불→2흙→3쇠→4물)
  function relation(myEl, starEl) { if (myEl === starEl) return 'same'; if (gen(starEl, myEl)) return 'give'; if (gen(myEl, starEl)) return 'take'; return 'clash'; }
  // 띠(지지)로 대장군방 · 삼살방
  function daejang(yb) { return ['W', 'N', 'E', 'S'][Math.floor(mod(yb + 1, 12) / 3)]; }   // 亥子丑→서 · 寅卯辰→북 · 巳午未→동 · 申酉戌→남
  function samsal(yb) { var g = mod(yb, 4); return { 0: 'S', 1: 'E', 2: 'N', 3: 'W' }[g]; }  // 申子辰→남 · 巳酉丑→동 · 寅午戌→북 · 亥卯未→서
  function judge(b, me, breakDir) {
    var five = posOf(b, 5), out = {};
    var mine = posOf(b, me);
    DIRS.forEach(function (d) {
      var bad = [], good = [], st = b[d];
      if (d === five) bad.push('ohwang');
      if (five && five !== 'C' && d === OPP[five]) bad.push('amgeom');
      if (mine && mine !== 'C' && d === mine) bad.push('bonmyeong');
      if (mine && mine !== 'C' && d === OPP[mine]) bad.push('jeoksal');
      if (d === breakDir) bad.push('pa');
      var rel = st === 5 ? 'clash' : relation(STAR_EL[me], STAR_EL[st]);
      if (rel === 'give') good.push('saenggi'); else if (rel === 'take') good.push('toegi'); else if (rel === 'same') good.push('bihwa');
      out[d] = { star: st, bad: bad, good: good, rel: rel };
    });
    return out;
  }
  // Y년(입춘 기준) · 본명성 me → 8방향 길흉과 이유
  function moveYear(Y, me) {
    var center = digitStar(Y), yb = mod(Y - 4, 12), b = board(center);
    var j = judge(b, me, OPP[BR_DIR[yb]]);
    var dj = daejang(yb), ss = samsal(yb);
    DIRS.forEach(function (d) {
      if (d === dj) j[d].bad.push('daejang');
      if (d === ss) j[d].bad.push('samsal');
      j[d].level = j[d].bad.length ? 2 : j[d].good.length ? 0 : 1;   // 0 좋음 · 1 보통 · 2 피함
    });
    return { year: Y, center: center, board: b, dirs: j, daejang: dj, samsal: ss, yb: yb };
  }
  // 월반: 寅월(입춘~)부터 12달. 子午卯酉년 8 · 辰戌丑未년 5 · 寅申巳亥년 2에서 시작해 한 달에 하나씩 줄어듦
  function moveMonths(Y, me) {
    var yb = mod(Y - 4, 12), start = [8, 5, 2][mod(yb, 3)], out = [];
    for (var i = 0; i < 12; i++) {
      var center = mod(start - 1 - i, 9) + 1, mb = mod(2 + i, 12), b = board(center);
      out.push({ idx: i, solarMonth: mod(1 + i, 12) + 1, center: center, dirs: judge(b, me, OPP[BR_DIR[mb]]) });
    }
    return out;   // solarMonth: 2월(寅) … 1월(丑) — 각 달은 그 달 4~8일 무렵 절입부터
  }
  // 삼재: 띠(태어난 해 지지)와 올해 지지
  function samjae(birthB, Y) {
    var yb = mod(Y - 4, 12), start = { 0: 2, 4: 2, 8: 2, 3: 5, 7: 5, 11: 5, 2: 8, 6: 8, 10: 8, 1: 11, 5: 11, 9: 11 }[birthB];
    var k = mod(yb - start, 12);
    return k <= 2 ? k : -1;   // 0 들삼재 · 1 눌삼재 · 2 날삼재 · -1 아님
  }
  root.KF_LOTTO = { GAMES: GAMES, sets: sets, name: name, elOf: elOf, luckEls: luckEls };
  root.KF_MOVE = { DIRS: DIRS, OPP: OPP, star: digitStar, ipchunYear: ipchunYear, year: moveYear, months: moveMonths, samjae: samjae, STAR_EL: STAR_EL };
})(typeof window !== 'undefined' ? window : globalThis);
