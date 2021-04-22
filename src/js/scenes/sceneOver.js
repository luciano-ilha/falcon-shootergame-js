import { emitter, game, model } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { SoundButtons } from "../classes/ui/soundButtons";

export class SceneOver extends Phaser.Scene {
  constructor() {
    super("SceneOver");
  }

  preload() {
    this.load.image("button1", "/src/images/ui/buttons/2/1.png");
    this.load.image("title", "/src/images/title.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    let title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(16, title);

    this.winnerText = this.add.text(
      0,
      0,
      "Resist longer soldier!\n   This is the way",
      {
        fontSize: game.config.width / 15,
        color: "#3fe213",
      }
    );
    this.winnerText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(38, this.winnerText);

    if (model.playerWon == true) {
      this.winner = this.add.image(0, 0, "ship");
    } else {
      this.winner = this.add.image(0, 0, "eship");
    }

    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "SEE LEADERBOARD!",
      event: "start_leaderboard",
    });
    this.alignGrid.placeAtIndex(93, btnStart);
    Align.scaleToGameW(this.winner, 0.25);
    this.winner.angle = 270;
    this.alignGrid.placeAtIndex(60, this.winner);

    emitter.on("start_leaderboard", this.startLeaderboard, this);

    let sb = new SoundButtons({ scene: this });
  }

  startLeaderboard() {
    this.scene.start("SceneLeaderboard");
  }

  update() {}
}
