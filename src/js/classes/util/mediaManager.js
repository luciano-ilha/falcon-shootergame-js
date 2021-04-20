import { emitter, G, model } from "../../../index";

export class MediaManager {
  constructor(config) {
    this.scene = config.scene;
    emitter.on(G.PLAY_SOUND, this.playSound, this);
    emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
  }

  musicChanged() {
    if (this.background) {
      if (model.musicOn == false) {
        this.background.stop();
      } else {
        this.background.play();
      }
    }
  }

  playSound(key) {
    if (model.soundOn == true) {
      let sound = key;
      sound.play();
    }
  }

  setBackgroundMusic(sound) {
    if (model.musicOn == true) {
      this.background = sound;
      this.background.play();
    }
  }
}
