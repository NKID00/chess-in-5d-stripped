import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import SessionCard from 'components/SessionCard';

export default {
  title: 'components/SessionCard',
  component: SessionCard,
  args: {
    flat: false,
    session: {
      'id':'1628528510810',
      'white':'',
      'black':'',
      'variant':'turn_zero',
      'format':'blitz',
      'ranked':false,
      'started':true,
      'startDate':1628528510810,
      'ended':false,
      'endDate':null,
      'processing':false,
      'timed':{'running':false,'lastUpdate':-1,'currentPlayer':'white','whiteDurationLeft':600000,'blackDurationLeft':600000,'whiteDelayLeft':0,'blackDelayLeft':0,'startingDuration':600000,'flatIncrement':0,'presentIncrement':0,'activeIncrement':0,'timelineIncrement':0,'flatDelay':0,'presentDelay':5000,'activeDelay':0,'timelineDelay':0},
      'actionHistory':[],
      'moveBuffer':[],
      'comments':[],
      'metadata':[],
      'player':null,
      'winner':null,
      'winCause':null,
      'board':{'action':1,'player':'white','timelines':[{'timeline':0,'player':'white','turns':[{'turn':0,'player':'black','pieces':[{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'a1','rank':1,'file':1},'piece':'R','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'b1','rank':1,'file':2},'piece':'N','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'c1','rank':1,'file':3},'piece':'B','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'d1','rank':1,'file':4},'piece':'Q','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'e1','rank':1,'file':5},'piece':'K','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'f1','rank':1,'file':6},'piece':'B','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'g1','rank':1,'file':7},'piece':'N','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'h1','rank':1,'file':8},'piece':'R','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'a2','rank':2,'file':1},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'b2','rank':2,'file':2},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'c2','rank':2,'file':3},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'d2','rank':2,'file':4},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'e2','rank':2,'file':5},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'f2','rank':2,'file':6},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'g2','rank':2,'file':7},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'h2','rank':2,'file':8},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'a7','rank':7,'file':1},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'b7','rank':7,'file':2},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'c7','rank':7,'file':3},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'d7','rank':7,'file':4},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'e7','rank':7,'file':5},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'f7','rank':7,'file':6},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'g7','rank':7,'file':7},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'h7','rank':7,'file':8},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'a8','rank':8,'file':1},'piece':'R','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'b8','rank':8,'file':2},'piece':'N','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'c8','rank':8,'file':3},'piece':'B','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'d8','rank':8,'file':4},'piece':'Q','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'e8','rank':8,'file':5},'piece':'K','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'f8','rank':8,'file':6},'piece':'B','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'g8','rank':8,'file':7},'piece':'N','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':0,'player':'black','coordinate':'h8','rank':8,'file':8},'piece':'R','player':'black','hasMoved':false}],'width':8,'height':8},{'turn':1,'player':'white','pieces':[{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'a1','rank':1,'file':1},'piece':'R','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'b1','rank':1,'file':2},'piece':'N','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'c1','rank':1,'file':3},'piece':'B','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'d1','rank':1,'file':4},'piece':'Q','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'e1','rank':1,'file':5},'piece':'K','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'f1','rank':1,'file':6},'piece':'B','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'g1','rank':1,'file':7},'piece':'N','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'h1','rank':1,'file':8},'piece':'R','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'a2','rank':2,'file':1},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'b2','rank':2,'file':2},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'c2','rank':2,'file':3},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'d2','rank':2,'file':4},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'e2','rank':2,'file':5},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'f2','rank':2,'file':6},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'g2','rank':2,'file':7},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'h2','rank':2,'file':8},'piece':'','player':'white','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'a7','rank':7,'file':1},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'b7','rank':7,'file':2},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'c7','rank':7,'file':3},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'d7','rank':7,'file':4},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'e7','rank':7,'file':5},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'f7','rank':7,'file':6},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'g7','rank':7,'file':7},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'h7','rank':7,'file':8},'piece':'','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'a8','rank':8,'file':1},'piece':'R','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'b8','rank':8,'file':2},'piece':'N','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'c8','rank':8,'file':3},'piece':'B','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'d8','rank':8,'file':4},'piece':'Q','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'e8','rank':8,'file':5},'piece':'K','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'f8','rank':8,'file':6},'piece':'B','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'g8','rank':8,'file':7},'piece':'N','player':'black','hasMoved':false},{'position':{'timeline':0,'turn':1,'player':'white','coordinate':'h8','rank':8,'file':8},'piece':'R','player':'black','hasMoved':false}],'width':8,'height':8}],'active':true,'present':true}],'width':8,'height':8}
    }
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <SessionCard {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <SessionCard {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <SessionCard {...args} />
      </div>
    </StorybookSandbox>
  );
}
