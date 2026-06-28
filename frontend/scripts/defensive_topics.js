// APEX — Defensive Driving Course (DDC).
// TDLR-approved 6-hour course (Texas Education Code 1001 / TDLR Rule 84.500
// for DDC providers). Two purposes:
//   1) TICKET DISMISSAL — court-ordered or court-permitted dismissal of one
//      moving violation per 12 months (TX Code of Criminal Procedure 45.0511)
//   2) INSURANCE DISCOUNT — 10% premium reduction with most TX carriers
//      under TDI rule §5.208 for 3 years after completion.
// Each topic = 4 short cards + an end-of-topic acknowledgement. No simulator,
// no quizzes, no proctored final.

window.APEX_DEFENSIVE_TOPICS = [
  {
    id: 'D1',
    title_en: 'Why you\'re here — what this course gets you',
    title_es: 'Por qué estás aquí — qué obtienes de este curso',
    minutes: 7,
    shorts: [
      {
        title_en: 'Two reasons. Pick yours.',
        title_es: 'Dos razones. Elige la tuya.',
        body_en: 'Texas approves this course for two purposes: (1) dismiss one moving-violation citation per 12 months — the citation is removed from your driving record and the conviction never reaches your insurance; (2) qualify for a 10% TX auto-insurance premium discount for the next 3 years. You can\'t use the same completion for both.',
        body_es: 'Texas aprueba este curso para dos propósitos: (1) descartar una multa por infracción de tránsito al año — se borra del registro y nunca llega al seguro; (2) calificar para 10% de descuento en seguro auto TX por 3 años. No puedes usar el mismo certificado para ambos.',
        visual: 'p-checklist',
      },
      {
        title_en: 'Court paperwork happens BEFORE you start.',
        title_es: 'El papeleo de corte sucede ANTES de empezar.',
        body_en: 'For ticket dismissal: the court must approve the course AND set your due date BEFORE you start. Your judge sets a 90-day window. APEX issues a TDLR-format completion certificate; you submit it to the court, plus the original citation copy, plus the court fee. Miss the window = the citation reverts to a conviction.',
        body_es: 'Para descartar multa: la corte debe aprobar el curso Y poner la fecha límite ANTES de empezar. Tienes 90 días. APEX emite certificado formato TDLR; lo entregas a la corte con copia de la multa y la cuota.',
        visual: 'p-rules',
      },
      {
        title_en: 'For insurance discount: send the cert to your carrier.',
        title_es: 'Para descuento de seguro: envía el certificado a tu aseguradora.',
        body_en: 'Once APEX issues your certificate, email or upload it to your insurance carrier. Most apply the 10% discount within one billing cycle. Discount duration: 3 years from the completion date. After that, you can take the course again to renew.',
        body_es: 'Cuando APEX emita tu certificado, envíalo o súbelo a tu aseguradora. La mayoría aplica el 10% en un ciclo de facturación. Dura 3 años desde la finalización; después puedes retomar el curso.',
        visual: 'p-discount',
      },
    ],
    ack_en: 'I understand the dismissal vs. discount paths and the deadlines.',
    ack_es: 'Entiendo las rutas de descarte vs descuento y los plazos.',
  },

  {
    id: 'D2',
    title_en: 'The Smith System — five habits, in order',
    title_es: 'El Sistema Smith — cinco hábitos, en orden',
    minutes: 9,
    shorts: [
      {
        title_en: '1. Aim high in steering.',
        title_es: '1. Mira lejos al manejar.',
        body_en: 'Look 12-15 seconds down the road, not at the bumper in front of you. At highway speed that\'s a quarter-mile. Your eyes there 80% of the time, scanning mirrors and immediate scene the other 20%. This is the single biggest crash-prevention habit.',
        body_es: 'Mira 12-15 segundos adelante, no la defensa enfrente. A velocidad de autopista son 400m. Tus ojos ahí 80% del tiempo. Es el hábito más importante para evitar choques.',
        visual: 'p-test',
      },
      {
        title_en: '2. Get the big picture.',
        title_es: '2. Mira el panorama completo.',
        body_en: 'Anything that blocks your view — a parked van, a hedge, an SUV in the lane next to you — could be hiding a hazard. Treat it as "act as if there\'s something to see": cover the brake, reduce speed, scan for movement at edges (curbs, between vehicles).',
        body_es: 'Cualquier cosa que bloquee tu vista podría esconder un peligro. "Actúa como si hubiera algo que ver": cubre el freno, reduce, escanea los bordes (banquetas, entre vehículos).',
        visual: 'p-coach',
      },
      {
        title_en: '3. Keep your eyes moving.',
        title_es: '3. Mantén los ojos en movimiento.',
        body_en: 'Every 2 seconds, scan a different sector — left mirror, far ahead, right mirror, dashboard, far ahead. The brain processes movement-and-change far better than a fixed stare. Highway hypnosis kills you because the eyes lock.',
        body_es: 'Cada 2 segundos, escanea un sector distinto — espejo izquierdo, lejos, espejo derecho, tablero, lejos. El cerebro procesa movimiento mejor que mirada fija. La hipnosis de autopista mata.',
        visual: 'p-mirror',
      },
      {
        title_en: '4. Leave yourself an out.',
        title_es: '4. Déjate una salida.',
        body_en: 'Every moment, ask: "If everything went wrong right now, where would I go?" Always have a planned escape — a shoulder, an open lane, a gap. If you can\'t name an out, your following distance is too short or you\'re boxed in.',
        body_es: 'En cada momento pregúntate: "Si todo saliera mal ahora, ¿a dónde voy?" Siempre ten una salida planeada — acotamiento, carril libre, espacio. Si no la tienes, estás muy cerca o encajonado.',
        visual: 'p-rules',
      },
      {
        title_en: '5. Make sure they see you.',
        title_es: '5. Asegúrate de que te vean.',
        body_en: 'Eye contact at intersections. Headlights on at dusk. Brake lights working. Don\'t hover in others\' blind spots — either pass or fall back. Half of multi-car crashes happen because one driver assumed the other "saw them."',
        body_es: 'Contacto visual en intersecciones. Luces al anochecer. Frenos funcionando. No te quedes en el punto ciego ajeno — rebasa o atrasarte. La mitad de los choques múltiples es porque un conductor asumió que el otro "lo vio."',
        visual: 'p-passenger',
      },
    ],
    ack_en: 'I will use the Smith System every drive.',
    ack_es: 'Usaré el Sistema Smith en cada práctica.',
  },

  {
    id: 'D3',
    title_en: 'Following distance, speed, and stopping',
    title_es: 'Distancia, velocidad y frenado',
    minutes: 8,
    shorts: [
      {
        title_en: 'The 3-second rule. Add 1 per bad condition.',
        title_es: 'La regla de 3 segundos. Suma 1 por mala condición.',
        body_en: 'Pick a fixed point. When the car ahead passes it, you should not reach that point before counting "one-thousand-one, one-thousand-two, one-thousand-three." Add 1 for rain, 1 for night, 1 for ice, 1 for towing. So driving in rain at night = 5 seconds.',
        body_es: 'Cuando el carro adelante pase un punto, no debes llegar antes de contar 3 segundos. Suma 1 por lluvia, 1 por noche, 1 por hielo, 1 por remolque. Lluvia + noche = 5 segundos.',
        visual: 'p-coach',
      },
      {
        title_en: 'Speed is squared in the energy equation.',
        title_es: 'La velocidad va al cuadrado en la energía.',
        body_en: 'Kinetic energy = ½ × mass × velocity². Doubling your speed quadruples the energy you have to dissipate in a crash. 30→60 mph = 4× the impact force. That\'s why "just 5 over" doesn\'t scale linearly to risk.',
        body_es: 'Energía cinética = ½ × masa × velocidad². Duplicar la velocidad cuadruplica la energía del choque. 30→60 mph = 4× la fuerza. Por eso "solo 5 más rápido" no es proporcional al riesgo.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Total stopping distance has TWO parts.',
        title_es: 'La distancia total de frenado tiene DOS partes.',
        body_en: 'Reaction distance (you see the hazard → your foot hits the brake): about 1.5 seconds, or ~88 ft at 60 mph. Braking distance (brake pressed → fully stopped): another ~140 ft at 60 mph on dry pavement. Total: 228 ft. On wet pavement, double the braking portion.',
        body_es: 'Distancia de reacción (ves el peligro → pisas el freno): ~1.5 segundos, ~27m a 60 mph. Distancia de frenado: ~43m a 60 mph en seco. Total: 70m. En mojado, dobla la parte de frenado.',
        visual: 'p-test',
      },
      {
        title_en: 'Threshold braking beats panic braking.',
        title_es: 'El frenado controlado vence al frenado en pánico.',
        body_en: 'Modern cars with ABS: press the brake firmly and hold — don\'t pump. The ABS system pumps for you. With ABS engaged, you can also steer while braking; without, locked wheels = no steering. If you feel the pedal pulse, you\'re using ABS correctly.',
        body_es: 'Carros modernos con ABS: pisa el freno firme y mantén — no bombees. El ABS bombea por ti. Con ABS puedes seguir maniobrando; sin él, llantas bloqueadas = sin dirección. Si sientes el pedal pulsar, lo usas bien.',
        visual: 'p-autofail',
      },
    ],
    ack_en: 'I will keep proper following distance and brake correctly.',
    ack_es: 'Mantendré distancia adecuada y frenaré correctamente.',
  },

  {
    id: 'D4',
    title_en: 'Intersections — where most crashes happen',
    title_es: 'Intersecciones — donde ocurren la mayoría de choques',
    minutes: 8,
    shorts: [
      {
        title_en: '40% of urban crashes happen at intersections.',
        title_es: '40% de los choques urbanos ocurren en intersecciones.',
        body_en: 'Intersections are where lanes cross, signals can be missed, blind spots compound, and right-of-way assumptions diverge. The single most-effective defensive habit at any intersection: cover the brake, scan left-right-left, and never rely on the other driver to follow the rules.',
        body_es: 'Las intersecciones son donde se cruzan los carriles, se pierden señales, se acumulan puntos ciegos. El hábito defensivo más efectivo: cubre el freno, escanea izq-der-izq, y nunca confíes en que el otro siga las reglas.',
        visual: 'p-test',
      },
      {
        title_en: 'Yellow means stop, when safe.',
        title_es: 'Amarillo significa para, si es seguro.',
        body_en: 'A yellow light is a warning the green is ending. You must stop before the intersection unless stopping would be unsafe (car right on your bumper). The "I can make it" instinct is wrong about 12% of the time — and that 12% is where most adult-driver T-bone fatalities happen.',
        body_es: 'Una luz amarilla advierte que el verde termina. Debes parar antes de la intersección a menos que parar sea inseguro. El instinto "puedo lograrlo" se equivoca 12% — y ese 12% causa la mayoría de choques en T fatales.',
        visual: 'p-rules',
      },
      {
        title_en: 'Look LEFT-right-left before proceeding on green.',
        title_es: 'Mira IZQ-der-izq antes de avanzar en verde.',
        body_en: 'Cars running red lights almost always come from the LEFT (because they accelerated before the light changed). Even on a green you owe yourself one quick scan in the most dangerous direction first. Three-tenths of a second buys you the option to stop.',
        body_es: 'Los carros que se pasan el rojo casi siempre vienen de la IZQUIERDA. Incluso en verde, debes escanear primero esa dirección. 0.3 segundos te dan la opción de parar.',
        visual: 'p-mirror',
      },
      {
        title_en: 'Left turns kill more than any other maneuver.',
        title_es: 'Los giros a la izquierda matan más que cualquier otra maniobra.',
        body_en: 'Crossing oncoming traffic is the highest-risk movement at any intersection. NHTSA: 36% of intersection fatalities involve a left turn. Counter-strategies: position your wheels straight (not pre-turned, in case you\'re rear-ended), wait for a clear gap, never trust an oncoming driver\'s blinker.',
        body_es: 'Cruzar el tráfico opuesto es la maniobra de mayor riesgo. NHTSA: 36% de las muertes en intersecciones son giros a la izquierda. Mantén las llantas rectas (no pre-giradas, por si te embisten por atrás), espera un espacio claro, nunca confíes en la direccional ajena.',
        visual: 'p-coach',
      },
    ],
    ack_en: 'I will treat intersections as the highest-risk part of every drive.',
    ack_es: 'Trataré las intersecciones como la parte de mayor riesgo.',
  },

  {
    id: 'D5',
    title_en: 'Sharing the road safely',
    title_es: 'Compartir el camino de forma segura',
    minutes: 7,
    shorts: [
      {
        title_en: 'TX 3-foot bicycle passing law.',
        title_es: 'Ley TX de 3 pies para rebasar bicis.',
        body_en: 'TX vehicle code §545.428 requires 3 feet of clearance when you pass a cyclist (commercial vehicles need 6 feet). On narrow roads where you can\'t legally pass with that margin, slow down and wait. Buzzing a cyclist is a moving violation.',
        body_es: 'El código TX §545.428 requiere 3 pies de distancia al rebasar bicis (comerciales 6 pies). En calles angostas, reduce y espera.',
        visual: 'p-rules',
      },
      {
        title_en: 'Motorcycles disappear in your blind spot.',
        title_es: 'Las motos desaparecen en tu punto ciego.',
        body_en: 'A motorcycle is a quarter the visual size of a car at the same distance. Your peripheral vision underestimates how close they are. Always do a full head-check before changing lanes. Half of car-vs-motorcycle crashes start with a driver who "didn\'t see" the bike.',
        body_es: 'Una moto es un cuarto del tamaño visual de un carro a la misma distancia. Tu visión periférica subestima qué tan cerca están. Siempre revisa por encima del hombro al cambiar.',
        visual: 'p-mirror',
      },
      {
        title_en: '18-wheelers have huge no-zones.',
        title_es: 'Los camiones de 18 ruedas tienen enormes zonas ciegas.',
        body_en: 'If you can\'t see the trucker\'s mirrors, they can\'t see you. No-zones extend 20 ft in front, 30 ft behind, one lane to the left, two lanes to the right. Trucks need 4× the stopping distance you do — never cut in front and brake.',
        body_es: 'Si no ves los espejos del camionero, él no te ve. Zonas ciegas: 6m al frente, 9m atrás, un carril a la izquierda, dos a la derecha. Los camiones necesitan 4× tu distancia de frenado.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Move Over law for emergencies and tow trucks.',
        title_es: 'Ley de cambiar de carril para emergencias y grúas.',
        body_en: '§545.157: when passing a stopped emergency vehicle, tow truck, or TxDOT vehicle on the shoulder, move over one lane OR slow to 20 mph below the posted limit. Up to $500 fine. $2,000 + jail if you cause an injury.',
        body_es: '§545.157: al pasar emergencia, grúa o TxDOT en el acotamiento, cambia de carril O reduce a 20 mph bajo el límite. Hasta $500 de multa. $2,000 + cárcel si hieres a alguien.',
        visual: 'p-test',
      },
    ],
    ack_en: 'I will give cyclists, motorcycles, trucks, and emergency vehicles space.',
    ack_es: 'Daré espacio a ciclistas, motos, camiones y emergencias.',
  },

  {
    id: 'D6',
    title_en: 'Hazardous conditions — rain, night, fog, ice',
    title_es: 'Condiciones peligrosas — lluvia, noche, niebla, hielo',
    minutes: 8,
    shorts: [
      {
        title_en: 'First 10 minutes of rain are the worst.',
        title_es: 'Los primeros 10 minutos de lluvia son los peores.',
        body_en: 'Oil and rubber accumulate during dry weather. The first rainfall lifts that mixture and turns the road into a skating rink for ~10 minutes. Crash rates spike at the START of a storm, not at peak rainfall. Slow down immediately when you feel the first drops.',
        body_es: 'Aceite y goma se acumulan en la calle. La primera lluvia los levanta y hace la calle resbaladiza ~10 minutos. Los choques suben al INICIO de la tormenta. Reduce velocidad de inmediato.',
        visual: 'p-variety',
      },
      {
        title_en: 'Hydroplaning: ease, don\'t stomp.',
        title_es: 'Hidroplaneo: suelta el acelerador, no frenes.',
        body_en: 'You\'ll feel the steering wheel go light. DO NOT brake hard. DO NOT make sharp inputs. Ease off the gas, hold the wheel straight, let the tires re-engage. Hydroplaning starts as low as 35 mph in heavy rain. Hard braking turns hydroplaning into a spin.',
        body_es: 'Sentirás el volante ligero. NO frenes fuerte. NO muevas bruscamente. Suelta el gas, mantén el volante recto, deja que las llantas vuelvan a agarrar. El hidroplaneo empieza a 35 mph.',
        visual: 'p-callins',
      },
      {
        title_en: 'Night driving cuts your sight distance in half.',
        title_es: 'Manejar de noche reduce tu visibilidad a la mitad.',
        body_en: 'Even with high beams, you can\'t see further than your headlight reach — typically 250-350 ft for low beams, 450-600 ft for high. At 60 mph, your low-beam visibility is barely 3 seconds of stopping room. Adjust your speed to "stop within sight."',
        body_es: 'Incluso con luces altas, no ves más allá del alcance — 75-100m con bajas, 140-180m con altas. A 60 mph, las luces bajas apenas dan 3 segundos para parar. Ajusta velocidad a "parar dentro de lo que ves."',
        visual: 'p-mirror',
      },
      {
        title_en: 'Ice in TX — bridges freeze first.',
        title_es: 'Hielo en TX — los puentes se congelan primero.',
        body_en: 'Bridges and overpasses freeze before regular roads (cold air circulates underneath). When TX gets a freeze, the surprises are on bridges. Slow down before, not on. If you start to slide: take your foot off the gas, don\'t brake, steer where you want to go.',
        body_es: 'Los puentes y pasos a desnivel se congelan antes que las calles (aire frío circula abajo). En la helada de TX, las sorpresas son en puentes. Reduce ANTES, no encima. Si patinas: suelta el gas, no frenes, gira hacia donde quieres ir.',
        visual: 'p-coach',
      },
    ],
    ack_en: 'I will adjust my driving for rain, night, fog, and ice.',
    ack_es: 'Ajustaré mi manejo para lluvia, noche, niebla y hielo.',
  },

  {
    id: 'D7',
    title_en: 'DUI / drugs — the legal cliff',
    title_es: 'DWI / drogas — el precipicio legal',
    minutes: 9,
    shorts: [
      {
        title_en: 'BAC 0.08+ = automatic DWI in TX.',
        title_es: 'BAC 0.08+ = DWI automático en TX.',
        body_en: 'For drivers 21+: BAC of 0.08 or higher is DWI per TX Penal Code §49.04. First offense: up to $2,000 fine, 3-180 days jail, license suspension. Commercial drivers: 0.04. Under-21: ANY detectable alcohol.',
        body_es: 'Conductores 21+: BAC 0.08 o más = DWI según Código Penal §49.04. Primera ofensa: hasta $2,000 de multa, 3-180 días de cárcel, suspensión. Comerciales: 0.04. Menores de 21: cualquier alcohol detectable.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Implied consent — refusing the test costs you.',
        title_es: 'Consentimiento implícito — negarte a la prueba cuesta caro.',
        body_en: 'Getting a TX driver license = automatic consent to a breath or blood test if a peace officer arrests you for DWI. Refuse and your license is automatically suspended for 180 days, even if you\'re later acquitted. Second refusal: 2 years.',
        body_es: 'Tener licencia TX = consentimiento automático a prueba de aliento o sangre si te arrestan por DWI. Negarte = suspensión automática 180 días, aunque luego te absuelvan. Segunda vez: 2 años.',
        visual: 'p-autofail',
      },
      {
        title_en: 'The "buzzed but not drunk" trap.',
        title_es: 'La trampa de "tomadito pero no borracho".',
        body_en: 'BAC 0.05 doubles your crash risk vs. zero. 0.08 doubles it again. People who feel "fine to drive" are usually already in the doubled-risk zone. Reaction time slows linearly from the first drink — there\'s no safe number once you\'re behind the wheel.',
        body_es: 'BAC 0.05 dobla tu riesgo de choque vs. cero. 0.08 lo dobla otra vez. Quien "se siente bien" usualmente ya está en zona de doble riesgo. La reacción se vuelve lenta desde el primer trago.',
        visual: 'p-coach',
      },
      {
        title_en: 'Cannabis: TX standard is impairment, not THC level.',
        title_es: 'Cannabis: el estándar TX es deterioro, no nivel de THC.',
        body_en: 'Texas has no THC numerical limit like some other states. A trooper can charge you with DWI based on field-sobriety performance and odor alone, even if a blood test wouldn\'t exceed any specific number. Penalties match alcohol DWI. Prescriptions: same rule applies — impairment is impairment.',
        body_es: 'Texas no tiene límite numérico de THC. Un policía puede acusarte de DWI por desempeño en sobriedad y olor, aunque la sangre no exceda un número. Penalidades igual al alcohol. Recetas: aplica igual.',
        visual: 'p-rules',
      },
    ],
    ack_en: 'I will not drive after drinking, smoking, or impairing prescriptions.',
    ack_es: 'No manejaré después de tomar, fumar o medicinas que afecten.',
  },

  {
    id: 'D8',
    title_en: 'After a crash — what to do, what NOT to do',
    title_es: 'Después de un choque — qué hacer y qué NO hacer',
    minutes: 6,
    shorts: [
      {
        title_en: 'Stop. Always. Leaving = hit-and-run.',
        title_es: 'Para. Siempre. Irte = chocar y huir.',
        body_en: 'TX Transportation Code §550 requires you to stop at the scene, exchange info, and (if there\'s injury or > $1,000 property damage) report to police. Leaving when someone\'s hurt is a felony — up to 2 years prison. Even a fender-bender requires a stop.',
        body_es: 'El código §550 te obliga a parar, intercambiar información, y (si hay heridos o daño > $1,000) reportar a la policía. Irte si hay heridos es delito grave — hasta 2 años de prisión.',
        visual: 'p-crash',
      },
      {
        title_en: 'Photos first. Apology later (or never).',
        title_es: 'Fotos primero. Disculpa después (o nunca).',
        body_en: 'Photograph all vehicles, license plates, damage, the road, and signs. Get the other driver\'s license + insurance. DO NOT say "I\'m sorry" — that admission gets used against you in court regardless of who was at fault. Be polite but factual.',
        body_es: 'Foto de vehículos, placas, daños, calle, señales. Pide licencia y seguro del otro. NO digas "lo siento" — esa admisión se usa en tribunales sin importar quién tuvo la culpa.',
        visual: 'p-photos',
      },
      {
        title_en: 'Call insurance same day. Even if it\'s minor.',
        title_es: 'Llama al seguro el mismo día. Aunque sea menor.',
        body_en: 'Most TX policies require notification within 24-48 hours. Even if you and the other driver agree to settle privately, file the report — the other driver can change their mind in 30 days, and your unreported claim becomes a fraud problem.',
        body_es: 'La mayoría de pólizas TX requieren notificación en 24-48 horas. Reporta aunque acuerden no usar seguro — la otra parte puede cambiar de opinión en 30 días.',
        visual: 'p-callins',
      },
    ],
    ack_en: 'I will stop, document, and report any crash I\'m in.',
    ack_es: 'Pararé, documentaré y reportaré cualquier choque.',
  },
];
