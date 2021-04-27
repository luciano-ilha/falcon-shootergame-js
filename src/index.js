import Phaser from "phaser";
import { SceneLoad } from "./js/scenes/sceneLoad";
import { SceneTitle } from "./js/scenes/sceneTitle";
import { SceneMain } from "./js/scenes/sceneMain";
import { SceneOver } from "./js/scenes/sceneOver";
import { SceneLeaderboard } from "./js/scenes/sceneLeaderboard";
import { Constants } from "./js/constants";
import { Model } from "./js/classes/mc/model";
import { Controller } from "./js/classes/mc/controller";
import { MediaManager } from "./js/classes/util/mediaManager";
// html elements
const hide = document.getElementById("hide");
const name = document.getElementById("name");
const submit = document.getElementById("submit");
// important global var
let podiumNames = [];
let podiumScores = [];
let model = new Model();
let emitter = new Phaser.Events.EventEmitter();
let G = new Constants();
let controller = new Controller();
let mediaManager = new MediaManager({ scene: this });

// if (!localStorage.getItem("playerName")) {
//   submit.onclick = () => {
//     localStorage.setItem("playerName", name.value);
//     hide.style.display = "none";
//     game = new Phaser.Game(config);
//   };
// } else {
//   hide.style.display = "none";
//   game = new Phaser.Game(config);
// }
// game
let game;
// user input
submit.onclick = (e) => {
  e.preventDefault();
  localStorage.setItem("playerName", name.value);
  hide.style.display = "none";
  game = new Phaser.Game(config);
};
// config
const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneLeaderboard],
};

export {
  game,
  model,
  emitter,
  G,
  controller,
  mediaManager,
  podiumNames,
  podiumScores,
};
