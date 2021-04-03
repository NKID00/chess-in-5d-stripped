import React from 'react';

import Options from 'Options';
import { Howl } from 'howler';
import ambience from 'assets/sound/ambience.flac';
import bourree from 'assets/sound/bourree.mp3';
import courante from 'assets/sound/courante.mp3';
import gavottes from 'assets/sound/gavottes.mp3';
import gigue from 'assets/sound/gigue.mp3';
import largo from 'assets/sound/largo.mp3';
import menuettos from 'assets/sound/menuettos.mp3';
import prelude from 'assets/sound/prelude.mp3';

export default class Music extends React.Component {
  musicHowl = new Howl({
    autoplay: true,
    loop: true,
    volume: 0,
    src: [bourree, courante, gavottes, gigue, largo, menuettos, prelude].sort(() => 1 - 2*Math.random())
  });
  ambienceHowl = new Howl({
    autoplay: true,
    loop: true,
    volume: 0,
    src: ambience
  });
  refreshTime = 1000;
  refresh() {
    var vol = Options.get('sound');
    this.musicHowl.volume(vol.music/4);
    this.ambienceHowl.volume(vol.ambience);
    window.setTimeout(this.refresh.bind(this), this.refreshTime);
  }
  componentDidMount() {
    window.setTimeout(this.refresh.bind(this), this.refreshTime);
  }
  render() {
    return (
      <></>
    );
  }
}
