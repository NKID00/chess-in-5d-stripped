exports = [
  {
    name: 'pawn',
    displayName: 'Pawn',
    char: '',
    checkmate: false,
    moveSpec: [],
    moveVec: [],
    moveGen: (gameState, currPosition, player) => {
      return [];
    }
  },
  {
    name: 'bishop',
    displayName: 'Bishop',
    char: 'B',
    checkmate: false,
    moveSpec: [],
    moveVec: [ //[Turn, Timeline, Rank, File]
      [0,0,1,1],
      [0,1,0,1],
      [0,1,1,0],
      [1,0,0,1],
      [1,0,1,0],
      [1,1,0,0]
    ],
    moveGen: (gameState, currPosition, player) => { return []; }
  },
  {
    name: 'knight',
    displayName: 'Knight',
    char: 'N',
    checkmate: false,
    moveSpec: [ //[Turn, Timeline, Rank, File]
      [ 0, 0, 1, 2],
      [ 0, 0, 1,-2],
      [ 0, 0,-1, 2],
      [ 0, 0,-1,-2],

      [ 0, 1, 0, 2],
      [ 0, 1, 0,-2],
      [ 0,-1, 0, 2],
      [ 0,-1, 0,-2],

      [ 0, 1, 2, 0],
      [ 0, 1,-2, 0],
      [ 0,-1, 2, 0],
      [ 0,-1,-2, 0],

      [ 1, 0, 0, 2],
      [ 1, 0, 0,-2],
      [-1, 0, 0, 2],
      [-1, 0, 0,-2],

      [ 1, 0, 2, 0],
      [ 1, 0,-2, 0],
      [-1, 0, 2, 0],
      [-1, 0,-2, 0],

      [ 1, 2, 0, 0],
      [ 1,-2, 0, 0],
      [-1, 2, 0, 0],
      [-1,-2, 0, 0]
    ],
    moveVec: [],
    moveGen: (gameState, currPosition, player) => { return []; }
  },
  {
    name: 'rook',
    displayName: 'Rook',
    char: 'R',
    checkmate: false,
    moveSpec: [],
    moveVec: [ //[Turn, Timeline, Rank, File]
      [0,0,0,1],
      [0,0,1,0],
      [0,1,0,0],
      [1,0,0,0]
    ],
    moveGen: (gameState, currPosition, player) => { return []; }
  },
  {
    name: 'queen',
    displayName: 'Queen',
    char: 'Q',
    checkmate: false,
    moveSpec: [],
    moveVec: [ //[Turn, Timeline, Rank, File]
      [0,0,0,1],
      [0,0,1,0],
      [0,0,1,1],
      [0,1,0,0],
      [0,1,0,1],
      [0,1,1,1],
      [1,0,0,0],
      [1,0,0,1],
      [1,0,1,0],
      [1,0,1,1],
      [1,1,0,0],
      [1,1,0,1],
      [1,1,1,1]
    ],
    moveGen: (gameState, currPosition, player) => { return []; }
  },
  {
    name: 'king',
    displayName: 'King',
    char: 'K',
    checkmate: true,
    moveSpec: [ //[Turn, Timeline, Rank, File]
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ],
    moveVec: [],
    moveGen: (gameState, currPosition, player) => { return []; }
  }
];
