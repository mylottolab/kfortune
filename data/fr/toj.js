/* KoreanFortune — Tojeong Bigyeol, 144 hexagrammes (notre nouvelle lecture, Français). Utilise KF_TOJ_BUILD de data/ko/toj.js pour que les scores soient identiques dans toutes les langues. */
(function () {
var UP = [
  { h: '天行健步', hk: 'Le Ciel avance d’un pas ferme', lv: 3, y: 'Cette année, l’énergie du Ciel (乾) vous tire en avant. C’est une bonne année pour lancer les grandes choses repoussées, et la route s’ouvre aussi loin que va votre résolution. Mais plus le ciel est haut, plus le vent est fort — que l’assurance ne vous rende pas sourd aux autres.' },
  { h: '澤上春風', hk: 'Une brise de printemps sur le lac', lv: 2, y: 'Cette année porte l’énergie du Lac (兌) — une année où la joie et les rires se rassemblent. Les gens se retrouvent et les mots circulent : rencontres et affaires apportent de bonnes nouvelles. Mais dans les années joyeuses, portefeuille et promesses se relâchent — tenez-les.' },
  { h: '日出東山', hk: 'Le soleil se lève sur la colline de l’est', lv: 1, y: 'Cette année porte l’énergie du Feu (離) — une année où les choses viennent à la lumière. Vos efforts passés attirent les regards et votre nom monte. Mais une lumière vive montre aussi les petits défauts : polissez encore une fois vos paroles et vos actes.' },
  { h: '雷動春山', hk: 'Le tonnerre gronde sur la montagne de printemps', lv: 0, y: 'Cette année porte l’énergie du Tonnerre (震) — une année de grands mouvements et de changements. Déménagement, nouvel emploi ou nouveau départ peuvent ébranler votre sol, mais cette secousse réveille les jeunes pousses. Ceux qui se préparent au lieu de paniquer rencontrent le printemps d’après l’orage.' },
  { h: '風過竹林', hk: 'Le vent traverse la bambouseraie', lv: 0, y: 'Cette année porte l’énergie du Vent (巽) — une année d’allées et venues. Gens, argent et nouvelles entrent et sortent comme le vent. Suivez le courant plutôt que de vous agripper, gardez près de vous seulement le nécessaire, et vous traverserez l’année avec légèreté.' },
  { h: '水渡險灘', hk: 'L’eau franchit les rapides', lv: -2, y: 'Cette année porte l’énergie de l’Eau (坎) — une année où il faut franchir des rapides. Quelques passages difficiles viendront, mais l’eau trouve toujours le chemin de la mer, même en contournant. Avancez pas à pas, sans hâte, et là où étaient les rapides restera la sagesse.' },
  { h: '山中靜坐', hk: 'Assis en paix dans la montagne', lv: -1, y: 'Cette année porte l’énergie de la Montagne (艮) — une année pour s’arrêter et regarder en arrière. Le temps de consolider plutôt que de s’étendre. Posez l’impatience et reposez-vous : cela vous prépare à un grand pas l’an prochain.' },
  { h: '大地含春', hk: 'La vaste terre porte le printemps', lv: 1, y: 'Cette année porte l’énergie de la Terre (坤) — une année pour recevoir et nourrir. Les bienfaits reviennent quand vous soutenez les gens et le travail au lieu de vous mettre en avant. Une année honnête qui rend ce que vous semez ; l’assiduité est votre plus grande force.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'L’année commence lentement et s’épanouit en avançant. Le printemps peut sembler bloqué, mais les choses se dénouent pendant l’été, et la plus grande récolte vient en automne et en hiver. Ne pas abandonner tôt, voilà la clé.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'L’année fleurit au printemps et récolte en automne. Semez aux 2e–3e mois, reposez-vous pendant la chaleur de l’été et moissonnez aux 9e–10e. Suivez les saisons et l’année se remplira sans peine.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'L’année est au plus chaud au cœur de l’été. Occasions et gens affluent vers les 5e–6e mois : préparez-vous dès le printemps. Après l’automne, ralentissez et protégez ce que vous avez réuni.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'L’année démarre fort et demande de la prudence ensuite. Profitez de la bonne énergie du début pour finir vite l’important, et dans la seconde moitié choisissez de protéger plutôt que de vous étendre.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'L’année avance par vagues fréquentes. Bons mois et mois de prudence alternent : regroupez le travail dans les bons et reposez-vous dans les autres.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'L’année attend le printemps en traversant l’hiver. Il y a une profonde respiration au cœur de l’été, mais dès l’automne l’énergie se remplit de nouveau et vous accueillez la fin d’année avec éclat.' }
];
var LOW = [
  { adj: 4, y: 'Elle finit bien. Ce pour quoi vous avez œuvré se conclut avec le sourire, et une bonne nouvelle vous attend en fin d’année.' },
  { adj: 0, y: 'Elle finit calmement. L’année se clôt sans grands écarts — profitez du dernier mois pour préparer la suivante.' },
  { adj: -3, y: 'Soignez la fin. En fin d’année, réduisez dépenses et disputes ; restez prudent jusqu’au bout et vous passerez sans encombre à la nouvelle année.' }
];
var H2 = [
  [['枯木逢春', 'l’arbre desséché rencontre le printemps'], ['苦盡甘來', 'après l’amer vient le doux'], ['先難後易', 'difficile d’abord, facile ensuite']],
  [['花開結實', 'les fleurs s’ouvrent et donnent des fruits'], ['春耕秋收', 'labourer au printemps, récolter en automne'], ['順天者興', 'qui suit le ciel prospère']],
  [['夏日當空', 'le soleil d’été est au zénith'], ['盛極守中', 'au sommet, garder le centre'], ['熱中求涼', 'dans la chaleur, chercher la fraîcheur']],
  [['先得後守', 'gagner d’abord, protéger ensuite'], ['見好卽收', 'quand c’est bon, rentrer la récolte'], ['善始愼終', 'bon début — soignez la fin']],
  [['波上行舟', 'une barque vogue sur les vagues'], ['一起一伏', 'tantôt monter, tantôt se poser'], ['隨波待時', 'suivre les vagues et attendre son heure']],
  [['冬去春來', 'l’hiver s’en va, le printemps arrive'], ['否極泰來', 'quand le blocage cesse, l’ouverture vient'], ['靜待東風', 'attendre en paix le vent d’est']]
];
var MON = [
  ['La porte de l’année s’ouvre en grand. Commencez ce mois-ci ce que vous avez prévu.', 'La porte est ouverte mais le vent est froid. Planifiez maintenant, agissez lentement.', 'Se précipiter en début d’année fait trébucher. Occupez-vous d’abord de votre foyer.'],
  ['Une personne secourable vient de l’est. Répondez à quelqu’un longtemps silencieux.', 'Comme la glace qui fond, les choses se dénouent peu à peu.', 'Le vent de printemps agite le cœur — reportez les grandes promesses.'],
  ['Les branches sèches fleurissent. Bon mois pour commencer ce que vous repoussiez.', 'Un mois pour semer. Ne pressez pas les résultats.', 'Le froid tardif peut nuire à la santé. N’en faites pas trop.'],
  ['Le soleil de printemps est généreux — gens et argent se rassemblent.', 'Un mois calme. Continuez avec constance ce que vous faites.', 'Trop de paroles attirent les ennuis. Gardez la bouche lourde.'],
  ['Le soleil du début de l’été fait monter votre nom. Vous pouvez vous avancer.', 'Chargé, mais vous y gagnez.', 'L’énergie faiblit comme un champ en sécheresse. Reportez les grandes décisions.'],
  ['Comme la verdure qui s’épaissit, votre travail pousse dru.', 'Un mois pour se reposer de la chaleur. Prenez d’abord soin de votre corps.', 'Comme des routes coupées par la mousson, tout est lent. Attendez, le ciel s’éclaircira.'],
  ['La pluie abreuve le champ. Une aide inattendue arrive.', 'Les entrées et sorties s’équilibrent. Vérifiez vos comptes.', 'Prudence près de l’eau et en long voyage. Qui se presse perd.'],
  ['Le grain mûrit dans les champs d’automne. Le meilleur mois pour récolter.', 'Partagez ce que vous récoltez et cela grandira.', 'L’avidité avant la récolte coûte cher. Protégez ce qui doit l’être.'],
  ['Un vent frais éclaircit l’esprit. Prenez maintenant les décisions importantes.', 'Un mois pour ranger et peaufiner. Clôturez les vieilles affaires.', 'Le vent froid apporte la solitude. Gardez les gens près de vous.'],
  ['Comme les feuilles qui se colorent, vos efforts se voient.', 'Un mois régulier. Préparez l’hiver qui vient.', 'Comme les feuilles qui tombent, beaucoup s’échappe. Réduisez les dépenses.'],
  ['Pendant les longues nuits, vous rêvez bien. De bonnes nouvelles arrivent.', 'Un mois pour rassembler ses forces en silence.', 'Le froid vous fait vous recroqueviller. Veillez d’abord à votre santé.'],
  ['Vous terminez l’année avec le sourire. Dites merci.', 'Un mois pour regarder l’année avec calme.', 'Au dernier mois, réglez dettes et querelles avant de passer le cap.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var fr = (window.KF_TXT = window.KF_TXT || {}).fr = (window.KF_TXT.fr || {});
fr.toj = T;
})();
