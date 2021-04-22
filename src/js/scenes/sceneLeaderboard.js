import { emitter, game } from "../../index";
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

    // const data = async () => {
    //   try {
    //     const fetch = await LeaderboardContent.getScores();
    //     let array = fetch.result;
    //     array = array.sort((a, b) => b.score - a.score);
    //     for (let i = 0; i < 9; i += 1) {
    //       let color = "";
    //       switch (i) {
    //         case 0:
    //           color = "yellow";
    //           break;
    //         case 1:
    //           color = "gray";
    //           break;
    //         case 2:
    //           color = "red";
    //           break;
    //         default:
    //           color = "green";
    //       }
    //       if (array[i]) {
    //         listing[i] = { user: "", score: "" };
    //         listing[i].user = this.add
    //           .text(500, 108 + 40 * i, `${array[i].user}`, {
    //             color,
    //             fontSize: "33px",
    //             fontWeight: "bold",
    //             fontFamily: "sans-serif",
    //           })
    //           .setOrigin(1, 0);

    //         listing[i].score = this.add
    //           .text(740, 108 + 40 * i, `${array[i].score}`, {
    //             color,
    //             fontSize: "33px",
    //             fontWeight: "bold",
    //             fontFamily: "sans-serif",
    //           })
    //           .setOrigin(1, 0);
    //       }
    //     }
    //     return array;
    //   } catch (err) {
    //     return err;
    //   }
    // };

    // data();
    let sb = new SoundButtons({ scene: this });
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
