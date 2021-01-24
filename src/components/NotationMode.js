const CodeMirror = require('codemirror');

CodeMirror.defineSimpleMode('notation', {
  start: [
    {
      regex: /\d+\.\s*/, 
      token: 'number'
    },
    {
      regex: /\s*\/\s*/, 
      token: 'variable-3'
    },
    {
      regex: /"(?:[^\\]|\\.)*?(?:"|$)/,
      token: 'string-2'
    },
    {
      regex: /(\(L?[+-]?\d*T[+-]?\d*\))?([A-Z]+)?([a-h]+)?([1-8]+)?(x)?([a-h][1-8])/,
      token: ['tag','operator','atom','atom','string','atom']
    },
    {
      regex: /(\(L?[+-]?\d*T[+-]?\d*\))?(O-O(?:-O)?)/,
      token: ['tag','atom']
    },
    {
      regex: /(>>?x?)/,
      token: ['string']
    }
  ]
});