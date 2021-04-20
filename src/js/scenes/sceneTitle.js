import { emitter, game, mediaManager } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { MediaManager } from "../classes/util/mediaManager";

export class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }

  preload() {
    this.load.image("title", "/src/images/title.png");
  }

  create() {
    // emitter = new Phaser.Events.EventEmitter();
    // controller = new Controller();

    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    this.add.image(0, 0, "background").setOrigin(0.5, 0.5);

    let title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(27, title);
    let ship = this.add.image(0, 0, "ship");
    this.alignGrid.placeAtIndex(60, ship);
    ship.angle = 270;
    Align.scaleToGameW(ship, 0.18);

    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "Start",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    emitter.on("start_game", this.startGame, this);
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
