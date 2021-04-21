import { emitter, mediaManager, model, game, G } from "../../index";
import { SoundButtons } from "../classes/ui/soundButtons";
import { Align } from "../classes/util/align";
import { AlignGrid } from "../classes/util/alignGrid";
export class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {}

  create() {
    mediaManager.setBackgroundMusic(
      this.sound.add("backgroundMusic", { volume: 0.8, loop: true })
    );
    // ships health
    this.shields = 10;
    this.eshields = 10;
    // if player wins
    model.playerWon = true;
    // center screen
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    // background image
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    // player's ship and it's config
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, "ship");
    this.ship.body.collideWorldBounds = true;
    Align.scaleToGameW(this.ship, 0.15);
    // enemy's ship
    this.eship = this.physics.add.sprite(this.centerX, 0, "eship");
    this.eship.body.collideWorldBounds = true;
    Align.scaleToGameW(this.eship, 0.25);
    // set game bounds
    this.background.scaleX = this.ship.scaleX * 7;
    this.background.scaleY = this.ship.scaleY * 9;
    this.physics.world.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );
    // keyboard moving cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    // rolling background camera
    this.cameras.main.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );
    this.cameras.main.startFollow(this.ship, true);
    // ships bullets and rock groups
    this.bulletGroup = this.physics.add.group();
    this.ebulletGroup = this.physics.add.group();
    this.rockGroup = this.physics.add.group();
    this.makeRocks();
    // in game health and ship icons
    this.makeInfo();
    // collisions
    this.setColliders();
    // sfx and music buttons
    let sb = new SoundButtons({ scene: this });
  }
  // spawns rocks when zero
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
      this.setRockColliders();
    }
  }
  // player's health
  downPlayer() {
    this.shields--;
    this.text1.setText("Shields\n" + this.shields);
    if (this.shields == 0) {
      model.playerWon = false;
      this.scene.start("SceneOver");
    }
  }
  // enemy's health
  downEnemy() {
    this.eshields--;
    this.text2.setText("Enemy Shields\n" + this.eshields);
    if (this.eshields == 0) {
      model.playerWon = true;
      this.scene.start("SceneOver");
    }
  }
  // collisions
  setColliders() {
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
  }
  setRockColliders() {
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
  // health
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
    Align.scaleToGameW(this.icon1, 0.07);
    Align.scaleToGameW(this.icon2, 0.06);
    this.uiGrid.placeAtIndex(1.1, this.icon1);
    this.uiGrid.placeAtIndex(6.1, this.icon2);

    this.icon1.angle = 270;
    this.icon2.angle = 270;

    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.icon1.setScrollFactor(0);
    this.icon2.setScrollFactor(0);
  }
  // enemy pursue player
  enemyChase() {
    let angle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 60);
    angle = this.toDegrees(angle);
    this.eship.angle = angle;
  }
  // rock - player actions
  rockHitPlayer(ship, rock) {
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    emitter.emit(G.PLAY_SOUND, this.sound.add("explode"));

    rock.destroy();
    this.makeRocks();
    this.downPlayer();
  }
  // rock vs enemy actions
  rockHitEnemy(ship, rock) {
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    emitter.emit(G.PLAY_SOUND, this.sound.add("explode"));
    rock.destroy();
    this.makeRocks();
    this.downEnemy();
  }
  // bullet vs player actions
  damagePlayer(ship, bullet) {
    let explosion = this.add.sprite(this.ship.x, this.ship.y, "exp");
    explosion.play("boom");
    emitter.emit(G.PLAY_SOUND, this.sound.add("explode"));
    bullet.destroy();
    this.downPlayer();
  }
  // bullet vs enemy actions
  damageEnemy(ship, bullet) {
    let explosion = this.add.sprite(bullet.x, bullet.y, "exp");
    explosion.play("boom");
    emitter.emit(G.PLAY_SOUND, this.sound.add("explode"));
    bullet.destroy();
    this.downEnemy();

    let angle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 100);
    angle = this.toDegrees(angle);
    this.eship.angle = angle;
  }
  // // bullet vs rocks actions
  destroyRock(bullet, rock) {
    bullet.destroy();
    let explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    emitter.emit(G.PLAY_SOUND, this.sound.add("explode"));
    rock.destroy();
    this.makeRocks();
  }
  // gets angle to enemy's pursue direction
  getDirFromAngle(angle) {
    let rads = (angle * Math.PI) / 180;
    let tx = Math.cos(rads);
    let ty = Math.sin(rads);
    return { tx, ty };
  }
  // enemy fire
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
    emitter.emit(G.PLAY_SOUND, this.sound.add("enemyShoot"));
  }
  // time reference for enemy fire
  getTimer() {
    let d = new Date();
    return d.getTime();
  }
  // converts to degreed
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
    // disable permanent shoot while space is constantly pressed
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
      emitter.emit(G.PLAY_SOUND, this.sound.add("laser"));
    }

    let distX = Math.abs(this.ship.x - this.eship.x);
    let distY = Math.abs(this.ship.y - this.eship.y);

    if (distX < game.config.width / 3 && distY < game.config.height / 3) {
      this.fireEBullet();
    }
  }
}
