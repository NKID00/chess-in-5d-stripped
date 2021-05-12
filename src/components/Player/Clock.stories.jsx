import React from 'react';

import Sandbox from 'components/StorybookSandbox';
import Clock from 'components/Player/Clock';

export default {
  title: 'components/Player/Clock',
  component: Clock,
};

export const Main = () => {
  return (
    <Sandbox>
      <Clock />
    </Sandbox>
  );
}

export const Squeezed250px = () => {
  return (
    <Sandbox>
      <div style={{ width: 250 }}>
        <Clock />
      </div>
    </Sandbox>
  );
}

export const Squeezed500px = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock />
      </div>
    </Sandbox>
  );
}

export const Timed2Hr = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={2*60*60*1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed1Hr = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={60*60*1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed2Min = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={2*60*1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed1Min = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={60*1000}
          blackTimeLeft={60*1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed1MinDelay1Min = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={60*1000}
          whiteDelayLeft={60*1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed1Sec = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={1000}
        />
      </div>
    </Sandbox>
  );
}

export const Timed1SecDelay5Sec = () => {
  return (
    <Sandbox>
      <div style={{ width: 500 }}>
        <Clock
          whiteTimeLeft={1000}
          whiteDelayLeft={5*1000}
        />
      </div>
    </Sandbox>
  );
}