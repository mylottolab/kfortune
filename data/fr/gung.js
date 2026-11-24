/* KoreanFortune — Compatibilité & Posez une question (Français) */
(function () {
var fr = (window.KF_TXT = window.KF_TXT || {}).fr = (window.KF_TXT.fr || {});
fr.gung = {
  title: 'Compatibilité', pick: 'Avec qui ?', me: 'Moi', other: 'L’autre', addOther: '+ Ajouter sa date de naissance',
  types: [['love', 'Couple'], ['work', 'Travail'], ['family', 'Famille'], ['friend', 'Amis']],
  area: { heart: 'Cœur', life: 'Quotidien', money: 'Argent', future: 'Avenir', total: 'Accord' },
  rel: [
    '{a} est {ia} ; {b} est {ib}. Nés avec le même genre d’énergie, vous vous comprenez sans mots. Mais en vous ressemblant, vous êtes aussi têtus l’un que l’autre — quand vous vous heurtez, personne ne cède.',
    '{a} est {ia} ; {b} est {ib}. {gen} {a} donne et {b} s’épanouit. Si {b} montre souvent sa gratitude pour que {a} ne s’épuise pas, la chaleur durera.',
    '{a} est {ia} ; {b} est {ib}. {gen} {a} mène et {b} suit, donc les choses se règlent vite. Veillez seulement à ce que les mots de celui qui mène ne deviennent pas des ordres.',
    '{a} est {ia} ; {b} est {ib}. {gen} {b} fixe le cadre et {a} y devient solide. Respectez l’espace de l’autre pour que {a} ne se sente pas enfermé.',
    '{a} est {ia} ; {b} est {ib}. {gen} {a} se sent à l’aise et fortifié auprès de {b}. De petits gestes de retour gardent ce lien longtemps.'
  ],
  gen: ['Comme l’eau fait grandir l’arbre,', 'Comme le bois nourrit le feu,', 'Comme le feu devient cendre et enrichit la terre,', 'Comme la terre abrite et fait croître le métal,', 'Comme l’eau claire jaillit de la roche,'],
  ctl: ['Comme la hache façonne l’arbre,', 'Comme l’eau dompte l’incendie,', 'Comme l’arbre perce la terre pour s’enraciner,', 'Comme le feu fond le fer en outil,', 'Comme la berge guide le ruisseau,'],
  stemHap: 'Surtout, vos deux caractères centraux s’attirent — une « union céleste » (天干合). Vous ne vous êtes sans doute pas sentis étrangers dès la première rencontre. La tradition y voit un lien noué par le ciel.',
  dayRel: {
    hap: 'Vos places (branches du jour) se donnent aussi la main dans une « harmonie des six » : la vie quotidienne ensemble roule bien.',
    samhap: 'Vos places forment une « harmonie des trois » : vous gagnez en force en marchant vers un but commun.',
    chung: 'Mais vos places (branches du jour) se heurtent de front. Habitudes et espace peuvent déclencher des disputes — convenir de pièces et de moments à soi facilite beaucoup les choses.',
    plain: 'Vos places se tiennent tranquillement côte à côte : le quotidien ensemble coule sans tension.'
  },
  yearRel: {
    hap: 'Vos signes du zodiaque s’accordent aussi : famille et amis accueillent ce lien.',
    samhap: 'Vos signes du zodiaque forment une harmonie des trois : vos cercles se mélangent bien.',
    chung: 'Vos signes du zodiaque s’opposent : les avis peuvent diverger lors des réunions de famille ou d’amis — soyez alliés à l’avance.',
    plain: ''
  },
  comp: ['{b} a l’énergie {e} qui manque à {a} : vous comblez mutuellement vos manques.', 'Aucun de vous n’a d’énergie {e} : faites ensemble un effort conscient sur ce qu’elle gouverne (par ex. {eh}).'],
  eHint: ['commencer du neuf', 'exprimer ses sentiments', 's’installer quelque part', 'décider et lâcher prise', 'se reposer et épargner'],
  money: ['Votre accord sur l’argent est bon. Ensemble vous échangez ce dont chacun a besoin, et la richesse s’accumule facilement.', 'Votre accord sur l’argent est moyen. Que l’un gère et que l’autre vérifie.', 'Votre accord sur l’argent demande de l’attention. Décidez ensemble des grosses dépenses et placements, et gardez des réserves séparées pour la paix.'],
  end: {
    love: ['Un lien qui se reconnaît. Chérissez-le comme maintenant et il s’approfondira chaque année.', 'Un bon couple si chacun fait sa part. Savourez vos différences au lieu de les corriger.', 'Un lien qui demande du temps pour s’accorder. Sans hâte — respectez le rythme de l’autre.'],
    work: ['Ensemble, un plus un font trois.', 'De bons collègues une fois les rôles clairs.', 'Mieux vaut se partager les domaines que faire le même travail ensemble.'],
    family: ['Une famille qui se soutient.', 'Un peu plus d’expression vous rapprochera.', 'Quand vous vous heurtez, un peu de distance vous protège tous les deux.'],
    friend: ['Une amitié qui durera.', 'Des amis avec qui il est facile de passer du temps.', 'Des amis qui se réjouissent le plus de se voir de temps en temps.']
  },
  note: 'La compatibilité est un guide pour se comprendre. Entre les personnes, ce sont vos cœurs et vos efforts qui comptent le plus.'
};
fr.ask = {
  title: 'Posez une question', lead: 'Choisissez une question. Nous répondons d’abord par ○ △ ✕, puis donnons la raison et le meilleur moment.',
  who: 'De qui lisons-nous le destin ?', examDate: 'Date de l’examen (ou du résultat)', ask: 'Voir la réponse', again: 'Demander autre chose',
  verdict: ['Oui, allez-y', 'Moitié-moitié', 'Attendez le bon moment'], mark: ['○', '△', '✕'],
  best: 'Dans les six prochains mois, le meilleur moment est {m}/{y}.', bestDay: 'Cette semaine, le {d}/{m} est le meilleur jour.',
  groups: [
    ['money', 'Argent', [['sell', 'Dois-je vendre cette maison (cet objet) ?'], ['invest', 'Dois-je investir ou me lancer ?'], ['lend', 'Dois-je prêter de l’argent ?']]],
    ['people', 'Relations', [['match', 'Cette personne est-elle faite pour moi ?'], ['contact', 'Dois-je écrire en premier ?']]],
    ['work', 'Carrière & examens', [['exam', 'Vais-je réussir l’examen ?'], ['promote', 'Serai-je promu ou élu ?']]],
    ['health', 'Santé', [['health', 'Comment s’annonce la santé (de ma famille) ?']]],
    ['move', 'Changement', [['move', 'Dois-je déménager ou changer d’emploi ?']]]
  ],
  ans: {
    sell: ['L’énergie favorise maintenant la vente. Quelqu’un qui paie un juste prix devrait se présenter — si les conditions conviennent, allez-y.', 'Vendre ou attendre, les deux se valent. Sans urgence, attendez le bon mois ci-dessous et comparez les prix.', 'Vendre dans la précipitation rend un juste prix difficile. Patientez un peu et revoyez quand l’énergie aura tourné.'],
    invest: ['L’énergie de l’argent s’ouvre. Commencez par étapes plutôt que tout d’un coup, et profitez plus longtemps du bon courant.', 'Vous pouvez commencer, mais petit. Testez, observez la réaction, puis grandissez.', 'C’est le moment de garder, pas de sortir de l’argent. Faites le plan et agissez un meilleur mois.'],
    lend: ['Prêter maintenant ne devrait pas poser problème. Mettez tout de même la date et le montant par écrit.', 'Si vous prêtez, ne prêtez que ce que vous pourriez perdre. Refuser poliment davantage ne nuira pas à la relation.', 'Votre part fuit facilement en ce moment. Offrez votre cœur, pas votre argent — cela vous protège tous les deux.'],
    contact: ['Une bonne journée pour que les cœurs se rejoignent. Écrivez en premier un message court et chaleureux.', 'Écrire, oui, mais brièvement. Un petit bonjour léger marche le mieux.', 'Aujourd’hui les mots se croisent facilement. Contactez-le le meilleur jour ci-dessous et vous vous comprendrez bien mieux.'],
    exam: ['L’énergie du jour soutient fermement l’examen. Écrivez calmement ce que vous savez et vous donnerez votre niveau — voire mieux.', 'L’énergie est stable. Réduisez juste les erreurs : couchez-vous tôt la veille et commencez par les questions familières.', 'L’énergie du jour tend à faire monter la tension. La forme compte le plus — entraînez-vous à l’avance à l’heure de l’examen.'],
    promote: ['Un temps où votre nom et votre position montent. Ce que vous montrez maintenant compte directement dans votre évaluation.', 'Les chances sont égales. Échangez encore une fois avec vos supérieurs pour faire pencher la balance.', 'Cette fois, c’est pour se préparer. Construisez votre dossier en visant le bon mois ci-dessous.'],
    match: ['Nous vous le montrons en détail dans Compatibilité.', '', ''],
    move: ['Bon moment pour bouger — votre énergie renaît dans un nouveau lieu.', 'Bouger, oui, mais sans hâte. Comparez bien les options.', 'Mieux vaut rester en place pour l’instant. Repensez-y le bon mois ci-dessous.']
  },
  health: {
    verdict: ['Stable', 'Demande un peu de soin', 'Prenez davantage soin de vous'], mark: ['○', '△', '△'],
    lead: 'Nous avons regardé l’énergie de la santé sur les six prochains mois.',
    low: 'L’énergie est au plus bas vers {m}/{y}. Ce mois-là, allégez l’agenda, évitez les longs voyages et prévoyez un bilan de santé.',
    note: 'Cette lecture utilise des métaphores des cinq éléments traditionnels et n’est pas un avis médical. Nous ne prédisons jamais la durée de vie ni les maladies. Si vous ne vous sentez pas bien, consultez un médecin.'
  },
  why: 'Pourquoi : l’énergie qui arrive maintenant à {who} est « {ten} ».',
  why2: { move: 'Une énergie qui secoue votre place (un choc) arrive aussi, donnant plus d’élan au changement.', hap: 'L’énergie qui arrive donne la main à votre place : tout roule.', chung: 'L’énergie qui arrive heurte votre place : le cœur vacille facilement.', plain: '' },
  note: 'Posez une question donne des réponses de référence selon le courant du Saju coréen traditionnel. Pour les décisions importantes, tenez compte aussi des faits et de l’avis d’experts.'
};
})();
