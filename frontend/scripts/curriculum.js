// APEX — TX Teen Driver Education curriculum (full authored content).
// Expanded for interactive loop-player delivery (see docs/superpowers/specs/2026-05-28-...).
// Schema: chapter.type = 'reading' | 'scenario' | 'checkpoint'
//   reading   -> body[], keyPoints[], quiz[], optional worked{}, optional miniScenario{}
//   scenario  -> scene{}, options[], correct, consequences{}, rule{}, quiz[], optional body[]
//   checkpoint-> exam[]
window.APEX_CURRICULUM = {
  "state": "TX",
  "audience": "teen",
  "totalHours": 32,
  "modules": [
    {
      "id": "M1",
      "num": 1,
      "title": "Driver Education & the Highway Transportation System",
      "blurb": "How driving fits into a system of laws, vehicles, and people — and what TX expects from you.",
      "chapters": [
        {
          "id": "1.1",
          "title": "Welcome — what this course gives you",
          "minutes": 30,
          "type": "reading",
          "body": [
            "Welcome to APEX. You're here because Texas won't hand a 15-year-old a license on a promise to be careful. The state requires 32 instructional hours of driver education before you can take the DPS road test as a teen, and that number isn't something a school made up to fill a semester. It comes straight from the Texas Education Code Chapter 1001 and the rules TDLR (the Texas Department of Licensing and Regulation) writes to enforce it. Every legitimate Texas teen course, online or in a classroom, has to deliver those same 32 hours.",
            "Here's why the state cares so much. Crashes are the number one killer of American teenagers, and the most dangerous stretch of any driver's life is the first six to twelve months on the road alone. Not because teens are reckless on purpose, but because they haven't built the pattern-recognition that turns a surprise into a non-event. The 32 hours exist to front-load some of that pattern-recognition before you're the one at the wheel with no instructor in the passenger seat. That's the whole bet, and it's a good one.",
            "Now, most courses honor those 32 hours in the cheapest way possible: they lock each slide for 60 seconds, gray out the 'Next' button, and call the resulting boredom 'compliance.' You've probably already met software like that. You read the paragraph in nine seconds and then stare at a countdown for fifty-one. Multiply that across 32 hours and you've spent most of a workweek watching timers expire. That isn't learning. It's a hostage situation with a progress bar.",
            "APEX is built on a different idea: the clock should measure attention, not patience. Instead of timing how long a slide sits on your screen, this course tracks active engagement — the scenarios you work through, the decisions you make, the quizzes you have to actually get right. When you're answering and deciding, the clock runs. When you walk away to grab a snack, the clock pauses. The total still has to reach the legally required 32 hours and APEX reports that real total to TDLR, but you spend those hours doing instead of waiting.",
            "Let's be precise about one number, because it trips people up. A TDLR 'instructional hour' is not 60 minutes — it's 55 minutes of actual instruction, with the other 5 minutes reserved as break time. That's defined in TDLR rule 84.500. So when you see a chapter marked '50 minutes,' that's most of one credited instructional hour. It matters for your records: the certificate you eventually earn is built on these credited minutes adding up correctly.",
            "The 32 classroom hours are only one half of becoming legal to drive in Texas. The other half is behind-the-wheel (BTW) practice: at least 30 hours of supervised driving with a licensed adult, and 10 of those 30 must be at night. That requirement exists because reading about a left turn across traffic and physically executing one are completely different skills. This course gives you the knowledge; the BTW hours wire it into your hands and feet. You need both, and the state checks for both.",
            "So what should you actually be able to do when you finish? Three things. One: pass the DPS written knowledge test, the one that asks about speed limits, right-of-way, and signs. Two: show up to your road test already comfortable with the maneuvers, instead of practicing them for the first time in front of an examiner. Three — and this is the only one that matters once you're alone on the freeway — actually be a safer driver than the median teen who clicked through a slide deck without absorbing a word of it.",
            "A note on how to use APEX so you get the third thing and not just the first two. When a scenario asks you to make a call, make it for real — decide what you'd do before you click, the way you'll have to decide at an intersection with no 'undo' button. When a quiz question stings because you got it wrong, that sting is the point; that's a mistake you just made for free in a chair instead of for real at 45 mph. Treat the wrong answers as the cheapest driving lessons you will ever buy.",
            "Finally, the honest framing: nobody can promise that finishing this course makes you crash-proof. Experience is the variable nothing replaces, and you don't have it yet. What this course can do is make sure that when the bad situations show up — and they will — you've already seen the shape of them once, thought through the right move, and aren't meeting it cold. That head start is the entire value of driver's ed. Let's go earn it."
          ],
          "keyPoints": [
            "TX requires 32 instructional hours of driver ed before the teen road test (Ed. Code Ch. 1001)",
            "One TDLR 'instructional hour' = 55 minutes of instruction (rule 84.500), not 60",
            "You also need 30+ hours of behind-the-wheel practice, 10 of them at night",
            "APEX times active engagement, not slide-staring — idle time pauses the clock",
            "The TDLR-issued completion certificate is built from real credited minutes",
            "Goal: pass the DPS written test, arrive road-test-ready, and actually be a safer driver"
          ],
          "quiz": [
            {
              "q": "How many hours of TDLR-credited instruction does the Texas teen course require?",
              "options": [
                "16",
                "24",
                "32",
                "40"
              ],
              "correct": 2,
              "why": "TX Education Code Chapter 1001 specifies 32 hours of classroom-equivalent instruction for the teen course."
            },
            {
              "q": "One TDLR 'instructional hour' equals how many real-world minutes?",
              "options": [
                "45 minutes",
                "50 minutes",
                "55 minutes",
                "60 minutes"
              ],
              "correct": 2,
              "why": "TDLR rule 84.500 defines an instructional hour as 55 minutes of instruction, with 5 minutes reserved as break time."
            },
            {
              "q": "Behind-the-wheel practice hours with a licensed adult are…",
              "options": [
                "Optional",
                "Required only if your parent insists",
                "Required in addition to the 32 classroom hours",
                "A substitute for the classroom hours"
              ],
              "correct": 2,
              "why": "Texas requires 30+ hours of supervised driving (10 at night) on TOP of the 32 classroom hours — they're separate requirements, not interchangeable."
            },
            {
              "q": "Of the 30 required behind-the-wheel hours, how many must be at night?",
              "options": [
                "0",
                "5",
                "10",
                "All 30"
              ],
              "correct": 2,
              "why": "10 of the 30 supervised driving hours must be done at night, because night driving is a distinct, higher-risk skill."
            },
            {
              "q": "Why does APEX track active engagement instead of just timing each slide?",
              "options": [
                "To finish the course faster than the law allows",
                "Because sitting still in front of a timer isn't learning, and engagement is what builds safer drivers",
                "To skip the TDLR hour requirement",
                "Because slide timers are illegal in Texas"
              ],
              "correct": 1,
              "why": "The 32 hours still must be met and reported, but measuring attention rather than patience means the time is spent learning instead of waiting."
            },
            {
              "q": "The single metric that matters most once you're driving alone is:",
              "options": [
                "How fast you finished the course",
                "Whether you passed the written test on the first try",
                "Whether you're actually a safer driver than a teen who didn't absorb the material",
                "How many slides you clicked through"
              ],
              "correct": 2,
              "why": "Passing tests is the gate; actual safe-driving skill is the point. At 65 mph, only the third one keeps you alive."
            },
            {
              "q": "Crashes are the leading cause of death for American teenagers, and the most dangerous period is:",
              "options": [
                "The day of the road test",
                "The first 6–12 months of driving alone",
                "After 5 years of experience",
                "Only when driving at night"
              ],
              "correct": 1,
              "why": "The first several months solo are highest-risk because pattern-recognition hasn't been built yet — which is exactly what the course and BTW hours start to develop."
            },
            {
              "q": "The completion certificate APEX issues is:",
              "options": [
                "A 'we say so' PDF the school prints itself",
                "TDLR-recognized, built from your real credited instructional minutes",
                "Optional for the road test",
                "Valid in any state automatically"
              ],
              "correct": 1,
              "why": "The certificate is tied to TDLR-credited minutes adding up correctly, which is why the engagement clock has to be honest about the real total."
            }
          ],
          "worked": {
            "setup": "Maria is 15 and just started APEX. She wants to know the fastest legal route to driving her younger brother to school. She's done 6 hours of the course so far and figures she's almost there. Walk through what Texas actually requires before she can do that.",
            "walkthrough": "First, the 6 hours she's done only qualifies her to apply for a learner permit — it does not let her drive alone or carry passengers. With a permit she can only drive with a licensed adult 21+ in the front seat. To drive solo she needs a provisional license, and that requires finishing all 32 classroom hours, completing 30+ behind-the-wheel hours (10 at night), holding the permit for at least 6 months, and being at least 16. Even then, the provisional license bars her from carrying her brother as a passenger unless he's family — which he is, so that part's fine — but it still bans driving between midnight and 5 a.m. and any phone use behind the wheel. Bottom line: 'almost there' at 6 hours is closer to 'just getting started.' The realistic timeline is the better part of a year, and most of it is the supervised driving, not the course."
          },
          "miniScenario": {
            "prompt": "You're flying through the reading because you already 'kind of know this stuff.' A quiz question asks how many real-world minutes a TDLR instructional hour is, and you guess 60 and get it wrong. What's the smart response?",
            "options": [
              "Brush it off — it's a trivia detail that won't matter when you're actually driving.",
              "Note that 55, not 60, is the rule, and slow down a notch since you just learned you don't know this as well as you thought.",
              "Get annoyed and click through faster to make up the lost time."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "It's true this specific number won't save you at an intersection. But the bigger signal — that you were confident and wrong — is exactly the thing to pay attention to. Overconfidence is the most expensive trait a new driver can have."
              },
              "1": {
                "good": true,
                "body": "Right. The fact itself is minor; the lesson is that 'I kind of know this' was wrong once already, so it might be wrong again. Slowing down where you feel cocky is how you catch the gaps before the road does."
              },
              "2": {
                "good": false,
                "body": "Speeding up after a miss is exactly backward. You just got evidence you're going too fast to absorb the material — the move is to slow down, not floor it."
              }
            }
          }
        },
        {
          "id": "1.2",
          "title": "The Texas licensing path",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Texas doesn't flip a switch from 'no license' to 'full license.' It uses a graduated driver licensing system — GDL — that walks you through three stages, each one loosening the leash a little as you prove you can handle more. The logic is simple and backed by crash data from every state that's tried it: let inexperience meet the low-risk situations first, and don't expose a brand-new driver to night driving, freeways, and a car full of friends all on day one. Every restriction you're about to read about exists because, statistically, removing it early gets teens hurt.",
            "Stage one is the learner permit, sometimes called the instruction permit. You can apply at 15, but not empty-handed — you must have completed at least 6 hours of classroom driver education first (which is why APEX front-loads the basics). The permit is a learning license, not a freedom license. The hard rule: whenever you drive, a licensed adult 21 or older has to be in the front passenger seat, awake and able to take over. No solo trips, no friends in the car instead of a supervising adult. The permit's entire job is to give you supervised reps.",
            "While you hold the permit, the clock is running on two requirements at once. You have to hold the permit for a minimum of 6 months before you can move up — there's no testing your way out of that waiting period early. And during those months you're logging your 30 behind-the-wheel hours (10 at night) with that supervising adult. Plenty of teens finish the classroom work fast and then get stuck because they didn't start the 6-month permit clock or the driving log early enough. Start both the day you get the permit.",
            "Stage two is the provisional license, and this is the one most people mean when they say a teen 'got their license.' To get it you must be at least 16, have held the permit for at least 6 months, and have finished the full 32 classroom hours plus the 30 behind-the-wheel hours. Then you pass the DPS road test. The word 'provisional' is doing real work here: you can now drive alone, but the state still has rules clipped to your license until you turn 18.",
            "The first provisional restriction is the nighttime curfew. You may not drive between 12:00 a.m. and 5:00 a.m. — with specific exceptions for driving to or from work, a school activity, or a medical emergency. This isn't your parents being cautious; it's Texas law, and late-night hours are statistically the deadliest for teen drivers because of fatigue, lower visibility, and the kinds of trips that happen after midnight.",
            "The second provisional restriction is the passenger limit: no more than one passenger under 21 who isn't a member of your immediate family. The reason is one of the most consistent findings in traffic safety research — a teen driver's crash risk climbs sharply with each additional teen passenger in the car. One friend roughly doubles the risk; two or three makes it dramatically worse. The car full of friends feels like the whole point of getting a license, and it's exactly the configuration the law is trying to delay.",
            "The third provisional restriction is a total ban on using a wireless device while driving — no texting, no scrolling, no hands-free calls. For drivers under 18 in Texas, even hands-free phone use is illegal. (Statewide, texting while driving is banned for everyone under §545.4251, but the under-18 rule is stricter and covers more.) The phone goes in the glove box before the car moves. There's no version of this rule you get to negotiate.",
            "Stage three is the unrestricted license, which arrives when you turn 18. At that point the curfew, the passenger cap, and the under-18 phone rules all drop away, and you hold an adult driver license. Notice what didn't change: the texting ban still applies, because that one's for everybody. Reaching 18 doesn't make you a veteran driver — it just means the state has decided you've had enough supervised runway to fly without the training wheels.",
            "One practical warning that catches teens off guard: these restrictions have teeth, and violating them can cost you. Tickets for curfew, passenger, or phone violations go on your record, can extend how long you're stuck in the provisional stage, and can spike the insurance your family pays. The GDL system isn't a suggestion you age out of by ignoring — it's the actual legal framework you're driving inside until 18. Treat the restrictions as the price of the privilege, because that's exactly what they are."
          ],
          "keyPoints": [
            "Permit at 15, after 6 classroom hours; must drive with a licensed adult 21+ in the front seat",
            "Hold the permit 6+ months and log 30 BTW hours (10 night) before moving up",
            "Provisional license at 16: solo driving allowed, but restrictions stay until 18",
            "Provisional curfew: no driving 12 a.m.–5 a.m. (school/work/medical exceptions)",
            "Provisional limits: ≤1 non-family passenger under 21, and NO wireless device use under 18",
            "Unrestricted license at 18; the texting ban (§545.4251) still applies to everyone"
          ],
          "quiz": [
            {
              "q": "The minimum age to apply for a Texas learner permit is:",
              "options": [
                "14",
                "15",
                "16",
                "17"
              ],
              "correct": 1,
              "why": "Texas allows learner permit applications at age 15, after completing at least 6 hours of classroom instruction."
            },
            {
              "q": "While holding a learner permit in Texas, you must:",
              "options": [
                "Drive only on weekends",
                "Have a licensed adult 21+ in the front passenger seat",
                "Stay under 30 mph",
                "Carry no passengers at all"
              ],
              "correct": 1,
              "why": "The permit requires a licensed adult 21 or older in the front seat at all times — its purpose is supervised practice."
            },
            {
              "q": "Before moving from a permit to a provisional license, you must hold the permit for at least:",
              "options": [
                "1 month",
                "3 months",
                "6 months",
                "12 months"
              ],
              "correct": 2,
              "why": "Texas requires a minimum 6-month permit-holding period; you can't test your way out of it early."
            },
            {
              "q": "During the provisional license stage, you may NOT drive between:",
              "options": [
                "10 p.m.–6 a.m.",
                "11 p.m.–5 a.m.",
                "12 a.m.–5 a.m.",
                "Whatever your parents say"
              ],
              "correct": 2,
              "why": "The TX provisional curfew is midnight to 5 a.m., with school, work, and medical-emergency exceptions."
            },
            {
              "q": "A teen with a provisional license can carry how many non-family passengers under 21?",
              "options": [
                "Zero",
                "One",
                "Two",
                "No limit"
              ],
              "correct": 1,
              "why": "Maximum one non-family passenger under 21. Crash risk rises sharply with each additional teen passenger."
            },
            {
              "q": "For a Texas driver under 18, using a wireless device while driving is:",
              "options": [
                "Allowed hands-free",
                "Allowed for navigation only",
                "Completely prohibited, even hands-free",
                "Allowed at red lights"
              ],
              "correct": 2,
              "why": "Under-18 drivers are banned from ALL wireless device use while driving — including hands-free. The phone goes away before the car moves."
            }
          ],
          "worked": {
            "setup": "Jordan turned 16 last week, holds a provisional license, and wants to drive two teammates plus his 14-year-old sister to a Friday football game in Dallas, leaving the house at 7 p.m. and heading home around 11:30 p.m. Sort out which parts of this plan are legal.",
            "walkthrough": "Start with passengers. Provisional drivers can carry only one non-family passenger under 21. Jordan's sister is immediate family, so she doesn't count against the limit — but two teammates is two non-family minors, which is one too many. To stay legal he can bring his sister plus one teammate, not both teammates. Next, timing: the curfew is midnight to 5 a.m., so a 7 p.m. departure and an 11:30 p.m. return are both clear of it — leaving with margin matters, because an accident or overtime that pushes him past midnight would put him in violation with no 'we left on time' defense. Finally, the phone: it stays in the glove box the entire trip, including the hands-free navigation he might be tempted to fiddle with, since under-18 drivers can't use a wireless device at all. Legal version: sister plus one teammate, home well before midnight, phone away."
          },
          "miniScenario": {
            "prompt": "You've had your provisional license for two months. A friend asks you to pick up three people for a 1 a.m. ride home from a party because their other ride fell through. What do you do?",
            "options": [
              "Do it — it's a safety favor and nobody's going to check at 1 a.m.",
              "Decline the drive and help find a legal ride (a parent, a rideshare, an adult), because it breaks both the curfew and the passenger rule.",
              "Drive but only take one person so the passenger rule is satisfied."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Two laws broken at once: it's after midnight (curfew) and that's three non-family minors (passenger limit). 'Nobody will check' is a bet on luck, and a single crash or stop turns a favor into citations, a longer provisional period, and a wreck you weren't experienced enough to avoid at the deadliest hour for teen drivers."
              },
              "1": {
                "good": true,
                "body": "Correct. The genuinely helpful move is finding a legal ride — an adult, a rideshare, a parent. You can be a good friend without breaking the curfew, blowing past the passenger cap, and driving the highest-risk crowd at the highest-risk hour while two months into solo driving."
              },
              "2": {
                "good": false,
                "body": "Cutting it to one passenger fixes the passenger rule but it's still after midnight, so the curfew violation stands. And 1 a.m. is the deadliest window for teen drivers regardless of headcount. This is a 'find another ride' situation, not a 'trim the plan' one."
              }
            }
          }
        },
        {
          "id": "1.3",
          "title": "The Pedestrian Pop-Up",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 01",
            "meta": [
              "35 mph",
              "Dusk"
            ],
            "description": "You're approaching a green light. A delivery van is parked on the right and your view of the sidewalk past it is blocked. What's your move?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Maintain speed — the light is green and I have right of way."
            },
            {
              "letter": "B",
              "text": "Cover the brake, ease off the gas, and scan past the van."
            },
            {
              "letter": "C",
              "text": "Speed up to clear the intersection faster."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Bad call. A pedestrian steps out from behind the van.",
              "body": "You hadn't reduced speed and your sight line was blocked. At 35 mph on dry pavement your stopping distance is ~120 ft. You don't have it. This is the most common type of urban pedestrian collision."
            },
            "B": {
              "good": true,
              "title": "Right call. You're already slowing as the pedestrian appears.",
              "body": "By covering the brake before you needed it, your reaction time effectively dropped from 1.5 seconds to 0.3. You stop with room to spare. The van wasn't the problem — your sight line was."
            },
            "C": {
              "good": false,
              "title": "Worse call. Speeding up reduces your reaction window.",
              "body": "Higher speed means more energy on impact AND less time to scan. Even with the green light, the legal right of way doesn't outrun physics."
            }
          },
          "rule": {
            "tag": "SMITH SYSTEM #2",
            "title": "Get the big picture.",
            "body": "Anything that blocks your view — a parked van, a hedge, an SUV in the lane next to you — could be hiding a hazard. When you can't see, you must <strong>act as if there's something to see</strong>. Cover the brake. Reduce speed. Scan for movement at edges (between vehicles, next to curbs).",
            "stat": {
              "num": "23%",
              "body": "of urban pedestrian collisions involve vehicles where the driver's sight line was blocked by a parked vehicle. The fix is mostly about scanning, not braking."
            }
          },
          "quiz": [
            {
              "q": "When a parked van blocks your view of the sidewalk, the safest move is to…",
              "options": [
                "Honk so anyone behind it knows you're coming.",
                "Maintain speed since you have right of way.",
                "Cover the brake, reduce speed, and scan for movement at edges.",
                "Swerve into the next lane to get past."
              ],
              "correct": 2,
              "why": "Covering the brake cuts your reaction time dramatically. Reducing speed gives you stopping distance. Scanning edges (curbs, gaps between cars) is exactly where pedestrians appear from."
            },
            {
              "q": "True or false: A green light gives you legal right of way over pedestrians.",
              "options": [
                "True — pedestrians must yield to a green light.",
                "False — pedestrians legally in a crosswalk always have right of way."
              ],
              "correct": 1,
              "why": "A pedestrian already in a crosswalk has right of way regardless of the signal. The law and physics both say protect them."
            },
            {
              "q": "Which best describes the Smith System rule 'Get the big picture'?",
              "options": [
                "Always look 12–15 seconds ahead and scan the full scene, including blocked sight lines.",
                "Use your peripheral vision only when changing lanes.",
                "Focus on the car directly in front of you.",
                "Check your speedometer every 10 seconds."
              ],
              "correct": 0,
              "why": "Look far ahead, scan side to side, and treat anything that blocks your view as a potential hazard until proven otherwise."
            },
            {
              "q": "'Covering the brake' means:",
              "options": [
                "Pressing the brake lightly the whole time",
                "Resting your foot over the brake pedal, ready to press, without applying it",
                "Pumping the brake repeatedly",
                "Putting the car in a lower gear"
              ],
              "correct": 1,
              "why": "Covering the brake is hovering your foot over the pedal so you can apply it instantly — it removes the travel time, not the braking itself."
            },
            {
              "q": "At roughly 35 mph, your car covers about how much distance every second?",
              "options": [
                "About 25 feet",
                "About 51 feet",
                "About 90 feet",
                "About 120 feet"
              ],
              "correct": 1,
              "why": "35 mph is about 51 feet per second, which is why shaving even one second off reaction time buys you roughly 50 feet of room."
            },
            {
              "q": "The core reasoning behind 'act as if there's something to see' is:",
              "options": [
                "Pedestrians are legally required to wait for you",
                "Not being able to see a hazard isn't proof there isn't one, so you buy margin in advance",
                "Honking removes the need to slow down",
                "Green lights make intersections safe"
              ],
              "correct": 1,
              "why": "A blocked sight line hides risk; you can't confirm it's empty, so you reduce speed and cover the brake before the hazard appears instead of after."
            }
          ],
          "body": [
            "This scenario is about a specific, deadly trap: the blocked sight line. A parked van, a hedge, a big SUV stopped in the next lane — anything that hides part of the scene from you. The instinct of a new driver is to treat 'I can't see anything there' as 'there's nothing there.' Those are not the same sentence. The first one is about your eyes; the second one is a guess about reality, and it's the guess that gets people hurt.",
            "The professional habit is the opposite: when something blocks your view, you act as if there is something behind it until you can prove otherwise. That doesn't mean panic-braking at every parked car. It means buying yourself margin in advance — easing off the gas, covering the brake (foot hovering over it, not pressing), and actively scanning the edges where a hazard would emerge: the gap between vehicles, the curb line, the space a kid would step out from. A green light does not change any of this. Right-of-way is a legal idea, and a pedestrian already in a crosswalk has it over you regardless of your signal — but physics doesn't read the law, and a stop you can't make in time is just a crash with paperwork.",
            "Why cover the brake matters comes down to numbers. Normal reaction time from 'see hazard' to 'foot on brake' is roughly 1.5 seconds; with your foot already hovering, you cut the travel time to a fraction of that. At 35 mph you're moving about 51 feet every second, so shaving even one second off your reaction is roughly 50 feet of stopping room you didn't have before — frequently the difference between a hard stop and a hospital. The whole scenario below turns on whether you bought that margin before the pedestrian appeared, not after."
          ]
        },
        {
          "id": "1.4",
          "title": "The Late Yellow",
          "minutes": 45,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 02",
            "meta": [
              "40 mph",
              "Day"
            ],
            "description": "You're 60 feet from the stop bar. The light turns yellow. You're going 40 mph. Stop or go?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Floor it — you can clear the intersection in time."
            },
            {
              "letter": "B",
              "text": "Brake firmly. At 40 mph and 60 feet, you can stop on dry pavement."
            },
            {
              "letter": "C",
              "text": "Maintain speed and hope the light stays yellow long enough."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Light goes red as you enter the intersection.",
              "body": "A car starting from the cross street T-bones your front-right quarter. Yellow lights are 3–5 seconds in TX. The bet \"I can make it\" loses 1 in 8 times — and the loss is enormous when it loses."
            },
            "B": {
              "good": true,
              "title": "Clean stop, two feet behind the line.",
              "body": "At 40 mph with normal reaction (1.5s), total stop is ~120 ft. You had 60 ft of stopping room AND ~60 ft you covered while reacting. Tight but legal. You did the math without thinking."
            },
            "C": {
              "good": false,
              "title": "You enter on red.",
              "body": "Indecision is the worst answer. You either commit to stopping or commit to going — never \"see what happens.\" Texas law treats entering on red as a moving violation regardless of how late the yellow turned."
            }
          },
          "rule": {
            "tag": "TX TRAFFIC CODE §544.007",
            "title": "Yellow means stop, when safe.",
            "body": "A yellow light is a warning the green is ending. You must stop before the intersection unless stopping would be unsafe (e.g., car right on your bumper). The \"I can make it\" instinct is wrong about 12% of the time, and that 12% is where most adult-driver T-bone fatalities happen.",
            "stat": {
              "num": "~3 SEC",
              "body": "is the typical TX yellow-light duration. At 40 mph that's 176 feet of travel — barely enough to clear most intersections from the yellow trigger point."
            }
          },
          "quiz": [
            {
              "q": "A yellow light legally means:",
              "options": [
                "Speed up to clear the intersection.",
                "Stop if you safely can.",
                "Slow to 10 mph and proceed.",
                "It's only advisory and has no legal meaning."
              ],
              "correct": 1,
              "why": "TX §544.007: yellow = stop unless stopping is unsafe. It is NOT a 'go faster' signal."
            },
            {
              "q": "At 40 mph on dry pavement, your total stopping distance (reaction + braking) is approximately:",
              "options": [
                "60 feet",
                "120 feet",
                "180 feet",
                "240 feet"
              ],
              "correct": 1,
              "why": "About 60 ft of reaction distance + about 60 ft of braking = roughly 120 ft. It roughly doubles on wet pavement."
            },
            {
              "q": "If you can't stop safely when the light turns yellow, you should:",
              "options": [
                "Slam the brakes anyway.",
                "Speed up dangerously.",
                "Continue at the same speed and clear the intersection.",
                "Stop in the middle of the intersection."
              ],
              "correct": 2,
              "why": "If a safe stop isn't possible (e.g., a car on your bumper), the law and physics both say maintain speed and clear the intersection."
            },
            {
              "q": "A typical Texas yellow light lasts about:",
              "options": [
                "1 second",
                "3 seconds",
                "8 seconds",
                "It varies with your speed"
              ],
              "correct": 1,
              "why": "TX yellow lights are typically around 3 seconds — barely enough time to clear most intersections from the moment it triggers."
            },
            {
              "q": "The single worst response to a yellow light is to:",
              "options": [
                "Stop early with room to spare",
                "Commit to clearing it when you can't safely stop",
                "Stay undecided and 'see what happens'",
                "Brake firmly when you have the distance"
              ],
              "correct": 2,
              "why": "Indecision is the worst answer. You either commit to stopping or commit to going — drifting along lets the light, not you, decide whether you run the red."
            },
            {
              "q": "The deadliest common crash type that results from running a late yellow is:",
              "options": [
                "A rear-end collision",
                "A T-bone (side-impact) from cross-traffic",
                "A rollover",
                "A sideswipe"
              ],
              "correct": 1,
              "why": "Entering on red means arriving when cross-traffic gets its green, causing a side-impact T-bone — one of the most lethal crash configurations."
            }
          ],
          "body": [
            "The yellow light is one of the most misread signals on the road, and the misreading is almost always the same: drivers treat yellow as 'hurry up' when the law treats it as 'stop, if you safely can.' Under Texas Transportation Code §544.007, a steady yellow is a warning that the green is ending and a red is coming — it is the signal to prepare to stop, not to floor it. The only time you continue through is when stopping would itself be unsafe, like when a car is right on your bumper and a hard stop would cause a rear-end crash.",
            "The trap is the 'I can make it' bet, and it's a worse bet than it feels. A Texas yellow is typically only about 3 seconds long. The instinct to accelerate through is built on a confident guess about your speed, the intersection's width, and exactly when the light will turn red — three estimates a teen driver hasn't made enough times to be good at. When the guess is wrong you don't just run a red light; you arrive in the intersection at the exact moment cross-traffic gets its green, which is how T-bone collisions — the deadliest common crash type — happen.",
            "The defense is to make the decision before the light forces it, and that means knowing your stopping distance as a number, not a vibe. At 40 mph on dry pavement, your total stopping distance is roughly 120 feet: about 60 feet covered while you react (around 1.5 seconds) plus about 60 feet of actual braking. So the honest question at a fresh yellow isn't 'can I make it?' — it's 'am I close enough that stopping is no longer safe?' If you have room to stop, you stop. If you're already so close that braking would be violent or get you rear-ended, you commit to clearing the intersection. What you never do is the third thing: drift along undecided and let the light decide for you."
          ]
        },
        {
          "id": "1.5",
          "title": "Module 1 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Texas teens need how many classroom hours?",
              "options": [
                "16",
                "24",
                "32",
                "40"
              ],
              "correct": 2
            },
            {
              "q": "Earliest age to apply for a TX learner permit:",
              "options": [
                "14",
                "15",
                "16",
                "17"
              ],
              "correct": 1
            },
            {
              "q": "Provisional license curfew is:",
              "options": [
                "11pm–5am",
                "12am–5am",
                "1am–6am",
                "No curfew"
              ],
              "correct": 1
            },
            {
              "q": "A pedestrian in a crosswalk has right of way over a green-light driver:",
              "options": [
                "Always",
                "Only if the walk signal is on",
                "Never"
              ],
              "correct": 0
            },
            {
              "q": "A yellow light means:",
              "options": [
                "Speed up",
                "Stop if safe",
                "Slow to 10 mph"
              ],
              "correct": 1
            },
            {
              "q": "Provisional license: max non-family passengers under 21:",
              "options": [
                "0",
                "1",
                "2",
                "No limit"
              ],
              "correct": 1
            },
            {
              "q": "The Smith System rule \"Get the big picture\" tells you to:",
              "options": [
                "Look far ahead and scan the full scene",
                "Stare at the car ahead",
                "Use peripheral vision only"
              ],
              "correct": 0
            },
            {
              "q": "When a parked van blocks your view of the sidewalk you should:",
              "options": [
                "Maintain speed",
                "Cover the brake and scan",
                "Honk and proceed"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M2",
      "num": 2,
      "title": "Driving Tasks & Procedures",
      "blurb": "Pre-drive checks, mirrors, blind spots, signaling, and the routine that becomes muscle memory.",
      "chapters": [
        {
          "id": "2.1",
          "title": "Pre-drive: seat, mirrors, blind spots",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Everything you're about to learn about driving assumes the car fits you before it moves. Six small adjustments take about 30 seconds and quietly prevent a huge share of new-driver problems — bad control, hidden traffic, injuries in a crash you might otherwise have walked away from. Pros do this routine every single time they get in an unfamiliar car, and so should you. Think of it as a pre-flight checklist: boring, fast, and the reason the boring part stays boring.",
            "Start with the seat, because your legs are your most important control and they need full range. Slide your hips all the way back into the seat — don't perch on the front edge. Then set the distance so that when you press the brake pedal all the way to the floor, your knee still has a slight bend in it. If your leg locks straight, you can't push hard in an emergency and the seat becomes a battering ram in a frontal crash. If you're cramped up against the wheel, you lose leverage and you're sitting dangerously close to the airbag. Slight bend, hips back. That's the target.",
            "Now the steering wheel and your hands. Set the wheel height and reach so that with your shoulders against the seat back, you can drape your wrist over the top of the wheel comfortably. From there, drive with your hands at 9 and 3 — think of the wheel as a clock, hands at the 9 o'clock and 3 o'clock positions — not the old 10-and-2 you may have seen. The reason is brutal and specific: modern airbags deploy explosively from the center of the wheel, and hands at 10-and-2 sit right in the blast path, where the airbag can fling them into your face and break thumbs and wrists. 9-and-3 keeps your hands out of that path and gives you smoother control besides.",
            "Mirrors come next, and most drivers set them wrong — angled so they can see the side of their own car. That's wasted glass, because the rearview mirror already shows you what's directly behind. The fix is the BGE (Blind-spot Glare Elimination) method. For the left mirror, lean your head until it nearly touches the driver's window, then adjust the mirror so you can just barely see the side of your own car. For the right mirror, lean toward the center of the car and do the same. When you sit back up, each side mirror now shows the lane beside you instead of your own door.",
            "Set up that way, your three mirrors hand off coverage to each other with almost no overlap and almost no gap — a car passing you slides from your rearview, into your side mirror, and then into your direct peripheral vision as it pulls alongside. That smooth handoff is the whole point. But hear this clearly: BGE shrinks your blind spots, it does not delete them. There is still a slice of space beside and slightly behind you that no mirror catches, which is why a head-check before changing lanes is non-negotiable, every single time, mirrors or not.",
            "The seatbelt is next, and how you wear it decides whether it saves you or hurts you. The shoulder belt must cross your collarbone and the center of your chest — never tucked behind your back, never riding across your neck. The lap belt must sit low and snug across the tops of your hipbones, not up across your soft belly. The reason is simple: bone can take crash forces that soft tissue cannot. A belt routed across hard points spreads a violent stop across your strongest structure; a belt across your stomach in the same crash can cause severe internal injuries. Snug, flat, no twists.",
            "Quick word on head restraints, because almost nobody adjusts them. The head restraint (the 'headrest') isn't for napping — it's there to stop your head from snapping backward in a rear-end collision, which is what causes whiplash. Set the top of it to at least the level of the top of your ears, and as close to the back of your head as comfortable. A head restraint left down at neck height does roughly nothing in a crash. Thirty seconds now, a neck you can still turn later.",
            "Finally, the phone, and this one isn't a suggestion. Before you start the engine, the phone goes somewhere you can't reach it while driving — the glove box, a bag in the back seat, anywhere but your hand or your lap. If you're under 18 in Texas, any wireless-device use behind the wheel is flat-out illegal, and statewide it's illegal for anyone to text and drive under §545.4251. Beyond the law, the reason is physics: at 55 mph, the two seconds you spend glancing at a text is about 160 feet traveled essentially blind. The rest of this entire course is built on one assumption — that your phone is put away before the car moves. Make that true and the rest works."
          ],
          "keyPoints": [
            "Seat: hips back, slight knee bend with the brake pressed fully to the floor",
            "Hands at 9-and-3, never 10-and-2 — keeps hands out of the airbag's blast path",
            "BGE mirror method minimizes blind spots, but never replaces the head-check",
            "Shoulder belt across collarbone/chest; lap belt low on the hipbones, not the belly",
            "Set the head restraint to at least ear-top height to prevent whiplash",
            "Phone away before the engine starts — under-18 wireless use is illegal in TX (§545.4251 bans texting for all)"
          ],
          "quiz": [
            {
              "q": "Optimal hand position on the steering wheel is:",
              "options": [
                "12 (one hand)",
                "9-and-3",
                "10-and-2",
                "Whatever feels comfortable"
              ],
              "correct": 1,
              "why": "9-and-3 keeps your hands out of the airbag's deployment path and gives smooth, balanced control."
            },
            {
              "q": "When you press the brake pedal fully to the floor, your knee should:",
              "options": [
                "Be locked completely straight",
                "Still have a slight bend",
                "Be pressed against the dashboard",
                "Touch the steering wheel"
              ],
              "correct": 1,
              "why": "A slight bend means you can push the brake hard in an emergency and aren't sitting dangerously close to the wheel/airbag."
            },
            {
              "q": "The BGE mirror method aims to:",
              "options": [
                "Show as much of your own car as possible",
                "Set the mirrors so you barely see your own car, minimizing blind spots",
                "Match what other drivers do"
              ],
              "correct": 1,
              "why": "Barely seeing your own car removes redundant overlap with the rearview and maximizes coverage of the lanes beside you."
            },
            {
              "q": "After setting your mirrors with the BGE method, the head-check before a lane change is:",
              "options": [
                "No longer necessary — the mirrors cover everything",
                "Still required, because blind spots are shrunk but not eliminated",
                "Only needed on the highway",
                "Optional if you signal"
              ],
              "correct": 1,
              "why": "BGE minimizes blind spots; it doesn't delete them. A slice of space no mirror catches makes the head-check non-negotiable."
            },
            {
              "q": "A properly worn lap belt sits:",
              "options": [
                "Across your stomach",
                "Low and snug across your hipbones",
                "Behind your back",
                "Anywhere comfortable"
              ],
              "correct": 1,
              "why": "Low across the hipbones puts crash forces into bone, not soft abdominal tissue — across the belly it can cause severe internal injury."
            },
            {
              "q": "A properly adjusted head restraint protects against:",
              "options": [
                "Glare from headlights",
                "Whiplash in a rear-end collision",
                "Side-impact injuries",
                "Drowsiness"
              ],
              "correct": 1,
              "why": "The head restraint stops your head from snapping back in a rear-end hit; set its top to at least the top of your ears."
            },
            {
              "q": "For a Texas driver under 18, where should the phone be before the engine starts?",
              "options": [
                "In a cupholder for navigation",
                "Mounted on the dash for hands-free use",
                "Put away out of reach — any wireless use is illegal under 18",
                "In your lap, face down"
              ],
              "correct": 2,
              "why": "Under-18 drivers can't use a wireless device at all; statewide §545.4251 bans texting for everyone. Phone away before the car moves."
            },
            {
              "q": "Glancing at a text for two seconds at 55 mph means you travel roughly how far essentially blind?",
              "options": [
                "About 20 feet",
                "About 60 feet",
                "About 160 feet",
                "About 400 feet"
              ],
              "correct": 2,
              "why": "55 mph is about 80 feet per second, so two seconds is roughly 160 feet covered without your eyes on the road."
            }
          ],
          "worked": {
            "setup": "You borrow your aunt's car in Austin to practice. The driver before her was tall, so the seat is way back, the wheel is high, the side mirrors point at the sky, and the head restraint is shoved all the way down. Walk through your 30-second setup, in order.",
            "walkthrough": "First the seat: slide forward until you can floor the brake with a slight bend left in your knee — from a tall driver's setting that probably means coming forward several inches; don't stop while your leg is still locking straight. Next the wheel: lower it and set reach so your wrist drapes over the top with your shoulders on the seat back, then commit to 9-and-3. Then mirrors: lean to the window and bring the left mirror down and out until you barely see your own car's side; lean toward the console and do the same on the right — they were aimed at the sky, so both come down significantly. Now the belt: shoulder strap across your collarbone and chest, lap belt low across your hipbones, no twists. Then the head restraint, which was at neck height: raise it until the top reaches at least the top of your ears. Last, phone in the glove box. Total time, maybe 30 seconds — and you just removed about five separate ways the previous driver's settings could have hurt you."
          },
          "miniScenario": {
            "prompt": "You jump in to drive friends home and they're impatient. You notice the seat is too far back to brake hard and the mirrors are aimed wrong, but everyone's saying 'just go.' What do you do?",
            "options": [
              "Pull out now and fix the seat and mirrors once you're rolling so nobody's annoyed.",
              "Take the 30 seconds to set seat, mirrors, and belt before you shift into gear, impatience or not.",
              "Fix the seat now since that's the dangerous one, and leave the mirrors for later."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Adjusting a seat or mirror while moving means looking down and fumbling controls in traffic — you've turned a 30-second stationary task into a distraction at speed. And if a hazard appears in the first block, you're in a seat you can't brake hard from. The 30 seconds is faster than the crash."
              },
              "1": {
                "good": true,
                "body": "Right. The setup routine is non-negotiable and it's genuinely faster than people think. A seat you can't brake from and mirrors you can't see out of are exactly the conditions that turn a routine drive into a wreck. Friends' impatience is cheaper than a collision."
              },
              "2": {
                "good": false,
                "body": "Closer — the seat is the most urgent fix. But mirrors aimed wrong leave you blind to the lane beside you, and you'll want to change lanes within minutes. 'Later' tends to become 'never' once you're rolling. Do the whole 30-second routine while you're stopped."
              }
            }
          }
        },
        {
          "id": "2.2",
          "title": "The 12-second look-ahead rule",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 03",
            "meta": [
              "55 mph",
              "Highway"
            ],
            "description": "You're cruising on a 4-lane highway. Where should your eyes be focused most of the time?"
          },
          "options": [
            {
              "letter": "A",
              "text": "On the bumper of the car directly in front of you."
            },
            {
              "letter": "B",
              "text": "12–15 seconds down the road — about a quarter-mile at highway speed."
            },
            {
              "letter": "C",
              "text": "Constantly switching between dashboard and road."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "You miss the brake-check chain reaction.",
              "body": "Three cars ahead, brake lights flash. By the time the car directly ahead reacts, you're too close to react in time. Following the car ahead instead of the scene ahead is how chain rear-end crashes happen."
            },
            "B": {
              "good": true,
              "title": "You see the brake lights three cars up.",
              "body": "You ease off the throttle. By the time the car ahead brakes, you're already slowing. No drama, no panic stop. This is what experienced drivers do without thinking."
            },
            "C": {
              "good": false,
              "title": "You miss both.",
              "body": "Glance time at the dashboard should be ≤0.5 seconds. Constant switching means you're processing nothing fully."
            }
          },
          "rule": {
            "tag": "SMITH SYSTEM #1",
            "title": "Aim high in steering.",
            "body": "12–15 seconds at highway speed = ~quarter mile. Your eyes should be there 80% of the time, with quick scans of mirrors and the immediate scene. The car directly in front of you is in your peripheral — you don't need to stare at it.",
            "stat": {
              "num": "0.5 SEC",
              "body": "is the maximum a glance off the road should ever last (NHTSA). At 55 mph that's 40 feet — already significant."
            }
          },
          "quiz": [
            {
              "q": "At highway speed, your eyes should primarily be:",
              "options": [
                "On the bumper ahead",
                "12–15 seconds down the road",
                "Constantly checking the dashboard",
                "On your side mirrors"
              ],
              "correct": 1,
              "why": "Aim high — 12–15 seconds ahead. That's where you spot brake-light chains, lane closures, and stalled cars with time to respond."
            },
            {
              "q": "A glance away from the road should never exceed:",
              "options": [
                "0.5 seconds",
                "1 second",
                "2 seconds",
                "3 seconds"
              ],
              "correct": 0,
              "why": "NHTSA flags 2-second glances as roughly doubling crash risk. The professional standard is half a second."
            },
            {
              "q": "Watching only the car directly ahead is dangerous because:",
              "options": [
                "It's too close to react in time",
                "Other drivers expect you to look further ahead",
                "Both A and B"
              ],
              "correct": 2,
              "why": "You can't respond to chain reactions you can't see, and lateral hazards like lane drifts and debris are invisible at that short focal length."
            },
            {
              "q": "At 55 mph, roughly how far does the car travel during a single 0.5-second glance away?",
              "options": [
                "About 10 feet",
                "About 40 feet",
                "About 100 feet",
                "About 200 feet"
              ],
              "correct": 1,
              "why": "55 mph is about 80 feet per second, so even a half-second glance covers around 40 feet — already significant."
            },
            {
              "q": "'Aim high in steering' best means:",
              "options": [
                "Hold the wheel near the top",
                "Keep your eyes far down the road and scan the whole scene, not just the bumper ahead",
                "Sit up as tall as possible",
                "Drive in the leftmost lane"
              ],
              "correct": 1,
              "why": "It's about eye placement — looking 12–15 seconds ahead and scanning the full picture so problems become non-events."
            },
            {
              "q": "Aiming your eyes far down the road, the car directly in front of you should be:",
              "options": [
                "Ignored entirely",
                "Stared at constantly",
                "Kept in your peripheral vision while you scan ahead",
                "Watched only in the mirror"
              ],
              "correct": 2,
              "why": "It stays in peripheral awareness — you don't need to fixate on it, and doing so blinds you to the larger scene."
            }
          ],
          "body": [
            "Where you point your eyes is the single biggest thing separating a calm experienced driver from a jumpy new one, and the difference isn't reflexes — it's focal distance. New drivers tend to lock onto the bumper of the car right in front of them, because that's the nearest threat and it feels responsible to watch it. It's actually the opposite. Staring at the car ahead means you only learn about a problem after that driver reacts to it, by which point you're too close to do anything but react in a panic.",
            "The fix is the first Smith System rule: aim high in steering. At highway speed, your eyes should spend most of their time roughly 12 to 15 seconds down the road — about a quarter mile at 55+ mph. That's far enough ahead to see the brake-light chain reaction starting three cars up, the lane closure with the orange cones, the stalled car on the shoulder, all while you still have room to ease off the gas and respond smoothly instead of stomping the brake. The car directly in front of you doesn't vanish from awareness; it stays in your peripheral vision, where it belongs. You're managing the whole scene, not babysitting one bumper.",
            "Aiming high doesn't mean staring at one far-off point and zoning out. It means a constant, deliberate scan: eyes far ahead most of the time, with quick checks of your mirrors and the immediate scene woven in. And those checks have to be brief — NHTSA's research is blunt that glances away from the road of two seconds or more roughly double your crash risk, which is why the professional standard treats a half-second as the most any single glance should last. At 55 mph even that half-second is about 40 feet traveled blind. The skill isn't never looking away; it's looking away in tiny, disciplined slices and always returning your eyes far down the road."
          ]
        },
        {
          "id": "2.3",
          "title": "Lane changes that don't kill you",
          "minutes": 55,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 04",
            "meta": [
              "45 mph",
              "Day"
            ],
            "description": "You want to change lanes to the right on a 3-lane road. You signal, mirror, and start moving over. Suddenly there's a horn — a car was in your blind spot."
          },
          "options": [
            {
              "letter": "A",
              "text": "Steer back into your lane immediately."
            },
            {
              "letter": "B",
              "text": "Continue the lane change since you already started."
            },
            {
              "letter": "C",
              "text": "Slam the brakes."
            }
          ],
          "correct": "A",
          "consequences": {
            "A": {
              "good": true,
              "title": "Smooth recovery — you give them space.",
              "body": "A controlled return to your original lane is always the right move when you discover a vehicle you didn't see. Don't commit to the new lane just because you started."
            },
            "B": {
              "good": false,
              "title": "Sideswipe.",
              "body": "You assume the other driver will brake or swerve. They might not. The cost of a sideswipe is much higher than the embarrassment of returning to your lane."
            },
            "C": {
              "good": false,
              "title": "Rear-ended.",
              "body": "Slamming brakes at 45 mph in moving traffic creates a different problem — the car behind you. The right answer is to abort the lane change horizontally, not stop."
            }
          },
          "rule": {
            "tag": "SMOG",
            "title": "Signal · Mirror · Over-the-shoulder · Go.",
            "body": "The four-step lane change. Signal (3+ seconds before moving). Mirror (rearview + side). Over-the-shoulder (head turn — yes, even with BGE mirrors). Go. If the over-the-shoulder reveals something, abort and try again.",
            "stat": {
              "num": "40%",
              "body": "of lane-change crashes happen because the driver looked at mirrors but never turned their head. A whole sedan fits in a normally-aimed side-mirror blind spot."
            }
          },
          "quiz": [
            {
              "q": "The 'M' in SMOG stands for:",
              "options": [
                "Maneuver",
                "Mirror",
                "Move",
                "Merge"
              ],
              "correct": 1,
              "why": "Signal · Mirror · Over-the-shoulder · Go."
            },
            {
              "q": "Why turn your head before changing lanes if you already checked the side mirror?",
              "options": [
                "Mirrors miss a car-sized blind spot",
                "It looks more attentive to passengers",
                "To check oncoming traffic"
              ],
              "correct": 0,
              "why": "A full-size car can hide in the blind spot between your rearview and side-mirror coverage. The head-check is non-negotiable."
            },
            {
              "q": "You start a lane change and discover a car in your blind spot. The correct move is:",
              "options": [
                "Continue — you already started",
                "Steer back smoothly to your original lane",
                "Slam the brakes"
              ],
              "correct": 1,
              "why": "Always recover horizontally by canceling the sideways move. Never commit to the new lane just because you started."
            },
            {
              "q": "How far in advance should you signal before changing lanes?",
              "options": [
                "At the moment you start steering over",
                "At least 3 seconds before you move",
                "Only if other cars are nearby",
                "After you've checked your blind spot"
              ],
              "correct": 1,
              "why": "Signal at least 3 seconds before moving so surrounding traffic knows your intention before the car starts drifting."
            },
            {
              "q": "Roughly what share of lane-change crashes happen because the driver checked mirrors but skipped the head-check?",
              "options": [
                "About 10%",
                "About 40%",
                "About 75%",
                "About 95%"
              ],
              "correct": 1,
              "why": "Around 40% of lane-change crashes trace to checking mirrors but never turning the head — a whole car fits in that blind spot."
            },
            {
              "q": "Slamming the brakes to abort a lane change in moving traffic is wrong mainly because:",
              "options": [
                "It's illegal to brake while signaling",
                "It invites the car behind you to rear-end you",
                "Brakes wear out faster",
                "It cancels your turn signal"
              ],
              "correct": 1,
              "why": "Hard braking in flowing traffic creates a new threat from behind. You abort a lane change horizontally — by steering back — not by stopping."
            }
          ],
          "body": [
            "A lane change looks trivial and is one of the most common ways new drivers cause crashes, for one reason: the blind spot. Your mirrors, even set with the BGE method, leave a slice of space beside and slightly behind you where an entire car can hide. A vehicle there is invisible in your rearview, invisible in your side mirror, and not yet alongside you where you'd catch it out of the corner of your eye. Trust your mirrors alone and sooner or later you'll start moving into a lane that already has a car in it.",
            "The defense is a fixed four-step ritual you run the same way every single time, named by the acronym SMOG: Signal, Mirror, Over-the-shoulder, Go. Signal at least 3 seconds before you move, so the traffic around you knows your intention before the car starts drifting. Check your mirrors — rearview and the side you're moving toward. Then do the over-the-shoulder head-check: a quick physical turn of your head to look directly at the blind-spot zone, because that's the only thing that sees the car the mirrors can't. Then, and only if all of that is clear, go. Roughly 40% of lane-change crashes happen because the driver checked mirrors but skipped that head turn.",
            "The other half of surviving lane changes is knowing what to do when the ritual saves you — when the head-check, or a sudden horn, reveals a car you didn't account for after you've already started easing over. The answer is built in advance, because you won't have time to invent it in the moment: you abort horizontally. Smoothly steer back into your original lane and give that vehicle its space. The wrong instincts are to commit to the new lane anyway ('I already started') or to slam the brakes — committing risks a sideswipe, and braking hard in moving traffic invites the car behind you to rear-end you. You undo a lane change by canceling the sideways move, not by stopping."
          ]
        },
        {
          "id": "2.4",
          "title": "Module 2 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Optimal hand position on the wheel:",
              "options": [
                "10-and-2",
                "9-and-3",
                "12 only"
              ],
              "correct": 1
            },
            {
              "q": "BGE mirror setup minimizes:",
              "options": [
                "Glare",
                "Blind spots",
                "Vibration"
              ],
              "correct": 1
            },
            {
              "q": "Highway eye focus belongs:",
              "options": [
                "On the bumper ahead",
                "12–15 sec down the road",
                "In the rearview"
              ],
              "correct": 1
            },
            {
              "q": "A glance off the road should be at most:",
              "options": [
                "0.5 sec",
                "1.5 sec",
                "3 sec"
              ],
              "correct": 0
            },
            {
              "q": "SMOG stands for:",
              "options": [
                "Speed-Mirror-Observe-Go",
                "Signal-Mirror-Over-the-shoulder-Go",
                "Stop-Mirror-Open-Go"
              ],
              "correct": 1
            },
            {
              "q": "Signal before a lane change at least:",
              "options": [
                "1 second",
                "3 seconds",
                "10 seconds"
              ],
              "correct": 1
            },
            {
              "q": "You start a lane change and find a car in your blind spot. Best response:",
              "options": [
                "Continue",
                "Return to your lane",
                "Brake hard"
              ],
              "correct": 1
            },
            {
              "q": "Glance time over 2 seconds:",
              "options": [
                "Is fine on highways",
                "Roughly doubles crash risk",
                "Only matters for texting"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M3",
      "num": 3,
      "title": "Vehicle Operation",
      "blurb": "Steering, braking, acceleration physics, and what your car is actually doing under you.",
      "chapters": [
        {
          "id": "3.1",
          "title": "Steering — hand position and recovery",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Your hands are the only thing connecting your decisions to two tons of moving metal. Everything else in this chapter is about making that connection trustworthy. And the very first rule sounds like a nitpick until you understand the physics: put your hands at 9-and-3, never 10-and-2. The driver's-ed posters you grew up seeing were wrong, and the people who updated them did it because of crash data.",
            "Here is why. The airbag in your steering wheel doesn't gently inflate like a balloon. It detonates. A sodium-azide charge fires and the bag goes from folded to fully inflated in roughly 1/25th of a second, punching outward at speeds that have been measured around 150 to 200 mph. That bag erupts from the center of the wheel and travels up and out. Whatever is sitting in its path gets launched along with it.",
            "At 10-and-2, your hands and forearms are directly over the airbag housing. When it fires, it slams your own hands back into your face and detonates under your wrists, and the documented injuries are broken thumbs, shattered fingers, fractured forearms, and de-gloving. At 9-and-3, your hands are out to the sides of the explosion path. The bag fires up the center between your arms instead of through them. Same crash, completely different hands.",
            "Now grip. Hold the wheel like you're shaking hands with it, firm but relaxed, thumbs resting along the rim rather than hooked around the inside. Hooked thumbs get broken when the wheel kicks back, which happens when a front tire hits a pothole or the curb during a skid. A relaxed grip also transmits information. You can feel the road talking through the wheel, and that feedback is how you sense a tire starting to lose grip before you'd ever see it.",
            "For everyday turns, use push-pull steering. One hand pushes the wheel up while the other slides to meet it, then that hand pulls down while the first one slides. The wheel feeds through your hands and your arms never cross. It looks less dramatic than the hand-over-hand swooping you see in movies, but it keeps both hands available and keeps your arms out of the airbag's path the entire time you're turning.",
            "Hand-over-hand is the exception, reserved for tight, slow maneuvers where push-pull simply can't rotate the wheel far enough fast enough. Parking lots, U-turns, three-point turns, sharp parking-garage ramps. The speeds are low, the airbag risk is near zero, and you need a lot of wheel quickly. Cross your hands there if you must, but the instant you're back up to road speed, your hands belong at 9-and-3.",
            "The single most important steering skill isn't a hand technique at all. It's where you point your eyes. In a skid, an emergency swerve, or any moment the car gets squirrelly, you will steer toward whatever you're looking at. This is hardwired, not a habit you can think your way out of mid-crisis. Drivers who stare at the oncoming guardrail steer straight into it. Drivers who fixate on the deer hit the deer.",
            "So you flip it on purpose: look where you want to go, not at what you're trying to avoid. Find the gap, the open lane, the clear shoulder, and aim your eyes there. Your hands follow automatically. Texas troopers call this target fixation in their crash reports, and it shows up constantly in single-vehicle wrecks on rural FM roads, where a driver drifts onto the shoulder, panics, and steers right into the only tree for half a mile because that tree is the only thing they were looking at.",
            "When you recover from a skid or a swerve, don't yank the wheel back. A violent correction in one direction sets up an even bigger swing in the other, and that secondary swing, the overcorrection, is what flips trucks and SUVs and sends cars spinning across the median. Steer smoothly, only as much as you need, and then unwind just as smoothly as the car straightens. Slow hands beat fast hands every time the car is sliding.",
            "Tie it together and steering becomes simple. Hands at 9-and-3 so a crash doesn't break them. Relaxed grip with thumbs on the rim so the wheel can't snap them and so you can feel the road. Push-pull for normal driving, hand-over-hand only for slow tight stuff. And in any emergency, your eyes do the real steering: look at your escape route, keep your inputs smooth, and let your hands quietly follow your gaze to safety."
          ],
          "keyPoints": [
            "9-and-3, never 10-and-2 — keeps hands out of the airbag's detonation path (~150-200 mph)",
            "Relaxed grip, thumbs resting on the rim — hooked thumbs get broken by wheel kickback",
            "Push-pull for normal turns; hand-over-hand only for slow, tight maneuvers",
            "Look where you want to go — target fixation makes you steer at whatever you stare at",
            "Recover smoothly; a violent yank causes the overcorrection that flips vehicles",
            "Your eyes do the real steering — hands follow your gaze automatically"
          ],
          "quiz": [
            {
              "q": "The recommended hand position on the steering wheel is:",
              "options": [
                "10-and-2",
                "9-and-3",
                "12 (one hand at top)",
                "Whatever feels comfortable"
              ],
              "correct": 1,
              "why": "9-and-3 keeps your hands out of the airbag's detonation path. The old 10-and-2 standard was changed because of injury data."
            },
            {
              "q": "10-and-2 is dangerous specifically because:",
              "options": [
                "It's harder to make tight turns",
                "An airbag deploying at ~150+ mph blasts your own hands into your face and breaks wrists/thumbs",
                "It causes muscle fatigue on long drives",
                "It blocks your view of the gauges"
              ],
              "correct": 1,
              "why": "Modern airbags fire from the center of the wheel at extreme speed. Hands at 10-and-2 sit directly in that path and get launched along with the bag."
            },
            {
              "q": "You should rest your thumbs along the rim rather than hooking them inside because:",
              "options": [
                "It looks more relaxed",
                "A hooked thumb gets broken when the wheel kicks back (pothole, curb, skid)",
                "It improves your grip on the leather",
                "TX law requires it"
              ],
              "correct": 1,
              "why": "When a front tire hits something hard, the wheel can kick violently. Thumbs hooked inside the spokes get snapped; thumbs resting on the rim don't."
            },
            {
              "q": "Push-pull steering is best described as:",
              "options": [
                "Crossing your arms hand-over-hand",
                "Feeding the wheel through your hands so your arms never cross",
                "Steering with one hand at the top",
                "Yanking the wheel sharply to turn"
              ],
              "correct": 1,
              "why": "Push-pull feeds the wheel through your hands without crossing your arms, keeping both hands available and clear of the airbag."
            },
            {
              "q": "Hand-over-hand steering is appropriate for:",
              "options": [
                "Highway driving",
                "Slow, tight maneuvers like parking and U-turns",
                "Emergency high-speed swerves",
                "It should never be used"
              ],
              "correct": 1,
              "why": "Hand-over-hand is reserved for slow, tight maneuvers where you need lots of wheel quickly and airbag risk is minimal."
            },
            {
              "q": "In a skid or emergency, you should look:",
              "options": [
                "At the obstacle you're trying to avoid",
                "Where you want the car to go",
                "Down at the steering wheel",
                "At your mirrors"
              ],
              "correct": 1,
              "why": "Eyes lead the hands. Stare at the obstacle and you'll steer into it (target fixation). Look at your escape route and your hands follow."
            },
            {
              "q": "'Target fixation' explains why single-vehicle crashes on rural roads often involve:",
              "options": [
                "Drivers falling asleep",
                "Drivers steering into the one tree or pole they were staring at",
                "Bald tires",
                "Faded lane markings"
              ],
              "correct": 1,
              "why": "A drifting driver panics, locks onto the only obstacle around, and steers straight into it because that's where their eyes were aimed."
            },
            {
              "q": "When recovering from a skid or a jolt onto the shoulder, you should:",
              "options": [
                "Yank the wheel hard to get back fast",
                "Steer smoothly and unwind gently — avoid overcorrecting",
                "Take both hands off the wheel and brake",
                "Accelerate hard to regain control"
              ],
              "correct": 1,
              "why": "A violent correction sets up an even bigger swing the other way. That overcorrection is what flips vehicles and causes fishtailing across lanes."
            }
          ],
          "worked": {
            "setup": "You're doing 60 mph on a two-lane FM road outside Bastrop at dusk. A deer steps out from the right tree line about 120 feet ahead. There's no oncoming traffic and the left lane is clear. Your hands are at 9-and-3.",
            "walkthrough": "Wrong way: you lock your eyes on the deer (the biggest, scariest thing in your windshield), stomp the brake, and your hands drift the wheel right toward exactly what you're staring at — straight into the deer, or off the shoulder into the trees. Target fixation did the steering for you. Right way: you snap your eyes to the open left lane — your escape route — and steer smoothly toward it with a controlled push-pull input, braking firmly but not slamming. Your hands follow your eyes into the gap. Once you've cleared the deer, you unwind the wheel just as smoothly back to center, no violent yank, because an overcorrection at 60 mph is how this becomes a rollover instead of a near-miss. Same deer, same road. The difference is entirely where you chose to look and how smooth your hands stayed."
          },
          "miniScenario": {
            "prompt": "You're merging onto I-10 and your right front tire catches the rumble strip on the shoulder, jerking the car right. Your instinct is to correct hard to the left to get back in your lane. What's the better move?",
            "options": [
              "Yank the wheel hard left to get back in the lane fast.",
              "Ease off the gas, look down your lane, and steer smoothly back with a gentle correction.",
              "Brake hard and let the car drift back on its own."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "A hard left yank is the classic overcorrection. The car swings past center, you reflexively yank right, and now it's fishtailing across lanes at freeway speed. This single mistake causes a huge share of single-vehicle rollovers in Texas."
              },
              "1": {
                "good": true,
                "body": "Eyes down your lane (where you want to go), a smooth gentle correction, and easing off the gas to settle the car. Your hands follow your eyes, the car straightens, and you unwind calmly. Smooth and survivable."
              },
              "2": {
                "good": false,
                "body": "Hard braking while one set of tires is still on the loose shoulder gravel can break traction and pull the car further sideways. Doing 'nothing' with the wheel also means you keep drifting off the road. You need a smooth steering input, not just braking."
              }
            }
          }
        },
        {
          "id": "3.2",
          "title": "Braking distance is not a feeling",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 05",
            "meta": [
              "65 mph",
              "Wet road"
            ],
            "description": "You're in the right lane on a wet highway, going 65 mph. The car ahead brakes hard. How much room do you actually need to stop?"
          },
          "options": [
            {
              "letter": "A",
              "text": "About 200 feet — same as dry road."
            },
            {
              "letter": "B",
              "text": "About 400 feet — the wet pavement doubles your braking distance."
            },
            {
              "letter": "C",
              "text": "About 100 feet — modern ABS makes wet stops fast."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "You hit the car in front.",
              "body": "On wet pavement your tires lose ~50% of their grip. Stopping distance roughly doubles. The reaction-time component (~1.5 seconds = ~140 ft at 65 mph) doesn't change, but the braking component does."
            },
            "B": {
              "good": true,
              "title": "You stopped because you knew the math.",
              "body": "Reaction (~140 ft) + wet braking (~250 ft) = ~390 ft. You were following at the rain-adjusted 5-second rule (≈480 ft at 65 mph), so you had room."
            },
            "C": {
              "good": false,
              "title": "You hit the car in front.",
              "body": "ABS prevents wheel lock so you can steer while braking. It does NOT shorten the actual stopping distance — sometimes ABS even lengthens it slightly on slick surfaces."
            }
          },
          "rule": {
            "tag": "PHYSICS",
            "title": "Energy scales with v², not v.",
            "body": "Doubling speed quadruples the kinetic energy that has to be dumped through the brakes. Halving the friction (wet) doubles the stopping distance. Both effects compound.",
            "stat": {
              "num": "~390 FT",
              "body": "wet stopping distance at 65 mph (1.5s reaction + ~250 ft braking). On dry pavement: ~210 ft."
            }
          },
          "quiz": [
            {
              "q": "Total stopping distance is made up of:",
              "options": [
                "Just braking distance",
                "Reaction distance + braking distance",
                "Just reaction distance",
                "Tire quality alone"
              ],
              "correct": 1,
              "why": "Total stop = reaction distance (before your foot moves) + braking distance (once the brakes clamp). Both matter."
            },
            {
              "q": "At 65 mph, your reaction distance (~1.5 seconds) is roughly:",
              "options": [
                "20 feet",
                "140 feet",
                "400 feet",
                "It's zero if you're paying attention"
              ],
              "correct": 1,
              "why": "At 65 mph you cover ~95 ft/sec, so 1.5 seconds of reaction time is ~140 feet traveled before braking even begins."
            },
            {
              "q": "Doubling your speed multiplies the kinetic energy your brakes must dump by:",
              "options": [
                "2x",
                "3x",
                "4x",
                "It stays the same"
              ],
              "correct": 2,
              "why": "KE = ½mv². The velocity term is squared, so twice the speed = four times the energy, which is why braking distance grows so fast."
            },
            {
              "q": "Wet pavement, compared to dry, roughly:",
              "options": [
                "Halves your braking distance",
                "Doubles your braking distance",
                "Has no effect if you have ABS",
                "Only affects reaction distance"
              ],
              "correct": 1,
              "why": "Water cuts tire friction by about half, which roughly doubles braking distance. Reaction distance is unchanged because it happens before braking."
            },
            {
              "q": "The most dangerous time to drive in rain is often:",
              "options": [
                "After it's been raining for an hour",
                "The first 10-15 minutes, when oil floats into a greasy film",
                "Only during heavy downpours",
                "At night, regardless of how long it's rained"
              ],
              "correct": 1,
              "why": "Early light rain lifts built-up oil and rubber into a slick film instead of washing it away, making the road far slicker than it looks."
            },
            {
              "q": "ABS (anti-lock brakes) primarily:",
              "options": [
                "Shortens your stopping distance dramatically",
                "Keeps wheels from locking so you can steer while braking hard",
                "Eliminates the need for following distance",
                "Replaces the reaction-distance part of the math"
              ],
              "correct": 1,
              "why": "ABS prevents wheel lockup so you retain steering during hard braking. It does not meaningfully shorten the stopping distance and can lengthen it on loose surfaces."
            }
          ],
          "body": [
            "Most new drivers think stopping is about reflexes — see the brake lights, hit the pedal, stop. But your reflexes are only one piece, and they're the small piece. The real story of stopping a car is two separate distances added together, and almost nobody is taught to think about them apart. Once you do, you'll understand why tailgating is so deadly and why 'I'll just brake' fails at highway speed.",
            "The first piece is reaction distance — how far the car travels in the time between your eyes seeing the hazard and your foot actually pressing the brake. For an alert driver that's about 1.5 seconds. That sounds tiny, but at 65 mph you're covering 95 feet every second, so 1.5 seconds is roughly 140 feet of travel before the brakes do anything at all. You haven't slowed down one bit during that stretch. You're just a passenger watching it happen.",
            "The second piece is braking distance — how far the car travels once the brakes are actually clamping down, until you're stopped. This is where physics gets unforgiving. Kinetic energy follows the formula KE equals one-half mass times velocity squared, and that squared term is the whole ballgame. Double your speed and you don't double the energy your brakes have to dump — you quadruple it. That's why braking distance grows so much faster than speed does.",
            "Put real numbers on it. On dry pavement, stopping from 30 mph takes roughly 75 feet total. From 60 mph it's not 150 feet — it's around 240 feet, because the braking portion roughly quadrupled while the speed only doubled. This is the trap behind 'I had plenty of room.' The gap that felt safe at 35 mph in a Houston neighborhood is nowhere near enough on a 65 mph stretch of I-45.",
            "Now make it wet, because in Texas it goes from dry to flooding in about ten minutes. Water cuts the friction between tire and road by roughly half. Your reaction distance doesn't change — that 140 feet at 65 mph is the same wet or dry, because it happens before braking. But the braking distance roughly doubles. So your total stopping distance at 65 mph jumps from around 210 feet dry to nearly 390 feet wet, the length of a football field plus both end zones.",
            "The first ten or fifteen minutes of rain are the most dangerous of all. Oil, rubber, and dust have been building up on the road since the last rain, and a light sprinkle floats all of it into a greasy film instead of washing it away. Texas drivers get caught by this constantly on the access roads and overpasses around Dallas and Austin. The road looks barely wet and behaves like it's been buttered.",
            "This is where the rule of thumb comes from: leave a following distance of at least 3 seconds on dry pavement, and stretch it to 5 or more in rain. You measure it by picking a fixed point — an overpass shadow, a sign — and counting how long after the car ahead passes it until you do. Notice this is a time gap, not a fixed distance, which is exactly right, because a time gap automatically grows in feet as you go faster.",
            "One more piece of gear that gets misunderstood: anti-lock brakes, or ABS. People assume ABS stops you shorter. It usually doesn't — on some loose surfaces it even stops you slightly longer. What ABS actually does is keep your wheels from locking up and skidding, which means you can still steer while you're braking hard. So ABS doesn't shrink the math you're about to work through. It lets you brake at maximum and swerve around the thing at the same time, instead of plowing straight into it with locked tires."
          ]
        },
        {
          "id": "3.3",
          "title": "Stability, traction, and weight transfer",
          "minutes": 50,
          "type": "reading",
          "body": [
            "Here is the single most useful idea in this entire course: your tires only have so much grip, and everything you do with the car spends it. Accelerating spends grip. Braking spends grip. Turning spends grip. The crashes that kill new drivers almost always come down to one mistake — asking the tires for more grip than they have, all at once.",
            "Picture each tire with a \"grip budget\" of 100 units. On dry pavement a good tire might have all 100 available. Braking in a straight line might spend 90 of those units — fine, you have 90, the car stops. Turning gently through a curve might spend 40 units — also fine. The danger is doing both at the same time: 90 for braking plus 40 for turning is 130 units of grip demanded from a tire that only has 100. The tire can't deliver it, so it stops gripping and starts sliding. That slide is a skid.",
            "This is why the phrase \"slamming the brakes in a turn\" is shorthand for \"losing the car.\" You were already spending grip to turn. Stack hard braking on top and you blow past 100%. The front tires (or rear, depending) give up, and now you're a 3,000-pound object traveling in whatever direction physics chose, not you.",
            "The grip budget shrinks when conditions get worse. Rain might cut your total from 100 to 50. Ice can take it to 10. Gravel, wet leaves, oil patches, the first ten minutes of light rain on a road that hasn't rained in weeks — all of these quietly lower the budget. The mistake isn't driving on a low-grip surface; it's driving on one as if you still had 100 units to spend.",
            "Now, weight transfer — the second half of the picture. A car is not a rigid block; its weight shifts around as you drive, and grip follows weight. When you brake, the nose dives and weight shifts forward. That actually *loads* the front tires, giving them more grip (good, because the front brakes do most of the work) while *unloading* the rear tires (they now have less grip and can step out).",
            "When you accelerate, the opposite happens: weight shifts to the rear, the front end gets light, and the front tires lose some grip. This is why flooring the gas mid-corner in a powerful car can push the nose wide — the front tires you're steering with just got unloaded. When you turn, weight shifts to the *outside* tires (turn left, weight goes right). The outside tires are doing most of the cornering work precisely because they're the most loaded.",
            "The pattern underneath all of it: weight transfers toward whatever direction the car is trying to NOT go. Brake (car wants to keep going forward) → weight goes forward. Turn left (car wants to keep going straight) → weight goes right. Once you feel this, you stop being surprised by the car. You can predict which tires are loaded and which are about to give up.",
            "So what do you actually DO with this? You separate your inputs. Brake first, in a straight line, while you still can. Get your speed off BEFORE the corner, not during it. Then ease off the brake, let the car settle, and steer through the corner with grip to spare. Then, once the wheel is coming back to straight, get back on the gas. Brake — settle — steer — settle — accelerate. Each input gets its own slice of the grip budget instead of fighting the others for it.",
            "Race drivers call the smooth version of this \"slow hands, slow feet.\" Every input is gradual. You can induce a skid with a violent stab at any control — a panic brake, a yank of the wheel, a stomp on the gas. The same maneuver done smoothly keeps the tires inside their budget. Smoothness isn't a style preference; it's how you stay under 100%.",
            "If you DO exceed the budget and the car starts to slide, the recovery is counterintuitive but simple: ease off whatever you were overdoing. Skidding while braking? Ease off the brake (or, with ABS, keep firm pressure and let the system pulse). Skidding while accelerating? Lift off the gas smoothly — don't stab it. Rear sliding out in a turn? Ease off, and steer gently in the direction the rear is sliding. In every case the move is to give grip back to the tire by asking less of it. Panic does the opposite, which is why panic crashes."
          ],
          "keyPoints": [
            "Each tire has ~100% of grip to share across braking + turning + accelerating",
            "Combining hard inputs (brake + turn) demands >100% → skid",
            "Grip budget shrinks with rain (~50%), ice (~10%), gravel, oil",
            "Weight transfers toward the direction the car is trying NOT to go",
            "Separate inputs: brake → settle → steer → settle → accelerate",
            "Recovery = ease off whatever you were overdoing (give grip back)"
          ],
          "quiz": [
            {
              "q": "Your tires' total available grip is best described as:",
              "options": [
                "Unlimited on dry pavement",
                "A fixed \"budget\" shared across braking, turning, and accelerating",
                "Only relevant when braking",
                "Determined by how new the tires look"
              ],
              "correct": 1,
              "why": "Grip is a finite budget. Every input (brake/turn/accelerate) spends from the same ~100% pool at each tire."
            },
            {
              "q": "Braking hard AND steering hard at the same time tends to:",
              "options": [
                "Stop the car faster",
                "Cause a skid because you demand more grip than the tire has",
                "Automatically engage ABS",
                "Improve cornering grip"
              ],
              "correct": 1,
              "why": "Stacking two high-demand inputs exceeds the ~100% budget, so the tire stops gripping and slides."
            },
            {
              "q": "In rain, your grip budget might drop to roughly:",
              "options": [
                "90%",
                "50%",
                "5%",
                "It does not change"
              ],
              "correct": 1,
              "why": "Wet pavement roughly halves available grip — which is why the same maneuver that's fine when dry can break traction in the rain."
            },
            {
              "q": "When you brake, weight transfers:",
              "options": [
                "Forward, loading the front tires",
                "Backward, loading the rear tires",
                "To the outside tires",
                "It stays evenly distributed"
              ],
              "correct": 0,
              "why": "Braking pitches the nose down and loads the front tires — which is useful, since the front brakes do most of the stopping."
            },
            {
              "q": "The underlying rule for weight transfer is: weight shifts toward:",
              "options": [
                "Whatever direction the car is trying to go",
                "Whatever direction the car is trying NOT to go",
                "Always the front",
                "Always the heaviest corner"
              ],
              "correct": 1,
              "why": "Brake (car wants to keep going forward) → weight forward. Turn left (car wants to keep going straight) → weight right."
            },
            {
              "q": "The safe input pattern through a corner is:",
              "options": [
                "Brake and steer together, hard",
                "Brake → settle → steer → settle → accelerate",
                "Accelerate through the whole corner",
                "Steer first, then brake mid-corner"
              ],
              "correct": 1,
              "why": "Separating inputs gives each one its own share of the grip budget instead of forcing them to compete past 100%."
            },
            {
              "q": "You enter a curve too fast and it's tightening. The best move is to:",
              "options": [
                "Brake hard mid-corner",
                "Ease off the gas gently and tighten your line smoothly",
                "Stab the gas to \"settle\" the car",
                "Yank the wheel harder"
              ],
              "correct": 1,
              "why": "A gentle lift shifts weight forward for more steering grip and sheds speed without a violent, budget-blowing input."
            },
            {
              "q": "If a tire starts to skid, the recovery principle is to:",
              "options": [
                "Add more of the input that caused it",
                "Ease off whatever you were overdoing, giving grip back",
                "Close your eyes and brace",
                "Always brake harder"
              ],
              "correct": 1,
              "why": "A skid means you exceeded the budget. Reducing the offending input drops demand back under 100% and the tire grips again."
            }
          ],
          "worked": {
            "setup": "You're on a 45 mph access road in Houston. It's the first light rain in three weeks, so the road is greasy with oil. A light ahead turns red and you need to make the right turn just before it.",
            "walkthrough": "Wrong way: you carry 45 mph toward the turn, then brake AND crank the wheel together. On a dry day the tires might absorb it. Today the grip budget is ~50%, you demand ~130%, the front washes out, and you slide straight through the turn into the curb. Right way: you brake early and hard while still pointed straight — straight-line braking can use nearly the whole reduced budget safely — bleed off to ~15 mph BEFORE the turn, release the brake, let the nose come back up, then steer through with grip to spare. Same corner, same rain, opposite outcome. The only difference is that you spent your grip one input at a time."
          },
          "miniScenario": {
            "prompt": "You're turning left through a curve at 35 mph and you realize halfway through that you're carrying too much speed — the curve is tightening. What do you do?",
            "options": [
              "Brake hard NOW, mid-corner, to scrub the speed.",
              "Ease off the gas gently and tighten your steering line smoothly.",
              "Keep the gas steady and hope the tires hold."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Hard braking mid-corner stacks braking grip on top of cornering grip you're already using → you blow the budget and the front (or rear) lets go. This is the classic \"braked in the curve, lost the car\" crash."
              },
              "1": {
                "good": true,
                "body": "Lifting off the gas gently shifts a little weight forward (more front grip to steer with) and sheds speed without a violent input. Smooth and survivable."
              },
              "2": {
                "good": false,
                "body": "Hoping is not an input. If the curve is genuinely tightening and you're over budget, doing nothing means running wide into the oncoming lane or the shoulder."
              }
            }
          }
        },
        {
          "id": "3.4",
          "title": "Module 3 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Modern airbags deploy at:",
              "options": [
                "~50 mph",
                "~150 mph",
                "~300 mph"
              ],
              "correct": 1
            },
            {
              "q": "In a skid, you should look:",
              "options": [
                "At the obstacle",
                "Where you want to go",
                "At your lap"
              ],
              "correct": 1
            },
            {
              "q": "Wet pavement doubles your:",
              "options": [
                "Reaction time",
                "Braking distance",
                "Top speed"
              ],
              "correct": 1
            },
            {
              "q": "Doubling speed multiplies kinetic energy by:",
              "options": [
                "2x",
                "3x",
                "4x"
              ],
              "correct": 2
            },
            {
              "q": "ABS:",
              "options": [
                "Shortens stopping distance",
                "Prevents wheel lock during braking",
                "Replaces seatbelts"
              ],
              "correct": 1
            },
            {
              "q": "Braking shifts weight:",
              "options": [
                "Forward",
                "Backward",
                "Sideways"
              ],
              "correct": 0
            },
            {
              "q": "Maximum input safely combined with hard braking:",
              "options": [
                "Hard steering",
                "Light steering",
                "Anything goes — ABS handles it"
              ],
              "correct": 1
            },
            {
              "q": "Push-pull steering:",
              "options": [
                "Crosses arms",
                "Feeds wheel through hands without crossing",
                "Uses one hand at top"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M4",
      "num": 4,
      "title": "Performing Basic Maneuvers",
      "blurb": "Turns, intersections, parking, U-turns, lane positioning.",
      "chapters": [
        {
          "id": "4.1",
          "title": "Right-of-way at every intersection type",
          "minutes": 60,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 06",
            "meta": [
              "4-way stop",
              "Day"
            ],
            "description": "You arrive at a 4-way stop at the same moment as a car on your right. Who goes first?"
          },
          "options": [
            {
              "letter": "A",
              "text": "You go first — you signaled."
            },
            {
              "letter": "B",
              "text": "The car on your right goes first — yield-to-right tie-breaker."
            },
            {
              "letter": "C",
              "text": "Whoever is bigger."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Both cars enter the intersection.",
              "body": "Tie-breaker: the car on your right has right of way. Signaling doesn't override the rule. Most 4-way stop crashes are exactly this miscommunication."
            },
            "B": {
              "good": true,
              "title": "Smooth coordination, no near-miss.",
              "body": "Universal US tie-breaker: yield to the right. If three cars arrive at once and you're in the middle, the cascade still resolves clockwise."
            },
            "C": {
              "good": false,
              "title": "Wrong rule.",
              "body": "Vehicle size has nothing to do with right of way. Yield-to-right works regardless."
            }
          },
          "rule": {
            "tag": "TX TRAFFIC CODE §545.151",
            "title": "First in, first out. Tie = yield to your right.",
            "body": "At an uncontrolled intersection or a 4-way stop, the first car to come to a complete stop has right of way. If two arrive together, the car on the right goes first. If three arrive together, yield-to-right cascades clockwise from north.",
            "stat": {
              "num": "~30%",
              "body": "of urban crashes happen at intersections — almost all from right-of-way confusion."
            }
          },
          "quiz": [
            {
              "q": "At a four-way stop, two cars arrive and stop at exactly the same time, side by side. Who goes first?",
              "options": [
                "The faster car",
                "The car on the right",
                "The car on the left",
                "Whoever honks first"
              ],
              "correct": 1,
              "why": "Simultaneous arrival at a four-way stop is resolved by yielding to the car on the right."
            },
            {
              "q": "The law regarding right-of-way actually:",
              "options": [
                "Gives certain drivers the right to go",
                "Only states who must YIELD — it never grants the right to go",
                "Only applies at traffic lights",
                "Is a suggestion, not enforceable"
              ],
              "correct": 1,
              "why": "The law only assigns who must yield. 'Having' the right of way is shorthand — you still must confirm others yield before you go."
            },
            {
              "q": "You're making an unprotected left turn on a green light (no arrow). Oncoming traffic is going straight. Who has the right of way?",
              "options": [
                "You, because you were there first",
                "Oncoming traffic going straight",
                "Whoever is bigger",
                "Neither — both stop"
              ],
              "correct": 1,
              "why": "An unprotected left yields to oncoming straight-through traffic. You wait for a real gap before turning."
            },
            {
              "q": "Entering a roundabout, you must:",
              "options": [
                "Stop and wait for the roundabout to empty",
                "Yield to traffic already in the circle, then enter on a gap",
                "Enter first and let others yield to you",
                "Come to a full stop inside the circle"
              ],
              "correct": 1,
              "why": "Roundabouts work because entering traffic yields to traffic already circulating, then merges into a gap and keeps moving."
            },
            {
              "q": "A pedestrian is crossing in an UNMARKED crosswalk (no painted lines) at an intersection. You have a green light. You must:",
              "options": [
                "Proceed — they have no right of way without painted lines",
                "Yield — a pedestrian lawfully crossing has right of way in marked AND unmarked crosswalks",
                "Honk and proceed slowly",
                "Yield only if a walk signal is lit"
              ],
              "correct": 1,
              "why": "Texas law (and the Lisa Torry Smith Act) protects pedestrians in marked and unmarked crosswalks. A green light is not a defense for hitting a lawful pedestrian."
            },
            {
              "q": "The single most useful mental habit at any intersection is to ask:",
              "options": [
                "How fast can I clear this?",
                "Who is supposed to yield here — and are they actually doing it?",
                "Is anyone watching me?",
                "Can I make the light?"
              ],
              "correct": 1,
              "why": "Knowing who must yield is only half the job; confirming they actually yield before you commit is what prevents the crash."
            }
          ],
          "body": [
            "Right-of-way is the single most misunderstood idea in driving, and the misunderstanding kills people. Here is the rule that fixes most of it: the law never GIVES you the right of way. It only says who must YIELD it. You can be 100% in the right and 100% dead. So the real skill isn't knowing when you have the right of way — it's knowing who's supposed to yield, and then watching to make sure they actually do.",
            "Start with the four-way stop, because it's where teens freeze. The rule has a clear order. First to fully stop is first to go. If two of you stop at the same time, the driver on the RIGHT goes first. If you're directly across from each other and both going straight or both turning right, you can go at the same time — you won't conflict. The only real conflict is left turns: a left-turning driver yields to oncoming traffic going straight or turning right.",
            "Uncontrolled intersections — no signs, no lights, common in Texas neighborhoods — run on the same 'yield to the right' rule, but with a catch: nobody has a stop sign, so nobody is obviously 'first.' Slow to where you could stop, make eye contact, and yield to the car on your right. Treat every uncontrolled intersection as if the other driver doesn't see you, because half the time they don't.",
            "T-intersections are simpler than they look: traffic on the road that ends (the stem of the T) yields to traffic on the through road (the top of the T). If you're coming up the stem to a road with no stop sign for the cross traffic, you wait for a gap. The through road has the right of way even without a sign, because the geometry makes it the dominant road.",
            "The unprotected left turn is the most dangerous legal maneuver you'll do every single day. Green light, no green arrow, you're turning left across oncoming traffic. You do NOT have the right of way — oncoming traffic going straight does. You pull into the intersection, wait for a real gap (not a 'maybe'), and complete the turn. If the light turns yellow, you finish your turn — you're already legally in the intersection. Most left-turn crashes happen because the turning driver accepted a gap that wasn't actually there.",
            "Roundabouts are spreading across Texas and they confuse people raised on stop signs. The rule is dead simple: yield to traffic ALREADY in the circle, then enter when there's a gap and keep moving. Don't stop in the circle. Signal right as you exit. The whole design works because everyone yields on entry — the moment someone stops inside the circle to 'be polite,' it breaks.",
            "Emergency vehicles override everything. Lights and sirens mean you pull to the right and stop, clearing the intersection if you're in it. You do not have the right of way over an ambulance no matter what your light says. And funeral processions in Texas have the right of way — the lead car obeys signals, but the rest of the procession follows through, and you yield to them.",
            "Pedestrians are the right-of-way category that turns into a homicide charge when you get it wrong. A pedestrian legally in a crosswalk — marked OR unmarked — has the right of way over you, period. The Lisa Torry Smith Act made failing to yield to a pedestrian in a crosswalk a serious criminal offense in Texas when it causes injury or death. 'I had a green light' is not a defense if a person was lawfully crossing.",
            "Pull all of this together with one mental habit: at every intersection, ask 'who is supposed to yield here?' If the answer is 'the other guy,' your job is to confirm they're actually doing it before you commit. Right-of-way is a system for assigning blame after a crash. Defensive driving is the system for not having the crash in the first place. You want both, but if you can only have one at 40 mph, take the second."
          ]
        },
        {
          "id": "4.2",
          "title": "Parallel parking without panic",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 07",
            "meta": [
              "Parallel park",
              "Tight space"
            ],
            "description": "You're trying to parallel park between two cars in a space about 1.5 car lengths long. Where do you start?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Pull alongside the car in front of the empty space, ~2 ft apart."
            },
            {
              "letter": "B",
              "text": "Pull into the space front-first."
            },
            {
              "letter": "C",
              "text": "Start parallel to the curb, then back in."
            }
          ],
          "correct": "A",
          "consequences": {
            "A": {
              "good": true,
              "title": "Classic technique — back in at 45°, then straighten.",
              "body": "Stop with rear bumpers aligned. Reverse, hard right, until you're at 45°. Straighten. Hard left to bring the front in. Pull forward to center. This works in any space about 1.3+ car lengths."
            },
            "B": {
              "good": false,
              "title": "You can't fit.",
              "body": "Front-first into a tight space leaves the back of your car sticking out into the lane. The geometry of cars means parallel parking always works rear-first."
            },
            "C": {
              "good": false,
              "title": "You'll hit the curb.",
              "body": "Starting parallel to the curb and trying to go back in straight line will run you into either the curb or the car behind. The 45° angle is what gives you clearance."
            }
          },
          "rule": {
            "tag": "GEOMETRY",
            "title": "Pivot from the front car's rear bumper.",
            "body": "1) Pull alongside front car, 2 ft gap. 2) Stop with rear bumpers aligned. 3) Reverse, hard right (or hard left in left-side parking). 4) Stop at 45° to the curb. 5) Straighten the wheel, continue reversing until your front bumper clears the front car's rear. 6) Hard left to bring your front in. 7) Pull forward to center."
          },
          "quiz": [
            {
              "q": "Parallel parking always works:",
              "options": [
                "Front-first",
                "Rear-first (back in)",
                "Either way, doesn't matter",
                "Only with a backup camera"
              ],
              "correct": 1,
              "why": "The car pivots around its rear wheels, so backing in tucks the rear corner first. Front-first leaves the back end stuck out in the lane."
            },
            {
              "q": "Before reversing into a parallel space, you align your car's:",
              "options": [
                "Front bumpers",
                "Rear bumpers",
                "Side mirrors",
                "Headlights"
              ],
              "correct": 1,
              "why": "Lining your rear bumper up with the front car's rear bumper sets the correct pivot point."
            },
            {
              "q": "The angle you want to reach before straightening the wheel is about:",
              "options": [
                "10-20°",
                "30-45°",
                "60-80°",
                "Straight back, 0°"
              ],
              "correct": 1,
              "why": "About 45° gives the geometry to clear the front car's rear bumper as you continue backing in."
            },
            {
              "q": "The reason parallel parking can't be done front-first is that:",
              "options": [
                "It's illegal in Texas",
                "The car pivots around its rear wheels, so the rear must enter first",
                "Front-wheel-drive cars can't reverse well",
                "Mirrors only work in reverse"
              ],
              "correct": 1,
              "why": "Steering pivots the car around its rear axle. Backing in lets the rear corner tuck in first along a tightening arc."
            },
            {
              "q": "On the Texas DPS road test, when parallel parking you should:",
              "options": [
                "Rely only on the backup camera",
                "Use mirrors and camera but also physically turn and check blind spots",
                "Never use the camera",
                "Park front-first to save time"
              ],
              "correct": 1,
              "why": "Examiners want to see real blind-spot head checks. Cameras flatten depth and hide curb height, so they're an aid, not a replacement."
            },
            {
              "q": "A space about 1.5 car lengths long is:",
              "options": [
                "Too small to ever fit",
                "Workable with the standard back-in technique (works at ~1.3+ lengths)",
                "Only doable front-first",
                "Requires you to bump the other cars"
              ],
              "correct": 1,
              "why": "The standard pivot-and-straighten technique fits any space roughly 1.3 car lengths or longer."
            }
          ],
          "body": [
            "Parallel parking feels like a personality test, but it's pure geometry, and geometry doesn't care how nervous you are. The reason it works rear-first and never front-first is the same reason a key only turns one way: your car pivots around its rear wheels, which barely change position while the front end swings wide. Backing in lets you tuck the rear corner into the space first and then bring the long front end in along a tightening arc. Going front-first leaves your back end hanging out in the lane with no way to pull it in.",
            "The whole maneuver is a fixed sequence of reference points, not a feel you have to develop. You line up alongside the car ahead of the empty space, about two feet off it, with your rear bumpers roughly even. That alignment sets the pivot. From there it's reverse with hard right lock until you're at about 45 degrees, straighten the wheel to slide back, then hard left to swing the front in. Same numbers every time, which is why a checklist beats nerve.",
            "One Texas-specific note before you decide: the DPS road test still includes parallel parking in many regions, and you're allowed to use your mirrors and back-up camera, but examiners want to see you physically turn your head and check your blind spots, not just stare at a screen. Cameras flatten depth and hide the curb height. Now look at the setup below and choose where to start."
          ]
        },
        {
          "id": "4.3",
          "title": "U-turns, three-points, and reversing",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Turning the car around and backing it up are where new Texas drivers rack up the most parking-lot dents and the most DPS test failures — not because the moves are hard, but because they all happen slowly, at sharp angles, with your sight lines blocked. The three maneuvers in this chapter — U-turns, three-point turns, and reversing — share one rule above all others: speed is your enemy here, and your eyes do the work your mirrors can't.",
            "Start with the U-turn, because the first thing to get right is whether it's even legal. In Texas a U-turn is legal by default — there's no statewide ban — but you may not make one where a posted sign forbids it, and Transportation Code §545.101 requires that you can complete the turn safely without interfering with other traffic. The practical test is simple: if you'd have to back up to finish the turn, the road was too narrow and you should have made a three-point turn instead.",
            "There are also places a U-turn is specifically off the table even without a sign. You can't make one where your view is obstructed — near the crest of a hill or a curve where oncoming drivers can't see you in time. And §545.102 bans turning across a divided highway's median except at an opening intended for it. When in doubt on a narrow Texas farm-to-market road with limited sight distance, treat the U-turn as a bad idea and use a three-point turn.",
            "The three-point turn, sometimes called a K-turn, is your legal substitute when the road is too narrow to swing a U-turn in one arc. It's three distinct movements. First, signal right and pull close to the right curb, then turn hard left and pull forward across the road until your front wheels are near the far curb. Stop.",
            "Second movement: shift to reverse, turn the wheel hard right, and back up across the road toward the curb you started from, until you have room to clear forward in the new direction. Stop again. Third movement: shift back to drive, straighten the wheel, and pull forward in the direction you now want to go. Forward-left, reverse-right, forward-straight — that's the whole pattern, and you only do it when traffic is clear in both directions.",
            "Reversing is its own skill and it kills more than fender-bumpers — backover crashes injure thousands of small children every year, almost always in driveways and parking lots. The single biggest fix is to turn around and look. Put your right arm over the passenger seat, turn your head, and look directly out the rear window. That direct view sees things a mirror or a camera will miss, especially low objects close to the bumper.",
            "Your backup camera is an aid, not a replacement, and Texas examiners know the difference. A camera flattens depth, so it's terrible at judging how close you are to the car behind you, and it has a hard time showing a child or a bike lying just below its field of view. Use it for what it's good at — seeing the curb line and large obstacles — but build the habit of the head-turn first. The day the camera lens is fogged, iced, or muddy, your neck is the only camera you've got.",
            "Finally, slow down. Reverse is the one direction where there is almost never a reason to hurry, and speed makes everything worse: less reaction time, more steering error, more damage if you hit something. Idle speed is plenty. Cover the brake the entire time so your foot is ready, ease off it to creep, and stop the instant anything looks wrong. Slow reversing turns a potential crash into a harmless pause."
          ],
          "keyPoints": [
            "U-turn is legal in TX by default (§545.101), but illegal where signed, where your view is obstructed, or across a divided median except at an opening (§545.102)",
            "If you'd have to back up to finish a U-turn, the road was too narrow — use a three-point turn",
            "Three-point turn: forward-left → reverse-right → forward-straight, only when both directions are clear",
            "When reversing, turn your head and look out the rear window — the camera is an aid only",
            "Backover crashes injure thousands of kids a year; the direct head-turn sees what cameras miss",
            "Reverse at idle speed with the brake covered — there's never a reason to hurry backward"
          ],
          "quiz": [
            {
              "q": "A U-turn in Texas is:",
              "options": [
                "Always illegal",
                "Legal by default unless a sign prohibits it, your view is obstructed, or you'd cross a divided median improperly",
                "Only legal at intersections with signals",
                "Legal only on highways"
              ],
              "correct": 1,
              "why": "TX has no statewide U-turn ban (§545.101), but they're illegal where signed, where your view is obstructed, or across a divided median except at an opening (§545.102)."
            },
            {
              "q": "If you'd have to back up to finish a U-turn, it means:",
              "options": [
                "You're doing it correctly",
                "The road was too narrow — you should have made a three-point turn",
                "You should speed up",
                "You should turn the wheel less"
              ],
              "correct": 1,
              "why": "Needing to reverse to complete the turn means the road couldn't fit a single-arc U-turn. A three-point turn is the right tool."
            },
            {
              "q": "A U-turn is specifically prohibited:",
              "options": [
                "On any road wider than two lanes",
                "Near a hill crest or curve where your view is obstructed",
                "Whenever it's daytime",
                "Only in downtown areas"
              ],
              "correct": 1,
              "why": "You may not make a U-turn where oncoming drivers can't see you in time, such as near a hill crest or curve with limited sight distance."
            },
            {
              "q": "A three-point turn consists of how many movements?",
              "options": [
                "Two",
                "Three",
                "Four",
                "Five"
              ],
              "correct": 1,
              "why": "Three movements: forward-left, reverse-right, then forward-straight in the new direction."
            },
            {
              "q": "The correct sequence of a three-point turn is:",
              "options": [
                "Reverse-right, forward-left, reverse-straight",
                "Forward-left, reverse-right, forward-straight",
                "Forward-right, reverse-left, forward-straight",
                "Reverse-left, forward-right, reverse-straight"
              ],
              "correct": 1,
              "why": "Pull forward turning hard left, back up turning hard right, then pull forward straight in the new direction."
            },
            {
              "q": "When reversing, the most important thing to do is:",
              "options": [
                "Rely only on the backup camera",
                "Turn your head and look directly out the rear window",
                "Watch the side mirrors only",
                "Reverse quickly to minimize the time exposed"
              ],
              "correct": 1,
              "why": "A direct head-turn sees low or close objects that mirrors and cameras miss, which is critical for preventing backover crashes."
            },
            {
              "q": "A backup camera is best described as:",
              "options": [
                "A full replacement for checking over your shoulder",
                "An aid that's good for the curb line and large objects but flattens depth and has a low blind zone",
                "Required by Texas law on all vehicles",
                "Only useful at night"
              ],
              "correct": 1,
              "why": "Cameras flatten depth and miss low/close objects like children. Use them as a secondary aid, not a substitute for the head-turn."
            },
            {
              "q": "The right speed for reversing is:",
              "options": [
                "As fast as is safe to save time",
                "Idle speed, with the brake covered, ready to stop instantly",
                "Whatever the car in the next spot is doing",
                "Fast enough that you don't roll backward downhill"
              ],
              "correct": 1,
              "why": "There's almost never a reason to hurry in reverse. Idle speed with the brake covered turns a potential crash into a harmless pause."
            }
          ],
          "worked": {
            "setup": "You're on a narrow two-lane farm-to-market road north of Waco and you've missed your turn. The road is about 22 feet wide, there's a slight hill crest about 300 feet behind you, and you need to head back the other way. There's no traffic right now.",
            "walkthrough": "Wrong way: you crank a U-turn right here. The road's too narrow to swing it in one arc, so you end up stopped at a sharp angle, blocking both lanes, and have to shift to reverse to finish — and now a car comes over that hill crest at 60 mph and can't see you until it's almost on top of you. That's exactly the obstructed-view, can't-complete-it U-turn that §545.101 is written to prevent. Right way: you recognize the road is too narrow and your sight distance behind you is bad, so you do a three-point turn instead. Signal right, pull to the right edge, hard left forward across to the far edge, stop. Reverse with hard right back toward your starting edge, watching out the rear window the whole time, stop. Then drive forward straight in the new direction. Each movement is short, you're never stuck blocking the road for long, and you've turned around legally and safely. Same goal, same road — the three-point turn just respected the geometry the U-turn ignored."
          },
          "miniScenario": {
            "prompt": "You're backing out of a parking spot at a busy H-E-B lot. Your car has a backup camera. What's the right way to do it?",
            "options": [
              "Watch the camera screen the whole time — that's what it's for.",
              "Turn your head and look out the rear window as the primary check, using the camera as a secondary aid, and creep out slowly with the brake covered.",
              "Back out quickly before another car takes the lane behind you."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Camera-only is how backover crashes happen. The camera flattens depth and has a blind zone right below the bumper — exactly where a small child or a shopping cart can be. It can't replace your eyes."
              },
              "1": {
                "good": true,
                "body": "Head-turn as the primary view, camera as a backup, idle speed, brake covered. That's the habit Texas DPS examiners look for and the one that actually prevents backovers."
              },
              "2": {
                "good": false,
                "body": "Speed in reverse is never the answer. Backing fast in a crowded lot gives you almost no time to react to a pedestrian, a cart, or a car cutting behind you — and far more damage if you hit something."
              }
            }
          }
        },
        {
          "id": "4.4",
          "title": "Freeway entry, exit, and lane discipline",
          "minutes": 15,
          "type": "reading",
          "body": [
            "The acceleration lane on a Texas freeway entrance ramp is not a \"merge slowly and hope\" lane — it's a runway. Your job between the ramp and the freeway is to match the speed of traffic in the right lane, which on most TX freeways means getting yourself to 65–75 mph before the dashed line ends. Drivers who merge at 45 force everyone behind them to brake on a 70-mph road, which is how chain-reaction rear-end crashes start. Use the full length of the acceleration lane: signal, scan the gap you want, accelerate, and slide in. The pattern is signal-then-look-then-go, not look-then-signal-then-pray.",
            "Gap selection matters more than nerve. You want a gap roughly four car lengths long at freeway speed; smaller than that and you're cutting someone off, larger than that and you're probably waiting too long and running out of ramp. Once you're on the freeway, the right lane is the slowest lane by Texas convention and by Transportation Code §545.351, which sets prima facie limits but also requires you to drive at a speed \"reasonable and prudent under the circumstances.\" Cruising in the left lane below the flow of traffic is both rude and, on most TX freeways, illegal under §545.051(b) (the keep-right-except-to-pass rule). Use the left lane to pass, then come back.",
            "Exits are where teen drivers crash most. The fix is simple: pick your exit lane a half-mile out, not 200 feet out. If you find yourself two lanes from the exit with the gore point coming up, take the next exit instead — weaving across three lanes at 65 mph to make an off-ramp is how single-vehicle rollovers happen. At lane closures (the orange-cone funnel), use the zipper merge: stay in your lane until the merge point, then alternate one-for-one with the lane next to you. Merging a mile early doesn't help anyone; it just makes the open lane shorter. Texans treat zipper merging as rude, which is wrong — TxDOT explicitly endorses it."
          ],
          "keyPoints": [
            "Acceleration lane = match freeway speed before the dashed line ends",
            "Right lane is the slow lane; left lane is for passing (§545.051(b))",
            "§545.351 sets prima facie limits but requires \"reasonable and prudent\" speed",
            "Pick your exit lane half a mile out — no weaving across three lanes",
            "Zipper merge at closures: stay in your lane until the merge point, then alternate"
          ],
          "quiz": [
            {
              "q": "You're on a freeway acceleration lane and traffic in the right lane is moving 70 mph. What speed should you be at when you merge?",
              "options": [
                "Around 45 mph — slow is safe.",
                "Around 55 mph — splitting the difference.",
                "Around 70 mph — match the flow.",
                "Whatever speed you happen to be at when the lane ends."
              ],
              "correct": 2,
              "why": "Merging at freeway speed is the rule. Merging slow forces 70-mph traffic to brake for you, which is how chain-reaction crashes start. The acceleration lane exists to let you reach traffic speed."
            },
            {
              "q": "Per TX Transp. Code §545.351, the posted speed limit is:",
              "options": [
                "An absolute ceiling — driving any slower is always legal.",
                "A prima facie limit; you must still drive at a \"reasonable and prudent\" speed for the conditions.",
                "A suggestion that becomes enforceable only at 10 mph over.",
                "Irrelevant on rural roads."
              ],
              "correct": 1,
              "why": "§545.351 sets prima facie limits but requires speeds that are reasonable and prudent under conditions. In fog, rain, or heavy traffic, the posted limit can be too fast — and you can be cited for driving at the limit if conditions warranted slower."
            },
            {
              "q": "You're approaching a lane closure on I-35 and the right lane ends in half a mile. The correct behavior is:",
              "options": [
                "Merge left immediately so you're not \"that guy\" at the cones.",
                "Stay in the right lane until the merge point, then zipper one-for-one with the left lane.",
                "Straddle both lanes to block people from passing you.",
                "Speed up to get past everyone before the closure."
              ],
              "correct": 1,
              "why": "TxDOT explicitly endorses the zipper merge: use both lanes to the merge point, then alternate. It shortens the backup and uses the road's full capacity. Merging a mile early just makes the open lane shorter for everyone."
            }
          ]
        },
        {
          "id": "4.5",
          "title": "Module 4 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "4-way stop tie-breaker:",
              "options": [
                "Bigger car wins",
                "Yield to the right",
                "Whoever signals first"
              ],
              "correct": 1
            },
            {
              "q": "Pedestrian in an unmarked crosswalk has:",
              "options": [
                "No right",
                "Right of way",
                "Right only at signaled crosswalks"
              ],
              "correct": 1
            },
            {
              "q": "Parallel parking is always done:",
              "options": [
                "Front-first",
                "Rear-first",
                "Doesn't matter"
              ],
              "correct": 1
            },
            {
              "q": "In parallel parking you align:",
              "options": [
                "Front bumpers",
                "Rear bumpers",
                "Side mirrors"
              ],
              "correct": 1
            },
            {
              "q": "Three-point turn movements:",
              "options": [
                "Two",
                "Three",
                "Five"
              ],
              "correct": 1
            },
            {
              "q": "Default U-turn rule in TX:",
              "options": [
                "Always illegal",
                "Legal unless prohibited",
                "Only at intersections"
              ],
              "correct": 1
            },
            {
              "q": "Backup cameras:",
              "options": [
                "Replace the head check",
                "Are an aid, not a replacement",
                "Are required by TX law"
              ],
              "correct": 1
            },
            {
              "q": "Best reversing speed:",
              "options": [
                "As fast as you can",
                "Slowly with brake covered",
                "Whatever feels normal"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M5",
      "num": 5,
      "title": "Sharing the Roadway",
      "blurb": "Pedestrians, cyclists, motorcycles, school buses, emergency vehicles, large trucks.",
      "chapters": [
        {
          "id": "5.1",
          "title": "Cyclists, motorcycles, and the \"looked but didn't see\" effect",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 08",
            "meta": [
              "Left turn",
              "Day"
            ],
            "description": "You're waiting to turn left at an intersection. You look, see no cars, and start the turn. A motorcycle hits your driver's side."
          },
          "options": [
            {
              "letter": "A",
              "text": "It was the motorcyclist's fault — they should have braked."
            },
            {
              "letter": "B",
              "text": "You looked but didn't see — your brain filtered the small visual signature."
            },
            {
              "letter": "C",
              "text": "It was unavoidable."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Common defense, wrong answer.",
              "body": "Motorcycles are visible. The \"looked but didn't see\" effect (LBDS) is a known cognitive failure: your brain expects car-sized visual signatures and filters out smaller ones. The fault is on the turning driver in nearly all cases."
            },
            "B": {
              "good": true,
              "title": "You understand the bias.",
              "body": "LBDS is a documented cognitive failure. The fix: explicitly look for two-wheelers as a separate scan, not part of \"looking for cars.\""
            },
            "C": {
              "good": false,
              "title": "It was avoidable.",
              "body": "A two-second extra scan dedicated to two-wheelers prevents most of these crashes."
            }
          },
          "rule": {
            "tag": "NHTSA",
            "title": "Looked but didn't see.",
            "body": "When you scan for traffic, your brain pattern-matches \"car shape.\" A motorcycle, bicycle, or pedestrian has a smaller signature and can be filtered out. Counter-act this by explicitly thinking \"any two-wheelers? any pedestrians?\" as a second scan.",
            "stat": {
              "num": "~40%",
              "body": "of motorcycle-vs-car crashes are left-turning cars in front of an oncoming bike. The driver almost always says \"I never saw them.\""
            }
          },
          "quiz": [
            {
              "q": "\"Looked but didn't see\" describes:",
              "options": [
                "A driver lying about looking",
                "A real cognitive failure where your brain filters small visual signatures",
                "A mechanical mirror problem"
              ],
              "correct": 1,
              "why": "LBDS is a documented perception bias. Your brain pattern-matches car shapes and filters non-car traffic out before you're even aware of it."
            },
            {
              "q": "The fix for LBDS is:",
              "options": [
                "Better mirrors",
                "Explicitly scan a second time for two-wheelers and pedestrians",
                "Drive only during the day"
              ],
              "correct": 1,
              "why": "Naming the target — 'any bikes? any pedestrians?' — re-engages your perception of small traffic that the first scan filtered out."
            },
            {
              "q": "Most motorcycle-vs-car crashes involve:",
              "options": [
                "Speeding bikes",
                "Cars turning left in front of an oncoming bike",
                "Bad weather"
              ],
              "correct": 1,
              "why": "Around 40% of fatal motorcycle crashes are a car turning left across the path of an oncoming bike."
            },
            {
              "q": "A motorcycle is hard to judge for speed and distance mainly because:",
              "options": [
                "It's narrow, so your eyes get fewer width cues as it approaches",
                "It's always going faster than traffic",
                "Its headlight is too bright"
              ],
              "correct": 0,
              "why": "A narrow object doesn't visibly 'grow' the way a car does, so your brain underestimates how fast it's closing."
            },
            {
              "q": "Under Texas Transportation Code §545.060(d), a motorcycle is:",
              "options": [
                "Required to ride on the shoulder",
                "Entitled to the full use of a traffic lane",
                "Limited to half a lane so cars can share it"
              ],
              "correct": 1,
              "why": "A motorcyclist has the legal right to the entire lane. You can't crowd or share a lane with one."
            },
            {
              "q": "Texas's statewide rule on giving cyclists a set passing distance is:",
              "options": [
                "A strict three-foot law statewide",
                "No statewide set-distance law — only some city ordinances — but you must still pass safely",
                "There is no rule at all about passing cyclists"
              ],
              "correct": 1,
              "why": "The statewide safe-passing bill was vetoed in 2009; only local ordinances set a fixed distance, but you're still required to pass at a safe distance and are liable if you don't."
            }
          ],
          "body": [
            "Here is the crash that catches more new drivers than almost any other, and it never feels like your fault while it's happening. You pull up to turn left. You look at the oncoming lane. You see no cars. You go. And a motorcycle you swear was not there a second ago slams into your driver's door. You weren't lying when you said you looked. You did look. Your brain just didn't register what your eyes saw.",
            "This is called the \"looked but didn't see\" effect, and it's not carelessness — it's how human perception actually works. When you scan for traffic, your brain isn't recording a video. It's pattern-matching against what it expects to find, and on a road it expects car-shaped blobs. A motorcycle, a bicycle, or a person on foot has a smaller, thinner visual signature. When your brain is busy hunting for cars, that small signature gets filtered out before it ever reaches your conscious attention. You looked right at the bike and your brain quietly deleted it.",
            "The reason this matters so much for you specifically: motorcycles and bikes don't get the benefit of the doubt your brain gives to big objects. A two-wheeler is also harder to judge for speed and distance because it's narrow — there's no width changing as it gets closer to give your eyes a clear cue. So a bike that's actually coming fast can look slow and far away, and you pull out in front of it. The fix isn't \"look harder.\" You already looked. The fix is to add a second, separate scan where you consciously think \"any two-wheelers? any pedestrians?\" — naming the thing forces your brain to actually search for it. That's the decision the scenario below is testing.",
            "Texas law is also blunter than people expect here. A motorcycle is entitled to the full use of a traffic lane under §545.060(d) — you cannot squeeze past one in the same lane or treat it as half a vehicle. And while Texas does NOT have a statewide three-foot passing law for bicycles (a safe-passing bill was famously vetoed in 2009, so the only such rules are city ordinances in places like Austin and San Antonio), you are still required to pass a cyclist at a safe distance and you remain liable when you don't. Treat every two-wheeler as a full road user with a name and a family, because legally and morally, that's exactly what they are."
          ]
        },
        {
          "id": "5.2",
          "title": "Sharing with 18-wheelers — blind spots & no-zones",
          "minutes": 50,
          "type": "reading",
          "body": [
            "Stand next to a loaded 18-wheeler sometime and look up at the driver's window — it's roughly at the height of your car's roof. From up there, a whole Honda Civic can vanish. A fully loaded tractor-trailer weighs up to 80,000 pounds, around 20 to 30 times what your car weighs, and that single fact changes every rule about how you share the road with one. You are not driving near another car. You're driving near a building that moves at 70 mph and can't see you. Once you accept that, the rest of this chapter is just common sense applied to something enormous.",
            "Trucks have four blind spots the FMCSA officially calls \"No-Zones,\" and every one of them is bigger than anything on your car. Directly in front of the cab there's a No-Zone about 20 feet deep — that's because the driver sits high up behind a long hood, so a car tucked right in front simply drops below their line of sight. Cut in too close and you disappear under the hood, which is exactly why you should never merge in front of a truck unless you can see its whole grille in your mirror. FMCSA data says roughly a third of all crashes between big trucks and cars start in one of these blind spots, so this isn't theory — it's where the wrecks actually happen.",
            "The rear No-Zone is the one people underestimate most. Directly behind the trailer the blind spot runs up to 200 feet, because a tractor-trailer has no rearview mirror at all — the trailer is a solid wall. When you tailgate a truck, two bad things stack up at once: the driver has no idea you're there, and you've blinded yourself, because you can't see a single thing happening on the road ahead through that wall of steel. If the truck has to brake hard for something you can't see, you have no warning and nowhere to go.",
            "The side No-Zones are the ones that get cars killed in ordinary, everyday traffic. The right side is the worst by far: the blind spot there is about two lanes wide and runs the entire length of the trailer, so a car cruising in the right lane next to a truck can be completely invisible. The left side is a little smaller because the driver sits on the left, but it still swallows most of a lane behind the cab. Here's the single rule that ties all four No-Zones together, and the one worth tattooing on your brain: if you can't see the truck driver's face in their side mirror, they cannot see you. No exceptions, no 'but I'm sure they noticed me.'",
            "That mirror rule also tells you exactly how to pass. Pass on the LEFT, where the blind spot is smaller, and pass decisively — get through the No-Zone and back into the driver's view, don't camp alongside the trailer dawdling at the same speed. Lingering at a truck's side is one of the most dangerous places on the entire highway, because if that truck needs to change lanes for a stalled car, or gets shoved by a crosswind, it moves into a space it has no idea you're occupying. Decide to pass, then actually pass.",
            "Right turns are their own special trap, and new drivers fall into it constantly. A big rig physically can't make a tight right turn — the trailer would climb the curb or clip whatever's on the corner — so the driver first swings WIDE to the left, then carves back to the right. To you, that looks like the truck is moving left, maybe even signaling to change lanes, and the gap that opens on the right side looks like an invitation. It is a trap. If you slip up the right side to squeeze past, that gap is closing, and it closes with 80,000 pounds. When you see a truck drift left at an intersection, stay back and let the turn finish.",
            "Now the physics that makes all of this non-negotiable: stopping distance. A loaded 18-wheeler traveling 60 mph needs roughly 525 feet to stop on dry pavement — close to the length of two football fields end to end, and nearly double what your car needs from the same speed. That distance comes from the sheer mass the brakes have to fight, plus a real lag in the air-brake system between the moment the driver presses the pedal and the moment the brakes actually grab. In rain it stretches even further. The truck physically cannot stop the way you can, no matter how skilled the driver is.",
            "Which is exactly why cutting in front of a truck and braking is one of the deadliest moves a new driver makes. When you dive into the gap a trucker left open in front of them and then tap your brakes — for an exit, for a slowdown, for anything — you've handed the truck a problem it cannot solve in the space available. That gap was not wasted road or the trucker being slow. The driver built it on purpose as a stopping cushion, the same way you should be building one. Steal it and you've removed the one thing standing between a normal commute and your car under a trailer.",
            "There's also wind and spray to respect, and they catch people off guard the first time. A passing truck pushes a pressure wave ahead of it and, at speed, drags a wake of turbulent air behind it that can tug a small car sideways — when you pass or get passed by a big rig, grip the wheel a little firmer and expect the nudge so it doesn't startle you into oversteering. In heavy rain, the wall of spray thrown off a truck's tires can blind you completely for a second or two. Plan any pass so you spend the least possible time in that water, and never start a pass you're not sure you can finish.",
            "Tie all of it together with following distance, because distance is what buys you time to use everything above. Behind a truck, the standard three-second rule isn't enough — give yourself at least four seconds, both so you stay clear of that 200-foot rear No-Zone and so you can see past the trailer to read the traffic ahead of it. You cannot see through a truck, so the only way to know what's coming — brake lights, debris, a stopped lane — is to leave enough room to see around its edges and react in time.",
            "The mindset that keeps you safe around trucks is the same one that keeps truckers safe around you: assume the other vehicle can't see you and can't stop fast, and give it room. A trucker hauling 40 tons is, more than almost anyone on the road, hoping you understand their blind spots and their stopping distance — their livelihood and their conscience both ride on not hurting anyone. Meet them halfway with space, patience, and clean decisive passes, and the most intimidating vehicle on the highway turns into one of the most predictable things out there."
          ],
          "keyPoints": [
            "A loaded 18-wheeler weighs up to 80,000 lbs — 20-30x your car",
            "Four No-Zones: ~20 ft front, up to 200 ft rear, ~2 lanes on the right, less on the left",
            "If you can't see the driver in their side mirror, they can't see you",
            "Pass on the left and pass decisively — never linger alongside a trailer",
            "Trucks swing wide LEFT before a right turn — never squeeze up the right",
            "Stopping distance at 60 mph ≈ 525 ft (~2x your car); never cut in and brake"
          ],
          "quiz": [
            {
              "q": "A truck's largest blind spot is on the:",
              "options": [
                "Left side",
                "Right side",
                "Top"
              ],
              "correct": 1,
              "why": "The right-side No-Zone is about two lanes wide and runs the full length of the trailer. Avoid lingering there."
            },
            {
              "q": "How can you tell a trucker can see you?",
              "options": [
                "They wave",
                "You can see them in their side mirror",
                "They use their turn signal"
              ],
              "correct": 1,
              "why": "Visibility is mutual. If you can see the driver's face in their mirror, they can see you — if you can't, they can't."
            },
            {
              "q": "A loaded 18-wheeler at 60 mph stops in approximately:",
              "options": [
                "200 feet",
                "400 feet",
                "525 feet"
              ],
              "correct": 2,
              "why": "About 525 feet on dry pavement — nearly twice a passenger car. Don't cut in front and brake."
            },
            {
              "q": "A fully loaded tractor-trailer can weigh up to:",
              "options": [
                "20,000 lbs",
                "50,000 lbs",
                "80,000 lbs"
              ],
              "correct": 2,
              "why": "Up to 80,000 pounds — roughly 20 to 30 times the weight of your car, which is why it can't stop or maneuver like one."
            },
            {
              "q": "When you pass a truck, you should:",
              "options": [
                "Pass on the right and stay alongside to be safe",
                "Pass on the left and get through decisively",
                "Pass slowly so the trucker has time to react"
              ],
              "correct": 1,
              "why": "Pass on the left (smaller blind spot) and don't camp beside the trailer — clear the No-Zone and get back into view."
            },
            {
              "q": "A big rig approaches a right turn and swings WIDE to the left first. You should:",
              "options": [
                "Squeeze up the right side to get past before it turns",
                "Stay back and let the turn finish — never slip up the right",
                "Honk so it turns faster"
              ],
              "correct": 1,
              "why": "Trucks must swing left to make a right turn without the trailer jumping the curb. The right-side gap is closing — stay out of it."
            },
            {
              "q": "The single rule that covers all four truck blind spots is:",
              "options": [
                "Always pass on the right",
                "If you can't see the driver in their side mirror, they can't see you",
                "Trucks can always see directly behind them"
              ],
              "correct": 1,
              "why": "Mutual visibility is the master rule — it tells you when you're hidden in any of the four No-Zones."
            },
            {
              "q": "A safe following distance behind a large truck is at least:",
              "options": [
                "One second",
                "Two seconds",
                "Four seconds"
              ],
              "correct": 2,
              "why": "At least four seconds — enough to stay out of the rear No-Zone and to see around the trailer to read traffic ahead."
            }
          ],
          "worked": {
            "setup": "You're on I-35 near Austin doing 65 in the right lane. A loaded 18-wheeler is also in the right lane just ahead of you, and you want to get past it to reach your exit. The left lane is open.",
            "walkthrough": "Wrong way: you ease into the left lane and ride right alongside the trailer for a quarter mile, half in the driver's left blind spot, while you build up nerve to fully pass. If the truck drifts left or a gust shoves it, it moves into a space it can't see you in — and you've got 80,000 pounds coming into your door. Right way: you check the left lane is clear, signal, and pass on the LEFT with purpose — accelerate steadily, spend as little time beside the trailer as possible, and don't pull back into the right lane until you can see the whole front of the truck in your rearview mirror (that's your proof you're clear of the front No-Zone). Then settle in with at least a four-second cushion ahead of the truck if you end up in front of it. Same maneuver, but you treated the truck's blind spots as real and never parked yourself in one."
          },
          "miniScenario": {
            "prompt": "You're behind a slow-moving 18-wheeler in the right lane. You're impatient and the gap the truck left in front of itself looks inviting. You move into the left lane, pass, and now you want back in the right lane for your exit coming up. What do you do?",
            "options": [
              "Cut into the gap right in front of the truck's cab and tap your brakes for the exit.",
              "Wait until you can see the entire front of the truck in your rearview mirror, then move over, leaving the truck's following gap intact.",
              "Stay alongside the trailer until the very last second, then dart across two lanes to the exit."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "You just dropped into the truck's 20-foot front No-Zone and stole the stopping cushion it built on purpose. When you brake, the truck — which needs ~525 ft to stop — has no room. This is the classic cut-in-and-brake fatal."
              },
              "1": {
                "good": true,
                "body": "Seeing the whole front of the truck in your mirror is your proof you've cleared the front blind spot. Move over smoothly and leave its gap alone — that space is the truck's life insurance and yours."
              },
              "2": {
                "good": false,
                "body": "Lingering beside the trailer parks you in the side No-Zone, and a last-second dart across two lanes is exactly how blind-spot and lane-change crashes happen. Plan the pass; don't improvise it."
              }
            }
          }
        },
        {
          "id": "5.3",
          "title": "Emergency vehicles & TX Move Over law",
          "minutes": 45,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 09",
            "meta": [
              "65 mph",
              "Highway"
            ],
            "description": "You're in the right lane on a TX highway. Ahead on the shoulder: a TxDOT truck with flashing yellow lights. Speed limit 65. What's the law?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Maintain speed — the truck is on the shoulder, not your lane."
            },
            {
              "letter": "B",
              "text": "Move over one lane OR slow to 45 mph (limit minus 20)."
            },
            {
              "letter": "C",
              "text": "Stop until the truck moves."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "TX Move Over violation.",
              "body": "TX Transportation Code §545.157: when ANY vehicle with flashing lights is on the shoulder — police, fire, EMS, tow, or TxDOT — you must either change lanes OR slow to 20 mph below the posted limit. $500 first-offense fine."
            },
            "B": {
              "good": true,
              "title": "Compliant.",
              "body": "Either action works. If the left lane is clear, move over. If you can't safely change lanes, slow to limit-minus-20."
            },
            "C": {
              "good": false,
              "title": "Stopping creates a different problem.",
              "body": "Don't stop on a highway with cars behind you. Slow or move — never stop unless directly directed."
            }
          },
          "rule": {
            "tag": "TX TRANSP. CODE §545.157",
            "title": "Move over or slow to limit-minus-20.",
            "body": "Applies to police, fire, EMS, tow trucks, and TxDOT vehicles with activated flashing lights — even if they're fully on the shoulder. Up to $500 fine. Up to $2000 + jail if you cause an injury.",
            "stat": {
              "num": "~$500",
              "body": "first-offense fine. Higher if you injure someone. The law was written after dozens of TX troopers were killed on roadside stops."
            }
          },
          "quiz": [
            {
              "q": "TX Move Over law: when an emergency vehicle has flashing lights on the shoulder, you must:",
              "options": [
                "Maintain speed",
                "Move over a lane OR slow to limit-minus-20",
                "Stop"
              ],
              "correct": 1,
              "why": "TX §545.157 gives you a choice: change lanes away from it, or slow to 20 mph below the posted limit."
            },
            {
              "q": "TX Move Over applies to:",
              "options": [
                "Police only",
                "Police + fire + EMS",
                "Police + fire + EMS + tow + TxDOT"
              ],
              "correct": 2,
              "why": "All five categories trigger the law whenever their flashing lights are activated, even fully on the shoulder."
            },
            {
              "q": "First-offense fine for violating TX Move Over:",
              "options": [
                "$50",
                "$200",
                "Up to $500"
              ],
              "correct": 2,
              "why": "Up to $500 for a first offense, with steeper penalties if injury results."
            },
            {
              "q": "On a posted 65 mph highway, if you can't safely change lanes, you must slow to:",
              "options": [
                "55 mph",
                "45 mph",
                "Stop completely"
              ],
              "correct": 1,
              "why": "Limit minus 20 = 45 mph. The slow-down option only applies when changing lanes isn't safe."
            },
            {
              "q": "Why was the TX Move Over law written in the first place?",
              "options": [
                "To raise revenue from fines",
                "Because roadside workers and troopers were being struck and killed at highway speed",
                "To slow down all highway traffic"
              ],
              "correct": 1,
              "why": "It was passed after numerous Texas troopers and roadside workers were killed on shoulder stops."
            },
            {
              "q": "If you cause bodily injury while violating Move Over, the penalty:",
              "options": [
                "Stays a $500 fine",
                "Escalates to a misdemeanor with fines up to $2,000 and possible jail",
                "Is only a warning"
              ],
              "correct": 1,
              "why": "Causing injury bumps it to a Class A/B misdemeanor — up to $2,000 and possible jail time."
            }
          ],
          "body": [
            "Picture the person on that shoulder. A trooper leaning into a stopped car's window. A tow operator hooking up a wreck. A TxDOT worker setting out cones. They are standing a few feet from a lane where traffic is moving at 65, 70, sometimes 80 miles an hour, and a car at that speed covers about 100 feet every second. If your mirror clips them, they're gone. That is the entire reason the Move Over law exists, and Texas wrote it after burying dozens of its own troopers killed on roadside stops.",
            "The rule lives in Texas Transportation Code §545.157, and it's simpler than people make it. When you approach a stationary vehicle with its lights flashing on the shoulder — police, fire, EMS, a tow truck, OR a TxDOT vehicle — you owe it ONE of two things. Either you change lanes away from it (the move-over), or, if you genuinely can't change lanes safely, you slow down to 20 mph below the posted limit. On a 65 zone that means dropping to 45. You don't get to pick 'maintain speed because they're not in my lane' — being on the shoulder is exactly the situation the law covers.",
            "The cost of getting this wrong runs two ways. Legally, a first offense is a fine up to $500, and if you cause bodily injury it jumps to a Class A or B misdemeanor with fines up to $2,000 and possible jail time. But the real cost is the worker, because at highway speed there is no second chance — a mirror at 65 mph hits like a baseball bat. The scenario below puts you in the right lane approaching exactly this situation, and your job is to pick the move that the law and the human on the shoulder both need from you."
          ]
        },
        {
          "id": "5.4",
          "title": "School buses & school zones (TX)",
          "minutes": 40,
          "type": "reading",
          "body": [
            "There is no moment on the road where the stakes are higher than a kid stepping off a school bus, and Texas law treats it exactly that way. When a school bus stops and flips on its flashing red lights and swings out that stop arm, it is telling you one thing in the clearest language it has: a child is about to cross, and that child is not looking for you. They're looking at their friends, their phone, the candy in their backpack — anything but traffic. The law that follows is short, strict, and one of the very few traffic laws where the penalty can climb all the way to jail time, so it's worth getting exactly right the first time.",
            "Here's the core rule, and it's blunter than most people assume. On a road WITHOUT a physical divider, traffic in BOTH directions must come to a complete stop when a school bus is loading or unloading with its red lights flashing and the stop arm out. Not slow down, not roll through cautiously — stop, and stay stopped. It doesn't matter that you're in the oncoming lane heading the other way; a six-year-old darting across the road has no concept of which lane is 'yours.' To them it's just a street they have to get across, so everybody on it stops.",
            "The one exception is a divided highway. If there is a real physical barrier or median — a strip of grass, a concrete wall, a genuine separation — between you and the bus, then only the traffic on the BUS's side of the barrier has to stop. The cars on the far side can keep rolling, because the barrier physically blocks a child from wandering into them. Pay attention to the word physical, because this is where people get tickets: a center turn lane, or just a painted double-yellow stripe down the middle of the road, is NOT a divider. Paint does not stop a kid chasing a ball, so paint does not excuse you from stopping.",
            "Once you're stopped, the next question is when you're allowed to go. Stay put until one of these three things happens: the red lights stop flashing, the stop arm folds back against the side of the bus, OR the bus itself starts moving again. Do not creep forward the instant the last kid steps aboard — there may be one more sprinting up the sidewalk that you can't see. The driver controls those lights deliberately and sits up high with a view of the whole scene, including children you have no angle on. When the bus says it's done, it's done; not before.",
            "Now the part almost everyone gets wrong, because an outdated version of the penalty got passed around for years. Passing a stopped school bus with its lights active is a misdemeanor under Texas Transportation Code §545.066, and the fine runs from $500 up to $1,250 for a first offense. A second offense within five years climbs to $1,000–$2,000, and if you injure someone it escalates into a far more serious charge that can carry actual jail time and a license suspension. You'll also hear people tack on 'and points on your license' — ignore that part. Texas abolished its driver-points and surcharge system back in 2019, so there are no points anymore; the fine, the conviction sitting on your record, and your insurance premium jumping are the real, lasting consequences.",
            "Now switch gears to school zones, because the rules there are about two different things: speed and phones. When a school zone's flashing lights or its signs are active — usually a window around the start and end of the school day — the posted school-zone speed limit temporarily replaces the normal limit for that stretch of road. That lower number isn't there to annoy you. It's physics: a child who darts out in front of a car going 20 mph is very often survivable, while the same child in front of a car going 40 mph very often isn't. The school-zone limit is legally binding only while those lights are flashing or a sign tells you the zone is active.",
            "Phones in school zones trip up a huge number of drivers, so get the real rule straight. Under Texas Transportation Code §545.425, you may NOT use a HANDHELD wireless device while driving through an active school crossing zone — no holding the phone to text, dial, scroll, or check a map. But the same statute explicitly ALLOWS hands-free use: voice commands, a Bluetooth connection, a mounted phone running on speaker, push-to-talk. It also lets you use the phone if your vehicle is completely stopped. So the accurate one-liner is 'handheld is illegal, hands-free is fine.' And separately from school zones, texting while driving is banned everywhere in Texas under §545.4251, no matter where you are.",
            "So why single out the handheld phone in a school zone specifically? Because in those few hundred feet, the single thing most likely to kill a child is a driver looking down at a screen instead of out the windshield. A kid on foot is small, low to the ground, fast, and totally unpredictable — they reverse direction, chase things into the street, freeze. The half-second your eyes spend reading a notification is the exact half-second they step off the curb. The phone rule isn't bureaucratic box-checking; it's aimed straight at the one failure mode that turns a school zone into a tragedy.",
            "One more thing worth knowing: school buses themselves give you a warning before the red lights ever come on. Just like a traffic signal goes yellow before red, a bus flashes AMBER (yellow) lights as it's preparing to stop. Amber means 'get ready, I'm about to stop' — start slowing and back off, don't try to beat it. By the time the lights turn red and the stop arm swings out, you should already be stopping, not slamming the brakes in surprise. Reading the amber gives you a comfortable margin instead of a panic stop.",
            "Put the whole chapter into one habit you can actually run on the road. Coming up on a school bus: assume it's about to stop, watch for the amber lights warning that red is next, and be ready to stop in BOTH directions unless there's a real physical barrier between you. Coming up on a school zone: drop to the posted limit the moment the lights start flashing, put the handheld phone down and out of your hands, and drive like a kid could appear from anywhere — because the entire reason these laws exist is that, in these specific places, one frequently does."
          ],
          "keyPoints": [
            "No divider: BOTH directions stop for a bus with red lights + stop arm out",
            "Divided highway with a PHYSICAL barrier: only the bus's side stops (paint doesn't count)",
            "Amber bus lights = 'about to stop' — start slowing before the red lights come on",
            "Stay stopped until lights stop flashing, the arm retracts, OR the bus moves",
            "Passing a stopped bus (§545.066): $500-$1,250 first offense; jail possible if you injure someone (no TX license points since 2019)",
            "School zone phones (§545.425): handheld is illegal, hands-free is allowed; texting is banned everywhere (§545.4251)"
          ],
          "quiz": [
            {
              "q": "A school bus stops with red lights flashing on a 2-lane road. You're in the oncoming lane. You must:",
              "options": [
                "Continue cautiously",
                "Stop",
                "Slow to 20 mph"
              ],
              "correct": 1,
              "why": "On a road with no physical divider, both directions stop completely."
            },
            {
              "q": "Same scenario, divided highway with a physical median between you and the bus. You must:",
              "options": [
                "Stop",
                "Continue",
                "Slow to 20 mph"
              ],
              "correct": 1,
              "why": "A physical barrier exempts the opposing direction — only the bus's side stops."
            },
            {
              "q": "In an active TX school zone, HANDHELD phone use is:",
              "options": [
                "Allowed if you're quick",
                "Illegal — but hands-free is allowed",
                "Always allowed for parents"
              ],
              "correct": 1,
              "why": "TX §545.425 bans handheld device use in an active school zone but explicitly permits hands-free use."
            },
            {
              "q": "A school bus has its red lights on and stop arm out. You can go again when:",
              "options": [
                "The last kid steps on",
                "The lights stop flashing and the arm retracts, or the bus moves",
                "You count to five"
              ],
              "correct": 1,
              "why": "Wait for the bus's own signal — the driver can see children you can't."
            },
            {
              "q": "Which counts as a 'physical divider' that lets oncoming traffic keep going past a stopped bus?",
              "options": [
                "A painted center stripe",
                "A center turn lane",
                "A concrete median or grass barrier"
              ],
              "correct": 2,
              "why": "Only a real physical barrier counts. Paint and turn lanes don't stop a child, so they don't excuse you."
            },
            {
              "q": "First-offense fine for passing a stopped school bus under TX §545.066 is:",
              "options": [
                "$50-$100",
                "$500-$1,250",
                "Just a warning"
              ],
              "correct": 1,
              "why": "A first offense runs $500 to $1,250, climbing higher on repeat offenses or if you injure someone."
            },
            {
              "q": "The 'you'll also get license points' warning for a Texas traffic offense is:",
              "options": [
                "True — points add up fast",
                "Outdated — Texas abolished its driver-points system in 2019",
                "Only true for school-bus violations"
              ],
              "correct": 1,
              "why": "Texas ended its driver-points/surcharge system in 2019; the fine, the record, and your insurance rate are the real consequences."
            },
            {
              "q": "Texting while driving in Texas is:",
              "options": [
                "Only illegal in school zones",
                "Banned statewide under §545.4251, school zone or not",
                "Legal if you're stopped at a light"
              ],
              "correct": 1,
              "why": "§545.4251 bans texting while driving everywhere in Texas — the school-zone phone rule is an additional, stricter layer."
            }
          ],
          "worked": {
            "setup": "You're driving on a two-lane residential street in Dallas — one lane each way, just a painted center stripe down the middle, no median. A school bus coming the OTHER direction stops, flips on its flashing red lights, and extends its stop arm.",
            "walkthrough": "Wrong way: you think 'the bus is going the opposite direction, it's not my problem' and keep rolling past it. But a painted stripe is not a physical divider, so under §545.066 you were legally required to stop — and a child crossing the street has no clue your lane was 'the other direction.' That's a $500-$1,250 misdemeanor, and far worse if a kid steps out. Right way: the instant you see the red lights and stop arm, you stop completely, even though you're oncoming, and you stay stopped until the lights go off and the arm folds in. If that same street had a concrete median between the two directions, only the bus's side would have to stop — but with just paint, everybody stops. The whole difference is whether a physical barrier exists between you and the kids, not which direction you're headed."
          },
          "miniScenario": {
            "prompt": "You're driving through an active school zone (lights flashing) and your phone buzzes with a text from a friend. You're behind the wheel and rolling at the posted 20 mph. What's legal and smart?",
            "options": [
              "Pick up the phone and quickly read and reply — it'll only take a second.",
              "Leave the handheld phone alone; if you must respond, use a hands-free/voice command, or just wait until you're out of the zone.",
              "It's fine because hands-free phones are illegal here anyway, so reading a text is the only option."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Holding the phone to read or reply is illegal handheld use in a school zone under §545.425 — and texting while driving is banned statewide under §545.4251. Worse, the half-second your eyes are down is exactly when a kid steps off the curb."
              },
              "1": {
                "good": true,
                "body": "§545.425 bans HANDHELD use in an active school zone but allows hands-free, and waiting is always safest. Eyes on the windshield is the whole point of the rule."
              },
              "2": {
                "good": false,
                "body": "Backwards — hands-free use IS allowed in a school zone; it's the handheld phone that's illegal. And reading a text by hand is exactly the prohibited (and dangerous) move."
              }
            }
          }
        },
        {
          "id": "5.5",
          "title": "Module 5 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "\"Looked but didn't see\" is:",
              "options": [
                "A lie",
                "A real perception bias",
                "A mirror defect"
              ],
              "correct": 1
            },
            {
              "q": "A truck's largest blind spot is on the:",
              "options": [
                "Left",
                "Right",
                "Front"
              ],
              "correct": 1
            },
            {
              "q": "Loaded 18-wheeler at 60 mph stops in ~:",
              "options": [
                "200 ft",
                "400 ft",
                "525 ft"
              ],
              "correct": 2
            },
            {
              "q": "TX Move Over: shoulder + flashing lights → you must:",
              "options": [
                "Stop",
                "Move over OR slow to limit-20",
                "Maintain speed"
              ],
              "correct": 1
            },
            {
              "q": "TX Move Over applies to:",
              "options": [
                "Police only",
                "Police + fire + EMS only",
                "Police + fire + EMS + tow + TxDOT"
              ],
              "correct": 2
            },
            {
              "q": "School bus stopped on a 2-lane road, you're oncoming. You must:",
              "options": [
                "Stop",
                "Continue",
                "Slow"
              ],
              "correct": 0
            },
            {
              "q": "Same, but divided highway with barrier. You must:",
              "options": [
                "Stop",
                "Continue",
                "Slow"
              ],
              "correct": 1
            },
            {
              "q": "In an active school zone, hands-free phone use:",
              "options": [
                "OK",
                "Still illegal",
                "OK for emergencies"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M6",
      "num": 6,
      "title": "Hazardous Conditions",
      "blurb": "Rain, fog, night, glare, distractions, fatigue — the conditions that quietly cause most crashes.",
      "chapters": [
        {
          "id": "6.1",
          "title": "Rain & hydroplaning physics",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 10",
            "meta": [
              "55 mph",
              "Heavy rain"
            ],
            "description": "Heavy rain. Standing water. Steering wheel suddenly feels light — you're hydroplaning. What now?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Brake hard to slow down."
            },
            {
              "letter": "B",
              "text": "Steer sharply away from the puddle."
            },
            {
              "letter": "C",
              "text": "Ease off the gas, hold the wheel straight, let the tires re-engage."
            }
          ],
          "correct": "C",
          "consequences": {
            "A": {
              "good": false,
              "title": "You spin.",
              "body": "A hard brake on water locks the wheels (if no ABS) or activates ABS unevenly. Either way, you lose directional control."
            },
            "B": {
              "good": false,
              "title": "You spin worse.",
              "body": "A sharp steering input while you have no grip means when grip suddenly returns, the car snaps in that direction. Classic hydroplane → spin → roll."
            },
            "C": {
              "good": true,
              "title": "Tires re-engage. You stay in your lane.",
              "body": "Hydroplaning is a temporary loss of grip from a water film between tire and road. Don't add inputs. Wait for grip. Then resume normal driving."
            }
          },
          "rule": {
            "tag": "WET WEATHER",
            "title": "Don't add inputs.",
            "body": "Hydroplaning starts as low as 35 mph in heavy rain. The fix is patience: ease off the gas, hold the wheel straight, wait 1–2 seconds for the tires to push through the water film. Then resume.",
            "stat": {
              "num": "35 MPH",
              "body": "is the lower bound for hydroplaning in heavy rain. New tires resist longer. Worn tires hydroplane sooner."
            }
          },
          "quiz": [
            {
              "q": "When hydroplaning, the right move is:",
              "options": [
                "Brake hard",
                "Steer sharply",
                "Ease off gas, hold wheel straight"
              ],
              "correct": 2,
              "why": "No inputs. Wait for grip. Adding inputs while gripless = spin when grip returns."
            },
            {
              "q": "Hydroplaning can start at:",
              "options": [
                "65 mph",
                "55 mph",
                "35 mph (in heavy rain)"
              ],
              "correct": 2,
              "why": "As low as 35 mph in heavy rain with worn tires."
            },
            {
              "q": "In rain, your following distance should be:",
              "options": [
                "3 seconds (same as dry)",
                "At least 4-5 seconds",
                "Whatever feels safe"
              ],
              "correct": 1,
              "why": "Add 1+ seconds per bad condition. Rain alone = 4 seconds, rain at night = 5+."
            },
            {
              "q": "Why are the first few minutes of a Texas rainstorm the most slippery?",
              "options": [
                "The pavement is coldest then",
                "Water floats months of built-up oil and rubber into a greasy film",
                "Your tires haven't warmed up yet"
              ],
              "correct": 1,
              "why": "Early rain lifts accumulated oil and rubber off dry asphalt and floats it on top. Grip is at its worst before the rain washes it away."
            },
            {
              "q": "Which factor that affects hydroplaning do you control in real time, behind the wheel?",
              "options": [
                "Tire tread depth",
                "Your speed",
                "How much water is on the road"
              ],
              "correct": 1,
              "why": "Tread is set in the garage and standing water is the road's doing. Speed is the lever you can pull the instant conditions turn bad."
            },
            {
              "q": "Bald, worn tires hydroplane sooner than new tires because:",
              "options": [
                "They are heavier",
                "They have no tread grooves left to channel water away",
                "They run at higher pressure"
              ],
              "correct": 1,
              "why": "Tread grooves are escape routes for water. With them worn off, water has nowhere to go and the tire climbs onto the film at a lower speed."
            }
          ],
          "body": [
            "Hydroplaning sounds exotic, but the physics is dumb-simple: your tire can only grip the road if it can actually touch the road. When there's enough water on the pavement, your tire stops touching it. The tread can't channel the water away fast enough, so the tire climbs up onto a thin film of water and rides on top of it like a water ski. At that instant you are no longer driving a car — you're a 3,500-pound object skating across a parking lot of water, and the steering wheel, the brakes, and the gas pedal are all connected to nothing.",
            "Three things decide whether you hydroplane: your speed, your tire tread depth, and how much water is standing on the road. Speed is the one you control in real time. Tread is the one you control in the garage — bald tires hydroplane at lower speeds because they have no grooves left to push water out of the way. And standing water is the wild card, because in Texas a road can go from damp to flooded in the time it takes a thunderstorm cell to roll over you. The first few minutes of rain are the most dangerous of all: water lifts months of oil and rubber off the asphalt and floats it on the surface as a greasy film.",
            "Here is the move when the wheel goes light and the car stops responding: do nothing sudden. Ease off the gas — don't lift abruptly, just relax your foot. Keep the wheel pointed straight, or in the direction you were already going. Do not brake. Do not steer to 'correct.' You have no grip to correct with, and the moment your tires bite the road again, any input you're holding gets executed instantly and violently. Patience for one or two seconds lets the tires push back through the water film and re-engage on their own terms. Then, and only then, you resume normal driving."
          ]
        },
        {
          "id": "6.2",
          "title": "Night driving & glare recovery",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Driving at night is not just driving with the lights on — it is driving with a fraction of the information you'd have in daylight. Your eyes are built for sun, and the moment the light drops, so does your performance. In the dark, your visual range collapses, your depth perception gets unreliable, and your ability to pick a dark-clothed pedestrian out of a dark background drops to almost nothing until they're dangerously close. The crash rate per mile roughly triples after dark, and for new drivers with the least experience reading low-light scenes, it's worse still. Nothing about the car changes at night; everything about what you can see does, and that single fact is what makes the dark so deadly for the people who treat it like daytime with the lights flipped on.",
            "Your headlights define a hard ceiling on how far you can react, and most new drivers badly overestimate that ceiling. On low beam, the usable light reaches only about 200 feet ahead. On high beam, about 350 feet. That sounds like plenty until you do the speed math: at 60 mph you are covering 88 feet every single second, and your total stopping distance — the reaction time plus the actual braking — is well over 200 feet on dry pavement. So on low beams at highway speed, you can literally be driving faster than you can see to stop, which means a stalled car or a fallen branch could appear inside your headlights with no room left to do anything about it. The fix has a name: overdriving your headlights, and the cure is to slow down until your stopping distance fits comfortably inside the patch of road your lights actually show you.",
            "Texas law tells you when your lights must be on, not just when it's convenient or when you happen to feel like it. Under Transportation Code Sec. 547.302, you must display headlights at night — defined as from a half-hour after sunset to a half-hour before sunrise — and any time you can't clearly see a person or vehicle 1,000 feet ahead. That second clause is the one drivers forget, and it matters in Texas: heavy rain, ground fog, or a dust haze at four in the afternoon legally requires headlights even though the sun is technically up. And note that daytime running lights don't satisfy this, because on most cars they light only the front and leave your taillights dark, so you're seen from ahead but invisible from behind.",
            "High beams are a gift and a weapon, and the law treats them as both at once. Use them on open, empty road — they nearly double your sight distance and buy you precious extra seconds to spot a deer at the shoulder or a cyclist with no reflectors. But Texas Transportation Code Sec. 547.333 requires you to dim them when an oncoming vehicle is within 500 feet, and when you are following another vehicle within 300 feet. The reason is simple and unforgiving: the same high beams that help you see also blind the other driver, and a blinded driver coming the other way at highway speed is a head-on crash looking for somewhere to happen. The courtesy of dimming early is not just politeness — it is the difference between two cars passing safely and two cars converging blind.",
            "Now the part that actually hurts new drivers the most: glare recovery. When oncoming high beams hit your eyes, the light-sensitive cells in your retina get saturated — chemically overwhelmed — and they do not reset instantly. Full recovery takes several seconds; call it 6 or more, and longer as you get older or more tired. During that whole window you are functionally half-blind, seeing washed-out shapes instead of a sharp road. At 60 mph, 6 seconds is 528 feet of road traveled while you can barely make out your lane. That is not a metaphor or an exaggeration; that is an entire city block driven on faith and muscle memory while your eyes catch back up.",
            "So you never, ever look at the lights. The instant you sense oncoming glare building, drop your eyes down and to the right and track the white edge line at the side of your lane. The edge line gives you a steering reference and keeps you centered without forcing your eyes to absorb the brunt of the glare, so your night vision stays mostly intact and recovers far faster once the car has passed. Looking straight at the lights — which is exactly what your startled reflexes want you to do — is the single worst choice available, because it maximizes how saturated your retina gets and stretches your recovery time well past the moment the other car is gone.",
            "Speed control is the thread that ties all of this together at night. Because your available information is reduced and your recovery from any glare is slow, the single most protective habit you can build is simply driving a notch slower than you would in daylight and deliberately stretching your following distance. Every hazard at night gives you less warning, so you compensate by buying yourself more time, and time at the wheel is bought with lower speed. In rain at night you are stacking two penalties on top of each other, so the 3-second gap you'd keep on a dry day should grow to 5 seconds or more. You are not being timid or slow; you are honestly matching your speed to the distance you can actually see and react within.",
            "Animals and pedestrians are the specific killers the dark hides best, and Texas roads are full of both. A deer at the edge of a rural farm-to-market road, a pedestrian in dark clothes crossing mid-block, a cyclist with a dead taillight — none of them show up in your headlights until they're frighteningly close, and a deer in particular will freeze and stare into your lights rather than flee. Scan the edges of your lane and the shoulders, not just the center of the road, and watch for the telltale glint of eyeshine reflecting back at you. If a large animal is unavoidable, the standard guidance is to brake hard and stay in your lane rather than swerve, because swerving at speed into the oncoming lane or off the road usually turns a survivable collision into a fatal one.",
            "The trickiest light of all isn't full dark — it's the transition at dawn and dusk. In that low, flat, fading light your eyes are caught between their daytime and nighttime modes and perform worse than in either, and a setting or rising sun can sit right at windshield height and blast you with direct glare that swallows brake lights, signals, and pedestrians whole. This is also exactly when deer move most and when tired commuters fill the roads. Treat dusk and dawn as their own hazardous condition: get your headlights on early so others can see you, drop your visor against the low sun, and slow down through the transition rather than trusting eyes that are quietly underperforming.",
            "One more habit pays off out of all proportion to the effort: keep your windshield and headlight lenses clean, inside and out. A thin film of haze on the inside of the glass — the slow buildup from your own breath, dust, and off-gassing plastics — or a layer of dead bugs and road grime on the headlight lenses scatters light in every direction. That scatter turns every oncoming headlight into a blinding starburst and quietly steals somewhere between 20 and 40 percent of your effective night vision before you've even left the driveway. Wiping the inside of the windshield and a quick swipe of the headlights is the cheapest safety upgrade you will ever make — a rag and ten seconds at the gas station, in exchange for seeing the road the way it's actually lit."
          ],
          "keyPoints": [
            "Drive within your headlight range - never overdrive your lights",
            "Low beam reaches ~200 ft, high beam ~350 ft; at 60 mph you cover 88 ft/sec",
            "TX Sec. 547.302: headlights required nighttime and whenever you can't see 1,000 ft ahead",
            "TX Sec. 547.333: dim high beams within 500 ft oncoming, 300 ft following",
            "Glare hits: look down-right to the edge line, never at the lights",
            "Recovery from glare takes 6+ seconds - slow down and stretch following distance at night"
          ],
          "quiz": [
            {
              "q": "When oncoming high beams blind you, look:",
              "options": [
                "Right at them",
                "Down and to the right edge line",
                "At your dashboard"
              ],
              "correct": 1,
              "why": "Track the white right-edge line. Eyes off the glare. 6 seconds to recover."
            },
            {
              "q": "Switch to low beams when an oncoming vehicle is within:",
              "options": [
                "100 ft",
                "500 ft",
                "1000 ft"
              ],
              "correct": 1,
              "why": "TX Sec. 547.333: 500 ft for oncoming, 300 ft for following."
            },
            {
              "q": "Low-beam visibility range is approximately:",
              "options": [
                "100 ft",
                "200 ft",
                "500 ft"
              ],
              "correct": 1,
              "why": "~200 ft. High beam reaches ~350 ft. Drive within whichever you're using."
            },
            {
              "q": "'Overdriving your headlights' means:",
              "options": [
                "Using high beams in the city",
                "Driving so fast your stopping distance is longer than how far your lights reach",
                "Leaving your brights on too long"
              ],
              "correct": 1,
              "why": "If you can't stop within the distance your lights show you, you're driving blind into the dark. Slow down until your stopping distance fits inside your light."
            },
            {
              "q": "Under TX Sec. 547.302, you must have headlights on:",
              "options": [
                "Only between midnight and 5 a.m.",
                "From a half-hour after sunset to a half-hour before sunrise, and any time you can't see 1,000 ft ahead",
                "Only when it's fully dark outside"
              ],
              "correct": 1,
              "why": "Sec. 547.302 ties the requirement to both clock time and visibility - so heavy rain or dust at 4 p.m. legally requires headlights even with the sun up."
            },
            {
              "q": "Full recovery of your vision after a blast of glare takes about:",
              "options": [
                "A fraction of a second",
                "6 or more seconds",
                "A full minute"
              ],
              "correct": 1,
              "why": "The retina's light-sensitive cells stay saturated for several seconds. At 60 mph, 6 seconds is over 500 feet driven half-blind."
            },
            {
              "q": "Why don't daytime running lights satisfy the nighttime headlight law?",
              "options": [
                "They're too dim to see by",
                "They usually leave your taillights dark, so you're not visible from behind",
                "They drain the battery"
              ],
              "correct": 1,
              "why": "DRLs typically light only the front. The law requires you to both see and be seen, and dark taillights make you nearly invisible from the rear at night."
            }
          ],
          "worked": {
            "setup": "It's 9 p.m. on a two-lane farm-to-market road outside Lubbock. No streetlights, no other traffic, so you're running high beams and doing 60 mph. A pair of headlights appears far ahead, coming the other way. You're a careful driver, so you decide to leave your high beams on until the other car is close enough that they're actually bothering you.",
            "walkthrough": "That instinct is exactly backward, and the math shows why. Two cars closing at a combined 120 mph cover 176 feet every second. TX Sec. 547.333 says dim by 500 feet of separation - that's less than 3 seconds of closing time, so you have almost no margin to wait. If you 'wait until it bothers you,' you've already blinded the oncoming driver during the most dangerous moment, and you've blinded yourself off their reaction. Right way: the moment you see those distant lights, flick to low beam, ease off to about 50, and shift your eyes down to the white right-edge line. You sacrifice a little sight distance for a few seconds, the cars pass cleanly, and your night vision is intact the instant they're behind you. On an empty West Texas road the temptation to hoard your high beams is strong - the discipline to dim early is what keeps a routine pass from becoming a head-on."
          },
          "miniScenario": {
            "prompt": "You're driving at night and an oncoming car with high beams crests a hill, blasting your eyes. You can't see the road clearly for a moment. What do you do?",
            "options": [
              "Flash your own high beams back at them to make them dim.",
              "Look down and to the right, track the white edge line, and ease off the gas until your vision clears.",
              "Stare at their lights so you can judge exactly when they'll pass."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Now BOTH of you are blinded at the worst possible second, closing at a combined 100+ mph. Retaliating with your high beams doesn't fix the danger - it doubles it. Dim, look away, and let it go."
              },
              "1": {
                "good": true,
                "body": "Eyes off the glare and onto the edge line keeps your night vision mostly intact, and easing off the gas shrinks the distance you cover while half-blind. This is the textbook recovery and it works every time."
              },
              "2": {
                "good": false,
                "body": "Staring straight at the lights maximizes how saturated your retina gets, which means your 6-second recovery stretches even longer. You'll be functionally blind well after the car has already passed."
              }
            }
          }
        },
        {
          "id": "6.3",
          "title": "Fog, dust storms, ice (yes, in TX)",
          "minutes": 40,
          "type": "reading",
          "body": [
            "People assume Texas weather is just hot, but the conditions that actually kill drivers here are the rare, sudden ones nobody is mentally prepared for: a wall of dust rolling across the Panhandle, a patch of dense fog sitting in a river bottom, a glaze of ice on an overpass on the two or three cold mornings a year it actually happens. The danger isn't that these conditions are common — it's precisely that they're rare. Because Texans almost never see them, drivers blow into them carrying the same speed and the same easy confidence they had a mile back on a clear, dry road. Survival in all three comes down to the same single instinct: recognize the condition early, before it's on top of you, and immediately give yourself more room and less speed.",
            "Fog is just a cloud that has settled onto the ground, and the worst possible thing you can do in it is reach for your high beams. The bright, concentrated light scatters off the millions of tiny suspended water droplets and bounces straight back into your eyes as a glowing white wall — so you actually see less, not more, the brighter you make your lights. Low beams are aimed downward, so they slide under most of that scatter and light up the road surface instead of the fog hanging above it. So the rule in fog is absolute and has no exceptions: low beams only, every single time, no matter how badly your instinct wants more light.",
            "When fog gets genuinely thick, the only real defense left to you is speed, because no amount of light is going to punch through it. If your visibility drops below roughly 100 feet, you can no longer see far enough ahead to stop from highway speed, so you slow to 25 or 30 mph and you use the white right-edge line as your guide rail to stay in your lane. And if it gets so thick that you truly can't make out the road at all, don't gamble on creeping forward — get completely off the pavement, well past the white line and onto solid ground, put on your hazard lights, and simply wait it out. A car stopped in a live travel lane in fog is not a safe car; it's a crash that just hasn't happened yet.",
            "Dust storms are the West Texas version of exactly the same visibility trap, and they're far more dramatic than people from other parts of the state expect. A haboob — a genuine, towering wall of dust that can stand hundreds of feet tall — can roll across the Panhandle and the Permian Basin and slam your visibility down to near zero in a matter of seconds, faster than you can really process. The first moves the instant you see one coming are to close your windows and air vents so you're not sucking grit into the cabin and your lungs, slow down hard and deliberately, and turn your headlights on low so the other drivers around you have a chance of finding you.",
            "But the dust-storm rule that actually saves lives is deeply counterintuitive, so you have to memorize it cold: if the dust drops your visibility to almost nothing, pull completely off the pavement, put the car in park, turn your lights all the way OFF, and take your foot off the brake. Here is the brutal logic behind it — in zero visibility, a panicked driver coming up behind you will instinctively steer toward the only thing they can see, and that thing is your glowing taillights. If your lights are off and you're well clear of the road, there is simply nothing for them to lock onto and aim at. Lights on, plus a foot pressing the brake, literally turns your stopped car into a bright target in the murk. Texas troopers teach this as 'pull aside, stay alive.'",
            "Ice in Texas is rare — most of the state sees it only a handful of days a year, concentrated around the DFW Metroplex, the Panhandle, and the Hill Country during the occasional hard freeze — and that very rarity is exactly what makes it so dangerous when it does arrive. Drivers here have almost no real ice experience to draw on, and Texas road crews keep only a small fraction of the salt and sand trucks that northern states run as a matter of routine. So when a freeze actually hits, the roads end up both more slippery and far less treated than they would be up north, and they fill with thousands of drivers who have genuinely never practiced controlling a car on ice.",
            "The one ice fact every single Texan absolutely must know is this: bridges and overpasses freeze first, and they freeze while the regular road alongside them is still merely wet. A normal stretch of road is warmed from underneath by the huge mass of ground beneath it, but a bridge deck has cold air flowing both above AND below it, so it bleeds heat from both sides and drops to freezing well before the pavement on either end of it does. That means you can be cruising along on bare, wet, perfectly grippy asphalt, roll onto an overpass, and find black ice waiting for you with zero visual warning — which is exactly why you ease off the gas before the bridge and avoid any braking or steering input the entire time you're on the structure.",
            "On ice, your whole driving style has to change to one word: gentle. Your available grip is a tiny fraction of what it is on dry pavement, so you double your following distance at the absolute minimum, you accelerate slowly and patiently, you brake softly and far earlier than feels necessary, and you make every steering movement smooth and small. A sudden stab at the brake pedal or a quick yank of the wheel is the single thing most likely to break what little traction you have and launch you into a slide. The smoother and slower every input, the longer your tires stay connected to the road.",
            "If the worst happens and you do start to skid on ice, the recovery move is the opposite of panic. Ease off whatever you were doing — lift gently off the brake or the gas rather than stabbing either — and if the back of the car slides out, steer gently in the same direction the rear is sliding to bring it back in line, then straighten up smoothly as it recovers. Hard, jerky corrections just trade one slide for another, bigger one. The whole skill is doing less, more gently, and giving the tires a chance to grip again instead of forcing them.",
            "And here's the honest bottom line on Texas ice that no other condition gets: if you have any real choice in the matter — if the trip genuinely isn't essential — the correct answer is usually to just stay home. Schools and employers close during Texas ice events specifically because the combination of inexperienced drivers, under-treated roads, and surprise black ice on overpasses makes even a short drive a genuine gamble. The safest car on ice is the one still parked in the driveway, and there is zero shame in being the person who waited the morning out until the sun did the work for you."
          ],
          "keyPoints": [
            "Fog: LOW beams only - high beams scatter off droplets and blind you",
            "Fog under ~100 ft visibility: slow to 25-30 mph or pull fully off and use hazards",
            "Dust storm: pull off pavement, lights OFF, foot off brake ('pull aside, stay alive')",
            "Bridges and overpasses freeze first - cold air above and below them",
            "Ice: gentle inputs only, double following distance, brake early and soft",
            "Texas ice is rare and under-treated - if the trip isn't essential, stay home"
          ],
          "quiz": [
            {
              "q": "In fog, use:",
              "options": [
                "High beams",
                "Low beams",
                "No headlights"
              ],
              "correct": 1,
              "why": "High beams reflect off fog moisture and blind you. Low beams."
            },
            {
              "q": "In a dust storm, when you pull off the road, you should:",
              "options": [
                "Keep your headlights on as a beacon",
                "Turn lights off and foot off brake",
                "Honk repeatedly"
              ],
              "correct": 1,
              "why": "Other drivers in zero visibility may aim at your taillights. Lights off, foot off brake."
            },
            {
              "q": "Which freezes first?",
              "options": [
                "Flat road surfaces",
                "Bridges and overpasses",
                "Driveways"
              ],
              "correct": 1,
              "why": "Air circulates above and below bridges/overpasses, so they cool faster than ground-supported road."
            },
            {
              "q": "Why do high beams make fog worse instead of better?",
              "options": [
                "They drain too much power",
                "The light scatters off the suspended water droplets and reflects back as a white wall",
                "They're aimed too low to reach the fog"
              ],
              "correct": 1,
              "why": "Bright light bounces off the millions of droplets and glares back into your eyes. Low beams aim under most of the scatter and light the road."
            },
            {
              "q": "When fog drops your visibility below about 100 feet, you should:",
              "options": [
                "Keep your normal speed and use hazards",
                "Slow to 25-30 mph or pull fully off the road",
                "Speed up to get through it faster"
              ],
              "correct": 1,
              "why": "At 100 ft you can't see far enough to stop from highway speed, so you slow drastically or get off the road entirely."
            },
            {
              "q": "On ice, the right driving style is:",
              "options": [
                "Quick, sharp inputs to stay ahead of slides",
                "Gentle inputs, double following distance, brake early and soft",
                "Normal driving as long as you stay in your lane"
              ],
              "correct": 1,
              "why": "Grip is a fraction of normal, so any sudden stab or yank breaks traction. Everything smooth, slow, and spaced out."
            },
            {
              "q": "Why is a Texas ice event often more dangerous than an icy day up north?",
              "options": [
                "Texas ice is physically colder",
                "Texas drivers have little ice experience and roads get far less salt treatment",
                "The sun melts it unpredictably"
              ],
              "correct": 1,
              "why": "Rare ice means inexperienced drivers and few salt trucks, so the roads are both more slippery and less treated than in northern states."
            }
          ],
          "worked": {
            "setup": "It's 6 a.m. in late January near Amarillo. The thermometer read 28 degrees overnight and it drizzled. The road looks merely wet and you're rolling along comfortably at 55 mph. Ahead, the road rises onto an overpass crossing the interstate.",
            "walkthrough": "The wet-looking road is a trap. At 28 degrees, that drizzle has frozen into a thin glaze, and the overpass - cold air above and below it - froze before the ground-supported road did. If you carry 55 mph onto it and then brake or steer at all, your near-zero grip lets the car slide with no way to recover. Right way: well before the bridge, you ease off the gas to bleed speed down to maybe 35 on the regular pavement where you still have some grip. As you cross the overpass itself, you do nothing - no braking, no steering correction, no acceleration - you just coast straight and let the car carry across. Once you're back on ground-supported road past the bridge, you can gently resume. The whole survival move is recognizing that 'wet' near freezing means 'maybe ice,' and that the overpass is where it'll be worst."
          },
          "miniScenario": {
            "prompt": "You're driving through thickening fog on a rural Texas highway and your visibility has dropped so low you can barely make out the road. You decide you need to stop and wait it out. What's the safest move?",
            "options": [
              "Stop in your lane, leave your headlights and hazards on bright so cars can see you.",
              "Pull completely off the pavement past the edge line, then put on your hazards and wait.",
              "Slow to a crawl in your lane and keep creeping forward until the fog lifts."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Stopping in a travel lane in fog makes you a stationary target. Following drivers in low visibility steer toward your lights and rear-end you at speed. Never stop in a lane - get off the road."
              },
              "1": {
                "good": true,
                "body": "Getting fully off the pavement removes you from the path of moving traffic, and the hazards mark you for anyone who does drift close. This is the safe way to wait out fog - off the road, not on it."
              },
              "2": {
                "good": false,
                "body": "Creeping in a lane you can't see is gambling that nothing is stopped ahead and that nothing fast is coming behind. In dense fog that's two bad bets at once. If you truly can't see, get off the road."
              }
            }
          }
        },
        {
          "id": "6.4",
          "title": "Distraction is a chemical thing — phones",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 11",
            "meta": [
              "45 mph",
              "City"
            ],
            "description": "A text comes in. You're a fast reader — you can glance for 2 seconds. What happens at 45 mph during those 2 seconds?"
          },
          "options": [
            {
              "letter": "A",
              "text": "You travel about 30 feet — a car length."
            },
            {
              "letter": "B",
              "text": "You travel about 130 feet — almost half a football field — completely blind."
            },
            {
              "letter": "C",
              "text": "Nothing happens because nothing changed in 2 seconds."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Off by 4x.",
              "body": "45 mph = 66 ft/sec. 2 seconds = 132 ft. That's 8 car lengths — nearly half a football field — driven completely blind."
            },
            "B": {
              "good": true,
              "title": "You see why texting is treated as DUI-equivalent.",
              "body": "NHTSA data: a 2-second glance roughly doubles crash risk. A 5-second glance (typical text read+reply) raises it 23x."
            },
            "C": {
              "good": false,
              "title": "A lot can change in 2 seconds.",
              "body": "A pedestrian can step off a curb. A light can change. A car can stop. The world doesn't pause for your text."
            }
          },
          "rule": {
            "tag": "TX §545.4251",
            "title": "No texting while driving — anywhere.",
            "body": "Statewide ban. $25–$99 first offense, $100–$200 repeat. In a school zone, ALL phone use including hands-free is banned. Provisional license holders can't use a phone at all while driving — even hands-free.",
            "stat": {
              "num": "~23x",
              "body": "crash risk multiplier from a 5-second text glance at 45 mph (Virginia Tech Transportation Institute)."
            }
          },
          "quiz": [
            {
              "q": "At 45 mph, 2 seconds of looking down covers:",
              "options": [
                "~30 ft (one car)",
                "~130 ft (half a football field)",
                "~10 ft"
              ],
              "correct": 1,
              "why": "45 mph = 66 ft/sec. 2 seconds = 132 ft."
            },
            {
              "q": "TX provisional license holders can use a phone:",
              "options": [
                "Hands-free only",
                "Never while driving",
                "Only for navigation"
              ],
              "correct": 1,
              "why": "No phone use at all for provisional license holders, even hands-free, until age 18."
            },
            {
              "q": "A 5-second text glance multiplies crash risk by approximately:",
              "options": [
                "2x",
                "10x",
                "23x"
              ],
              "correct": 2,
              "why": "VTTI data: ~23x for a typical text read+reply."
            },
            {
              "q": "'Cognitive distraction' means:",
              "options": [
                "Your eyes are off the road",
                "Your mind is split even when your eyes are up, so you can look at a hazard and not register it",
                "Your hands are off the wheel"
              ],
              "correct": 1,
              "why": "Even on a legal hands-free call, part of your attention is on the conversation. That's why hands-free isn't the same as safe."
            },
            {
              "q": "Why does a phone notification feel so hard to ignore while driving?",
              "options": [
                "It's louder than road noise",
                "It triggers a dopamine reward hit, the same system that makes social feeds addictive",
                "Texas law requires you to answer"
              ],
              "correct": 1,
              "why": "The ping taps your brain's reward chemistry, which is exactly why 'I'll just glance' overrides your better judgment."
            },
            {
              "q": "In an active Texas school zone, phone use is:",
              "options": [
                "Allowed hands-free",
                "Completely banned, including hands-free (Sec. 545.4251)",
                "Allowed only under 20 mph"
              ],
              "correct": 1,
              "why": "Sec. 545.4251 bans ALL phone use, hands-free included, while driving through an active school zone."
            }
          ],
          "body": [
            "Distraction isn't a willpower problem - it's a wiring problem. Your brain physically cannot pay full attention to driving and to a phone at the same time; it just switches back and forth between them, leaving gaps where neither task is getting your real attention. Worse, a notification triggers a small dopamine hit, the same chemical reward that makes slot machines and social feeds so sticky. That ping literally pulls at your brain's reward system, which is why 'I'll just glance at it' feels almost impossible to resist even when you know better.",
            "The cost shows up in two ways, and people only think about one of them. The obvious one is the eyes-off-road time - the seconds you're literally not looking. The hidden one is cognitive distraction: even with your eyes up and a hands-free call going, part of your mind is on the conversation, your reaction time stretches, and you develop 'inattention blindness' where you look right at a hazard and never register it. Hands-free is legal in many situations, but legal is not the same as safe.",
            "Texas backs this up with real law, and it's stricter for you than for adults. Transportation Code Sec. 545.4251 bans reading, writing, or sending an electronic message while driving statewide. In any active school zone, ALL phone use - including hands-free - is banned. And if you hold a provisional license or a learner permit (which means basically every teen), Texas prohibits you from using a wireless device at all while driving, even hands-free, until you turn 18. The simplest legal and safe answer for a teen is the same: phone away, every time."
          ]
        },
        {
          "id": "6.5",
          "title": "Module 6 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Hydroplaning starts as low as:",
              "options": [
                "65 mph",
                "55 mph",
                "35 mph"
              ],
              "correct": 2
            },
            {
              "q": "When hydroplaning:",
              "options": [
                "Brake hard",
                "Steer sharply",
                "Ease off gas, hold wheel straight"
              ],
              "correct": 2
            },
            {
              "q": "Glare from oncoming high beams: look:",
              "options": [
                "Right at them",
                "At the right edge line",
                "At your speedometer"
              ],
              "correct": 1
            },
            {
              "q": "TX low-beam switch distance for oncoming:",
              "options": [
                "200 ft",
                "500 ft",
                "1000 ft"
              ],
              "correct": 1
            },
            {
              "q": "In fog, use:",
              "options": [
                "High beams",
                "Low beams",
                "No lights"
              ],
              "correct": 1
            },
            {
              "q": "Bridges and overpasses freeze:",
              "options": [
                "Slower",
                "Faster",
                "Same as roads"
              ],
              "correct": 1
            },
            {
              "q": "TX provisional + phone:",
              "options": [
                "Hands-free OK",
                "No phone use ever while driving",
                "Only navigation"
              ],
              "correct": 1
            },
            {
              "q": "A 5-sec text glance at 45 mph multiplies crash risk by:",
              "options": [
                "2x",
                "10x",
                "~23x"
              ],
              "correct": 2
            }
          ]
        }
      ]
    },
    {
      "id": "M7",
      "num": 7,
      "title": "Alcohol, Drugs & Impairment",
      "blurb": "Why the law treats this category differently and the math that explains why.",
      "chapters": [
        {
          "id": "7.1",
          "title": "BAC, the legal limit, and what 0.02 means for under-21",
          "minutes": 50,
          "type": "reading",
          "body": [
            "Blood Alcohol Concentration (BAC) is the percentage of alcohol in your bloodstream by volume. A BAC of 0.08 means eight one-hundredths of one percent of your blood is alcohol. It sounds tiny, and that is exactly the trap: a number that small doesn't feel like it should matter, but it is enough to measurably wreck the part of your brain that keeps a car between two painted lines.",
            "The legal limit depends entirely on your age, and Texas draws a hard line at 21. If you are 21 or older, the per-se DWI limit is 0.08 (Texas Penal Code §49.01). 'Per-se' means that at 0.08 the law doesn't argue about whether you seemed fine — you are legally intoxicated, full stop, no further proof of impairment needed.",
            "For everyone under 21, Texas runs zero tolerance. Any detectable amount of alcohol while driving is a DUI offense under the Alcoholic Beverage Code §106.041 — not 0.08, not 0.02, but ANY amount a test can pick up. There is no 'I only had one' defense built into the law for you, because the law was written specifically to remove that conversation.",
            "Here is what zero tolerance means in real numbers. A single 12-ounce beer can push a 120-pound 16-year-old to roughly 0.03 BAC — three times over the threshold that gets you arrested. You do not need to be drunk, stumbling, or slurring. You need exactly one drink and a traffic stop, and you have committed a crime.",
            "Impairment is not linear, which is the most dangerous thing about it. The damage doesn't climb in a gentle straight line as you drink — it accelerates. At 0.02 your reaction time has already slipped and your ability to track a moving object is degrading. You feel completely normal. That gap between how impaired you feel and how impaired you are is what fills emergency rooms.",
            "By 0.05, divided attention collapses. Driving is the act of doing five things at once — steering, scanning mirrors, judging the gap ahead, reading a sign, watching a pedestrian — and 0.05 is roughly where your brain can no longer juggle them. You start dropping tasks without noticing you dropped them. At 0.08 basic motor coordination fails, and by 0.15 your crash risk is around 22 times a sober driver's.",
            "The penalties for an under-21 DUI in Texas are built to interrupt your life, not just your weekend. A first offense brings a 60-day license suspension, a fine up to $500, a mandatory alcohol-awareness course, and possible community service. A second offense pushes the suspension toward 120-180 days, and the numbers climb from there.",
            "The suspension is the part teens underestimate. Sixty days with no license is two months of someone else driving you to school, work, and practice — or you not getting there. And because you are a minor, Texas can also require an occupational license process and parental involvement just to get limited driving privileges back.",
            "The money doesn't stop at the $500 fine either. Court costs, attorney fees, the awareness class, and license reinstatement fees stack up fast, but the real bleed is insurance. A DUI on your record can double or triple your premium for three to five years — that is thousands of dollars charged slowly, long after the night you forgot about.",
            "The clean takeaway: for you, the only safe BAC is exactly zero, and that is also the legal one. There is no quantity of alcohol that is both legal for you to drive on and undetectable on a test. The math, the law, and your reaction time all point at the same answer, so you never have to do the calculation in the moment — the answer is always zero."
          ],
          "keyPoints": [
            "21+: 0.08 is the per-se DWI limit (TX Penal Code §49.01)",
            "Under 21: ZERO tolerance — any detectable alcohol = DUI (Alcoholic Beverage Code §106.041)",
            "One beer can put a small teen at ~0.03 — triple the under-21 threshold",
            "Impairment accelerates: 0.02 slows reaction, 0.05 kills divided attention, 0.15 ~ 22x crash risk",
            "First under-21 offense: 60-day suspension, up to $500 fine, mandatory class",
            "Real cost is the insurance hike — premiums up for 3-5 years"
          ],
          "quiz": [
            {
              "q": "TX per-se DWI limit for drivers 21 and older:",
              "options": [
                "0.05 BAC",
                "0.08 BAC",
                "0.10 BAC"
              ],
              "correct": 1,
              "why": "0.08 is the per-se limit for adults under TX Penal Code §49.01."
            },
            {
              "q": "For drivers under 21, the BAC threshold for a DUI offense is:",
              "options": [
                "0.02",
                "0.05",
                "Zero tolerance — any detectable amount"
              ],
              "correct": 2,
              "why": "Alcoholic Beverage Code §106.041: any detectable amount of alcohol is a DUI for a minor."
            },
            {
              "q": "Why is 'I feel fine' such a dangerous thing to rely on?",
              "options": [
                "It's always accurate",
                "Impairment starts before you feel it — you don't notice dropped tasks",
                "It only matters above 0.08"
              ],
              "correct": 1,
              "why": "The gap between how impaired you feel and how impaired you are is the core danger; divided attention degrades silently."
            },
            {
              "q": "At 0.05 BAC, the function that fails first is mainly:",
              "options": [
                "Vision color",
                "Divided attention — doing several driving tasks at once",
                "Hearing"
              ],
              "correct": 1,
              "why": "Around 0.05, your brain can no longer juggle steering, scanning, and judging gaps simultaneously."
            },
            {
              "q": "About how high is crash risk at 0.15 BAC versus sober?",
              "options": [
                "About the same",
                "Roughly 2x",
                "Roughly 22x"
              ],
              "correct": 2,
              "why": "Impairment accelerates non-linearly; at 0.15 crash risk is around 22 times baseline."
            },
            {
              "q": "A first-offense under-21 DUI in Texas typically brings:",
              "options": [
                "Just a verbal warning",
                "A 60-day license suspension, fine up to $500, and mandatory class",
                "Immediate jail with no license impact"
              ],
              "correct": 1,
              "why": "First under-21 offense: 60-day suspension, up to $500 fine, and a mandatory alcohol-awareness course."
            },
            {
              "q": "The longest-lasting cost of a teen DUI is usually:",
              "options": [
                "The $500 fine",
                "The insurance increase that lasts 3-5 years",
                "The court filing fee"
              ],
              "correct": 1,
              "why": "The fine is one-time; inflated insurance premiums can cost thousands over several years."
            },
            {
              "q": "For an under-21 driver, the only BAC that is both legal AND safe is:",
              "options": [
                "0.02",
                "Exactly zero",
                "Anything under 0.08"
              ],
              "correct": 1,
              "why": "Zero tolerance makes zero the legal limit, and zero is also the only impairment-free level."
            }
          ],
          "worked": {
            "setup": "You're 16, in Austin, and you have one 12-ounce beer at a friend's house around 9 PM. By 9:45 you feel totally normal and decide you're fine to drive the four blocks home. A Travis County officer stops you for a rolling stop at a stop sign.",
            "walkthrough": "You think you're sober because you feel sober — but feeling fine is exactly what 0.03 BAC feels like at your size. The officer smells alcohol, runs a breath test, and it reads any detectable amount. For an adult, 0.03 is legal and the stop ends with a warning. For you, under §106.041, any detectable amount IS the offense — there is no minimum. So the same number that's a non-event for a 25-year-old becomes a DUI arrest for you: 60-day suspension, a fine, a mandatory class, and an insurance record that follows you to age 21. The 'four blocks' detail doesn't help — the law doesn't measure distance, it measures whether you drove with alcohol in your system at all. Zero is the only number that protects you."
          },
          "miniScenario": {
            "prompt": "You're 17 at a party. You had two beers over the last hour. Your ride home bailed and it's a 20-minute drive. What's the move?",
            "options": [
              "Drive — two beers over an hour is basically nothing, and you feel fine.",
              "Text a parent or call a rideshare, even though it's awkward and you'll have to explain.",
              "Wait 30 minutes, then drive, since some of it will have worn off."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Two beers in an hour puts a teen well over 0.05 — and remember, your legal threshold is ZERO, not 0.08. 'I feel fine' is the single most common sentence in DUI arrest reports. This is a guaranteed crime if you're stopped, and a real crash risk if you're not."
              },
              "1": {
                "good": true,
                "body": "This is the answer every single time. The awkward call to a parent or the cost of a rideshare is trivial compared to a 60-day suspension, a fine, years of inflated insurance, and the worst-case outcome of a crash. Smart people plan the ride home before the first drink."
              },
              "2": {
                "good": false,
                "body": "Your body clears alcohol at roughly one drink per hour, and it's slow and unpredictable. Thirty minutes barely touches two beers, and you'd still be detectable — which under zero tolerance is all it takes. Time is not a reliable un-drunk button."
              }
            }
          }
        },
        {
          "id": "7.2",
          "title": "Cannabis, prescriptions, and \"I'm fine to drive\"",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Cannabis impairs driving — that is not a debate, it is a measurement. THC, the active compound, slows your reaction time, distorts how you judge distance and speed, and degrades your ability to hold a lane. The high that feels mellow on a couch is the same chemistry that delays your foot getting to the brake on a highway.",
            "Texas does not have a per-se THC limit, and that surprises people who assume it works like the 0.08 alcohol number. There is no magic threshold where you're legally fine below it and illegal above it. Instead, under Penal Code §49.01 you're guilty of DWI if you've lost the normal use of your mental or physical faculties from ANY substance — and an officer judges that at the stop through observation and field sobriety tests.",
            "That 'judged at the stop' detail actually makes cannabis legally riskier than people expect, not safer. With alcohol there's at least a number to argue about. With THC, the case is built on the officer's observations, your performance on the field sobriety tests, and a blood or urine draw — and a DWI conviction is identical whether the cause was a bottle or a joint. Same charge, same penalties, same record.",
            "Texas's medical cannabis program (the Compassionate Use Program for low-THC products) does not change any of this. A prescription lets you possess and use a specific product legally; it gives you exactly zero protection if you drive impaired. 'I have a card' is not a defense to DWI any more than a beer being legal to buy is a defense to drunk driving.",
            "The 'I drive better high' belief is one of the best-studied myths in traffic safety, and every controlled study disagrees with it. The kernel of truth is that cannabis users often compensate by driving slower and leaving more following distance — they sense something is off. The problem is that the compensation doesn't cover the deficit; reaction time and lane discipline still degrade past whatever the slower speed buys back.",
            "Now the part almost nobody warns teens about: prescription and over-the-counter medications. The bottle being legal and doctor-approved says nothing about whether it's safe to drive on. A lot of extremely common medicines are sedating, and 'I had a prescription' is not a shield against a DWI if the drug took your faculties.",
            "Diphenhydramine — the antihistamine in Benadryl and in most nighttime cold and allergy meds like NyQuil — is the headline example. Studies have found that the drowsiness from a normal dose can impair driving as much as a BAC around 0.05. You can be stone-cold sober by alcohol standards and still be chemically impaired by something you bought at a gas station.",
            "This is why the label warning matters. When a box says 'do not operate heavy machinery' or 'may cause drowsiness,' a car is the heavy machinery — it's 3,000 pounds moving at 70 mph. The warning isn't legal boilerplate to ignore; it's the manufacturer telling you the drug affects the exact systems driving depends on.",
            "The trickiest cases are combinations and timing. Two substances that each feel mild — a single drink plus a drowsy allergy pill, or THC plus a prescription — can stack into serious impairment, and 'each one alone was fine' is not how your brain or the law works. Same with timing: a sleep aid taken at 11 PM can still be in your system, fogging you, on the morning drive.",
            "The clean rule cuts through all of it: if a substance changes how your brain or body works, you don't drive on it — legal, prescribed, or otherwise. Don't ask 'is this allowed?' Ask 'does this change how I think or move?' If the honest answer is yes, the keys wait. That single question covers cannabis, your allergy meds, your prescription, and anything else, without you needing to memorize a list."
          ],
          "keyPoints": [
            "Cannabis measurably impairs reaction time, distance judgment, and lane control",
            "TX has no per-se THC limit — DWI is loss of normal faculties, judged at the stop (Penal Code §49.01)",
            "A medical cannabis card gives zero protection against a DWI for impaired driving",
            "'I drive better high' is a documented myth — slower speed doesn't offset the deficit",
            "OTC sedatives like diphenhydramine (Benadryl/NyQuil) can impair like ~0.05 BAC",
            "The rule: if a substance changes how your brain or body works, don't drive on it"
          ],
          "quiz": [
            {
              "q": "Cannabis impairment while driving:",
              "options": [
                "Only matters at very high doses",
                "Degrades reaction time, distance judgment, and lane control even at moderate doses",
                "Only matters if combined with alcohol"
              ],
              "correct": 1,
              "why": "Even moderate THC measurably impairs reaction time, depth perception, and lane discipline."
            },
            {
              "q": "Does Texas have a numeric per-se THC limit like the 0.08 alcohol limit?",
              "options": [
                "Yes — the same number as alcohol",
                "No — DWI is loss of normal faculties, judged at the stop",
                "Yes — a different number"
              ],
              "correct": 1,
              "why": "TX has no numeric THC threshold; §49.01 defines DWI as losing the normal use of your faculties from any substance."
            },
            {
              "q": "Having a Texas medical cannabis (Compassionate Use) prescription:",
              "options": [
                "Protects you from a DWI if you drive impaired",
                "Lets you possess the product but gives no protection for impaired driving",
                "Raises the legal THC limit for you"
              ],
              "correct": 1,
              "why": "A prescription legalizes possession/use, not impaired driving — same as a beer being legal to buy."
            },
            {
              "q": "The 'I drive better high' claim is best described as:",
              "options": [
                "True if you go slow enough",
                "A documented myth — slower speed doesn't offset the impairment",
                "True only for experienced users"
              ],
              "correct": 1,
              "why": "Users do compensate by slowing down, but studies show it doesn't cover the reaction-time and lane-control deficit."
            },
            {
              "q": "An OTC drug like diphenhydramine (Benadryl) can impair driving roughly like a BAC of:",
              "options": [
                "0.00 — it's just allergy medicine",
                "Around 0.05",
                "Only above the prescription strength"
              ],
              "correct": 1,
              "why": "A normal sedating dose of diphenhydramine has been shown to impair driving similar to ~0.05 BAC."
            },
            {
              "q": "A medicine label that says 'do not operate heavy machinery' means:",
              "options": [
                "Factory equipment only, not your car",
                "Your car too — it's the heavy machinery",
                "Only matters at double the dose"
              ],
              "correct": 1,
              "why": "A car is the heavy machinery the warning is about; it affects the exact systems driving needs."
            },
            {
              "q": "Mixing a single drink with a drowsy medication is risky because:",
              "options": [
                "It isn't — each one was fine alone",
                "The effects can stack into serious impairment even if each felt mild",
                "Only illegal drugs stack"
              ],
              "correct": 1,
              "why": "Two mild sedatives can combine into significant impairment; 'each alone was fine' doesn't apply."
            },
            {
              "q": "The clean rule for deciding whether to drive on any substance is:",
              "options": [
                "Is it legal to have?",
                "Does it change how my brain or body works?",
                "Is it a prescription?"
              ],
              "correct": 1,
              "why": "Legality isn't the test — impairment is. If it changes how you think or move, you don't drive on it."
            }
          ],
          "worked": {
            "setup": "It's allergy season in San Antonio. You take two diphenhydramine (Benadryl) tablets at noon for a brutal pollen day, then drive to pick up a friend an hour later. You haven't touched alcohol or anything else.",
            "walkthrough": "You're 100% sober by alcohol standards — a breath test would read 0.00. But diphenhydramine at a normal dose can impair driving roughly as much as a 0.05 BAC, and you're peaking right around now. If you drift, react slowly, and get stopped, the officer doesn't need an alcohol reading: under §49.01, losing the normal use of your faculties from ANY substance is DWI. 'It was just allergy medicine, it's legal, it's not even prescription' is not a defense — the box literally said 'may cause drowsiness.' The right move was to read the label before you took it, pick a non-drowsy antihistamine on days you have to drive, or let someone else drive while the drowsy med is in your system. Legal to buy is not the same as safe to drive on."
          },
          "miniScenario": {
            "prompt": "A friend offers you a ride home. On the way to the car they mention they smoked about an hour ago but say 'I actually drive way more careful when I'm high — I go slow.' What do you do?",
            "options": [
              "Get in — driving slower cancels it out, and they admit they're being careful.",
              "Decline the ride and arrange another way home; don't get in a car with an impaired driver.",
              "Get in but tell them to drive extra slow so it balances out."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Driving slower is real compensation, but every controlled study shows it doesn't cover the deficit — reaction time and lane control are still degraded. 'I drive better high' is the textbook myth, and you'd be betting your life on it."
              },
              "1": {
                "good": true,
                "body": "Correct. An impaired driver is an impaired driver, and slowing down doesn't restore the reaction time and lane discipline THC takes away. Getting another ride is mildly inconvenient; being a passenger in an impaired-driving crash is not survivable to undo. Trust the data, not the vibe."
              },
              "2": {
                "good": false,
                "body": "You can't 'balance out' impairment with speed — the studies are clear that the slower speed doesn't make up for the slower brain. You'd still be a passenger relying on a degraded driver, just at a lower number on the speedometer."
              }
            }
          }
        },
        {
          "id": "7.3",
          "title": "TX implied consent + ALR refusal consequences",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 12",
            "meta": [
              "Traffic stop",
              "Night"
            ],
            "description": "You're pulled over. Officer suspects DWI and asks for a breath test. You refuse, thinking that protects you. What happens?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Without a test, the case can't proceed."
            },
            {
              "letter": "B",
              "text": "Your license is automatically suspended for 180 days regardless of the criminal outcome."
            },
            {
              "letter": "C",
              "text": "Refusal is a mild penalty."
            }
          ],
          "correct": "B",
          "consequences": {
            "A": {
              "good": false,
              "title": "Wrong — and the refusal itself triggers a penalty.",
              "body": "The DWI case can still proceed on observed impairment, field sobriety tests, and other evidence. Refusal doesn't protect you."
            },
            "B": {
              "good": true,
              "title": "You understand implied consent.",
              "body": "TX Transportation Code §724: getting a driver license = consenting to BAC testing if a peace officer arrests you for DWI. Refuse and your license is automatically suspended for 180 days (Administrative License Revocation), regardless of the criminal case outcome."
            },
            "C": {
              "good": false,
              "title": "It's severe.",
              "body": "180 days of automatic suspension is more than the 60–90 days most first-offense convictions get. Refusing makes it WORSE on average."
            }
          },
          "rule": {
            "tag": "TX §724",
            "title": "License = consent.",
            "body": "Holding a Texas driver license means you have already consented to chemical testing if arrested for DWI. Refusal triggers Administrative License Revocation (ALR): 180 days suspended for a first refusal, 2 years for a second. The criminal case proceeds on other evidence.",
            "stat": {
              "num": "180 DAYS",
              "body": "first-refusal automatic suspension. Second refusal: 2 years."
            }
          },
          "quiz": [
            {
              "q": "Texas implied consent law (§724.011) means:",
              "options": [
                "You can always legally refuse a test",
                "Holding a TX license = consent to BAC testing if you're arrested for DWI",
                "It only applies to commercial drivers"
              ],
              "correct": 1,
              "why": "§724.011: getting a Texas license is consent to chemical testing upon a DWI arrest."
            },
            {
              "q": "First-refusal license suspension under ALR is:",
              "options": [
                "30 days",
                "60 days",
                "180 days"
              ],
              "correct": 2,
              "why": "ALR suspends a first refusal for 180 days; a second refusal is 2 years."
            },
            {
              "q": "Refusing the test:",
              "options": [
                "Stops the criminal DWI case",
                "Triggers ALR, but the criminal case still proceeds on other evidence",
                "Carries no penalty at all"
              ],
              "correct": 1,
              "why": "ALR is a separate civil penalty; the criminal case proceeds on observations, field tests, and other evidence."
            },
            {
              "q": "ALR (Administrative License Revocation) is best described as:",
              "options": [
                "Part of the criminal sentence",
                "A separate civil suspension that runs on its own track",
                "Only used for repeat offenders"
              ],
              "correct": 1,
              "why": "ALR is a civil/administrative action separate from the criminal case, applied for the refusal itself."
            },
            {
              "q": "Why is refusing often WORSE than the typical first-offense conviction penalty?",
              "options": [
                "It isn't — refusal is always lighter",
                "180 days is longer than the 60-90 days many first convictions get, and you can still be convicted",
                "Refusal erases the criminal case"
              ],
              "correct": 1,
              "why": "The 180-day ALR suspension can exceed a first-conviction suspension, and the criminal case proceeds anyway."
            },
            {
              "q": "Implied consent was triggered the moment you:",
              "options": [
                "Were pulled over",
                "Accepted a Texas driver license",
                "Refused the test"
              ],
              "correct": 1,
              "why": "Consent is built into holding the license itself — not into the individual traffic stop."
            }
          ],
          "body": [
            "Before you decide what to do at this stop, you need to understand a deal you already agreed to. The moment you accepted a Texas driver license, you signed up for something called implied consent under Transportation Code §724.011: by driving on Texas roads, you have already consented to give a breath or blood sample if a peace officer arrests you for DWI. You didn't sign a separate form for it — the license itself is the agreement.",
            "Here's the part that trips up almost everyone, and it's why this scenario matters. People assume refusing the test is a clever move — no test, no evidence, no case. But Texas built a separate punishment specifically for refusing, called Administrative License Revocation (ALR) under §724.035. Refusal triggers an automatic civil license suspension that runs on its own track, completely separate from the criminal DWI case, and it kicks in whether or not you're ever convicted of anything.",
            "So a refusal doesn't make the problem disappear — it adds a second one. The criminal DWI case can still proceed on everything else: the officer's observations, your driving, field sobriety tests, and witnesses. On top of that, you now also eat the automatic ALR suspension for refusing. You can lose your license for refusing AND get convicted anyway. Keep that math in mind as you read the stop below.",
            "You're pulled over. Officer suspects DWI and asks for a breath test. You refuse, thinking that protects you. What happens?"
          ]
        },
        {
          "id": "7.4",
          "title": "Module 7 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "TX adult DWI per-se limit:",
              "options": [
                "0.05",
                "0.08",
                "0.10"
              ],
              "correct": 1
            },
            {
              "q": "TX under-21 BAC threshold:",
              "options": [
                "0.02",
                "0.05",
                "Zero tolerance"
              ],
              "correct": 2
            },
            {
              "q": "At 0.08, crash risk vs sober:",
              "options": [
                "Same",
                "~4x",
                "Same as 0.05"
              ],
              "correct": 1
            },
            {
              "q": "TX has a numeric THC per-se limit:",
              "options": [
                "Yes",
                "No — judged at the stop",
                "Same as alcohol"
              ],
              "correct": 1
            },
            {
              "q": "OTC meds labeled \"no machinery\" apply to cars:",
              "options": [
                "No",
                "Yes",
                "Only at high doses"
              ],
              "correct": 1
            },
            {
              "q": "TX implied consent =",
              "options": [
                "Right to refuse always",
                "License = pre-consent to BAC testing",
                "Only for repeat offenders"
              ],
              "correct": 1
            },
            {
              "q": "First-refusal ALR suspension:",
              "options": [
                "60 days",
                "180 days",
                "2 years"
              ],
              "correct": 1
            },
            {
              "q": "Refusing the test:",
              "options": [
                "Stops the criminal case",
                "Triggers ALR; criminal case still proceeds",
                "Carries no penalty"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M8",
      "num": 8,
      "title": "Buying & Maintaining a Vehicle",
      "blurb": "Insurance, registration, inspections, and the maintenance you actually need to do.",
      "chapters": [
        {
          "id": "8.1",
          "title": "TX insurance minimums and what they don't cover",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Texas law requires you to carry liability insurance to drive legally — it's called financial responsibility, and it lives in Transportation Code Chapter 601. The whole idea is simple: if you cause a crash, there has to be money behind your name to pay for the damage you did to other people. Driving without it is a ticket the first time and escalates fast after that.",
            "The state minimum is written as three numbers: 30/60/25. That means $30,000 for bodily injury per person, $60,000 total bodily injury per accident, and $25,000 for property damage. So if you injure two people in one crash, there's $30k available for each, capped at $60k combined, plus up to $25k for the cars and property you damaged.",
            "Now the part that catches new drivers completely off guard: liability insurance does not cover you or your car. Read that again. It pays for the OTHER party's injuries and property when you're at fault. Your own bent fender, your own hospital bill — liability pays none of it. It exists to protect other people from you, not to protect you.",
            "It also runs out faster than you'd think. A single trip to the ER plus a few days in a hospital can blow past $30,000 easily, and a newer SUV can cost more than $25,000 to replace. If you cause a serious crash and the bills exceed your limits, the injured party can come after YOU personally for the difference — your wages, your savings, your future. The minimum is a floor, not a comfortable cushion.",
            "To protect your own car, you need two more coverages. Collision pays to repair or replace your car after a crash, no matter who was at fault. Comprehensive (sometimes called 'other than collision') covers the non-crash stuff: theft, vandalism, hail, flood, a falling branch, hitting a deer. People bundle the two and call the combination 'full coverage,' though that phrase is informal, not a legal term.",
            "Here's a piece of real financial judgment most adults get wrong: full coverage isn't always worth buying. Collision and comprehensive only ever pay up to what your car is currently worth, minus your deductible. If your car is worth around $3,000 and full coverage costs you $1,200 a year with a $1,000 deductible, you're paying a lot to protect a little. On an old, cheap car, dropping to liability-only is a rational, defensible choice.",
            "One coverage almost everyone should add is Uninsured/Underinsured Motorist, or UM/UIM. It's optional in Texas, usually cheap, and it covers YOUR injuries and damage when the other driver is at fault but has no insurance — or not enough of it. It's the mirror image of liability: liability protects others from you, UM/UIM protects you from the other guy's empty pockets.",
            "And those empty pockets are common here. Texas has one of the higher uninsured-driver rates in the country — roughly 1 in 7 drivers on the road carries no insurance at all. So the scenario UM/UIM covers isn't rare bad luck; it's a routine Tuesday. If an uninsured driver totals your car and breaks your arm, without UM/UIM you're paying for both yourself.",
            "Insurance companies are legally required to OFFER you UM/UIM coverage in Texas, and you have to reject it in writing if you don't want it. That rule exists precisely because so many people would otherwise skip it and get wiped out by an uninsured driver. When you see that line on the form, the default smart answer for a young driver is to keep it.",
            "Put it together and you can read your own policy like an adult. Liability (required, 30/60/25 minimum) handles what you owe others. Collision and comprehensive (optional) handle your own car, and only make sense while the car is worth enough to bother. UM/UIM (optional but cheap) handles the at-fault driver who can't pay. Knowing which bucket does what is the difference between buying insurance and just hoping you bought the right kind."
          ],
          "keyPoints": [
            "TX requires liability insurance — financial responsibility law, Transportation Code Ch. 601",
            "Minimum is 30/60/25: $30k injury per person / $60k per accident / $25k property",
            "Liability covers OTHERS, not you — your own car and injuries aren't covered by it",
            "Collision + comprehensive = informal 'full coverage' for your own car",
            "UM/UIM is optional but cheap, and ~1 in 7 TX drivers is uninsured",
            "Liability-only is rational once a car is worth less than full coverage costs to carry"
          ],
          "quiz": [
            {
              "q": "TX minimum liability insurance is written as:",
              "options": [
                "25/50/15",
                "30/60/25",
                "100/300/100"
              ],
              "correct": 1,
              "why": "30/60/25 — $30k bodily injury per person / $60k per accident / $25k property damage."
            },
            {
              "q": "The law that requires TX drivers to carry insurance is:",
              "options": [
                "The implied consent law",
                "The financial responsibility law (Transportation Code Ch. 601)",
                "The lemon law"
              ],
              "correct": 1,
              "why": "Chapter 601 is Texas's financial responsibility (mandatory insurance) law."
            },
            {
              "q": "Liability insurance covers:",
              "options": [
                "Your car and the other party's",
                "Only the other party's injuries and property when you're at fault",
                "Your own injuries only"
              ],
              "correct": 1,
              "why": "Liability pays what you owe others; it does NOT cover your own car or injuries."
            },
            {
              "q": "In '30/60/25', the $60,000 figure is:",
              "options": [
                "Property damage per accident",
                "Total bodily injury per accident",
                "Bodily injury per person"
              ],
              "correct": 1,
              "why": "$30k is per person, $60k is the total bodily-injury cap per accident, $25k is property damage."
            },
            {
              "q": "'Full coverage' informally means liability plus:",
              "options": [
                "UM/UIM only",
                "Collision and comprehensive",
                "Rental reimbursement"
              ],
              "correct": 1,
              "why": "Collision (your crash damage) + comprehensive (theft, weather, etc.) added to liability is called full coverage."
            },
            {
              "q": "UM/UIM (uninsured/underinsured motorist) coverage pays:",
              "options": [
                "When YOU have no insurance",
                "Your damages when the at-fault driver is uninsured or underinsured",
                "For theft only"
              ],
              "correct": 1,
              "why": "UM/UIM covers your injuries and damage when the at-fault driver can't pay."
            },
            {
              "q": "Roughly what share of Texas drivers carry no insurance?",
              "options": [
                "About 1 in 50",
                "About 1 in 7",
                "Essentially none — it's required"
              ],
              "correct": 1,
              "why": "TX has one of the higher uninsured rates in the U.S., around 1 in 7 drivers."
            },
            {
              "q": "Dropping to liability-only makes the most sense when:",
              "options": [
                "You just bought a brand-new car",
                "Your car is worth less than full coverage costs to carry",
                "You're a brand-new driver"
              ],
              "correct": 1,
              "why": "Collision/comprehensive only pays up to the car's value, so on a cheap car the premium can exceed any payout."
            }
          ],
          "worked": {
            "setup": "You're at fault in a crash on a Dallas highway. You carry only the TX minimum, 30/60/25. You rear-end a newer SUV: the driver has $40,000 in medical bills and the SUV costs $35,000 to replace. You also wrecked your own $6,000 car.",
            "walkthrough": "Let's run the numbers against your limits. Their injuries are $40,000, but your bodily-injury limit is $30,000 per person — so insurance pays $30k and you personally owe the remaining $10,000. Their SUV is $35,000, but your property-damage limit is $25,000 — so insurance pays $25k and you personally owe another $10,000. That's $20,000 coming out of your pocket, and the injured driver can legally pursue your wages and savings to collect it. Now your own car: liability covers NONE of it, so unless you carried collision, the $6,000 to fix or replace your car is also yours to eat. The lesson isn't 'buy the minimum and you're fine' — the minimum left you personally on the hook for $20,000 plus your own totaled car. Higher liability limits and collision coverage exist exactly for this."
          },
          "miniScenario": {
            "prompt": "You're buying insurance on your first car, a reliable but old sedan worth about $2,500. The agent offers full coverage (collision + comprehensive) for $1,300/year with a $1,000 deductible, plus UM/UIM for an extra $80/year. What's the smart build?",
            "options": [
              "Full coverage AND UM/UIM — always buy the most protection available.",
              "Liability + UM/UIM, and skip collision/comprehensive on a $2,500 car.",
              "Liability only — skip both the full coverage and the UM/UIM to save money."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "More isn't automatically smarter. Collision/comprehensive only ever pays up to the car's $2,500 value minus your $1,000 deductible — so the most it'd ever pay is ~$1,500, and you're paying $1,300/year for that. On a cheap car the math doesn't work."
              },
              "1": {
                "good": true,
                "body": "This is the financially literate answer. Full coverage costs more per year than it could ever pay back on a $2,500 car, so you skip it. But UM/UIM is only $80 and protects YOU from the ~1-in-7 uninsured drivers in Texas — that's a cheap, high-value keep. Match coverage to the car's worth and the real risks."
              },
              "2": {
                "good": false,
                "body": "Dropping collision/comprehensive on a cheap old car is reasonable — but skipping the $80 UM/UIM is a mistake. With 1 in 7 TX drivers uninsured, that tiny premium is what stands between you and paying your own medical bills after someone with no insurance hits you."
              }
            }
          }
        },
        {
          "id": "8.2",
          "title": "Registration, inspection, title transfer",
          "minutes": 35,
          "type": "reading",
          "body": [
            "Vehicle registration: required annually. Window sticker. Cost varies by county and weight, typically $50–$80. Buy or renew at the county tax office or online via TxDMV.",
            "Vehicle inspection: TX phased out the safety inspection in 2025 for most vehicles. Emissions inspections are still required in 17 counties (DFW, Houston, Austin, El Paso). Done at any state-licensed inspection station.",
            "Title transfer: when you buy/sell a car, the title must transfer at the county tax office within 30 days of sale. Both parties sign. Buyer pays sales tax (6.25% of purchase price, with a presumptive minimum so you can't buy your friend's $5k car for \"$1\"). Penalty for late transfer: $25/month, capped at $250."
          ],
          "keyPoints": [
            "Register annually — county tax office or TxDMV online",
            "Safety inspection phased out 2025; emissions still required in 17 counties",
            "Title must transfer within 30 days of sale",
            "6.25% sales tax on purchase, with presumptive minimum"
          ],
          "quiz": [
            {
              "q": "How often is a TX vehicle registration renewed?",
              "options": [
                "Every 6 months",
                "Annually",
                "Every 2 years"
              ],
              "correct": 1,
              "why": "Annual."
            },
            {
              "q": "After buying a used car, you must transfer the title within:",
              "options": [
                "7 days",
                "30 days",
                "90 days"
              ],
              "correct": 1,
              "why": "30 days; $25/month penalty capped at $250."
            },
            {
              "q": "TX sales tax rate on a vehicle purchase:",
              "options": [
                "4%",
                "6.25%",
                "8.25%"
              ],
              "correct": 1,
              "why": "6.25% with a presumptive minimum to prevent fake low-price sales."
            }
          ]
        },
        {
          "id": "8.3",
          "title": "Tire pressure, fluids, and the warning lights you can't ignore",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Think of basic car maintenance as the cheap insurance you actually control. Most of the breakdowns and a surprising number of crashes that strand teen drivers come from three boring things being ignored: tire pressure, fluid levels, and warning lights. None of them require a mechanic to monitor — they require you to look, on a schedule, before something fails at 70 mph.",
            "Start with tires, because they're the only part of a 3,000-pound car actually touching the road. Check the pressure about once a month and before any long trip, using a cheap gauge while the tires are cold (driving heats them and throws the reading off). Underinflated tires flex, overheat, lose grip, and are the leading cause of blowouts — the exact failure most likely to put a new driver into a guardrail.",
            "Here's the detail almost everyone gets wrong: the correct pressure is NOT the big number printed on the tire's sidewall. That sidewall number is the tire's maximum, not the recommendation. The right number lives on a sticker inside the driver's door jamb (or in the owner's manual), set by the people who built your specific car. Inflate to the door-jamb number, not the sidewall.",
            "Texas weather messes with this more than you'd think. Tire pressure drops about 1 PSI for every 10°F the temperature falls, so a cold January morning after a warm December can quietly leave all four tires low. That's why your tire-pressure warning light often pops on during the first real cold snap — the air didn't leak, it just contracted.",
            "Most cars built since 2008 have a Tire Pressure Monitoring System (TPMS), which is federally required and shows up as a little horseshoe-with-an-exclamation-point light. Treat it as a prompt, not the whole job — it usually only warns once a tire is already significantly low (around 25% under), so a monthly manual check still catches problems earlier than the light does.",
            "Move to fluids, and engine oil is the one that matters most. Oil is what keeps metal engine parts from grinding themselves to scrap, and running low or empty can destroy an engine fast. Check it about monthly: park level, engine off, wait a minute for the oil to settle, then pull the dipstick, wipe it, reinsert it fully, and pull it again to read the real level between the two marks.",
            "Beyond oil, learn where the other reservoirs live and roughly what 'normal' looks like: coolant (keeps the engine from overheating — never open a hot one), brake fluid, and windshield washer fluid. You don't need to be a mechanic; you need to recognize when one is low or the color looks wrong, because catching it early is the difference between a $20 top-up and a towed car.",
            "Now the dashboard, where color is the whole language. A SOLID amber light (check engine, ABS, traction) means 'something needs attention soon, drive gently and get it looked at' — it's a problem, not an emergency. You can usually finish your drive and book the shop, but don't ignore it for weeks.",
            "A FLASHING amber check-engine light is a different animal: it means active engine misfiring that can destroy your catalytic converter — an expensive part — in a short drive. Flashing amber means reduce speed, stop driving as soon as it's safe, and get it diagnosed before you drive it again. The flash is the car upgrading 'soon' to 'now.'",
            "A RED light is the one rule you can never bend: red means stop the car safely as soon as you possibly can. Red oil-pressure, temperature, and brake warnings signal that something is failing RIGHT NOW. A red oil-pressure light with the engine running can mean the engine is losing lubrication, and continuing to drive even 30 seconds can turn a sensor problem into a $4,000 seized engine. Amber asks; red demands."
          ],
          "keyPoints": [
            "Check tire pressure monthly with a gauge while tires are COLD",
            "Correct PSI is on the door-jamb sticker, NOT the tire sidewall (sidewall = max)",
            "Cold drops pressure ~1 PSI per 10°F; TPMS (2008+) only warns when already ~25% low",
            "Check engine oil monthly: level car, engine off, wipe-reinsert-reread the dipstick",
            "Dashboard color: solid amber = caution, flashing amber = stop soon, RED = stop NOW",
            "A red oil-pressure light + 30 seconds of driving can mean a $4,000 engine"
          ],
          "quiz": [
            {
              "q": "Where is the correct tire pressure for your car listed?",
              "options": [
                "The big number on the tire sidewall",
                "The sticker on the driver's door jamb",
                "It's whatever feels right"
              ],
              "correct": 1,
              "why": "The door-jamb sticker is the manufacturer's recommendation; the sidewall number is the tire's MAX."
            },
            {
              "q": "You should check tire pressure with the tires:",
              "options": [
                "Hot, right after a long drive",
                "Cold, before driving (or after sitting a while)",
                "It doesn't matter"
              ],
              "correct": 1,
              "why": "Driving heats tires and inflates the reading; cold readings are accurate."
            },
            {
              "q": "Tire pressure changes with temperature by about:",
              "options": [
                "1 PSI per 10°F",
                "1 PSI per 50°F",
                "It doesn't change with temperature"
              ],
              "correct": 0,
              "why": "Roughly 1 PSI per 10°F drop — which is why TPMS lights pop on during cold snaps."
            },
            {
              "q": "The TPMS warning light typically turns on:",
              "options": [
                "The instant a tire loses any air",
                "Only once a tire is already significantly low (~25% under)",
                "Only if a tire is completely flat"
              ],
              "correct": 1,
              "why": "TPMS warns late, around 25% under, so a monthly manual check still catches problems sooner."
            },
            {
              "q": "The correct way to read the engine oil dipstick is:",
              "options": [
                "Pull it once and read immediately",
                "Engine off and level, then wipe, reinsert fully, and pull again to read",
                "Read it with the engine running"
              ],
              "correct": 1,
              "why": "Wiping and rechecking gives an accurate level; the engine should be off and the car level."
            },
            {
              "q": "A SOLID amber dashboard light generally means:",
              "options": [
                "Stop the car immediately",
                "A problem needs attention soon — drive gently and get it checked",
                "Everything is fine"
              ],
              "correct": 1,
              "why": "Solid amber is caution, not emergency: finish the drive carefully and book the shop."
            },
            {
              "q": "A FLASHING amber check-engine light means:",
              "options": [
                "Ignore it — flashing is less serious than solid",
                "Active misfire that can damage the engine — stop driving soon",
                "It's just a bulb test"
              ],
              "correct": 1,
              "why": "A flashing check-engine light signals active misfiring that can quickly damage the catalytic converter/engine."
            },
            {
              "q": "A RED oil-pressure warning light while driving means:",
              "options": [
                "Top up oil at the next station whenever",
                "Stop the car safely as soon as possible — driving on can destroy the engine",
                "Drive faster to get home before it fails"
              ],
              "correct": 1,
              "why": "Red = stop NOW; continuing even ~30 seconds can seize the engine into a ~$4,000 repair."
            }
          ],
          "worked": {
            "setup": "It's a 28°F morning in Lubbock — way colder than the warm week before. You start the car and the tire-pressure (TPMS) light is glowing. The tires look fine and the car drives normally. What's actually going on, and what do you do?",
            "walkthrough": "Run the physics first. Pressure drops about 1 PSI per 10°F, so a sharp overnight cold snap can pull every tire down several PSI at once — the air didn't leak, it contracted. That's the most likely reason all four tripped the TPMS light on the same cold morning. The move: drive gently to a gas station, check each tire with a gauge while they're still cold, and inflate to the number on your DRIVER'S DOOR JAMB sticker (not the bigger 'max' number on the sidewall). After they warm up the reading will rise a bit, which is normal — set them cold to the door-jamb spec. If the light comes back on within a day or two after you've set them correctly, THEN you likely have a real slow leak or a nail, and that's a shop visit. Don't ignore the light just because the car feels fine; underinflated tires are the top cause of blowouts."
          },
          "miniScenario": {
            "prompt": "You're 20 minutes into a drive when a RED oil-pressure light suddenly comes on. The engine sounds normal and you're only 5 minutes from home. What do you do?",
            "options": [
              "Keep going — it's only 5 more minutes and the engine sounds fine.",
              "Pull over safely as soon as you can, shut the engine off, and check the oil / call for help.",
              "Speed up to get home faster before anything can go wrong."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Red means NOW, not 'in five minutes.' A red oil-pressure light can mean the engine is losing lubrication, and metal parts can seize in well under a minute of driving. 'It sounds fine' is what people say right before a $4,000 engine. Five more minutes is plenty of time to destroy it."
              },
              "1": {
                "good": true,
                "body": "Exactly right. Red = stop safely ASAP. Getting off the road and shutting the engine off protects it from seizing. Then check the oil level if you can, and if it's low or you're unsure, call for help rather than driving it. A tow is cheap; a replacement engine is not."
              },
              "2": {
                "good": false,
                "body": "The worst possible choice. More RPM with low oil pressure means faster metal-on-metal wear — you'd be accelerating the exact damage the light is warning about. Red lights are not a race-home signal."
              }
            }
          }
        },
        {
          "id": "8.4",
          "title": "Buying a used car — title, lemon law, and the traps",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Texas Transportation Code §501.145 gives you 30 days from the date of sale to transfer the title into your name. Miss that window and you start accruing a $25 penalty plus another $25 every month, capped at $250. More importantly, the seller can still legally rack up tickets, tolls, and even crash liability against the old title until you transfer it. Always do the transfer at the county tax office — not \"I'll mail it in later.\" Bring the signed title, a bill of sale, proof of insurance in your name, and the odometer disclosure (federally required for any car under 20 years old). The odometer disclosure isn't a formality: rolling back an odometer is a federal felony under 49 USC §32703, and the buyer's remedy includes triple damages.",
            "Before you sign anything, do three checks. First, run the VIN — the 17-character number on the dash and door jamb — through the National Motor Vehicle Title Information System (vehiclehistory.gov) or CarFax/AutoCheck. You're looking for salvage titles, flood titles, odometer rollback flags, and undisclosed wrecks. Second, get an independent mechanic to inspect the car before purchase — $100–$150 at any shop, and it pays for itself the first time it catches a $4,000 transmission issue. Third, check the seller. A private seller has to hand you a signed title in their name. If the title is in someone else's name (\"my cousin owns it but I'm selling it for him\"), walk away — that's called a curbstone sale, it's illegal in TX, and you'll likely end up with a car you can't register.",
            "The TX Lemon Law (Texas Occupations Code Chapter 2301) covers NEW vehicles, not used ones, and only for defects that substantially impair use, value, or safety. The thresholds: four repair attempts for the same defect in the first 24 months/24,000 miles, OR two attempts for a serious safety defect, OR 30 days out of service for repair. For used cars, you have weaker protection — Texas does not impose an implied warranty of merchantability on most private used-car sales, and dealers are allowed to sell \"as-is\" if they post the federal Buyers Guide window sticker. \"Buy here, pay here\" lots are where teens get crushed: interest rates of 20–29% APR, GPS kill switches that disable the car if you're a day late, and arbitration clauses that strip your right to sue. Read the contract. If it has the words \"GPS disabling device,\" that's a \"no.\" If you can't get financing through a credit union or a bank, the car isn't the right car for you yet — not because dealers say it isn't, because the math says it isn't."
          ],
          "keyPoints": [
            "Title transfer within 30 days of purchase (TX Transp. Code §501.145) — fines and liability stack if you miss it",
            "Run the VIN, get a pre-purchase inspection, and verify the title is in the seller's name",
            "Odometer rollback = federal felony (49 USC §32703) + triple damages to buyer",
            "TX Lemon Law (Occ. Code Ch. 2301) is NEW cars only — 4 repair attempts, 2 for safety, or 30 days out of service",
            "Avoid buy-here-pay-here: 20–29% APR, GPS kill switches, no real recourse"
          ],
          "quiz": [
            {
              "q": "You buy a used 2019 Civic from a private seller on March 1. Under TX Transp. Code §501.145, you must transfer the title into your name by:",
              "options": [
                "March 8 (7 days).",
                "March 31 (30 days).",
                "May 30 (90 days).",
                "Whenever you renew the registration."
              ],
              "correct": 1,
              "why": "TX gives you 30 days from the date of sale to transfer title. Miss it and a $25/month penalty stacks, plus the seller stays liable on the old title for tickets and tolls until you complete the transfer."
            },
            {
              "q": "A dealer offers you a 2017 truck with the federal Buyers Guide sticker marked \"AS IS — NO WARRANTY.\" Two weeks later the transmission fails. The TX Lemon Law:",
              "options": [
                "Covers you fully — the truck is defective.",
                "Covers you because the dealer should have caught it.",
                "Does not apply — the Lemon Law (Tex. Occ. Code Ch. 2301) covers NEW vehicles only, and an \"as-is\" sale waives most implied warranties.",
                "Requires the dealer to give you a refund within 30 days regardless."
              ],
              "correct": 2,
              "why": "TX Occ. Code Ch. 2301 is a new-vehicle statute. For used cars sold \"as-is\" with the federal Buyers Guide posted, the dealer has disclaimed implied warranties. This is exactly why pre-purchase mechanic inspections matter — once you sign, the recourse is limited."
            },
            {
              "q": "Which of these is the strongest red flag in a private used-car sale?",
              "options": [
                "The car is older than 10 years.",
                "The seller wants payment in cash.",
                "The title is in someone else's name and the seller says they're \"selling it for a friend.\"",
                "The car has aftermarket wheels."
              ],
              "correct": 2,
              "why": "A title in a different name is the signature of a curbstone sale — illegal in TX, and you'll likely be unable to register the car. The other items can be normal in a private sale; a mismatched title cannot."
            }
          ]
        },
        {
          "id": "8.5",
          "title": "Module 8 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "TX minimum liability insurance:",
              "options": [
                "25/50/15",
                "30/60/25",
                "100/300/100"
              ],
              "correct": 1
            },
            {
              "q": "Liability covers:",
              "options": [
                "Your car",
                "Others you damage",
                "Both"
              ],
              "correct": 1
            },
            {
              "q": "UM/UIM is for:",
              "options": [
                "When you're uninsured",
                "When the other driver is",
                "Theft"
              ],
              "correct": 1
            },
            {
              "q": "Vehicle registration is renewed:",
              "options": [
                "Every 6 months",
                "Annually",
                "Every 2 years"
              ],
              "correct": 1
            },
            {
              "q": "Title transfer deadline after sale:",
              "options": [
                "7 days",
                "30 days",
                "90 days"
              ],
              "correct": 1
            },
            {
              "q": "Correct tire PSI is on:",
              "options": [
                "The tire sidewall",
                "The door jamb",
                "The owner's manual only"
              ],
              "correct": 1
            },
            {
              "q": "Red oil-pressure warning light:",
              "options": [
                "Drive to a shop",
                "Stop now",
                "Top up at next station"
              ],
              "correct": 1
            },
            {
              "q": "Tire pressure drops approximately:",
              "options": [
                "1 PSI / 10°F",
                "1 PSI / 30°F",
                "Doesn't change"
              ],
              "correct": 0
            }
          ]
        }
      ]
    },
    {
      "id": "M9",
      "num": 9,
      "title": "Texas-Specific Laws",
      "blurb": "TX laws every driver here has to know — Move Over, Lisa Torry Smith, anti-texting, GDL.",
      "chapters": [
        {
          "id": "9.1",
          "title": "TX traffic code highlights you'll be tested on",
          "minutes": 60,
          "type": "reading",
          "body": [
            "Most of traffic law is just one idea dressed up in a thousand outfits: be predictable. Every rule below exists so that the strangers around you can guess what you're about to do. When you signal, when you light your headlights, when you hold the speed everyone expects on that road, you're sending the other drivers a message they can act on. Break the pattern and people guess wrong, and wrong guesses at 60 mph are how crashes happen.",
            "Start with speed. Texas has default 'prima facie' limits that apply even when no sign is posted: 30 mph on a residential street, 70 mph on most highways, and 75 (occasionally up to 85 on a few designated rural tollways) on rural interstates. A posted sign always overrides the default — if the sign says 45, the limit is 45 no matter what the road looks like. And a missing sign never means 'no limit'; it means the statutory default kicks in.",
            "Here's the part new drivers underestimate: speed isn't only about the ticket. Going roughly 10+ over the posted limit is where many Texas prosecutors start treating it as reckless rather than a simple infraction, especially in a school or construction zone. But the real cost is physics — your stopping distance grows with the square of your speed, so going from 30 to 40 doesn't add a third more stopping distance, it nearly doubles it. The number on the sign is a safety ceiling, not a target.",
            "Headlights are a visibility rule, and the law is specific. In Texas you must run your headlights from 30 minutes after sunset until 30 minutes before sunrise. That twilight buffer matters — the half hour after the sun drops is when your eyes are adjusting and you're hardest to see. So 'it's not dark yet' is not a defense; the clock, not the brightness, decides.",
            "The headlight rule has a second trigger that has nothing to do with time of day: any time visibility drops below 1,000 feet, lights are required. That covers heavy rain, fog, dust storms, and smoke. Rain by itself doesn't automatically demand headlights, but rain heavy enough to cut your sight line does — and turning them on also makes YOU visible, which is the bigger point. Daytime running lights are not the same as headlights, and they don't light up your taillights.",
            "Turn signals are the cheapest safety device in the car, and Texas requires them for every turn and every lane change — no exceptions for 'I'm only moving over one lane.' The signal must come on at least 100 feet before the maneuver on a residential street, and you need more lead time at highway speed because cars are covering ground faster. Signaling as you're already turning is almost useless; the whole point is to warn people BEFORE you move.",
            "Seat belts in Texas are not an 'adults' choice, kids buckle up' rule — they're required for every occupant, in every seat, front and back. If anyone under 17 in your car is unbelted, YOU the driver get the ticket, even if they're in the back seat. Passengers 17 and over are legally responsible for themselves, but you're the one who has to insist, because in a crash an unbelted back-seat passenger becomes a projectile that can kill the people up front.",
            "Right-of-way rules are really just tie-breakers for who goes first so two cars don't try to occupy the same space. At a four-way stop, first to arrive goes first; if you arrive together, the car on the right has it. You yield when entering a road, when turning left across traffic, and to any vehicle already in the intersection. 'I had the right of way' is never a thing you get to say after a crash — right-of-way is something you give, not something you take.",
            "Following distance ties all of this together. Texas doesn't post a magic number, but the standard taught and tested is the three-second rule: pick a fixed point ahead, and when the car in front passes it, you should be able to count 'one-one-thousand, two-one-thousand, three-one-thousand' before you reach the same point. Double it to six seconds in rain, more on ice. Tailgating erases every other margin you've built; it's the single habit that turns a small mistake ahead of you into your crash.",
            "Put it together and the through-line is obvious: the code isn't a list of arbitrary 'gotchas,' it's a shared script. Hold the expected speed, light up when you're supposed to, announce every move 100 feet early, keep everyone belted, give right-of-way instead of grabbing it, and leave three seconds of air. Do those six things and you're predictable — and predictable drivers almost never surprise anyone into a crash."
          ],
          "keyPoints": [
            "Default speeds: 30 residential, 70 most highways, 75–85 some rural interstates; posted sign always wins",
            "Headlights: 30 min after sunset to 30 min before sunrise, OR visibility under 1,000 ft",
            "Signal every turn AND lane change, at least 100 ft ahead (more on highways)",
            "Seat belts: ALL occupants, all seats — driver ticketed for any unbelted passenger under 17",
            "Right-of-way is given, not taken; four-way stop = first there goes, ties go to the right",
            "Following distance: 3 seconds dry, double it in rain"
          ],
          "quiz": [
            {
              "q": "Default residential speed limit in TX when no sign is posted:",
              "options": [
                "25 mph",
                "30 mph",
                "35 mph",
                "40 mph"
              ],
              "correct": 1,
              "why": "30 mph is the statutory default for a residential street unless a posted sign says otherwise. A missing sign means the default applies — not 'no limit.'"
            },
            {
              "q": "When are headlights required in Texas?",
              "options": [
                "Only after it's fully dark",
                "From 30 min after sunset to 30 min before sunrise, OR whenever visibility is under 1,000 ft",
                "Only on highways",
                "Only when it's raining"
              ],
              "correct": 1,
              "why": "Two triggers: the time-of-day window (30 min after sunset to 30 min before sunrise) OR low visibility under 1,000 ft. Either one requires lights."
            },
            {
              "q": "A turn signal must be activated at least how far before the maneuver on a residential street?",
              "options": [
                "10 feet",
                "100 feet",
                "5 feet",
                "Only at the moment you turn"
              ],
              "correct": 1,
              "why": "100 feet minimum on a residential street, and more at highway speed since you cover ground faster. The point is to warn people BEFORE you move."
            },
            {
              "q": "Your 15-year-old sibling rides unbelted in your back seat and you get pulled over. Who gets the seat-belt citation?",
              "options": [
                "Your sibling, since it's their seat belt",
                "You, the driver — you're responsible for any passenger under 17",
                "Nobody, back-seat belts are optional",
                "Both of you equally"
              ],
              "correct": 1,
              "why": "Texas requires belts for all occupants in all seats. The driver is cited for any unbelted passenger under 17, regardless of which seat they're in."
            },
            {
              "q": "You and another car reach a four-way stop at the exact same time. Who has the right-of-way?",
              "options": [
                "The faster car",
                "The car on the right",
                "Whoever is going straight",
                "The larger vehicle"
              ],
              "correct": 1,
              "why": "First to arrive goes first; on a simultaneous arrival, the vehicle on the right has the right-of-way. Right-of-way is given, not grabbed."
            },
            {
              "q": "The three-second following-distance rule in dry conditions should be adjusted to roughly how much in heavy rain?",
              "options": [
                "Stay at three seconds",
                "Cut it to one second",
                "About six seconds (double it)",
                "Tailgate to see better"
              ],
              "correct": 2,
              "why": "Wet pavement roughly cuts traction, so double the gap to about six seconds — and more on ice. Following distance is the margin that absorbs a mistake ahead of you."
            },
            {
              "q": "Going roughly 10+ mph over the posted limit in Texas is significant mainly because:",
              "options": [
                "It's always a felony",
                "Many prosecutors treat it as reckless, and your stopping distance grows with the square of speed",
                "It has no real consequence",
                "It only matters on toll roads"
              ],
              "correct": 1,
              "why": "Beyond the heavier citation risk, stopping distance increases with the square of speed — the physics, not just the ticket, is the real danger."
            },
            {
              "q": "Daytime running lights (DRLs) satisfy the Texas headlight requirement at night because:",
              "options": [
                "They're just as bright as headlights",
                "They don't — DRLs usually don't light your taillights, so they don't meet the requirement",
                "They turn on the high beams",
                "They're only for highways"
              ],
              "correct": 1,
              "why": "DRLs generally don't activate your taillights and aren't a substitute for headlights when the time-of-day or low-visibility trigger applies. Turn the actual headlights on."
            }
          ],
          "worked": {
            "setup": "It's 7:50 p.m. in late October in San Antonio. The sun set at 7:25, so you're 25 minutes past sunset — still some glow in the sky. You're driving your 16-year-old cousin home on a 30-mph residential street and you need to make a left into their driveway. Your cousin is in the back seat, unbelted, scrolling their phone.",
            "walkthrough": "Three separate rules are live in this one trip. Headlights: you're 25 minutes after sunset, so you're inside the 'not yet required' window for another 5 minutes — but the smart move is lights ON now, because dusk is exactly when you're hardest to see and the rule flips the moment you hit 30 minutes anyway. Seat belt: your cousin is under 17 and unbelted, so if you're stopped, YOU get the citation, not them — you tell them to buckle before you roll. Turn signal: you flip the left blinker on at least 100 feet before the driveway, not as you start cutting the wheel, so the car behind you knows to back off. None of these is hard; the failure mode is just forgetting that all three apply at once on an ordinary two-minute drive."
          },
          "miniScenario": {
            "prompt": "You pull up to a four-way stop at the exact same moment as a pickup directly to your right. You both stopped at the same time. Who goes first?",
            "options": [
              "You do — you're going straight and they look like they're turning.",
              "The pickup on your right goes first.",
              "Whoever revs and rolls forward first; it's a free-for-all."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Going straight doesn't earn you priority over a simultaneous arrival. When two cars reach a four-way stop at the same time, the tie-breaker is the car on the RIGHT — which here is the pickup, not you."
              },
              "1": {
                "good": true,
                "body": "Exactly. First to arrive goes first; on a true tie, the vehicle on the right has the right-of-way. You yield, the pickup clears, then you go. Right-of-way is something you give."
              },
              "2": {
                "good": false,
                "body": "Treating it as a 'whoever's bravest' contest is how two cars try to occupy the same square of pavement. The rule exists precisely so nobody has to guess — tie goes to the right."
              }
            }
          }
        },
        {
          "id": "9.2",
          "title": "Anti-texting, Move Over, Lisa Torry Smith Act",
          "minutes": 50,
          "type": "reading",
          "body": [
            "Three Texas laws exist because somebody died or got maimed, and the legislature decided the old rules weren't enough. Anti-texting, Move Over, and the Lisa Torry Smith Act are not random bureaucracy — each one is a fence built at the edge of a specific cliff people kept driving off. Learn them as stories, not statute numbers, and they'll stick.",
            "The anti-texting law, Transportation Code §545.4251, took effect statewide in 2017 and bans writing, sending, or reading an electronic message while driving. First offense runs $25 to $99; a repeat is $100 to $200. The myth is that 'I was only reading it, not typing' gets you off — it doesn't, because reading is named in the statute, and even if it weren't, holding the phone gives an officer a separate distracted-driving citation. If you're under 18 on a provisional license, the rule is harsher still: NO wireless device at all, hands-free included.",
            "Why the law is so blunt about it: sending or reading a text takes your eyes off the road for about five seconds. At 55 mph, five seconds is the length of a football field traveled essentially blind. You are not 'multitasking' — your brain is time-slicing, and the slices it spends on the phone are slices where you are an unguided missile. The law is just trying to claw those five seconds back.",
            "The Move Over / Slow Down law, §545.157, protects the people standing on the shoulder who can't protect themselves. When ANY vehicle with activated flashing lights is stopped on the shoulder — police, fire, EMS, a tow truck, a TxDOT crew, even a stranded motorist with hazards in some applications — you have two legal choices: move over a full lane away from them, or, if you can't move over safely, slow to 20 mph below the posted limit (or to 5 mph if the limit is 25 or less).",
            "The penalties on Move Over climb fast because the harm is so predictable. A first offense with no harm is a fine up to $200; subsequent or aggravated offenses run up to $500; and if you cause bodily injury, it jumps to a Class B misdemeanor with up to $2,000 and possible jail time. Roadside workers and troopers get killed every year by drivers who 'didn't see' a wall of flashing lights — the law assumes you can see them and punishes you for not acting on it.",
            "The Lisa Torry Smith Act, §552.0085, took effect in 2021 and is named for a mother killed in a crosswalk while walking her son to school. Before this law, a driver who hit a pedestrian and 'only' failed to yield often faced little more than a traffic ticket. The Act changed that: failing to yield to a pedestrian and causing injury can now be a criminal misdemeanor or, when the injury is serious bodily injury, a state-jail felony carrying up to two years.",
            "The detail that trips drivers up: the duty to stop applies to UNMARKED crosswalks too, not just the painted ones with a sign. At basically any intersection, an invisible crosswalk extends across the road along the line of the sidewalks, and a pedestrian in it has the right-of-way. You don't get to argue 'there were no white lines' — the legal crosswalk is there whether or not anyone painted it.",
            "Here's how to actually drive these three laws instead of just memorizing them. Phone: it lives in a cupholder or your pocket, not your hand, the entire time the car is in drive — set navigation before you roll. Flashing lights ahead on the shoulder: lift off, signal, move over a lane; if you genuinely can't, drop 20 under and creep past. Intersections: treat every corner as if a crosswalk is painted there, because legally one is, and scan the sidewalks before you turn.",
            "Notice the common thread — all three laws are about people who are more fragile than you in your two-ton steel box. The texter endangers everyone because their attention is gone. The Move Over violator endangers a worker standing exposed on the asphalt. The crosswalk violator endangers a pedestrian with nothing but skin between them and your bumper. Texas wrote bigger penalties precisely where the power imbalance is greatest.",
            "If you remember nothing else: these are the three laws most likely to turn an 'oops' into a criminal record before you're old enough to vote. A blown stop sign is a ticket. A text that ends in a pedestrian's injury, a failure to slow that hits a tow operator, a failure to yield in a crosswalk — those are the ones with the word 'felony' attached. The stakes aren't symmetric, so your caution shouldn't be either."
          ],
          "keyPoints": [
            "Anti-texting (§545.4251): no writing, sending, OR reading; $25–$99 first offense; under-18 provisional = no device at all",
            "Texting takes eyes off the road ~5 sec — a football field blind at highway speed",
            "Move Over (§545.157): flashing-light shoulder vehicle = move over a lane OR slow to 20 under the limit",
            "Move Over penalties: up to $200 first, up to $500 repeat, Class B + up to $2,000 if you cause injury",
            "Lisa Torry Smith Act (§552.0085): must yield to peds in UNMARKED crosswalks at intersections too",
            "Lisa Torry Smith Act: causing injury can be a misdemeanor or state-jail felony (up to 2 years)"
          ],
          "quiz": [
            {
              "q": "TX anti-texting law (§545.4251) fine for a first offense:",
              "options": [
                "$10–$25",
                "$25–$99",
                "$200–$500",
                "$500–$1,000"
              ],
              "correct": 1,
              "why": "$25–$99 for a first offense, $100–$200 for a repeat. The statute bans writing, sending, AND reading."
            },
            {
              "q": "Under §545.4251, the claim 'I was only reading the text, not typing' is:",
              "options": [
                "A valid defense — reading is legal",
                "Not a defense — reading is named in the statute and holding the phone invites a separate citation",
                "Only a defense for drivers over 18",
                "Only a defense in school zones"
              ],
              "correct": 1,
              "why": "Reading an electronic message is expressly covered, and merely holding the phone supports a separate distracted-driving citation."
            },
            {
              "q": "The Lisa Torry Smith Act (§552.0085) requires drivers to yield to pedestrians in:",
              "options": [
                "Marked crosswalks only",
                "Any crosswalk, including UNMARKED ones at intersections",
                "Only when a pedestrian signal is displayed",
                "Only on residential streets"
              ],
              "correct": 1,
              "why": "The Act covers unmarked crosswalks at intersections — the legal crosswalk exists along the sidewalk lines whether or not it's painted."
            },
            {
              "q": "TX Move Over law (§545.157) first-offense fine with no injury:",
              "options": [
                "Up to $200",
                "Up to $1,000",
                "Up to $2,000",
                "No fine, just a warning"
              ],
              "correct": 0,
              "why": "Up to $200 for a basic first offense; repeats run higher, and causing injury escalates to a Class B misdemeanor with up to $2,000 and possible jail."
            },
            {
              "q": "Under the Move Over law, if you cannot safely change lanes away from a flashing-light vehicle on the shoulder, you must:",
              "options": [
                "Maintain your speed and stay alert",
                "Slow to 20 mph below the posted limit",
                "Stop completely in your lane",
                "Speed up to clear the area faster"
              ],
              "correct": 1,
              "why": "The two legal options are move over a lane OR slow to 20 mph under the posted limit (5 mph if the limit is 25 or less)."
            },
            {
              "q": "Failing to yield to a pedestrian and causing serious bodily injury under the Lisa Torry Smith Act can be:",
              "options": [
                "Just a traffic ticket",
                "A state-jail felony carrying up to 2 years",
                "A parking violation",
                "Nothing, if the crosswalk was unmarked"
              ],
              "correct": 1,
              "why": "The Act elevated the penalty: causing injury can be a misdemeanor, and serious bodily injury can be a state-jail felony of up to two years."
            },
            {
              "q": "Roughly how far does a car travel at 55 mph during the ~5 seconds it takes to read or send a text?",
              "options": [
                "About 10 feet",
                "About the length of a football field",
                "About one car length",
                "Distance doesn't change while texting"
              ],
              "correct": 1,
              "why": "About five seconds eyes-off at 55 mph covers roughly the length of a football field — essentially driving that distance blind."
            },
            {
              "q": "For a 17-year-old on a TX provisional license, the rule on phones while driving is:",
              "options": [
                "Hands-free is allowed",
                "No wireless device use at all, hands-free included",
                "Texting is fine if you're stopped at a light",
                "Only navigation is banned"
              ],
              "correct": 1,
              "why": "Provisional (under-18) drivers face a total ban on wireless device use while driving — stricter than the general anti-texting rule, and hands-free does not exempt them."
            }
          ],
          "worked": {
            "setup": "You're driving 60 mph on a Texas highway when you see flashing amber lights on the right shoulder about a quarter mile ahead — a tow truck is hooking up a stalled car, and a person in a vest is standing beside it. There's a car in the lane to your left, but it's a couple seconds back.",
            "walkthrough": "The Move Over law, §545.157, gives you exactly two legal moves and you must pick one before you reach that tow truck. Best option: signal left, check the mirror and blind spot, and move over a full lane so there's an empty lane of buffer between you and the worker in the vest — the car to your left is far enough back to let you in. If a faster lane to your left made merging unsafe, your fallback is to stay put and slow to 20 mph under the limit, so down to 40, and ease past. What you may NOT do is hold 60 in the right lane a few feet from a person standing on the asphalt. Do that and clip them, and you're not looking at a fine — you're looking at a Class B misdemeanor, up to $2,000, and possible jail. The whole law is one decision made a quarter mile early."
          },
          "miniScenario": {
            "prompt": "You're stopped at a red light and a text from your group chat lights up your phone in the cupholder. The light is still red. What's the move?",
            "options": [
              "Read and reply now — you're stopped, so the law doesn't apply.",
              "Leave it; deal with it only after you're parked, because you're still 'driving' and could be cited.",
              "Glance at it quickly while the light is red, then put it down before green."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Being stopped at a light doesn't make you 'parked.' You're operating a vehicle in a travel lane, the light can turn green mid-text, and an officer can still cite you. The five-second eyes-off habit you build at the light is the same habit that kills at speed."
              },
              "1": {
                "good": true,
                "body": "Right. The safe and legal default is the phone stays untouched until the car is actually parked. A red light is not a break in driving — it's a pause, and the message can wait two minutes."
              },
              "2": {
                "good": false,
                "body": "'Just a quick glance' is exactly the behavior §545.4251 targets — reading is named in the statute. And the glance trains the reflex to reach for the phone while in the driver's seat, which is the dangerous part."
              }
            }
          }
        },
        {
          "id": "9.3",
          "title": "GDL (Graduated Driver License) restrictions",
          "minutes": 45,
          "type": "reading",
          "body": [
            "Texas doesn't hand a 16-year-old the same license as a 40-year-old, and the reason is brutally simple: crash risk for new drivers is highest in the first months and drops sharply with experience. The Graduated Driver License (GDL) system, built into Transportation Code §521.204 and related sections, is a ramp — it lets you build skill in lower-risk conditions before unlocking the riskier ones. Think of it as the difference between training wheels and a racing bike: same machine, very different settings.",
            "Phase 1 is the learner permit, available starting at age 15 once you're enrolled in or have completed an approved driver-ed course. A permit is supervised driving ONLY: a licensed driver who is at least 21 must be in the front passenger seat every single time the car moves. Not in the back, not following in another car, not 'available by phone' — in the front seat, awake, sober, and able to grab the wheel. You must hold the permit for at least six months before you can move up.",
            "That six-month minimum is not a formality you can buy your way out of — it's a deliberate floor designed to force you through a full season of driving conditions: day and night, dry and wet, light and heavy traffic. Texas also requires you to log behind-the-wheel hours during this phase (including night hours) as part of the parent-taught or instructor-taught requirement. The clock and the hours both have to be satisfied; you can't shortcut either.",
            "Phase 2 is the provisional license, available at 16 after you've held the permit six months and passed the road test. Now you can finally drive unsupervised — but for the first 12 months OR until you turn 18 (whichever comes first), four real restrictions apply. They are the heart of the whole system and the part most likely to be tested, so know them cold.",
            "Provisional restriction one: a nighttime curfew. You may not drive between midnight and 5 a.m. unless it's for school, work, a medical emergency, or another narrow necessity. This window exists because late-night driving combines fatigue, lower visibility, and a higher share of impaired drivers on the road — the deadliest hours for a new driver.",
            "Provisional restriction two: no wireless devices at all. Not handheld, not hands-free, not 'just navigation' — nothing. Provisional drivers are the one group Texas bars from phone use entirely while driving, because a brand-new driver has zero spare attention to lend a screen. Restriction three: no more than one passenger under 21 who isn't a member of your immediate family. A car full of teenage friends is statistically one of the most dangerous things a new driver can do, so the law caps it at one.",
            "Provisional restriction four, the one everyone forgets: seat belts and the standard traffic laws still fully apply, and the GDL adds teeth. A violation of ANY provisional restriction is a traffic citation with a fine roughly in the $25–$200 range, but the bigger sting is what it does to your clock — a first violation RESETS the 12-month restriction period back to zero, so your restrictions start over. Rack up a second violation and the provisional license can be suspended outright.",
            "Phase 3 is the unrestricted license, which arrives at 18. At that point the curfew, the phone ban, and the passenger limit all drop away — you hold a full adult license. Notice what that means in practice: if you get your provisional at 16 and never violate a restriction, you're fully unrestricted at 17 (the 12 months elapse first). If you wait and get licensed at 17.5, you ride the restrictions until 18 because the 'until 18' clause wins.",
            "Here's the mindset that makes the GDL feel less like a cage and more like a cheat code: every restriction targets a known killer of new drivers — night, distraction, peer passengers. You are statistically safest doing exactly what the law forces you to do anyway. Drivers who treat the restrictions as the floor for their own habits, not as rules to skirt, are the ones who reach 18 with a clean record and an actual feel for the car.",
            "And the practical payoff is concrete: violations don't just cost a fine, they show up on your record, they can raise the insurance your family pays, and a reset clock means you're stuck in restricted status longer than the friend who followed the rules. The fastest, cheapest route to a free, unrestricted license is the boring one — don't drive the hours you're barred from, leave the phone alone, and keep the back seat empty until you've earned it."
          ],
          "keyPoints": [
            "Phase 1 Permit (15+): supervised only — licensed adult 21+ in the FRONT seat, every trip; hold 6 months minimum",
            "Phase 2 Provisional (16+): four restrictions for 12 months OR until 18, whichever comes first",
            "Provisional curfew: no driving midnight–5 a.m. (school/work/medical exceptions)",
            "Provisional phone: NO device at all — hands-free included; passengers: ≤1 non-family under 21",
            "First restriction violation RESETS the 12-month clock; second can suspend the license",
            "Phase 3 (18+): unrestricted — curfew, phone ban, and passenger limit all drop"
          ],
          "quiz": [
            {
              "q": "On a TX learner permit, the supervising driver must be:",
              "options": [
                "Any licensed driver, in any seat",
                "A licensed driver at least 21, in the FRONT passenger seat",
                "A parent only",
                "At least 18, anywhere in the car"
              ],
              "correct": 1,
              "why": "The permit requires a licensed driver 21 or older in the front passenger seat every time the car moves — awake, sober, and able to take the wheel."
            },
            {
              "q": "Minimum time you must hold a TX learner permit before moving to a provisional license:",
              "options": [
                "1 month",
                "3 months",
                "6 months",
                "12 months"
              ],
              "correct": 2,
              "why": "Six months minimum, by design — it forces you through a full range of driving conditions before you drive unsupervised."
            },
            {
              "q": "The TX provisional license curfew bans driving (with exceptions) between:",
              "options": [
                "10 p.m. and 6 a.m.",
                "11 p.m. and 5 a.m.",
                "Midnight and 5 a.m.",
                "1 a.m. and 6 a.m."
              ],
              "correct": 2,
              "why": "Midnight to 5 a.m., with exceptions for school, work, and medical necessity — the deadliest hours for new drivers."
            },
            {
              "q": "Phone use on a TX provisional license is:",
              "options": [
                "Hands-free is allowed",
                "Navigation only is allowed",
                "No device use at all while driving — hands-free included",
                "Allowed if you're 17 or older"
              ],
              "correct": 2,
              "why": "Provisional drivers face a total ban on wireless device use, hands-free included — stricter than the general anti-texting law."
            },
            {
              "q": "Passenger limit on a TX provisional license:",
              "options": [
                "No limit",
                "No more than one passenger under 21 who isn't immediate family",
                "No passengers at all",
                "Up to three friends"
              ],
              "correct": 1,
              "why": "At most one non-family passenger under 21 — peer passengers are one of the biggest crash-risk multipliers for new drivers."
            },
            {
              "q": "A FIRST violation of any TX provisional restriction:",
              "options": [
                "Has no consequence",
                "Resets the 12-month restriction clock back to zero",
                "Suspends the license immediately",
                "Adds two years to the restriction"
              ],
              "correct": 1,
              "why": "A first violation resets the 12-month restriction period; a second violation can lead to suspension of the provisional license."
            }
          ],
          "worked": {
            "setup": "Maria got her provisional license the day she turned 16. It's now four months later, a Friday night. Her shift at the movie theater ends at 11:40 p.m., and two coworkers — both 17, neither family — ask her for a ride home. The drive would put her on the road until about 12:15 a.m.",
            "walkthrough": "Walk the four restrictions one at a time. Curfew: she'd be driving past midnight, but the trip starts as a drive home from work, and work is a listed exception — driving home directly from a job is generally covered, so the curfew alone isn't the problem here. Passengers: TWO non-family passengers under 21 is one too many — the limit is exactly one. That's a clear violation. Phone: if she so much as touches navigation, that's a third issue. So the single ride home breaks the passenger rule. The consequence isn't just a fine in the $25–$200 range — a first violation RESETS her 12-month restriction clock back to zero, meaning the four months of clean driving she banked are wiped and she starts the year over. The fix is boring and free: she drives one coworker home, or they split between two cars, and her clock keeps ticking toward freedom."
          },
          "miniScenario": {
            "prompt": "You've had your provisional license for 11 months with a clean record — you're one month from the restrictions dropping. A friend asks you to use hands-free voice texting 'since it's not handheld.' What do you do?",
            "options": [
              "Use it — hands-free isn't 'real' phone use and you're almost done anyway.",
              "Decline — provisional drivers can't use ANY device, and a violation now resets your whole 12-month clock.",
              "Use it only if you're stopped at a light."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Hands-free is explicitly included in the provisional device ban — there's no 'it's not handheld' loophole. And the timing makes it worse: a violation in month 11 resets the clock to zero, costing you nearly a full year of progress one month before you'd have been free."
              },
              "1": {
                "good": true,
                "body": "Exactly. The provisional ban covers every device, hands-free included, and the reset-the-clock penalty means a single slip-up this late erases almost a year. Wait the last month out clean."
              },
              "2": {
                "good": false,
                "body": "Stopped at a light still counts as operating the vehicle, and provisional drivers have a total device ban. The risk isn't worth wiping out 11 months of clean record."
              }
            }
          }
        },
        {
          "id": "9.4",
          "title": "TX speed law — limits, tiers, and \"reasonable and prudent\"",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Texas speed limits are not a single number — they're a tiered system in Transportation Code §§545.351–545.356. The default prima facie limits, when no sign is posted, are: 75 mph on rural interstates (90 mph stretches exist on a few designated rural toll roads, but those are exceptions), 70 mph on most numbered US/state highways, 60 mph on farm-to-market roads outside urban areas, 30 mph in an \"urban district\" (continuous developed property on both sides of the road), and 15 mph in alleys. School zones are 20 mph (or as posted) during posted hours. These limits exist whether or not a sign is up — if the sign is missing, the statutory default applies.",
            "Texas treats speed limits as \"prima facie\" rather than absolute, which sounds like a loophole but isn't. §545.351(a) says the prima facie limit is the maximum that's presumptively safe — meaning the state assumes that's the safe number. But §545.351(b) requires every driver to operate at a speed that is \"reasonable and prudent under the circumstances then existing.\" This is the part most drivers don't know: you can be ticketed for doing the posted limit if conditions called for less. A 70-mph zone in a dust storm, fog, or torrential rain is functionally a 45-mph zone, and DPS will write you for the difference. Conversely, \"prima facie\" means you can contest a speeding ticket by proving your speed was actually safe — but that's an uphill fight, because the posted number is the presumed safe maximum.",
            "A few special zones to know. School zones during posted hours are 20 mph (or as posted) and tickets there are aggressively enforced — phone use in a school zone is a separate offense under §545.4251 with its own fine. Construction zones already double fines when workers are present (SB 1366, covered elsewhere in this course). Residential streets default to 30 mph. Alleys top out at 15. And the \"reasonable and prudent\" clause means the legal speed limit when an officer pulls you over is whatever they can convince a judge was reasonable for the road that day — not whatever the sign said."
          ],
          "keyPoints": [
            "Prima facie limits (§§545.351–545.356): 75 rural interstate, 70 most highways, 60 FM roads, 30 urban, 15 alleys",
            "School zone: 20 mph or as posted, plus a separate phone-use ban (§545.4251)",
            "\"Reasonable and prudent\" rule: posted limit can be too fast for conditions (§545.351(b))",
            "You can be ticketed at the posted limit if weather/traffic warranted slower",
            "Missing sign = statutory default applies, not \"anything goes\""
          ],
          "quiz": [
            {
              "q": "On an undivided farm-to-market (FM) road in rural Texas with no posted limit sign, the daytime prima facie speed limit is:",
              "options": [
                "45 mph",
                "55 mph",
                "60 mph",
                "70 mph"
              ],
              "correct": 2,
              "why": "§§545.352 sets the prima facie limit for FM roads outside an urban district at 60 mph during daytime. Missing signs don't mean \"no limit\" — they mean the statutory default applies."
            },
            {
              "q": "You're driving the posted 70 mph on I-10 in a heavy thunderstorm with visibility under 300 ft. A DPS trooper pulls you over for \"unsafe speed.\" Can they ticket you when you weren't over the limit?",
              "options": [
                "No — you can't be ticketed for going at or under the posted limit.",
                "Yes — §545.351(b) requires speeds that are \"reasonable and prudent\" for conditions; 70 in a storm isn't.",
                "Only if you actually caused a crash.",
                "Only if visibility drops below 100 ft."
              ],
              "correct": 1,
              "why": "§545.351(b) imposes a duty to drive at a reasonable and prudent speed for actual conditions, independent of the posted limit. In a storm that limits visibility, the legal maximum drops below the sign — and a citation will stick."
            },
            {
              "q": "The 20-mph TX school zone limit applies:",
              "options": [
                "24 hours a day, 7 days a week.",
                "Only during posted hours (typically before/after school and at lunch).",
                "Only when children are visibly present.",
                "Only on the first and last day of the school year."
              ],
              "correct": 1,
              "why": "School zone limits apply during the hours posted on the sign — typically 30 minutes before school, lunch periods, and 30 minutes after dismissal. Phone use is separately banned in school zones any time the reduced limit is in effect (§545.4251)."
            }
          ]
        },
        {
          "id": "9.5",
          "title": "Module 9 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "TX residential default speed:",
              "options": [
                "25",
                "30",
                "35"
              ],
              "correct": 1
            },
            {
              "q": "Headlights required from:",
              "options": [
                "Sunset to sunrise",
                "30 min after sunset to 30 min before sunrise",
                "Only when dark"
              ],
              "correct": 1
            },
            {
              "q": "Turn signal minimum distance:",
              "options": [
                "10 ft",
                "100 ft",
                "500 ft"
              ],
              "correct": 1
            },
            {
              "q": "Anti-texting first-offense fine:",
              "options": [
                "$10–$25",
                "$25–$99",
                "$500"
              ],
              "correct": 1
            },
            {
              "q": "Lisa Torry Smith Act covers:",
              "options": [
                "Marked crosswalks only",
                "Unmarked crosswalks at intersections too",
                "Highways only"
              ],
              "correct": 1
            },
            {
              "q": "Move Over first-offense fine:",
              "options": [
                "Up to $200",
                "Up to $500",
                "Up to $2000"
              ],
              "correct": 1
            },
            {
              "q": "Provisional curfew:",
              "options": [
                "10pm–6am",
                "11pm–5am",
                "12am–5am"
              ],
              "correct": 2
            },
            {
              "q": "Provisional phone use:",
              "options": [
                "Hands-free OK",
                "None at all",
                "Navigation only"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M10",
      "num": 10,
      "title": "Emergencies & Crashes",
      "blurb": "When something goes wrong: brake failure, blowouts, skids, and the legal aftermath.",
      "chapters": [
        {
          "id": "10.1",
          "title": "Skid recovery & brake failure",
          "minutes": 50,
          "type": "scenario",
          "scene": {
            "tag": "SCENARIO 13",
            "meta": [
              "Brake failure",
              "50 mph"
            ],
            "description": "You press the brake pedal and it goes to the floor. Brake failure. You're going 50 mph. What's your sequence?"
          },
          "options": [
            {
              "letter": "A",
              "text": "Pump the brake pedal repeatedly, downshift, use the parking brake gently, steer to safety."
            },
            {
              "letter": "B",
              "text": "Slam the parking brake fully, lock the wheels."
            },
            {
              "letter": "C",
              "text": "Turn off the engine to stop power."
            }
          ],
          "correct": "A",
          "consequences": {
            "A": {
              "good": true,
              "title": "You stop safely on the shoulder.",
              "body": "Pump the pedal — sometimes pressure returns. Downshift to use engine braking (D → 2 → 1 in automatics; lower gear in manual). Apply the parking brake gradually — don't lock the rear wheels. Steer to a safe shoulder. Hazard lights on."
            },
            "B": {
              "good": false,
              "title": "Rear wheels lock, you spin.",
              "body": "Slamming the parking brake at 50 mph locks the rear wheels and induces a spin. Always apply gradually."
            },
            "C": {
              "good": false,
              "title": "You lose power steering and brake assist.",
              "body": "Turning off the engine kills power steering AND any remaining brake-booster vacuum. Worst possible move."
            }
          },
          "rule": {
            "tag": "EMERGENCY",
            "title": "Pump · Downshift · Park brake · Steer.",
            "body": "Brake failure protocol in order: 1) pump the pedal (sometimes pressure returns), 2) downshift to engine-brake, 3) gradually apply the parking brake, 4) steer to a safe shoulder. NEVER kill the engine — you lose power steering and remaining brake assist."
          },
          "quiz": [
            {
              "q": "In a brake failure, the FIRST thing to do is:",
              "options": [
                "Pump the brake pedal",
                "Slam the parking brake",
                "Turn off the engine"
              ],
              "correct": 0,
              "why": "Pumping can restore pressure. Then downshift, then gradual park brake, then steer."
            },
            {
              "q": "The parking brake during a brake failure should be applied:",
              "options": [
                "Slammed fully",
                "Gradually",
                "Not at all"
              ],
              "correct": 1,
              "why": "Gradual application avoids locking the rear wheels and spinning the car."
            },
            {
              "q": "Turning off the engine during a brake failure:",
              "options": [
                "Helps stop the car",
                "Kills power steering and brake assist — worst move",
                "Has no effect"
              ],
              "correct": 1,
              "why": "You need power steering and any residual brake assist. Don't kill the engine."
            },
            {
              "q": "Downshifting during a brake failure helps because it:",
              "options": [
                "Uses engine braking to slow the car without the hydraulic brakes",
                "Refills the brake fluid",
                "Turns on the ABS",
                "Disconnects the failed brakes"
              ],
              "correct": 0,
              "why": "Lower gears make the engine drag the drivetrain, scrubbing speed when the hydraulic brakes are gone."
            },
            {
              "q": "Why do modern cars rarely lose ALL braking at once?",
              "options": [
                "Brakes never fail",
                "They use a split (dual) hydraulic system, so one leak still leaves partial braking",
                "The parking brake takes over automatically",
                "The engine brakes for you"
              ],
              "correct": 1,
              "why": "Dual hydraulic circuits are designed so a single failure still leaves you some braking on the other circuit."
            },
            {
              "q": "While running the brake-failure sequence, your eyes and steering should be aimed at:",
              "options": [
                "The car directly ahead",
                "An open shoulder or uphill escape path",
                "Your dashboard gauges",
                "Oncoming traffic"
              ],
              "correct": 1,
              "why": "Steer toward an open shoulder or uphill grade where you can bleed off the remaining speed safely, hazards on."
            }
          ],
          "body": [
            "Mechanical failures feel like the scariest thing that can happen behind the wheel, but the survivable ones share a pattern: panic kills more people than the failure itself does. A skid or a dead brake pedal is a problem with a procedure, and the driver who has rehearsed the procedure in their head buys themselves the two or three seconds that make the difference. This chapter is about loading those procedures now, before you ever need them.",
            "Total brake failure — the pedal sinking to the floor with no resistance — is rare in a maintained car, because modern vehicles use a split (dual) hydraulic system specifically so that one leak still leaves you some braking. But rare is not never, and when it happens at speed your instinct will scream 'stomp harder,' which does nothing. The trained response is a sequence, and the order matters as much as the steps: you're trying to shed speed using everything EXCEPT the failed hydraulic brakes.",
            "Here's the sequence to burn in: pump the pedal first, because in many failures pressure partially returns after a few quick pumps. If that fails, downshift to let the engine drag your speed down — in an automatic that means easing the selector toward lower gears (D to 2 to 1), in a manual you step down through the gears. THEN, only once you've scrubbed speed, apply the parking brake gradually — a smooth steady pull, never a yank, because slamming it locks the rear wheels and spins you. All the while, keep steering toward an open shoulder or an uphill escape, hazards on. The one thing you must NOT do is switch off the engine: that kills your power steering and any remaining brake assist, turning a bad situation into an unsteerable one. Read the scenario below and pick the sequence you'd run."
          ]
        },
        {
          "id": "10.2",
          "title": "After a crash — the legal duties (TX 550)",
          "minutes": 50,
          "type": "reading",
          "body": [
            "A crash is the one moment where the most expensive mistake isn't the collision — it's what you do in the next sixty seconds. Texas Transportation Code Chapter 550 lays out a short list of legal duties that apply to every driver in every crash, and the law does not care that you're shaken, scared, or sure it wasn't your fault. The duties are mechanical, and the penalties for skipping them are far heavier than the penalties for causing the crash. Memorize the list now so your panicked brain has a script to follow.",
            "Duty one: STOP. The single worst thing you can do after any crash is drive away, and it's worst precisely when someone is hurt. Stopping is not optional and it is not negotiable — you stop at the scene or as close to it as you can safely get, and you stay until your other duties are done. Everything else in Chapter 550 assumes you did this first.",
            "Duty two: render reasonable aid. Under §550.023 you must give reasonable assistance to anyone injured — which in practice means call 911 and request medical help, and arrange transport if EMS asks you to. 'Reasonable' is the key word: you are not expected to perform surgery, and you should NOT move an injured person unless leaving them risks greater harm, like a fire or a sinking car. Calling for help and not making things worse is the bar.",
            "Duty three: exchange information. You must give your name, address, vehicle registration (plate), and, on request, show your driver license to the other people involved — and get theirs. Add insurance carrier and policy info, because everyone will need it. If you strike an unattended parked car, you must leave a note with your name and contact info in a visible spot; quietly driving off from a dinged bumper in a parking lot is still a hit-and-run.",
            "Now the part that should genuinely scare you into compliance: leaving the scene escalates by harm. Leaving a crash that caused injury is a third-degree felony — two to ten years in state prison. Leaving a crash that caused a death is a second-degree felony — two to twenty years. Read that again: the punishment for running is harsher than the punishment for the crash itself. A driver who causes an accidental injury and stays may face a manageable outcome; the same driver who panics and flees has manufactured a felony out of an accident.",
            "Even when no one is hurt, paperwork duties remain. A police report (officer's crash report) is required when the crash involves injury, death, or apparent property damage of about $1,000 or more — which is almost any modern fender-bender, given repair costs. If police DON'T come to the scene for a reportable crash, the duty shifts to you: file a driver's crash report (historically the CR-2 'blue form') with the proper authority within the required window, generally treated as 10 days. Don't assume 'no cops, no paperwork.'",
            "There's a behavioral rule that isn't in the statute but matters just as much: at the scene, stick to facts and do NOT admit fault. 'I'm so sorry, I totally didn't see you' feels human, but it's an admission that insurers and lawyers will use, and you genuinely may not know who's at fault in the chaos of the moment. Exchange information, describe what happened factually to the police, photograph everything, and let the investigation and the insurers assign blame.",
            "Documentation is your friend, so build the habit before you need it. Photograph all vehicles, the positions before anything is moved if it's safe, the damage, the license plates, the road and signs, and any visible injuries. Get names and numbers of witnesses. Note the time, location, and weather. The driver with twenty time-stamped photos and a witness contact is in a vastly stronger position than the one relying on memory of a thirty-second adrenaline blur.",
            "A note on impairment and crashes, because the two intersect badly: if a crash involves any suspicion of drugs or alcohol, leaving the scene to 'sober up' or avoid a test compounds the charges enormously. The smart, lawful move — always — is to stop, call it in, cooperate with the basic exchange of information, and not flee. There is no version of running that improves your legal position; there are only versions that make it catastrophically worse.",
            "Boil Chapter 550 down to a sentence you can recite under stress: stop, check for injuries and call 911, exchange information, document everything, stay calm, and never admit fault or drive away. Those duties cost you a few minutes and possibly an awkward conversation. Skipping them — especially the duty to stop — can cost you years of your life. In the worst sixty seconds you'll ever spend in a car, the law has already written your to-do list; your only job is to follow it."
          ],
          "keyPoints": [
            "Chapter 550 duties: STOP, render reasonable aid, exchange information — in that order",
            "Render aid (§550.023): call 911; don't move the injured unless they're in greater danger",
            "Exchange name, address, plate, license, and insurance; leave a note for an unattended/parked car",
            "Hit-and-run with injury = 3rd-degree felony (2–10 yrs); with death = 2nd-degree felony (2–20 yrs)",
            "Police report required for injury, death, or ~$1,000+ damage; file the driver's report (CR-2) within ~10 days if no officer responds",
            "Stick to facts — never admit fault at the scene; photograph and document everything"
          ],
          "quiz": [
            {
              "q": "Hit-and-run from a crash that caused injuries in Texas is:",
              "options": [
                "A Class C misdemeanor",
                "A 3rd-degree felony, 2–10 years",
                "Just a traffic ticket",
                "A civil matter only"
              ],
              "correct": 1,
              "why": "Leaving the scene of a crash involving injury is a third-degree felony — 2 to 10 years — harsher than the penalty for the crash itself."
            },
            {
              "q": "After a reportable crash where no officer responds, the driver must file a driver's crash report (CR-2) within about:",
              "options": [
                "24 hours",
                "10 days",
                "30 days",
                "It's never required"
              ],
              "correct": 1,
              "why": "When police don't respond to a reportable crash, the duty shifts to the driver, generally treated as a 10-day window to file."
            },
            {
              "q": "A police/officer crash report is required when:",
              "options": [
                "Always, for every minor scrape",
                "There's injury, death, or apparent property damage of about $1,000 or more",
                "Only if you decide to call them",
                "Only on highways"
              ],
              "correct": 1,
              "why": "Mandatory for injury, death, or roughly $1,000+ in apparent property damage — which covers almost any modern fender-bender."
            },
            {
              "q": "Under §550.023, 'render reasonable aid' primarily means:",
              "options": [
                "Perform first aid surgery on the injured",
                "Call 911/request medical help and avoid making things worse — don't move the injured unless they're in greater danger",
                "Drive the injured person yourself to any hospital immediately",
                "Nothing — aid is optional"
              ],
              "correct": 1,
              "why": "Reasonable aid means summoning help and not worsening injuries; you don't move an injured person unless leaving them poses greater danger like fire."
            },
            {
              "q": "You damage an unattended parked car and can't find the owner. The law requires you to:",
              "options": [
                "Drive away if no one saw it",
                "Leave your name and contact info in a visible spot on the car",
                "Wait exactly one hour then leave",
                "Report it only if the damage exceeds $5,000"
              ],
              "correct": 1,
              "why": "Leaving a note with your name and contact info is required — driving off from an unattended vehicle you hit is still a hit-and-run."
            },
            {
              "q": "At a crash scene, the smartest thing to say about fault is:",
              "options": [
                "A full apology accepting blame, to be polite",
                "Nothing about fault — stick to facts and let police and insurers determine it",
                "Blame the other driver loudly",
                "Whatever gets you out of there fastest"
              ],
              "correct": 1,
              "why": "An on-scene admission can be used against you and you may not even know who's at fault. Exchange info, state facts, and let the investigation assign blame."
            }
          ],
          "worked": {
            "setup": "You rear-end another car at a red light on a Dallas street going about 15 mph. Nobody seems hurt, but both bumpers are clearly damaged — easily over $1,000 in repairs. The other driver gets out looking angry. Your first instinct is to apologize and offer to just pay cash so it doesn't go on insurance.",
            "walkthrough": "Run the Chapter 550 checklist instead of your instinct. STOP: already done, good. Aid: ask if they're hurt and call 911 — even a low-speed hit can cause whiplash that shows up hours later, and a police report is required because the damage tops $1,000. Exchange: trade names, addresses, plates, licenses, and insurance info; photograph both bumpers, the plates, the intersection, and the position of the cars. The thing you must NOT do is blurt 'I'm so sorry, totally my fault' — that's an admission, and the cash-payment idea backfires the moment a hidden injury or a bigger repair bill surfaces and there's no insurance claim on record. Stick to facts with the responding officer, let the insurers sort fault, and you walk away with a documented, lawful record instead of a private deal that can blow up on you."
          },
          "miniScenario": {
            "prompt": "You back into a parked, unoccupied car in a grocery store lot and leave a visible scratch and dent. No one is around and there are no cameras you can see. What's the lawful move?",
            "options": [
              "Drive off — no one saw it and it's just a parked car.",
              "Leave a note with your name and contact info in a visible spot on the car, and document the damage.",
              "Wait five minutes, and if no owner appears, leave."
            ],
            "correct": 1,
            "feedback": {
              "0": {
                "good": false,
                "body": "Driving off from an unattended car you damaged is still a hit-and-run under Chapter 550 — 'no one saw it' is not a defense, and most parking lots have cameras you didn't notice. Leaving a note is the legal requirement."
              },
              "1": {
                "good": true,
                "body": "Correct. When you hit an unattended vehicle, the law requires you to leave your name and contact information in a place the owner will find it, plus document the damage. That converts a potential criminal charge into a normal insurance matter."
              },
              "2": {
                "good": false,
                "body": "Waiting a few minutes then leaving with no note still fails the duty — you must leave your information for the owner regardless of whether they show up. The note is the obligation, not the wait."
              }
            }
          }
        },
        {
          "id": "10.3",
          "title": "First aid at a crash scene — buying minutes for paramedics",
          "minutes": 15,
          "type": "reading",
          "body": [
            "TX Transp. Code §550.023 requires every driver involved in a crash to render reasonable aid — meaning call 911, request medical help, and provide assistance you're actually capable of giving. You are protected when you do this. The Texas Good Samaritan statute (Civil Practice & Remedies Code §§74.151–74.152) shields you from civil liability for ordinary acts of emergency care given in good faith, as long as you weren't paid, weren't the cause of the emergency, and didn't act with willful or wanton negligence. You cannot be sued for trying to help. You CAN be charged criminally for driving away.",
            "The mental model paramedics teach for the first 90 seconds is DRABC. Danger — is the scene safe? Are you about to get hit by oncoming traffic, is the car on fire, is fuel pooling? If yes, fix the danger first (hazard lights, flares, move yourself out of the lane). Response — tap their shoulder, ask loudly if they're OK. If they respond, they're breathing and have a pulse; you can move to bleeding control. Airway — if unresponsive, check that the airway isn't blocked (don't tilt the head back if you suspect spine injury, which is most crash patients — do a jaw thrust instead). Breathing — look at the chest. Circulation — check for severe bleeding. This sequence takes 30 seconds and tells you which problem will kill the person first.",
            "The two biggest don'ts: don't move a crash victim who may have a spine injury unless they're in greater danger where they are (active fire, sinking car, oncoming traffic on a freeway). Moving someone with a cervical spine fracture can convert a survivable injury into permanent paralysis. The two biggest do's: stop severe bleeding and prevent shock. For bleeding — direct pressure with the heel of your hand or a folded shirt for at least 10 minutes without lifting it to check. If pressure alone won't stop arterial bleeding from a limb, a tourniquet (belt, strap, commercial tourniquet) high and tight on the limb above the wound, tightened until bleeding stops. Note the time. Tourniquets save lives — the \"Stop the Bleed\" curriculum reversed decades of medical hesitation about them. For shock — keep the person warm, calm, and lying flat; shock kills people who had survivable injuries because their blood pressure collapses before help arrives. Your job is not to play doctor. Your job is to buy the 8 to 12 minutes it takes for EMS to reach the scene."
          ],
          "keyPoints": [
            "Duty to render aid (§550.023); Good Samaritan immunity (Civ. Prac. & Rem. Code §§74.151–74.152)",
            "DRABC: Danger, Response, Airway, Breathing, Circulation — in that order",
            "Don't move suspected spine-injury patients unless they're in greater danger where they are",
            "Severe bleeding: direct pressure 10+ minutes; tourniquet for arterial limb bleeding, note the time",
            "Goal is to buy minutes for paramedics — not to play doctor"
          ],
          "quiz": [
            {
              "q": "You stop at a crash scene and try to help. The other driver later sues you, claiming your first aid made their injury worse. Under TX Civ. Prac. & Rem. Code §§74.151–74.152:",
              "options": [
                "You're fully liable — anyone who renders aid assumes the risk.",
                "You're protected from civil liability if you acted in good faith, weren't paid, didn't cause the crash, and weren't willfully or wantonly negligent.",
                "You're protected only if you're a licensed EMT.",
                "You're protected only if the victim signed a waiver first."
              ],
              "correct": 1,
              "why": "Texas's Good Samaritan statute shields lay rescuers acting in good faith from ordinary-negligence liability. The shield doesn't cover paid responders acting in their professional capacity, the person who caused the emergency, or willful misconduct — but it covers a regular driver trying to help."
            },
            {
              "q": "A crash victim is unconscious but breathing in the driver's seat. The car is not on fire and is off the roadway. The correct action is:",
              "options": [
                "Pull them out of the car immediately so they can lie flat.",
                "Leave them in place, support the head/neck, monitor breathing, and wait for EMS.",
                "Slap them awake to check responsiveness.",
                "Tilt their head back as far as it will go to open the airway."
              ],
              "correct": 1,
              "why": "Crash patients are presumed to have possible cervical-spine injury. If they're breathing and not in greater danger (fire, sinking, oncoming traffic), leave them in place. Moving them risks converting a survivable injury into paralysis. Aggressive head-tilt is also contraindicated for suspected spine injury — paramedics use a jaw thrust."
            },
            {
              "q": "A passenger has severe arterial bleeding from a gash on their thigh. Direct pressure isn't stopping it. Per \"Stop the Bleed\" guidance, you should:",
              "options": [
                "Elevate the leg and wait for paramedics — tourniquets cause amputation.",
                "Apply a tourniquet (belt or strap) high and tight on the thigh above the wound, tighten until bleeding stops, and note the time.",
                "Pour water on the wound to clean it.",
                "Have them stand up to slow the bleeding."
              ],
              "correct": 1,
              "why": "Modern combat-medicine research reversed decades of fear about tourniquets — they save lives in arterial limb bleeding. Place high and tight above the wound, tighten until the bleeding stops, note the time so EMS knows how long it's been on. The myth that tourniquets automatically cost the limb is wrong; uncontrolled bleeding costs lives."
            }
          ]
        },
        {
          "id": "10.4",
          "title": "Final exam",
          "minutes": 60,
          "type": "checkpoint",
          "exam": [
            {
              "q": "TX teen course classroom hours:",
              "options": [
                "16",
                "24",
                "32",
                "40"
              ],
              "correct": 2
            },
            {
              "q": "Pedestrian in a crosswalk vs your green light:",
              "options": [
                "You go first",
                "Pedestrian has right of way"
              ],
              "correct": 1
            },
            {
              "q": "A yellow light means:",
              "options": [
                "Speed up",
                "Stop if safe",
                "Slow to 10 mph"
              ],
              "correct": 1
            },
            {
              "q": "Provisional curfew:",
              "options": [
                "12am–5am",
                "11pm–5am",
                "10pm–6am"
              ],
              "correct": 0
            },
            {
              "q": "SMOG = ?",
              "options": [
                "Speed-Move-Observe-Go",
                "Signal-Mirror-Over-the-shoulder-Go",
                "Stop-Mirror-Open-Go"
              ],
              "correct": 1
            },
            {
              "q": "4-way stop tie-breaker:",
              "options": [
                "Yield to right",
                "Yield to left",
                "Bigger car"
              ],
              "correct": 0
            },
            {
              "q": "Wet pavement doubles:",
              "options": [
                "Reaction time",
                "Braking distance",
                "Top speed"
              ],
              "correct": 1
            },
            {
              "q": "Hydroplaning fix:",
              "options": [
                "Brake hard",
                "Steer sharply",
                "Ease off, hold straight"
              ],
              "correct": 2
            },
            {
              "q": "TX adult DWI per-se BAC:",
              "options": [
                "0.05",
                "0.08",
                "0.10"
              ],
              "correct": 1
            },
            {
              "q": "TX implied consent first-refusal suspension:",
              "options": [
                "60 days",
                "180 days",
                "2 years"
              ],
              "correct": 1
            },
            {
              "q": "Move Over law applies on:",
              "options": [
                "Highways only",
                "Any road with shoulder + flashing-light vehicle",
                "Police only"
              ],
              "correct": 1
            },
            {
              "q": "Lisa Torry Smith Act covers:",
              "options": [
                "Marked crosswalks only",
                "Unmarked crosswalks too",
                "Highways only"
              ],
              "correct": 1
            },
            {
              "q": "Hit-and-run with injury =",
              "options": [
                "Misdemeanor",
                "3rd-degree felony",
                "Traffic ticket"
              ],
              "correct": 1
            },
            {
              "q": "Brake failure first move:",
              "options": [
                "Pump pedal",
                "Slam parking brake",
                "Kill engine"
              ],
              "correct": 0
            },
            {
              "q": "Red oil-pressure light:",
              "options": [
                "Drive to shop",
                "STOP NOW",
                "Top up at next station"
              ],
              "correct": 1
            },
            {
              "q": "TX min insurance:",
              "options": [
                "25/50/15",
                "30/60/25",
                "100/300/100"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M11",
      "num": 11,
      "title": "Texas Civic Responsibilities",
      "blurb": "TX-mandated content: trafficking awareness, racing/work-zone law, and the Community Safety Education Act.",
      "chapters": [
        {
          "id": "11.1",
          "title": "Human trafficking — what drivers actually see",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Texas SB 9 (and the implementing TDLR rule under Texas Education Code §1001.107) requires every driver education course to cover human trafficking. The reason isn't paperwork — it's that traffickers move people on highways, and the people most likely to notice something off are drivers stopping at the same gas stations, truck stops, and rest areas. Trafficking means using force, fraud, or coercion to make someone perform labor or commercial sex. Minors involved in commercial sex are trafficking victims by definition under federal law — consent isn't a defense.",
            "Indicators are rarely cinematic. You're looking for inconsistencies. A passenger who won't make eye contact or who lets a third party answer questions for them. A car or truck cab with someone who looks underage and a driver who doesn't match. Multiple people who appear coached, fearful, or unable to say where they're going. Branding tattoos (a name, a barcode, a dollar sign). At truck stops specifically: people moving between rigs late at night, knocking on cab doors, or being escorted by someone who controls all the money.",
            "What you do NOT do is intervene. You are an 18-year-old with a driver's license, not a federal agent. Don't confront the suspected trafficker, don't try to \"rescue\" the victim, don't take photos that put you on a camera. You call. The National Human Trafficking Hotline is 1-888-373-7888 (text \"HELP\" to 233733). If someone is in immediate danger, 911. Note the vehicle plate, the make/model, and the direction of travel. That's the help that actually works."
          ],
          "keyPoints": [
            "Required by TX SB 9 / Education Code §1001.107",
            "Trafficking = force, fraud, or coercion (minors in commercial sex = automatic)",
            "Watch for inconsistencies, not movie clichés",
            "Do NOT intervene — call 1-888-373-7888 or 911",
            "Note plate, vehicle, and direction of travel"
          ],
          "quiz": [
            {
              "q": "You're fueling up at a rural TX truck stop at 2am. A girl who looks about 14 is sitting in the passenger seat of a sedan; a man in his 40s is paying inside and answers every question the cashier asks her. Best move?",
              "options": [
                "Walk up to the car and ask the girl if she's OK.",
                "Note the plate, make/model, and direction, then call 1-888-373-7888 once you're safely away.",
                "Follow the car when it leaves to get more information.",
                "Mind your business — you don't actually know anything."
              ],
              "correct": 1,
              "why": "Per the TDLR-mandated curriculum under Education Code §1001.107, drivers report indicators — they do not intervene. The hotline (1-888-373-7888) and trained investigators handle confirmation. Confrontation endangers the victim and you."
            },
            {
              "q": "Under federal trafficking law, a 16-year-old engaged in commercial sex is:",
              "options": [
                "A trafficking victim only if force or threats are proven.",
                "A trafficking victim automatically — minors cannot consent to commercial sex.",
                "Not a trafficking victim if they say they chose it.",
                "A trafficking victim only if transported across state lines."
              ],
              "correct": 1,
              "why": "Federal law (and the TX curriculum required by §1001.107) treats any minor in commercial sex as a trafficking victim regardless of consent, force, or interstate transport. The \"they said they wanted to\" defense does not exist."
            },
            {
              "q": "Which of these is the WEAKEST trafficking indicator on its own?",
              "options": [
                "A passenger who lets a third party answer all questions for them.",
                "Visible branding-style tattoos (a name, a barcode).",
                "A young passenger who looks tired in the back seat.",
                "Multiple people who appear coached and fearful."
              ],
              "correct": 2,
              "why": "A tired-looking kid in a back seat is just a tired-looking kid 99.9% of the time. The other three involve control or coercion patterns. Trafficking detection is about clusters of inconsistencies, not single innocuous observations."
            }
          ]
        },
        {
          "id": "11.2",
          "title": "Street racing — what it costs you in Texas",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Per TX Transportation Code §545.420, \"racing on a highway\" doesn't just mean two cars lined up at a light revving engines. The statute covers any attempt to outdistance another vehicle, test the physical endurance or speed of a vehicle, or make a speed record — on any public road, with or without a prearranged agreement. Two cars accelerating hard from a green light to \"see who gets there first\" is racing. A drift meetup that spills onto a public street is racing. A solo top-speed run on a frontage road is racing.",
            "First offense is a Class B misdemeanor: up to 180 days in jail and a $2,000 fine. If you have a prior or you're intoxicated, it escalates to a Class A (up to a year in jail, $4,000). If someone gets seriously injured, it's a third-degree felony — 2 to 10 years in state prison. If anyone dies, it's a second-degree felony — 2 to 20 years. Texas also forfeits the vehicle: under §545.420(h), a court can permanently take the car used in the race, even if it belongs to your parents.",
            "License consequences are separate from the criminal penalties. DPS suspends your license for a year on the first conviction (longer on subsequent ones), and TX adds 6 demerit points — enough to trigger the Driver Responsibility surcharges that follow you for three years. You also become an uninsurable risk: most carriers either non-renew or quote you at SR-22 rates for the next 3-5 years. The Honda Civic you raced is worth less than one year of that insurance increase."
          ],
          "keyPoints": [
            "TX Transp. Code §545.420 — racing includes any attempt to outdistance or test speed",
            "First offense: Class B misdemeanor (up to 180 days jail, $2,000 fine)",
            "Serious injury → 3rd-degree felony; death → 2nd-degree felony (up to 20 years)",
            "Vehicle forfeiture available — even if the car is your parents'",
            "1-year license suspension + insurance ruin for 3-5 years"
          ],
          "quiz": [
            {
              "q": "Under TX Transp. Code §545.420, which of these is NOT considered racing?",
              "options": [
                "Two cars accelerating hard from a green light to see who gets to the next intersection first.",
                "A solo attempt to hit 120 mph on an empty frontage road.",
                "Maintaining a steady 5 mph over the speed limit in normal traffic.",
                "A drift meetup that uses a public street as the course."
              ],
              "correct": 2,
              "why": "§545.420 covers attempts to outdistance another vehicle, test speed/endurance, or set a speed record — solo or otherwise. Cruising 5 over with traffic is speeding, not racing. The other three all fit the statutory definition."
            },
            {
              "q": "Your friend is driving his parents' car when he gets convicted of racing under §545.420. The parents had no idea. What can a TX court do to the car?",
              "options": [
                "Nothing — the parents are the registered owners.",
                "Order it impounded for 30 days, then returned.",
                "Permanently forfeit the vehicle under §545.420(h), even though the parents own it.",
                "Forfeit it only if drugs were also involved."
              ],
              "correct": 2,
              "why": "§545.420(h) allows permanent forfeiture of the vehicle used in racing regardless of who holds the title. Parental ignorance is not a defense to forfeiture. This is one of the reasons insurance carriers treat racing convictions as catastrophic."
            },
            {
              "q": "A street race in Texas ends with a bystander seriously injured. The minimum criminal exposure for the driver is:",
              "options": [
                "Class B misdemeanor (up to 180 days).",
                "Class A misdemeanor (up to 1 year).",
                "Third-degree felony (2 to 10 years in state prison).",
                "Second-degree felony (2 to 20 years)."
              ],
              "correct": 2,
              "why": "Per §545.420(d), racing that causes serious bodily injury is a third-degree felony — 2 to 10 years. If the injury becomes a death, it escalates to a second-degree felony (2 to 20). Either way, \"I didn't mean to hit anyone\" is irrelevant once you elected to race."
            }
          ]
        },
        {
          "id": "11.3",
          "title": "Work zones — SB 1366 and the Move Over law",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Texas SB 1366 took effect May 1, 2026, and it changed the math on work-zone driving. Any traffic fine you receive in an active work zone — speeding, following too close, unsafe lane change — is now automatically doubled when workers are present. Cause a crash that injures a worker and you're looking at a state jail felony (180 days to 2 years). Cause one that kills a worker and it becomes a second-degree felony: 2 to 20 years in prison and up to a $10,000 fine. This is on top of any civil liability, which routinely runs seven figures.",
            "Work zones are statistically dangerous in a way most teen drivers underestimate. TxDOT counted 26,143 work-zone crashes in 2024 — 198 of them fatal. Most of those deaths were drivers and their passengers, not workers. The hazards stack: sudden lane shifts, narrower lanes, concrete barriers inches from your mirror, equipment entering and exiting traffic, and the driver in front of you braking for cones they didn't see until the last second. Phone glances that you \"get away with\" on an empty highway turn into rear-end crashes in a work zone almost immediately.",
            "The TX Move Over / Slow Down law (Transp. Code §545.157) intersects with work zones constantly. Whenever a stopped vehicle on the shoulder or in a closed lane has activated flashing lights — TxDOT trucks, police, tow, utility — you must either change lanes away from it OR slow to 20 mph below the posted limit (or to 5 mph if the posted limit is 25 or below). In a work zone with SB 1366 in play, violating this is the kind of mistake that turns a $500 ticket into a felony if anyone gets hurt. Treat orange cones the way you'd treat a school zone with kids visible — speed down, phone away, hands at 9-and-3."
          ],
          "keyPoints": [
            "SB 1366 (effective May 1, 2026) doubles fines when workers are present",
            "Injuring a worker = state jail felony; killing a worker = 2nd-degree felony (up to 20 years)",
            "2024: 26,143 TX work-zone crashes / 198 fatalities — mostly drivers, not workers",
            "TX Move Over §545.157: change lanes OR slow to limit-minus-20 (or 5 mph if limit ≤ 25)",
            "Phone away, speed down, no exceptions"
          ],
          "quiz": [
            {
              "q": "Under SB 1366 (effective May 2026), you're cited for going 15 over in an active work zone with workers present. The base fine would normally be $200. What do you actually pay?",
              "options": [
                "$200 — the base fine.",
                "$300 — base plus a 50% work-zone surcharge.",
                "$400 — fines are doubled when workers are present.",
                "$1,000 — work zones carry a flat penalty."
              ],
              "correct": 2,
              "why": "SB 1366 doubles any moving-violation fine in an active work zone when workers are present. $200 becomes $400. If you injure a worker, the penalty leaves \"fine\" territory entirely and becomes a state jail felony."
            },
            {
              "q": "You're on a 65-mph TX freeway and a TxDOT crash-attenuator truck is parked on the shoulder with amber lights flashing. The left lane is occupied. Per TX Transp. Code §545.157, you must:",
              "options": [
                "Maintain 65 — the truck is on the shoulder.",
                "Slow to 45 mph (limit minus 20) until you're past.",
                "Stop and wait for the truck to move.",
                "Honk to warn the truck you're coming."
              ],
              "correct": 1,
              "why": "§545.157 requires you to either move over OR slow to 20 below the posted limit when any vehicle with activated flashing lights is on the shoulder. If you can't safely change lanes, slowing to 45 satisfies the law. Maintaining 65 next to a stopped TxDOT crew is exactly what the statute was passed to prevent."
            },
            {
              "q": "A driver in a TX work zone is distracted by their phone, drifts into a closed lane, and kills a flagger. The most likely criminal charge against the driver is:",
              "options": [
                "A Class C traffic ticket.",
                "A Class B misdemeanor.",
                "A state jail felony (180 days to 2 years).",
                "A second-degree felony (2 to 20 years)."
              ],
              "correct": 3,
              "why": "Under SB 1366, causing a worker's death in a work zone is a second-degree felony — 2 to 20 years and up to a $10,000 fine. Injury (not death) is the state jail felony tier. \"I was just looking at a notification\" is not a defense; that's exactly the conduct the statute targets."
            }
          ]
        },
        {
          "id": "11.4",
          "title": "Traffic stops — your rights, the officer's duties (CSEA)",
          "minutes": 15,
          "type": "reading",
          "body": [
            "The Community Safety Education Act (TX HB 2305, 2017) requires every Texas driver education course to teach traffic-stop interactions — your rights, your responsibilities, and the officer's duties. The legal basis is Texas Education Code §1001.110. It exists because most people only learn how a traffic stop works while in the middle of one, which is the worst possible time. The point is to make the next five minutes predictable for both sides.",
            "When you see the lights: signal, slow, and pull over to the right shoulder as soon as it's safe. If you're on a freeway, the nearest well-lit shoulder or exit is fine — you don't have to stop in a dangerous spot. Put it in park, turn off the engine, turn on your interior light if it's dark, lower the driver's window, and put both hands visibly on the wheel. Don't reach for your wallet, registration, or phone until the officer asks. Tell the officer if you have a License to Carry and where the firearm is. You must provide your license, registration, and proof of insurance on request. You do not have to answer questions like \"do you know why I stopped you?\" — a polite \"I'd rather not guess, officer\" is legal and fine.",
            "The officer has duties too. Under §1001.110 and the model curriculum, officers are expected to identify themselves, state the reason for the stop, and conduct themselves professionally. You have the right to ask why you were stopped, to record the interaction (Texas is a one-party consent state for audio), and to receive a written citation or warning rather than a verbal one. If you believe the officer acted improperly, the time to fight that is later — through a complaint to the agency or a court challenge to the citation. Arguing on the shoulder of I-35 has never once helped anyone's case, and it has gotten people hurt."
          ],
          "keyPoints": [
            "Required by TX HB 2305 / Education Code §1001.110",
            "Pull over safely, park, kill engine, interior light on, window down, hands on wheel",
            "Disclose License to Carry and firearm location if applicable",
            "You must show license/registration/insurance; you don't have to guess at violations",
            "You can record (TX = one-party consent); fight bad stops in court, not on the shoulder"
          ],
          "quiz": [
            {
              "q": "Per the Community Safety Education Act curriculum (Education Code §1001.110), which of these are you legally required to provide during a TX traffic stop?",
              "options": [
                "Your driver's license, vehicle registration, and proof of insurance.",
                "A verbal explanation of where you were going and why.",
                "Consent to search your vehicle if the officer asks.",
                "Your social media passwords if requested."
              ],
              "correct": 0,
              "why": "§1001.110's model curriculum lists license, registration, and proof of insurance as the documents you must produce on request. You are not required to explain your destination, consent to a search, or hand over passwords. Politely declining to answer non-required questions is legal."
            },
            {
              "q": "You have a TX License to Carry and a pistol in the glove box. An officer pulls you over. What does the CSEA curriculum recommend?",
              "options": [
                "Say nothing about the firearm unless directly asked.",
                "Hand the officer your LTC and reach for the pistol so they can see it.",
                "Inform the officer that you have an LTC and where the firearm is located, then keep your hands on the wheel.",
                "Get out of the car with hands raised to defuse the situation."
              ],
              "correct": 2,
              "why": "CSEA training and TX best practice: disclose the LTC and firearm location verbally, keep hands visible on the wheel, and let the officer direct any further movement. Reaching toward a firearm — even to hand it over — escalates the stop dangerously. Exiting the car uninvited is also a bad idea."
            },
            {
              "q": "You believe the officer who cited you was rude and the stop was unjustified. Per the CSEA framework, the right course of action is:",
              "options": [
                "Argue your case on the roadside until the officer relents.",
                "Refuse to sign the citation as a form of protest.",
                "Comply at the scene, then file a complaint with the agency and/or contest the citation in court.",
                "Speed off — the stop was illegitimate anyway."
              ],
              "correct": 2,
              "why": "The CSEA curriculum and §1001.110 emphasize that the roadside is not the venue for legal arguments. Comply, document (including recording — TX is one-party consent), and use the agency complaint process or court for any remedy. Refusing to sign in TX can itself be an arrestable offense."
            }
          ]
        },
        {
          "id": "11.5",
          "title": "Module 11 checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Human trafficking is best defined as:",
              "options": [
                "Smuggling people across borders for profit",
                "Using force, fraud, or coercion to make someone perform labor or commercial sex",
                "Any illegal travel arrangement",
                "Online predatory grooming only"
              ],
              "correct": 1
            },
            {
              "q": "National Human Trafficking Hotline:",
              "options": [
                "911",
                "1-800-222-1222",
                "1-888-373-7888",
                "1-800-TXTRAF1"
              ],
              "correct": 2
            },
            {
              "q": "Under §545.420, racing on a TX highway first offense:",
              "options": [
                "Class C ticket",
                "Class B misdemeanor (up to 180 days)",
                "Class A misdemeanor (up to 1 year)",
                "Felony"
              ],
              "correct": 1
            },
            {
              "q": "Racing causing death:",
              "options": [
                "Class A misdemeanor",
                "3rd-degree felony",
                "2nd-degree felony (up to 20 years)",
                "1st-degree felony"
              ],
              "correct": 2
            },
            {
              "q": "SB 1366 (eff. 2026-05-01) work-zone fine when workers present:",
              "options": [
                "No change",
                "Plus 50%",
                "Doubled",
                "Tripled"
              ],
              "correct": 2
            },
            {
              "q": "Move Over law: stopped flashing-light vehicle on shoulder, you must change lanes OR slow to:",
              "options": [
                "Limit minus 5",
                "Limit minus 10",
                "Limit minus 20 (or 5 mph if limit ≤ 25)",
                "A complete stop"
              ],
              "correct": 2
            },
            {
              "q": "CSEA documents you MUST produce at a TX traffic stop:",
              "options": [
                "License + registration + insurance",
                "License only",
                "License + travel itinerary",
                "License + social media passwords"
              ],
              "correct": 0
            },
            {
              "q": "With an LTC and pistol in glove box, the CSEA recommendation is:",
              "options": [
                "Stay silent unless asked",
                "Inform officer verbally; keep hands on wheel",
                "Hand officer the pistol",
                "Exit the vehicle"
              ],
              "correct": 1
            }
          ]
        }
      ]
    },
    {
      "id": "M12",
      "num": 12,
      "title": "Personal Responsibilities",
      "blurb": "Anatomical gifts at the DMV and the TX Driving with Disabilities voluntary registry.",
      "chapters": [
        {
          "id": "12.1",
          "title": "Anatomical gifts — the donor question at the DMV",
          "minutes": 15,
          "type": "reading",
          "body": [
            "When you apply for or renew a Texas driver's license, you are asked one question that the legislature considered important enough to write into Transportation Code §521.401: do you want to register as an organ, eye, and tissue donor? Saying yes adds you to the Donate Life Texas registry and puts a small heart symbol on your license. Saying no, or skipping the question, leaves you off the registry — your family would be asked at the time of death, which is a hard conversation to have in an ICU waiting room.",
            "One donor can save up to 8 lives through organ donation (heart, lungs, liver, kidneys, pancreas, intestines) and improve up to 75 more through tissue and cornea donation. About 10,000 Texans are on the transplant waiting list at any given time, and roughly 1,000 of them die each year before a match comes through. Donation costs the donor's family nothing — the recovery is handled by the organ procurement organization, not the family's estate or insurance — and it does not delay or alter funeral arrangements; open-casket services remain possible after most donations.",
            "A few myths worth dispelling because they actually change people's answers. Doctors do not \"give up sooner\" on registered donors — the transplant team is legally separate from the trauma team and isn't even contacted until brain death is confirmed by neurologists who have nothing to do with the registry. Your religion almost certainly permits donation; every major US faith tradition treats it as compatible with their teachings, and many actively encourage it. And you are not \"too young\" or \"too unhealthy\" — eligibility is determined at the time of death based on the condition of specific organs, not on a checkbox somewhere. The answer to the DMV question is yours alone, but make sure you're answering it based on facts."
          ],
          "keyPoints": [
            "TX Transp. Code §521.401 — the donor question is asked at every license issuance/renewal",
            "Saying yes registers you with Donate Life Texas; a heart appears on your license",
            "1 donor: up to 8 lives saved (organs) + 75 improved (tissue/cornea)",
            "~10,000 Texans waiting; ~1,000 die annually before a match",
            "No cost to family, no delay to funeral arrangements, no interference with medical care"
          ],
          "quiz": [
            {
              "q": "When you check \"yes\" to the donor question at a TX driver's license office, what actually happens (per §521.401)?",
              "options": [
                "Nothing — it's a survey question only.",
                "You're added to the Donate Life Texas registry and a donor symbol is printed on your license.",
                "Your family is automatically required to donate your organs at death.",
                "You sign away rights to refuse future medical treatment."
              ],
              "correct": 1,
              "why": "§521.401 establishes the registry mechanism: a \"yes\" registers you with Donate Life Texas and adds the heart symbol to your license. It does not bind your family in advance of consent procedures, and it has zero effect on your living medical care."
            },
            {
              "q": "A friend tells you they're not registering as a donor because \"doctors won't try as hard to save you if they know.\" The accurate response is:",
              "options": [
                "They have a point — better to leave the question blank.",
                "The transplant team is legally separate from the trauma team and isn't involved until brain death is independently confirmed.",
                "It's only true at smaller hospitals.",
                "True, but the lives saved make it worth it."
              ],
              "correct": 1,
              "why": "This is the most common myth and it's false. The medical teams treating you have no role in organ procurement, no access to your donor status during treatment, and a legal duty to attempt to save your life regardless. The procurement organization is a separate entity contacted only after death has been declared by neutral physicians."
            },
            {
              "q": "One registered organ donor can potentially save or improve approximately how many lives?",
              "options": [
                "1 — the recipient of the heart.",
                "2 to 3 — close family members only.",
                "Up to 8 saved through organs, plus up to 75 improved through tissue and cornea.",
                "Around 1,000 — donations are pooled."
              ],
              "correct": 2,
              "why": "Up to 8 lives saved through solid organ donation (heart, lungs, liver, two kidneys, pancreas, intestines) and up to ~75 more improved through tissue and cornea donation. The reason TX bothers asking the question at every renewal is this multiplier — and the ~1,000 Texans who die waiting each year."
            }
          ]
        },
        {
          "id": "12.2",
          "title": "Driving with Disabilities — the TX voluntary registry",
          "minutes": 15,
          "type": "reading",
          "body": [
            "Texas HB 1554 (2021), codified at Transportation Code §521.142(g), created the Texas Driving with Disabilities Program. It's a voluntary registry that lets a driver — or any household member who routinely rides with them — note a communication-impacting condition that an officer should know about before walking up to the car. Eligible conditions include autism spectrum disorder, deafness or hard of hearing, Down syndrome, PTSD, traumatic brain injury, mobility-affecting conditions, and others that may make a standard traffic-stop interaction read as evasive or noncompliant when it isn't.",
            "The mechanism is simple. You (or a parent/guardian) submit a one-page form to DPS along with a brief verification from a licensed physician or relevant professional. The disability flag is attached to the vehicle's registration record in the same database an officer queries when they run your plate — so the note appears on their in-car computer before the officer is even out of their cruiser. The information is not printed on the license or registration itself, doesn't affect insurance, and can be removed at any time by the registrant. It applies to the vehicle, not the person, so multiple household members can be listed.",
            "The point is to prevent escalations that started with a misread. A deaf driver who doesn't respond to a verbal command, an autistic teen who avoids eye contact, a veteran with PTSD who flinches when a flashlight hits the window — all of these can look to an officer like resistance or impairment. The registry gives the officer the context up front, so they can adjust how they approach the stop (writing things down, removing the flashlight, calling for an interpreter). Signing up is free, takes a few minutes, and is one of the more effective civil-rights tools TX has passed in the last decade. The form is on the DPS website under \"Texas Driving with Disabilities.\""
          ],
          "keyPoints": [
            "TX HB 1554 (2021) / Transp. Code §521.142(g) — voluntary disability registry",
            "Covers autism, deafness/HOH, Down syndrome, PTSD, TBI, mobility, and similar",
            "Flag appears on the officer's screen when they run the plate — before they approach",
            "Not printed on license/registration, doesn't affect insurance, removable anytime",
            "Free, one-page DPS form + professional verification; signs up the vehicle, not the person"
          ],
          "quiz": [
            {
              "q": "Under the TX Driving with Disabilities Program (Transp. Code §521.142(g)), where does a registered disability flag actually appear?",
              "options": [
                "Printed on the front of the driver's license.",
                "Visible on a window decal that the driver must display.",
                "In the DPS database tied to the vehicle's plate, visible to an officer who runs the plate.",
                "On a wristband the driver wears while operating the vehicle."
              ],
              "correct": 2,
              "why": "§521.142(g) ties the flag to the vehicle registration record, not the license or any visible marker. An officer sees the note when they run the plate from their cruiser — before the approach — without the driver having to advertise the condition publicly."
            },
            {
              "q": "A teen with autism and a deaf older sister live in the same household and share a car. Per the program rules, who can be listed on the disability registry for that vehicle?",
              "options": [
                "Only the registered owner of the car.",
                "Only the teen, because they're the driver.",
                "Both — the registry applies to the vehicle and can list multiple household members.",
                "Neither, because autism and deafness are not eligible conditions."
              ],
              "correct": 2,
              "why": "The registry attaches to the vehicle, so any household member who routinely rides in it can be listed. Both autism and deafness/hard-of-hearing are explicitly enumerated eligible conditions in the HB 1554 program. The goal is for the officer to know what they might encounter regardless of which family member is in which seat."
            },
            {
              "q": "A friend with PTSD is worried that signing up for the disability registry will hurt their car insurance rates or end up on their license. What's accurate?",
              "options": [
                "They're right to worry — insurers receive registry data.",
                "The flag will appear on their license, but insurance won't see it.",
                "The flag is internal to DPS, not printed on the license, and has no effect on insurance; they can also remove it any time.",
                "Registry data is shared with employers under TX law."
              ],
              "correct": 2,
              "why": "Per HB 1554 / §521.142(g), the registry is internal to DPS, not visible on the license or registration, not shared with insurers or employers, and revocable at the registrant's request. The whole design assumes people will only enroll if the cost of enrolling is zero — and it is."
            }
          ]
        },
        {
          "id": "12.3",
          "title": "Module 12 final checkpoint",
          "minutes": 30,
          "type": "checkpoint",
          "exam": [
            {
              "q": "Under TX Transp. Code §521.401, the donor question is asked:",
              "options": [
                "Only the first time you get a license",
                "At every license issuance and renewal",
                "Only by request",
                "Only at age 18"
              ],
              "correct": 1
            },
            {
              "q": "Approximate lives one organ donor can save:",
              "options": [
                "1",
                "2-3",
                "Up to 8 (plus ~75 improved via tissue/cornea)",
                "Hundreds"
              ],
              "correct": 2
            },
            {
              "q": "Common organ donor myth (FALSE):",
              "options": [
                "Donation is free to the family",
                "Doctors will not try as hard to save a registered donor",
                "Open-casket funerals remain possible",
                "You're not too young to be eligible"
              ],
              "correct": 1
            },
            {
              "q": "TX Driving with Disabilities Program (HB 1554 / §521.142(g)) flag is:",
              "options": [
                "Printed on the license",
                "A required window decal",
                "A DPS database flag tied to the vehicle's plate",
                "A medical bracelet"
              ],
              "correct": 2
            },
            {
              "q": "Eligible disabilities for the registry include:",
              "options": [
                "Autism only",
                "Deafness only",
                "Autism, deafness/HOH, Down syndrome, PTSD, TBI, mobility",
                "Only physical disabilities"
              ],
              "correct": 2
            },
            {
              "q": "Effect on insurance from joining the disabilities registry:",
              "options": [
                "Rates double",
                "Rates increase 25%",
                "None — registry is internal to DPS",
                "Insurance is canceled"
              ],
              "correct": 2
            },
            {
              "q": "You can remove yourself from the disabilities registry:",
              "options": [
                "Never",
                "Only by court order",
                "At any time, free of charge",
                "Only after 5 years"
              ],
              "correct": 2
            },
            {
              "q": "Cost to enroll in the TX disabilities registry:",
              "options": [
                "$25",
                "$50 + medical fee",
                "Free",
                "$100/year"
              ],
              "correct": 2
            }
          ]
        }
      ]
    }
  ]
};

// Helpers
(function () {
  const c = window.APEX_CURRICULUM;
  c.allChapters = c.modules.flatMap(m => m.chapters.map(ch => Object.assign({ moduleId: m.id, moduleNum: m.num, moduleTitle: m.title }, ch)));
  c.totalMinutes = c.allChapters.reduce((s, ch) => s + (ch.minutes || 0), 0);
  c.byId = id => c.allChapters.find(ch => ch.id === id) || null;
  c.moduleOf = id => c.modules.find(m => m.chapters.some(ch => ch.id === id));
  c.nextChapter = id => {
    const i = c.allChapters.findIndex(ch => ch.id === id);
    return i >= 0 && i < c.allChapters.length - 1 ? c.allChapters[i + 1] : null;
  };
  c.prevChapter = id => {
    const i = c.allChapters.findIndex(ch => ch.id === id);
    return i > 0 ? c.allChapters[i - 1] : null;
  };
  c.isUnlocked = (id, completedList) => {
    completedList = completedList || [];
    const idx = c.allChapters.findIndex(ch => ch.id === id);
    if (idx <= 0) return true;
    return completedList.includes(c.allChapters[idx - 1].id);
  };
})();
