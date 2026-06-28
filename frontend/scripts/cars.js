// APEX — car catalog (mirrors backend/main.py CAR_CATALOG).
// Each car has a level unlock + driving-feel stats + simple geometry params.
// The simulator (drive.html) picks geometry colors and dimensions from here.

window.APEX_CARS = [
  {
    id: 'sedan-base', name: 'Origin Sedan', tagline: 'Where everyone starts.',
    class: 'A', level: 1,
    topSpeed: 120, accel: 8.5,            // mph, 0-60 sec
    color: 0x9ca3af, accentColor: 0xffffff,
    body: { length: 4.6, width: 1.85, height: 1.42, hood: 0.8, trunk: 0.7, cabinHeight: 0.55 }
  },
  {
    id: 'coupe-sport', name: 'Vector Coupe', tagline: 'First taste of speed.',
    class: 'B', level: 5,
    topSpeed: 180, accel: 6.5,
    color: 0x00d4ff, accentColor: 0x00f5a0,
    body: { length: 4.5, width: 1.92, height: 1.30, hood: 1.0, trunk: 0.8, cabinHeight: 0.45 }
  },
  {
    id: 'super-mint', name: 'Mint Apex', tagline: 'Your name. Your car.',
    class: 'S', level: 10,
    topSpeed: 240, accel: 4.2,
    color: 0x00f5a0, accentColor: 0x0a0a0d,
    body: { length: 4.7, width: 2.00, height: 1.18, hood: 1.2, trunk: 0.6, cabinHeight: 0.40 }
  },
  {
    id: 'hyper-cyan', name: 'Hyper One', tagline: 'Bend physics, slightly.',
    class: 'S+', level: 15,
    topSpeed: 290, accel: 3.0,
    color: 0x22d3ee, accentColor: 0x00f5a0,
    body: { length: 4.8, width: 2.04, height: 1.10, hood: 1.4, trunk: 0.5, cabinHeight: 0.36 }
  },
  {
    id: 'f1-prototype', name: 'Prototype X', tagline: 'For the road test final.',
    class: 'F1', level: 20,
    topSpeed: 340, accel: 2.2,
    color: 0xffb020, accentColor: 0x0a0a0d,
    body: { length: 5.2, width: 1.85, height: 0.94, hood: 1.7, trunk: 0.5, cabinHeight: 0.32 }
  },
  {
    id: 'concept-exotic', name: 'Concept Z', tagline: 'You earned this.',
    class: 'X', level: 25,
    topSpeed: 400, accel: 1.8,
    color: 0xff3b5c, accentColor: 0x00f5a0,
    body: { length: 4.9, width: 2.10, height: 1.08, hood: 1.5, trunk: 0.5, cabinHeight: 0.34 }
  },
];

window.APEX_CAR_BY_ID = Object.fromEntries(window.APEX_CARS.map(c => [c.id, c]));
