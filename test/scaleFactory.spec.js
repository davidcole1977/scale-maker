(function () {

  var expect = require('chai').expect,
      module = require('../src/js/scaleFactory'),
      note = require('./example-scales.js').note,
      scale = require('./example-scales.js').scale,
      lowerBound,
      upperBound;

  lowerBound = note.C0;
  upperBound = note.B8;

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

    describe('getCentsByInterval', function () {
      var getCentsByInterval = module.getCentsByInterval;

      it('provides correct value in cents for 0 semitones', function () {
        expect(getCentsByInterval(0)).to.equal(0);
      });

      it('provides correct value in cents for 1 semitone', function () {
        expect(getCentsByInterval(1)).to.equal(100);
      });

      it('provides correct value in cents for 33.33 semitones', function () {
        expect(getCentsByInterval(33.33)).to.equal(3333);
      });

      it('provides correct value in cents for -1 semitone', function () {
        expect(getCentsByInterval(-1)).to.equal(-100);
      });

      it('provides correct value in cents for -33.33 semitones', function () {
        expect(getCentsByInterval(-33.33)).to.equal(-3333);
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

        expect(result.inHertz).to.deep.equal(scale.C4MajorSingleOctave.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.C4MajorSingleOctave.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.C4MajorSingleOctave.inCents);
      });

      it('makes a chromatic scale, 18 notes, starting at A0', function () {
        var result = getScale('chromatic', 'A0', 18);

        expect(result.inHertz).to.deep.equal(scale.A0ChromaticEighteenNotes.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.A0ChromaticEighteenNotes.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.A0ChromaticEighteenNotes.inCents);
      });

      it('makes a whole tone scale, three octaves (19 notes), starting at Gb2', function () {
        var result = getScale('wholeTone', 'Gb2', 19);

        expect(result.inHertz).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inCents);
      });

      it('makes a major pentatonic scale, two octaves (11 notes), starting at C5', function () {
        var result = getScale('majorPentatonic', 'C5', 11);

        expect(result.inHertz).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inCents);
      });

      it('makes a minor pentatonic scale, 6 notes, starting at Ab1', function () {
        var result = getScale('minorPentatonic', 'Ab1', 6);

        expect(result.inHertz).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inCents);
      });

      it('makes a minor pentatonic scale, 30 notes, starting at Ab1', function () {
        var result = getScale('minorPentatonic', 'Ab1', 30);

        expect(result.inHertz).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inHertz);
        expect(result.inSemiTones).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inSemiTones);
        expect(result.inCents).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inCents);
      });

      xit('handles invalid input, out of bounds etc.', function () {

      });

    });

  });

})();
