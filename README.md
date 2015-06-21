# scale-maker

[![Build Status](https://travis-ci.org/davidcole1977/scale-maker.svg?branch=master)](https://travis-ci.org/davidcole1977/scale-maker) [![Coverage Status](https://coveralls.io/repos/davidcole1977/scale-maker/badge.svg?branch=master)](https://coveralls.io/r/davidcole1977/scale-maker?branch=master)

Returns a variety of musical scales as arrays of values (as frequency in Hertz or cents for use as a detune) for use in the Web Audio Javascript API and other Javascript-based audio environments.

## Demo page

[http://davidcole1977.github.io/scale-maker/demo/](http://davidcole1977.github.io/scale-maker/demo/)

## Getting started (NPM / Node)

Install using npm

```bash
npm install scale-maker --save
```

Once the module is installed, include it in your JS code using `require()`

```js
var ScaleMaker = require('scale-maker');
```

## Getting started (Bower)

Install using bower

```bash
bower install scale-maker --save
```

Once the module is installed, include it in your HTML page

```html
<script src="bower_components/scale-maker/lib/scaleMaker.min.js"></script>
```

 and then refer to it in your Javscript as `ScaleMaker`, eg.

```js
var myScaleInHertz = ScaleMaker.makeScale('minorPentatonic', 'F#5', 9).inHertz;
```

Alternatively, you can include it using Node JS or Browserify

```js
var ScaleMaker = require('./bower_components/scale-maker/lib/node/scaleMaker.min.js');
```

## Basic usage

```js
var ScaleMaker = require('scale-maker'); // skip this line if you're including the module using an HTML script tag

// create a minor pentatonic scale over 2 octaves (9 notes), starting on F# in the
// 5th octave and get the value of the notes in hertz
var myScaleInHertz = ScaleMaker.makeScale('minorPentatonic', 'F#5', 9).inHertz;

// adds a new scale type called 'myWeirdScale'
ScaleMaker.addScale('myWeirdScale', [1, 2, 2, 3, 1, 2]);

// which can now be used to create a new scale (this time in cents rather than hertz)
var myWeirdScaleInCents = ScaleMaker.makeScale('myWeirdScale', 'Ab4', 13).inCents;

// gets the frequency of a G flat in the 3rd octave
var myNoteInHertz = ScaleMaker.getNote('Gb3');
```

## Methods

### makeScale(scaleType, startNote, noteCount)

Given a start note, the type of scale and the number of notes in the scale, returns an object with three arrays: the note values in hertz, cents and semitone intervals.

#### Arguments

**`scaleType` (String)** string representing the type of scale. eg. `'major'`,  `'chromatic'`, etc.

Possible values:
* `'major'`
* `'naturalMinor'`
* `'harmonicMinor'`
* `'melodicMinor'`
* `'chromatic'`
* `'wholeTone'`
* `'majorPentatonic'`
* `'minorPentatonic'`
* `'kuomiPentatonic'`
* `'chinesePentatonic'`

**`startNote` (String)** The note name, flat or sharp flag, and octave number of the first note of the scale expressed as a 2 or 3 character string, eg:

* `'Ab5'` is the note A flat in the 5th octave
* `'C0'` is the note C in the bottom octave
* `'F#8'` is the note F sharp in the 8th octave

The lowest note allowed is `'C0'`
The highest note allowed is `'B8'`

**`noteCount` (Integer)** The number of notes you'd like in the scale. For instance if you want two octaves of a major scale, that's 15 notes.

#### Returns
**(Object)** Object with three parameters, each an array representing the value of notes in hertz, cents and semitone intervals. For example, if requesting a major scale with 8 notes, starting on C in the 4th octave, the return value would be:

```js
{
  inHertz: [261.63, 293.67, 329.63, 349.23, 392.00 440.01, 493.89, 523.26],
  inCents: [0, 200, 400, 500, 700, 900, 1100, 1200],
  inSemiTones: [0, 2, 4, 5, 7, 9, 11, 12]
}
```

> Note: the note values in cents and semitones are relative to the start note, which is why the start note always has a value of 0.

#### Example usage

```js
// create a minor pentatonic scale over 2 octaves (9 notes), starting on F# in the 5th octave and get the value of the notes in hertz
var myScaleInHertz = ScaleMaker.makeScale('minorPentatonic', 'F#5', 9).inHertz;

// the same scale, this time in cents for use as a detune
var myScaleInCents = ScaleMaker.makeScale('minorPentatonic', 'F#5', 9).inCents;

// the same scale, this time in semitone intervals
var myScaleInSemiTones = ScaleMaker.makeScale('minorPentatonic', 'F#5', 9).inSemiTones;
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
var myNoteInHertz = ScaleMaker.getNote('Gb3');
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
ScaleMaker.addScale('myWeirdScale', [1, 2, 2, 3, 1, 2]);

// which can now be used to create a new scale
var myWeirdScaleInCents = ScaleMaker.makeScale('myWeirdScale', 'Ab4', 13).inCents;
```

---------------------------

### getScaleNames()

Returns the names of all available scales, as an array of strings

#### Returns
**(Array)** The names of all built in and user-created scales, as an array of strings

#### Example usage

```js
// adds a new scale type called 'myWeirdScale'
ScaleMaker.addScale('myWeirdScale', [1, 2, 2, 3, 1, 2]);

// gets the names of available scales, including the scale that was just added
var allScales = ScaleMaker.getScaleNames();

// allScales === ['chromatic', 'wholeTone', 'major', 'majorPentatonic', 'minorPentatonic', 'kuomiPentatonic', 'chinesePentatonic', 'naturalMinor', 'harmonicMinor', 'melodicMinor', 'myWeirdScale'];

```

## Development

### Dependencies

* [grunt](http://gruntjs.com/)
* [node](https://nodejs.org/)

Mocha unit tests live in `test/`

### Set up

```bash
$ npm install
```

### Running the grunt tasks

```bash
#linting, unit tests, compression
$ grunt
```

*See `gruntfile.js` for more details of the grunt tasks*

## Known Issues

* Incompatible with Internet Explorer versions 8 and below

## Todo

* demo page: use on-screen keyboard to play a scale – code example updates in realtime as you play, with code to make the scale you're playing
* add to function outputs: makeScale as note names; makeScale & getNote as midi note values
* option to specify number of octaves as well as number of notes

## Version history

### 0.2.2
* Added code coverage with Istanbul and Coveralls

### 0.2.1
* Added Travis CI support, including build status image in readme file

### 0.2.0
* Added new public getScaleNames() method to return all available scale names as an array

### 0.1.1
* Corrected reference to module in mocha unit tests

### 0.1.0
* Now available as a Bower component and NPM module

### 0.0.12
* created bower.json file

### 0.0.11
* automatically generate non-node version of ScaleMaker module

### 0.0.10
* added the remaining minor scales
* corrected code typo on demo page
* updated scales used on demo page
* optimised getNote unit tests

### 0.0.9
* removed browserify
* updated demo page to not use common js modules

### 0.0.8
* added demo page
* added scale settings to example scales
* reduced duplication in test spec
* added browserify to grunt build (for demo page)

### 0.0.7
* moved main file into lib/ and corresponding updates to build & test files

### 0.0.6
* changed name to scaleMaker / scale-maker

### 0.0.5
* added input error handling for public API functions

### 0.0.4
* removed unnecessary ScaleMaker constructor function
* added input validation functions isValidNoteName(), isValidScaleName(), isValidScaleDefinition(), isScaleTypeDefined(), isPositiveIntegerGreaterThanZero() (not yet incorporated into public API functions)
* added JS compression to grunt build

### 0.0.3
* changed function names getScale() to makeScale() and getNoteByName() to getNote()
* divided exported functions into functions exported for testing purposes and functions exported as part of the public API
* added new addScale() function

### 0.0.2
* getScale() now returns result in hertz, semitones and cents
* removed test scale & note references into a separate module

### 0.0.1
* Initial commit; grunt, jshint & mocha tests hooked up
