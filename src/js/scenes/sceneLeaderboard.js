import { emitter, game } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { FlatButton } from "../classes/ui/flatButton";
import { ScoreBox } from "../classes/comps/scoreBox";

export class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super("SceneLeaderboard");
  }

  preload() {}

  create() {
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    this.sb = new ScoreBox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 50;

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
