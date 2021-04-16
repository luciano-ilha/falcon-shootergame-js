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
    this.physics.world.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );

    // this.background.setInteractive();
    // this.background.on("pointerup", this.backgroundClicked, this);
    // this.background.on("pointerdown", this.onDown, this);

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
      frameQuantity: 4,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });

    this.rockGroup.children.iterate(
      function (child) {
        let xx = Math.floor(Math.random() * this.background.displayWidth);
        let yy = Math.floor(Math.random() * this.background.displayHeight);

        child.x = xx;
        child.y = yy;

        Align.scaleToGameW(child, 0.1);

        let vx = Math.floor(Math.random() * 2 - 1);
        let vy = Math.floor(Math.random() * 2 - 1);

        if (vx == 0 && vy == 0) {
          vx = 1;
          vy = 1;
        }

        let speed = Math.floor(Math.random() * 200 + 10);
        child.body.setVelocity(vx * speed, vy * speed);
      }.bind(this)
    );

    this.physics.add.collider(this.rockGroup);
  }

  getDirFromAngle(angle) {
    var rads = (angle * Math.PI) / 180;
    var tx = Math.cos(rads);
    var ty = Math.sin(rads);
    return { tx, ty };
  }

  getTimer() {
    let d = new Date();
    return d.getTime();
  }

  onDown() {
    this.downTime = this.getTimer();
  }

  backgroundClicked() {
    let elapsed = Math.abs(this.downTime - this.getTimer());
    if (elapsed < 300) {
      let tx = this.background.input.localX * this.background.scaleX;
      let ty = this.background.input.localY * this.background.scaleY;

      this.tx = tx;
      this.ty = ty;

      let angle = this.physics.moveTo(this.ship, tx, ty, 60);
      angle = this.toDegrees(angle);
      this.ship.angle = angle;
    } else {
      this.makeBullet();
    }
  }

  toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

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

    if (this.cursors.space.isDown) {
      let dirObj = this.getDirFromAngle(this.ship.angle);
      let bullet = this.physics.add.sprite(
        this.ship.x + dirObj.tx * 30,
        this.ship.y + dirObj.ty * 30,
        "bullet"
      );
      bullet.angle = this.ship.angle;
      bullet.body.setVelocity(dirObj.tx * 200, dirObj.ty * 200);
    }

    // let distX = Math.abs(this.ship.x - this.tx);
    // let distY = Math.abs(this.ship.y - this.ty);

    // if (distX < 10 && distY < 10) {
    //   this.ship.body.setVelocity(0, 0);
    // }
  }
}
