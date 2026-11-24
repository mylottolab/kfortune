/* KoreanFortune — 결제 (웹: KG이니시스 카드 · PayPal) · 구매 확인 · 복원
   서버: 로또앱 서버의 /api/fortune/* (같은 이니시스 상점 · 같은 PayPal 계정) */
(function () {
  'use strict';
  var API = 'https://my-lotto-lab-api.onrender.com/api/fortune';
  var A = window.KF_APP; if (!A) return;
  var esc = A.esc;

  var T = {
    ko: { appNote: '앱에서는 구글 플레이로 결제합니다. 홈페이지(koreanfortune.kr)에서 산 것은 「구매 복원」으로 앱에서도 열 수 있습니다.', refund: '결제하면 바로 열립니다. 열어 보기 전이면 7일 안에 전액 환불되고, 열어 본 뒤에는 청약철회가 제한될 수 있습니다.', open: '열어 보기', title: '결제', email: '이메일 (영수증 · 다른 기기에서 복원할 때 필요)', emailErr: '이메일을 확인해 주세요.', card: '카드 결제 · KG이니시스 (원화)', paypal: 'PayPal (달러)', or: '또는',
      wait: '결제 준비 중입니다… 처음엔 30초쯤 걸릴 수 있어요.', fail: '결제를 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.', close: '닫기', forWho: '{name}님 사주',
      okT: '결제가 완료되었습니다', okS: '바로 열어 드렸어요. 주문번호를 적어 두시면 다른 기기에서 「구매 복원」으로 열 수 있습니다.', order: '주문번호',
      failT: '결제가 완료되지 않았습니다', failS: '카드에서 돈이 빠져나가지 않았습니다. 다시 시도해 주세요.', home: '처음으로', retry: '다시 시도',
      rT: '구매 복원', rL: '결제할 때 쓴 이메일과 주문번호(영수증에 있음)를 넣어 주세요. 이 기기에서도 열립니다.', rBtn: '복원하기', rOk: '복원되었습니다.', rNo: '일치하는 구매를 찾지 못했습니다. 이메일과 주문번호를 확인해 주세요.' },
    en: { appNote: 'In the app, purchases are made through Google Play. Anything bought on koreanfortune.kr can be opened here with “Restore purchases”.', refund: 'It unlocks right after payment. Full refund within 7 days if not yet opened; once viewed, refunds may be limited.', open: 'Open it', title: 'Checkout', email: 'Email (for your receipt and restoring on other devices)', emailErr: 'Please check your email.', card: 'Card · KG Inicis (KRW)', paypal: 'PayPal (USD)', or: 'or',
      wait: 'Preparing payment… the first time can take about 30 seconds.', fail: 'Couldn’t start the payment. Please try again shortly.', close: 'Close', forWho: 'Saju of {name}',
      okT: 'Payment complete', okS: 'It’s unlocked now. Keep your order number to restore it on another device.', order: 'Order no.',
      failT: 'Payment not completed', failS: 'You were not charged. Please try again.', home: 'Home', retry: 'Try again',
      rT: 'Restore purchases', rL: 'Enter the email you paid with and the order number from your receipt to unlock on this device.', rBtn: 'Restore', rOk: 'Restored.', rNo: 'No matching purchase found. Please check the email and order number.' },
    ja: { appNote: 'アプリではGoogle Playでお支払いいただきます。koreanfortune.krで購入したものは「購入の復元」でアプリでも開けます。', refund: 'お支払い後すぐに開きます。未閲覧なら7日以内に全額返金、閲覧後は返金が制限される場合があります。', open: '開いて見る', title: 'お支払い', email: 'メール（領収書・他の端末での復元用）', emailErr: 'メールアドレスをご確認ください。', card: 'カード · KGイニシス（ウォン）', paypal: 'PayPal（ドル）', or: 'または',
      wait: '決済を準備中です… 初回は30秒ほどかかることがあります。', fail: '決済を開始できませんでした。しばらくしてからお試しください。', close: '閉じる', forWho: '{name}さんの四柱',
      okT: 'お支払いが完了しました', okS: 'すぐに開きました。注文番号を控えておくと、他の端末で「購入の復元」ができます。', order: '注文番号',
      failT: 'お支払いが完了しませんでした', failS: '請求はされていません。もう一度お試しください。', home: 'ホームへ', retry: 'もう一度',
      rT: '購入の復元', rL: 'お支払いに使ったメールと、領収書の注文番号を入力してください。この端末でも開けます。', rBtn: '復元する', rOk: '復元しました。', rNo: '該当する購入が見つかりません。メールと注文番号をご確認ください。' },
    'zh-Hans': { appNote: '在应用内通过 Google Play 付款。在 koreanfortune.kr 购买的内容可用「恢复购买」在应用中打开。', refund: '付款后立即解锁。未查看前7天内可全额退款，查看后退款可能受限。', open: '打开查看', title: '付款', email: '电子邮箱（用于收据及在其他设备恢复）', emailErr: '请检查邮箱地址。', card: '银行卡 · KG Inicis（韩元）', paypal: 'PayPal（美元）', or: '或',
      wait: '正在准备付款… 首次可能需要约30秒。', fail: '无法开始付款，请稍后再试。', close: '关闭', forWho: '{name}的八字',
      okT: '付款完成', okS: '已为你解锁。记下订单号，可在其他设备用「恢复购买」打开。', order: '订单号',
      failT: '付款未完成', failS: '未产生扣款，请再试一次。', home: '回到首页', retry: '再试一次',
      rT: '恢复购买', rL: '请输入付款时使用的邮箱和收据上的订单号，即可在本设备打开。', rBtn: '恢复', rOk: '已恢复。', rNo: '找不到相符的购买，请检查邮箱与订单号。' },
    'zh-Hant': { appNote: '在應用內透過 Google Play 付款。在 koreanfortune.kr 購買的內容可用「恢復購買」在應用中開啟。', refund: '付款後立即解鎖。未查看前7天內可全額退款，查看後退款可能受限。', open: '打開查看', title: '付款', email: '電子郵件（用於收據及在其他裝置恢復）', emailErr: '請檢查電子郵件地址。', card: '信用卡 · KG Inicis（韓元）', paypal: 'PayPal（美元）', or: '或',
      wait: '正在準備付款… 首次可能需要約30秒。', fail: '無法開始付款，請稍後再試。', close: '關閉', forWho: '{name}的八字',
      okT: '付款完成', okS: '已為你解鎖。記下訂單號碼，可在其他裝置用「恢復購買」開啟。', order: '訂單號碼',
      failT: '付款未完成', failS: '未產生扣款，請再試一次。', home: '回到首頁', retry: '再試一次',
      rT: '恢復購買', rL: '請輸入付款時使用的電子郵件和收據上的訂單號碼，即可在本裝置開啟。', rBtn: '恢復', rOk: '已恢復。', rNo: '找不到相符的購買，請檢查電子郵件與訂單號碼。' },
    de: { appNote: 'In der App wird über Google Play bezahlt. Was auf koreanfortune.kr gekauft wurde, lässt sich hier mit „Käufe wiederherstellen“ öffnen.', refund: 'Nach der Zahlung sofort freigeschaltet. Volle Erstattung innerhalb von 7 Tagen, solange noch nicht geöffnet; danach kann die Erstattung eingeschränkt sein.', open: 'Öffnen', title: 'Bezahlen', email: 'E-Mail (für Beleg und Wiederherstellung auf anderen Geräten)', emailErr: 'Bitte prüfe deine E-Mail.', card: 'Karte · KG Inicis (KRW)', paypal: 'PayPal (USD)', or: 'oder',
      wait: 'Zahlung wird vorbereitet… beim ersten Mal kann es etwa 30 Sekunden dauern.', fail: 'Die Zahlung konnte nicht gestartet werden. Bitte versuch es gleich noch einmal.', close: 'Schließen', forWho: 'Saju von {name}',
      okT: 'Zahlung abgeschlossen', okS: 'Jetzt freigeschaltet. Bewahre die Bestellnummer auf, um auf einem anderen Gerät wiederherzustellen.', order: 'Bestellnr.',
      failT: 'Zahlung nicht abgeschlossen', failS: 'Es wurde nichts abgebucht. Bitte versuch es noch einmal.', home: 'Start', retry: 'Erneut versuchen',
      rT: 'Käufe wiederherstellen', rL: 'Gib die E-Mail der Zahlung und die Bestellnummer vom Beleg ein, um auf diesem Gerät freizuschalten.', rBtn: 'Wiederherstellen', rOk: 'Wiederhergestellt.', rNo: 'Kein passender Kauf gefunden. Bitte prüfe E-Mail und Bestellnummer.' },
    fr: { appNote: 'Dans l’application, les achats passent par Google Play. Ce qui a été acheté sur koreanfortune.kr s’ouvre ici avec « Restaurer les achats ».', refund: 'Débloqué dès le paiement. Remboursement complet sous 7 jours si non ouvert ; une fois consulté, le remboursement peut être limité.', open: 'Ouvrir', title: 'Paiement', email: 'E-mail (pour le reçu et la restauration sur d’autres appareils)', emailErr: 'Vérifiez votre e-mail.', card: 'Carte · KG Inicis (KRW)', paypal: 'PayPal (USD)', or: 'ou',
      wait: 'Préparation du paiement… la première fois, cela peut prendre environ 30 secondes.', fail: 'Impossible de lancer le paiement. Réessayez dans un instant.', close: 'Fermer', forWho: 'Saju de {name}',
      okT: 'Paiement effectué', okS: 'C’est débloqué. Gardez le numéro de commande pour restaurer sur un autre appareil.', order: 'N° de commande',
      failT: 'Paiement non effectué', failS: 'Vous n’avez pas été débité. Réessayez.', home: 'Accueil', retry: 'Réessayer',
      rT: 'Restaurer les achats', rL: 'Saisissez l’e-mail utilisé pour payer et le numéro de commande du reçu pour débloquer sur cet appareil.', rBtn: 'Restaurer', rOk: 'Restauré.', rNo: 'Aucun achat correspondant. Vérifiez l’e-mail et le numéro de commande.' },
    id: { appNote: 'Di aplikasi, pembelian dilakukan lewat Google Play. Yang dibeli di koreanfortune.kr bisa dibuka di sini dengan “Pulihkan pembelian”.', refund: 'Langsung terbuka setelah bayar. Uang kembali penuh dalam 7 hari bila belum dibuka; setelah dilihat, pengembalian bisa dibatasi.', open: 'Buka', title: 'Pembayaran', email: 'Email (untuk bukti bayar dan pemulihan di perangkat lain)', emailErr: 'Tolong periksa email-mu.', card: 'Kartu · KG Inicis (KRW)', paypal: 'PayPal (USD)', or: 'atau',
      wait: 'Menyiapkan pembayaran… pertama kali bisa sekitar 30 detik.', fail: 'Pembayaran tidak bisa dimulai. Coba lagi sebentar lagi.', close: 'Tutup', forWho: 'Saju {name}',
      okT: 'Pembayaran berhasil', okS: 'Sudah terbuka. Simpan nomor pesanan untuk memulihkan di perangkat lain.', order: 'No. pesanan',
      failT: 'Pembayaran belum selesai', failS: 'Tidak ada tagihan. Silakan coba lagi.', home: 'Beranda', retry: 'Coba lagi',
      rT: 'Pulihkan pembelian', rL: 'Masukkan email yang dipakai membayar dan nomor pesanan dari bukti bayar untuk membuka di perangkat ini.', rBtn: 'Pulihkan', rOk: 'Berhasil dipulihkan.', rNo: 'Pembelian tidak ditemukan. Periksa email dan nomor pesanan.' },
    th: { appNote: 'ในแอป ชำระผ่าน Google Play สิ่งที่ซื้อบน koreanfortune.kr เปิดที่นี่ได้ด้วย “กู้คืนการซื้อ”', refund: 'ปลดล็อกทันทีหลังชำระ คืนเงินเต็มจำนวนภายใน 7 วันหากยังไม่ได้เปิด หลังเปิดดูแล้วอาจคืนเงินได้จำกัด', open: 'เปิดดู', title: 'ชำระเงิน', email: 'อีเมล (สำหรับใบเสร็จและกู้คืนบนอุปกรณ์อื่น)', emailErr: 'กรุณาตรวจสอบอีเมล', card: 'บัตร · KG Inicis (วอน)', paypal: 'PayPal (ดอลลาร์)', or: 'หรือ',
      wait: 'กำลังเตรียมการชำระเงิน… ครั้งแรกอาจใช้เวลาประมาณ 30 วินาที', fail: 'เริ่มการชำระเงินไม่ได้ กรุณาลองใหม่อีกครั้ง', close: 'ปิด', forWho: 'ซาจูของ {name}',
      okT: 'ชำระเงินเรียบร้อย', okS: 'ปลดล็อกแล้ว เก็บหมายเลขคำสั่งซื้อไว้เพื่อกู้คืนบนอุปกรณ์อื่น', order: 'หมายเลขคำสั่งซื้อ',
      failT: 'การชำระเงินไม่สำเร็จ', failS: 'ไม่มีการตัดเงิน กรุณาลองอีกครั้ง', home: 'หน้าแรก', retry: 'ลองอีกครั้ง',
      rT: 'กู้คืนการซื้อ', rL: 'กรอกอีเมลที่ใช้ชำระและหมายเลขคำสั่งซื้อจากใบเสร็จ เพื่อปลดล็อกบนอุปกรณ์นี้', rBtn: 'กู้คืน', rOk: 'กู้คืนเรียบร้อย', rNo: 'ไม่พบการซื้อที่ตรงกัน กรุณาตรวจสอบอีเมลและหมายเลขคำสั่งซื้อ' },
    es: { appNote: 'En la app, las compras se hacen con Google Play. Lo comprado en koreanfortune.kr se puede abrir aquí con «Restaurar compras».', refund: 'Se desbloquea al pagar. Reembolso total en 7 días si aún no lo has abierto; una vez visto, el reembolso puede limitarse.', open: 'Abrir', title: 'Pago', email: 'Correo (para el recibo y restaurar en otros dispositivos)', emailErr: 'Revisa tu correo, por favor.', card: 'Tarjeta · KG Inicis (KRW)', paypal: 'PayPal (USD)', or: 'o',
      wait: 'Preparando el pago… la primera vez puede tardar unos 30 segundos.', fail: 'No se pudo iniciar el pago. Inténtalo de nuevo en un momento.', close: 'Cerrar', forWho: 'Saju de {name}',
      okT: 'Pago completado', okS: 'Ya está desbloqueado. Guarda el número de pedido para restaurarlo en otro dispositivo.', order: 'N.º de pedido',
      failT: 'El pago no se completó', failS: 'No se te ha cobrado. Inténtalo de nuevo.', home: 'Inicio', retry: 'Reintentar',
      rT: 'Restaurar compras', rL: 'Escribe el correo con el que pagaste y el número de pedido del recibo para desbloquear en este dispositivo.', rBtn: 'Restaurar', rOk: 'Restaurado.', rNo: 'No encontramos esa compra. Revisa el correo y el número de pedido.' }
  };
  function t(k, v) { var L = T[A.lang()] || T.en; var s = L[k] != null ? L[k] : T.en[k]; return v ? s.replace(/\{(\w+)\}/g, function (m, x) { return v[x] != null ? v[x] : m; }) : s; }
  function ls(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  // 기기 번호 (처음 한 번 만들고 계속 씀)
  var uid = ls('kf_uid');
  if (!uid || !/^[A-Za-z0-9_-]{16,64}$/.test(uid)) {
    var a = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach(function (_, i) { a[i] = Math.random() * 256 | 0; });
    uid = 'kf' + Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); ls('kf_uid', uid);
  }

  function api(path, body) {
    var o = body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {};
    return fetch(API + path, o).then(function (r) { return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || r.status); return d; }); });
  }
  function sync() { return api('/ent?uid=' + uid).then(A.setEnt).catch(function () {}); }

  // 가격 표시
  var PRICES = ls('kf_prices');
  // ── 앱(구글 플레이) 안에서: 결제는 구글 플레이로만 ──
  var GP = { sub: 'kf_year', saju: 'kf_saju', toj: 'kf_toj' }, NPRICE = {}, SEEN = {};
  var NATIVE = window.KFNative || null;
  (function () {   // 안드로이드 앱(Capacitor) — 플러그인 KFBilling
    var C = window.Capacitor;
    if (NATIVE || !C || !C.isNativePlatform || !C.isNativePlatform() || C.getPlatform() !== 'android') return;
    var P = C.registerPlugin ? C.registerPlugin('KFBilling') : (C.Plugins || {}).KFBilling; if (!P) return;
    NATIVE = { ready: function () { return P.ready(); }, buy: function (s, u) { return P.buy({ sku: s, accountId: u }); }, consume: function (t) { return P.consume({ token: t }); } };
    P.addListener('native', function (d) { onNative(d && d.json); });
    P.addListener('prices', function (d) { onPrices(d && d.prices); });
  })();
  function fmt(k) { if (NATIVE && NPRICE[GP[k]]) return NPRICE[GP[k]]; var p = PRICES && PRICES[k]; if (!p) return '—'; return A.lang() === 'ko' ? '₩' + p.krw.toLocaleString('ko-KR') : '$' + p.usd; }
  function fillPrices() { document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = fmt(el.dataset.price); }); }
  function loadPrices() { return api('/products').then(function (d) { PRICES = d; ls('kf_prices', d); fillPrices(); }).catch(function () {}); }

  // ── 결제 시트 ──
  var sheet = null;
  function closeSheet() { if (sheet) { sheet.remove(); sheet = null; } }
  function buy(kind, p, year) {
    if (NATIVE) return nativeBuy(kind, p, year);
    if (!p && kind !== 'sub') { location.hash = '#start'; return; }
    closeSheet();
    var U = A.U, label = kind === 'sub' ? U('payYear') : kind === 'saju' ? U('paySaju') : U('payToj', { y: year });
    var who = kind === 'sub' ? '' : '<div class="small">' + esc(t('forWho', { name: p.name })) + '</div>';
    sheet = document.createElement('div'); sheet.className = 'sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px">' +
      '<div class="row" style="justify-content:space-between"><b class="serif" style="font-size:18px">' + esc(label) + '</b><b class="serif" style="font-size:18px">' + esc(fmt(kind)) + '</b></div>' + who +
      '<label for="pe" style="font-size:13px;font-weight:700">' + esc(t('email')) + '</label><input class="in" id="pe" type="email" autocomplete="email" inputmode="email" value="' + esc(ls('kf_email') || '') + '">' +
      '<div class="small" id="pm" hidden style="color:var(--red)"></div>' +
      '<button class="btn" id="pcard">' + esc(t('card')) + ' · ' + (PRICES ? '₩' + PRICES[kind].krw.toLocaleString('ko-KR') : '') + '</button>' +
      '<div class="small" style="text-align:center">' + esc(t('or')) + ' · ' + esc(t('paypal')) + (PRICES ? ' $' + PRICES[kind].usd : '') + '</div><div id="ppbox" style="min-height:48px"></div>' +
      '<div class="small" style="line-height:1.6">' + esc(t('refund')) + ' <a href="terms.html" target="_blank" rel="noopener">' + esc(A.U('terms')) + '</a></div>' +
      '<button class="btn ghost" id="pclose">' + esc(t('close')) + '</button></div>';
    document.body.appendChild(sheet);
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });
    sheet.querySelector('#pclose').onclick = closeSheet;
    var order = function () {
      var em = sheet.querySelector('#pe').value.trim();
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(em)) { msg(t('emailErr')); sheet.querySelector('#pe').focus(); return null; }
      ls('kf_email', em);
      return { uid: uid, product: kind, bkey: p ? A.bkey(p) : null, year: kind === 'toj' ? year : null, email: em, name: p ? p.name : '', lang: A.lang() };
    };
    function msg(s) { var m = sheet && sheet.querySelector('#pm'); if (m) { m.textContent = s; m.hidden = !s; } }
    sheet.querySelector('#pcard').onclick = function () {
      var o = order(); if (!o) return; var btn = this; btn.disabled = true; msg(t('wait'));
      Promise.all([api('/inicis/prepare', o), loadScript('https://paypro.inicis.com/std/payment/js/INIPayPro_v2.js')]).then(function (r) {
        var d = r[0]; ls('kf_last', { kind: kind, oid: d.oid });
        window.INIPayPro.requestPayment({ P_MID: d.mid, P_OID: d.oid, P_PAY_TYPE: 'CARD', P_DEVICE_TYPE: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'MOBILE' : 'WEB',
          P_IDCCODE: 'Y', P_AMT: d.amt, P_GOODS: d.goodname, P_UNAME: d.buyername, P_MOBILE: '', P_EMAIL: d.buyeremail, P_NEXT_URL: d.nextUrl, P_NOTI_URL: d.notiUrl,
          P_CLOSE_URL: d.closeUrl, P_CHARSET: 'UTF-8', P_TIMESTAMP: d.timestamp, P_CHKFAKE: d.chkfake });
        msg(''); btn.disabled = false;
      }).catch(function (e) { msg(t('fail') + ' (' + (e && e.message ? e.message : 'script') + ')'); btn.disabled = false; });
    };
    paypalButtons(order, msg, kind);
  }

  var scripts = {};
  function loadScript(src) {
    return scripts[src] || (scripts[src] = new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.charset = 'UTF-8'; s.onload = ok; s.onerror = function () { delete scripts[src]; no(new Error('INIpay script')); }; document.head.appendChild(s); }));
  }
  function paypalButtons(order, msg, kind) {
    var loc = { ko: 'ko_KR', ja: 'ja_JP', 'zh-Hans': 'zh_CN', 'zh-Hant': 'zh_TW', es: 'es_ES' }[A.lang()] || 'en_US';
    api('/paypal/client-id').then(function (d) {
      return loadScript('https://www.paypal.com/sdk/js?client-id=' + encodeURIComponent(d.clientId) + '&currency=USD&intent=capture&locale=' + loc);
    }).then(function () {
      if (!sheet || !window.paypal) return;
      var cur = null;
      window.paypal.Buttons({
        style: { layout: 'horizontal', height: 48, tagline: false },
        onClick: function (data, actions) { cur = order(); return cur ? actions.resolve() : actions.reject(); },
        createOrder: function () { return api('/paypal/create', cur).then(function (r) { ls('kf_last', { kind: kind, oid: r.id }); return r.id; }); },
        onApprove: function (data) { return api('/paypal/capture', { orderID: data.orderID }).then(function () { closeSheet(); location.hash = '#paid?ok=1&oid=' + encodeURIComponent(data.orderID); }); },
        onError: function () { msg(t('fail')); }
      }).render(sheet.querySelector('#ppbox'));
    }).catch(function () { var b = sheet && sheet.querySelector('#ppbox'); if (b) b.innerHTML = ''; });
  }

  // ── 결제 결과 화면 (#paid?ok=1&oid=…) ──
  function vPaid(q) {
    var P = {}; String(q || '').split('&').forEach(function (kv) { var i = kv.indexOf('='); if (i > 0) P[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1)); });
    var ok = P.ok === '1', last = ls('kf_last') || {};
    var go = last.kind === 'saju' ? '#saju' : last.kind === 'toj' ? '#tojeong' : '#home';
    if (ok) sync();
    return '<div class="wrap" style="padding-top:48px;display:flex;flex-direction:column;gap:14px;text-align:center">' +
      '<div class="serif" style="font-size:44px;font-weight:900;color:' + (ok ? 'var(--indigo)' : 'var(--red)') + '">' + (ok ? '○' : '✕') + '</div>' +
      '<h1 class="serif" style="font-size:22px;margin:0">' + esc(t(ok ? 'okT' : 'failT')) + '</h1><p style="margin:0;line-height:1.7">' + esc(t(ok ? 'okS' : 'failS')) + '</p>' +
      (ok && P.oid ? '<div class="item"><span class="small">' + esc(t('order')) + '</span><div style="font:600 15px ui-monospace,monospace;user-select:all;word-break:break-all">' + esc(P.oid) + '</div></div>' : '') +
      '<a class="btn" href="' + (ok ? go : '#pay') + '">' + esc(ok ? t('open') : t('retry')) + '</a><a class="btn ghost" href="#home">' + esc(t('home')) + '</a></div>';
  }

  // ── 구매 복원 (#restore) ──
  function vRestore() {
    return '<div class="bar"><a class="back" href="#pay" aria-label="back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></a><div class="t">' + esc(t('rT')) + '</div></div>' +
      '<div class="wrap" style="padding-top:8px"><form id="rf" class="card" style="display:flex;flex-direction:column;gap:10px"><p style="margin:0;font-size:14px;line-height:1.7">' + esc(t('rL')) + '</p>' +
      '<input class="in" id="re" type="email" autocomplete="email" placeholder="email@example.com" value="' + esc(ls('kf_email') || '') + '"><input class="in" id="ro" placeholder="' + esc(t('order')) + '" autocapitalize="characters">' +
      '<div class="small" id="rm" hidden></div><button class="btn" type="submit">' + esc(t('rBtn')) + '</button></form></div>';
  }

  function nativeBuy(kind, p, year) {
    if (!p && kind !== 'sub') { location.hash = '#start'; return; }
    var pend = { kind: kind, productId: GP[kind], bkey: p ? A.bkey(p) : null, year: kind === 'toj' ? year : null };
    ls('kf_pending', pend);
    try { NATIVE.buy(GP[kind], uid); } catch (e) { toast(t('fail')); }
  }
  // 앱이 결제 결과를 알려 줌: { status: 'ok'|'cancel'|'error', productId, purchaseToken, orderId, recovered }
  function onNative(r) {
    if (typeof r === 'string') { try { r = JSON.parse(r); } catch (e) { return; } }
    if (!r || r.status !== 'ok') { if (r && r.status === 'error') toast(t('fail')); return; }
    if (SEEN[r.purchaseToken]) return; SEEN[r.purchaseToken] = 1;
    var pend = ls('kf_pending') || {};
    if (pend.productId && pend.productId !== r.productId) pend = {};
    toast(t('wait'));
    api('/google/verify', { uid: uid, productId: r.productId, purchaseToken: r.purchaseToken, bkey: pend.bkey || null, year: pend.year || null, lang: A.lang() })
      .then(function () {
        try { NATIVE.consume(r.purchaseToken); } catch (e) {}
        ls('kf_pending', null); ls('kf_last', { kind: pend.kind || 'sub', oid: r.orderId });
        var tt = document.getElementById('kftoast'); if (tt) tt.hidden = true;
        sync(); location.hash = '#paid?ok=1&oid=' + encodeURIComponent(r.orderId || '');
      })
      .catch(function () { delete SEEN[r.purchaseToken]; toast(t('fail')); });   // 소비하지 않음 → 다음에 앱을 켤 때 다시 확인
  }
  function onPrices(m) { if (typeof m === 'string') { try { m = JSON.parse(m); } catch (e) { return; } } NPRICE = m || {}; fillPrices(); }
  function toast(msg) {
    var el = document.getElementById('kftoast');
    if (!el) { el = document.createElement('div'); el.id = 'kftoast'; el.setAttribute('role', 'status'); el.style.cssText = 'position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);max-width:88%;background:#221C16;color:#F4EEE3;padding:12px 16px;border-radius:12px;font-size:14px;z-index:30;text-align:center'; document.body.appendChild(el); }
    el.textContent = msg; el.hidden = false; clearTimeout(el._t); el._t = setTimeout(function () { el.hidden = true; }, 4000);
  }

  function after(h) {
    if (h === 'pay' && NATIVE) { var nt = document.querySelector('.wrap .item'); if (nt) nt.textContent = t('appNote'); }
    if (h === 'pay') { fillPrices(); if (!PRICES) loadPrices(); }
    if (h === 'restore') {
      var f = document.getElementById('rf'); if (!f) return;
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var m = document.getElementById('rm'), em = document.getElementById('re').value.trim(), oid = document.getElementById('ro').value.trim();
        m.hidden = false; m.style.color = 'var(--mute)'; m.textContent = t('wait');
        api('/restore', { uid: uid, email: em, oid: oid }).then(function () { ls('kf_email', em); m.style.color = 'var(--indigo)'; m.textContent = t('rOk'); return sync(); })
          .catch(function () { m.style.color = 'var(--red)'; m.textContent = t('rNo'); });
      });
    }
  }

  window.KF_PAY = { buy: buy, vPaid: vPaid, vRestore: vRestore, after: after, sync: sync, uid: uid, onNative: onNative, onPrices: onPrices, app: !!NATIVE };
  if (NATIVE) { try { NATIVE.ready(); } catch (e) {} }   // 앱: 가격 알려 주기 · 끝나지 않은 결제 다시 보내기
  window.addEventListener('hashchange', closeSheet);
  loadPrices(); sync();
  var h0 = (location.hash || '').slice(1).split('?')[0];
  if (h0 === 'paid' || h0 === 'restore') A.render(); else after(h0);
})();
