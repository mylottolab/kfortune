/* KoreanFortune — Tojeong Bigyeol, 144 Hexagramme (unsere neue Deutung, Deutsch). Nutzt KF_TOJ_BUILD aus data/ko/toj.js, damit die Werte in allen Sprachen gleich sind. */
(function () {
var UP = [
  { h: '天行健步', hk: 'Der Himmel schreitet kraftvoll voran', lv: 3, y: 'Dieses Jahr zieht dich die Energie des Himmels (乾) nach vorn. Ein gutes Jahr, um große Dinge zu beginnen, die du aufgeschoben hast, und der Weg öffnet sich so weit wie deine Entschlossenheit. Doch je höher der Himmel, desto stärker der Wind — lass dich vom Selbstvertrauen nicht taub für andere machen.' },
  { h: '澤上春風', hk: 'Frühlingswind über dem See', lv: 2, y: 'Dieses Jahr trägt die Energie des Sees (兌) — ein Jahr, in dem sich Freude und Lachen sammeln. Menschen kommen zusammen und Worte fließen, darum bringen Begegnungen und Geschäfte gute Nachrichten. Doch in vergnügten Jahren lockern sich Geldbeutel und Versprechen — halte sie im Zaum.' },
  { h: '日出東山', hk: 'Die Sonne geht über dem Osthügel auf', lv: 1, y: 'Dieses Jahr trägt die Energie des Feuers (離) — ein Jahr, in dem Dinge ans Licht kommen. Deine bisherigen Mühen fallen auf, und dein Name steigt. Doch helles Licht zeigt auch kleine Makel, darum schleif deine Worte und Taten noch einmal.' },
  { h: '雷動春山', hk: 'Donner rollt über den Frühlingsberg', lv: 0, y: 'Dieses Jahr trägt die Energie des Donners (震) — ein Jahr großer Bewegung und Veränderung. Umzug, neue Arbeit oder ein Neuanfang können den Boden erschüttern, doch dieses Beben weckt die jungen Triebe. Wer sich vorbereitet, statt in Panik zu geraten, erlebt den Frühling nach dem Donner.' },
  { h: '風過竹林', hk: 'Wind zieht durch den Bambushain', lv: 0, y: 'Dieses Jahr trägt die Energie des Windes (巽) — ein Jahr des Kommens und Gehens. Menschen, Geld und Nachrichten wehen herein und hinaus wie Wind. Reite den Strom, statt dich festzuklammern, halte nur das Nötige nah, und du gehst leicht durch das Jahr.' },
  { h: '水渡險灘', hk: 'Wasser überquert die Stromschnellen', lv: -2, y: 'Dieses Jahr trägt die Energie des Wassers (坎) — ein Jahr, in dem Stromschnellen zu überqueren sind. Ein paar schwere Stellen kommen, doch Wasser findet immer seinen Weg zum Meer, auch auf Umwegen. Geh Schritt für Schritt ohne Hast, und wo die Stromschnellen waren, bleibt Weisheit.' },
  { h: '山中靜坐', hk: 'Still sitzen in den Bergen', lv: -1, y: 'Dieses Jahr trägt die Energie des Berges (艮) — ein Jahr zum Innehalten und Zurückblicken. Eine Zeit zum Festigen statt Ausweiten. Leg die Ungeduld ab und ruh dich aus; das bereitet dich auf einen großen Schritt im nächsten Jahr vor.' },
  { h: '大地含春', hk: 'Die weite Erde birgt den Frühling', lv: 1, y: 'Dieses Jahr trägt die Energie der Erde (坤) — ein Jahr des Empfangens und Nährens. Segen kehrt zurück, wenn du Menschen und Aufgaben stützt, statt vorneweg zu gehen. Ein ehrliches Jahr, das zurückgibt, was du säst; Fleiß ist deine größte Stärke.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'Das Jahr beginnt langsam und blüht im Laufe auf. Der Frühling mag festgefahren wirken, doch im Sommer lockert sich vieles, und die größte Ernte kommt in Herbst und Winter. Früh nicht aufzugeben ist der Schlüssel.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'Das Jahr blüht im Frühling und erntet im Herbst. Säe im 2.–3. Monat, ruh dich in der Sommerhitze aus und ernte im 9.–10. Folge den Jahreszeiten, und das Jahr füllt sich ohne Mühe.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'Das Jahr ist im Hochsommer am heißesten. Um den 5.–6. Monat strömen Chancen und Menschen herein, also bereite dich ab dem Frühling vor. Nach dem Herbst nimm Tempo raus und schütze, was du gesammelt hast.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'Das Jahr beginnt stark und verlangt später Vorsicht. Nutze die gute Energie am Anfang, um Wichtiges schnell abzuschließen, und wähle in der zweiten Hälfte das Bewahren statt des Ausweitens.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'Das Jahr bewegt sich in häufigen Wellen. Gute und vorsichtige Monate wechseln sich ab, also sammle die Arbeit in den guten Monaten und ruh dich in den vorsichtigen aus.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'Das Jahr wartet durch den Winter auf den Frühling. Im Hochsommer gibt es eine tiefe Atempause, doch ab dem Herbst füllt sich die Energie wieder, und du begrüßt das Jahresende hell.' }
];
var LOW = [
  { adj: 4, y: 'Es endet gut. Wofür du dieses Jahr gearbeitet hast, schließt mit einem Lächeln, und am Jahresende wartet eine gute Nachricht.' },
  { adj: 0, y: 'Es endet ruhig. Das Jahr schließt ohne große Ausschläge — nutze den letzten Monat, um das nächste zu planen.' },
  { adj: -3, y: 'Achte auf das Ende. Gegen Jahresende Ausgaben und Streit reduzieren; bleib bis zuletzt vorsichtig, dann gehst du sicher ins neue Jahr.' }
];
var H2 = [
  [['枯木逢春', 'der verdorrte Baum begegnet dem Frühling'], ['苦盡甘來', 'nach dem Bitteren kommt das Süße'], ['先難後易', 'erst schwer, dann leicht']],
  [['花開結實', 'Blumen blühen und tragen Frucht'], ['春耕秋收', 'im Frühling pflügen, im Herbst ernten'], ['順天者興', 'wer dem Himmel folgt, gedeiht']],
  [['夏日當空', 'die Sommersonne steht hoch'], ['盛極守中', 'auf dem Gipfel die Mitte halten'], ['熱中求涼', 'in der Hitze die Kühle suchen']],
  [['先得後守', 'erst gewinnen, dann bewahren'], ['見好卽收', 'wenn es gut ist, einbringen'], ['善始愼終', 'guter Anfang — achte auf das Ende']],
  [['波上行舟', 'ein Boot fährt über die Wellen'], ['一起一伏', 'einmal steigen, einmal ruhen'], ['隨波待時', 'den Wellen folgen und auf die Zeit warten']],
  [['冬去春來', 'der Winter geht, der Frühling kommt'], ['否極泰來', 'wenn die Stockung endet, kommt die Öffnung'], ['靜待東風', 'still auf den Ostwind warten']]
];
var MON = [
  ['Die Tür des neuen Jahres öffnet sich weit. Beginne diesen Monat, was du geplant hast.', 'Die Tür ist offen, doch der Wind ist kalt. Jetzt planen, langsam handeln.', 'Wer zum Jahresbeginn hetzt, stolpert. Kümmere dich zuerst um dein Zuhause.'],
  ['Aus dem Osten kommt ein hilfreicher Mensch. Antworte jemandem, der lange still war.', 'Wie tauendes Eis lockert sich vieles nach und nach.', 'Frühlingswind wühlt das Herz auf — verschiebe große Versprechen.'],
  ['Auf trockenen Zweigen blühen Blumen. Ein guter Monat, um Aufgeschobenes zu beginnen.', 'Ein Monat zum Säen. Erzwinge keine Ergebnisse.', 'Späte Kälte kann der Gesundheit schaden. Übertreib es nicht.'],
  ['Die Frühlingssonne ist großzügig — Menschen und Geld kommen zusammen.', 'Ein ruhiger Monat. Bleib stetig bei dem, was du tust.', 'Viele Worte bringen Ärger. Halte deinen Mund schwer.'],
  ['Die Frühsommersonne hebt deinen Namen. Du darfst hervortreten.', 'Viel zu tun, aber du gewinnst etwas.', 'Die Energie sinkt wie ein Feld in der Dürre. Verschiebe große Entscheidungen.'],
  ['Wie tiefer werdendes Grün gedeiht deine Arbeit üppig.', 'Ein Monat, um in der Hitze zu ruhen. Kümmere dich zuerst um deinen Körper.', 'Wie Wege, die der Monsun versperrt, geht alles langsam. Warte, und es klart auf.'],
  ['Regen tränkt das Feld. Unerwartete Hilfe kommt.', 'Ein- und Ausgaben halten sich die Waage. Prüfe deine Bücher.', 'Vorsicht am Wasser und auf langen Reisen. Wer hetzt, verliert.'],
  ['Auf den Herbstfeldern reift das Korn. Der beste Monat zum Ernten.', 'Teile, was du erntest, und es wächst.', 'Gier vor der Ernte kostet dich. Schütze, was zu schützen ist.'],
  ['Ein kühler Wind klärt den Kopf. Triff jetzt wichtige Urteile.', 'Ein Monat zum Ordnen und Verfeinern. Schließ Altes ab.', 'Kalter Wind bringt Einsamkeit. Halte Menschen nah.'],
  ['Wie sich färbende Blätter werden deine Mühen gesehen.', 'Ein ausgeglichener Monat. Bereite dich auf den Winter vor.', 'Wie fallendes Laub entgleitet viel. Kürze die Ausgaben.'],
  ['In den langen Nächten träumst du gut. Gute Nachrichten kommen.', 'Ein Monat, um still Kraft zu sammeln.', 'Die Kälte lässt dich schrumpfen. Achte zuerst auf deine Gesundheit.'],
  ['Du schließt das Jahr mit einem Lächeln. Sag Danke.', 'Ein Monat, um ruhig auf das Jahr zurückzublicken.', 'Begleiche im letzten Monat Schulden und Streit, bevor du hinübergehst.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var de = (window.KF_TXT = window.KF_TXT || {}).de = (window.KF_TXT.de || {});
de.toj = T;
})();
