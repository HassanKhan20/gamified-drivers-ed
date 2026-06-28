// Six new chapters drafted to add the mandated TX content (Human Trafficking,
// Street Racing §545.420, Work Zones SB 1366, CSEA traffic stops, Anatomical
// Gifts, Driving with Disabilities Program). All 15 minutes each, "reading" type,
// schema-aligned with the existing curriculum.js.
//
// Redistribution plan when integrating into curriculum.js:
//   11.1 (Human Trafficking)  → Module 11.1 (Consumer Responsibilities)
//   11.2 (Street Racing)      → Module 5.6   (Risk Reduction)
//   11.3 (Work Zones SB 1366) → Module 5.7   (Risk Reduction)
//   11.4 (CSEA Traffic Stops) → Module 4.5   (Driver Readiness)
//   11.5 (Anatomical Gifts)   → Module 12.1  (Personal Responsibilities)
//   11.6 (Disabilities Prog)  → Module 12.2  (Personal Responsibilities)

const NEW_MANDATED_CHAPTERS = [

{
  id: '11.1', title: 'Human trafficking — what drivers actually see', minutes: 15, type: 'reading',
  body: [
    'Texas SB 9 (and the implementing TDLR rule under Texas Education Code §1001.107) requires every driver education course to cover human trafficking. The reason isn\'t paperwork — it\'s that traffickers move people on highways, and the people most likely to notice something off are drivers stopping at the same gas stations, truck stops, and rest areas. Trafficking means using force, fraud, or coercion to make someone perform labor or commercial sex. Minors involved in commercial sex are trafficking victims by definition under federal law — consent isn\'t a defense.',
    'Indicators are rarely cinematic. You\'re looking for inconsistencies. A passenger who won\'t make eye contact or who lets a third party answer questions for them. A car or truck cab with someone who looks underage and a driver who doesn\'t match. Multiple people who appear coached, fearful, or unable to say where they\'re going. Branding tattoos (a name, a barcode, a dollar sign). At truck stops specifically: people moving between rigs late at night, knocking on cab doors, or being escorted by someone who controls all the money.',
    'What you do NOT do is intervene. You are an 18-year-old with a driver\'s license, not a federal agent. Don\'t confront the suspected trafficker, don\'t try to "rescue" the victim, don\'t take photos that put you on a camera. You call. The National Human Trafficking Hotline is 1-888-373-7888 (text "HELP" to 233733). If someone is in immediate danger, 911. Note the vehicle plate, the make/model, and the direction of travel. That\'s the help that actually works.',
  ],
  keyPoints: [
    'Required by TX SB 9 / Education Code §1001.107',
    'Trafficking = force, fraud, or coercion (minors in commercial sex = automatic)',
    'Watch for inconsistencies, not movie clichés',
    'Do NOT intervene — call 1-888-373-7888 or 911',
    'Note plate, vehicle, and direction of travel',
  ],
  quiz: [
    { q: 'You\'re fueling up at a rural TX truck stop at 2am. A girl who looks about 14 is sitting in the passenger seat of a sedan; a man in his 40s is paying inside and answers every question the cashier asks her. Best move?',
      options: ['Walk up to the car and ask the girl if she\'s OK.', 'Note the plate, make/model, and direction, then call 1-888-373-7888 once you\'re safely away.', 'Follow the car when it leaves to get more information.', 'Mind your business — you don\'t actually know anything.'],
      correct: 1,
      why: 'Per the TDLR-mandated curriculum under Education Code §1001.107, drivers report indicators — they do not intervene. The hotline (1-888-373-7888) and trained investigators handle confirmation. Confrontation endangers the victim and you.' },
    { q: 'Under federal trafficking law, a 16-year-old engaged in commercial sex is:',
      options: ['A trafficking victim only if force or threats are proven.', 'A trafficking victim automatically — minors cannot consent to commercial sex.', 'Not a trafficking victim if they say they chose it.', 'A trafficking victim only if transported across state lines.'],
      correct: 1,
      why: 'Federal law (and the TX curriculum required by §1001.107) treats any minor in commercial sex as a trafficking victim regardless of consent, force, or interstate transport. The "they said they wanted to" defense does not exist.' },
    { q: 'Which of these is the WEAKEST trafficking indicator on its own?',
      options: ['A passenger who lets a third party answer all questions for them.', 'Visible branding-style tattoos (a name, a barcode).', 'A young passenger who looks tired in the back seat.', 'Multiple people who appear coached and fearful.'],
      correct: 2,
      why: 'A tired-looking kid in a back seat is just a tired-looking kid 99.9% of the time. The other three involve control or coercion patterns. Trafficking detection is about clusters of inconsistencies, not single innocuous observations.' },
  ],
},
{
  id: '11.2', title: 'Street racing — what it costs you in Texas', minutes: 15, type: 'reading',
  body: [
    'Per TX Transportation Code §545.420, "racing on a highway" doesn\'t just mean two cars lined up at a light revving engines. The statute covers any attempt to outdistance another vehicle, test the physical endurance or speed of a vehicle, or make a speed record — on any public road, with or without a prearranged agreement. Two cars accelerating hard from a green light to "see who gets there first" is racing. A drift meetup that spills onto a public street is racing. A solo top-speed run on a frontage road is racing.',
    'First offense is a Class B misdemeanor: up to 180 days in jail and a $2,000 fine. If you have a prior or you\'re intoxicated, it escalates to a Class A (up to a year in jail, $4,000). If someone gets seriously injured, it\'s a third-degree felony — 2 to 10 years in state prison. If anyone dies, it\'s a second-degree felony — 2 to 20 years. Texas also forfeits the vehicle: under §545.420(h), a court can permanently take the car used in the race, even if it belongs to your parents.',
    'License consequences are separate from the criminal penalties. DPS suspends your license for a year on the first conviction (longer on subsequent ones), and TX takeoffs add 6 demerit points — enough to trigger the Driver Responsibility surcharges that follow you for three years. You also become an uninsurable risk: most carriers either non-renew or quote you at SR-22 rates for the next 3-5 years. The Honda Civic you raced is worth less than one year of that insurance increase.',
  ],
  keyPoints: [
    'TX Transp. Code §545.420 — racing includes any attempt to outdistance or test speed',
    'First offense: Class B misdemeanor (up to 180 days jail, $2,000 fine)',
    'Serious injury → 3rd-degree felony; death → 2nd-degree felony (up to 20 years)',
    'Vehicle forfeiture available — even if the car is your parents\'',
    '1-year license suspension + insurance ruin for 3-5 years',
  ],
  quiz: [
    { q: 'Under TX Transp. Code §545.420, which of these is NOT considered racing?',
      options: ['Two cars accelerating hard from a green light to see who gets to the next intersection first.', 'A solo attempt to hit 120 mph on an empty frontage road.', 'Maintaining a steady 5 mph over the speed limit in normal traffic.', 'A drift meetup that uses a public street as the course.'],
      correct: 2,
      why: '§545.420 covers attempts to outdistance another vehicle, test speed/endurance, or set a speed record — solo or otherwise. Cruising 5 over with traffic is speeding, not racing. The other three all fit the statutory definition.' },
    { q: 'Your friend is driving his parents\' car when he gets convicted of racing under §545.420. The parents had no idea. What can a TX court do to the car?',
      options: ['Nothing — the parents are the registered owners.', 'Order it impounded for 30 days, then returned.', 'Permanently forfeit the vehicle under §545.420(h), even though the parents own it.', 'Forfeit it only if drugs were also involved.'],
      correct: 2,
      why: '§545.420(h) allows permanent forfeiture of the vehicle used in racing regardless of who holds the title. Parental ignorance is not a defense to forfeiture. This is one of the reasons insurance carriers treat racing convictions as catastrophic.' },
    { q: 'A street race in Texas ends with a bystander seriously injured. The minimum criminal exposure for the driver is:',
      options: ['Class B misdemeanor (up to 180 days).', 'Class A misdemeanor (up to 1 year).', 'Third-degree felony (2 to 10 years in state prison).', 'Second-degree felony (2 to 20 years).'],
      correct: 2,
      why: 'Per §545.420(d), racing that causes serious bodily injury is a third-degree felony — 2 to 10 years. If the injury becomes a death, it escalates to a second-degree felony (2 to 20). Either way, "I didn\'t mean to hit anyone" is irrelevant once you elected to race.' },
  ],
},
{
  id: '11.3', title: 'Work zones — SB 1366 and the Move Over law', minutes: 15, type: 'reading',
  body: [
    'Texas SB 1366 took effect May 1, 2026, and it changed the math on work-zone driving. Any traffic fine you receive in an active work zone — speeding, following too close, unsafe lane change — is now automatically doubled when workers are present. Cause a crash that injures a worker and you\'re looking at a state jail felony (180 days to 2 years). Cause one that kills a worker and it becomes a second-degree felony: 2 to 20 years in prison and up to a $10,000 fine. This is on top of any civil liability, which routinely runs seven figures.',
    'Work zones are statistically dangerous in a way most teen drivers underestimate. TxDOT counted 26,143 work-zone crashes in 2024 — 198 of them fatal. Most of those deaths were drivers and their passengers, not workers. The hazards stack: sudden lane shifts, narrower lanes, concrete barriers inches from your mirror, equipment entering and exiting traffic, and the driver in front of you braking for cones they didn\'t see until the last second. Phone glances that you "get away with" on an empty highway turn into rear-end crashes in a work zone almost immediately.',
    'The TX Move Over / Slow Down law (Transp. Code §545.157) intersects with work zones constantly. Whenever a stopped vehicle on the shoulder or in a closed lane has activated flashing lights — TxDOT trucks, police, tow, utility — you must either change lanes away from it OR slow to 20 mph below the posted limit (or to 5 mph if the posted limit is 25 or below). In a work zone with SB 1366 in play, violating this is the kind of mistake that turns a $500 ticket into a felony if anyone gets hurt. Treat orange cones the way you\'d treat a school zone with kids visible — speed down, phone away, hands at 9-and-3.',
  ],
  keyPoints: [
    'SB 1366 (effective May 1, 2026) doubles fines when workers are present',
    'Injuring a worker = state jail felony; killing a worker = 2nd-degree felony (up to 20 years)',
    '2024: 26,143 TX work-zone crashes / 198 fatalities — mostly drivers, not workers',
    'TX Move Over §545.157: change lanes OR slow to limit-minus-20 (or 5 mph if limit ≤ 25)',
    'Phone away, speed down, no exceptions',
  ],
  quiz: [
    { q: 'Under SB 1366 (effective May 2026), you\'re cited for going 15 over in an active work zone with workers present. The base fine would normally be $200. What do you actually pay?',
      options: ['$200 — the base fine.', '$300 — base plus a 50% work-zone surcharge.', '$400 — fines are doubled when workers are present.', '$1,000 — work zones carry a flat penalty.'],
      correct: 2,
      why: 'SB 1366 doubles any moving-violation fine in an active work zone when workers are present. $200 becomes $400. If you injure a worker, the penalty leaves "fine" territory entirely and becomes a state jail felony.' },
    { q: 'You\'re on a 65-mph TX freeway and a TxDOT crash-attenuator truck is parked on the shoulder with amber lights flashing. The left lane is occupied. Per TX Transp. Code §545.157, you must:',
      options: ['Maintain 65 — the truck is on the shoulder.', 'Slow to 45 mph (limit minus 20) until you\'re past.', 'Stop and wait for the truck to move.', 'Honk to warn the truck you\'re coming.'],
      correct: 1,
      why: '§545.157 requires you to either move over OR slow to 20 below the posted limit when any vehicle with activated flashing lights is on the shoulder. If you can\'t safely change lanes, slowing to 45 satisfies the law. Maintaining 65 next to a stopped TxDOT crew is exactly what the statute was passed to prevent.' },
    { q: 'A driver in a TX work zone is distracted by their phone, drifts into a closed lane, and kills a flagger. The most likely criminal charge against the driver is:',
      options: ['A Class C traffic ticket.', 'A Class B misdemeanor.', 'A state jail felony (180 days to 2 years).', 'A second-degree felony (2 to 20 years).'],
      correct: 3,
      why: 'Under SB 1366, causing a worker\'s death in a work zone is a second-degree felony — 2 to 20 years and up to a $10,000 fine. Injury (not death) is the state jail felony tier. "I was just looking at a notification" is not a defense; that\'s exactly the conduct the statute targets.' },
  ],
},
{
  id: '11.4', title: 'Traffic stops — your rights, the officer\'s duties (CSEA)', minutes: 15, type: 'reading',
  body: [
    'The Community Safety Education Act (TX HB 2305, 2017) requires every Texas driver education course to teach traffic-stop interactions — your rights, your responsibilities, and the officer\'s duties. The legal basis is Texas Education Code §1001.110. It exists because most people only learn how a traffic stop works while in the middle of one, which is the worst possible time. The point is to make the next five minutes predictable for both sides.',
    'When you see the lights: signal, slow, and pull over to the right shoulder as soon as it\'s safe. If you\'re on a freeway, the nearest well-lit shoulder or exit is fine — you don\'t have to stop in a dangerous spot. Put it in park, turn off the engine, turn on your interior light if it\'s dark, lower the driver\'s window, and put both hands visibly on the wheel. Don\'t reach for your wallet, registration, or phone until the officer asks. Tell the officer if you have a License to Carry and where the firearm is. You must provide your license, registration, and proof of insurance on request. You do not have to answer questions like "do you know why I stopped you?" — a polite "I\'d rather not guess, officer" is legal and fine.',
    'The officer has duties too. Under §1001.110 and the model curriculum, officers are expected to identify themselves, state the reason for the stop, and conduct themselves professionally. You have the right to ask why you were stopped, to record the interaction (Texas is a one-party consent state for audio), and to receive a written citation or warning rather than a verbal one. If you believe the officer acted improperly, the time to fight that is later — through a complaint to the agency or a court challenge to the citation. Arguing on the shoulder of I-35 has never once helped anyone\'s case, and it has gotten people hurt.',
  ],
  keyPoints: [
    'Required by TX HB 2305 / Education Code §1001.110',
    'Pull over safely, park, kill engine, interior light on, window down, hands on wheel',
    'Disclose License to Carry and firearm location if applicable',
    'You must show license/registration/insurance; you don\'t have to guess at violations',
    'You can record (TX = one-party consent); fight bad stops in court, not on the shoulder',
  ],
  quiz: [
    { q: 'Per the Community Safety Education Act curriculum (Education Code §1001.110), which of these are you legally required to provide during a TX traffic stop?',
      options: ['Your driver\'s license, vehicle registration, and proof of insurance.', 'A verbal explanation of where you were going and why.', 'Consent to search your vehicle if the officer asks.', 'Your social media passwords if requested.'],
      correct: 0,
      why: '§1001.110\'s model curriculum lists license, registration, and proof of insurance as the documents you must produce on request. You are not required to explain your destination, consent to a search, or hand over passwords. Politely declining to answer non-required questions is legal.' },
    { q: 'You have a TX License to Carry and a pistol in the glove box. An officer pulls you over. What does the CSEA curriculum recommend?',
      options: ['Say nothing about the firearm unless directly asked.', 'Hand the officer your LTC and reach for the pistol so they can see it.', 'Inform the officer that you have an LTC and where the firearm is located, then keep your hands on the wheel.', 'Get out of the car with hands raised to defuse the situation.'],
      correct: 2,
      why: 'CSEA training and TX best practice: disclose the LTC and firearm location verbally, keep hands visible on the wheel, and let the officer direct any further movement. Reaching toward a firearm — even to hand it over — escalates the stop dangerously. Exiting the car uninvited is also a bad idea.' },
    { q: 'You believe the officer who cited you was rude and the stop was unjustified. Per the CSEA framework, the right course of action is:',
      options: ['Argue your case on the roadside until the officer relents.', 'Refuse to sign the citation as a form of protest.', 'Comply at the scene, then file a complaint with the agency and/or contest the citation in court.', 'Speed off — the stop was illegitimate anyway.'],
      correct: 2,
      why: 'The CSEA curriculum and §1001.110 emphasize that the roadside is not the venue for legal arguments. Comply, document (including recording — TX is one-party consent), and use the agency complaint process or court for any remedy. Refusing to sign in TX can itself be an arrestable offense.' },
  ],
},
{
  id: '11.5', title: 'Anatomical gifts — the donor question at the DMV', minutes: 15, type: 'reading',
  body: [
    'When you apply for or renew a Texas driver\'s license, you are asked one question that the legislature considered important enough to write into Transportation Code §521.401: do you want to register as an organ, eye, and tissue donor? Saying yes adds you to the Donate Life Texas registry and puts a small heart symbol on your license. Saying no, or skipping the question, leaves you off the registry — your family would be asked at the time of death, which is a hard conversation to have in an ICU waiting room.',
    'One donor can save up to 8 lives through organ donation (heart, lungs, liver, kidneys, pancreas, intestines) and improve up to 75 more through tissue and cornea donation. About 10,000 Texans are on the transplant waiting list at any given time, and roughly 1,000 of them die each year before a match comes through. Donation costs the donor\'s family nothing — the recovery is handled by the organ procurement organization, not the family\'s estate or insurance — and it does not delay or alter funeral arrangements; open-casket services remain possible after most donations.',
    'A few myths worth dispelling because they actually change people\'s answers. Doctors do not "give up sooner" on registered donors — the transplant team is legally separate from the trauma team and isn\'t even contacted until brain death is confirmed by neurologists who have nothing to do with the registry. Your religion almost certainly permits donation; every major US faith tradition treats it as compatible with their teachings, and many actively encourage it. And you are not "too young" or "too unhealthy" — eligibility is determined at the time of death based on the condition of specific organs, not on a checkbox somewhere. The answer to the DMV question is yours alone, but make sure you\'re answering it based on facts.',
  ],
  keyPoints: [
    'TX Transp. Code §521.401 — the donor question is asked at every license issuance/renewal',
    'Saying yes registers you with Donate Life Texas; a heart appears on your license',
    '1 donor: up to 8 lives saved (organs) + 75 improved (tissue/cornea)',
    '~10,000 Texans waiting; ~1,000 die annually before a match',
    'No cost to family, no delay to funeral arrangements, no interference with medical care',
  ],
  quiz: [
    { q: 'When you check "yes" to the donor question at a TX driver\'s license office, what actually happens (per §521.401)?',
      options: ['Nothing — it\'s a survey question only.', 'You\'re added to the Donate Life Texas registry and a donor symbol is printed on your license.', 'Your family is automatically required to donate your organs at death.', 'You sign away rights to refuse future medical treatment.'],
      correct: 1,
      why: '§521.401 establishes the registry mechanism: a "yes" registers you with Donate Life Texas and adds the heart symbol to your license. It does not bind your family in advance of consent procedures, and it has zero effect on your living medical care.' },
    { q: 'A friend tells you they\'re not registering as a donor because "doctors won\'t try as hard to save you if they know." The accurate response is:',
      options: ['They have a point — better to leave the question blank.', 'The transplant team is legally separate from the trauma team and isn\'t involved until brain death is independently confirmed.', 'It\'s only true at smaller hospitals.', 'True, but the lives saved make it worth it.'],
      correct: 1,
      why: 'This is the most common myth and it\'s false. The medical teams treating you have no role in organ procurement, no access to your donor status during treatment, and a legal duty to attempt to save your life regardless. The procurement organization is a separate entity contacted only after death has been declared by neutral physicians.' },
    { q: 'One registered organ donor can potentially save or improve approximately how many lives?',
      options: ['1 — the recipient of the heart.', '2 to 3 — close family members only.', 'Up to 8 saved through organs, plus up to 75 improved through tissue and cornea.', 'Around 1,000 — donations are pooled.'],
      correct: 2,
      why: 'Up to 8 lives saved through solid organ donation (heart, lungs, liver, two kidneys, pancreas, intestines) and up to ~75 more improved through tissue and cornea donation. The reason TX bothers asking the question at every renewal is this multiplier — and the ~1,000 Texans who die waiting each year.' },
  ],
},
{
  id: '11.6', title: 'Driving with Disabilities — the TX voluntary registry', minutes: 15, type: 'reading',
  body: [
    'Texas HB 1554 (2021), codified at Transportation Code §521.142(g), created the Texas Driving with Disabilities Program. It\'s a voluntary registry that lets a driver — or any household member who routinely rides with them — note a communication-impacting condition that an officer should know about before walking up to the car. Eligible conditions include autism spectrum disorder, deafness or hard of hearing, Down syndrome, PTSD, traumatic brain injury, mobility-affecting conditions, and others that may make a standard traffic-stop interaction read as evasive or noncompliant when it isn\'t.',
    'The mechanism is simple. You (or a parent/guardian) submit a one-page form to DPS along with a brief verification from a licensed physician or relevant professional. The disability flag is attached to the vehicle\'s registration record in the same database an officer queries when they run your plate — so the note appears on their in-car computer before the officer is even out of their cruiser. The information is not printed on the license or registration itself, doesn\'t affect insurance, and can be removed at any time by the registrant. It applies to the vehicle, not the person, so multiple household members can be listed.',
    'The point is to prevent escalations that started with a misread. A deaf driver who doesn\'t respond to a verbal command, an autistic teen who avoids eye contact, a veteran with PTSD who flinches when a flashlight hits the window — all of these can look to an officer like resistance or impairment. The registry gives the officer the context up front, so they can adjust how they approach the stop (writing things down, removing the flashlight, calling for an interpreter). Signing up is free, takes a few minutes, and is one of the more effective civil-rights tools TX has passed in the last decade. The form is on the DPS website under "Texas Driving with Disabilities."',
  ],
  keyPoints: [
    'TX HB 1554 (2021) / Transp. Code §521.142(g) — voluntary disability registry',
    'Covers autism, deafness/HOH, Down syndrome, PTSD, TBI, mobility, and similar',
    'Flag appears on the officer\'s screen when they run the plate — before they approach',
    'Not printed on license/registration, doesn\'t affect insurance, removable anytime',
    'Free, one-page DPS form + professional verification; signs up the vehicle, not the person',
  ],
  quiz: [
    { q: 'Under the TX Driving with Disabilities Program (Transp. Code §521.142(g)), where does a registered disability flag actually appear?',
      options: ['Printed on the front of the driver\'s license.', 'Visible on a window decal that the driver must display.', 'In the DPS database tied to the vehicle\'s plate, visible to an officer who runs the plate.', 'On a wristband the driver wears while operating the vehicle.'],
      correct: 2,
      why: '§521.142(g) ties the flag to the vehicle registration record, not the license or any visible marker. An officer sees the note when they run the plate from their cruiser — before the approach — without the driver having to advertise the condition publicly.' },
    { q: 'A teen with autism and a deaf older sister live in the same household and share a car. Per the program rules, who can be listed on the disability registry for that vehicle?',
      options: ['Only the registered owner of the car.', 'Only the teen, because they\'re the driver.', 'Both — the registry applies to the vehicle and can list multiple household members.', 'Neither, because autism and deafness are not eligible conditions.'],
      correct: 2,
      why: 'The registry attaches to the vehicle, so any household member who routinely rides in it can be listed. Both autism and deafness/hard-of-hearing are explicitly enumerated eligible conditions in the HB 1554 program. The goal is for the officer to know what they might encounter regardless of which family member is in which seat.' },
    { q: 'A friend with PTSD is worried that signing up for the disability registry will hurt their car insurance rates or end up on their license. What\'s accurate?',
      options: ['They\'re right to worry — insurers receive registry data.', 'The flag will appear on their license, but insurance won\'t see it.', 'The flag is internal to DPS, not printed on the license, and has no effect on insurance; they can also remove it any time.', 'Registry data is shared with employers under TX law.'],
      correct: 2,
      why: 'Per HB 1554 / §521.142(g), the registry is internal to DPS, not visible on the license or registration, not shared with insurers or employers, and revocable at the registrant\'s request. The whole design assumes people will only enroll if the cost of enrolling is zero — and it is.' },
  ],
},

];
