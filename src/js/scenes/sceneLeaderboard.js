import { emitter, game, model, podiumNames, podiumScores } from "../../index";
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
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    let leadTitle = this.add.image(0, 0, "leaderboards");
    Align.scaleToGameW(leadTitle, 0.8);
    this.alignGrid.placeAtIndex(16, leadTitle);

    console.log("podium NAMES inside scene leaderboard", podiumNames);
    console.log("podium SCORES inside scene leaderboard", podiumScores);

    // First Place
    this.playerScoreText = this.add.text(
      0,
      0,
      `${podiumNames[0]} - ${podiumScores[0]}`,
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
      `${podiumNames[1]} - ${podiumScores[1]}`,
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
      `${podiumNames[2]} - ${podiumScores[2]}`,
      {
        fontSize: game.config.width / 15,
        color: "#3fe213",
      }
    );
    this.playerScoreText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(60, this.playerScoreText);

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
    this.scene.start("SceneMain");
  }

  update() {}
}
