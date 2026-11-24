/* K-Saju — Tojeong Bigyeol, 144 hexagrams (our new reading, English). Uses KF_TOJ_BUILD from data/ko/toj.js so scores match every language. */
(function () {
var UP = [
  { h: '天行健步', hk: 'Heaven strides forward with strength', lv: 3, y: 'This year the energy of Heaven (乾) pulls you forward. It is a good year to begin the big things you have put off, and the road opens as far as your resolve. But the higher the sky, the stronger the wind — don’t let confidence make you deaf to others.' },
  { h: '澤上春風', hk: 'A spring breeze over the lake', lv: 2, y: 'This year carries the energy of the Lake (兌) — a year when joy and laughter gather. People come together and words flow, so meetings and deals bring good news. But in years full of fun, wallets and promises loosen — keep them in check.' },
  { h: '日出東山', hk: 'The sun rises over the eastern hill', lv: 1, y: 'This year carries the energy of Fire (離) — a year when things come to light. Your past efforts catch people’s eyes and your name rises. But bright light shows small flaws too, so polish your words and actions once more.' },
  { h: '雷動春山', hk: 'Thunder rolls over the spring mountain', lv: 0, y: 'This year carries the energy of Thunder (震) — a year of big movement and change. A move, a new job or a fresh start may shake your ground, but that shaking wakes the new shoots. Those who prepare rather than panic meet the spring after the thunder.' },
  { h: '風過竹林', hk: 'Wind passes through the bamboo grove', lv: 0, y: 'This year carries the energy of Wind (巽) — a year of comings and goings. People, money and news drift in and out like wind. Ride the flow rather than clutching at it, keep only what you need close, and you will walk through the year lightly.' },
  { h: '水渡險灘', hk: 'Water crosses the rapids', lv: -2, y: 'This year carries the energy of Water (坎) — a year of crossing rapids. A few hard passes will come, but water always finds its way to the sea, even if it must go around. Cross one step at a time without hurrying, and wisdom remains where the rapids were.' },
  { h: '山中靜坐', hk: 'Sitting quietly in the mountains', lv: -1, y: 'This year carries the energy of the Mountain (艮) — a year to pause and look back. It is a time to consolidate rather than expand. Set impatience down and rest; it prepares you for a big step next year.' },
  { h: '大地含春', hk: 'The wide earth holds the spring', lv: 1, y: 'This year carries the energy of the Earth (坤) — a year of receiving and nurturing. Blessings return when you support people and work rather than stepping out in front. An honest year that gives back what you sow; diligence is your greatest strength.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'The year starts slow and blooms as it goes. Spring may feel stuck, but things loosen through summer and the biggest harvest comes in autumn and winter. Not giving up early is the key.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'The year blooms in spring and harvests in autumn. Sow in the 2nd–3rd months, rest through the summer heat, and reap in the 9th–10th. Follow the seasons and the year fills without strain.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'The year is hottest at midsummer. Chances and people rush in around the 5th–6th months, so prepare from spring. After autumn, slow down and protect what you have gathered.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'The year starts strong and asks for care later. Use the good early energy to finish important things quickly, and in the second half choose to protect rather than expand.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'The year moves in frequent waves. Good months and careful months alternate, so gather work into the good months and rest in the careful ones.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'The year waits through winter for spring. There is one deep breath at midsummer, but from autumn the energy fills again and you greet the year’s end brightly.' }
];
var LOW = [
  { adj: 4, y: 'It ends well. What you worked for this year is tied off with a smile, and good news waits at year’s end.' },
  { adj: 0, y: 'It ends calmly. The year closes without big swings — use the last month to plan the next one.' },
  { adj: -3, y: 'Mind the ending. Toward year’s end cut back on spending and quarrels; stay careful to the last and you’ll cross into the new year safely.' }
];
var H2 = [
  [['枯木逢春', 'the withered tree meets spring'], ['苦盡甘來', 'after the bitter comes the sweet'], ['先難後易', 'hard at first, easy later']],
  [['花開結實', 'flowers bloom and bear fruit'], ['春耕秋收', 'plow in spring, reap in autumn'], ['順天者興', 'those who follow heaven prosper']],
  [['夏日當空', 'the summer sun stands high'], ['盛極守中', 'at the peak, hold the center'], ['熱中求涼', 'in the heat, seek the cool']],
  [['先得後守', 'gain first, then guard'], ['見好卽收', 'when it’s good, gather it in'], ['善始愼終', 'a good start — mind the end']],
  [['波上行舟', 'a boat sails over the waves'], ['一起一伏', 'once rising, once lying low'], ['隨波待時', 'follow the waves and wait for the time']],
  [['冬去春來', 'winter goes and spring comes'], ['否極泰來', 'when blockage ends, openness comes'], ['靜待東風', 'wait quietly for the east wind']]
];
var MON = [
  ['The new year’s door opens wide. Start what you planned this month.', 'The door is open but the wind is cold. Plan now; act slowly.', 'Rush at the new year and you’ll stumble. Tend your home first.'],
  ['A helpful person comes from the east. Reply to someone long silent.', 'Like melting ice, things loosen little by little.', 'Spring wind stirs the heart — postpone big promises.'],
  ['Flowers bloom on dry branches. A good month to begin what you’ve put off.', 'A month for sowing. Don’t rush the results.', 'Late cold can hurt your health. Don’t overdo it.'],
  ['Spring sun is generous — people and money gather together.', 'A calm month. Keep steadily at what you’re doing.', 'Many words bring trouble. Keep your mouth heavy.'],
  ['Early-summer sun raises your name. It’s fine to step forward.', 'Busy, but you gain something.', 'Energy sags like a field in drought. Postpone big decisions.'],
  ['Like deepening green, your work grows lush.', 'A month to rest in the heat. Care for your body first.', 'Like roads blocked by monsoon rain, things are slow. Wait and it clears.'],
  ['Rain soaks the field. Unexpected help arrives.', 'In and out are about equal. Check your books.', 'Be careful near water and on long trips. Hurry and you lose.'],
  ['Grain ripens in the autumn fields. The best month to harvest.', 'Share what you reap and it grows.', 'Greed before harvest costs you. Guard what must be guarded.'],
  ['A cool wind clears the mind. Make important judgments now.', 'A month to tidy and refine. Finish old business.', 'Cold wind brings loneliness. Keep people close.'],
  ['As leaves turn color, your efforts are seen.', 'An even month. Prepare for the coming winter.', 'Like falling leaves, much slips away. Cut spending.'],
  ['In the long nights you dream well. Good news arrives.', 'A month to gather strength quietly.', 'The cold makes you shrink. Look after your health first.'],
  ['You close the year with a smile. Give thanks.', 'A month to look back calmly on the year.', 'In the last month, settle debts and quarrels before you cross over.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var en = (window.KF_TXT = window.KF_TXT || {}).en = (window.KF_TXT.en || {});
en.toj = T;
})();
