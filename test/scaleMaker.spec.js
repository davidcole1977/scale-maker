(function () {

  var expect = require('chai').expect,
      module = require('../lib/scaleMaker'),
      note = require('./example-scales').note,
      scale = require('./example-scales').scale,
      lowerBound = note.C0,
      upperBound = note.B8;

  describe('ScaleFactory', function () {

    describe('public API', function () {

      describe('getNote()', function () {
        var getNote = module.getNote;

        it('exists', function () {
          expect(getNote).to.exist;
        });

        it('returns correct frequency for A4', function () {
          expect(getNote('A4')).to.equal(note.A4);
        });

        it('returns correct frequency for C0', function () {
          expect(getNote('C0')).to.equal(note.C0);
        });

        it('returns correct frequency for B8', function () {
          expect(getNote('B8')).to.equal(note.B8);
        });

        it('returns correct frequency for F#3', function () {
          expect(getNote('F#3')).to.equal(note.Gb3);
        });

        it('returns correct frequency for Bb5', function () {
          expect(getNote('Bb5')).to.equal(note.Bb5);
        });

        it('returns correct frequency for Cb2', function () {
          expect(getNote('Cb2')).to.equal(note.Cb2);
        });

      });

      describe('getNote() input error handling', function () {
        var getNote = module.getNote;

        it('throws an error if note name is invalid', function () {
          expect(getNote.bind(null, 'H9')).to.throw(Error);
        });

        it('throws an error if note name is missing', function () {
          expect(getNote.bind(null)).to.throw(Error);
        });

        it('throws an error if note name is an number', function () {
          expect(getNote.bind(null, 123.456)).to.throw(Error);
        });

      });

      describe('makeScale()', function () {
        var makeScale = module.makeScale;

        it('exists', function () {
          expect(makeScale).to.exist;
        });

        it('makes a C major scale, single octave (8 notes), starting at C4', function () {
          var result = makeScale('major', 'C4', 8);

          expect(result.inHertz).to.deep.equal(scale.C4MajorSingleOctave.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.C4MajorSingleOctave.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.C4MajorSingleOctave.inCents);
        });

        it('makes a chromatic scale, 18 notes, starting at A0', function () {
          var result = makeScale('chromatic', 'A0', 18);

          expect(result.inHertz).to.deep.equal(scale.A0ChromaticEighteenNotes.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.A0ChromaticEighteenNotes.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.A0ChromaticEighteenNotes.inCents);
        });

        it('makes a whole tone scale, three octaves (19 notes), starting at Gb2', function () {
          var result = makeScale('wholeTone', 'Gb2', 19);

          expect(result.inHertz).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.Gb2WholeToneScaleThreeOctaves.inCents);
        });

        it('makes a major pentatonic scale, two octaves (11 notes), starting at C5', function () {
          var result = makeScale('majorPentatonic', 'C5', 11);

          expect(result.inHertz).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.C4MajorPentatonicTwoOctaves.inCents);
        });

        it('makes a minor pentatonic scale, 6 notes, starting at Ab1', function () {
          var result = makeScale('minorPentatonic', 'Ab1', 6);

          expect(result.inHertz).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.Ab1MinorPentatonic6Notes.inCents);
        });

        it('makes a minor pentatonic scale, 30 notes, starting at Ab1', function () {
          var result = makeScale('minorPentatonic', 'Ab1', 30);

          expect(result.inHertz).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inHertz);
          expect(result.inSemiTones).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inSemiTones);
          expect(result.inCents).to.deep.equal(scale.Ab1MinorPentatonic30Notes.inCents);
        });

      });

      describe('makeScale() input error handling', function () {
        var makeScale = module.makeScale;

        it('throws an error if passed no arguments', function () {
          expect(makeScale.bind(null)).to.throw(Error);
        });

        it('throws an error if the scaleType name is invalid', function () {
          expect(makeScale.bind(null, 'invalid scale name 123^&*', 'A4', 12)).to.throw(Error);
        });

        it('throws an error if the scaleType does not exist', function () {
          expect(makeScale.bind(null, 'non-existent-scale-type', 'A4', 12)).to.throw(Error);
        });

        it('throws an error if the startNote is invalid', function () {
          expect(makeScale.bind(null, 'major', 'H9', 12)).to.throw(Error);
        });

        it('throws an error if the noteCount is invalid', function () {
          expect(makeScale.bind(null, 'major', 'A4', 0)).to.throw(Error);
        });

      });

      describe('addScale()', function () {
        var addScale = module.addScale;

        it('exists', function () {
          expect(addScale).to.exist;
        });

        it('adds a new scale definition that can be used to make a scale', function () {
          addScale('myWeirdScale', [1, 2, 3, 4, 5]);

          var result = module.makeScale('myWeirdScale', 'A4', 6).inCents;

          expect(result).to.deep.equal([0, 100, 300, 600, 1000, 1500]);
        });

      });

      describe('addScale() input error handling', function () {
        var addScale = module.addScale;

        it('throws an error if any arguments are missing', function () {
          expect(addScale.bind(null)).to.throw(Error);
        });

        it('throws an error if scale name is invalid', function () {
          expect(addScale.bind(null, 'my invalid scale name !@£$%^', [1, 2, 3, 4, 5])).to.throw(Error);
        });

        it('throws an error if scale type is already defined', function () {
          expect(addScale.bind(null, 'major', [1, 2, 3, 4, 5])).to.throw(Error);
        });

        it('throws an error if scale definition is invalid', function () {
          expect(addScale.bind(null, 'my new scale type', [1, '2', 3, '4', 5])).to.throw(Error);
        });

      });

    }); // describe('public API', function () {

    describe('private functions', function () {

      describe('getIntervalFromA4()', function () {
        var getIntervalFromA4 = module.test.getIntervalFromA4;

        it('exists', function () {
          expect(getIntervalFromA4).to.exist;
        });

        it('returns correct interval for B4', function () {
          expect(getIntervalFromA4('B', 4)).to.equal(2);
        });

        it('returns correct interval for G4', function () {
          expect(getIntervalFromA4('G', 4)).to.equal(-2);
        });

        it('returns correct interval for A2', function () {
          expect(getIntervalFromA4('A', 2)).to.deep.equal(-24);
        });

        it('returns correct interval for A6', function () {
          expect(getIntervalFromA4('A', 6)).to.deep.equal(24);
        });

        it('returns correct interval for C0', function () {
          expect(getIntervalFromA4('C', 0)).to.deep.equal(-57);
        });

        it('returns correct interval for B8', function () {
          expect(getIntervalFromA4('B', 8)).to.deep.equal(50);
        });

      });

      describe('getIntervalAdjustment()', function () {
        var getIntervalAdjustment = module.test.getIntervalAdjustment;

        it('exists', function () {
          expect(getIntervalAdjustment).to.exist;
        });

        it('returns correct adjustment for "#"', function () {
          expect(getIntervalAdjustment('#')).to.equal(1);
        });

        it('returns correct adjustment for "b"', function () {
          expect(getIntervalAdjustment('b')).to.equal(-1);
        });

      });

      describe('getCentsByInterval()', function () {
        var getCentsByInterval = module.test.getCentsByInterval;

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

      });

      describe('getNoteByInterval()', function () {
        var getNoteByInterval = module.test.getNoteByInterval;

        it('exists', function () {
          expect(getNoteByInterval).to.exist;
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

      });

      describe('isValidNoteName()', function () {
        var isValidNoteName = module.test.isValidNoteName;

        it('exists', function () {
          expect(isValidNoteName).to.exist;
        });

        it('returns true for valid note "C0"', function () {
          expect(isValidNoteName('C0')).to.be.true;
        });

        it('returns true for valid note "B8"', function () {
          expect(isValidNoteName('B8')).to.be.true;
        });

        it('returns true for valid note "G#3"', function () {
          expect(isValidNoteName('G#3')).to.be.true;
        });

        it('returns true for valid note "Ab7"', function () {
          expect(isValidNoteName('Ab7')).to.be.true;
        });

        it('returns false for invalid letter "H4"', function () {
          expect(isValidNoteName('H4')).to.be.false;
        });

        it('returns false for lowercase letter "a4"', function () {
          expect(isValidNoteName('H4')).to.be.false;
        });

        it('returns false for invalid octave / too high note "C9"', function () {
          expect(isValidNoteName('C9')).to.be.false;
        });

        it('returns false for invalid octave / too high note "C123"', function () {
          expect(isValidNoteName('C123')).to.be.false;
        });

        it('returns false for invalid modifier % "C%4"', function () {
          expect(isValidNoteName('C%4')).to.be.false;
        });

        it('returns false for wrong order "4C"', function () {
          expect(isValidNoteName('4C')).to.be.false;
        });

        it('returns false for empty string', function () {
          expect(isValidNoteName('')).to.be.false;
        });

        it('returns false for missing parameter', function () {
          expect(isValidNoteName()).to.be.false;
        });

        it('returns false for number', function () {
          expect(isValidNoteName(123.456)).to.be.false;
        });

        it('returns false for object', function () {
          expect(isValidNoteName({foo: 'bar'})).to.be.false;
        });


      });

      describe('isScaleTypeDefined()', function () {
        var isScaleTypeDefined = module.test.isScaleTypeDefined;

        it('exists', function () {
          expect(isScaleTypeDefined).to.exist;
        });

        it('returns true for a core predefined scale', function () {
          expect(isScaleTypeDefined('major')).to.be.true;
        });

        it('returns false for an undefined scale', function () {
          expect(isScaleTypeDefined('myScaleName')).to.be.false;
        });

        it('returns false for an empty string', function () {
          expect(isScaleTypeDefined('')).to.be.false;
        });

        it('returns false if no parameter is passed', function () {
          expect(isScaleTypeDefined()).to.be.false;
        });

        it('returns true for a user defined scale', function () {
          module.addScale('myScaleName', [1,2,3,4,5]);
          expect(isScaleTypeDefined('myScaleName')).to.be.true;
        });

      });

      describe('isValidScaleName()', function () {
        var isValidScaleName = module.test.isValidScaleName;

        it('exists', function () {
          expect(isValidScaleName).to.exist;
        });

        it('returns true for a string with uppercase and lower case letters, spaces, underscores and hyphens', function () {
          expect(isValidScaleName('ABcd efGH IJkl - _ ')).to.be.true;
        });

        it('returns false for an empty string', function () {
          expect(isValidScaleName('')).to.be.false;
        });

        it('returns false when passed no arguments', function () {
          expect(isValidScaleName()).to.be.false;
        });

        it('returns false for a string containing numbers', function () {
          expect(isValidScaleName('abc123')).to.be.false;
        });

        it('returns false for a string containing puncutation characters', function () {
          expect(isValidScaleName('abc!@£')).to.be.false;
        });

        it('returns false for an object', function () {
          expect(isValidScaleName({foo: 'bar'})).to.be.false;
        });

        it('returns false for a number', function () {
          expect(isValidScaleName(123.456)).to.be.false;
        });

      });

      describe('isValidScaleDefinition()', function () {
        var isValidScaleDefinition = module.test.isValidScaleDefinition;

        it('exists', function () {
          expect(isValidScaleDefinition).to.exist;
        });

        it('returns true for a valid scale definition', function () {
          expect(isValidScaleDefinition([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).to.be.true;
        });

        it('returns false for an array with some negative numbers', function () {
          expect(isValidScaleDefinition([1, 2, 3, -4, 5, -6])).to.be.false;
        });

        it('returns false for an array containing a zero', function () {
          expect(isValidScaleDefinition([1, 2, 3, 0])).to.be.false;
        });

        it('returns false for an array with some string values numbers', function () {
          expect(isValidScaleDefinition([1, 2, "3", 4, "5"])).to.be.false;
        });

        it('returns false for string', function () {
          expect(isValidScaleDefinition('10')).to.be.false;
        });

        it('returns false for object', function () {
          expect(isValidScaleDefinition({foo: 'bar'})).to.be.false;
        });

        it('returns false if not passed any value', function () {
          expect(isValidScaleDefinition()).to.be.false;
        });

      });

      describe('isPositiveIntegerGreaterThanZero()', function () {
        var isPositiveIntegerGreaterThanZero = module.test.isPositiveIntegerGreaterThanZero;

        it('exists', function () {
          expect(isPositiveIntegerGreaterThanZero).to.exist;
        });

        it('returns true for positive integer', function () {
          expect(isPositiveIntegerGreaterThanZero(111)).to.be.true;
        });

        it('returns false for zero', function () {
          expect(isPositiveIntegerGreaterThanZero(0)).to.be.false;
        });

        it('returns false for negative integer', function () {
          expect(isPositiveIntegerGreaterThanZero(-111)).to.be.false;
        });

        it('returns false for floating point number', function () {
          expect(isPositiveIntegerGreaterThanZero(11.111)).to.be.false;
        });

        it('returns false for string', function () {
          expect(isPositiveIntegerGreaterThanZero('10')).to.be.false;
        });

        it('returns false for object', function () {
          expect(isPositiveIntegerGreaterThanZero({foo: 'bar'})).to.be.false;
        });

        it('returns false if not passed any value', function () {
          expect(isPositiveIntegerGreaterThanZero()).to.be.false;
        });

      });

    }); // describe('private functions', function () {

  });

})();
