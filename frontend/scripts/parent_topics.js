// APEX — parent-track curriculum.
// 8 topics, each delivered as 3-5 short cards (no quizzes, no simulator).
// The signed-off acknowledgement at the end of each topic counts toward the
// parent's "supervisor certification" badge — TX doesn't legally require this
// but it gives parents a structured 90-minute crash course on what they're
// actually supervising.

window.APEX_PARENT_TOPICS = [
  {
    id: 'P1',
    title_en: 'Texas GDL — what your teen legally cannot do',
    title_es: 'GDL de Texas — lo que tu adolescente no puede hacer legalmente',
    minutes: 8,
    shorts: [
      {
        title_en: 'Curfew window: midnight to 5am.',
        title_es: 'Toque de queda: 12am a 5am.',
        body_en: 'For 12 months OR until age 18 (whichever comes first), your teen cannot drive between 12am and 5am EXCEPT for school, work, or medical reasons. You CAN ride with them in this window — but only if they\'re still in Phase 1 (learner permit).',
        body_es: 'Por 12 meses O hasta los 18 (lo que venga primero), tu adolescente no puede manejar entre las 12am y 5am EXCEPTO por escuela, trabajo o emergencia médica.',
        visual: 'p-curfew',
      },
      {
        title_en: 'No phone. At all. Hands-free included.',
        title_es: 'Sin teléfono. Para nada. Incluso manos libres.',
        body_en: 'Texas GDL bans ALL wireless device use while driving for the first 12 months — including hands-free. The fine is up to $99 first offense, plus license suspension. Common-misconception alert: this is stricter than the adult rule.',
        body_es: 'El GDL de Texas prohíbe TODO uso de dispositivos inalámbricos los primeros 12 meses — incluso manos libres. Multa hasta $99 la primera vez.',
        visual: 'p-phone',
      },
      {
        title_en: 'One non-family minor passenger. Maximum.',
        title_es: 'Máximo un pasajero menor no familiar.',
        body_en: 'One. NOT two. Crash rates double with each additional teen passenger — this rule is backed by 20 years of NHTSA data. Family members of any age don\'t count toward the limit.',
        body_es: 'Uno. NO dos. Las tasas de choque se duplican con cada pasajero adolescente adicional.',
        visual: 'p-passengers',
      },
    ],
    ack_en: 'I understand the GDL restrictions and will help enforce them.',
    ack_es: 'Entiendo las restricciones del GDL y ayudaré a hacerlas cumplir.',
  },

  {
    id: 'P2',
    title_en: 'The 30 hours of behind-the-wheel — what counts',
    title_es: 'Las 30 horas al volante — qué cuenta',
    minutes: 7,
    shorts: [
      {
        title_en: '30 hours total. 10 of them at night.',
        title_es: '30 horas totales. 10 de ellas de noche.',
        body_en: 'Texas requires 30 hours of supervised behind-the-wheel practice with you (or another licensed adult 21+) before the road test. AT LEAST 10 of those hours must be after sunset. APEX tracks both buckets automatically.',
        body_es: 'Texas requiere 30 horas de práctica supervisada contigo (o un adulto licenciado 21+). MÍNIMO 10 horas deben ser después del atardecer.',
        visual: 'p-hours',
      },
      {
        title_en: 'You sign every drive. Falsifying = state offense.',
        title_es: 'Tú firmas cada práctica. Falsificar = delito estatal.',
        body_en: 'When your teen logs a drive in APEX, you e-sign it from your phone. The signature is your legally binding attestation that the drive happened as recorded. Falsifying TDLR-regulated records is a state-level offense — TDLR audits randomly.',
        body_es: 'Cuando tu adolescente registra una práctica, tú la firmas desde tu teléfono. Tu firma es una atestación legalmente vinculante.',
        visual: 'p-sign',
      },
      {
        title_en: 'Variety beats hours. Weather, time, road type.',
        title_es: 'La variedad gana a las horas. Clima, hora, tipo de camino.',
        body_en: '30 hours of empty parking lot ≠ 30 hours of real practice. Mix neighborhoods, highways, rain, dusk, parking lots, parallel parking. The DPS road test will throw conditions your teen hasn\'t seen — the only fix is exposure.',
        body_es: '30 horas en un estacionamiento vacío ≠ 30 horas de práctica real. Mezcla colonias, autopistas, lluvia, anochecer, estacionamiento paralelo.',
        visual: 'p-variety',
      },
    ],
    ack_en: 'I will log all 30 hours honestly and include night + varied conditions.',
    ack_es: 'Registraré las 30 horas con honestidad e incluiré noche y condiciones variadas.',
  },

  {
    id: 'P3',
    title_en: 'How to coach without making them hate it',
    title_es: 'Cómo enseñar sin que lo odien',
    minutes: 6,
    shorts: [
      {
        title_en: 'Quiet voice. Loud reactions kill learning.',
        title_es: 'Voz tranquila. Las reacciones fuertes matan el aprendizaje.',
        body_en: 'When you yelp every time they brake late, their cortisol spikes and they freeze. Talk in a calm, even voice — even when it\'s scary. Save corrections for when the car is parked.',
        body_es: 'Cuando gritas cada vez que frenan tarde, su cortisol sube y se paralizan. Habla con voz calmada y pareja — incluso cuando da miedo.',
        visual: 'p-coach',
      },
      {
        title_en: 'One thing at a time. Not five.',
        title_es: 'Una cosa a la vez. No cinco.',
        body_en: 'New drivers can\'t process "watch your speed AND mirror check AND use signal AND ease the brake" simultaneously. Pick ONE focus per drive. "Today is mirror checks" — and let the rest slide.',
        body_es: 'Los nuevos conductores no pueden procesar "mira la velocidad Y revisa el espejo Y usa la señal" al mismo tiempo. Elige UNA cosa por práctica.',
        visual: 'p-focus',
      },
      {
        title_en: 'You\'re a passenger first, instructor second.',
        title_es: 'Eres pasajero primero, instructor segundo.',
        body_en: 'Your job in the seat: scan ahead 5+ seconds further than them, identify hazards before they do, give simple directional cues ("turn right at the light"). Critique happens in the driveway after, not during.',
        body_es: 'Tu trabajo: escanear 5+ segundos más adelante que ellos, identificar peligros antes que ellos, dar indicaciones simples. La crítica es después.',
        visual: 'p-passenger',
      },
    ],
    ack_en: 'I will coach calmly and give one focus per drive.',
    ack_es: 'Enseñaré con calma y daré un solo enfoque por práctica.',
  },

  {
    id: 'P4',
    title_en: 'Texas DPS road test — what they actually grade',
    title_es: 'Examen DPS de Texas — qué califican realmente',
    minutes: 9,
    shorts: [
      {
        title_en: 'Three big buckets: control, awareness, judgment.',
        title_es: 'Tres áreas grandes: control, conciencia, juicio.',
        body_en: 'The DPS examiner scores: vehicle control (smooth steering, smooth braking, smooth accel), awareness (mirror checks, head checks, scanning), and judgment (gap selection at intersections, lane changes, yielding). Bombing any one bucket fails the test.',
        body_es: 'El examinador califica: control del vehículo, conciencia (espejos, hombro, escaneo), y juicio (decisiones de tráfico). Reprobar cualquiera de las tres reprueba el examen.',
        visual: 'p-test',
      },
      {
        title_en: 'Auto-fails: rolling stop, no head check, hitting curb.',
        title_es: 'Reprobaciones automáticas: alto rodante, sin hombro, golpear banqueta.',
        body_en: 'Some mistakes end the test instantly: not stopping fully at a stop sign, no over-the-shoulder check on lane change, hitting the curb on parallel park, or any unsafe maneuver the examiner has to intervene on.',
        body_es: 'Algunos errores terminan el examen al instante: no parar completo en un alto, no checar el hombro al cambiar de carril, golpear la banqueta al estacionar.',
        visual: 'p-autofail',
      },
      {
        title_en: 'They expect over-the-shoulder. Visibly. Every time.',
        title_es: 'Esperan revisar el hombro. Visiblemente. Cada vez.',
        body_en: 'The examiner is watching your teen\'s head. Mirror-only is an instant deduction. Make sure they\'re practicing the visible head-turn for every lane change and every right-turn-on-red.',
        body_es: 'El examinador mira la cabeza de tu adolescente. Solo espejo es deducción inmediata.',
        visual: 'p-mirror',
      },
    ],
    ack_en: 'I will help my teen rehearse the head-check + full-stop habits.',
    ack_es: 'Ayudaré a mi adolescente a practicar el hombro y los altos completos.',
  },

  {
    id: 'P5',
    title_en: 'Insurance — adding a teen, what to expect',
    title_es: 'Seguro — agregar un adolescente, qué esperar',
    minutes: 6,
    shorts: [
      {
        title_en: 'Adding a teen typically doubles your premium.',
        title_es: 'Agregar un adolescente normalmente duplica la prima.',
        body_en: 'Industry average: a teen male driver adds 80–150% to your annual premium; a teen female adds 50–100%. Shop quotes BEFORE the road test — once they have a license, you\'re legally required to insure them on day one.',
        body_es: 'Promedio: un adolescente hombre agrega 80–150% a tu prima anual; una adolescente mujer 50–100%. Cotiza ANTES del examen.',
        visual: 'p-insurance',
      },
      {
        title_en: 'Good-student discount: 10–25% if GPA ≥ 3.0.',
        title_es: 'Descuento por buen estudiante: 10–25% si el GPA ≥ 3.0.',
        body_en: 'Most carriers (Progressive, GEICO, Allstate, State Farm) cut 10–25% off teen premiums for a B-average. Ask explicitly — they often don\'t volunteer it. Driver-ed completion (the certificate APEX issues) typically adds another 5–10%.',
        body_es: 'Aseguradoras como Progressive, GEICO, Allstate cortan 10–25% por GPA de B+. Pregunta explícitamente.',
        visual: 'p-discount',
      },
      {
        title_en: 'TX minimums won\'t cover a real accident.',
        title_es: 'Los mínimos de TX no cubren un choque real.',
        body_en: 'Texas minimum is 30/60/25 ($30k bodily-injury per person / $60k per accident / $25k property). A single bad highway crash blows past those numbers in 10 minutes. Talk to your agent about 100/300/100 with your teen on the policy — the marginal cost is small relative to the exposure.',
        body_es: 'El mínimo de TX (30/60/25) no cubre un choque real. Considera 100/300/100 con tu adolescente en la póliza.',
        visual: 'p-coverage',
      },
    ],
    ack_en: 'I will get a quote and consider higher liability limits.',
    ack_es: 'Pediré cotización y consideraré límites más altos de responsabilidad.',
  },

  {
    id: 'P6',
    title_en: 'When to revoke the keys (and how)',
    title_es: 'Cuándo quitar las llaves (y cómo)',
    minutes: 5,
    shorts: [
      {
        title_en: 'Yes, you can. Yes, even after they have a license.',
        title_es: 'Sí, puedes. Sí, incluso después de tener licencia.',
        body_en: 'You own the car or you co-signed the policy. You set the conditions of use. Revoking driving privileges for unsafe behavior, broken curfew, or grades is your right — and most teen-driver-safety research says enforced consequences are the single biggest behavioral lever you have.',
        body_es: 'Tú eres dueño del carro o co-firmaste la póliza. Tú pones las condiciones. Quitar privilegios por mala conducta es tu derecho.',
        visual: 'p-keys',
      },
      {
        title_en: 'Set the rules in writing. Before, not after.',
        title_es: 'Pon las reglas por escrito. Antes, no después.',
        body_en: 'Before the road test, write down: curfew, max passengers, phone rule, grades requirement, what happens if rules break. Sign it together. Then enforce it the first time. The second time is too late.',
        body_es: 'Antes del examen, escribe: toque de queda, máximo de pasajeros, regla del teléfono, requisitos de calificaciones, consecuencias.',
        visual: 'p-rules',
      },
    ],
    ack_en: 'We will agree on written rules before they get the license.',
    ack_es: 'Acordaremos reglas por escrito antes de que tengan la licencia.',
  },

  {
    id: 'P7',
    title_en: 'After a crash — what to do, what NOT to do',
    title_es: 'Después de un choque — qué hacer y qué NO hacer',
    minutes: 7,
    shorts: [
      {
        title_en: 'Stop. Always. Leaving = hit-and-run.',
        title_es: 'Para. Siempre. Irte = chocar y huir.',
        body_en: 'Texas Transportation Code §550: you MUST stop at the scene, exchange info, and (if injury or > $1k damage) report to police. Leaving is a felony if anyone\'s hurt. Even a fender-bender requires a stop.',
        body_es: 'Código §550: DEBES parar, intercambiar información, y (si hay heridos o daño > $1k) reportar a la policía. Irte es delito grave si alguien está herido.',
        visual: 'p-crash',
      },
      {
        title_en: 'Photos first. Apology later (or never).',
        title_es: 'Fotos primero. Disculpa después (o nunca).',
        body_en: 'At the scene: photograph all vehicles, all license plates, all damage, the road, the signs, the time-stamped clock if visible. Get the other driver\'s license + insurance. DO NOT say "I\'m sorry" or admit fault — that statement gets used against you in court.',
        body_es: 'En la escena: foto de vehículos, placas, daños, calle, señales. Pide licencia y seguro del otro. NO digas "lo siento" — esa frase se usa en tu contra.',
        visual: 'p-photos',
      },
      {
        title_en: 'Call insurance same day. Even if it\'s minor.',
        title_es: 'Llama al seguro el mismo día. Aunque sea menor.',
        body_en: 'Most policies require notification within 24-48 hours. Even if you and the other driver agree to handle it without insurance, file a report — the other driver can change their mind in 30 days, and your unreported claim becomes a fraud problem.',
        body_es: 'La mayoría de pólizas requieren notificación en 24-48 horas. Reporta aunque acuerden no usar seguro — la otra parte puede cambiar de opinión en 30 días.',
        visual: 'p-callins',
      },
    ],
    ack_en: 'I will rehearse the crash protocol with my teen.',
    ack_es: 'Practicaré el protocolo de choque con mi adolescente.',
  },

  {
    id: 'P8',
    title_en: 'Day of the road test — the parent checklist',
    title_es: 'Día del examen — la lista del padre',
    minutes: 5,
    shorts: [
      {
        title_en: 'Bring everything. They will ask for everything.',
        title_es: 'Trae todo. Te van a pedir todo.',
        body_en: 'Required at the DPS: learner permit (original), proof of identity, proof of insurance for the vehicle, vehicle registration, vehicle inspection (current), the APEX completion certificate, your DE-964 BTW log, and the parent ID. Missing any one = come back another day.',
        body_es: 'Requerido en el DPS: permiso, identificación, prueba de seguro del vehículo, registro, inspección vehicular vigente, certificado APEX, formato DE-964, ID de padre.',
        visual: 'p-checklist',
      },
      {
        title_en: 'Use a car they\'ve actually driven.',
        title_es: 'Usa un carro que realmente hayan manejado.',
        body_en: 'The DPS road test happens in YOUR vehicle. Don\'t show up in your dad\'s lifted truck or your sister\'s manual transmission. The car they take the test in should be the same one they\'ve practiced 30 hours in.',
        body_es: 'El examen es en TU vehículo. Que sea el mismo carro donde practicaron las 30 horas — no la troca de papá ni el estándar de tu hermana.',
        visual: 'p-car',
      },
      {
        title_en: 'You can\'t coach during the test. Be visibly calm.',
        title_es: 'No puedes hablar durante el examen. Mantén la calma visible.',
        body_en: 'You wait outside. The examiner rides shotgun. Make sure your teen ate, slept, and used the bathroom — and that you didn\'t spend the morning reciting failure scenarios at them. Confidence beats prep on test day.',
        body_es: 'Tú esperas afuera. El examinador va al frente. Asegúrate que tu adolescente comió, durmió, y usó el baño. La confianza vence a la preparación el día del examen.',
        visual: 'p-testday',
      },
    ],
    ack_en: 'I will prepare the documents and stay calm on test day.',
    ack_es: 'Prepararé los documentos y estaré tranquilo el día del examen.',
  },
];
