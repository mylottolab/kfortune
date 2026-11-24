/* 한국전통운세 — 화면 */
(function () {
  'use strict';
  var KF = window.KF;
  var LANGS = [['ko', '한국어', 1], ['en', 'English', 1], ['ja', '日本語', 0], ['zh-Hans', '简体中文', 0], ['zh-Hant', '繁體中文', 0], ['es', 'Español', 0],
    ['vi', 'Tiếng Việt', 0], ['th', 'ไทย', 0], ['id', 'Bahasa Indonesia', 0], ['de', 'Deutsch', 0], ['fr', 'Français', 0], ['ar', 'العربية', 0]];
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
  if (/[?&]pro=1/.test(location.search)) S.ent = { sub: '2099-12-31' };   // 시험용
  function save() { ls('kf_lang', S.lang); ls('kf_profiles', S.profiles); ls('kf_active', S.active); }
  function pickLang() { var n = (navigator.language || 'ko').toLowerCase(); if (n.indexOf('ko') === 0) return 'ko'; if (n.indexOf('ja') === 0) return 'ja';
    if (n.indexOf('zh') === 0) return /tw|hk|hant|mo/.test(n) ? 'zh-Hant' : 'zh-Hans'; if (n.indexOf('es') === 0) return 'es'; return 'en'; }
  function TX() { return (window.KF_TXT && (window.KF_TXT[S.lang] || window.KF_TXT.ko)) || {}; }
  function U(k, vars) { var t = TX().ui || {}, v = t[k]; if (v == null) v = ((window.KF_TXT.ko || {}).ui || {})[k]; if (v == null) return k; return fill(v, vars); }
  function D() { return TX().daily || window.KF_TXT.ko.daily; }
  function fill(s, vars) { if (typeof s !== 'string' || !vars) return s; return s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function prof() { return S.profiles.filter(function (p) { return p.id === S.active; })[0] || S.profiles[0]; }
  function isSub() { return S.ent.sub && S.ent.sub >= todayStr(); }
  function hasSaju(p) { return isSub() || (S.ent.saju || []).indexOf(p.id) >= 0; }
  function hasToj(p, y) { return isSub() || ((S.ent.toj || {})[y] || []).indexOf(p.id) >= 0; }
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
    var s = '<svg width="300" height="270" viewBox="0 0 300 270" role="img" aria-label="' + keys.map(function (k) { return an[k] + ' ' + sc[k]; }).join(', ') + '">';
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
    return '<div class="bar"><a class="back" href="#' + (back || 'home') + '" aria-label="back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a><div><div class="t">' + esc(title) + '</div>' + (sub ? '<div class="s">' + sub + '</div>' : '') + '</div></div>';
  }
  function dateLine(t) { return esc(U('dateFmt', { y: t.y, m: t.m, d: t.d, wd: U('wdFull')[t.wd] })); }
  function elOf(i, stem) { return EL[stem ? KF.STEM_EL[i] : KF.BR_EL[i]]; }
  function miniChars(c) {
    var o = '', P = c.pillars;
    ['hour', 'day', 'month', 'year'].forEach(function (k) { var p = P[k];
      o += '<div style="display:flex;flex-direction:column;gap:3px">' + (p ? '<span class="ch ' + elOf(p.s, 1) + '" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;font:700 17px var(--serif);border-radius:6px">' + KF.STEMS[p.s] + '</span><span class="ch ' + elOf(p.b) + '" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;font:700 17px var(--serif);border-radius:6px">' + KF.BRANCHES[p.b] + '</span>' : '<span class="ch none" style="width:30px;height:64px;display:flex;align-items:center;justify-content:center;border-radius:6px">?</span>') + '</div>'; });
    return '<div class="mini">' + o + '</div>';
  }

  function vHome() {
    var p = prof(); if (!p) return vStart();
    var c = chartOf(p), t = todayYMD(), r = KF.daily(c, t.y, t.m, t.d), tx = dailyText(p, c, r), d = D();
    var ty = tojYear();
    var g5 = ['money', 'work', 'people', 'love', 'health'].map(function (k) { return '<div><small>' + esc(d.areaName[k]) + '</small><b>' + r.scores[k] + '</b></div>'; }).join('');
    return '<div class="top"><div class="brand"><div class="seal">運</div><b>' + esc(U('app')) + '</b></div><a class="pill" href="#about" style="display:flex;align-items:center">' + esc(U('lang')) + '</a></div>' +
      '<div class="wrap"><div style="padding-top:8px"><div class="small">' + dateLine(t) + ' · <span class="serif" style="color:var(--ink)">' + r.pillar.txt + '</span>' + esc(U('dayOf')) + '</div>' +
      '<h1>' + esc(U('hello', { name: p.name })) + '<br>' + esc(tx.head) + '</h1></div>' +
      '<section class="dark" style="display:flex;flex-direction:column;gap:14px"><div class="row" style="gap:16px">' + ring(r.scores.total) +
      '<div style="flex:1"><div class="mut" style="font-size:12px">' + esc(U('oneLine')) + '</div><div class="lead" style="font-size:16px">' + esc(d.tenImg[r.tenS]) + '</div></div></div>' +
      '<div class="grid5">' + g5 + '</div><a class="btn gold" href="#today">' + esc(U('todayMore')) + '</a></section>' +
      '<section class="card row" style="padding:12px 14px"><div style="min-width:64px"><div class="small">' + esc(U('mySaju')) + '</div><b style="font-size:13px">' + esc(U('dm')) + ' ' + KF.STEMS[c.dayMaster] + ' ' + d.elName[c.dayMasterEl] + '</b></div><div style="flex:1;display:flex;justify-content:flex-end">' + miniChars(c) + '</div></section>' +
      '<section class="tiles">' +
      tile('#saju', '四柱', U('mSaju'), U('mSajuS')) + tile('#tojeong', '土亭', U('mToj', { y: ty }), U('mTojS', { gz: KF.pillar(ty - 4).ko })) +
      tile('#week', '七日', U('mWeek'), '', 1) + tile('#year', '歲運', U('mYear'), U('mYearS'), 1) +
      tile('#gung', '宮合', U('mGung'), U('mGungS2')) + tile('#about', '文', U('mAbout'), U('mAboutS'), 2) +
      '</section>' +
      '<a class="card row" href="#ask" style="gap:14px;color:var(--ink);border:2px solid var(--red)"><span class="serif" style="font-weight:900;font-size:30px;color:var(--red)">問</span><span style="flex:1"><b style="font-size:15px">' + esc(U('mAsk')) + '</b><br><span class="small">' + esc(U('mAskS')) + '</span></span><span style="color:var(--red);font-weight:700">›</span></a><p class="note">' + esc(d.note) + '</p></div>' + tab('home');
  }
  function tile(h, han, b, s, col) { return '<a class="tile" href="' + h + '"><span class="h"' + (col === 1 ? ' style="color:var(--indigo)"' : col === 2 ? ' style="color:var(--mute)"' : '') + '>' + han + '</span><b>' + esc(b) + '</b><small>' + esc(s) + '</small></a>'; }
  function tojYear() { var t = todayYMD(); return t.m >= 11 ? t.y + 1 : t.y; }   // 11월부터 새해 것

  function vToday() {
    var p = prof(), c = chartOf(p), t = todayYMD(), r = KF.daily(c, t.y, t.m, t.d), tx = dailyText(p, c, r), d = D(), L = r.lucky;
    var bestSlot = r.slots.reduce(function (a, s, i) { return s.score > r.slots[a].score ? i : a; }, 0);
    var slots = r.slots.map(function (s, i) { return '<div class="' + (i === bestSlot ? 'best' : '') + '"><span class="mut"' + (i === bestSlot ? ' style="color:var(--red);font-weight:700"' : '') + '>' + esc(d.slotName[i]) + (i === bestSlot ? ' · ' + esc(U('bestSlot')) : '') + '</span><b>' + esc(d.slot[s.ten]) + '</b><span class="mut">' + s.score + '</span></div>'; }).join('');
    var colorHex = { green: '#2F6B3F', teal: '#2C7A78', red: '#A9322A', purple: '#6B3F7A', yellow: '#D8B23A', beige: '#D9C6A3', white: '#FFFFFF', silver: '#B9BCC0', navy: '#1E2E4A', black: '#16130F' }[L.color];
    var areas = areaText(r).map(function (x) { return '<p style="margin:0 0 10px;font-size:14.5px;line-height:1.75"><b>' + esc(d.areaName[x.a]) + ' ' + x.v + '</b> · ' + esc(x.t) + '</p>'; }).join('');
    var locked = !isSub();
    return bar(U('todayTitle'), dateLine(t) + ' · <span class="serif">' + r.pillar.txt + '</span> · ' + esc(p.name)) +
      '<div class="wrap" style="padding-top:8px"><section class="card" style="display:flex;flex-direction:column;align-items:center"><div><span class="serif" style="font-weight:900;font-size:46px;color:var(--red)">' + r.scores.total + '</span> <span class="mut">/ 100 ' + esc(U('total')) + '</span></div><div class="svgwrap">' + radar(r.scores) + '</div></section>' +
      '<section class="dark"><div class="mut" style="font-size:12px">' + esc(U('oneLine')) + '</div><div class="lead">' + esc(tx.head) + '</div></section>' +
      '<article class="story"><h2 style="margin-bottom:10px">' + esc(U('storyTitle')) + '</h2>' + tx.paras.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</article>' +
      '<section><h2 style="margin-bottom:8px;font-size:16px">' + esc(U('timeTitle')) + '</h2><div class="three">' + slots + '</div></section>' +
      '<section class="card" style="display:flex;flex-direction:column;gap:12px"><h2 style="font-size:17px">' + esc(U('lucky')) + '</h2><div class="three" style="text-align:center">' +
      '<div style="align-items:center;border:0;background:none"><span style="width:40px;height:40px;border-radius:20px;background:' + colorHex + ';border:1px solid var(--line2)"></span><span class="mut">' + esc(U('color')) + '</span><b>' + esc(d.colorName[L.color]) + '</b></div>' +
      '<div style="align-items:center;border:0;background:none"><span class="serif" style="font-weight:900;font-size:26px;color:var(--indigo);height:40px;display:flex;align-items:center">' + L.nums.join(' · ') + '</span><span class="mut">' + esc(U('number')) + '</span><b>' + esc(d.elName[L.el]) + '</b></div>' +
      '<div style="align-items:center;border:0;background:none"><span class="serif" style="font-weight:900;font-size:26px;color:var(--indigo);height:40px;display:flex;align-items:center">' + { E: '東', S: '南', C: '中', W: '西', N: '北' }[L.dir] + '</span><span class="mut">' + esc(U('direction')) + '</span><b>' + esc(d.dirName[L.dir]) + '</b></div></div>' +
      '<div style="font-size:14px;line-height:1.7"><b style="color:var(--wood)">' + esc(U('doIt')) + '</b> · ' + esc(tx.doo) + '<br><b style="color:var(--red)">' + esc(U('avoid')) + '</b> · ' + esc(tx.dont) + '</div>' +
      '<a href="https://mylottolab.github.io/my-lotto-lab/main_page.html" target="_blank" rel="noopener" style="font-size:13px">' + esc(U('lotto')) + '</a></section>' +
      '<section class="card' + (locked ? ' lock' : '') + '"><h2 style="font-size:17px;margin-bottom:10px">' + esc(U('areasTitle')) + '</h2><div class="' + (locked ? 'blur' : '') + '" ' + (locked ? 'aria-hidden="true"' : '') + '>' + areas + '</div>' +
      (locked ? '<div class="over">' + esc(U('areasLock')) + '<a class="btn" href="#pay">' + esc(U('subscribeAll')) + '</a></div><div style="height:60px"></div>' : '') + '</section>' +
      '<p class="note">' + esc(d.note) + '</p></div>' + tab('home');
  }

  function vWeek() {
    var p = prof(), c = chartOf(p), t = todayYMD(), w = KF.weekly(c, t.y, t.m, t.d), d = D();
    var vals = w.map(function (x) { return x.scores.total; }), hi = vals.indexOf(Math.max.apply(null, vals)), lo = vals.indexOf(Math.min.apply(null, vals));
    var story = Math.max.apply(null, vals) - Math.min.apply(null, vals) < 8 ? d.week.flat :
      fill(d.week.best, { wd: d.wd[hi], head: d.head[w[hi].tenS][band(vals[hi])] }) + ' ' + fill(d.week.worst, { wd: d.wd[lo], head: d.head[w[lo].tenS][band(vals[lo])] });
    var a = w[0].date, z = w[6].date, locked = !isSub();
    var items = w.map(function (x, i) { var free = i < 5 || !locked, cls = i === hi ? 'item hl' : i === lo ? 'item low' : 'item';
      return free ? '<div class="' + cls + '"><div class="row" style="align-items:flex-start"><b style="min-width:52px' + (i === hi ? ';color:var(--red)' : '') + '">' + esc(d.wd[i]) + ' ' + vals[i] + '</b><span>' + esc(d.head[x.tenS][band(vals[i])]) + '</span></div></div>' : ''; }).join('');
    return bar(U('weekTitle'), a.m + '.' + a.d + ' ~ ' + z.m + '.' + z.d + ' · ' + esc(p.name)) +
      '<div class="wrap" style="padding-top:8px"><section class="dark"><div class="mut" style="font-size:12px">' + esc(U('weekStory')) + '</div><p style="margin:8px 0 0;font-size:14.5px;line-height:1.8">' + esc(story) + '</p></section>' +
      '<section class="card svgwrap" style="padding:14px 6px 6px">' + lineChart(vals, d.wd, w.map(function (x) { return x.pillar.txt; }), hi) + '</section>' +
      '<section class="list">' + items + (locked ? '<a class="btn line" href="#pay">' + esc(U('weekMore')) + '</a>' : '') + '</section></div>' + tab('home');
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
        '<a class="btn" href="#pay">' + esc(U('openSaju')) + '</a><div class="small" style="text-align:center">' + esc(U('openSajuS')) + '</div></section>'
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
    var p = prof(), c = chartOf(p), y = tojYear() - (lastYear === true ? 1 : 0), bl = KF.solarToLunar(c.solar.y, c.solar.m, c.solar.d);
    var g = KF.tojeong(bl, y), tj = (TX().toj || (window.KF_TXT.ko || {}).toj || {})[g.code], mn = U('monthNames');
    var isLast = lastYear === true, locked = !isLast && !hasToj(p, y);
    var ms = tj && tj.m ? tj.m.map(function (x) { return x.s; }) : monthScores(c, y);
    var hi = ms.indexOf(Math.max.apply(null, ms)), lo = ms.indexOf(Math.min.apply(null, ms));
    var months = mn.map(function (n, i) { var free = i < 3 || !locked; if (!free) return '';
      return '<div class="item"><div style="display:flex;justify-content:space-between"><b class="serif">' + esc(n) + '</b><span class="mut" style="font-size:13px">' + ms[i] + '</span></div>' + (tj && tj.m ? '<div style="margin-top:4px;font-size:14px;line-height:1.7">' + esc(tj.m[i].t) + '</div>' : '') + '</div>'; }).join('');
    var digit = function (v, l) { return '<span style="width:42px;height:54px;border:1px solid #6E6458;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 24px var(--serif)">' + v + '<small style="font:400 9px var(--sans);color:#B9AE9E">' + esc(l) + '</small></span>'; };
    return bar(U('tojTitle', { y: y, gz: g.yearPillar.ko }), esc(p.name) + ' · ' + esc(U('tojSub'))) +
      '<div class="wrap" style="padding-top:8px"><section class="ink" style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="display:flex;gap:8px">' + digit(g.upper, U('up')) + digit(g.middle, U('mid')) + digit(g.lower, U('low')) + '</div>' +
      '<div style="font-size:12px;color:#B9AE9E">' + esc(U('gwae', { code: g.code })) + '</div>' +
      (tj ? '<div class="serif" style="font-weight:900;font-size:28px;letter-spacing:5px;line-height:1.5;color:var(--gold)">' + esc(tj.h[0]) + '<br>' + esc(tj.h[1]) + '</div><div style="font-size:14px;line-height:1.6;color:#E6DED1">' + esc(tj.hk) + '</div>' : '<div style="color:#B9AE9E">' + esc(U('soonOpen')) + '</div>') + '</section>' +
      (tj ? '<article class="story"><h2 style="margin-bottom:10px">' + esc(U('tojYear')) + '</h2>' + tj.y.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</article>' : '') +
      '<section class="card svgwrap" style="flex-direction:column;padding:14px 6px 10px"><h2 style="font-size:16px;margin:0 8px 6px">' + esc(U('tojMonths')) + '</h2>' + bars(ms, U('monthShort'), null, hi, lo, -1) + '</section>' +
      '<section class="list">' + months + (locked ? '<a class="btn" href="#pay">' + esc(U('tojMore')) + '</a>' : '') +
      (isLast ? '' : '<a class="item" href="#tojeong-last" style="display:flex;justify-content:space-between;align-items:center;color:var(--ink)"><span><b>' + esc(U('tojLast', { y: y - 1 })) + '</b></span><b style="color:var(--wood)">' + esc(U('free')) + '</b></a>') + '</section>' +
      '<section class="item" style="background:var(--soft);font-size:12.5px;line-height:1.7">' + esc(U('tojAbout')) + '</section></div>' + tab('tojeong');
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
    var locked = !isSub();
    return head + '<section class="card" style="display:flex;flex-direction:column;gap:12px;align-items:stretch"><div class="row" style="justify-content:space-around;text-align:center">' +
      '<div><b>' + esc(p.name) + '</b><div style="margin-top:6px">' + miniChars(A) + '</div></div><div class="serif" style="font-weight:900;font-size:44px;color:var(--red)">' + sc.total + '</div><div><b>' + esc(o.name) + '</b><div style="margin-top:6px">' + miniChars(B) + '</div></div></div>' + hbars + '</section>' +
      '<article class="story' + (locked ? ' lock' : '') + '"><p>' + paras[0] + '</p>' + (locked ? '<div class="blur" aria-hidden="true">' + paras.slice(1, 3).map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</div><div class="over">' + esc(U('gungLock')) + '<a class="btn" href="#pay">' + esc(U('subscribeAll')) + '</a></div><div style="height:40px"></div>'
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
      var locked = !isSub();
      out = '<section class="dark" style="text-align:center;display:flex;flex-direction:column;gap:6px;align-items:center"><div class="serif" style="font-size:56px;font-weight:900;line-height:1;color:var(--gold)">' + mark + '</div><div class="lead" style="margin:0">' + esc(verdictTxt) + '</div><div class="mut" style="font-size:12px">' + esc(who.name) + ' · ' + r.score + '</div></section>' +
        '<article class="story' + (locked ? ' lock' : '') + '"><p>' + body[0] + '</p>' + (locked ? '<div class="blur" aria-hidden="true"><p>' + body.slice(1).join('</p><p>') + '</p></div><div class="over">' + esc(U('askLock')) + '<a class="btn" href="#pay">' + esc(U('subscribeAll')) + '</a></div><div style="height:30px"></div>' : '<p>' + body.slice(1).join('</p><p>') + '</p>') + '</article>' +
        '<button class="btn ghost" data-qreset="1">' + esc(a.again) + '</button>';
    }
    return bar(a.title, '', 'ask') + '<div class="wrap" style="padding-top:8px">' + form + out + '</div>' + tab('home');
  }
  function vPay() {
    var y = tojYear();
    return '<div class="bar" style="justify-content:space-between"><div class="t" style="padding-left:8px">' + esc(U('payTitle')) + '</div><a class="back" href="#home" aria-label="close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></a></div>' +
      '<div class="wrap" style="padding-top:8px"><section class="dark" style="display:flex;flex-direction:column;gap:12px;position:relative"><span style="position:absolute;top:-10px;right:16px;background:var(--gold);color:var(--ink);font-size:12px;font-weight:700;border-radius:12px;padding:4px 10px">' + esc(U('payBest')) + '</span>' +
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
        '<div class="row" style="margin-top:8px;gap:8px">' + (p.id === (prof() || {}).id ? '<span class="chip">' + esc(U('current')) + '</span>' : '<button class="pill" data-use="' + p.id + '">' + esc(U('use')) + '</button>') + '<button class="pill" data-del="' + p.id + '">' + esc(U('del')) + '</button></div></div>'; }).join('');
    return bar(U('meTitle')) + '<div class="wrap" style="padding-top:8px"><section class="list">' + list + '</section><a class="btn ghost" href="#start">' + esc(U('add')) + '</a></div>' + tab('me');
  }

  var F = { cal: 'solar', leap: false, gender: 'F', unknown: false };
  function vStart() {
    var opts = PLACES.map(function (x, i) { return '<option value="' + i + '">' + esc(S.lang === 'ko' ? x[0] : x[1]) + ' (UTC' + (x[2] >= 0 ? '+' : '') + (x[2] / 60) + ')</option>'; }).join('');
    return '<div class="wrap" style="padding-top:calc(24px + env(safe-area-inset-top,0px));gap:16px">' + (S.profiles.length ? '<a class="back" href="#home" aria-label="back" style="margin-left:-12px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a>' : '<div class="brand"><div class="seal">運</div><b>' + esc(U('app')) + '</b></div>') +
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

  /* ── 라우터 ── */
  var R = { q: '' };
  function render() {
    var h = (location.hash || '#home').slice(1), hq = h.split('?'); h = hq[0]; R.q = hq[1] || '';
    if (h !== 'ask') { Q.kind = null; Q.shown = false; }
    if (!S.profiles.length && h !== 'about') h = 'start';
    var v = { home: vHome, today: vToday, week: vWeek, saju: vSaju, year: vYear, tojeong: function () { return vTojeong(); }, 'tojeong-last': function () { return vTojeong(true); }, pay: vPay, about: vAbout, gung: vGung, ask: vAsk, me: vMe, start: vStart }[h] || vHome;
    document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr';
    try { app.innerHTML = v(); } catch (x) { console.error(x); app.innerHTML = '<div class="wrap" style="padding-top:40px"><p>' + esc(x.message) + '</p><a class="btn" href="#me">' + esc(U('meTitle')) + '</a></div>'; }
    window.scrollTo(0, 0);
    var f = document.getElementById('f'); if (f) f.addEventListener('submit', submitStart);
  }
  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cal],[data-g],[data-lang],[data-use],[data-del],[data-buy],[data-gt],[data-go],[data-q],[data-qw],[data-qgo],[data-qreset]'); if (!t) return;
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
  });
  function keepQ() { var qd = document.getElementById('qd'); if (qd) Q.date = qd.value; render(); }
  function keepForm() { var ids = ['nm', 'bd', 'bt', 'pl'], v = {}; ids.forEach(function (i) { var el = document.getElementById(i); if (el) v[i] = el.value; }); var tu = (document.getElementById('tu') || {}).checked;
    render(); ids.forEach(function (i) { var el = document.getElementById(i); if (el && v[i] != null) el.value = v[i]; }); if (tu) document.getElementById('tu').checked = true; }
  function setLang(l) {
    S.lang = l; save();
    if (window.KF_TXT[l] || l === 'ko') return render();
    var files = ['ui', 'daily', 'saju', 'ilju', 'toj', 'gung'], n = files.length;
    window.KF_TXT[l] = window.KF_TXT[l] || {};
    files.forEach(function (f) { var s = document.createElement('script'); s.src = 'data/' + l + '/' + f + '.js?v=' + (window.KF_VER || 1); s.onload = s.onerror = function () { if (--n === 0) render(); }; document.head.appendChild(s); });
  }
  window.addEventListener('hashchange', render);
  window.KF_APP = { render: render, state: S, save: save, prof: prof, U: U };
  if (S.lang !== 'ko' && !window.KF_TXT[S.lang]) setLang(S.lang); else render();
})();
