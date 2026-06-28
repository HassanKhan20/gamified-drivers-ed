// APEX — Adult Driver Education curriculum.
// TDLR-approved 6-hour course (Texas Education Code 1001) for first-time
// license applicants 18-24 who didn't take the teen course. No simulator,
// no behind-the-wheel logbook required, no quizzes — just digestible shorts
// with an end-of-topic acknowledgement.
//
// Same data shape as parent_topics.js so adult_learn.html can reuse the
// player UI directly.

window.APEX_ADULT_TOPICS = [
  {
    id: 'A1',
    title_en: 'Welcome — what this course is and isn\'t',
    title_es: 'Bienvenida — qué es y qué no es este curso',
    minutes: 8,
    shorts: [
      {
        title_en: 'Texas requires 6 hours. We respect your time.',
        title_es: 'Texas requiere 6 horas. Respetamos tu tiempo.',
        body_en: 'You\'re here because Texas Education Code §1001 requires adult license applicants 18–24 to complete a TDLR-approved 6-hour course before the road test. APEX uses real engagement minutes (not slide-timers) so you finish at YOUR pace and the clock still hits the legal 6 hours when you\'re actually engaged.',
        body_es: 'Estás aquí porque el Código §1001 requiere a solicitantes de 18-24 años un curso TDLR de 6 horas antes del examen práctico. APEX usa minutos de participación real, no temporizadores de diapositivas.',
        visual: 'p-checklist',
      },
      {
        title_en: 'You don\'t need 30 hours of behind-the-wheel.',
        title_es: 'No necesitas 30 horas al volante.',
        body_en: 'Adult applicants skip the 30-hour BTW requirement that teens have. You still need to pass the DPS road test in a real vehicle — but you don\'t need a parent or a logbook to get there. Practice with a licensed adult is still strongly recommended.',
        body_es: 'Los solicitantes adultos no necesitan las 30 horas al volante que requieren los adolescentes. Aún debes aprobar el examen práctico, pero sin libro de bitácora ni firma de padre.',
        visual: 'p-hours',
      },
      {
        title_en: 'What you walk away with.',
        title_es: 'Con qué te vas.',
        body_en: 'A TDLR-issued completion certificate (uploaded directly to the DPS), the knowledge to pass the written test on the first try, and enough defensive-driving fundamentals to actually be safe — not just legal — once you\'re on the road.',
        body_es: 'Un certificado emitido por TDLR (cargado directo al DPS), el conocimiento para aprobar el examen escrito a la primera, y los fundamentos para conducir realmente seguro.',
        visual: 'p-test',
      },
    ],
    ack_en: 'I understand the 6-hour requirement and that engagement minutes count.',
    ack_es: 'Entiendo el requisito de 6 horas y que cuentan los minutos de participación.',
  },

  {
    id: 'A2',
    title_en: 'Texas traffic laws — the ones that get you ticketed',
    title_es: 'Leyes de tránsito de TX — las que sí te multan',
    minutes: 9,
    shorts: [
      {
        title_en: 'Speed limits are NOT suggestions.',
        title_es: 'Los límites de velocidad NO son sugerencias.',
        body_en: 'TX has presumed-speed-limit and absolute-speed-limit zones. School zones and active construction are absolute — fines double or triple. The "10 mph over" tolerance is folklore; in practice TX state troopers cite at the limit, especially after midnight when most stops are looking for DUI.',
        body_es: 'Los límites en zonas escolares y de construcción son absolutos — las multas se duplican o triplican. El "10 mph extra" es mito; los policías estatales multan al límite, especialmente de noche.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Move Over law — §545.157.',
        title_es: 'Ley de cambiar de carril — §545.157.',
        body_en: 'When you pass a stopped emergency vehicle, tow truck, or TxDOT vehicle on the shoulder, you MUST move over one lane OR slow to 20 mph below the limit. Up to $500 fine. $2,000 + jail if you cause an injury.',
        body_es: 'Al pasar una emergencia o grúa parada en el acotamiento, DEBES cambiar de carril o reducir a 20 mph bajo el límite. Hasta $500 de multa. $2,000 + cárcel si causas heridos.',
        visual: 'p-test',
      },
      {
        title_en: 'School-bus stop arm = full stop. Both directions.',
        title_es: 'Brazo de alto del autobús escolar = alto total. Ambas direcciones.',
        body_en: 'On a 2-lane road or undivided highway: BOTH directions stop until the lights stop and the arm retracts. On a divided highway with a physical barrier: only the bus side stops. Fines start at $500 and the violation goes on your driving record for life.',
        body_es: 'En camino de 2 carriles: AMBAS direcciones paran hasta que las luces se apaguen. En autopista dividida con barrera: solo el lado del autobús. Multas desde $500 y queda en tu registro de por vida.',
        visual: 'p-autofail',
      },
      {
        title_en: 'Anti-texting law applies to ALL drivers.',
        title_es: 'La ley anti-texto aplica a TODOS los conductores.',
        body_en: 'Texas bans reading, writing, or sending texts while driving — first offense up to $99, second offense up to $200. School zones are stricter: ANY hand-held use is illegal. The rule is enforced; troopers can pull you over for visible phone use even without other violations.',
        body_es: 'Texas prohíbe leer, escribir o enviar textos al manejar — primera multa hasta $99, segunda hasta $200. Zonas escolares: TODO uso del celular en mano es ilegal.',
        visual: 'p-phone',
      },
    ],
    ack_en: 'I will follow speed, move-over, and anti-texting rules.',
    ack_es: 'Seguiré las reglas de velocidad, cambio de carril y anti-texto.',
  },

  {
    id: 'A3',
    title_en: 'Right-of-way — who goes first, every time',
    title_es: 'Derecho de paso — quién va primero, siempre',
    minutes: 8,
    shorts: [
      {
        title_en: '4-way stop: first to stop, first to go.',
        title_es: 'Alto de 4 vías: el primero que para, va primero.',
        body_en: 'Whoever arrived and came to a complete stop first goes first. If two cars stopped at the same time, the car on the RIGHT goes first — "yield to the right." Right turns clear faster than straight or left turns when arrival times match.',
        body_es: 'El primero que paró completamente va primero. Si dos llegaron al mismo tiempo, el carro a la DERECHA va primero — "ceder a la derecha".',
        visual: 'p-test',
      },
      {
        title_en: 'Pedestrians in a crosswalk always win.',
        title_es: 'Los peatones en el cruce siempre ganan.',
        body_en: 'A pedestrian legally in a crosswalk has right of way over you regardless of the signal. A green light does NOT override this. The law treats hitting a pedestrian in a crosswalk as the driver\'s fault by default, and TX courts almost always uphold that.',
        body_es: 'Un peatón legalmente en el cruce tiene paso sobre ti sin importar el semáforo. La luz verde NO anula esto. Atropellar a un peatón en el cruce es culpa del conductor por defecto.',
        visual: 'p-crash',
      },
      {
        title_en: 'Roundabouts: yield to anyone already in the circle.',
        title_es: 'Rotondas: cede a quien ya está en la rotonda.',
        body_en: 'You yield ON ENTRY, not on exit. Anyone already in the circle has the right of way. Use your turn signal to indicate when you\'re leaving. Roundabouts are statistically much safer than 4-way stops because they slow everyone down.',
        body_es: 'Cedes al ENTRAR, no al salir. Quien ya está en la rotonda tiene el paso. Usa la direccional para indicar cuándo te sales.',
        visual: 'p-rules',
      },
      {
        title_en: 'Right turn on red: stop, yield, then turn.',
        title_es: 'Vuelta a la derecha en rojo: para, cede, luego gira.',
        body_en: 'You CAN turn right on red in TX — but you must come to a complete stop first AND yield to all cross traffic and pedestrians. Look for "No Turn on Red" signs; they overrule the default. The "California roll" gets ticketed.',
        body_es: 'PUEDES girar a la derecha en rojo en TX — pero debes parar completo Y ceder a tráfico y peatones. Busca señales de "No Turn on Red" que anulan la regla.',
        visual: 'p-mirror',
      },
    ],
    ack_en: 'I understand who goes first at intersections and yields to pedestrians.',
    ack_es: 'Entiendo quién va primero en intersecciones y cede a peatones.',
  },

  {
    id: 'A4',
    title_en: 'Defensive driving fundamentals',
    title_es: 'Fundamentos de manejo defensivo',
    minutes: 9,
    shorts: [
      {
        title_en: 'The 3-second rule. Add 1 per bad condition.',
        title_es: 'La regla de los 3 segundos. Suma 1 por cada mala condición.',
        body_en: 'Pick a fixed point. When the car ahead passes it, count "one-thousand-one, one-thousand-two, one-thousand-three." You shouldn\'t reach that same point before you finish counting. Add 1 second for rain, 1 for night, 1 for ice or towing.',
        body_es: 'Elige un punto fijo. Cuando el carro adelante lo pase, cuenta "mil-uno, mil-dos, mil-tres." No debes llegar al punto antes de terminar. Suma 1 segundo por lluvia, 1 por noche, 1 por hielo.',
        visual: 'p-coach',
      },
      {
        title_en: 'Aim high. Look 12-15 seconds ahead.',
        title_es: 'Mira lejos. 12-15 segundos adelante.',
        body_en: 'At highway speed, that\'s about a quarter-mile. Your eyes should be there 80% of the time, with quick scans of mirrors and the immediate scene. Watching the bumper directly in front of you is how chain rear-end crashes happen.',
        body_es: 'A velocidad de autopista son ~400 metros. Tus ojos deben estar ahí 80% del tiempo, con escaneos rápidos a espejos. Ver solo el carro de adelante causa choques en cadena.',
        visual: 'p-test',
      },
      {
        title_en: 'SMOG — the lane-change checklist.',
        title_es: 'SMOG — la lista para cambiar de carril.',
        body_en: 'Signal (3+ seconds before moving). Mirror (rearview + side). Over-the-shoulder (head turn — yes, even with mirrors). Go. 40% of lane-change crashes happen because the driver checked mirrors but never turned their head.',
        body_es: 'Señalar (3+ segundos antes). Mirror/espejo (retrovisor + lateral). Over the shoulder/sobre el hombro (giro de cabeza). Go/avanza. El 40% de los choques de cambio de carril es por no girar la cabeza.',
        visual: 'p-mirror',
      },
      {
        title_en: 'Cover the brake when sight lines are blocked.',
        title_es: 'Cubre el freno cuando la vista esté bloqueada.',
        body_en: 'A parked van, a hedge, an SUV next to you — anything that hides what could be on the other side means cover your brake foot and reduce speed BEFORE you find out. Reaction time drops from 1.5s to 0.3s when you\'re already covering the pedal.',
        body_es: 'Una camioneta estacionada, un seto, una SUV al lado — cualquier cosa que bloquee tu vista significa cubrir el freno y reducir velocidad ANTES de descubrir qué hay. La reacción baja de 1.5s a 0.3s.',
        visual: 'p-coach',
      },
    ],
    ack_en: 'I will use following distance, look ahead, and cover the brake.',
    ack_es: 'Usaré distancia de seguimiento, miraré lejos y cubriré el freno.',
  },

  {
    id: 'A5',
    title_en: 'Alcohol, drugs, and your license',
    title_es: 'Alcohol, drogas y tu licencia',
    minutes: 10,
    shorts: [
      {
        title_en: 'TX legal limit: 0.08 BAC. But under 21 = 0.02.',
        title_es: 'Límite legal TX: 0.08 BAC. Pero bajo 21 = 0.02.',
        body_en: 'For drivers 21+: BAC of 0.08 or higher = DWI. For commercial drivers: 0.04. For under-21: ANY detectable alcohol (effectively 0.02) is DUI-Minor — automatic 60-day license suspension on first offense.',
        body_es: 'Conductores 21+: BAC de 0.08 o más = DWI. Conductores comerciales: 0.04. Menores de 21: CUALQUIER alcohol detectable (~0.02) = DUI-Menor, suspensión automática de 60 días la primera vez.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Implied consent — refusing the test costs you.',
        title_es: 'Consentimiento implícito — negarte cuesta caro.',
        body_en: 'Getting a TX driver license = automatic consent to a breath or blood test if a peace officer arrests you for DWI. Refuse the test and your license is automatically suspended for 180 days, even if you\'re later acquitted. Second refusal: 2 years.',
        body_es: 'Tener licencia TX = consentimiento automático a prueba de aliento o sangre si te arrestan por DWI. Negarte = suspensión automática 180 días, aunque luego te absuelvan. Segunda vez: 2 años.',
        visual: 'p-autofail',
      },
      {
        title_en: 'Cannabis is still illegal to drive on.',
        title_es: 'Manejar bajo el cannabis sigue siendo ilegal.',
        body_en: 'Texas has no THC numerical limit like some other states — the standard is impairment. A trooper can charge you with DWI based on field-sobriety performance and odor alone, even if a blood test wouldn\'t exceed any specific number. Penalties match alcohol DWI.',
        body_es: 'Texas no tiene límite numérico de THC — el estándar es deterioro. Un policía puede acusarte de DWI por desempeño en sobriedad y olor, aunque la sangre no exceda un número específico. Penalidades igual al alcohol.',
        visual: 'p-rules',
      },
      {
        title_en: 'Prescriptions count too. Read the warning label.',
        title_es: 'Las recetas también cuentan. Lee la etiqueta de advertencia.',
        body_en: '"Do not operate heavy machinery" includes your car. Sleep aids, opioids, anti-anxiety meds, even some allergy meds can land you a DWI. The defense "but I had a prescription" doesn\'t work in TX courts — impairment is impairment.',
        body_es: '"No operar maquinaria pesada" incluye tu carro. Pastillas para dormir, opioides, ansiolíticos, hasta algunas para alergia, pueden causar DWI. "Pero tengo receta" no es defensa en tribunales TX.',
        visual: 'p-coach',
      },
    ],
    ack_en: 'I will not drive impaired and understand implied consent.',
    ack_es: 'No conduciré bajo influencia y entiendo el consentimiento implícito.',
  },

  {
    id: 'A6',
    title_en: 'Hazardous conditions — rain, night, fog',
    title_es: 'Condiciones peligrosas — lluvia, noche, niebla',
    minutes: 8,
    shorts: [
      {
        title_en: 'First 10 minutes of rain are the worst.',
        title_es: 'Los primeros 10 minutos de lluvia son los peores.',
        body_en: 'Oil and rubber accumulate on the road during dry weather. The first rainfall lifts that mixture and turns the road into a skating rink for ~10 minutes before it washes away. Crash rates spike at the start of a storm, not at peak rainfall.',
        body_es: 'Aceite y goma se acumulan en la calle cuando hace seco. La primera lluvia los levanta y hace la calle resbaladiza ~10 minutos antes de lavarse. Los choques suben al INICIO de la tormenta.',
        visual: 'p-variety',
      },
      {
        title_en: 'Hydroplaning starts at 35 mph in heavy rain.',
        title_es: 'El hidroplaneo empieza a 35 mph en lluvia fuerte.',
        body_en: 'You\'ll feel the wheel go light. Don\'t brake. Don\'t make sharp inputs. Ease off the gas and hold the wheel straight until the tires re-engage with the road. Hard braking is what turns hydroplaning into a spin.',
        body_es: 'Sentirás el volante ligero. No frenes. No muevas bruscamente. Suelta el acelerador y mantén el volante recto hasta que las llantas vuelvan a agarrar. Frenar fuerte es lo que causa el giro.',
        visual: 'p-callins',
      },
      {
        title_en: 'Oncoming high beams: look down-right.',
        title_es: 'Luces altas en frente: mira abajo a la derecha.',
        body_en: 'Track the white edge line until they pass. Your eyes need 6+ seconds to recover from glare. At 60 mph that\'s 528 feet of half-blind driving — long enough to drift across a lane.',
        body_es: 'Sigue la línea blanca del borde hasta que pasen. Tus ojos necesitan 6+ segundos para recuperarse del resplandor. A 60 mph son 160 metros de manejo casi ciego.',
        visual: 'p-mirror',
      },
      {
        title_en: 'Fog: low beams, no high beams. Open windows.',
        title_es: 'Niebla: luces bajas, no altas. Ventanas abiertas.',
        body_en: 'High beams in fog reflect back into your eyes and make visibility worse. Use low beams or fog lights. Crack a window — sometimes you\'ll hear an emergency vehicle or a stopped car before you see it. Reduce speed to where you can stop within your visible distance.',
        body_es: 'Las luces altas en niebla rebotan en tus ojos. Usa luces bajas o de niebla. Abre la ventana — a veces escuchas una emergencia antes de verla. Reduce velocidad para parar dentro de lo que ves.',
        visual: 'p-coach',
      },
    ],
    ack_en: 'I will adjust speed, lights, and inputs for weather.',
    ack_es: 'Ajustaré velocidad, luces y movimientos según el clima.',
  },

  {
    id: 'A7',
    title_en: 'Sharing the road — bikes, motorcycles, trucks',
    title_es: 'Compartir el camino — bicis, motos, camiones',
    minutes: 7,
    shorts: [
      {
        title_en: 'Cyclists need 3 feet of passing distance.',
        title_es: 'Los ciclistas necesitan 3 pies de distancia al rebasar.',
        body_en: 'TX vehicle code §545.428 requires 3 feet of clearance when you pass a cyclist (commercial vehicles need 6 feet). On narrow roads where you can\'t legally pass, slow down and wait. Buzzing a cyclist is a moving violation.',
        body_es: 'El código TX §545.428 requiere 3 pies de distancia al rebasar bicis (vehículos comerciales 6 pies). En calles angostas, reduce y espera.',
        visual: 'p-rules',
      },
      {
        title_en: 'Motorcycles disappear in your blind spot.',
        title_es: 'Las motos desaparecen en tu punto ciego.',
        body_en: 'A motorcycle is a quarter the visual size of a car at the same distance. Your peripheral vision underestimates how close they are. Always do a full head-check before changing lanes — never trust the mirror.',
        body_es: 'Una moto es un cuarto del tamaño visual de un carro a la misma distancia. Tu visión periférica subestima qué tan cerca están. Siempre revisa por encima del hombro al cambiar de carril.',
        visual: 'p-mirror',
      },
      {
        title_en: '18-wheelers have huge no-zones.',
        title_es: 'Los camiones de 18 ruedas tienen enormes zonas ciegas.',
        body_en: 'If you can\'t see the trucker\'s mirrors, they can\'t see you. Truck no-zones extend 20 ft in front, 30 ft behind, one lane to the left, two lanes to the right. Trucks need 4x the stopping distance you do — never cut in front and brake.',
        body_es: 'Si no ves los espejos del camionero, él no te ve. Las zonas ciegas son 6m al frente, 9m atrás, un carril a la izquierda, dos a la derecha. Los camiones necesitan 4x tu distancia de frenado.',
        visual: 'p-coverage',
      },
      {
        title_en: 'Emergency vehicles: pull right and stop.',
        title_es: 'Vehículos de emergencia: pégate a la derecha y para.',
        body_en: 'Lights and siren = pull as far right as safely possible and stop until they pass. Don\'t panic-brake in the lane. On a divided highway, oncoming emergency vehicles don\'t require you to stop unless they\'re crossing into your direction.',
        body_es: 'Luces y sirena = orillarte a la derecha lo más seguro posible y parar hasta que pasen. No frenes en pánico en tu carril. En autopista dividida, los de la dirección opuesta no te obligan a parar.',
        visual: 'p-test',
      },
    ],
    ack_en: 'I will give cyclists, motorcycles, and trucks proper space.',
    ack_es: 'Daré a ciclistas, motos y camiones el espacio adecuado.',
  },

  {
    id: 'A8',
    title_en: 'Crashes — what to do, what NOT to do',
    title_es: 'Choques — qué hacer y qué NO hacer',
    minutes: 7,
    shorts: [
      {
        title_en: 'Stop. Always. Leaving = hit-and-run.',
        title_es: 'Para. Siempre. Irte = chocar y huir.',
        body_en: 'TX Transportation Code §550: you MUST stop at the scene, exchange info, and (if injury or > $1,000 damage) report to police. Leaving when someone is hurt is a felony — up to 2 years prison.',
        body_es: 'Código §550: DEBES parar, intercambiar información y (si hay heridos o daño > $1,000) reportar a la policía. Irte si hay heridos = delito grave, hasta 2 años de prisión.',
        visual: 'p-crash',
      },
      {
        title_en: 'Photos first. Apology later (or never).',
        title_es: 'Fotos primero. Disculpa después (o nunca).',
        body_en: 'Photograph all vehicles, license plates, damage, the road, and signs. Get the other driver\'s license + insurance. DO NOT say "I\'m sorry" — that admission gets used in court regardless of who was at fault.',
        body_es: 'Foto de vehículos, placas, daños, calle, señales. Pide licencia y seguro del otro. NO digas "lo siento" — esa admisión se usa en tribunales sin importar quién tuvo la culpa.',
        visual: 'p-photos',
      },
      {
        title_en: 'Call insurance same day. Even if minor.',
        title_es: 'Llama al seguro el mismo día. Aunque sea menor.',
        body_en: 'Most TX policies require 24-48 hour notification. Even if you and the other driver agree to settle privately, file the report — the other driver can change their mind in 30 days, and your unreported claim becomes a fraud problem.',
        body_es: 'La mayoría de pólizas TX requieren notificación en 24-48 horas. Reporta aunque acuerden no usar seguro — la otra parte puede cambiar de opinión en 30 días.',
        visual: 'p-callins',
      },
    ],
    ack_en: 'I will stop, document, and report any crash I\'m in.',
    ack_es: 'Pararé, documentaré y reportaré cualquier choque.',
  },

  {
    id: 'A9',
    title_en: 'Vehicle basics — what you need to know',
    title_es: 'Básicos del vehículo — lo que necesitas saber',
    minutes: 6,
    shorts: [
      {
        title_en: 'TX requires inspection + registration + insurance.',
        title_es: 'TX requiere inspección + registro + seguro.',
        body_en: 'Annual safety inspection (or 2-year for newer vehicles), current registration sticker, and minimum 30/60/25 liability insurance — driving without any of the three is a ticketable offense. Your registration auto-checks insurance status; an "FRO" gap can suspend your license.',
        body_es: 'Inspección anual (2 años en vehículos nuevos), pegatina de registro vigente, y seguro mínimo 30/60/25. Manejar sin cualquiera de los tres es multa.',
        visual: 'p-checklist',
      },
      {
        title_en: 'Tire pressure matters more than tread.',
        title_es: 'La presión de las llantas importa más que el dibujo.',
        body_en: 'Underinflated tires hydroplane easier, wear unevenly, and increase stopping distance by up to 20%. Check pressure once a month with the car cold — the right number is on a sticker inside your driver-side door, NOT the number on the tire sidewall.',
        body_es: 'Las llantas con baja presión hidroplanean más, se desgastan desigual y aumentan la distancia de frenado hasta 20%. Revisa una vez al mes con el carro frío.',
        visual: 'p-test',
      },
      {
        title_en: 'Warning lights you cannot ignore.',
        title_es: 'Luces de advertencia que no puedes ignorar.',
        body_en: 'Red oil-pressure light: stop the car immediately — engine seizing in 60 seconds is a real possibility. Red temperature light: pull over before the engine warps. Yellow check-engine: drive carefully but don\'t panic; get it scanned within a week.',
        body_es: 'Luz roja de aceite: para inmediatamente — motor puede dañarse en 60 segundos. Luz roja de temperatura: orillarte antes de que se deforme. Cheque amarillo: maneja con cuidado pero sin pánico, escanéalo en una semana.',
        visual: 'p-autofail',
      },
    ],
    ack_en: 'I\'ll keep inspection, registration, insurance, and tires current.',
    ack_es: 'Mantendré inspección, registro, seguro y llantas al día.',
  },

  {
    id: 'A10',
    title_en: 'Day of the road test — what to expect',
    title_es: 'Día del examen práctico — qué esperar',
    minutes: 6,
    shorts: [
      {
        title_en: 'Bring everything. They will ask for everything.',
        title_es: 'Trae todo. Te van a pedir todo.',
        body_en: 'At the DPS: your learner permit (if applicable), proof of identity, proof of insurance for the vehicle, vehicle registration, current vehicle inspection, your APEX completion certificate, and the test fee. Missing any one = come back another day.',
        body_es: 'En el DPS: permiso (si aplica), identificación, seguro del vehículo, registro, inspección vigente, certificado APEX, costo del examen. Falta uno = regresar otro día.',
        visual: 'p-checklist',
      },
      {
        title_en: 'Three buckets the examiner grades.',
        title_es: 'Tres áreas que el examinador califica.',
        body_en: 'Vehicle control (smooth steering, smooth braking, smooth accel). Awareness (mirror checks, head checks, scanning). Judgment (gap selection, lane changes, yielding). Bombing any one bucket fails the test — even if you ace the other two.',
        body_es: 'Control del vehículo (volante, freno, acelerador suaves). Conciencia (espejos, hombro, escaneo). Juicio (decisiones de tráfico). Reprobar cualquier área reprueba el examen.',
        visual: 'p-test',
      },
      {
        title_en: 'Auto-fails: rolling stop, no head check, hitting curb.',
        title_es: 'Reprobaciones automáticas: alto rodante, sin hombro, golpear banqueta.',
        body_en: 'Some mistakes end the test instantly: not stopping fully at a stop sign, no over-the-shoulder check on a lane change, hitting the curb on parallel park, or any unsafe maneuver the examiner has to intervene on. Practice the visible head-turn until it\'s automatic.',
        body_es: 'Algunos errores terminan el examen al instante: no parar completo, no checar el hombro, golpear la banqueta. Practica el giro de cabeza visible hasta que sea automático.',
        visual: 'p-autofail',
      },
    ],
    ack_en: 'I will bring all documents and rehearse the head-check.',
    ack_es: 'Traeré todos los documentos y practicaré el giro de cabeza.',
  },
];
