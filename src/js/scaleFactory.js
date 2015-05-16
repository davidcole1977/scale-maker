module.exports = (function () {
  'use strict';

  /*
   * useful references for the frequency of musical notes and related forumlae:
   * 
   * ref: http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
   * http://www.phy.mtu.edu/~suits/notefreqs.html
   */
  
  var TWELFTH_ROOT = getNthRoot(2, 12), // the basis for getting the frequency of a semitone / single interval
      REF_FREQUENCIES = {
        A4: 440,
        C0: 16.35,
        B8: 7902.13
      },
      MIN_FREQUENCY = REF_FREQUENCIES.C0, // C0
      MAX_FREQUENCY = REF_FREQUENCIES.B8, // B8
      CENTS_PER_SEMITONE = 100,
      scaleDefs = {};

  // the sequence of intervals (in semitones) between each note in a given type of scale
  // expressed as an array for each scale
  // TODO: complete basic set of scales
  scaleDefs.chromatic = [1];
  scaleDefs.wholeTone = [2];
  scaleDefs.major = [2, 2, 1, 2, 2, 2, 1];
  scaleDefs.majorPentatonic = [2, 2, 3, 2, 3];
  scaleDefs.minorPentatonic = [3, 2, 2, 3, 2];
  scaleDefs.kuomiPentatonic = [1, 4, 2, 1, 4];
  scaleDefs.chinesePentatonic = [4, 2, 1, 4, 1];
  scaleDefs.naturalMinor = [];
  scaleDefs.harmonicMinor = [];
  scaleDefs.melodicMinor = [];

  /*
   * Maths helpers
   */
  function getNthRoot (value, n) {
    return Math.pow(value, 1 / n);
  }

  /*
   * returns the frequency of a note that's a given number of semitones from the reference frequency (interval can be negative)
   */ 
  function getNoteByInterval (reference, interval) {
    // formula: http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    var frequency = reference * Math.pow(TWELFTH_ROOT, interval);
    frequency = (frequency > MAX_FREQUENCY) ? MAX_FREQUENCY : frequency;
    frequency = (frequency < MIN_FREQUENCY) ? MIN_FREQUENCY : frequency;

    // round to 2 decimal places for ease of reference & testing
    return Math.round(frequency * 100) / 100;
  }

  /*
   * returns the interval in semitones, relative to A4
   * eg. ('A', 4) returns 0; ('C', 6) returns 13; ('A', 3) returns -12
   */
  function getIntervalFromA4 (noteName, octave) {
    var semitonesInOctave = 12,
        A4Octave = 4,
        intervalsRelativeToA = {
          C: -9,
          D: -7,
          E: -5,
          F: -4,
          G: -2,
          A: 0,
          B: 2    
        };
    
    return intervalsRelativeToA[noteName] + ((octave - A4Octave) * semitonesInOctave);
  }

  /*
   * returns the interval adjustment for flat and sharp ()
   */

  // TODO: incorporate into getIntervalFromA4?
  function getIntervalAdjustment (sharpOrFlat) {
    var adjustments = {
      '#': 1,
      'b': -1
    };

    if (sharpOrFlat !== '#' && sharpOrFlat !== 'b') {
      return 0;
    }

    return adjustments[sharpOrFlat];
  }

  /**
   * returns the number of cents (detune) given an interval in semitones
   */
  function getCentsByInterval (interval) {
     return interval * CENTS_PER_SEMITONE;
  }

  /*
   * returns true if passed a valid note name such as:
   * 'A4', 'C0', 'F#5', 'Gb2', 'Cb7'
   * otherwise returns false
   */
  function isValidNoteName (noteName) {
    var validNameRegex = /^[A-G][b#]?[0-8]$/;

    return typeof noteName === 'string' && validNameRegex.test(noteName);
  }

  /*
   * returns true if a scale type with the specified scaleName is in the scale type collection
   * otherwise returns false
   */
  function isScaleTypeDefined (scaleName) {
    return scaleDefs.hasOwnProperty(scaleName);
  }

  /*
   * returns true if passed a valid scale type (ie. is a string and is in scale definitions)
   * otherwise returns false
   */
  function isValidScaleName (scaleName) {
    var scaleNameRegex = /^[A-Za-z\-\_ ]+$/;

    return typeof scaleName === 'string' && scaleNameRegex.test(scaleName);
  }

   /*
    * returns true if passed a valid scale definition (ie. an array of integers)
    * otherwise returns false
    */
  function isValidScaleDefinition (scaleDef) {
    return Array.isArray(scaleDef) && scaleDef.every(isPositiveIntegerGreaterThanZero);
  }

  /*
    * returns true if passed an integer
    * otherwise returns false
    */
  function isPositiveIntegerGreaterThanZero (value) {
    return (typeof value === 'number') && (value % 1 === 0) && (value > 0);
  }

  /*
   * returns the frequency of a note that's equivalent to a friendly string,
   * such as 'A4', 'C0', 'F#5', 'Gb2', 'Cb7'
   */
  function getNote (noteString) {
    var noteNameMatch = noteString.match(/^[A-G]/g),
        sharpOrFlatMatch = noteString.match(/[b#]/g),
        octaveMatch = noteString.match(/[0-8]/g),
        noteName = noteNameMatch ? noteNameMatch[0] : null,
        sharpOrFlat = sharpOrFlatMatch ? sharpOrFlatMatch[0] : null,
        octave = octaveMatch ? parseInt(octaveMatch[0], 10) : null,
        intervalFromA,
        adjustedInterval;

    intervalFromA = getIntervalFromA4(noteName, octave);
    adjustedInterval = intervalFromA + getIntervalAdjustment(sharpOrFlat);

    return getNoteByInterval(REF_FREQUENCIES.A4, adjustedInterval);
  }

  /*
   * returns an array of frequencies in Hz, representing the notes in a musical scale,
   * given the type of scale, the frequency of a starting note, and the number of notes
   */
  function makeScale (scaleType, startNote, noteCount) {
    var i,
        scaleDef = scaleDefs[scaleType],
        scaleInHertz = [],
        scaleInCents = [],
        scaleInSemitones = [],
        intervalsFromStartNote = 0,
        intervalCounter = 0,
        startFrequency = getNote(startNote);

    // the first note is always the starting frequency
    scaleInHertz.push(startFrequency);
    scaleInCents.push(0);
    scaleInSemitones.push(0);

    for(i = 0; i < noteCount - 1; i += 1) {
      intervalsFromStartNote += scaleDef[intervalCounter];

      scaleInHertz.push(getNoteByInterval(startFrequency, intervalsFromStartNote));
      scaleInCents.push(getCentsByInterval(intervalsFromStartNote));
      scaleInSemitones.push(intervalsFromStartNote);

      intervalCounter = (intervalCounter === scaleDef.length - 1) ? 0 : intervalCounter + 1;
    }

    return {
      startNote: startFrequency,
      inHertz: scaleInHertz,
      inCents: scaleInCents,
      inSemiTones: scaleInSemitones
    };
  }

  /*
   * adds a new scale definition of the given name and semitone intervals definition array
   * to the scale definitions collection
   */
  function addScale (name, scaleDef) {
    scaleDefs[name] = scaleDef;
  }

  /*
   * module export functions
   */
  return {
    makeScale: makeScale,
    getNote: getNote,
    addScale: addScale,

    // exported for testing purposes – not part of the public API
    test: {
      getIntervalFromA4: getIntervalFromA4,
      getIntervalAdjustment: getIntervalAdjustment,
      getCentsByInterval: getCentsByInterval,
      getNoteByInterval: getNoteByInterval,
      isValidNoteName: isValidNoteName,
      isValidScaleName: isValidScaleName,
      isValidScaleDefinition: isValidScaleDefinition,
      isPositiveIntegerGreaterThanZero: isPositiveIntegerGreaterThanZero,
      isScaleTypeDefined: isScaleTypeDefined
    }
  };
  
}());




