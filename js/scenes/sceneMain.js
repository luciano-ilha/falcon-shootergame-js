class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {}

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();

    mediaManager = new MediaManager({ scene: this });

    let sb = new SoundButtons({ scene: this });
  }
  update() {}
}
