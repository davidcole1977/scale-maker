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
      scaleDefs = {};

  // the sequence of intervals (in semitones) between each note in a given type of scale
  // expressed as an array for each scale
  // we could go on with many other exotic scales, but really, this is plenty for most people
  // TODO: complete basic set of scales
  scaleDefs.chromatic = [1];
  scaleDefs.wholeTone = [2];
  scaleDefs.major = [2, 2, 1, 2, 2, 2, 1];
  scaleDefs.naturalMinor = [];
  scaleDefs.harmonicMinor = [];
  scaleDefs.melodicMinor = [];
  scaleDefs.majorPentatonic = [2, 2, 3, 2, 3];
  scaleDefs.minorPentatonic = [3, 2, 2, 3, 2];
  scaleDefs.kuomiPentatonic = [1, 4, 2, 1, 4];
  scaleDefs.chinesePentatonic = [4, 2, 1, 4, 1];
  scaleDefs.bluesMinor = [];
  scaleDefs.bluesMajor = [];

  /*
   * Maths helpers
   */
  function getNthRoot (value, n) {
    return Math.pow(value, 1 / n);
  }

  /*
   * Constructor
   */
  function ScaleFactory () { }

  /*
   * returns the frequency of a note that's a given number of semitones from the reference frequency (interval can be negative)
   */ 
  ScaleFactory.getNoteByInterval = function (reference, interval) {
    if (typeof reference !== 'number' || typeof interval !== 'number') {
      throw new Error('getNoteByInterval() must receive two numbers as arguments');
    }

    // formula: http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    var frequency = reference * Math.pow(TWELFTH_ROOT, interval);
    frequency = (frequency > MAX_FREQUENCY) ? MAX_FREQUENCY : frequency;
    frequency = (frequency < MIN_FREQUENCY) ? MIN_FREQUENCY : frequency;

    // round to 2 decimal places for ease of reference & testing
    return Math.round(frequency * 100) / 100;
  };

  /*
   * returns the interval in semitones, relative to A4
   * eg. ('A', 4) returns 0; ('C', 6) returns 13; ('A', 3) returns -12
   */
  ScaleFactory.getIntervalFromA4 = function (noteName, octave) {
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
  };

  /*
   * returns the interval adjustment for flat and sharp ()
   */

  // TODO: incorporate into getIntervalFromA4
  ScaleFactory.getIntervalAdjustment = function(sharpOrFlat) {
    var adjustments = {
      '#': 1,
      'b': -1
    };

    if (sharpOrFlat !== '#' && sharpOrFlat !== 'b') {
      return 0;
    }

    return adjustments[sharpOrFlat];
  };

  ScaleFactory.getNoteNameComponents = function(noteString) {
    // return {
    //   name: 'A',
    //   sharpOrFlat: '',
    //   octave: 4
    // };
  };

  /*
   * returns the frequency of a note that's equivalent to a friendly string,
   * such as 'A4', 'C0', 'F#5', 'Gb2', 'Cb7'
   */

  // TODO: put noteString parsing in getNoteNameComponents
  ScaleFactory.getNoteByName = function (noteString) {
    var noteNameMatch = noteString.match(/^[A-G]/g),
        sharpOrFlatMatch = noteString.match(/[b#]/g),
        octaveMatch = noteString.match(/[0-8]/g),
        noteName = noteNameMatch ? noteNameMatch[0] : null,
        sharpOrFlat = sharpOrFlatMatch ? sharpOrFlatMatch[0] : null,
        octave = octaveMatch ? parseInt(octaveMatch[0], 10) : null,
        intervalFromA,
        frequency,
        adjustedInterval;

    if (!noteName || typeof octave !== 'number') {
      throw new Error('Invalid argument: getNoteName() takes a string representing a musical note, such as "A2" or "Bb6"');
    }

    intervalFromA = ScaleFactory.getIntervalFromA4(noteName, octave);
    adjustedInterval = intervalFromA + ScaleFactory.getIntervalAdjustment(sharpOrFlat);
    frequency = ScaleFactory.getNoteByInterval(REF_FREQUENCIES.A4, adjustedInterval);

    return frequency;
  };

  /*
   * returns an array of frequencies in Hz, representing the notes in a musical scale,
   * given the type of scale, the frequency of a starting note, and the number of notes
   */

  // TODO: get all notes relative to A4
  // TODO: option to return cents detune adjustments rather than frequency
  ScaleFactory.getScale = function (scaleType, startNote, noteCount) {
    var i,
        scaleDef = scaleDefs[scaleType],
        scale = [],
        intervalsFromStartNote = 0,
        intervalCounter = 0,
        startFrequency = ScaleFactory.getNoteByName(startNote);

    // the first note is always the starting frequency
    scale.push(startFrequency);

    for(i = 0; i < noteCount - 1; i += 1) {
      intervalsFromStartNote += scaleDef[intervalCounter];
      scale.push(ScaleFactory.getNoteByInterval(startFrequency, intervalsFromStartNote));
      intervalCounter = (intervalCounter === scaleDef.length - 1) ? 0 : intervalCounter + 1;
    }

    return scale;
  };

  return ScaleFactory;
  
}());




