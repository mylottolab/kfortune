/* 한국전통운세 — 화면 */
(function () {
  'use strict';
  var KF = window.KF;
  var LANGS = [['ko', '한국어', 1], ['en', 'English', 1], ['ja', '日本語', 1], ['zh-Hans', '简体中文', 1], ['zh-Hant', '繁體中文', 1], ['es', 'Español', 1],
    ['vi', 'Tiếng Việt', 1], ['th', 'ไทย', 1], ['id', 'Bahasa Indonesia', 1], ['de', 'Deutsch', 1], ['fr', 'Français', 1], ['ar', 'العربية', 1], ['ru', 'Русский', 1]];
  var PLACES = [
    ['서울', 'Seoul', 540, 126.98], ['부산', 'Busan', 540, 129.08], ['대구', 'Daegu', 540, 128.6], ['인천', 'Incheon', 540, 126.7], ['광주', 'Gwangju', 540, 126.85],
    ['대전', 'Daejeon', 540, 127.38], ['울산', 'Ulsan', 540, 129.31], ['수원', 'Suwon', 540, 127.03], ['춘천', 'Chuncheon', 540, 127.73], ['강릉', 'Gangneung', 540, 128.9],
    ['전주', 'Jeonju', 540, 127.15], ['청주', 'Cheongju', 540, 127.49], ['제주', 'Jeju', 540, 126.53], ['평양', 'Pyongyang', 540, 125.75],
    ['도쿄', 'Tokyo', 540, 139.69], ['오사카', 'Osaka', 540, 135.5], ['베이징', 'Beijing', 480, 116.4], ['상하이', 'Shanghai', 480, 121.47], ['홍콩', 'Hong Kong', 480, 114.17],
    ['타이베이', 'Taipei', 480, 121.56], ['싱가포르', 'Singapore', 480, 103.82], ['하노이', 'Hanoi', 420, 105.85], ['호찌민', 'Ho Chi Minh City', 420, 106.63],
    ['방콕', 'Bangkok', 420, 100.5], ['자카르타', 'Jakarta', 420, 106.85], ['마닐라', 'Manila', 480, 120.98], ['시드니', 'Sydney', 600, 151.2], ['두바이', 'Dubai', 240, 55.27],
    ['런던', 'London', 0, -0.12], ['파리', 'Paris', 60, 2.35], ['베를린', 'Berlin', 60, 13.4], ['마드리드', 'Madrid', 60, -3.7], ['뉴욕', 'New York', -300, -74.0],
    ['로스앤젤레스', 'Los Angeles', -480, -118.24], ['멕시코시티', 'Mexico City', -360, -99.13], ['상파울루', 'São Paulo', -180, -46.63]];
  var EL = ['wood', 'fire', 'earth', 'metal', 'water'];

  /* ── 저장 ── */
  function ls(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  var READY = LANGS.filter(function (l) { return l[2]; }).map(function (l) { return l[0]; });
  var S = { lang: ls('kf_lang') || pickLang(), profiles: ls('kf_profiles') || [], active: ls('kf_active'), ent: ls('kf_ent') || {} };
  if (READY.indexOf(S.lang) < 0) S.lang = 'en';
  var PRO = /[?&]pro=1/.test(location.search) && /^(localhost|127\.0\.0\.1)$/.test(location.hostname);   // 시험용(내 컴퓨터에서만)
  if (PRO) S.ent = { sub: '2099-12-31' };
  S.theme = ls('kf_theme') || 'auto';
  function save() { ls('kf_lang', S.lang); ls('kf_profiles', S.profiles); ls('kf_active', S.active); }
  function pickLang() { var n = (navigator.language || 'ko').toLowerCase(); if (n.indexOf('ko') === 0) return 'ko'; if (n.indexOf('ja') === 0) return 'ja';
    if (n.indexOf('zh') === 0) return /tw|hk|hant|mo/.test(n) ? 'zh-Hant' : 'zh-Hans'; var two = n.slice(0, 2); if (['es', 'de', 'fr', 'id', 'th', 'vi', 'ar', 'ru'].indexOf(two) >= 0) return two; if (two === 'in') return 'id'; return 'en'; }
  function TX() { return (window.KF_TXT && (window.KF_TXT[S.lang] || window.KF_TXT.ko)) || {}; }
  function U(k, vars) { var t = TX().ui || {}, v = t[k]; if (v == null) v = (TX().extra || {})[k]; if (v == null) v = ((window.KF_TXT.ko || {}).ui || {})[k]; if (v == null) v = ((window.KF_TXT.ko || {}).extra || {})[k]; if (v == null) return k; return fill(v, vars); }
  function D() { return TX().daily || window.KF_TXT.ko.daily; }
  function fill(s, vars) { if (typeof s !== 'string' || !vars) return s; return s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
  function cap(t) { t = String(t || ''); return t.charAt(0).toUpperCase() + t.slice(1); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function prof() { return S.profiles.filter(function (p) { return p.id === S.active; })[0] || S.profiles[0]; }
  // 스토어 앱 안에서는 복권(로또) 링크를 보이지 않음 — 연령 제한 활동 홍보로 볼 수 있어서
  var IN_APP = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) || !!window.KFNative;
  function isSub() { return S.ent.sub && S.ent.sub >= todayStr(); }
  // 산 것은 "누구의 사주인지"(생년월일시 요약)로 기억합니다 — 다른 기기에서 같은 사람을 다시 입력해도 열림
  function bkey(p) { var z = function (n) { return ('0' + n).slice(-2); };
    return (p.cal === 'lunar' ? 'l' + (p.leap ? 1 : 0) : 's0') + ':' + p.y + z(p.m) + z(p.d) + ':' + (p.hh == null ? 'xx' : z(p.hh) + z(p.mm || 0)) + ':' + (p.gender || 'X'); }
  function hasSaju(p) { var a = S.ent.saju || []; return subOn(p) || a.indexOf(bkey(p)) >= 0 || a.indexOf(p.id) >= 0; }
  function hasToj(p, y) { var a = (S.ent.toj || {})[y] || []; return (y === tojYear() && subOn(p)) || a.indexOf(bkey(p)) >= 0 || a.indexOf(p.id) >= 0; }
  // 1년 이용권은 등록한 사람(본인 포함 4명)에게만 — 한 번 등록하면 바꾸지 않음
  function people() { return S.ent.people || []; }
  function peopleMax() { return S.ent.peopleMax || 4; }
  function subOn(p) { return !!isSub() && !!p && (PRO || people().indexOf(bkey(p)) >= 0); }
  // 잠긴 곳의 버튼: 이용권이 있고 자리가 남았으면 「이 사람 등록」, 다 찼으면 안내 + 따로 사기
  function payBtn(p, label, cls) {
    cls = cls || 'btn';
    if (isSub() && p && !subOn(p)) {
      var left = peopleMax() - people().length;
      if (left > 0) return '<button class="' + cls + '" data-claim="' + esc(bkey(p)) + '">' + esc(U('subClaim', { name: p.name, n: left })) + '</button><div class="small" style="text-align:center">' + esc(U('subClaimNote', { n: peopleMax() })) + '</div>';
      return '<div class="small" style="text-align:center">' + esc(U('subFull', { n: peopleMax() })) + '</div><a class="' + cls + '" href="#pay">' + esc(label) + '</a>';
    }
    return '<a class="' + cls + '" href="#pay">' + esc(label) + '</a>';
  }
  function todayYMD() { var n = new Date(); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate(), wd: (n.getDay() + 6) % 7 }; }
  function todayStr() { var t = todayYMD(); return t.y + '-' + ('0' + t.m).slice(-2) + '-' + ('0' + t.d).slice(-2); }

  var CACHE = {};
  function chartOf(p) {
    var k = JSON.stringify(p); if (CACHE[k]) return CACHE[k];
    var pl = PLACES[p.place || 0];
    var c = KF.chart({ y: p.y, m: p.m, d: p.d, hh: p.hh, mm: p.mm, cal: p.cal, leap: p.leap, gender: p.gender, tz: pl[2], lon: pl[3], dst: pl[2] === 540 ? 'kr' : false });
    return (CACHE[k] = c);
  }
  function band(v) { return v >= 80 ? 0 : v >= 65 ? 1 : 2; }

  /* ── 그림 (SVG) ── */
  function ring(v) {
    var c = 2 * Math.PI * 40, a = c * v / 100;
    return '<svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="' + esc(U('total')) + ' ' + v + '"><circle cx="48" cy="48" r="40" fill="none" stroke="#3A5A86" stroke-width="9"/>' +
      '<circle cx="48" cy="48" r="40" fill="none" stroke="#E7C27A" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + a.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 48 48)"/>' +
      '<text x="48" y="54" text-anchor="middle" font-family="Noto Serif KR,serif" font-weight="900" font-size="28" fill="#F4EEE3">' + v + '</text>' +
      '<text x="48" y="70" text-anchor="middle" font-size="10" fill="#C9D3E3">' + esc(U('total')) + '</text></svg>';
  }
  function radar(sc) {
    var keys = ['money', 'work', 'people', 'love', 'health'], cx = 150, cy = 150, R = 100, an = D().areaName;
    var pt = function (i, r) { var a = (-90 + 72 * i) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    var poly = function (r) { return keys.map(function (k, i) { return pt(i, r).map(function (v) { return v.toFixed(1); }).join(','); }).join(' '); };
    var s = '<svg width="340" height="270" viewBox="-20 0 340 270" style="max-width:100%;height:auto" role="img" aria-label="' + keys.map(function (k) { return an[k] + ' ' + sc[k]; }).join(', ') + '">';
    s += '<polygon points="' + poly(100) + '" fill="none" stroke="#D8CBB6"/><polygon points="' + poly(50) + '" fill="none" stroke="#E5DACA"/>';
    keys.forEach(function (k, i) { var p = pt(i, 100); s += '<line x1="150" y1="150" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" stroke="#E5DACA"/>'; });
    s += '<polygon points="' + keys.map(function (k, i) { return pt(i, sc[k]).map(function (v) { return v.toFixed(1); }).join(','); }).join(' ') + '" fill="#23406A" fill-opacity=".18" stroke="#23406A" stroke-width="2"/>';
    var top = keys.reduce(function (a, k) { return sc[k] > sc[a] ? k : a; }, keys[0]);
    keys.forEach(function (k, i) { var p = pt(i, 122); s += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 4).toFixed(1) + '" text-anchor="middle" font-size="13"' + (k === top ? ' font-weight="700" fill="#A9322A"' : ' fill="#221C16"') + '>' + esc(an[k]) + ' ' + sc[k] + '</text>'; });
    return s + '</svg>';
  }
  function lineChart(vals, labels, sub, hiIdx) {
    var W = 350, x0 = 40, dx = (W - 62) / (vals.length - 1), y = function (v) { return 180 - (v - 50) * 3.4; };
    var s = '<svg width="350" height="230" viewBox="0 0 350 230" role="img" aria-label="' + labels.map(function (l, i) { return l + ' ' + vals[i]; }).join(', ') + '">';
    [60, 70, 80, 90].forEach(function (g) { s += '<line x1="24" y1="' + y(g) + '" x2="338" y2="' + y(g) + '" stroke="#EDE4D6"/><text x="18" y="' + (y(g) + 4) + '" text-anchor="end" font-size="10.5" fill="#6E6458">' + g + '</text>'; });
    s += '<polyline points="' + vals.map(function (v, i) { return (x0 + i * dx).toFixed(1) + ',' + y(v).toFixed(1); }).join(' ') + '" fill="none" stroke="#23406A" stroke-width="2.5" stroke-linejoin="round"/>';
    vals.forEach(function (v, i) { var X = x0 + i * dx, on = i === hiIdx;
      s += '<circle cx="' + X.toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="' + (on ? 6 : 4) + '" fill="' + (on ? '#A9322A' : '#23406A') + '"/>';
      if (on) s += '<text x="' + X.toFixed(1) + '" y="' + (y(v) - 12).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#A9322A">' + v + '</text>';
      s += '<text x="' + X.toFixed(1) + '" y="204" text-anchor="middle" font-size="12"' + (on ? ' font-weight="700" fill="#A9322A"' : ' fill="#221C16"') + '>' + esc(labels[i]) + '</text>';
      if (sub) s += '<text x="' + X.toFixed(1) + '" y="222" text-anchor="middle" font-size="10.5" fill="#6E6458" font-family="Noto Serif KR,serif">' + esc(sub[i]) + '</text>'; });
    return s + '</svg>';
  }
  function bars(vals, labels, sub, hiIdx, loIdx, nowIdx) {
    var n = vals.length, W = 350, bw = Math.min(34, (W - 20) / n - 8), gap = (W - 20 - bw * n) / (n - 1), h = function (v) { return Math.max(8, (v - 40) * 2.2); };
    var s = '<svg width="350" height="200" viewBox="0 0 350 200" role="img" aria-label="' + labels.map(function (l, i) { return l + ' ' + vals[i]; }).join(', ') + '"><line x1="8" y1="150" x2="342" y2="150" stroke="#D8CBB6"/>';
    vals.forEach(function (v, i) { var x = 10 + i * (bw + gap), col = i === nowIdx ? '#A9322A' : i === hiIdx ? '#23406A' : i === loIdx ? '#C47A70' : '#CDBFA9';
      s += '<rect x="' + x.toFixed(1) + '" y="' + (150 - h(v)).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h(v).toFixed(1) + '" rx="4" fill="' + col + '"/>';
      if (i === hiIdx || i === nowIdx || i === loIdx) s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (150 - h(v) - 6).toFixed(1) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="' + col + '">' + (i === nowIdx ? esc(U('now')) : v) + '</text>';
      s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="168" text-anchor="middle" font-size="12" font-family="Noto Serif KR,serif" fill="#221C16">' + esc(labels[i]) + '</text>';
      if (sub) s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="186" text-anchor="middle" font-size="10.5" fill="#6E6458">' + esc(sub[i]) + '</text>'; });
    return s + '</svg>';
  }
  function donut(cnt) {
    var tot = cnt.reduce(function (a, b) { return a + b; }, 0), C = 2 * Math.PI * 52, off = 0, cols = ['#2F6B3F', '#A9322A', '#B8862F', '#8A8D91', '#23406A'];
    var s = '<svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="' + cnt.map(function (v, i) { return D().elName[i] + ' ' + v; }).join(', ') + '"><circle cx="70" cy="70" r="52" fill="none" stroke="#EDE4D6" stroke-width="20"/>';
    cnt.forEach(function (v, i) { if (!v) return; var len = C * v / tot; s += '<circle cx="70" cy="70" r="52" fill="none" stroke="' + cols[i] + '" stroke-width="20" stroke-dasharray="' + len.toFixed(1) + ' ' + (C - len).toFixed(1) + '" stroke-dashoffset="' + (-off).toFixed(1) + '" transform="rotate(-90 70 70)"/>'; off += len; });
    return s + '<text x="70" y="66" text-anchor="middle" font-family="Noto Serif KR,serif" font-weight="900" font-size="20" fill="#221C16">五行</text><text x="70" y="86" text-anchor="middle" font-size="11" fill="#6E6458">' + tot + '</text></svg>';
  }

  /* ── 글 엮기 ── */
  function dailyText(p, c, r) {
    var d = D(), me = d.me[c.dayMaster], ten = r.tenS, b = band(r.scores.total), nm = { name: esc(p.name) };
    var p1 = fill(d.p1, { name: esc(p.name), meName: me.name, meImg: me.img, meLine: fill(me.line, nm), day: d.day[r.pillar.s], ten: d.tenImg[ten] });
    var p2 = fill(d.story[ten][b], nm);
    var p3 = fill(d.branch[r.chung ? 'chung' : r.hap ? 'hap' : r.dohwa ? 'dohwa' : 'plain'], nm);
    var h = KF.hash(r.date.y + '' + r.date.m + r.date.d);
    return { head: d.head[ten][b], paras: [p1, p2, p3], doo: d.doo[ten][h % 3], dont: d.dont[ten][(h >> 3) % 3] };
  }
  function areaText(r) {
    var d = D(); return ['money', 'work', 'people', 'love', 'health'].map(function (a) {
      var v = r.scores[a], ten = a === 'work' || a === 'love' || a === 'people' ? r.tenS : r.tenS;
      return { a: a, v: v, t: d.area[a][ten] + ' ' + d.areaBand[a][band(v)] };
    });
  }

  /* ── 화면 ── */
  var app = document.getElementById('app');
  function tab(on) {
    var t = [['home', '今', 'tabToday'], ['saju', '命', 'tabSaju'], ['tojeong', '卦', 'tabTojeong'], ['me', '我', 'tabMe']];
    return '<div class="tab"><nav aria-label="menu">' + t.map(function (x) { return '<a href="#' + x[0] + '" class="' + (on === x[0] ? 'on' : '') + '"><i>' + x[1] + '</i>' + esc(U(x[2])) + '</a>'; }).join('') + '</nav></div>';
  }
  function bar(title, sub, back) {
    return '<div class="bar"><a class="back" href="#' + (back || 'home') + '" aria-label="back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a><div class="bt"><div class="t">' + esc(title) + '</div>' + (sub ? '<div class="s">' + sub + '</div>' : '') + '</div>' + acts(true) + '</div>';
  }
  /* 어느 화면에서든: 밤/낮 · 언어 · 구매 */
  var GLOBE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>';
  function themeIcon() {
    var t = S.theme || 'auto', o = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">';
    if (t === 'dark') return o + '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
    if (t === 'light') return o + '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    return o + '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/></svg>';
  }
  function acts(compact) {
    var h = (location.hash || '').slice(1).split('?')[0];
    return '<div class="acts"><button class="ib" data-theme-toggle="1" aria-label="' + esc(U('themeL')) + '" title="' + esc(U('themeL') + ' · ' + U('themeN')[['auto', 'light', 'dark'].indexOf(S.theme || 'auto')]) + '">' + themeIcon() + '</button>' +
      (compact ? '<button class="ib" data-langsheet="1" aria-haspopup="dialog" aria-label="' + esc(U('langTitle')) + '">' + GLOBE + '</button>' : langPill()) +
      (isSub() || h === 'pay' ? '' : '<a class="buy" href="#pay">' + esc(U('shop')) + '</a>') + '</div>';
  }
  function applyTheme() {
    var t = S.theme || 'auto', r = document.documentElement;
    if (t === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
    var dark = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    var m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', dark ? '#14110E' : '#F4EEE3');
  }
  function dateLine(t) { return esc(U('dateFmt', { y: t.y, m: t.m, d: t.d, wd: U('wdFull')[t.wd] })); }
  function elOf(i, stem) { return EL[stem ? KF.STEM_EL[i] : KF.BR_EL[i]]; }
  function miniChars(c) {
    var o = '', P = c.pillars;
    ['hour', 'day', 'month', 'year'].forEach(function (k) { var p = P[k];
      o += '<div style="display:flex;flex-direction:column;gap:3px">' + (p ? '<span class="ch ' + elOf(p.s, 1) + '" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;font:700 17px var(--serif);border-radius:6px">' + KF.STEMS[p.s] + '</span><span class="ch ' + elOf(p.b) + '" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;font:700 17px var(--serif);border-radius:6px">' + KF.BRANCHES[p.b] + '</span>' : '<span class="ch none" style="width:30px;height:64px;display:flex;align-items:center;justify-content:center;border-radius:6px">?</span>') + '</div>'; });
    return '<div class="mini">' + o + '</div>';
  }

  /* 웹에서만: 앱 받기 (앱 안에서는 보이지 않음) */
  var STORES = [['Google Play', 'https://play.google.com/store/apps/details?id=com.weaveapp.kfortune']];
  function storeRow() {
    if (IN_APP || !STORES.length) return '';
    return '<div class="card" style="display:flex;flex-wrap:wrap;align-items:center;gap:10px"><b style="font-size:14px;flex:1;min-width:140px">📱 ' + esc(U('getApp')) + '</b>' +
      STORES.map(function (x) { return '<a class="buy" href="' + x[1] + '" target="_blank" rel="noopener">' + esc(x[0]) + '</a>'; }).join('') + '</div>';
  }
  function vHome() {
    var p = prof(); if (!p) return vStart();
    var c = chartOf(p), t = todayYMD(), r = KF.daily(c, t.y, t.m, t.d), tx = dailyText(p, c, r), d = D();
    var ty = tojYear();
    var g5 = ['money', 'work', 'people', 'love', 'health'].map(function (k) { return '<div><small>' + esc(d.areaName[k]) + '</small><b>' + r.scores[k] + '</b></div>'; }).join('');
    return '<div class="top"><div class="brand"><div class="seal">運</div><b>' + esc(U('app')) + '</b></div>' + acts(false) + '</div>' +
      '<div class="wrap"><div style="padding-top:8px"><div class="small">' + dateLine(t) + ' · <span class="serif" style="color:var(--ink)">' + r.pillar.txt + '</span>' + esc(U('dayOf')) + '</div>' +
      '<h1>' + esc(U('hello', { name: p.name })) + '<br>' + esc(tx.head) + '</h1></div>' +
      '<section class="dark" style="display:flex;flex-direction:column;gap:14px"><div class="row" style="gap:16px">' + ring(r.scores.total) +
      '<div style="flex:1"><div class="mut" style="font-size:12px">' + esc(U('oneLine')) + '</div><div class="lead" style="font-size:16px">' + esc(cap(d.tenImg[r.tenS])) + '</div></div></div>' +
      '<div class="grid5">' + g5 + '</div><a class="btn gold" href="#today">' + esc(U('todayMore')) + '</a></section>' +
      '<section class="card row" style="padding:12px 14px"><div style="min-width:64px"><div class="small">' + esc(U('mySaju')) + '</div><b style="font-size:13px">' + esc(U('dm')) + ' ' + KF.STEMS[c.dayMaster] + ' ' + d.elName[c.dayMasterEl] + '</b></div><div style="flex:1;display:flex;justify-content:flex-end">' + miniChars(c) + '</div></section>' +
      '<section class="tiles">' +
      tile('#saju', '四柱', U('mSaju'), U('mSajuS')) + tile('#tojeong', '土亭', U('mToj', { y: ty }), U('mTojS', { gz: KF.pillar(ty - 4).ko })) +
      tile('#week', '七日', U('mWeek'), '', 1) + tile('#year', '歲運', U('mYear'), U('mYearS'), 1) +
      tile('#gung', '宮合', U('mGung'), U('mGungS2')) + tile('#about', '文', U('mAbout'), U('mAboutS'), 2) +
      '</section>' +
      '<div class="two"' + (lottoOn() ? '' : ' style="grid-template-columns:1fr"') + '>' + xcard('#move', '移', X('tMove'), X('tMoveS')) + (lottoOn() ? xcard('#lotto', '福', X('tLotto'), X('tLottoS')) : '') + '</div>' +
      '<a class="card row" href="#ask" style="gap:14px;color:var(--ink);border:2px solid var(--red)"><span class="serif" style="font-weight:900;font-size:30px;color:var(--red)">問</span><span style="flex:1"><b style="font-size:15px">' + esc(U('mAsk')) + '</b><br><span class="small">' + esc(U('mAskS')) + '</span></span><span style="color:var(--red);font-weight:700">›</span></a>' + storeRow() + '<p class="note">' + esc(d.note) + '</p></div>' + tab('home');
  }
  function xcard(h, han, b, s) { return '<a class="card row" href="' + h + '" style="gap:10px;color:var(--ink);padding:12px"><span class="serif" style="font-weight:900;font-size:26px;color:var(--wood)">' + han + '</span><span style="flex:1;min-width:0"><b style="font-size:14px">' + esc(b) + '</b><br><span class="small">' + esc(s) + '</span></span></a>'; }
  function tile(h, han, b, s, col) { return '<a class="tile" href="' + h + '"><span class="h"' + (col === 1 ? ' style="color:var(--indigoT)"' : col === 2 ? ' style="color:var(--mute)"' : '') + '>' + han + '</span><b>' + esc(b) + '</b><small>' + esc(s) + '</small></a>'; }
  function tojYear() { var t = todayYMD(); return t.m >= 11 ? t.y + 1 : t.y; }   // 11월부터 새해 것

  function vToday() {
    var p = prof(), c = chartOf(p), t = todayYMD(), r = KF.daily(c, t.y, t.m, t.d), tx = dailyText(p, c, r), d = D(), L = r.lucky;
    var bestSlot = r.slots.reduce(function (a, s, i) { return s.score > r.slots[a].score ? i : a; }, 0);
    var slots = r.slots.map(function (s, i) { return '<div class="' + (i === bestSlot ? 'best' : '') + '"><span class="mut"' + (i === bestSlot ? ' style="color:var(--red);font-weight:700"' : '') + '>' + esc(d.slotName[i]) + (i === bestSlot ? ' · ' + esc(U('bestSlot')) : '') + '</span><b>' + esc(d.slot[s.ten]) + '</b><span class="mut">' + s.score + '</span></div>'; }).join('');
    var colorHex = { green: '#2F6B3F', teal: '#2C7A78', red: '#A9322A', purple: '#6B3F7A', yellow: '#D8B23A', beige: '#D9C6A3', white: '#FFFFFF', silver: '#B9BCC0', navy: '#1E2E4A', black: '#16130F' }[L.color];
    var areas = areaText(r).map(function (x) { return '<p style="margin:0 0 10px;font-size:14.5px;line-height:1.75"><b>' + esc(d.areaName[x.a]) + ' ' + x.v + '</b> · ' + esc(x.t) + '</p>'; }).join('');
    var locked = !subOn(p);
    return bar(U('todayTitle'), dateLine(t) + ' · <span class="serif">' + r.pillar.txt + '</span> · ' + esc(p.name)) +
      '<div class="wrap" style="padding-top:8px"><section class="card" style="display:flex;flex-direction:column;align-items:center"><div><span class="serif" style="font-weight:900;font-size:46px;color:var(--red)">' + r.scores.total + '</span> <span class="mut">/ 100 ' + esc(U('total')) + '</span></div><div class="svgwrap">' + radar(r.scores) + '</div></section>' +
      '<section class="dark"><div class="mut" style="font-size:12px">' + esc(U('oneLine')) + '</div><div class="lead">' + esc(tx.head) + '</div></section>' +
      '<article class="story"><h2 style="margin-bottom:10px">' + esc(U('storyTitle')) + '</h2>' + tx.paras.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</article>' +
      '<section><h2 style="margin-bottom:8px;font-size:16px">' + esc(U('timeTitle')) + '</h2><div class="three">' + slots + '</div></section>' +
      '<section class="card" style="display:flex;flex-direction:column;gap:12px"><h2 style="font-size:17px">' + esc(U('lucky')) + '</h2><div class="three" style="text-align:center">' +
      '<div style="align-items:center;border:0;background:none"><span style="width:40px;height:40px;border-radius:20px;background:' + colorHex + ';border:1px solid var(--line2)"></span><span class="mut">' + esc(U('color')) + '</span><b>' + esc(d.colorName[L.color]) + '</b></div>' +
      '<div style="align-items:center;border:0;background:none"><span class="serif" style="font-weight:900;font-size:26px;color:var(--indigoT);height:40px;display:flex;align-items:center">' + L.nums.join(' · ') + '</span><span class="mut">' + esc(U('number')) + '</span><b>' + esc(d.elName[L.el]) + '</b></div>' +
      '<div style="align-items:center;border:0;background:none"><span class="serif" style="font-weight:900;font-size:26px;color:var(--indigoT);height:40px;display:flex;align-items:center">' + { E: '東', S: '南', C: '中', W: '西', N: '北' }[L.dir] + '</span><span class="mut">' + esc(U('direction')) + '</span><b>' + esc(d.dirName[L.dir]) + '</b></div></div>' +
      '<div style="font-size:14px;line-height:1.7"><b style="color:var(--wood)">' + esc(U('doIt')) + '</b> · ' + esc(tx.doo) + '<br><b style="color:var(--red)">' + esc(U('avoid')) + '</b> · ' + esc(tx.dont) + '</div>' +
      (IN_APP ? '' : '<a href="https://mylottolab.github.io/my-lotto-lab/main_page.html" target="_blank" rel="noopener" style="font-size:13px">' + esc(U('lotto')) + '</a>') + '</section>' +
      '<section class="card' + (locked ? ' lock' : '') + '"><h2 style="font-size:17px;margin-bottom:10px">' + esc(U('areasTitle')) + '</h2><div class="' + (locked ? 'blur' : '') + '" ' + (locked ? 'aria-hidden="true"' : '') + '>' + areas + '</div>' +
      (locked ? '<div class="over">' + esc(U('areasLock')) + payBtn(p, U('subscribeAll')) + '</div><div style="height:60px"></div>' : '') + '</section>' +
      '<p class="note">' + esc(d.note) + '</p></div>' + tab('home');
  }

  function vWeek() {
    var p = prof(), c = chartOf(p), t = todayYMD(), w = KF.weekly(c, t.y, t.m, t.d), d = D();
    var vals = w.map(function (x) { return x.scores.total; }), hi = vals.indexOf(Math.max.apply(null, vals)), lo = vals.indexOf(Math.min.apply(null, vals));
    var story = Math.max.apply(null, vals) - Math.min.apply(null, vals) < 8 ? d.week.flat :
      fill(d.week.best, { wd: d.wd[hi], head: d.head[w[hi].tenS][band(vals[hi])] }) + ' ' + fill(d.week.worst, { wd: d.wd[lo], head: d.head[w[lo].tenS][band(vals[lo])] });
    var a = w[0].date, z = w[6].date, locked = !subOn(p);
    var items = w.map(function (x, i) { var free = i < 5 || !locked, cls = i === hi ? 'item hl' : i === lo ? 'item low' : 'item';
      return free ? '<div class="' + cls + '"><div class="row" style="align-items:flex-start"><b style="min-width:52px' + (i === hi ? ';color:var(--red)' : '') + '">' + esc(d.wd[i]) + ' ' + vals[i] + '</b><span>' + esc(d.head[x.tenS][band(vals[i])]) + '</span></div></div>' : ''; }).join('');
    return bar(U('weekTitle'), a.m + '.' + a.d + ' ~ ' + z.m + '.' + z.d + ' · ' + esc(p.name)) +
      '<div class="wrap" style="padding-top:8px"><section class="dark"><div class="mut" style="font-size:12px">' + esc(U('weekStory')) + '</div><p style="margin:8px 0 0;font-size:14.5px;line-height:1.8">' + esc(story) + '</p></section>' +
      '<section class="card svgwrap" style="padding:14px 6px 6px">' + lineChart(vals, d.wd, w.map(function (x) { return x.pillar.txt; }), hi) + '</section>' +
      '<section class="list">' + items + (locked ? payBtn(p, U('weekMore'), 'btn line') : '') + '</section></div>' + tab('home');
  }

  function vSaju() {
    var p = prof(), c = chartOf(p), d = D(), sj = TX().saju || (window.KF_TXT.ko || {}).saju, P = c.pillars, H = U('pillarsH');
    var cells = '', keys = ['hour', 'day', 'month', 'year'];
    keys.forEach(function (k, i) { cells += '<div class="small" style="' + (k === 'day' ? 'color:var(--red);font-weight:700' : '') + '">' + esc(H[i]) + '</div>'; });
    keys.forEach(function (k) { var x = P[k]; cells += x ? '<div class="ch ' + elOf(x.s, 1) + (k === 'day' ? ' me' : '') + '"><div class="g">' + KF.STEMS[x.s] + '</div><small>' + U('stemRead')[x.s] + ' · ' + d.elName[KF.STEM_EL[x.s]] + (k === 'day' ? '' : ' · ' + U('ten')[KF.tenGod(c.dayMaster, x.s)]) + '</small></div>' : '<div class="ch none"><div class="g">?</div><small>—</small></div>'; });
    keys.forEach(function (k) { var x = P[k]; cells += x ? '<div class="ch ' + elOf(x.b) + '"><div class="g">' + KF.BRANCHES[x.b] + '</div><small>' + U('branchRead')[x.b] + ' · ' + d.elName[KF.BR_EL[x.b]] + ' · ' + U('ten')[KF.tenGod(c.dayMaster, KF.HIDDEN[x.b][KF.HIDDEN[x.b].length - 1])] + '</small></div>' : '<div class="ch none"><div class="g">?</div><small>—</small></div>'; });
    var legend = c.elements.map(function (v, i) { var col = ['var(--wood)', 'var(--fire)', 'var(--earth)', 'var(--metal)', 'var(--water)'][i]; return '<div style="display:flex;justify-content:space-between"><span><span style="color:' + col + '">■</span> ' + esc(d.elName[i]) + '</span><b>' + v + (v ? '' : ' · ' + esc(U('none'))) + '</b></div>'; }).join('');
    var now = new Date().getFullYear() - c.solar.y, du = c.daeun.list, ni = -1;
    du.forEach(function (x, i) { if (now >= x.age) ni = i; });
    var paras = sajuStory(p, c, sj), locked = !hasSaju(p);
    return bar(U('sajuTitle'), esc(p.name) + ' · ' + c.solar.y + '.' + c.solar.m + '.' + c.solar.d + (p.hh != null ? ' ' + p.hh + ':' + ('0' + (p.mm || 0)).slice(-2) : '')) +
      '<div class="wrap" style="padding-top:8px"><section class="card"><div class="chars">' + cells + '</div></section>' +
      '<section class="card row" style="gap:14px">' + donut(c.elements) + '<div style="flex:1;display:flex;flex-direction:column;gap:6px;font-size:13.5px">' + legend + '</div></section>' +
      '<article class="story"><h2 style="margin-bottom:10px">' + esc(paras.title) + '</h2>' + paras.free.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</article>' +
      '<section class="card svgwrap" style="flex-direction:column;padding:14px 6px 10px"><h2 style="font-size:16px;margin:0 8px 6px">' + esc(U('daeunTitle')) + '</h2>' +
      bars(du.slice(0, 8).map(function (x) { return x.score; }), du.slice(0, 8).map(function (x) { return x.pillar.txt; }), du.slice(0, 8).map(function (x) { return U('age', { n: x.age }); }), -1, -1, ni) + '</section>' +
      (locked ? '<section class="card" style="display:flex;flex-direction:column;gap:10px"><h2 style="font-size:17px">' + esc(U('deeper')) + '</h2>' + paras.lockedTitles.map(function (x) { return '<div class="item">' + esc(x) + '</div>'; }).join('') +
        payBtn(p, U('openSaju')) + '<div class="small" style="text-align:center">' + esc(U('openSajuS')) + '</div></section>'
        : '<article class="story">' + paras.paid.map(function (x) { return x.h ? '<h2 style="margin:6px 0 10px;font-size:17px">' + esc(x.h) + '</h2>' : '<p>' + x + '</p>'; }).join('') + '</article>') +
      '</div>' + tab('saju');
  }
  function sajuStory(p, c, sj) {
    var d = D(), me = d.me[c.dayMaster], nm = { name: esc(p.name) };
    if (!sj) return { title: me.name, free: [fill(d.p1.split(/(?<=[.。])\s/)[0], { name: esc(p.name), meName: me.name, meImg: me.img })], paid: [], lockedTitles: [] };
    return window.KF_SAJU_COMPOSE ? window.KF_SAJU_COMPOSE(p, c, sj, d, fill, esc) : { title: me.name, free: [], paid: [], lockedTitles: [] };
  }

  function vYear() {
    var p = prof(), c = chartOf(p), y = new Date().getFullYear(), r = KF.yearly(c, y), d = D(), sj = TX().saju || (window.KF_TXT.ko || {}).saju;
    var txt = sj && sj.year ? sj.year[r.tenS] : d.story[r.tenS][band(r.scores.total)];
    return bar(U('mYear') + ' · ' + y, '<span class="serif">' + r.pillar.txt + '</span> · ' + esc(p.name)) +
      '<div class="wrap" style="padding-top:8px"><section class="card" style="display:flex;flex-direction:column;align-items:center"><div><span class="serif" style="font-weight:900;font-size:46px;color:var(--red)">' + r.scores.total + '</span></div><div class="svgwrap">' + radar(r.scores) + '</div></section>' +
      '<article class="story"><p>' + fill(Array.isArray(txt) ? txt.join('</p><p>') : txt, { name: esc(p.name) }) + '</p></article></div>' + tab('saju');
  }

  function vTojeong(lastYear) {
    var T0 = tojYear(), qy = Number((/(?:^|&)y=(\d{4})/.exec(R.q || '') || [])[1]);
    var y = lastYear === true ? T0 - 1 : (qy >= T0 && qy <= T0 + TOJ_AHEAD ? qy : T0);
    var p = prof(), c = chartOf(p), bl = KF.solarToLunar(c.solar.y, c.solar.m, c.solar.d);
    var g = KF.tojeong(bl, y), tj = (TX().toj || (window.KF_TXT.ko || {}).toj || {})[g.code], mn = U('monthNames');
    var isLast = lastYear === true, locked = !isLast && !hasToj(p, y);
    var ms = tj && tj.m ? tj.m.map(function (x) { return x.s; }) : monthScores(c, y);
    var hi = ms.indexOf(Math.max.apply(null, ms)), lo = ms.indexOf(Math.min.apply(null, ms));
    // 토정비결의 달은 음력 — 달마다 양력 날짜를 붙이고, 지금 달에 표시(설 전 양력 1월은 아직 지난해 동짓달 · 섣달)
    var tl = todayYMD(), lt = null; try { lt = KF.solarToLunar(tl.y, tl.m, tl.d); } catch (e) {}
    var md = function (o) { return X('md', { m: o.m, d: o.d }); }, starts = [];
    try { for (var k = 1; k <= 12; k++) starts.push(KF.lunarToSolar(y, k, 1, false)); starts.push(KF.lunarToSolar(y + 1, 1, 1, false)); } catch (e) { starts = []; }
    var endOf = function (i) { var a = starts[i + 1], dt = new Date(Date.UTC(a.y, a.m - 1, a.d) - 864e5); return { m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }; };
    var nowI = lt && lt.y === y ? lt.m - 1 : -1;
    var seolNote = (!isLast && lt && lt.y === y - 1 && y === T0) ? '<a class="card" href="#tojeong-last" style="display:block;border:2px solid var(--gold);color:var(--ink);font-size:14px;line-height:1.7">' +
      esc(X('tojBefore', { y: y, py: y - 1, mon: mn[lt.m - 1], seol: starts.length ? md(starts[0]) : '' })) + ' <b style="color:var(--wood)">' + esc(X('tojBeforeGo', { py: y - 1, mon: mn[lt.m - 1] })) + ' →</b></a>' : '';
    var months = mn.map(function (n, i) { var free = i < 3 || !locked; if (!free) return '';
      return '<div class="item' + (i === nowI ? ' tnow' : '') + '"' + (i === nowI ? ' id="tnow"' : '') + '><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span><b class="serif">' + esc(n) + '</b>' + (i === nowI ? ' <span class="tnowb">' + esc(X('tojNow')) + '</span>' : '') +
        (starts.length ? ' <span class="small">' + esc(X('tojRange', { a: md(starts[i]), b: md(endOf(i)) })) + '</span>' : '') + '</span><span class="mut" style="font-size:13px">' + ms[i] + '</span></div>' + (tj && tj.m ? '<div style="margin-top:4px;font-size:14px;line-height:1.7">' + esc(tj.m[i].t) + '</div>' : '') + '</div>'; }).join('');
    var digit = function (v, l) { return '<span style="width:42px;height:54px;border:1px solid #6E6458;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 24px var(--serif)">' + v + '<small style="font:400 9px var(--sans);color:#B9AE9E">' + esc(l) + '</small></span>'; };
    return bar(U('tojTitle', { y: y, gz: g.yearPillar.ko }), esc(p.name) + ' · ' + esc(U('tojSub'))) +
      '<div class="wrap" style="padding-top:8px">' + (isLast ? '' : yearPicker(T0, y)) + seolNote + '<section class="ink" style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="display:flex;gap:8px">' + digit(g.upper, U('up')) + digit(g.middle, U('mid')) + digit(g.lower, U('low')) + '</div>' +
      '<div style="font-size:12px;color:#B9AE9E">' + esc(U('gwae', { code: (g.upper - 1) * 18 + (g.middle - 1) * 3 + g.lower, raw: g.code })) + '</div>' +
      (tj ? '<div class="serif" style="font-weight:900;font-size:28px;letter-spacing:5px;line-height:1.5;color:var(--gold)">' + esc(tj.h[0]) + '<br>' + esc(tj.h[1]) + '</div><div style="font-size:14px;line-height:1.6;color:#E6DED1">' + esc(tj.hk) + '</div>' : '<div style="color:#B9AE9E">' + esc(U('soonOpen')) + '</div>') + '</section>' +
      (tj ? '<article class="story"><h2 style="margin-bottom:10px">' + esc(U('tojYear')) + '</h2>' + tj.y.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</article>' : '') +
      '<section class="card svgwrap" style="flex-direction:column;padding:14px 6px 10px"><h2 style="font-size:16px;margin:0 8px 6px">' + esc(U('tojMonths')) + '</h2>' + bars(ms, U('monthShort'), null, hi, lo, -1) + '</section>' +
      '<section class="list">' + months + (locked ? (y === T0 ? payBtn(p, U('tojMore')) : '<button class="btn" data-buytoj="' + y + '">' + esc(U('tojBuyY', { y: y })) + '</button><div class="small" style="text-align:center">' + esc(U('tojFutureNote')) + '</div>') : '') +
      (isLast ? '' : '<a class="item" href="#tojeong-last" style="display:flex;justify-content:space-between;align-items:center;color:var(--ink)"><span><b>' + esc(U('tojLast', { y: T0 - 1 })) + '</b></span><b style="color:var(--wood)">' + esc(U('free')) + '</b></a>') + '</section>' +
      '<section class="item" style="background:var(--soft);font-size:12.5px;line-height:1.7">' + esc(U('tojAbout')) + '</section></div>' + tab('tojeong');
  }
  var TOJ_AHEAD = 9;   // 올해 + 앞으로 9년까지 볼 수 있음(앞날의 해는 그해 것을 따로 결제)
  function yearPicker(T0, y) {
    var o = '';
    for (var k = 0; k <= TOJ_AHEAD; k++) { var yy = T0 + k; o += '<a class="yr' + (yy === y ? ' on' : '') + '" href="#tojeong' + (k ? '?y=' + yy : '') + '"' + (yy === y ? ' aria-current="true"' : '') + '>' + yy + '</a>'; }
    return '<div class="small" style="margin-bottom:-6px">' + esc(U('tojPick')) + '</div><nav class="yrs" aria-label="' + esc(U('tojPick')) + '">' + o + '</nav>';
  }
  function monthScores(c, y) { // 음력 달마다 월건 간지로 점수
    var tp = KF.pillar(y - 4), out = [];
    for (var i = 0; i < 12; i++) { var st = ((tp.s % 5) * 2 + 2 + i) % 10, br = (i + 2) % 12, idx = 0; for (var k = 0; k < 60; k++) if (k % 10 === st && k % 12 === br) idx = k; out.push(KF.periodScore(c, KF.pillar(idx))); }
    return out;
  }


  /* ── 궁합 ── */
  var G = { type: 'love', other: null };
  function G_() { return TX().gung || window.KF_TXT.ko.gung; }
  function vGung() {
    var p = prof(), g = G_(), others = S.profiles.filter(function (x) { return x.id !== p.id; });
    if (!G.other || !others.some(function (x) { return x.id === G.other; })) G.other = others.length ? others[others.length - 1].id : null;
    var types = '<div class="seg" role="group" style="flex-wrap:wrap">' + g.types.map(function (t) { return '<button type="button" data-gt="' + t[0] + '" class="' + (G.type === t[0] ? 'on' : '') + '">' + esc(t[1]) + '</button>'; }).join('') + '</div>';
    var pickO = others.length ? '<div class="two">' + others.map(function (x) { return '<button class="choice' + (G.other === x.id ? ' on' : '') + '" data-go="' + x.id + '">' + esc(x.name) + '</button>'; }).join('') + '</div>' : '';
    var head = bar(g.title, esc(p.name)) + '<div class="wrap" style="padding-top:8px"><section class="card" style="display:flex;flex-direction:column;gap:10px"><b>' + esc(g.pick) + '</b>' + types + pickO + '<a class="btn ghost" href="#start?gung">' + esc(g.addOther) + '</a></section>';
    if (!G.other) return head + '</div>' + tab('home');
    var o = S.profiles.filter(function (x) { return x.id === G.other; })[0], A = chartOf(p), B = chartOf(o), r = KF.gunghap(A, B), d = D();
    var sc = r.scores, keys = ['heart', 'life', 'money', 'future'];
    var hbars = keys.map(function (k) { return '<div class="row" style="gap:10px;font-size:13.5px"><span style="min-width:40px">' + esc(g.area[k]) + '</span><span style="flex:1;height:12px;background:var(--soft);border-radius:6px;overflow:hidden"><span style="display:block;height:100%;width:' + sc[k] + '%;background:' + (sc[k] >= 80 ? 'var(--red)' : 'var(--indigo)') + '"></span></span><b style="min-width:26px;text-align:right">' + sc[k] + '</b></div>'; }).join('');
    var ea = A.dayMasterEl, eb = B.dayMasterEl, gen = '';
    if (r.rel === 1) gen = g.gen[eb]; else if (r.rel === 4) gen = g.gen[ea]; else if (r.rel === 2) gen = g.ctl[eb]; else if (r.rel === 3) gen = g.ctl[ea];
    var nm = { a: esc(p.name), b: esc(o.name), ia: d.me[A.dayMaster].img, ib: d.me[B.dayMaster].img, gen: gen };
    var paras = [fill(g.rel[r.rel], nm)];
    if (r.stemHap) paras.push(g.stemHap);
    paras.push(g.dayRel[r.dayRel] + (g.yearRel[r.yearRel] ? ' ' + g.yearRel[r.yearRel] : ''));
    for (var e = 0; e < 5; e++) { if (!A.elements[e] && B.elements[e]) { paras.push(fill(g.comp[0], { a: esc(p.name), b: esc(o.name), e: d.elName[e] })); break; } }
    for (var e2 = 0; e2 < 5; e2++) { if (!A.elements[e2] && !B.elements[e2]) { paras.push(fill(g.comp[1], { e: d.elName[e2], eh: g.eHint[e2] })); break; } }
    paras.push(g.money[band(sc.money)]); paras.push(g.end[G.type][band(sc.total)]);
    var locked = !subOn(p);
    return head + '<section class="card" style="display:flex;flex-direction:column;gap:12px;align-items:stretch"><div class="row" style="justify-content:space-around;text-align:center">' +
      '<div><b>' + esc(p.name) + '</b><div style="margin-top:6px">' + miniChars(A) + '</div></div><div class="serif" style="font-weight:900;font-size:44px;color:var(--red)">' + sc.total + '</div><div><b>' + esc(o.name) + '</b><div style="margin-top:6px">' + miniChars(B) + '</div></div></div>' + hbars + '</section>' +
      '<article class="story' + (locked ? ' lock' : '') + '"><p>' + paras[0] + '</p>' + (locked ? '<div class="blur" aria-hidden="true">' + paras.slice(1, 3).map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</div><div class="over">' + esc(U('gungLock')) + payBtn(p, U('subscribeAll')) + '</div><div style="height:40px"></div>'
        : paras.slice(1).map(function (x) { return '<p>' + x + '</p>'; }).join('')) + '</article><p class="note">' + esc(g.note) + '</p></div>' + tab('home');
  }

  /* ── 물어보세요 ── */
  var Q = { kind: null, who: null, date: '', shown: false };
  function A_() { return TX().ask || window.KF_TXT.ko.ask; }
  function vAsk() {
    var a = A_(), p = prof();
    if (!Q.kind) {
      return bar(a.title) + '<div class="wrap" style="padding-top:8px"><p class="small" style="margin:0;font-size:13px">' + esc(a.lead) + '</p>' +
        a.groups.map(function (gr) { return '<section class="card" style="display:flex;flex-direction:column;gap:8px"><b style="color:var(--red)">' + esc(gr[1]) + '</b>' +
          gr[2].map(function (q) { return '<button class="item" data-q="' + q[0] + '" style="text-align:left;color:var(--ink);font:500 15px var(--sans)">' + esc(q[1]) + '</button>'; }).join('') + '</section>'; }).join('') +
        '<p class="note">' + esc(a.note) + '</p></div>' + tab('home');
    }
    var qtext = ''; a.groups.forEach(function (gr) { gr[2].forEach(function (q) { if (q[0] === Q.kind) qtext = q[1]; }); });
    if (!Q.who || !S.profiles.some(function (x) { return x.id === Q.who; })) Q.who = p.id;
    var whoBtns = '<div class="two">' + S.profiles.map(function (x) { return '<button class="choice' + (Q.who === x.id ? ' on' : '') + '" data-qw="' + x.id + '">' + esc(x.name) + '</button>'; }).join('') + '</div>';
    var form = '<section class="card" style="display:flex;flex-direction:column;gap:10px"><h2 style="font-size:18px">' + esc(qtext) + '</h2><b style="font-size:13px">' + esc(a.who) + '</b>' + whoBtns +
      (Q.kind === 'exam' ? '<label class="f">' + esc(a.examDate) + '<input class="in" type="date" id="qd" value="' + esc(Q.date) + '"></label>' : '') +
      '<button class="btn" data-qgo="1">' + esc(a.ask) + '</button></section>';
    var out = '';
    if (Q.shown) {
      var who = S.profiles.filter(function (x) { return x.id === Q.who; })[0], c = chartOf(who), d = D();
      var opt = {}; if (Q.kind === 'exam' && /^\d{4}-\d{2}-\d{2}$/.test(Q.date)) { var t = Q.date.split('-').map(Number); opt.date = { y: t[0], m: t[1], d: t[2] }; }
      var r = KF.ask(Q.kind, c, opt), H = Q.kind === 'health', V = H ? a.health : a;
      var verdictTxt = H ? a.health.verdict[r.verdict] : a.verdict[r.verdict], mark = H ? a.health.mark[r.verdict] : a.mark[r.verdict];
      var body = [];
      if (H) { body.push(a.health.lead); body.push(fill(a.health.low, r.best)); body.push((TX().saju || window.KF_TXT.ko.saju).health[r.why[0]]); body.push(a.health.note); }
      else { body.push(a.ans[Q.kind][r.verdict]); body.push(fill(a.why, { who: esc(who.name), ten: d.tenImg[r.why[0]] }) + ' ' + (a.why2[r.why[1]] || ''));
        body.push(r.best.day ? fill(a.bestDay, r.best.day) : fill(a.best, r.best)); }
      var locked = !subOn(who);
      out = '<section class="dark" style="text-align:center;display:flex;flex-direction:column;gap:6px;align-items:center"><div class="serif" style="font-size:56px;font-weight:900;line-height:1;color:var(--gold)">' + mark + '</div><div class="lead" style="margin:0">' + esc(verdictTxt) + '</div><div class="mut" style="font-size:12px">' + esc(who.name) + ' · ' + r.score + '</div></section>' +
        '<article class="story' + (locked ? ' lock' : '') + '"><p>' + body[0] + '</p>' + (locked ? '<div class="blur" aria-hidden="true"><p>' + body.slice(1).join('</p><p>') + '</p></div><div class="over">' + esc(U('askLock')) + payBtn(who, U('subscribeAll')) + '</div><div style="height:30px"></div>' : '<p>' + body.slice(1).join('</p><p>') + '</p>') + '</article>' +
        '<button class="btn ghost" data-qreset="1">' + esc(a.again) + '</button>';
    }
    return bar(a.title, '', 'ask') + '<div class="wrap" style="padding-top:8px">' + form + out + '</div>' + tab('home');
  }
  function vPay() {
    var y = tojYear();
    return '<div class="bar" style="justify-content:space-between"><div class="t" style="padding-left:8px">' + esc(U('payTitle')) + '</div><a class="back" href="#home" aria-label="close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></a></div>' +
      '<div class="wrap" style="padding-top:8px"><section class="dark" style="display:flex;flex-direction:column;gap:12px;position:relative"><span style="position:absolute;top:-10px;right:16px;background:var(--gold);color:#221C16;font-size:12px;font-weight:700;border-radius:12px;padding:4px 10px">' + esc(U('payBest')) + '</span>' +
      '<div class="serif" style="font-weight:700;font-size:22px">' + esc(U('payYear')) + '</div><div><span class="serif" style="font-weight:900;font-size:28px" data-price="sub">—</span> <span class="mut" style="font-size:13px">' + esc(U('payPer')) + '</span></div>' +
      '<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;font-size:14px">' + U('payF').map(function (f) { return '<li style="display:flex;gap:8px"><span style="color:var(--gold)">◆</span>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      '<button class="btn gold" data-buy="sub">' + esc(U('payStart')) + '</button></section>' +
      '<div class="small" style="text-align:center">' + esc(U('payOne')) + '</div><section class="two">' +
      '<button class="tile" data-buy="saju" style="border-color:var(--line2)"><span class="h">四柱</span><b>' + esc(U('paySaju')) + '</b><small>' + esc(U('paySajuS')) + '</small><b data-price="saju">—</b></button>' +
      '<button class="tile" data-buy="toj" style="border-color:var(--line2)"><span class="h">土亭</span><b>' + esc(U('payToj', { y: y })) + '</b><small>' + esc(U('payTojS')) + '</small><b data-price="toj">—</b></button></section>' +
      '<section class="item" style="font-size:12.5px;line-height:1.7">' + esc(U('payNote')) + '</section>' +
      '<div style="display:flex;justify-content:center;gap:18px;font-size:12.5px"><a href="#restore">' + esc(U('restore')) + '</a><a href="terms.html">' + esc(U('terms')) + '</a><a href="privacy.html">' + esc(U('privacyL')) + '</a></div>' +
      '<p class="note">' + esc(U('autoRenew')) + '</p></div>';
  }

  function vAbout() {
    var langs = LANGS.map(function (l) { return l[2] ? '<button class="choice' + (S.lang === l[0] ? ' on' : '') + '" data-lang="' + l[0] + '" lang="' + l[0] + '">' + esc(l[1]) + '</button>' : '<div class="choice" style="border-style:dashed;display:flex;align-items:center;justify-content:center" lang="' + l[0] + '">' + esc(l[1]) + ' · ' + esc(U('soon')) + '</div>'; }).join('');
    var five = ['木', '火', '土', '金', '水'].map(function (h, i) { return '<span style="color:' + ['var(--wood)', 'var(--fire)', 'var(--earth)', 'var(--metal)', 'var(--water)'][i] + '">' + h + '</span>'; }).join('<span class="mut" style="font-size:14px">→</span>');
    return bar(U('aboutTitle')) + '<div class="wrap" style="padding-top:8px"><section class="card" style="display:flex;flex-direction:column;gap:10px"><h2>四柱八字</h2><p style="margin:0;font-size:14.5px;line-height:1.8">' + esc(U('aboutBody')) + '</p>' +
      '<div class="three" style="text-align:center"><div style="background:var(--soft);border:0"><b class="serif" style="font-size:22px">天干</b><span class="mut">' + esc(U('stemsL')) + '</span></div><div style="background:var(--soft);border:0"><b class="serif" style="font-size:22px">地支</b><span class="mut">' + esc(U('branchesL')) + '</span></div><div style="background:var(--soft);border:0"><b class="serif" style="font-size:22px">五行</b><span class="mut">' + esc(U('fiveL')) + '</span></div></div>' +
      '<div class="serif" style="display:flex;justify-content:space-between;align-items:center;font-weight:900;font-size:20px;padding:4px 6px">' + five + '</div><div class="small" style="text-align:center">' + esc(U('cycle')) + '</div></section>' +
      '<section class="card" style="display:flex;flex-direction:column;gap:10px"><h2 style="font-size:17px">' + esc(U('langTitle')) + '</h2><div class="two">' + langs + '</div><div class="small">' + esc(U('hanjaNote')) + '</div></section></div>' + tab('home');
  }

  function vMe() {
    var list = S.profiles.map(function (p) { var c = chartOf(p);
      return '<div class="item' + (p.id === (prof() || {}).id ? ' hl' : '') + '"><div class="row" style="justify-content:space-between"><div><b>' + esc(p.name) + '</b><div class="small">' + c.solar.y + '.' + c.solar.m + '.' + c.solar.d + ' · ' + c.pillars.day.txt + '</div></div>' + miniChars(c) + '</div>' +
        '<div class="row" style="margin-top:8px;gap:8px">' + (subOn(p) ? '<span class="chip" style="background:var(--gold);color:#221C16">' + esc(U('subBadge')) + '</span>' : '') + (p.id === (prof() || {}).id ? '<span class="chip">' + esc(U('current')) + '</span>' : '<button class="pill" data-use="' + p.id + '">' + esc(U('use')) + '</button>') + '<button class="pill" data-del="' + p.id + '">' + esc(U('del')) + '</button></div></div>'; }).join('');
    return bar(U('meTitle')) + '<div class="wrap" style="padding-top:8px">' + (isSub() ? '<div class="item" style="font-size:13.5px;line-height:1.6">' + esc(U('subSeats', { k: people().length, n: peopleMax(), d: S.ent.sub })) + '</div>' : '') + '<section class="list">' + list + '</section><a class="btn ghost" href="#start">' + esc(U('add')) + '</a><button class="btn ghost" data-langsheet="1">🌐 ' + esc(U('langTitle')) + ' · ' + esc(U('lang')) + '</button></div>' + tab('me');
  }

  var F = { cal: 'solar', leap: false, gender: 'F', unknown: false };
  // 언어 바꾸기 — 어느 화면에서든 (외국 친구와 함께 볼 때)
  function langPill() { return '<button class="pill" data-langsheet="1" aria-haspopup="dialog" style="display:flex;align-items:center;gap:6px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>' + esc(U('lang')) + '</button>'; }
  function langSheet() {
    var old = document.getElementById('lsheet'); if (old) old.remove();
    var d = document.createElement('div'); d.className = 'sheet'; d.id = 'lsheet'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px"><b class="serif" style="font-size:18px">' + esc(U('langTitle')) + ' · Language</b><div class="two">' +
      LANGS.map(function (l) { return l[2] ? '<button class="choice' + (S.lang === l[0] ? ' on' : '') + '" data-pick="' + l[0] + '" lang="' + l[0] + '" style="min-height:52px;font-size:16px">' + esc(l[1]) + '</button>'
        : '<div class="choice" style="border-style:dashed;display:flex;align-items:center;justify-content:center;opacity:.6" lang="' + l[0] + '">' + esc(l[1]) + ' · ' + esc(U('soon')) + '</div>'; }).join('') +
      '</div><button class="btn ghost" data-close="1">' + esc(U('close')) + '</button></div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-pick]');
      if (b) { d.remove(); if (b.dataset.pick !== S.lang) setLang(b.dataset.pick); return; }
      if (ev.target === d || ev.target.closest('[data-close]')) d.remove();
    });
  }
  window.addEventListener('hashchange', function () { var o = document.getElementById('lsheet'); if (o) o.remove(); });
  function vWelcome() {
    var langs = LANGS.filter(function (l) { return l[2]; }).map(function (l) { return '<button class="wl' + (S.lang === l[0] ? ' on' : '') + '" data-lang="' + l[0] + '" lang="' + l[0] + '">' + esc(l[1]) + '</button>'; }).join('');
    return '<div class="welcome"><div class="wtop"><img src="icons/icon.svg?v=2" width="112" height="112" alt="" style="border-radius:26px">' +
      '<div class="wname">' + esc(U('app')) + '</div><h1>' + esc(U('wTitle')).replace(/\n/g, '<br>') + '</h1><p>' + esc(U('wLead')) + '</p>' +
      '<ul>' + U('wF').map(function (f) { return '<li><span>◆</span>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="wbot"><div class="wlh">' + esc(U('wLang')) + '</div><div class="wls">' + langs + '</div>' +
      '<a class="btn gold" href="#start" data-seen="1">' + esc(U('wStart')) + '</a></div></div>';
  }
  function vStart() {
    var opts = PLACES.map(function (x, i) { return '<option value="' + i + '">' + esc(S.lang === 'ko' ? x[0] : x[1]) + ' (UTC' + (x[2] >= 0 ? '+' : '') + (x[2] / 60) + ')</option>'; }).join('');
    return '<div class="wrap" style="padding-top:calc(24px + env(safe-area-inset-top,0px));gap:16px">' + (S.profiles.length ? '<a class="back" href="#home" aria-label="back" style="margin-left:-12px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a>' : '<div class="row" style="justify-content:space-between"><div class="brand"><div class="seal">運</div><b>' + esc(U('app')) + '</b></div>' + langPill() + '</div>') +
      '<div><div style="font-size:12px;color:var(--red);font-weight:700;letter-spacing:1px">' + esc(U('startKicker')) + '</div><h1>' + esc(U('startTitle')) + '</h1><p class="small" style="font-size:13px;margin:6px 0 4px">' + esc(U('startLead')) + '</p><p style="margin:0;font-size:12.5px;line-height:1.6;color:var(--red);font-weight:700">' + esc(U('startTag')) + '</p></div>' +
      '<form id="f" style="display:flex;flex-direction:column;gap:14px" novalidate>' +
      '<label class="f">' + esc(U('name')) + '<input class="in" id="nm" maxlength="20" placeholder="' + esc(U('namePh')) + '" required></label>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><div class="row" style="justify-content:space-between"><label for="bd" style="font-size:13px;font-weight:700">' + esc(U('birth')) + '</label><div class="seg" role="group">' +
      '<button type="button" data-cal="solar" class="' + (F.cal === 'solar' ? 'on' : '') + '">' + esc(U('solar')) + '</button><button type="button" data-cal="lunar" class="' + (F.cal === 'lunar' && !F.leap ? 'on' : '') + '">' + esc(U('lunar')) + '</button><button type="button" data-cal="leap" class="' + (F.leap ? 'on' : '') + '">' + esc(U('leap')) + '</button></div></div>' +
      '<input class="in" id="bd" type="date" min="1900-01-01" max="2050-12-31" required></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><label for="bt" style="font-size:13px;font-weight:700">' + esc(U('time')) + '</label><div class="row" style="gap:8px"><input class="in" id="bt" type="time" style="flex:1;min-width:0"><label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--mute);white-space:nowrap"><input type="checkbox" id="tu" style="width:20px;height:20px">' + esc(U('timeUnknown')) + '</label></div><div class="small">' + esc(U('timeHint')) + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700">' + esc(U('gender')) + '</div><div class="two"><button type="button" class="choice' + (F.gender === 'F' ? ' on' : '') + '" data-g="F">' + esc(U('female')) + '</button><button type="button" class="choice' + (F.gender === 'M' ? ' on' : '') + '" data-g="M">' + esc(U('male')) + '</button></div></div>' +
      '<label class="f">' + esc(U('place')) + '<select class="in" id="pl">' + opts + '</select><span class="small" style="font-weight:400">' + esc(U('placeHint')) + '</span></label>' +
      '<div class="small" id="err" style="color:var(--red)" hidden>' + esc(U('errDate')) + '</div>' +
      '<button class="btn" type="submit">' + esc(U('build')) + '</button><p class="note" style="padding:0">' + esc(U('privacy')) + '</p></form></div>';
  }
  function submitStart(e) {
    e.preventDefault();
    var nm = document.getElementById('nm').value.trim(), bd = document.getElementById('bd').value, bt = document.getElementById('bt').value, tu = document.getElementById('tu').checked;
    var err = document.getElementById('err');
    if (!nm || !/^\d{4}-\d{2}-\d{2}$/.test(bd)) { err.hidden = false; return; }
    var a = bd.split('-').map(Number), hh = null, mm = null;
    if (!tu && bt) { var b = bt.split(':').map(Number); hh = b[0]; mm = b[1]; }
    var p = { id: 'p' + Date.now().toString(36), name: nm, y: a[0], m: a[1], d: a[2], hh: hh, mm: mm, cal: F.cal === 'solar' ? 'solar' : 'lunar', leap: F.leap, gender: F.gender, place: +document.getElementById('pl').value };
    try { chartOf(p); } catch (x) { err.hidden = false; return; }
    S.profiles.push(p); if (R.q === 'gung' && S.active) { G.other = p.id; save(); location.hash = '#gung'; return; } S.active = p.id; save(); location.hash = '#home';
  }

  /* ── 행운의 번호 · 이사 방향 · 삼재 ── */
  var LOTTO_IN_APP = false;   // 애플 승인 뒤 true — 앱에서도 10줄 무료(묶음 구매는 웹만)
  function X(k, vars) { var a = [TX().extra, (window.KF_TXT.en || {}).extra, (window.KF_TXT.ko || {}).extra]; for (var i = 0; i < 3; i++) if (a[i] && a[i][k] != null) return fill(a[i][k], vars); return k; }
  function qv(k) { var m = new RegExp('(?:^|&)' + k + '=([^&]*)').exec(R.q || ''); return m ? decodeURIComponent(m[1]) : null; }
  function paidAny() { var e = S.ent || {}; if (PRO || isSub() || (e.saju || []).length || (e.lot || []).length) return true;
    var has = function (o) { return Object.keys(o || {}).some(function (k) { return (o[k] || []).length; }); }; return has(e.toj) || has(e.move); }
  function hasMove(p, Y) { var a = (S.ent.move || {})[Y] || []; return subOn(p) || a.indexOf(bkey(p)) >= 0; }
  function lottoOn() { return !IN_APP || LOTTO_IN_APP; }
  var LDEF = { ko: 0, ja: 6, de: 3, fr: 3, es: 3 };
  function balls(s) { var b = function (n, k) { return '<span class="ball' + (k ? ' bn' : '') + '" data-e="' + KF_LOTTO.elOf(n) + '">' + n + '</span>'; };
    return '<span class="balls">' + s.main.map(function (n) { return b(n); }).join('') + (s.bonus ? '<i>+</i>' + s.bonus.map(function (n) { return b(n, 1); }).join('') : '') + '</span>'; }
  function lrows(arr) { return '<div class="lrows">' + arr.map(function (s, i) { return '<div class="lrow"><span class="ln">' + (i + 1) + '</span>' + balls(s) + '</div>'; }).join('') + '</div>'; }
  function vLotto() {
    var p = prof(); if (!p) return vStart(); if (!lottoOn()) return vHome();
    var c = chartOf(p), L = S.lang, d = D(), t = todayYMD(), q = qv('g'), saved = ls('kf_lg');
    var gi = q != null ? +q : saved != null ? +saved : LDEF[L] != null ? LDEF[L] : 1; if (!(gi >= 0 && gi < KF_LOTTO.GAMES.length)) gi = 0; ls('kf_lg', gi);
    var g = KF_LOTTO.GAMES[gi], gname = g.flag + ' ' + KF_LOTTO.name(gi, L), le = KF_LOTTO.luckEls(c), paid = paidAny();
    var DG = { 0: '3·8', 1: '2·7', 2: '5·0', 3: '4·9', 4: '1·6' };
    var chips = KF_LOTTO.GAMES.map(function (x, i) { return '<a class="yr' + (i === gi ? ' on' : '') + '" href="#lotto?g=' + i + '">' + x.flag + ' ' + esc(KF_LOTTO.name(i, L)) + '</a>'; }).join('');
    var packs = (S.ent.lot || []).filter(function (x) { return x.bkey === bkey(p) && x.g === gi; }), oid = qv('o');
    var open = packs.filter(function (x) { return x.oid === oid; })[0];
    var head = function (n) { return '<div class="phead"><b class="serif">' + esc(X('lotPrintH', { name: p.name, game: gname })) + '</b><span class="small">' + X('lotPrintS', { date: dateLine(t) }) + (n ? ' · ' + n : '') + '</span></div>'; };
    var why = '<p class="small" style="line-height:1.7;margin:0">' + esc(X('lotWhy', { name: p.name, e1: d.elName[le[0]], e2: d.elName[le[1]], d: DG[le[0]] + ' · ' + DG[le[1]] })) + '</p>';
    var main;
    if (open) {
      var n = +open.p.slice(3), arr = KF_LOTTO.sets(c, gi, n, open.oid);
      main = '<section class="card p1 lotsheet' + (n > 50 ? ' n100' : ' n50') + '">' + head(X('lotPack', { n: n })) + lrows(arr) + '<p class="pnote">' + esc(X('lotNote')) + '</p></section>' +
        '<a class="btn ghost noprint" href="#lotto?g=' + gi + '">' + esc(X('lotClose')) + '</a>';
    } else {
      main = '<section class="card p1 lotsheet n10">' + head() + '<h2 style="font-size:16px;margin:6px 0">' + esc(X('lotToday', { n: paid ? 10 : 1 })) + '</h2>' + why +
        lrows(KF_LOTTO.sets(c, gi, paid ? 10 : 1, bkey(p) + '|' + todayStr())) + '<p class="pnote">' + esc(X('lotNote')) + '</p></section>' +
        (paid ? '' : '<section class="card" style="display:flex;flex-direction:column;gap:10px;border:2px solid var(--gold)"><b>' + esc(X('lotFreeLock')) + '</b><span class="small">' + esc(X('lotFreeLockS')) + '</span>' + payBtn(p, U('subscribeAll')) + '</section>');
    }
    var mine = packs.length ? '<section class="list"><h2 style="font-size:16px">' + esc(X('lotMine')) + '</h2>' + packs.map(function (x) {
      var on = open && x.oid === open.oid;
      return '<a class="item" href="#lotto?g=' + gi + (on ? '' : '&o=' + encodeURIComponent(x.oid)) + '" style="display:flex;justify-content:space-between;color:var(--ink)"><span><b>' + esc(X('lotPack', { n: x.p.slice(3) })) + '</b> <span class="small">' + esc(String(x.at || '').slice(0, 10)) + '</span></span><b style="color:var(--red)">' + esc(X(on ? 'lotClose' : 'lotOpen')) + '</b></a>'; }).join('') + '</section>' : '';
    var shop = IN_APP ? '' : '<section class="card noprint" style="display:flex;flex-direction:column;gap:10px"><b>' + esc(X('lotMore')) + '</b>' +
      ['lot50', 'lot100'].map(function (k) { return '<button class="item row" data-buylot="' + k + '" style="justify-content:space-between;text-align:left;width:100%;font:inherit;color:var(--ink)"><span><b>' + esc(X('lotPack', { n: k.slice(3) })) + '</b><br><span class="small">' + esc(X('lotPackS', { n: k.slice(3) })) + '</span></span><b class="serif" data-price="' + k + '" style="color:var(--red)">—</b></button>'; }).join('') + '</section>';
    return bar(X('tLotto'), esc(gname) + ' · ' + esc(p.name)) + '<div class="wrap" style="padding-top:8px"><div class="small noprint" style="margin-bottom:-6px">' + esc(X('lotGame')) + '</div><nav class="yrs wrapc noprint">' + chips + '</nav>' + main + mine + shop + '</div>' + tab('home');
  }

  // 나침반: 북이 위, 8방향 — 좋음(초록) · 보통 · 피함(붉음)
  function compass(M, show, dn, xs) {
    var cx = 150, cy = 150, R1 = 138, R0 = 54, o = '<svg viewBox="0 0 300 300" width="100%" style="max-width:300px" role="img" aria-label="compass">';
    var pt = function (r, a) { a = (a - 90) * Math.PI / 180; return (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); };
    KF_MOVE.DIRS.forEach(function (dd, i) {
      var a = i * 45, j = M.dirs[dd], lv = show(dd);
      var fillc = lv === 0 ? 'var(--wood-bg)' : lv === 2 ? 'var(--fire-bg)' : 'var(--card)', ink = lv === 0 ? 'var(--wood)' : lv === 2 ? 'var(--red)' : 'var(--mute)';
      o += '<path d="M' + pt(R0, a - 22.5) + ' L' + pt(R1, a - 22.5) + ' A' + R1 + ' ' + R1 + ' 0 0 1 ' + pt(R1, a + 22.5) + ' L' + pt(R0, a + 22.5) + ' A' + R0 + ' ' + R0 + ' 0 0 0 ' + pt(R0, a - 22.5) + 'Z" style="fill:' + fillc + ';stroke:var(--line2)" stroke-width="1"/>';
      var p1 = pt(112, a).split(' '), p2 = pt(80, a).split(' ');
      o += '<text x="' + p1[0] + '" y="' + p1[1] + '" text-anchor="middle" dominant-baseline="middle" style="fill:' + ink + ';font:700 ' + (dn[dd].length > 6 ? 10.5 : 14) + 'px var(--sans)">' + esc(dn[dd]) + '</text>';
      o += '<text x="' + p2[0] + '" y="' + p2[1] + '" text-anchor="middle" dominant-baseline="middle" style="fill:var(--ink);font:900 15px var(--serif)">' + esc(xs[j.star].slice(0, 2)) + '</text>';
    });
    o += '<circle cx="150" cy="150" r="' + (R0 - 4) + '" style="fill:var(--inkbg)"/><text x="150" y="150" text-anchor="middle" dominant-baseline="middle" style="fill:var(--gold);font:900 18px var(--serif)">' + esc(xs[M.center].slice(0, 2)) + '</text>';
    return o + '</svg>';
  }
  function moveCtx(p) {
    var c = chartOf(p), by = c.solar.y; if (c.utc < KF.jieOf(by)[1]) by -= 1;
    return { c: c, me: KF_MOVE.star(by) };
  }
  function samjaeCard(c, Y) {
    var b = c.pillars.year.b, k = KF_MOVE.samjae(b, Y), an = X('animals'), y0 = k >= 0 ? Y - k : Y;
    if (k < 0) { while (KF_MOVE.samjae(b, y0) !== 0) y0++; }
    var sy = [y0, y0 + 1, y0 + 2], sb = sy.map(function (yy) { return KF.BRANCHES[((yy - 4) % 12 + 12) % 12]; }), s0 = ((y0 - 4) % 12 + 12) % 12;
    var grp = [6, 10, 14].map(function (i) { return KF.BRANCHES[(s0 + i) % 12]; }).join('');   // 申子辰 · 亥卯未 · 寅午戌 · 巳酉丑
    return '<section class="card" style="display:flex;flex-direction:column;gap:8px' + (k >= 0 ? ';border:2px solid var(--red)' : '') + '"><div class="row" style="justify-content:space-between"><h2 style="font-size:16px">' + esc(X('tSamjae')) + ' · ' + Y + '</h2><b class="serif" style="color:' + (k >= 0 ? 'var(--red)' : 'var(--wood)') + '">' + esc(k >= 0 ? X('samjaeIn')[k] : X('samjaeNo')) + '</b></div>' +
      '<p class="small" style="margin:0;line-height:1.7">' + esc(X('samjaeWhy', { br: an[b], grp: grp, a: sy[0] + '(' + sb[0] + ')', b: sy[1] + '(' + sb[1] + ')', c: sy[2] + '(' + sb[2] + ')' })) + '</p>' +
      (k >= 0 ? '<p style="margin:0;font-size:14px;line-height:1.7">' + esc(X('samjaeTip')[k]) + '</p>' : '<p class="small" style="margin:0">' + esc(X('samjaeNext', { y: y0 })) + '</p>') + '</section>';
  }
  function vMove() {
    var p = prof(); if (!p) return vStart();
    var t = todayYMD(), Y0 = KF_MOVE.ipchunYear(t.y, t.m, t.d), Y = +qv('y') === Y0 + 1 ? Y0 + 1 : Y0;
    var mc = moveCtx(p), c = mc.c, me = mc.me, M = KF_MOVE.year(Y, me), open = hasMove(p, Y), xs = X('stars'), dn = X('dirs'), W = X('why'), an = X('animals'), lvT = X('lv');
    var COMMON = ['ohwang', 'amgeom', 'pa', 'daejang', 'samsal'];
    var vars = function (j) { return { me: xs[me], st: xs[j.star], br: KF.BRANCHES[M.yb] + '·' + an[M.yb] }; };
    var picker = '<nav class="yrs noprint">' + [Y0, Y0 + 1].map(function (yy) { return '<a class="yr' + (yy === Y ? ' on' : '') + '" href="#move' + (yy === Y0 ? '' : '?y=' + yy) + '">' + yy + '</a>'; }).join('') + '</nav>';
    var common = KF_MOVE.DIRS.filter(function (dd) { return M.dirs[dd].bad.some(function (b) { return COMMON.indexOf(b) >= 0; }); }).map(function (dd) {
      return '<div class="mvrow"><b class="mvd bad">' + esc(dn[dd]) + '</b><div>' + M.dirs[dd].bad.filter(function (b) { return COMMON.indexOf(b) >= 0; }).map(function (b) { return '<div>' + esc(fill(W[b], vars(M.dirs[dd]))) + '</div>'; }).join('') + '</div></div>'; }).join('');
    var head = '<div class="phead"><b class="serif">' + esc(X('mvPrintH', { name: p.name, y: Y })) + '</b><span class="small">' + dateLine(t) + ' · KoreanFortune</span></div>';
    var top = '<div class="mvtop"><div class="svgwrap mvc">' + compass(M, function (dd) { return open ? M.dirs[dd].level : (M.dirs[dd].bad.some(function (b) { return COMMON.indexOf(b) >= 0; }) ? 2 : 1); }, dn, xs) + '</div>' +
      '<div class="mvme"><b>' + esc(X('mvMe', { name: p.name, star: xs[me] })) + '</b><p class="small" style="margin:4px 0 0;line-height:1.6">' + esc(X('mvMeWhy')) + '</p><p class="small" style="margin:4px 0 0">' + esc(X('mvYearS', { y: Y })) + '</p></div></div>';
    var body;
    if (!open) {
      body = '<section class="card"><h2 style="font-size:16px">' + esc(X('mvCommon')) + '</h2><p class="small" style="margin:2px 0 8px">' + esc(X('mvCommonS')) + '</p>' + common + '</section>';
    } else {
      var order = KF_MOVE.DIRS.slice().sort(function (a, b) { var A = M.dirs[a], B = M.dirs[b]; return A.level - B.level || (B.good.indexOf('saenggi') >= 0) - (A.good.indexOf('saenggi') >= 0); });
      var rows = order.map(function (dd) { var j = M.dirs[dd], v = vars(j), rs = j.bad.map(function (b) { return W[b]; });
        if (!j.bad.length) rs = rs.concat(j.good.length ? j.good.map(function (g) { return W[g]; }) : [W.clash]);
        var eff = j.level === 0 ? '<div class="eff">→ ' + esc(X('starEff')[j.star]) + '</div>' : '';
        return '<div class="mvrow"><b class="mvd ' + ['good', 'mid', 'bad'][j.level] + '">' + esc(dn[dd]) + '<small>' + esc(lvT[j.level]) + '</small></b><div>' + rs.map(function (r) { return '<div>' + esc(fill(r, v)) + '</div>'; }).join('') + eff + '</div></div>'; }).join('');
      var best = order.filter(function (dd) { return M.dirs[dd].level === 0; });
      var ms = KF_MOVE.months(Y, me), mrow = ms.map(function (m) {
        var ok = KF_MOVE.DIRS.filter(function (dd) { var j = m.dirs[dd]; return j.good.length && !j.bad.length && !M.dirs[dd].bad.length; });
        return '<div class="mm"><b>' + esc(X('mvMonthN', { m: m.solarMonth })) + '</b><span>' + (ok.length ? ok.map(function (dd) { return esc(dn[dd]) + (M.dirs[dd].level === 0 ? '★' : ''); }).join(' · ') : '—') + '</span></div>'; }).join('');
      // 앞으로 90일: 손 없는 날 + 띠·일주와 부딪지 않음 + 그날 기운
      var days = [], base = Date.UTC(t.y, t.m - 1, t.d);
      for (var i = 1; i <= 90; i++) {
        var dt = new Date(base + i * 864e5), y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, dd = dt.getUTCDate(), l;
        try { l = KF.solarToLunar(y, m, dd); } catch (e) { continue; }
        if ([9, 10, 19, 20, 29, 30].indexOf(l.d) < 0) continue;
        var r = KF.daily(c, y, m, dd), pb = r.pillar.b, md = function (a, n) { return ((a % n) + n) % n; };
        if (md(pb - c.pillars.year.b, 12) === 6 || md(pb - c.pillars.day.b, 12) === 6) continue;
        days.push({ y: y, m: m, d: dd, wd: (dt.getUTCDay() + 6) % 7, l: l, s: r.scores.total, mb: KF.monthPillarAt(y, m, dd).b });
      }
      days = days.sort(function (a, b) { return b.s - a.s; }).slice(0, 8).sort(function (a, b) { return (a.y * 400 + a.m * 31 + a.d) - (b.y * 400 + b.m * 31 + b.d); });
      var drow = days.map(function (x) {
        var yy = KF_MOVE.ipchunYear(x.y, x.m, x.d), YM = KF_MOVE.year(yy, me), mo = KF_MOVE.months(yy, me)[((x.mb - 2) % 12 + 12) % 12];
        var ok = KF_MOVE.DIRS.filter(function (k) { var j = mo.dirs[k]; return j.good.length && !j.bad.length && !YM.dirs[k].bad.length; }).map(function (k) { return dn[k]; });
        return '<div class="dd"><b>' + dateLine({ y: x.y, m: x.m, d: x.d, wd: x.wd }) + '</b><span class="small">' + esc(X('mvLunar', { m: x.l.m, d: x.l.d })) + ' · ' + esc(X('mvSon')) + ' · ' + esc(X('mvScore', { s: x.s })) + '</span><span class="small">' + esc(X('mvDayDirs', { d: ok.length ? ok.join(' · ') : '—' })) + '</span></div>'; }).join('');
      body = '<section class="card mvbest"><h2 style="font-size:16px">' + esc(X('mvBest')) + ' · <span style="color:var(--wood)">' + (best.length ? best.map(function (dd) { return esc(dn[dd]); }).join(' · ') : '—') + '</span></h2>' + (best.length ? '' : '<p class="small">' + esc(X('mvNone')) + '</p>') + '</section>' +
        '<section class="card"><h2 style="font-size:16px;margin-bottom:6px">' + esc(X('mvPersonal')) + '</h2>' + rows + '</section>' +
        '<section class="card"><h2 style="font-size:16px">' + esc(X('mvMonths')) + '</h2><p class="small" style="margin:2px 0 8px">' + esc(X('mvMonthsS')) + '</p><div class="mms">' + mrow + '</div></section>' +
        '<section class="card"><h2 style="font-size:16px">' + esc(X('mvDays')) + '</h2><p class="small" style="margin:2px 0 8px">' + esc(X('mvDaysS', { name: p.name })) + '</p><div class="dds">' + drow + '</div></section>';
    }
    var lock = open ? '' : '<section class="card noprint" style="display:flex;flex-direction:column;gap:10px;border:2px solid var(--gold)"><b>' + esc(X('mvLock')) + '</b><span class="small">' + esc(X('mvLockS')) + '</span>' +
      payBtn(p, U('subscribeAll')) + (IN_APP ? '' : '<button class="btn line" data-buymove="' + Y + '">' + esc(X('mvBuy', { y: Y })) + ' · <span data-price="move">—</span></button>') + '</section>';
    return bar(X('mvYear', { y: Y }), esc(p.name)) + '<div class="wrap" style="padding-top:8px">' + picker +
      '<div class="p1 mvsheet">' + head + top + body + '<p class="pnote">' + esc(X('mvNote')) + '</p></div>' + lock + '<div class="noprint">' + samjaeCard(c, Y0) + '</div></div>' + tab('home');
  }

  /* ── 라우터 ── */
  var R = { q: '' };
  function render() {
    var h = (location.hash || '#home').slice(1), hq = h.split('?'); h = hq[0]; R.q = hq[1] || '';
    if (h !== 'ask') { Q.kind = null; Q.shown = false; }
    if (!S.profiles.length && h !== 'about') h = (h === 'start' || ls('kf_seen')) ? 'start' : 'welcome';
    var v = { home: vHome, today: vToday, week: vWeek, saju: vSaju, year: vYear, tojeong: function () { return vTojeong(); }, 'tojeong-last': function () { return vTojeong(true); }, welcome: vWelcome, pay: vPay, paid: function () { return window.KF_PAY ? KF_PAY.vPaid(R.q) : vHome(); }, restore: function () { return window.KF_PAY ? KF_PAY.vRestore() : vPay(); }, about: vAbout, gung: vGung, ask: vAsk, me: vMe, start: vStart, lotto: vLotto, move: vMove }[h] || vHome;
    document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr';
    applyTheme();
    try { app.innerHTML = v(); } catch (x) { console.error(x); app.innerHTML = '<div class="wrap" style="padding-top:40px"><p>' + esc(x.message) + '</p><a class="btn" href="#me">' + esc(U('meTitle')) + '</a></div>'; }
    window.scrollTo(0, 0);
    app.classList.toggle('hasp1', !!app.querySelector('.p1'));
    if (h === 'tojeong-last') { var tn = document.getElementById('tnow'); if (tn) setTimeout(function () { tn.scrollIntoView({ block: 'center' }); }, 60); }
    var yon = app.querySelector('.yrs .on'); if (yon && yon.parentNode.scrollTo) yon.parentNode.scrollLeft = yon.offsetLeft - 60;
    var f = document.getElementById('f'); if (f) f.addEventListener('submit', submitStart);
    if (window.KF_PAY && KF_PAY.after) KF_PAY.after(h);
    // 결과 화면: 출력·PDF · 공유
    var RES = { today: 1, week: 1, saju: 1, year: 1, tojeong: 1, 'tojeong-last': 1, gung: !!G.other, ask: Q.shown, lotto: lottoOn(), move: 1 };
    var w = RES[h] && app.querySelector('.wrap');
    if (w) { var d = document.createElement('div'); d.className = 'two noprint'; d.innerHTML = '<button class="btn ghost" data-print="1">🖨 ' + esc(U('print')) + '</button><button class="btn ghost" data-share="1">↗ ' + esc(U('share')) + '</button>'; w.appendChild(d); }
  }
  /* 출력 · PDF — 웹은 인쇄 창(→ PDF로 저장), 앱은 기기의 인쇄 기능 */
  function doPrint() {
    var N = window.KFNative;
    if (N && N.print) { N.print(); return; }
    var C = window.Capacitor;
    if (C && C.isNativePlatform && C.isNativePlatform()) {
      var P = C.registerPlugin ? C.registerPlugin('KFBilling') : null;
      if (P && P.print) { P.print().catch(function () { toastA(U('printApp')); }); return; }
      toastA(U('printApp')); return;
    }
    window.print();
  }
  /* 공유 — 휴대폰의 공유 창(카카오톡 · 부름누름 · 바로너 · 가림콜 · 단톡방 …), 안 되면 복사 */
  function shareText() {
    var bt = app.querySelector('.bar .t'), lead = app.querySelector('.lead') || app.querySelector('.story p') || app.querySelector('.ink .serif');
    var txt = (lead ? lead.textContent.trim() : '').replace(/\s+/g, ' ');
    if (txt.length > 160) txt = txt.slice(0, 158) + '…';
    return '[' + U('shareFrom') + '] ' + (bt ? bt.textContent.trim() : '') + (txt ? '\n' + txt : '') + '\nhttps://koreanfortune.kr';
  }
  function doShare() {
    var text = shareText(), N = window.KFNative, C = window.Capacitor;
    if (N && N.share) { N.share(text); return; }
    if (C && C.isNativePlatform && C.isNativePlatform() && C.registerPlugin) {
      var P = C.registerPlugin('KFBilling');
      P.share({ text: text }).catch(function () { copyText(text); }); return;
    }
    if (navigator.share) { navigator.share({ title: 'KoreanFortune', text: text }).catch(function () {}); return; }
    copyText(text);
  }
  function copyText(text) {
    var ok = function () { toastA(U('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () { fallbackCopy(text); ok(); });
    else { fallbackCopy(text); ok(); }
  }
  function fallbackCopy(text) { var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); }
  function toastA(msg) {
    var el = document.getElementById('kftoast');
    if (!el) { el = document.createElement('div'); el.id = 'kftoast'; el.setAttribute('role', 'status'); el.style.cssText = 'position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);max-width:420px;width:calc(100% - 32px);background:#221C16;color:#F4EEE3;border-radius:14px;padding:12px 14px;font-size:13.5px;line-height:1.6;z-index:30;box-shadow:0 6px 24px rgba(0,0,0,.25)'; document.body.appendChild(el); }
    el.textContent = msg; el.hidden = false; clearTimeout(el._t); el._t = setTimeout(function () { el.hidden = true; }, 4200);
  }
  window.KF_APP = { U: U, esc: esc, bkey: bkey, render: render, lang: function () { return S.lang; }, prof: prof,
    setEnt: function (e) { if (PRO) return; e = e || {}; if (JSON.stringify(e) === JSON.stringify(S.ent)) return; S.ent = e; ls('kf_ent', S.ent); var h = (location.hash || '').slice(1).split('?')[0]; if (h !== 'start' && h !== 'restore') render(); } };
  app.addEventListener('click', function (e) {
    var sn = e.target.closest('[data-seen]'); if (sn) ls('kf_seen', 1);
    if (e.target.closest('[data-langsheet]')) { langSheet(); return; }
    if (e.target.closest('[data-theme-toggle]')) { var o = ['auto', 'light', 'dark']; S.theme = o[(o.indexOf(S.theme || 'auto') + 1) % 3]; ls('kf_theme', S.theme); render(); return; }
    if (e.target.closest('[data-print]')) { doPrint(); return; }
    if (e.target.closest('[data-share]')) { doShare(); return; }
    var t = e.target.closest('[data-cal],[data-g],[data-lang],[data-use],[data-del],[data-buy],[data-buytoj],[data-buylot],[data-buymove],[data-gt],[data-go],[data-q],[data-qw],[data-qgo],[data-qreset]'); if (!t) return;
    if (t.dataset.gt) { G.type = t.dataset.gt; return render(); }
    if (t.dataset.go) { G.other = t.dataset.go; return render(); }
    if (t.dataset.q) { Q.kind = t.dataset.q; Q.shown = false; if (Q.kind === 'match') { location.hash = '#gung'; return; } return render(); }
    if (t.dataset.qw) { Q.who = t.dataset.qw; Q.shown = false; keepQ(); return; }
    if (t.dataset.qgo) { var qd = document.getElementById('qd'); if (qd) Q.date = qd.value; Q.shown = true; return render(); }
    if (t.dataset.qreset) { Q.kind = null; Q.shown = false; return render(); }
    if (t.dataset.cal) { F.cal = t.dataset.cal === 'solar' ? 'solar' : 'lunar'; F.leap = t.dataset.cal === 'leap'; keepForm(); }
    else if (t.dataset.g) { F.gender = t.dataset.g; keepForm(); }
    else if (t.dataset.lang) { setLang(t.dataset.lang); }
    else if (t.dataset.use) { S.active = t.dataset.use; save(); render(); }
    else if (t.dataset.del) { S.profiles = S.profiles.filter(function (p) { return p.id !== t.dataset.del; }); if (S.active === t.dataset.del) S.active = (S.profiles[0] || {}).id; save(); render(); }
    else if (t.dataset.buy && window.KF_PAY) window.KF_PAY.buy(t.dataset.buy, prof(), tojYear());
    else if (t.dataset.buytoj && window.KF_PAY) window.KF_PAY.buy('toj', prof(), Number(t.dataset.buytoj));
    else if (t.dataset.buylot && window.KF_PAY) window.KF_PAY.buy(t.dataset.buylot, prof(), null, +(ls('kf_lg') || 0));
    else if (t.dataset.buymove && window.KF_PAY) window.KF_PAY.buy('move', prof(), Number(t.dataset.buymove));
  });
  function keepQ() { var qd = document.getElementById('qd'); if (qd) Q.date = qd.value; render(); }
  function keepForm() { var ids = ['nm', 'bd', 'bt', 'pl'], v = {}; ids.forEach(function (i) { var el = document.getElementById(i); if (el) v[i] = el.value; }); var tu = (document.getElementById('tu') || {}).checked;
    render(); ids.forEach(function (i) { var el = document.getElementById(i); if (el && v[i] != null) el.value = v[i]; }); if (tu) document.getElementById('tu').checked = true; }
  function setLang(l) {
    S.lang = l; save();
    if (window.KF_TXT[l] || l === 'ko') return render();
    var files = ['ui', 'daily', 'saju', 'ilju', 'toj', 'gung', 'extra'], n = files.length;
    window.KF_TXT[l] = window.KF_TXT[l] || {};
    files.forEach(function (f) { var s = document.createElement('script'); s.src = 'data/' + l + '/' + f + '.js?v=' + (window.KF_VER || 1); s.onload = s.onerror = function () { if (--n === 0) render(); }; document.head.appendChild(s); });
  }
  window.addEventListener('hashchange', render);
  window.KF_APP.state = S; window.KF_APP.save = save;
  if (S.lang !== 'ko' && !window.KF_TXT[S.lang]) setLang(S.lang); else render();
})();
