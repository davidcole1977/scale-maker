module.exports = (function () {

  var scale = {},
      note;

  // Frequencies ref: http://www.phy.mtu.edu/~suits/notefreqs.html
  note = {
    C0: 16.35,
    Cb2: 61.74,
    A0: 27.50,
    Gb2: 92.50,
    Gb3: 185,
    C4: 261.63,
    A4: 440,
    C5: 523.25,
    Db5: 554.37,
    Ab5: 830.61,
    Bb5: 932.33,
    E7: 2637.02,
    B8: 7902.13
  };

  // scale return values in hertz have been adjusted in some instance to account for rounding
  scale.C4MajorSingleOctave = {};
  scale.C4MajorSingleOctave.options = {
    type: 'major',
    startNote: 'C4',
    noteCount: 8
  };
  scale.C4MajorSingleOctave.inHertz = [
    261.63, // C4
    293.67, // D4
    329.63, // E4
    349.23, // F4
    392.00, // G4
    440.01, // A4
    493.89, // B4
    523.26 // C5 
  ];
  scale.C4MajorSingleOctave.inSemiTones = [
    0,
    2,
    4,
    5,
    7,
    9,
    11,
    12
  ];
  scale.C4MajorSingleOctave.inCents = scale.C4MajorSingleOctave.inSemiTones.map(function (semitones) {
    return semitones * 100;
  });

  scale.A0ChromaticEighteenNotes = {};
  scale.A0ChromaticEighteenNotes.options = {
    type: 'chromatic',
    startNote: 'A0',
    noteCount: 18
  };
  scale.A0ChromaticEighteenNotes.inHertz = [
    27.50, // A0
    29.14, // Bb0
    30.87, // B0
    32.70, // C1
    34.65, // Db1
    36.71, // D1
    38.89, // Eb1
    41.20, // E1
    43.65, // F1
    46.25, // Gb1
    49.00, // G1
    51.91, // Ab1
    55.00, // A1
    58.27, // Bb1
    61.74, // B1
    65.41, // C2
    69.30, // Db2
    73.42 // D2
  ];
  scale.A0ChromaticEighteenNotes.inSemiTones = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
  ];
  scale.A0ChromaticEighteenNotes.inCents = scale.A0ChromaticEighteenNotes.inSemiTones.map(function (semitones) {
    return semitones * 100;
  });

  scale.Gb2WholeToneScaleThreeOctaves = {};
  scale.Gb2WholeToneScaleThreeOctaves.options = {
    type: 'wholeTone',
    startNote: 'Gb2',
    noteCount: 19
  };
  scale.Gb2WholeToneScaleThreeOctaves.inHertz = [
    92.50, // Gb2
    103.83, // Ab2
    116.54, // Bb2
    130.81, // C3
    146.83, // D3
    164.82, // E3
    185.00, // Gb3
    207.66, // Ab3
    233.09, // Bb3
    261.63, // C4
    293.67, // D4
    329.63, // E4
    370.00, // Gb4
    415.31, // Ab4
    466.17, // Bb4
    523.26, // C5
    587.34, // D5
    659.27, // E5
    740 // Gb5
  ];
  scale.Gb2WholeToneScaleThreeOctaves.inSemiTones = [
    0,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36
  ];
  scale.Gb2WholeToneScaleThreeOctaves.inCents = scale.Gb2WholeToneScaleThreeOctaves.inSemiTones.map(function (semitones) {
    return semitones * 100;
  });

  scale.C4MajorPentatonicTwoOctaves = {};
  scale.C4MajorPentatonicTwoOctaves.options = {
    type: 'majorPentatonic',
    startNote: 'C5',
    noteCount: 11
  };
  scale.C4MajorPentatonicTwoOctaves.inHertz = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50, // C6
    1174.66, // D6
    1318.51, // E6
    1567.98, // G6
    1760.00, // A6
    2093.00 // C7
  ];
  scale.C4MajorPentatonicTwoOctaves.inSemiTones = [
    0,
    2,
    4,
    7,
    9,
    12,
    14,
    16,
    19,
    21,
    24
  ];
  scale.C4MajorPentatonicTwoOctaves.inCents = scale.C4MajorPentatonicTwoOctaves.inSemiTones.map(function (semitones) {
    return semitones * 100;
  });

  scale.Ab1MinorPentatonic30Notes = {};
  scale.Ab1MinorPentatonic30Notes.options = {
    type: 'minorPentatonic',
    startNote: 'Ab1',
    noteCount: 30
  };
  scale.Ab1MinorPentatonic30Notes.inHertz = [
    51.91, // Ab1
    61.73, // B1
    69.29, // Db2
    77.78, // Eb2
    92.49, // Gb2
    103.82, // Ab2
    123.46, // B2
    138.58, // Db3
    155.55, // Eb3
    184.99, // Gb3
    207.64, // Ab3
    246.93, // B3
    277.17, // Db4
    311.11, // Eb4
    369.97, // Gb4
    415.28, // Ab4
    493.85, // B4
    554.33, // Db5
    622.22, // Eb5
    739.94, // Gb5
    830.56, // Ab5
    987.71, // B5
    1108.66, // Db6
    1244.43, // Eb6
    1479.89, // Gb6
    1661.12, // Ab6
    1975.42, // B6
    2217.33, // Db7
    2488.87, // Eb7
    2959.78, // Gb7
  ];
  scale.Ab1MinorPentatonic30Notes.inSemiTones = [
    0,
    3,
    5,
    7,
    10,
    12,
    15,
    17,
    19,
    22,
    24,
    27,
    29,
    31,
    34,
    36,
    39,
    41,
    43,
    46,
    48,
    51,
    53,
    55,
    58,
    60,
    63,
    65,
    67,
    70
  ];
  scale.Ab1MinorPentatonic30Notes.inCents = scale.Ab1MinorPentatonic30Notes.inSemiTones.map(function (semitones) {
    return semitones * 100;
  });

  return {
    note: note,
    scale: scale
  };
  
})();
