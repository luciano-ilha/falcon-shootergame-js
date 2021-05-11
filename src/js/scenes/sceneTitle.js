import { emitter } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
export class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }

  preload() {
    // load title img
    this.load.image("title", "/src/images/title.png");
  }

  create() {
    // bg image and align grid
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    // title img
    let title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(27, title);
    let ship = this.add.image(0, 0, "ship");
    this.alignGrid.placeAtIndex(60, ship);
    // angle display player ship
    ship.angle = 270;
    Align.scaleToGameW(ship, 0.2);
    // start game button
    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "Start",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);
    // start game button emmiter
    emitter.on("start_game", this.startGame, this);
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
