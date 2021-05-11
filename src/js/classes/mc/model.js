import { mediaManager } from "../../../index";
export class Model {
  constructor() {
    this._score = 0;
    this.soundOn = true;
    this._musicOn = true;
  }

  set musicOn(val) {
    this._musicOn = val;
    mediaManager.musicChanged();
  }

  get musicOn() {
    return this._musicOn;
  }

  set score(val) {
    this._score = val;
  }

  get score() {
    return this._score;
  }
}
