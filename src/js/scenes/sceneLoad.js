import { Bar } from "../classes/comps/bar";
import { game } from "../../index";
export class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }

  preload() {
    // loading bar
    this.bar = new Bar({
      scene: this,
      x: game.config.width / 2,
      y: game.config.height / 2,
    });

    this.progText = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "0%",
      { color: "#ffffff", fontSize: game.config.width / 20 }
    );

    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgress, this);
    // buttons images
    this.load.image("button1", "/src/images/ui/buttons/2/4.png");
    this.load.image("button2", "/src/images/ui/buttons/2/5.png");
    // audio
    this.load.audio("explode", [
      "/src/audio/explode.wav",
      "/src/audio/explode.ogg",
    ]);
    this.load.audio("enemyShoot", [
      "/src/audio/enemyShoot.wav",
      "/src/audio/enemyShoot.ogg",
    ]);
    this.load.audio("laser", ["/src/audio/laser.wav", "/src/audio/laser.ogg"]);
    this.load.audio("backgroundMusic", "/src/audio/background.mp3");
    // sounds buttons
    this.load.image("toggleBack", "/src/images/ui/toggles/4.png");
    this.load.image("sfxOff", "/src/images/ui/icons/sfx_off.png");
    this.load.image("sfxOn", "/src/images/ui/icons/sfx_on.png");
    this.load.image("musicOn", "/src/images/ui/icons/music_on.png");
    this.load.image("musicOff", "/src/images/ui/icons/music_off.png");
    // ships and rocks
    this.load.image("ship", "/src/images/player.png");
    this.load.image("background", "/src/images/background.jpg");

    this.load.spritesheet("rocks", "/src/images/rocks.png", {
      frameWidth: 125,
      frameHeight: 100,
    });
    this.load.spritesheet("exp", "/src/images/exp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("ebullet", "/src/images/ebullet.png");
    this.load.image("bullet", "/src/images/bullet.png");
    this.load.image("eship", "/src/images/eship.png");
  }

  onProgress(value) {
    this.bar.setPercent(value);
    let per = Math.floor(value * 100);
    this.progText.setText(per + "%");
  }

  create() {
    // boom animation
    let frameNames = this.anims.generateFrameNumbers("exp");
    let f2 = frameNames.slice();
    f2.reverse();
    let f3 = f2.concat(frameNames);
    this.anims.create({
      key: "boom",
      frames: f3,
      frameRate: 48,
      repeat: false,
    });
    this.scene.start("SceneTitle");
  }
}
