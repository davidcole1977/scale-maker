(function () {
  'use strict';

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var AudioContext = new window.AudioContext();

  /**
   * returns true if HTML <template> tag is supported, otherwise returns false
   */
  function supportsHTMLTemplate () {
    return 'content' in document.createElement('template');
  }

  /**
   * given an array of values, builds an HTML element listing those values,
   * ready for inclusion in the demo page DOM
   */
  function buildScaleList (scaleArray) {
    var scaleList = document.createElement('span');

    scaleArray.forEach(function (noteValue) {
      var scaleEntry = document.createElement('span');

      scaleEntry.classList.add('code-scale-entry');
      scaleEntry.appendChild(document.createTextNode(noteValue));
      scaleList.appendChild(scaleEntry);
    });

    return scaleList;
  }

  function playScale (notesInHertz, callback) {
    var noteLength = 0.2, // seconds
        totalTime = noteLength * notesInHertz.length; // seconds

    // call 'done' callback once the scale has finished playing
    window.setTimeout(callback, totalTime * 1000);

    notesInHertz.forEach(function (noteInHertz, i) {
      var oscillator = AudioContext.createOscillator(),
          gainNode = AudioContext.createGain(),
          volume = 0.25,
          time = AudioContext.currentTime + (noteLength * i);

      oscillator.type = 'sine';
      oscillator.frequency.value = noteInHertz;
      gainNode.gain.value = 0;
      gainNode.connect(AudioContext.destination);
      oscillator.connect(gainNode);

      oscillator.start(time);
      gainNode.gain.setValueAtTime(0, time); // initial
      gainNode.gain.linearRampToValueAtTime(volume, time + 0.05); // attack
      gainNode.gain.setValueAtTime(volume, time + noteLength - 0.05); // sustain
      gainNode.gain.linearRampToValueAtTime(0, time + noteLength); // release
      oscillator.stop(time + noteLength); // kill
    });

  }

  /**
   * demo initialisation on page load
   * render scale lists, buttons and attach play event to buttons
   */
  function initScaleDemo () {
    // early out and warning if HTML templates aren't supported
    if (!supportsHTMLTemplate()) {
      throw new Error('Your browser does not support HTML templates, which are needed for this demo page to function');
    }

    var scaleTemplate = document.querySelector('#scale-template');

    // loop through the various scales and assemble & render the HTML elemenents for each, plus attach play event to button
    _.forEach(DemoScales.scale, function (testScale, key) {

      var modifiedTemplate = document.importNode(scaleTemplate.content, true),
          makeScaleArgs = document.createTextNode('\'' + testScale.type + '\', \'' + testScale.startNote + '\', ' + testScale.noteCount),
          scaleDescription = document.createTextNode(testScale.type + ' scale, ' + testScale.noteCount + ' notes, starting on ' + testScale.startNote),
          generatedScale = ScaleMaker.makeScale(testScale.type, testScale.startNote, testScale.noteCount),
          templateID = 'scale-' + key;

      // populate template copy
      modifiedTemplate.querySelector('#scale-demo-container').id = templateID;
      modifiedTemplate.querySelector('.scale-description').appendChild(scaleDescription);
      modifiedTemplate.querySelector('.scale-params').appendChild(makeScaleArgs);
      modifiedTemplate.querySelector('.in-hertz').appendChild(buildScaleList(generatedScale.inHertz));
      modifiedTemplate.querySelector('.in-semitones').appendChild(buildScaleList(generatedScale.inSemiTones));
      modifiedTemplate.querySelector('.in-cents').appendChild(buildScaleList(generatedScale.inCents));

      // insert the modified / populated template into the DOM
      document.body.appendChild(modifiedTemplate);

      // attach event to play button
      document.querySelector('#' + templateID).querySelector('.play-scale-btn').addEventListener('click', function () {
        playScale(generatedScale.inHertz);
      });
    
    });
  }

  document.addEventListener("DOMContentLoaded", initScaleDemo);

})();
