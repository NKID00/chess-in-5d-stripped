const CodeMirror = require('codemirror');

CodeMirror.defineSimpleMode('notation', {
  start: [
    {
      regex: /\d+w\.\s+/, 
      token: 'variable-2'
    },
    {
      regex: /\d+b\.\s+/, 
      token: 'variable-3'
    },
    {
      regex: /"(?:[^\\]|\\.)*?(?:"|$)/,
      token: 'string-2'
    },
    {
      regex: /(\d+)?([-+]\d+)?(:)([PBNRQK]?)([a-h][1-8])/,
      token: ['number','operator','number-2','string','atom']
    },
    {
      regex: /(\d+)?([-+]\d+)?(:)(0-0(?:-0)?)/,
      token: ['number','operator','number-2','atom']
    },
    {
      regex: /(<)([[\-+]\d+]?)(>)/,
      token: ['number-2','operator','number-2']
    },
    {
      regex: /[=+#]/,
      token: 'tag'
    }
  ]
});