# scale-factory

Returns a variety of musical scales as arrays of values (as frequency in Hertz or cents for use as a detune) for use in the Web Audio Javascript API and other Javascript-based audio environments.

This is a work in progress. When it is complete, it will be available to install as an NPM or Bower dependency.

## Installation

To be completed...

## Basic useage

To be completed...

## Methods

### makeScale(scaleType, startNote, noteCount)

Given a start note, the type of scale and the number of notes in the scale, returns an object with three arrays: the note values in hertz, cents and semitone intervals.

#### Arguments

**`scaleType` (String)** string representing the type of scale. eg. `'major'`,  `'chromatic'`, etc.

Possible values:
* `'chromatic'`
* `'wholeTone'`
* `'major'`
* `'majorPentatonic'`
* `'minorPentatonic'`
* `'kuomiPentatonic'`
* `'chinesePentatonic'`
* `'naturalMinor'` (not yet implemented)
* `'harmonicMinor'` (not yet implemented)
* `'melodicMinor'` (not yet implemented)

**`startNote` (String)** The note name, flat or sharp flag, and octave number of the first note of the scale expressed as a 2 or 3 character string, eg:

* `'Ab5'` is the note A flat in the 5th octave
* `'C0'` is the note C in the bottom octave
* `'F#8'` is the note F sharp in the 8th octave

The lowest note allowed is `'C0'`
The highest note allowed is `'B8'`

**`noteCount` (Integer)** The number of notes you'd like in the scale. For instance if you want two octaves of a major scale, that's 15 notes.

#### Returns
**(Object)** Object with three parameters, each an array representing the value of notes in hertz, cents and semitone intervals in the form

```js
{
  inHertz: (Array),
  inCents: (Array),
  inSemitones: (Array)
}
```

For example, if requesting a major scale with 8 notes, starting on C in the 4th octave, the return value would be:

```js
{
  inHertz: [261.63, 293.67, 329.63, 349.23, 392.00 440.01, 493.89, 523.26],
  inCents: [0, 200, 400, 500, 700, 900, 1100, 1200],
  inSemitones: [0, 2, 4, 5, 7, 9, 11, 12]
}
```

> Note: the note values in cents and semitones are relative to the start note, which is why the start note always has a value of 0.

#### Example usage

```js
// create a minor pentatonic scale over 2 octaves (9 notes), starting on F# in the 5th octave and get the value of the notes in hertz
var myScaleInHertz = ScaleFactory.makeScale('minorPentatonic', 'F#5', 9).inHertz;

```

---------------------------

### getNote(note)

Given a musical note, expressed as a string, returns the value of that note in hertz, where A4 is 440Hz.

#### Arguments

**`note` (String)** The note name, flat or sharp flag, and octave number of the note expressed as a 2 or 3 character string, eg:

* `'Ab5'` is the note A flat in the 5th octave
* `'C0'` is the note C in the bottom octave
* `'F#8'` is the note F sharp in the 8th octave

The lowest note allowed is `'C0'`
The highest note allowed is `'B8'`

#### Returns
**(Number)** The frequency value of the note in hertz.

#### Example usage

```js
// gets the frequency of a G flat in the 3rd octave
var myNoteInHertz = ScaleFactory.getNote('Gb3');
```

---------------------------

### addScale(name, intervals)

Given a name and array of semitone intervals, creates a new scale type, which you can then use to create a scale using makeScale().

#### Arguments

**`name` (String)** String representing the type of scale, which will then be used to reference the scale when creating a scale using makeScale().

**`intervals` (Array)** Array of integers representing the semitone intervals between each note in a single, whole octave of the scale. For instance, a major scale would be expressed as

```js
[2, 2, 1, 2, 2, 2, 1]
```

#### Example usage

```js
// adds a new scale type called 'myWeirdScale'
ScaleFactory.addScale('myWeirdScale', [1, 2, 2, 3, 1, 2]);

// which can now be used to create a new scale
var myWeirdScaleInCents = ScaleFactory.makeScale('myWeirdScale', 'Ab4', 13).inCents;
```

## Development

### Dependencies

* [grunt](http://gruntjs.com/)
* [node](https://nodejs.org/)

Source files live in `src/`

Mocha unit tests live in `test/`

### Set up

```bash
$ npm install
```

### Running the grunt tasks

```bash
#linting and unit tests
$ grunt
```

*See `gruntfile.js` for more details of the grunt tasks*

## Release History:

### 0.0.1
* Initial commit; grunt, jshint & mocha tests hooked up

### 0.0.2
* getScale() now returns result in hertz, semitones and cents
* refactored tests and added additional tests for semitones & hertz
* removed test scale & note references into a separate module

### 0.0.3
* changed function names getScale() to makeScale() and getNoteByName() to getNote()
* divided exported functions into functions exported for testing purposes and functions exported as part of the public API
* added new addScale() function
