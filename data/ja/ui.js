/* 画面の文字（日本語） */
(window.KF_TXT = window.KF_TXT || {}).ja = Object.assign((window.KF_TXT || {}).ja || {}, { ui: {
  app: 'KoreanFortune 韓国運勢', lang: 'JA · 日本語',
  tabToday: '今日', tabSaju: '四柱', tabTojeong: '土亭秘訣', tabMe: '私・家族',
  wTitle: '伝統の型に、\n新しく書いた韓国の運勢', wLead: '毎朝、今日すべきことを一行でお伝えします。', wF: ['今日・今週の運勢 — 無料', '生涯の四柱 · 10年大運', '土亭秘訣144卦 · 12か月', '相性 · 質問に○△✕'], wStart: 'はじめる', wLang: '言語',
  close: '閉じる', startKicker: '最初の一度だけ', startTitle: '生まれた時を教えてください',
  startLead: '四柱は、生まれた年・月・日・時の四つの柱で立てます。一度入力すれば、すべての占いに使われます。',
  startTag: '伝統の型の上に、私たちだけの新しい解釈 — 今日なにをすればよいかを教える運勢の指針',
  name: 'お名前', namePh: '例：みな', birth: '生年月日', solar: '新暦', lunar: '旧暦', leap: '閏月',
  time: '生まれた時刻', timeUnknown: '不明', timeHint: '時刻が分からない場合は六文字で読みます',
  gender: '性別', female: '女性', male: '男性', place: '生まれた場所', placeHint: '海外生まれの方はその都市を選んでください。現地時間で計算します。',
  build: '私の四柱を立てる', privacy: '生年月日はこの端末にだけ保存されます。',
  errDate: '日付をもう一度ご確認ください。',
  hello: '{name}さん、今日は', todayMore: '今日の運勢をくわしく見る', oneLine: '今日のひとこと', total: '総合運',
  mySaju: '私の四柱', dm: '日干',
  mSaju: '四柱推命', mSajuS: '一生の鑑定', mToj: '{y} 土亭秘訣', mTojS: '十二か月', mWeek: '週間運勢', mYear: '今年の運勢', mYearS: '巡ってくる気',
  mGung: '相性', mGungS: '準備中', mGungS2: 'ふたりの縁', mAsk: '質問してみる', mAskS: '家を売る？合格する？あの人と合う？ — ○△✕ですぐ答えます',
  gungLock: 'ふたりの物語の全文と金運の相性・未来をお伝えします', askLock: '理由と一番よい時期までお伝えします',
  mAbout: '四柱とは？', mAboutS: '韓国文化の案内',
  todayTitle: '今日の運勢', storyTitle: '今日の物語', timeTitle: '時間帯', bestSlot: '一番よい',
  lucky: '今日の開運', color: '色', number: '数字', direction: '方角', doIt: 'やってみよう', avoid: '気をつけよう',
  lotto: 'ラッキーナンバーで今週のロト番号をつくる ›', areasTitle: '分野別にくわしく', areasLock: '金運・仕事・対人・恋愛・健康、五つの分野をすべてお読みします',
  subscribeAll: 'すべて開く',
  weekTitle: '週間運勢', weekStory: '今週の物語', weekMore: '曜日ごとにくわしく見る（1年利用券）', best: '最高',
  sajuTitle: '四柱推命・一生の鑑定', pillarsH: ['時 時柱', '日 日柱・私', '月 月柱', '年 年柱'], tapHint: '文字をタップすると意味と読みが出ます',
  fiveTitle: '五行', none: 'なし', daeunTitle: '十年ごとに変わる大きな流れ・大運', now: '今', age: '{n}歳',
  deeper: 'さらに深く', openSaju: '一生の鑑定をすべて開く', openSajuS: '一度開けば一生読み返せます・1年利用券なら無料',
  tojTitle: '{y}年 土亭秘訣', tojSub: '旧暦の誕生日から引いた一年の卦', gwae: '144卦のうち {code}卦', up: '上卦', mid: '中卦', low: '下卦',
  tojYear: '一年の総評', tojMonths: '十二か月の運勢の流れ', tojMore: '残りの月を見る', tojLast: '昨年（{y}）の土亭秘訣・当たったか振り返る', free: '無料',
  tojAbout: '土亭秘訣とは？ 朝鮮中期の学者・土亭 李之菡（1517〜1578）が著したと伝わる一年の運勢書です。旧暦の生年月日から三桁の数を得て144卦から一つを選び、正月から十二月まで月ごとの運を読みます。',
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  payTitle: 'すべての運勢を開く', payYear: '1年利用券', payBest: '一番人気', payPer: '／1年',
  payF: ['今日・週間の運勢を五分野すべて、毎日', '一生の四柱鑑定のすべて＋十年の大運', '今年の運勢・土亭秘訣の十二か月', '相性・質問コーナー、家族5人まで'],
  payStart: '1年利用券をはじめる', payOne: 'ひとつだけなら・都度購入', paySaju: '一生の四柱鑑定', paySajuS: '一度開けば一生読み返せる', payToj: '{y} 土亭秘訣', payTojS: '総評＋十二か月、その年のあいだ',
  payNote: 'アプリではApp Store・Google Playで、ウェブではカード（KGイニシス）またはPayPalでお支払いいただけます。他の端末では、同じメールで「購入の復元」をすると開けます。',
  restore: '購入を復元', terms: '利用規約', privacyL: 'プライバシー', autoRenew: '1年利用券は1回のお支払いで1年間使え、自動更新はありません。',
  meTitle: '私・家族', add: '＋ 家族・友人を追加', use: 'この人で見る', del: '削除', current: '表示中',
  aboutTitle: '四柱とは？・韓国文化の案内', langTitle: '言語を選ぶ', soon: '近日',
  aboutBody: '韓国では昔から、生まれた年・月・日・時を四本の柱（四柱）として立て、それぞれに天の文字と地の文字を一つずつ合わせた八文字（八字）で人の気質を読んできました。',
  stemsL: '天の文字 10', branchesL: '地の文字 12', fiveL: '五つの気', cycle: '木は火を生み、火は土を、土は金を、金は水を、水はまた木を生みます',
  hanjaNote: 'どの言語で見ても八文字は漢字のまま、読みと意味を添えてお見せします。',
  ten: ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '偏官', '正官', '偏印', '印綬'],
  stemRead: ['きのえ', 'きのと', 'ひのえ', 'ひのと', 'つちのえ', 'つちのと', 'かのえ', 'かのと', 'みずのえ', 'みずのと'], branchRead: ['ね', 'うし', 'とら', 'う', 'たつ', 'み', 'うま', 'ひつじ', 'さる', 'とり', 'いぬ', 'い'],
  wdFull: ['月', '火', '水', '木', '金', '土', '日'], dateFmt: '{y}年{m}月{d}日（{wd}）', dayOf: '日', soonOpen: '準備中です'
}});

/* 1년 이용권 · 본인 포함 4명 */
(function (u) { Object.assign(u, {"subClaim": "{name}さんを1年パスに登録 · 残り{n}人", "subClaimNote": "1年パスはご本人を含め{n}人まで見られます。一度登録した人は変更できません。", "subFull": "1年パスの{n}人分の枠が埋まりました。この方は個別に開けます。", "subBadge": "パス", "subSeats": "1年パス · {k}/{n}人登録 · {d}まで", "rG": "アプリ(Google Play)で購入した場合はメール不要です。Googleの領収書メールにある注文番号(GPA.で始まる)だけを入力してください。"}); if (u.payF) u.payF = u.payF.slice(0, 3).concat(["ご本人を含め4人まで一緒に"]); })(window.KF_TXT["ja"].ui);

/* 출력 · 공유 · 구매 · 밤 모드 */
Object.assign(window.KF_TXT["ja"].ui, {"shop": "購入", "print": "印刷・PDF", "share": "共有", "copied": "コピーしました。カカオトークやメッセンジャーなどに貼り付けてください。", "themeL": "表示", "themeN": ["自動", "昼", "夜"], "shareFrom": "KoreanFortuneで見た私の運勢", "printApp": "アプリでは「共有」をお使いください。印刷・PDF保存はホームページ（koreanfortune.kr）でできます。"});

/* 토정비결 앞날의 해 */
Object.assign(window.KF_TXT["ja"].ui, {"tojPick": "ほかの年の土亭秘訣を見る", "tojBuyY": "{y}年の土亭秘訣を開く", "tojFutureNote": "先の年は、その年の土亭秘訣を個別に開きます。1年利用券には今年の土亭秘訣が含まれます。"});
