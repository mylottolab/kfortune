/* KoreanFortune — Compatibility & Ask a question (English) */
(function () {
var en = (window.KF_TXT = window.KF_TXT || {}).en = (window.KF_TXT.en || {});
en.gung = {
  title: 'Compatibility', pick: 'Who with?', me: 'Me', other: 'Partner', addOther: '+ Add their birth date',
  types: [['love', 'Couple'], ['work', 'Work'], ['family', 'Family'], ['friend', 'Friends']],
  area: { heart: 'Heart', life: 'Daily life', money: 'Money', future: 'Future', total: 'Match' },
  rel: [
    '{a} is {ia}; {b} is {ib}. Born with the same kind of energy, you understand each other without words. But being alike, you are stubborn alike — when you clash, neither steps back.',
    '{a} is {ia}; {b} is {ib}. {gen} {a} gives and {b} blossoms. If {b} often shows thanks so {a} doesn’t run dry, the warmth lasts.',
    '{a} is {ia}; {b} is {ib}. {gen} {a} leads and {b} follows, so things get settled quickly. Just make sure the leader’s words don’t turn into orders.',
    '{a} is {ia}; {b} is {ib}. {gen} {b} sets the standard and {a} grows solid within it. Respect each other’s space so {a} doesn’t feel confined.',
    '{a} is {ia}; {b} is {ib}. {gen} {a} feels at ease and strengthened beside {b}. Small ways of giving back keep this bond for a long time.'
  ],
  gen: ['As water raises a tree,', 'As wood feeds a fire,', 'As fire turns to ash and enriches the soil,', 'As earth holds and grows metal,', 'As clear water springs from rock,'],
  ctl: ['As an axe shapes a tree,', 'As water tames a blaze,', 'As a tree breaks through soil to root,', 'As fire melts iron into a tool,', 'As a bank guides a stream,'],
  stemHap: 'Above all, your two central characters pull toward each other — a “heavenly union” (天干合). You probably didn’t feel like strangers even when you first met. Tradition calls this a bond made by heaven.',
  dayRel: {
    hap: 'Your seats (day branches) also join hands in a “six harmony,” so daily life together runs smoothly.',
    samhap: 'Your seats form a “three harmony,” so you gain strength walking toward a shared goal.',
    chung: 'But your seats (day branches) clash head-on. Habits and space can spark arguments — agreeing on your own rooms and time makes it much easier.',
    plain: 'Your seats sit quietly side by side, so everyday life together flows without strain.'
  },
  yearRel: {
    hap: 'Your zodiac animals also harmonize, so family and friends welcome this bond.',
    samhap: 'Your zodiac animals form a three harmony, so your circles mix well.',
    chung: 'Your zodiac animals clash, so opinions may split at family or friend gatherings — be each other’s ally in advance.',
    plain: ''
  },
  comp: ['{b} has the {e} energy that {a} lacks, so you fill each other’s gaps.', 'Neither of you has {e} energy, so make a conscious effort together on what it governs (e.g. {eh}).'],
  eHint: ['starting new things', 'expressing feelings', 'settling down in one place', 'deciding and letting go', 'resting and saving money'],
  money: ['Your money match is good. Together you exchange what each needs, and wealth gathers easily.', 'Your money match is average. Let one manage the money and the other review it.', 'Your money match needs care. Decide big spending and investments together, and keep separate emergency funds for peace.'],
  end: {
    love: ['A bond that recognizes each other. Cherish it as you do now and it deepens every year.', 'A good match if you both make the effort. Enjoy your differences rather than fixing them.', 'A bond that needs time to tune. Don’t rush — respect each other’s pace.'],
    work: ['Together, one plus one makes three.', 'Good colleagues once roles are clear.', 'Better to split areas than to do the same job together.'],
    family: ['A family that props each other up.', 'A little more expression brings you closer.', 'When you clash, a little distance protects you both.'],
    friend: ['A friendship that will last.', 'Easy friends to spend time with.', 'Friends who are happiest to see each other now and then.']
  },
  note: 'Compatibility is a guide to understanding each other. Between people, your hearts and efforts matter most.'
};
en.ask = {
  title: 'Ask a question', lead: 'Pick a question. We answer first with ○ △ ✕, then give the reason and the best timing.',
  who: 'Whose fortune should we read?', examDate: 'Exam (or result) date', ask: 'See the answer', again: 'Ask something else',
  verdict: ['Yes, go ahead', 'Half and half', 'Wait for the right time'], mark: ['○', '△', '✕'],
  best: 'In the next six months, the best time is {m}/{y}.', bestDay: 'This week, {m}/{d} is the best day.',
  groups: [
    ['money', 'Money', [['sell', 'Should I sell this house (or item)?'], ['invest', 'Should I invest or start a business?'], ['lend', 'Should I lend money?']]],
    ['people', 'People', [['match', 'Is this person right for me?'], ['contact', 'Should I reach out first?']]],
    ['work', 'Career & exams', [['exam', 'Will I pass the exam?'], ['promote', 'Will I be promoted or elected?']]],
    ['health', 'Health', [['health', 'How is (my family’s) health looking?']]],
    ['move', 'Moving', [['move', 'Should I move house or change jobs?']]]
  ],
  ans: {
    sell: ['Energy now favors selling. Someone who pays a fair price is likely to appear — if the terms fit, go ahead.', 'Selling or waiting are both fine now. If there’s no rush, wait for the good month below and compare prices.', 'Selling in a hurry now makes a fair price hard. Hold on a little and look again when the energy shifts.'],
    invest: ['Money energy is opening. Start in parts rather than all at once and ride the good flow longer.', 'You can start, but keep it small. Test it, watch the response, then grow.', 'Now is for keeping, not sending money out. Make the plan and act in a better month.'],
    lend: ['Lending is unlikely to cause trouble now. Still, put the date and amount in writing.', 'If you lend, lend only what you could afford to lose. Politely refusing more won’t hurt the relationship.', 'Your share leaks easily now. Offer your heart, not your money — it protects you both.'],
    contact: ['A good day for hearts to connect. Reach out first with a short, warm message.', 'Reaching out is fine, but keep it brief. A light hello works best.', 'Words cross easily today. Contact them on the better day below and you’ll connect far better.'],
    exam: ['The day’s energy firmly supports the exam. Write calmly what you know and you’ll perform as well as your ability — or better.', 'The energy is steady. Just cut down on mistakes: sleep early the night before and start with familiar questions.', 'The day’s energy tends to raise tension. Condition matters most — practice in advance at the exam’s hour.'],
    promote: ['A time when your name and position rise. What you show now turns straight into your evaluation.', 'Chances are even. Communicate once more with your superiors to tip the balance.', 'This round is for preparing. Build your record toward the good month below.'],
    match: ['We’ll show you in detail in Compatibility.', '', ''],
    move: ['A good time to move — your energy revives in a new place.', 'Moving is fine, but no need to rush. Compare the options thoroughly.', 'Better to stay put for now. Think again in the good month below.']
  },
  health: {
    verdict: ['Looking steady', 'Needs some care', 'Take extra care'], mark: ['○', '△', '△'],
    lead: 'We looked at health energy over the next six months.',
    low: 'Energy is lowest around {m}/{y}. That month, ease the schedule, avoid long trips, and book a check-up in advance.',
    note: 'This reading uses traditional five-element metaphors and is not a medical judgment. We never predict lifespan or illness. If you feel unwell, please see a doctor.'
  },
  why: 'Why: the energy now coming to {who} is “{ten}.”',
  why2: { move: 'An energy that shakes your seat (a clash) also arrives, giving movement extra force.', hap: 'The incoming energy joins hands with your seat, so things go smoothly.', chung: 'The incoming energy collides with your seat, so the heart wavers easily.', plain: '' },
  note: 'Ask a question gives reference answers based on the flow of traditional Korean Saju. For important decisions, also weigh the facts and expert advice.'
};
})();
