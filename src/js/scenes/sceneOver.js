import { emitter, game, model, podium } from "../../index";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";
import { FlatButton } from "../classes/ui/flatButton";
import { SoundButtons } from "../classes/ui/soundButtons";
import { LeaderboardContent } from "../../api/fetch";

export class SceneOver extends Phaser.Scene {
  constructor() {
    super("SceneOver");
  }

  preload() {
    this.load.image("button1", "/src/images/ui/buttons/2/1.png");
    this.load.image("title", "/src/images/title.png");
  }

  create() {
    // fetch leaderboard data
    this.leaderboard().then((data) => {
      console.log("over scene", data[0]);
      podium.push(data[0]);
      podium.push(data[1]);
      podium.push(data[2]);
    });
    // bg image
    this.add.image(0, 0, "background").setOrigin(0.3, 0.3);
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    // this.alignGrid.showNumbers();

    // over title img
    let title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(16, title);
    // to user msg
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
    // show ship conditional
    if (model.playerWon == true) {
      this.winner = this.add.image(0, 0, "ship");
    } else {
      this.winner = this.add.image(0, 0, "eship");
    }
    // to leaderboard button
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
    // leaderboard starter action button
    emitter.on("start_leaderboard", this.startLeaderboard, this);
    // sound buttons
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

  startLeaderboard() {
    this.scene.start("SceneLeaderboard");
  }

  update() {}
}
