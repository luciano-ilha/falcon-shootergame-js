class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {}

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();

    mediaManager = new MediaManager({ scene: this });

    this.shields = 100;
    this.eshields = 100;
    model.playerWon = true;
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(this.centerX, this.centerY, "ship");
    this.ship.body.collideWorldBounds = true;
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

    this.bulletGroup = this.physics.add.group();
    this.ebulletGroup = this.physics.add.group();
    this.rockGroup = this.physics.add.group();
    this.makeRocks();

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

    this.eship = this.physics.add.sprite(this.centerX, 0, "eship");
    this.eship.body.collideWorldBounds = true;
    Align.scaleToGameW(this.eship, 0.25);

    this.makeInfo();
    this.setColliders();
    let sb = new SoundButtons({ scene: this });
  }

  makeRocks() {
    if (this.rockGroup.getChildren() == 0) {
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
    }
  }

  downPlayer() {
    this.shields--;
    this.text1.setText("Shields\n" + this.shields);
    if (this.shields == 0) {
      model.playerWon = false;
      this.scene.start("SceneOver");
    }
  }

  downEnemy() {
    this.eshields--;
    this.text2.setText("Enemy Shields\n" + this.eshields);
    if (this.eshields == 0) {
      model.playerWon = true;
      this.scene.start("SceneOver");
    }
  }

  setColliders() {
    this.physics.add.collider(this.rockGroup);
    this.physics.add.collider(
      this.bulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    );
    this.physics.add.collider(
      this.ebulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    );
    this.physics.add.collider(
      this.bulletGroup,
      this.eship,
      this.damageEnemy,
      null,
      this
    );
    this.physics.add.collider(
      this.ebulletGroup,
      this.ship,
      this.damagePlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.rockGroup,
      this.ship,
      this.rockHitPlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.rockGroup,
      this.eship,
      this.rockHitEnemy,
      null,
      this
    );
  }

  makeInfo() {
    this.text1 = this.add.text(0, 0, "Shields\n100", {
      fontSize: game.config.width / 30,
      align: "center",
      backgroundColor: "#000000",
    });
    this.text2 = this.add.text(0, 0, "Enemy Shields\n100", {
      fontSize: game.config.width / 30,
      align: "center",
      backgroundColor: "#000000",
    });
    this.text1.setOrigin(0.5, 0.5);
    this.text2.setOrigin(0.5, 0.5);

    this.uiGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.uiGrid.showNumbers();
    this.uiGrid.placeAtIndex(2.4, this.text1);
    this.uiGrid.placeAtIndex(7.9, this.text2);

    this.icon1 = this.add.image(0, 0, "ship");
    this.icon2 = this.add.image(0, 0, "eship");
    Align.scaleToGameW(this.icon1, 0.05);
    Align.scaleToGameW(this.icon2, 0.05);
    this.uiGrid.placeAtIndex(1.1, this.icon1);
    this.uiGrid.placeAtIndex(6.1, this.icon2);

    this.icon1.angle = 270;
    this.icon2.angle = 270;

    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.icon1.setScrollFactor(0);
    this.icon2.setScrollFactor(0);
  }

  enemyChase() {
    let angle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 60);
    angle = this.toDegrees(angle);
    this.eship.angle = angle;
  }

  rockHitPlayer(ship, rock) {
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
    this.downPlayer();
  }

  rockHitEnemy(ship, rock) {
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
    this.downEnemy();
  }

  damagePlayer(ship, bullet) {
    let explosion = this.add.sprite(this.ship.x, this.ship.y, "exp");
    explosion.play("boom");
    bullet.destroy();
    this.downPlayer();
  }

  damageEnemy(ship, bullet) {
    let explosion = this.add.sprite(bullet.x, bullet.y, "exp");
    explosion.play("boom");
    bullet.destroy();
    this.downEnemy();

    let angle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 100);
    angle = this.toDegrees(angle);
    this.eship.angle = angle;
  }

  destroyRock(bullet, rock) {
    bullet.destroy();
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
  }

  getDirFromAngle(angle) {
    let rads = (angle * Math.PI) / 180;
    let tx = Math.cos(rads);
    let ty = Math.sin(rads);
    return { tx, ty };
  }

  fireEBullet() {
    let elapsed = Math.abs(this.lastEBullet - this.getTimer());
    if (elapsed < 500) {
      return;
    }
    this.lastEBullet = this.getTimer();
    let ebullet = this.physics.add.sprite(
      this.eship.x,
      this.eship.y,
      "ebullet"
    );
    this.ebulletGroup.add(ebullet);
    ebullet.body.angularVelocity = 10;
    this.physics.moveTo(ebullet, this.ship.x, this.ship.y, 150);
  }

  getTimer() {
    let d = new Date();
    return d.getTime();
  }

  // onDown() {
  //   this.downTime = this.getTimer();
  // }

  // backgroundClicked() {
  //   let elapsed = Math.abs(this.downTime - this.getTimer());
  //   if (elapsed < 300) {
  //     let tx = this.background.input.localX * this.background.scaleX;
  //     let ty = this.background.input.localY * this.background.scaleY;

  //     this.tx = tx;
  //     this.ty = ty;

  //     let angle = this.physics.moveTo(this.ship, tx, ty, 60);
  //     angle = this.toDegrees(angle);
  //     this.ship.angle = angle;
  //   } else {
  //     this.makeBullet();
  //   }
  // }

  toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ship.x -= 2;
      this.ship.angle = -180;

      this.enemyChase();
    }

    if (this.cursors.up.isDown) {
      this.ship.y -= 2;
      this.ship.angle = -90;

      this.enemyChase();
    }

    if (this.cursors.right.isDown) {
      this.ship.x += 2;
      this.ship.angle = 0;

      this.enemyChase();
    }

    if (this.cursors.down.isDown) {
      this.ship.y += 2;
      this.ship.angle = 90;

      this.enemyChase();
    }

    if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.ship.angle = -135;

      this.enemyChase();
    }

    if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.ship.angle = -45;

      this.enemyChase();
    }

    if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.ship.angle = 45;

      this.enemyChase();
    }

    if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.ship.angle = 135;

      this.enemyChase();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      let dirObj = this.getDirFromAngle(this.ship.angle);
      let bullet = this.physics.add.sprite(
        this.ship.x + dirObj.tx * 55,
        this.ship.y + dirObj.ty * 55,
        "bullet"
      );
      this.bulletGroup.add(bullet);
      bullet.angle = this.ship.angle;
      bullet.body.setVelocity(dirObj.tx * 350, dirObj.ty * 350);

      this.enemyChase();
    }

    // let distX = Math.abs(this.ship.x - this.tx);
    // let distY = Math.abs(this.ship.y - this.ty);

    // if (distX < 10 && distY < 10) {
    //   this.ship.body.setVelocity(0, 0);
    // }

    let distX = Math.abs(this.ship.x - this.eship.x);
    let distY = Math.abs(this.ship.y - this.eship.y);

    if (distX < game.config.width / 3 && distY < game.config.height / 3) {
      this.fireEBullet();
    }
  }
}
