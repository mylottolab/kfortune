/* KoreanFortune — Partnerschaft & Stell eine Frage (Deutsch) */
(function () {
var de = (window.KF_TXT = window.KF_TXT || {}).de = (window.KF_TXT.de || {});
de.gung = {
  title: 'Partnerschaft', pick: 'Mit wem?', me: 'Ich', other: 'Gegenüber', addOther: '+ Geburtsdatum der anderen Person',
  types: [['love', 'Paar'], ['work', 'Arbeit'], ['family', 'Familie'], ['friend', 'Freunde']],
  area: { heart: 'Herz', life: 'Alltag', money: 'Geld', future: 'Zukunft', total: 'Passung' },
  rel: [
    '{a} ist {ia}; {b} ist {ib}. Mit derselben Art von Energie geboren, versteht ihr euch ohne Worte. Doch weil ihr euch ähnelt, seid ihr auch gleich stur — wenn ihr aneinandergeratet, gibt keiner nach.',
    '{a} ist {ia}; {b} ist {ib}. {gen} {a} gibt, und {b} blüht auf. Wenn {b} oft Dank zeigt, damit {a} nicht leerläuft, hält die Wärme.',
    '{a} ist {ia}; {b} ist {ib}. {gen} {a} führt, und {b} folgt, darum wird vieles schnell geklärt. Achtet nur darauf, dass die Worte der führenden Seite nicht zu Befehlen werden.',
    '{a} ist {ia}; {b} ist {ib}. {gen} {b} setzt den Maßstab, und {a} wird darin fest. Achtet den Raum des anderen, damit {a} sich nicht eingeengt fühlt.',
    '{a} ist {ia}; {b} ist {ib}. {gen} {a} fühlt sich neben {b} geborgen und gestärkt. Kleine Gesten des Zurückgebens halten diese Bindung lange.'
  ],
  gen: ['Wie Wasser einen Baum großzieht,', 'Wie Holz ein Feuer nährt,', 'Wie Feuer zu Asche wird und den Boden nährt,', 'Wie Erde Metall birgt und wachsen lässt,', 'Wie klares Wasser aus dem Fels quillt,'],
  ctl: ['Wie eine Axt einen Baum formt,', 'Wie Wasser einen Brand zähmt,', 'Wie ein Baum den Boden durchbricht, um zu wurzeln,', 'Wie Feuer Eisen zu einem Werkzeug schmilzt,', 'Wie ein Ufer einen Bach lenkt,'],
  stemHap: 'Vor allem ziehen sich eure beiden Mittelzeichen an — eine „himmlische Verbindung“ (天干合). Wahrscheinlich habt ihr euch schon beim ersten Treffen nicht fremd gefühlt. Die Tradition nennt das eine vom Himmel gestiftete Bindung.',
  dayRel: {
    hap: 'Eure Plätze (Tageszweige) reichen sich auch in einer „Sechser-Harmonie“ die Hand, darum läuft der gemeinsame Alltag rund.',
    samhap: 'Eure Plätze bilden eine „Dreier-Harmonie“, darum gewinnt ihr Kraft, wenn ihr auf ein gemeinsames Ziel zugeht.',
    chung: 'Doch eure Plätze (Tageszweige) prallen frontal aufeinander. Gewohnheiten und Raum können Streit auslösen — eigene Zimmer und Zeiten zu vereinbaren macht vieles leichter.',
    plain: 'Eure Plätze sitzen ruhig nebeneinander, darum fließt der gemeinsame Alltag ohne Anspannung.'
  },
  yearRel: {
    hap: 'Auch eure Tierkreiszeichen harmonieren, darum heißen Familie und Freunde diese Bindung willkommen.',
    samhap: 'Eure Tierkreiszeichen bilden eine Dreier-Harmonie, darum mischen sich eure Kreise gut.',
    chung: 'Eure Tierkreiszeichen stoßen sich, darum können sich bei Familien- oder Freundestreffen Meinungen spalten — seid einander im Voraus Verbündete.',
    plain: ''
  },
  comp: ['{b} hat die {e}-Energie, die {a} fehlt, darum füllt ihr gegenseitig eure Lücken.', 'Keiner von euch hat {e}-Energie, darum achtet gemeinsam bewusst auf das, wofür sie steht (z. B. {eh}).'],
  eHint: ['Neues beginnen', 'Gefühle zeigen', 'sich an einem Ort niederlassen', 'entscheiden und loslassen', 'ausruhen und Geld sparen'],
  money: ['Eure Geld-Passung ist gut. Zusammen tauscht ihr aus, was jeder braucht, und Wohlstand sammelt sich leicht.', 'Eure Geld-Passung ist durchschnittlich. Eine Person verwaltet das Geld, die andere prüft.', 'Eure Geld-Passung braucht Sorgfalt. Entscheidet große Ausgaben und Anlagen gemeinsam und haltet getrennte Notgroschen, um Frieden zu bewahren.'],
  end: {
    love: ['Eine Bindung, die einander erkennt. Pflegt sie wie jetzt, und sie wird jedes Jahr tiefer.', 'Ein gutes Paar, wenn beide sich bemühen. Genießt eure Unterschiede, statt sie zu korrigieren.', 'Eine Bindung, die Zeit zum Einstimmen braucht. Keine Eile — achtet das Tempo des anderen.'],
    work: ['Zusammen ergibt eins plus eins drei.', 'Gute Kollegen, sobald die Rollen klar sind.', 'Besser Bereiche aufteilen, als dieselbe Arbeit gemeinsam zu machen.'],
    family: ['Eine Familie, die einander stützt.', 'Ein wenig mehr Ausdruck bringt euch näher.', 'Wenn ihr aneinandergeratet, schützt euch ein wenig Abstand.'],
    friend: ['Eine Freundschaft, die halten wird.', 'Freunde, mit denen man leicht Zeit verbringt.', 'Freunde, die sich am meisten freuen, wenn sie sich ab und zu sehen.']
  },
  note: 'Die Partnerschaftsdeutung ist ein Wegweiser zum gegenseitigen Verstehen. Zwischen Menschen zählen eure Herzen und eure Mühe am meisten.'
};
de.ask = {
  title: 'Stell eine Frage', lead: 'Wähle eine Frage. Wir antworten zuerst mit ○ △ ✕ und nennen dann den Grund und den besten Zeitpunkt.',
  who: 'Wessen Schicksal sollen wir lesen?', examDate: 'Datum der Prüfung (oder des Ergebnisses)', ask: 'Antwort ansehen', again: 'Etwas anderes fragen',
  verdict: ['Ja, nur zu', 'Halb und halb', 'Auf den richtigen Moment warten'], mark: ['○', '△', '✕'],
  best: 'In den nächsten sechs Monaten ist die beste Zeit {m}/{y}.', bestDay: 'Diese Woche ist der {d}.{m}. der beste Tag.',
  groups: [
    ['money', 'Geld', [['sell', 'Soll ich dieses Haus (diesen Gegenstand) verkaufen?'], ['invest', 'Soll ich investieren oder gründen?'], ['lend', 'Soll ich Geld verleihen?']]],
    ['people', 'Menschen', [['match', 'Passt diese Person zu mir?'], ['contact', 'Soll ich mich zuerst melden?']]],
    ['work', 'Beruf & Prüfungen', [['exam', 'Bestehe ich die Prüfung?'], ['promote', 'Werde ich befördert oder gewählt?']]],
    ['health', 'Gesundheit', [['health', 'Wie steht es um die Gesundheit (meiner Familie)?']]],
    ['move', 'Veränderung', [['move', 'Soll ich umziehen oder die Stelle wechseln?']]]
  ],
  ans: {
    sell: ['Die Energie spricht jetzt für einen Verkauf. Wahrscheinlich findet sich jemand, der einen fairen Preis zahlt — wenn die Bedingungen passen, nur zu.', 'Verkaufen oder warten ist jetzt beides in Ordnung. Wenn es nicht eilt, warte auf den guten Monat unten und vergleiche Preise.', 'Wer jetzt hastig verkauft, bekommt schwer einen fairen Preis. Halte noch ein wenig durch und schau wieder hin, wenn sich die Energie dreht.'],
    invest: ['Die Geldenergie öffnet sich. Beginne in Teilen statt alles auf einmal und nutze den guten Strom länger.', 'Du kannst anfangen, aber klein. Teste, beobachte die Reaktion und wachse dann.', 'Jetzt ist Zeit zum Bewahren, nicht zum Ausgeben. Mach den Plan und handle in einem besseren Monat.'],
    lend: ['Verleihen dürfte jetzt keinen Ärger machen. Halte Datum und Betrag trotzdem schriftlich fest.', 'Wenn du verleihst, dann nur, was du verlieren könntest. Höflich mehr abzulehnen schadet der Beziehung nicht.', 'Dein Anteil versickert jetzt leicht. Schenk dein Herz, nicht dein Geld — das schützt euch beide.'],
    contact: ['Ein guter Tag, an dem Herzen sich verbinden. Melde dich zuerst mit einer kurzen, warmen Nachricht.', 'Sich zu melden ist in Ordnung, aber halte es kurz. Ein leichter Gruß wirkt am besten.', 'Heute kreuzen sich Worte leicht. Melde dich am besseren Tag unten, dann verbindet ihr euch viel besser.'],
    exam: ['Die Energie des Tages trägt die Prüfung fest. Schreib ruhig, was du weißt, und du leistest so viel, wie du kannst — oder mehr.', 'Die Energie ist stabil. Reduziere nur Fehler: am Vorabend früh schlafen und mit vertrauten Aufgaben beginnen.', 'Die Energie des Tages steigert leicht die Anspannung. Die Verfassung zählt am meisten — übe vorher zur Prüfungszeit.'],
    promote: ['Eine Zeit, in der dein Name und deine Stellung steigen. Was du jetzt zeigst, fließt direkt in deine Bewertung ein.', 'Die Chancen stehen halb und halb. Sprich noch einmal mit deinen Vorgesetzten, um die Waage zu neigen.', 'Diese Runde ist zum Vorbereiten. Baue deine Erfolge mit Blick auf den guten Monat unten auf.'],
    match: ['Das zeigen wir dir ausführlich unter Partnerschaft.', '', ''],
    move: ['Eine gute Zeit für Veränderung — deine Energie lebt an einem neuen Ort auf.', 'Veränderung ist in Ordnung, aber ohne Eile. Vergleiche die Möglichkeiten gründlich.', 'Bleib vorerst, wo du bist. Denk im guten Monat unten noch einmal darüber nach.']
  },
  health: {
    verdict: ['Stabil', 'Braucht etwas Pflege', 'Besonders achtsam sein'], mark: ['○', '△', '△'],
    lead: 'Wir haben die Gesundheitsenergie der nächsten sechs Monate angesehen.',
    low: 'Die Energie ist um {m}/{y} am niedrigsten. In diesem Monat den Terminplan lockern, lange Reisen meiden und vorher einen Vorsorgetermin machen.',
    note: 'Diese Deutung nutzt Bilder der traditionellen fünf Elemente und ist kein medizinisches Urteil. Wir sagen niemals Lebensdauer oder Krankheiten voraus. Wenn es dir nicht gut geht, geh bitte zu einer Ärztin oder einem Arzt.'
  },
  why: 'Grund: Die Energie, die jetzt zu {who} kommt, ist „{ten}“.',
  why2: { move: 'Auch eine Energie, die deinen Platz erschüttert (ein Zusammenstoß), kommt hinzu und gibt der Veränderung mehr Schwung.', hap: 'Die kommende Energie reicht deinem Platz die Hand, darum läuft es rund.', chung: 'Die kommende Energie prallt auf deinen Platz, darum wankt das Herz leicht.', plain: '' },
  note: 'Stell eine Frage gibt Antworten zur Orientierung nach dem Fluss des traditionellen koreanischen Saju. Bei wichtigen Entscheidungen bezieh auch Fakten und fachlichen Rat ein.'
};
})();
