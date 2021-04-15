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
    Align.scaleToGameW(this.ship, 0.125);
    this.background.scaleX = this.ship.scaleX;
    this.background.scaleY = this.ship.scaleY;

    // this.background.setInteractive();
    // this.background.on("pointerdown", this.backgroundClicked, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );

    this.cameras.main.startFollow(this.ship, true);

    this.rockGroup = this.physics.add.group({
      key: "rocks",
      frame: [0, 1, 2],
      frameQuantity: 20,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });
  }

  // backgroundClicked() {
  //   let tx = this.background.input.localX * this.background.scaleX;
  //   let ty = this.background.input.localY * this.background.scaleY;

  //   this.tx = tx;
  //   this.ty = ty;

  //   let angle = this.physics.moveTo(this.ship, tx, ty, 60);
  //   angle = this.toDegrees(angle);
  //   this.ship.angle = angle;
  // }

  // toDegrees(angle) {
  //   return angle * (180 / Math.PI);
  // }

  update() {
    if (this.cursors.left.isDown) {
      this.ship.x -= 2;
      this.ship.angle = -180;
    }

    if (this.cursors.up.isDown) {
      this.ship.y -= 2;
      this.ship.angle = -90;
    }

    if (this.cursors.right.isDown) {
      this.ship.x += 2;
      this.ship.angle = 0;
    }

    if (this.cursors.down.isDown) {
      this.ship.y += 2;
      this.ship.angle = 90;
    }

    if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.ship.angle = -135;
    }

    if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.ship.angle = -45;
    }

    if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.ship.angle = 45;
    }

    if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.ship.angle = 135;
    }

    // let distX = Math.abs(this.ship.x - this.tx);
    // let distY = Math.abs(this.ship.y - this.ty);

    // if (distX < 10 && distY < 10) {
    //   this.ship.body.setVelocity(0, 0);
    // }
  }
}
