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

    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, "ship");

    this.background.setInteractive();
    this.background.on("pointerdown", this.backgroundClicked, this);

    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  backgroundClicked() {
    let tx = this.background.input.localX;
    let ty = this.background.input.localY;

    this.physics.moveTo(this.ship, tx, ty, 60);
  }

  update() {
    // if (this.cursors.down.isDown) {
    //   this.ship.y += 1;
    // }
  }
}
