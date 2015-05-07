(function () {

  var expect = require('chai').expect,
      module = require('../src/js/scaleFactory'),
      note = {},
      scale = {},
      lowerBound,
      upperBound;

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

  lowerBound = note.C0;
  upperBound = note.B8;

  // adjusted by up to 0.01Hz to allow for rounding 
  scale.C4SingleOctave = [
    261.63, // C4
    293.67, // D4
    329.63, // E4
    349.23, // F4
    392.00, // G4
    440.01, // A4
    493.89, // B4
    523.26, // C5 
  ];

  scale.A0ChromaticEighteenNotes = [
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

  // adjusted by up to 0.02Hz to allow for rounding 
  scale.Gb2WholeToneScaleThreeOctaves = [
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

  scale.C4MajorPentatonicTwoOctaves = [
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

  scale.Ab1MinorPentatonic6Notes = [
    51.91, // Ab1
    61.73, // B1
    69.29, // Db2
    77.78, // Eb2
    92.49, // Gb2
    103.82 // Ab2
  ];

  scale.Ab1MinorPentatonic30Notes = [
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

  describe('ScaleFactory', function () {

    describe('getIntervalFromA4()', function () {
      var getIntervalFromA4 = module.getIntervalFromA4;

      it('exists', function () {
        expect(typeof getIntervalFromA4).to.equal('function');
      });

      it('returns correct interval for B4', function () {
        var result = getIntervalFromA4('B', 4);

        expect(result).to.equal(2);
      });

      it('returns correct interval for G4', function () {
        var result = getIntervalFromA4('G', 4);

        expect(result).to.equal(-2);
      });

      it('returns correct interval for A2', function () {
        var result = getIntervalFromA4('A', 2);

        expect(result).to.deep.equal(-24);
      });

      it('returns correct interval for A6', function () {
        var result = getIntervalFromA4('A', 6);

        expect(result).to.deep.equal(24);
      });

      it('returns correct interval for C0', function () {
        var result = getIntervalFromA4('C', 0);

        expect(result).to.deep.equal(-57);
      });

      it('returns correct interval for B8', function () {
        var result = getIntervalFromA4('B', 8);

        expect(result).to.deep.equal(50);
      });

      xit('handles invalid input, out of bounds etc.', function () {

      });
    });

    describe('getIntervalAdjustment()', function () {
      var getIntervalAdjustment = module.getIntervalAdjustment;

      it('exists', function () {
        expect(typeof getIntervalAdjustment).to.equal('function');
      });

      it('returns correct adjustment for "#"', function () {
        var result = getIntervalAdjustment('#');

        expect(result).to.equal(1);
      });

      it('returns correct adjustment for "b"', function () {
        var result = getIntervalAdjustment('b');

        expect(result).to.equal(-1);
      });

      xit('handles invalid input, out of bounds etc.', function () {

      });
    });

    describe('getNoteByName()', function () {
      var getNoteByName = module.getNoteByName;

      it('exists', function () {
        expect(typeof getNoteByName).to.equal('function');
      });

      it('returns correct frequency for A4', function () {
        var result = getNoteByName('A4');

        expect(result).to.equal(note.A4);
      });

      it('returns correct frequency for C0', function () {
        var result = getNoteByName('C0');

        expect(result).to.equal(note.C0);
      });

      it('returns correct frequency for B8', function () {
        var result = getNoteByName('B8');

        expect(result).to.equal(note.B8);
      });

      it('returns correct frequency for F#3', function () {
        var result = getNoteByName('F#3');

        expect(result).to.equal(note.Gb3);
      });

      it('returns correct frequency for Bb5', function () {
        var result = getNoteByName('Bb5');

        expect(result).to.equal(note.Bb5);
      });

      it('returns correct frequency for Cb2', function () {
        var result = getNoteByName('Cb2');

        expect(result).to.equal(note.Cb2);
      });

      xit('handles invalid input, out of bounds etc.', function () {
        expect(true).to.equal(false);
      });
    });

    describe('getNoteByInterval()', function () {
      var getNoteByInterval = module.getNoteByInterval;

      it('exists', function () {
        expect(typeof getNoteByInterval).to.equal('function');
      });

      it('gets frequency 4 semitones above A4 (Db5)', function () {
        expect(getNoteByInterval(note.A4, 4)).to.equal(note.Db5);
      });

      it('gets frequency 20 semitones below E7 (Ab5)', function () {
        expect(getNoteByInterval(note.E7, -20)).to.equal(note.Ab5);
      });

      it('returns lower bound when asked to provide note below lower bound, ', function () {
        expect(getNoteByInterval(lowerBound, -1)).to.equal(lowerBound);
      });

      it('returns upper bound when asked to provide note above upper bound', function () {
        expect(getNoteByInterval(upperBound, 1)).to.equal(upperBound);
      });

      it('throws an error when an argument is missing', function () {
        var thrownError = null,
            isAnError = false;

        try {
          getNoteByInterval(440);
        }
        catch (error) {
          thrownError = error;
        }

        expect(thrownError instanceof Error).to.equal(true);
      });

      it('throws an error when the first argument is not a number', function () {
        var thrownError = null,
            isAnError = false;

        try {
          getNoteByInterval('foo', 100);
        }
        catch (error) {
          thrownError = error;
        }

        isAnError = thrownError instanceof Error;

        expect(thrownError instanceof Error).to.equal(true);
      });

      it('throws an error when the second argument is not a number', function () {
        var thrownError = null,
            isAnError = false;

        try {
          getNoteByInterval(100, 'foo');
        }
        catch (error) {
          thrownError = error;
        }

        isAnError = thrownError instanceof Error;

        expect(thrownError instanceof Error).to.equal(true);
      });

    });

    describe('getScale()', function () {
      var getScale = module.getScale;

      it('exists', function () {
        expect(typeof getScale).to.equal('function');
      });

      it('makes a C major scale, single octave (8 notes), starting at C4', function () {
        var result = getScale('major', 'C4', 8);

        expect(result).to.deep.equal(scale.C4SingleOctave);
      });

      it('makes a chromatic scale, 18 notes, starting at A0', function () {
        var result = getScale('chromatic', 'A0', 18);

        expect(result).to.deep.equal(scale.A0ChromaticEighteenNotes);
      });

      it('makes a whole tone scale, three octaves (19 notes), starting at Gb2', function () {
        var result = getScale('wholeTone', 'Gb2', 19);

         expect(result).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves);
      });

      it('makes a major pentatonic scale, two octaves (11 notes), starting at C5', function () {
        var result = getScale('majorPentatonic', 'C5', 11);

        expect(result).to.deep.equal(scale.C4MajorPentatonicTwoOctaves);
      });

      it('makes a minor pentatonic scale, 6 notes, starting at Ab1', function () {
        var result = getScale('minorPentatonic', 'Ab1', 6);

        expect(result).to.deep.equal(scale.Ab1MinorPentatonic6Notes);
      });

      it('makes a minor pentatonic scale, 30 notes, starting at Ab1', function () {
        var result = getScale('minorPentatonic', 'Ab1', 30);

        expect(result).to.deep.equal(scale.Ab1MinorPentatonic30Notes);
      });

      xit('handles invalid input, out of bounds etc.', function () {

      });

    });

  });

})();
