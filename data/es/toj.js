/* K-Saju — Tojeong Bigyeol, 144 hexagramas (nuestra nueva lectura, Español). Usa KF_TOJ_BUILD de data/ko/toj.js para que las puntuaciones coincidan en todos los idiomas. */
(function () {
var UP = [
  { h: '天行健步', hk: 'El Cielo avanza con paso firme', lv: 3, y: 'Este año la energía del Cielo (乾) tira de ti hacia delante. Es buen año para empezar las cosas grandes que venías aplazando, y el camino se abre tanto como tu determinación. Pero cuanto más alto el cielo, más fuerte el viento: que la confianza no te vuelva sordo a los demás.' },
  { h: '澤上春風', hk: 'Brisa de primavera sobre el lago', lv: 2, y: 'Este año trae la energía del Lago (兌): un año en que se reúnen la alegría y la risa. La gente se junta y las palabras fluyen, así que los encuentros y los tratos traen buenas noticias. Pero en los años de mucha diversión se aflojan la cartera y las promesas: tenlas a raya.' },
  { h: '日出東山', hk: 'El sol sale sobre la colina del este', lv: 1, y: 'Este año trae la energía del Fuego (離): un año en que las cosas salen a la luz. Tus esfuerzos pasados llaman la atención y tu nombre sube. Pero la luz intensa también muestra los pequeños defectos, así que pule una vez más tus palabras y tus actos.' },
  { h: '雷動春山', hk: 'El trueno retumba sobre la montaña de primavera', lv: 0, y: 'Este año trae la energía del Trueno (震): un año de grandes movimientos y cambios. Una mudanza, un trabajo nuevo o un nuevo comienzo pueden sacudir tu suelo, pero esa sacudida despierta los brotes nuevos. Quien se prepara en lugar de asustarse recibe la primavera que sigue al trueno.' },
  { h: '風過竹林', hk: 'El viento atraviesa el bosque de bambú', lv: 0, y: 'Este año trae la energía del Viento (巽): un año de idas y venidas. Gente, dinero y noticias entran y salen como el viento. Déjate llevar por la corriente en lugar de aferrarte, guarda cerca solo lo necesario y cruzarás el año con ligereza.' },
  { h: '水渡險灘', hk: 'El agua cruza los rápidos', lv: -2, y: 'Este año trae la energía del Agua (坎): un año de cruzar rápidos. Llegarán algunos pasos difíciles, pero el agua siempre encuentra el camino al mar, aunque tenga que rodear. Cruza paso a paso sin prisa, y donde estaban los rápidos quedará la sabiduría.' },
  { h: '山中靜坐', hk: 'Sentado en calma en la montaña', lv: -1, y: 'Este año trae la energía de la Montaña (艮): un año para detenerse y mirar atrás. Es tiempo de consolidar más que de expandirse. Deja a un lado la impaciencia y descansa: eso te prepara para un gran paso el año que viene.' },
  { h: '大地含春', hk: 'La ancha tierra guarda la primavera', lv: 1, y: 'Este año trae la energía de la Tierra (坤): un año de recibir y nutrir. Las bendiciones vuelven cuando apoyas a la gente y al trabajo en lugar de ponerte delante. Un año honrado que devuelve lo que siembras; la constancia es tu mayor fuerza.' }
];
var MID = [
  { s: [-2, -2, -1, -1, 0, 0, 1, 1, 1, 2, 2, 1], y: 'El año empieza despacio y florece a medida que avanza. La primavera puede parecer atascada, pero las cosas se sueltan en verano y la mayor cosecha llega en otoño e invierno. La clave es no rendirse al principio.' },
  { s: [0, 1, 2, 1, 0, -1, -1, 0, 1, 2, 1, 0], y: 'El año florece en primavera y cosecha en otoño. Siembra en los meses 2 y 3, descansa en el calor del verano y recoge en los meses 9 y 10. Sigue las estaciones y el año se llenará sin esfuerzo.' },
  { s: [-1, 0, 0, 1, 2, 2, 1, 0, 0, -1, -1, 0], y: 'El año alcanza su punto más alto en pleno verano. Las oportunidades y la gente llegan en torno a los meses 5 y 6, así que prepárate desde la primavera. Pasado el otoño, baja el ritmo y protege lo reunido.' },
  { s: [2, 2, 1, 1, 0, 0, -1, -1, -1, 0, -1, -1], y: 'El año empieza fuerte y pide cuidado después. Aprovecha la buena energía del principio para terminar pronto lo importante, y en la segunda mitad elige proteger más que expandirte.' },
  { s: [1, -1, 1, -1, 2, -1, 1, -1, 1, 0, 1, -1], y: 'El año se mueve en olas frecuentes. Se alternan meses buenos y meses de cuidado, así que reúne el trabajo en los buenos y descansa en los otros.' },
  { s: [1, 0, -1, -1, -2, -1, 0, 0, 1, 1, 2, 2], y: 'El año aguarda la primavera atravesando el invierno. Hay un respiro hondo en pleno verano, pero desde el otoño la energía vuelve a llenarse y recibes el fin de año con luz.' }
];
var LOW = [
  { adj: 4, y: 'Termina bien. Lo que trabajaste este año se cierra con una sonrisa, y a final de año te espera una buena noticia.' },
  { adj: 0, y: 'Termina con calma. El año se cierra sin grandes vaivenes: usa el último mes para planear el siguiente.' },
  { adj: -3, y: 'Cuida el final. Hacia fin de año recorta gastos y discusiones; mantén el cuidado hasta el último día y entrarás en el año nuevo a salvo.' }
];
var H2 = [
  [['枯木逢春', 'el árbol seco encuentra la primavera'], ['苦盡甘來', 'tras lo amargo llega lo dulce'], ['先難後易', 'difícil al principio, fácil después']],
  [['花開結實', 'las flores se abren y dan fruto'], ['春耕秋收', 'ara en primavera, cosecha en otoño'], ['順天者興', 'quien sigue al cielo prospera']],
  [['夏日當空', 'el sol de verano está en lo alto'], ['盛極守中', 'en la cima, guarda el centro'], ['熱中求涼', 'en el calor, busca el frescor']],
  [['先得後守', 'primero gana, luego protege'], ['見好卽收', 'cuando va bien, recoge'], ['善始愼終', 'buen comienzo: cuida el final']],
  [['波上行舟', 'una barca navega sobre las olas'], ['一起一伏', 'una vez arriba, una vez abajo'], ['隨波待時', 'sigue las olas y espera tu momento']],
  [['冬去春來', 'se va el invierno y llega la primavera'], ['否極泰來', 'cuando acaba el bloqueo, llega la apertura'], ['靜待東風', 'espera en calma el viento del este']]
];
var MON = [
  ['La puerta del año nuevo se abre de par en par. Empieza este mes lo que planeaste.', 'La puerta está abierta pero el viento es frío. Planea ahora; actúa despacio.', 'Si corres al empezar el año, tropezarás. Cuida primero tu casa.'],
  ['Del este llega alguien que ayuda. Responde a quien llevaba tiempo callado.', 'Como el hielo que se derrite, las cosas se sueltan poco a poco.', 'El viento de primavera agita el corazón: aplaza las grandes promesas.'],
  ['Florecen las ramas secas. Buen mes para empezar lo que venías aplazando.', 'Un mes para sembrar. No apresures los resultados.', 'El frío tardío puede afectar a tu salud. No te excedas.'],
  ['El sol de primavera es generoso: la gente y el dinero se reúnen.', 'Un mes tranquilo. Sigue con constancia en lo tuyo.', 'Muchas palabras traen problemas. Que tu boca pese.'],
  ['El sol de principios de verano eleva tu nombre. Puedes dar un paso al frente.', 'Ocupado, pero ganas algo.', 'La energía decae como un campo en sequía. Aplaza las grandes decisiones.'],
  ['Como el verde que se hace más denso, tu trabajo crece frondoso.', 'Un mes para descansar del calor. Cuida primero tu cuerpo.', 'Como caminos cortados por las lluvias, todo va lento. Espera y escampará.'],
  ['La lluvia empapa el campo. Llega una ayuda inesperada.', 'Entra y sale más o menos lo mismo. Revisa tus cuentas.', 'Cuidado cerca del agua y en viajes largos. Con prisa, pierdes.'],
  ['El grano madura en los campos de otoño. El mejor mes para cosechar.', 'Comparte lo que recoges y crecerá.', 'La codicia antes de la cosecha te cuesta. Protege lo que hay que proteger.'],
  ['Un viento fresco despeja la mente. Toma ahora las decisiones importantes.', 'Un mes para ordenar y pulir. Cierra asuntos viejos.', 'El viento frío trae soledad. Mantén cerca a la gente.'],
  ['Como las hojas que cambian de color, tus esfuerzos se ven.', 'Un mes parejo. Prepárate para el invierno que viene.', 'Como las hojas que caen, mucho se escapa. Recorta gastos.'],
  ['En las noches largas sueñas bien. Llegan buenas noticias.', 'Un mes para reunir fuerzas en silencio.', 'El frío te encoge. Cuida primero tu salud.'],
  ['Cierras el año con una sonrisa. Da las gracias.', 'Un mes para mirar atrás con calma.', 'En el último mes, salda deudas y discusiones antes de cruzar al año nuevo.']
];
LOW.forEach(function (l) { l.sep = ' — '; });
var T = window.KF_TOJ_BUILD(UP, MID, LOW, H2, MON);
var es = (window.KF_TXT = window.KF_TXT || {}).es = (window.KF_TXT.es || {});
es.toj = T;
})();
