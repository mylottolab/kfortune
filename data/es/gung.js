/* KoreanFortune — Compatibilidad y Haz una pregunta (Español) */
(function () {
var es = (window.KF_TXT = window.KF_TXT || {}).es = (window.KF_TXT.es || {});
es.gung = {
  title: 'Compatibilidad', pick: '¿Con quién?', me: 'Yo', other: 'La otra persona', addOther: '+ Añadir su fecha de nacimiento',
  types: [['love', 'Pareja'], ['work', 'Trabajo'], ['family', 'Familia'], ['friend', 'Amistad']],
  area: { heart: 'Corazón', life: 'Día a día', money: 'Dinero', future: 'Futuro', total: 'Afinidad' },
  rel: [
    '{a} es {ia}; {b} es {ib}. Nacidos con el mismo tipo de energía, os entendéis sin palabras. Pero al pareceros, también sois igual de tercos: cuando chocáis, ninguno cede.',
    '{a} es {ia}; {b} es {ib}. {gen} {a} da y {b} florece. Si {b} agradece a menudo para que {a} no se quede sin fuerzas, el calor durará.',
    '{a} es {ia}; {b} es {ib}. {gen} {a} guía y {b} sigue, así que las cosas se resuelven rápido. Solo cuidad que las palabras de quien guía no se vuelvan órdenes.',
    '{a} es {ia}; {b} es {ib}. {gen} {b} marca la pauta y {a} se hace sólido dentro de ella. Respetad el espacio del otro para que {a} no se sienta encerrado.',
    '{a} es {ia}; {b} es {ib}. {gen} {a} se siente a gusto y con fuerza al lado de {b}. Pequeños gestos de devolución mantienen este vínculo mucho tiempo.'
  ],
  gen: ['Como el agua hace crecer un árbol,', 'Como la madera alimenta el fuego,', 'Como el fuego se vuelve ceniza y enriquece la tierra,', 'Como la tierra guarda y hace crecer el metal,', 'Como el agua clara brota de la roca,'],
  ctl: ['Como el hacha da forma al árbol,', 'Como el agua doma un incendio,', 'Como el árbol rompe la tierra para echar raíces,', 'Como el fuego funde el hierro en herramienta,', 'Como la orilla guía al arroyo,'],
  stemHap: 'Sobre todo, vuestros dos caracteres centrales se atraen: una «unión celeste» (天干合). Seguramente no os sentisteis desconocidos ni la primera vez. La tradición lo llama un vínculo hecho por el cielo.',
  dayRel: {
    hap: 'Vuestros lugares (ramas del día) también se dan la mano en una «armonía de seis», así que la vida diaria juntos fluye.',
    samhap: 'Vuestros lugares forman una «armonía de tres», así que ganáis fuerza caminando hacia una meta común.',
    chung: 'Pero vuestros lugares (ramas del día) chocan de frente. Los hábitos y el espacio pueden provocar discusiones: acordar habitaciones y tiempos propios lo hace mucho más fácil.',
    plain: 'Vuestros lugares se sientan tranquilos uno al lado del otro, así que el día a día juntos fluye sin tensión.'
  },
  yearRel: {
    hap: 'Vuestros animales del zodiaco también armonizan, así que la familia y los amigos acogen este vínculo.',
    samhap: 'Vuestros animales del zodiaco forman una armonía de tres, así que vuestros círculos se mezclan bien.',
    chung: 'Vuestros animales del zodiaco chocan, así que pueden dividirse las opiniones en reuniones familiares o de amigos: sed aliados de antemano.',
    plain: ''
  },
  comp: ['{b} tiene la energía {e} que le falta a {a}, así que os completáis.', 'Ninguno de los dos tiene energía {e}, así que esforzaos juntos en lo que rige (p. ej., {eh}).'],
  eHint: ['empezar cosas nuevas', 'expresar sentimientos', 'asentarse en un lugar', 'decidir y soltar', 'descansar y ahorrar'],
  money: ['Vuestra afinidad con el dinero es buena. Juntos intercambiáis lo que cada uno necesita, y la riqueza se reúne con facilidad.', 'Vuestra afinidad con el dinero es normal. Que uno administre el dinero y el otro lo revise.', 'Vuestra afinidad con el dinero pide cuidado. Decidid juntos los grandes gastos e inversiones, y mantened fondos de emergencia separados para estar en paz.'],
  end: {
    love: ['Un vínculo que se reconoce. Cuidadlo como ahora y se hará más hondo cada año.', 'Buena pareja si los dos ponéis de vuestra parte. Disfrutad de las diferencias en lugar de corregirlas.', 'Un vínculo que necesita tiempo para afinarse. Sin prisa: respetad el ritmo del otro.'],
    work: ['Juntos, uno más uno suman tres.', 'Buenos colegas una vez claros los papeles.', 'Mejor repartir áreas que hacer juntos el mismo trabajo.'],
    family: ['Una familia que se sostiene mutuamente.', 'Expresar un poco más os acercará.', 'Cuando chocáis, un poco de distancia os protege a ambos.'],
    friend: ['Una amistad que durará.', 'Amigos con quienes es fácil pasar el tiempo.', 'Amigos que más disfrutan viéndose de vez en cuando.']
  },
  note: 'La compatibilidad es una guía para entenderse. Entre personas, lo que más importa son vuestros corazones y vuestro esfuerzo.'
};
es.ask = {
  title: 'Haz una pregunta', lead: 'Elige una pregunta. Respondemos primero con ○ △ ✕ y luego damos el porqué y el mejor momento.',
  who: '¿La fortuna de quién leemos?', examDate: 'Fecha del examen (o del resultado)', ask: 'Ver la respuesta', again: 'Preguntar otra cosa',
  verdict: ['Sí, adelante', 'A medias', 'Espera el momento'], mark: ['○', '△', '✕'],
  best: 'En los próximos seis meses, el mejor momento es {m}/{y}.', bestDay: 'Esta semana, el {d}/{m} es el mejor día.',
  groups: [
    ['money', 'Dinero', [['sell', '¿Vendo esta casa (o este objeto)?'], ['invest', '¿Invierto o empiezo un negocio?'], ['lend', '¿Presto dinero?']]],
    ['people', 'Personas', [['match', '¿Esta persona es para mí?'], ['contact', '¿Escribo yo primero?']]],
    ['work', 'Carrera y exámenes', [['exam', '¿Aprobaré el examen?'], ['promote', '¿Me ascenderán o me elegirán?']]],
    ['health', 'Salud', [['health', '¿Cómo pinta la salud (de mi familia)?']]],
    ['move', 'Cambios', [['move', '¿Me mudo o cambio de trabajo?']]]
  ],
  ans: {
    sell: ['La energía de ahora favorece vender. Es probable que aparezca alguien que pague un precio justo: si las condiciones encajan, adelante.', 'Vender o esperar, ambas cosas están bien ahora. Si no hay prisa, espera al buen mes de abajo y compara precios.', 'Vender con prisa ahora hace difícil un precio justo. Aguanta un poco y vuelve a mirar cuando cambie la energía.'],
    invest: ['La energía del dinero se está abriendo. Empieza por partes en lugar de todo a la vez y aprovecha la buena corriente más tiempo.', 'Puedes empezar, pero en pequeño. Pruébalo, observa la respuesta y luego crece.', 'Ahora toca conservar, no sacar dinero. Haz el plan y actúa en un mes mejor.'],
    lend: ['Prestar ahora difícilmente traerá problemas. Aun así, pon la fecha y la cantidad por escrito.', 'Si prestas, presta solo lo que podrías permitirte perder. Negarte con educación a más no dañará la relación.', 'Ahora tu parte se escapa con facilidad. Ofrece tu cariño, no tu dinero: os protege a los dos.'],
    contact: ['Buen día para que los corazones conecten. Escribe tú primero con un mensaje breve y cálido.', 'Escribir está bien, pero que sea breve. Un saludo ligero funciona mejor.', 'Hoy las palabras se cruzan con facilidad. Contacta en el mejor día de abajo y conectaréis mucho mejor.'],
    exam: ['La energía del día respalda con firmeza el examen. Escribe con calma lo que sabes y rendirás según tu capacidad, o mejor.', 'La energía es estable. Solo reduce los errores: acuéstate temprano la víspera y empieza por las preguntas conocidas.', 'La energía del día tiende a subir la tensión. Lo que más cuenta es tu estado: practica de antemano a la hora del examen.'],
    promote: ['Un tiempo en que suben tu nombre y tu posición. Lo que muestres ahora se convierte directamente en tu evaluación.', 'Las posibilidades están igualadas. Comunícate una vez más con tus superiores para inclinar la balanza.', 'Esta vez toca prepararse. Construye tu historial pensando en el buen mes de abajo.'],
    match: ['Te lo mostramos en detalle en Compatibilidad.', '', ''],
    move: ['Buen momento para mudarte: tu energía revive en un lugar nuevo.', 'Moverte está bien, pero sin prisa. Compara bien las opciones.', 'Mejor quedarte donde estás por ahora. Vuelve a pensarlo en el buen mes de abajo.']
  },
  health: {
    verdict: ['Estable', 'Pide algo de cuidado', 'Cuídate más'], mark: ['○', '△', '△'],
    lead: 'Hemos mirado la energía de la salud en los próximos seis meses.',
    low: 'La energía está más baja hacia {m}/{y}. Ese mes, aligera la agenda, evita viajes largos y pide una revisión con antelación.',
    note: 'Esta lectura usa metáforas de los cinco elementos tradicionales y no es un juicio médico. Nunca predecimos la esperanza de vida ni enfermedades. Si te encuentras mal, consulta a un médico.'
  },
  why: 'Por qué: la energía que llega ahora a {who} es «{ten}».',
  why2: { move: 'También llega una energía que sacude tu lugar (un choque), lo que da más fuerza al cambio.', hap: 'La energía que llega se da la mano con tu lugar, así que todo fluye.', chung: 'La energía que llega choca con tu lugar, así que el corazón vacila con facilidad.', plain: '' },
  note: 'Haz una pregunta da respuestas de referencia según la corriente del Saju tradicional coreano. Para decisiones importantes, ten en cuenta también los hechos y el consejo de expertos.'
};
})();
