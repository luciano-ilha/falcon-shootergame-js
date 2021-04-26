import { emitter, game, podiumNames, podiumScores } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { LeaderboardContent } from "../../api/fetch";
import { SoundButtons } from "../classes/ui/soundButtons";

export class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super("SceneLeaderboard");
  }

  preload() {}

  create() {
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });

    let leadTitle = this.add.image(0, 0, "leaderboards");
    Align.scaleToGameW(leadTitle, 0.8);
    this.alignGrid.placeAtIndex(16, leadTitle);

    // LeaderboardContent.submitScore(playerName, model.score);

    this.leaderboard().then((data) => {
      data.forEach((data) => {
        podiumNames.push(data.user);
        podiumScores.push(data.score);
      });
    });
    console.log(podiumNames);
    console.log(podiumScores);

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

  async leaderboard() {
    try {
      const fetch = await LeaderboardContent.getScores();
      let array = fetch.result;
      array = array.sort((a, b) => b.score - a.score);
      return array;
    } catch (err) {
      return err;
    }
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
