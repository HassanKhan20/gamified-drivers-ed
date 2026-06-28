// REFERENCE CHAPTER — the quality + density bar for the content expansion.
// This is chapter 3.3 rewritten from ~103 words to ~1,350 words of teaching
// across 10 teach beats, + a worked example, + an embedded mini-scenario,
// + 8 interleaved checks. For a 50-min floor at ~27 words/floor-min.
// Every other chapter is expanded to match this structure and density.

{
  id: '3.3', title: 'Stability, traction, and weight transfer', minutes: 50, type: 'reading',

  // 10 teach beats — each ONE idea, so the loop player shows one card at a time.
  body: [
    'Here is the single most useful idea in this entire course: your tires only have so much grip, and everything you do with the car spends it. Accelerating spends grip. Braking spends grip. Turning spends grip. The crashes that kill new drivers almost always come down to one mistake — asking the tires for more grip than they have, all at once.',

    'Picture each tire with a "grip budget" of 100 units. On dry pavement a good tire might have all 100 available. Braking in a straight line might spend 90 of those units — fine, you have 90, the car stops. Turning gently through a curve might spend 40 units — also fine. The danger is doing both at the same time: 90 for braking plus 40 for turning is 130 units of grip demanded from a tire that only has 100. The tire can\'t deliver it, so it stops gripping and starts sliding. That slide is a skid.',

    'This is why the phrase "slamming the brakes in a turn" is shorthand for "losing the car." You were already spending grip to turn. Stack hard braking on top and you blow past 100%. The front tires (or rear, depending) give up, and now you\'re a 3,000-pound object traveling in whatever direction physics chose, not you.',

    'The grip budget shrinks when conditions get worse. Rain might cut your total from 100 to 50. Ice can take it to 10. Gravel, wet leaves, oil patches, the first ten minutes of light rain on a road that hasn\'t rained in weeks — all of these quietly lower the budget. The mistake isn\'t driving on a low-grip surface; it\'s driving on one as if you still had 100 units to spend.',

    'Now, weight transfer — the second half of the picture. A car is not a rigid block; its weight shifts around as you drive, and grip follows weight. When you brake, the nose dives and weight shifts forward. That actually *loads* the front tires, giving them more grip (good, because the front brakes do most of the work) while *unloading* the rear tires (they now have less grip and can step out).',

    'When you accelerate, the opposite happens: weight shifts to the rear, the front end gets light, and the front tires lose some grip. This is why flooring the gas mid-corner in a powerful car can push the nose wide — the front tires you\'re steering with just got unloaded. When you turn, weight shifts to the *outside* tires (turn left, weight goes right). The outside tires are doing most of the cornering work precisely because they\'re the most loaded.',

    'The pattern underneath all of it: weight transfers toward whatever direction the car is trying to NOT go. Brake (car wants to keep going forward) → weight goes forward. Turn left (car wants to keep going straight) → weight goes right. Once you feel this, you stop being surprised by the car. You can predict which tires are loaded and which are about to give up.',

    'So what do you actually DO with this? You separate your inputs. Brake first, in a straight line, while you still can. Get your speed off BEFORE the corner, not during it. Then ease off the brake, let the car settle, and steer through the corner with grip to spare. Then, once the wheel is coming back to straight, get back on the gas. Brake — settle — steer — settle — accelerate. Each input gets its own slice of the grip budget instead of fighting the others for it.',

    'Race drivers call the smooth version of this "slow hands, slow feet." Every input is gradual. You can induce a skid with a violent stab at any control — a panic brake, a yank of the wheel, a stomp on the gas. The same maneuver done smoothly keeps the tires inside their budget. Smoothness isn\'t a style preference; it\'s how you stay under 100%.',

    'If you DO exceed the budget and the car starts to slide, the recovery is counterintuitive but simple: ease off whatever you were overdoing. Skidding while braking? Ease off the brake (or, with ABS, keep firm pressure and let the system pulse). Skidding while accelerating? Lift off the gas smoothly — don\'t stab it. Rear sliding out in a turn? Ease off, and steer gently in the direction the rear is sliding. In every case the move is to give grip back to the tire by asking less of it. Panic does the opposite, which is why panic crashes.',
  ],

  keyPoints: [
    'Each tire has ~100% of grip to share across braking + turning + accelerating',
    'Combining hard inputs (brake + turn) demands >100% → skid',
    'Grip budget shrinks with rain (~50%), ice (~10%), gravel, oil',
    'Weight transfers toward the direction the car is trying NOT to go',
    'Separate inputs: brake → settle → steer → settle → accelerate',
    'Recovery = ease off whatever you were overdoing (give grip back)',
  ],

  // NEW: a concrete TX-specific worked example, rendered as its own beat.
  worked: {
    setup: 'You\'re on a 45 mph access road in Houston. It\'s the first light rain in three weeks, so the road is greasy with oil. A light ahead turns red and you need to make the right turn just before it.',
    walkthrough: 'Wrong way: you carry 45 mph toward the turn, then brake AND crank the wheel together. On a dry day the tires might absorb it. Today the grip budget is ~50%, you demand ~130%, the front washes out, and you slide straight through the turn into the curb. Right way: you brake early and hard while still pointed straight — straight-line braking can use nearly the whole reduced budget safely — bleed off to ~15 mph BEFORE the turn, release the brake, let the nose come back up, then steer through with grip to spare. Same corner, same rain, opposite outcome. The only difference is that you spent your grip one input at a time.',
  },

  // NEW: an embedded branching decision mid-chapter for interaction.
  miniScenario: {
    prompt: 'You\'re turning left through a curve at 35 mph and you realize halfway through that you\'re carrying too much speed — the curve is tightening. What do you do?',
    options: [
      'Brake hard NOW, mid-corner, to scrub the speed.',
      'Ease off the gas gently and tighten your steering line smoothly.',
      'Keep the gas steady and hope the tires hold.',
    ],
    correct: 1,
    feedback: {
      0: { good: false, body: 'Hard braking mid-corner stacks braking grip on top of cornering grip you\'re already using → you blow the budget and the front (or rear) lets go. This is the classic "braked in the curve, lost the car" crash.' },
      1: { good: true, body: 'Lifting off the gas gently shifts a little weight forward (more front grip to steer with) and sheds speed without a violent input. Smooth and survivable.' },
      2: { good: false, body: 'Hoping is not an input. If the curve is genuinely tightening and you\'re over budget, doing nothing means running wide into the oncoming lane or the shoulder.' },
    },
  },

  // 8 checks — the loop player places these after roughly every 1-2 teach beats.
  quiz: [
    { q: 'Your tires\' total available grip is best described as:',
      options: ['Unlimited on dry pavement', 'A fixed "budget" shared across braking, turning, and accelerating', 'Only relevant when braking', 'Determined by how new the tires look'],
      correct: 1, why: 'Grip is a finite budget. Every input (brake/turn/accelerate) spends from the same ~100% pool at each tire.' },
    { q: 'Braking hard AND steering hard at the same time tends to:',
      options: ['Stop the car faster', 'Cause a skid because you demand more grip than the tire has', 'Automatically engage ABS', 'Improve cornering grip'],
      correct: 1, why: 'Stacking two high-demand inputs exceeds the ~100% budget, so the tire stops gripping and slides.' },
    { q: 'In rain, your grip budget might drop to roughly:',
      options: ['90%', '50%', '5%', 'It does not change'],
      correct: 1, why: 'Wet pavement roughly halves available grip — which is why the same maneuver that\'s fine when dry can break traction in the rain.' },
    { q: 'When you brake, weight transfers:',
      options: ['Forward, loading the front tires', 'Backward, loading the rear tires', 'To the outside tires', 'It stays evenly distributed'],
      correct: 0, why: 'Braking pitches the nose down and loads the front tires — which is useful, since the front brakes do most of the stopping.' },
    { q: 'The underlying rule for weight transfer is: weight shifts toward:',
      options: ['Whatever direction the car is trying to go', 'Whatever direction the car is trying NOT to go', 'Always the front', 'Always the heaviest corner'],
      correct: 1, why: 'Brake (car wants to keep going forward) → weight forward. Turn left (car wants to keep going straight) → weight right.' },
    { q: 'The safe input pattern through a corner is:',
      options: ['Brake and steer together, hard', 'Brake → settle → steer → settle → accelerate', 'Accelerate through the whole corner', 'Steer first, then brake mid-corner'],
      correct: 1, why: 'Separating inputs gives each one its own share of the grip budget instead of forcing them to compete past 100%.' },
    { q: 'You enter a curve too fast and it\'s tightening. The best move is to:',
      options: ['Brake hard mid-corner', 'Ease off the gas gently and tighten your line smoothly', 'Stab the gas to "settle" the car', 'Yank the wheel harder'],
      correct: 1, why: 'A gentle lift shifts weight forward for more steering grip and sheds speed without a violent, budget-blowing input.' },
    { q: 'If a tire starts to skid, the recovery principle is to:',
      options: ['Add more of the input that caused it', 'Ease off whatever you were overdoing, giving grip back', 'Close your eyes and brace', 'Always brake harder'],
      correct: 1, why: 'A skid means you exceeded the budget. Reducing the offending input drops demand back under 100% and the tire grips again.' },
  ],
}
