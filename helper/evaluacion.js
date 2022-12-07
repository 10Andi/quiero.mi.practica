const evaluacion = [
  {
    adaptabilidad: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Le cuesta adaptarse. Es indeciso y resistente a los cambios.' },
      { value: 3, text: 'Generalmente se adapta pero con dificultades.' },
      { value: 4, text: 'Se adapta a variadas situaciones con escasa dificultad.' },
      { value: 5, text: 'Cambia con facilidad y poco esfuerzo.' }
    ]
  },
  {
    aplicacion: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Necesita supervisión permanente de manera de asegurar su atención al trabajo.' },
      { value: 3, text: 'Trabaja irregularmente. Normalmente pone atención al trabajo.' },
      { value: 4, text: 'Generalmente coloca esfuerzo y atención.' },
      { value: 5, text: 'Siempre coloca esfuerzo y gran atención.' }
    ]
  },
  {
    asistencia: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Se ausenta reiteradamente' },
      { value: 3, text: 'Ocasionalmente se ausenta. Generalmente por buenas razones' },
      { value: 4, text: 'Es muy regular y puntual. Rara vez se ausenta' },
      { value: 5, text: 'No se ausenta ni registra atrasos' }
    ]
  },
  {
    capacidad: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Necesita ayuda detallada para realizar los trabajos.' },
      { value: 3, text: 'Necesita ayuda. Aprende metódicamente.' },
      { value: 4, text: 'Necesita ayuda esporádica para realizar su trabajo.' },
      { value: 5, text: 'Rara vez necesita ayuda. Aprende rápido.' }
    ]
  },
  {
    capacidadDecision: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Jamás toma una decisión por si sólo.' },
      { value: 3, text: 'Ocasionalmente dirime con buen juicio y criterio.' },
      { value: 4, text: 'Generalmente dirime con buen juicio y criterio.' },
      { value: 5, text: 'Dirime con buen juicio y criterio.' }
    ]
  },
  {
    capacidadNegociar: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Casi nunca negocia las actividades a desarrollar por el equipo. Asume toda las tareas que deban desarrollarse.' },
      { value: 3, text: 'Ocasionalmente negocia las actividades a desarrollar por el equipo.' },
      { value: 4, text: 'Generalmente negocia las actividades a desarrollar por el equipo.' },
      { value: 5, text: 'Siempre discute y negocia las actividades a desarrollar.' }
    ]
  },
  {
    confianza: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Necesita monitoreo para evitar errores frecuentes.' },
      { value: 3, text: 'Necesita monitoreo para evitar uno que otro error.' },
      { value: 4, text: 'Comete errores esporádicamente.' },
      { value: 5, text: 'Termina su trabajo con precisión y buen criterio. Siempre revisa su trabajo.' }
    ]
  },
  {
    conocimientos: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Posee conocimientos elementales incompletos.' },
      { value: 3, text: 'Posee conocimientos parciales.' },
      { value: 4, text: 'Posee conocimientos generales y técnicos satisfactorias.' },
      { value: 5, text: 'Posee los conocimientos técnicos suficientes para desarrollarse profesionalmente.' }
    ]
  },
  {
    creatividad: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Sólo desarrolla tareas conocidas.' },
      { value: 3, text: 'Es capaz de resolver algunos problemas novedosos.' },
      { value: 4, text: 'Generalmente resuelve problemas novedosos.' },
      { value: 5, text: 'Resuelve problemas novedosos en forma elegante.' }
    ]
  },
  {
    escrita: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Posee serias dificultades para comunicarse.' },
      { value: 3, text: 'Los informes generados poseen redacción con reparos.' },
      { value: 4, text: 'Los informes escritos están bien redactados salvo algunas faltas de ortografía.' },
      { value: 5, text: 'Posee buena redacción y ortografía.' }
    ]
  },
  {
    ingles: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Posee serias dificultades para comunicarse.' },
      { value: 3, text: 'Los informes generados poseen redacción con reparos y le cuesta comunicarse en forma oral.' },
      { value: 4, text: 'Los informes escritos están bien redactados salvo errores de ortografía y casi siempre puede comunicar sus ideas oralmente.' },
      { value: 5, text: 'Posee buena redacción, ortografía y comunica sus ideas en forma oral sin dificultades' }
    ]
  },
  {
    iniciativa: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Evita responsabilidades. Espera que le asignen el trabajo. Alguien debe explicárselo.' },
      { value: 3, text: 'Espera que le asignen el trabajo. Alguien debe explicárselo.' },
      { value: 4, text: 'Emprende el trabajo a medida que es necesitado.' },
      { value: 5, text: 'Realiza su trabajo sin preguntar y va más allá de lo solicitado.' }
    ]
  },
  {
    liderazgo: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Se limita a realizar sus tareas. No expresa su opinión.' },
      { value: 3, text: 'Realiza sus tareas. Ocasionalmente, expresa su opinión.' },
      { value: 4, text: 'Realiza sus tareas. Generalmente, se destaca por su opinión y por liderar el trabajo.' },
      { value: 5, text: 'Lidera su equipo de trabajo.' }
    ]
  },
  {
    oral: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Posee serios problemas éticos y morales dentro de la organización.' },
      { value: 3, text: 'Ocasionalmente comete actos faltos de ética y moral.' },
      { value: 4, text: 'Comete actos aislados faltos de ética y moral.' },
      { value: 5, text: 'Posee un comportamiento intachable.' }
    ]
  },
  {
    organizacion: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Es incapaz de organizar sus tareas. Requiere de un guía permanente.' },
      { value: 3, text: 'Ocasionalmente organiza sus tareas. Requiere de supervisión.' },
      { value: 4, text: 'Generalmente organiza sus tareas. Rara vez requiere de supervisión.' },
      { value: 5, text: 'Siempre organiza sus actividades sin requerir apoyo alguno.' }
    ]
  },
  {
    responsabilidad: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'No finaliza el trabajo dentro del plazo otorgado.' },
      { value: 3, text: 'Comúnmente termina el trabajo dentro del plazo otorgado.' },
      { value: 4, text: 'Generalmente completa el trabajo dentro del plazo otorgado.' },
      { value: 5, text: 'Completa su trabajo dentro del plazo otorgado.' }
    ]
  },
  {
    trabajoEquipo: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Trabaja sólo y no colabora con los demás.' },
      { value: 3, text: 'Sólo coopera cuando acepta hacerlo.' },
      { value: 4, text: 'Generalmente coopera con otros.' },
      { value: 5, text: 'Siempre coopera. Le interesa el bien de la organización.' }
    ]
  },
  {
    valoresEticosMorales: [
      { value: 0, text: 'No fue evaluado.' },
      { value: 2, text: 'Posee serios problemas éticos y morales dentro de la organización.' },
      { value: 3, text: 'Ocasionalmente comete actos faltos de ética y moral.' },
      { value: 4, text: 'Comete actos aislados faltos de ética y moral.' },
      { value: 5, text: 'Posee un comportamiento intachable.' }
    ]
  }
]

export default evaluacion
