import AmbientSound from 'assets/sound/ambience.flac';
import EndSound from 'assets/sound/end.flac';
import PieceSound from 'assets/sound/piece.flac';
import ReverseSound from 'assets/sound/reverse.flac';
import SubmitSound from 'assets/sound/submit.flac';

var collections = require('state/db').init();

const defaultAudio = {
  background: {
    audio: AmbientSound,
    name: 'Default Ambient Sound'
  },
  end: {
    audio: EndSound,
    name: 'Default End Game Sound'
  },
  move: {
    audio: PieceSound,
    name: 'Default Move Sound'
  },
  undo: {
    audio: ReverseSound,
    name: 'Default Undo Sound'
  },
  submit: {
    audio: SubmitSound,
    name: 'Default Submit Sound'
  }
};

window.defaultAudio = defaultAudio;

export const set = async (key, audio, volume, emitter = null) => {
  var newAudio = {
    key: key,
    audio: audio,
    volume: volume
  };
  await collections.audio.update({ key: key }, { $set: newAudio }, { upsert: true });
  if(emitter !== null) {
    emitter.emit('audioUpdate');
  }
}

export const get = async (key) => {
  var res = (await collections.audio.findOne({ key: key }));
  if(res === null) {
    res = {
      key: key,
      name: defaultAudio[key].name,
      audio: defaultAudio[key].audio,
      volume: key === 'background' ? 0 : 1
    };
  }
  return res;
}

export const reset = async (emitter = null) => {
  await collections.audio.remove({}, { multi: true });
  if(emitter !== null) {
    emitter.emit('audioUpdate');
  }
}