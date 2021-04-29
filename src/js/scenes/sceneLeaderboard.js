import { emitter, game, podium } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { SoundButtons } from "../classes/ui/soundButtons";

export class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super("SceneLeaderboard");
  }

  preload() {}

  create() {
    console.log(podium);
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    let leadTitle = this.add.image(0, 0, "leaderboards");
    Align.scaleToGameW(leadTitle, 0.8);
    this.alignGrid.placeAtIndex(16, leadTitle);

    // First Place
    this.playerScoreText = this.add.text(
      0,
      0,
      `${podium[0].user} - ${podium[0].score}`,
      {
        fontSize: game.config.width / 15,
        color: "#3fe213",
      }
    );
    this.playerScoreText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(38, this.playerScoreText);
    // Second Place
    this.playerScoreText = this.add.text(
      0,
      0,
      `${podium[1].user} - ${podium[1].score}`,
      {
        fontSize: game.config.width / 15,
        color: "#3fe213",
      }
    );
    this.playerScoreText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(49, this.playerScoreText);
    // Third Place
    this.playerScoreText = this.add.text(
      0,
      0,
      `${podium[2].user} - ${podium[2].score}`,
      {
        fontSize: game.config.width / 15,
        color: "#3fe213",
      }
    );
    this.playerScoreText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(60, this.playerScoreText);
    // start game button
    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "START OVER!",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);
    emitter.on("start_game", this.startGame, this);
    // sound buttons
    let sb = new SoundButtons({ scene: this });
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
