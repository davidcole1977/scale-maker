var DemoScales = (function () {

  var scale = {};

  scale.major = {
    type: 'major',
    startNote: 'C3',
    noteCount: 15
  };

  scale.naturalMinor = {
    type: 'naturalMinor',
    startNote: 'C3',
    noteCount: 15
  };

  scale.harmonicMinor = {
    type: 'harmonicMinor',
    startNote: 'C3',
    noteCount: 15
  };

  scale.melodicMinor = {
    type: 'melodicMinor',
    startNote: 'C3',
    noteCount: 15
  };

  scale.chromatic = {
    type: 'chromatic',
    startNote: 'C3',
    noteCount: 25
  };

  scale.wholeTone = {
    type: 'wholeTone',
    startNote: 'C3',
    noteCount: 13
  };

  scale.majorPentatonic = {
    type: 'majorPentatonic',
    startNote: 'C3',
    noteCount: 11
  };

  scale.minorPentatonic = {
    type: 'minorPentatonic',
    startNote: 'C3',
    noteCount: 11
  };

  scale.kuomiPentatonic = {
    type: 'kuomiPentatonic',
    startNote: 'C3',
    noteCount: 11
  };

  scale.chinesePentatonic = {
    type: 'chinesePentatonic',
    startNote: 'C3',
    noteCount: 11
  };

  return {
    scale: scale
  };
  
})();
