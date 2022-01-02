import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import Notation from 'components/Player/Notation';

const defaultTestNotation = `[Board "Standard"]
[Mode "5D"]
[Date "2021.02.08"]
[White "5D-Chess-DB-Gen"]
[Black "5D-Chess-DB-Gen"]
[Result "*"]
[Bench_time "10.75"]
[Checkmate_time "65897"]
[Checkmate_difficulty "6129.953488372093"]
[Checkmate_timeout "true"]
[Node "12.18.2"]
[V8 "7.8.279.23-node.39"]
[Hash "a71b77b56989a3d67ba15fb1c8d1310d"]
[Chessjs "^1.0.9"]
1. b3 / g5
2. h4 / Bg7
3. a3 / e5
4. d4 / g4
5. b4 / Kf8
6. Bf4 / Ne7 7. c4 / Ng8
8. Qd3 {test comment here [test tag]} / (0T8)Qd8>>(0T7)e8~ (>L-1)
9. (-1T8)Bh2 / (-1T8)Qd8>>(0T8)e7 (>L-2);another test comment
10. (-1T9)f3 (0T9)Nc3 / (0T9)d5 (-1T9)g3
11. (0T10)Kd1 (-1T10)Qd1>>(-1T9)d2~ (>L1) (-2T9)Qd3>>(-1T8)e3~ (>L2) / (2T8)exf4
12. (2T9)Rh3 / (1T9)Qe8>>(0T9)e7~ (>L-3) (-2T9)b6 (2T9)h6
13. (-3T10)Nc3>>(-1T10)d3~ (>L3) (1T10)Qg5 (2T10)Qg3 (-2T10)Bg3 / (3T10)Bh6 (-1T10)c6 (1T10)Kf8>>(1T9)g8~ (>L-4)
14. (-4T10)e4 / (0T10)Bc8>>(1T10)d8 (>L-5) (2T10)Qd8>>(3T10)d8 (>L-6) (-3T10)Kf8>(-2T10)e8 (-4T10)Qd8
15. (-4T11)Qd1>(-5T11)c1 (2T11)Ke1>>(2T10)d2~ (>L4) / (4T10)b5 ; another test comment
16. (4T11)Ng1>x(3T11)g3 (-3T11)Qd3>(-2T11)c2 (0T11)Qd3>>(0T9)f3~ (>L5) / (5T9)e4
17. (5T10)Bxc7 / (5T10)Kf8>(4T11)g8
18. (1T11)Qg5>>x(0T11)g4~ (>L6) (5T11)Bc7>>x(5T10)b7~ (>L7) / (7T10)d6
19. (-6T11)Ng1>>(-5T11)g3 (>L8) (-1T11)Pf3>>(-2T11)f3 (>L9) (7T11)Qfe3 / (5T11)Nb8>x(7T11)b7 (-2T11)Qe7>>(-2T10)e8~ (>L-7)
20. (-7T11)Bf1>>(-3T11)f5 (>L10) / (2T11)Ne7>>(0T10)e7~ (>L-8)
21. (-8T11)Bg5 / (-4T11)Bg7>>(-2T11)g5~ (>L-9) (9T11)Nc6 (3T11)Nb8>>(4T11)b6~ (>L-10) (1T11)f6 (8T11)Bc8>>(5T11)f8~ (>L-11) (-8T11)Nf5 (-6T11)Bf6 (-3T11)Qe7>>(-2T10)e8 (>L-12) (-5T11)Bg7>>(-6T11)g6 (>L-13) (10T11)Bg7>>x(8T11)g5 (>L-14) (0T11)h5 (-1T11)Qe8>>(0T11)e8 (>L-15) (-7T11)Qe7>>(-8T11)e8 (>L-16) (6T11)dxc4
22. (4T12)Qe3>(3T12)f4 (-4T12)a4 (8T12)Qg5>>(3T12)g5~ (~T11) (>L11) (-12T11)Ke1>(-11T12)d1 / (-12T11)c5
23. (-8T12)Kd1>>(-7T11)c1~ (>L12) / (12T11)Qf6
24. (-9T12)Bg3>(-14T12)b3 (6T12)Kd1>(5T12)c2 (-3T12)Bf4>(-2T12)e4 (-13T12)Qd1>(-15T12)b3 (1T12)Qd1>(0T12)c2 (-5T12)Qg5>>(-2T9)d2~ (>L13) / (13T9)Qxh4
25. (13T10)Bh2 / (13T10)Ke7`;

const smallNotation = `[Board "Standard"]
[Mode "5D"]
1. b3 / g5
2. h4 / Bg7
3. a3 / e5
4. d4 / g4
5. b4 / Kf8
6. Bf4 / Ne7 7. c4 / Ng8
8. Qd3 {test comment here [test tag]} / (0T8)Qd8>>(0T7)e8~ (>L-1)`;

export default {
  title: 'components/Player/Notation',
  component: Notation,
  args: {
    notation: defaultTestNotation,
    highlightNotation: defaultTestNotation,
    onClick: (e) => { console.log(e) }
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <Notation {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <Notation {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Card>
          <Notation {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const SmallNotationLong250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250, height: 750 }}>
        <Card style={{ width: 250, height: 750 }}>
          <Notation {...args} notation={smallNotation} highlightNotation={smallNotation} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const SmallNotationSqueezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250, height: 250 }}>
        <Card style={{ width: 250, height: 250 }}>
          <Notation {...args} notation={smallNotation} highlightNotation={smallNotation} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}