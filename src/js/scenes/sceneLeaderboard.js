import { emitter, game, model } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { ScoreBox } from "../classes/comps/scoreBox";
import { SoundButtons } from "../classes/ui/soundButtons";

export class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super("SceneLeaderboard");
  }

  preload() {}

  create() {
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    // this.sb = new ScoreBox({ scene: this });
    // this.sb.x = game.config.width / 2;
    // this.sb.y = 50;

    let leadTitle = this.add.image(0, 0, "leaderboards");
    Align.scaleToGameW(leadTitle, 0.8);
    this.alignGrid.placeAtIndex(16, leadTitle);

    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "START OVER!",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);
    emitter.on("start_game", this.startGame, this);

    let sb = new SoundButtons({ scene: this });
  }

  startGame() {
    model.score = 0;
    this.scene.start("SceneMain");
  }

  update() {}
}
