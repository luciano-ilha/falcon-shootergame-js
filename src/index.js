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

const body = document.getElementById("body");
const hide = document.getElementById("hide");
const name = document.getElementById("name");
const submit = document.getElementById("submit");

let game;

submit.onclick = () => {
  localStorage.setItem("playerName", name.value);
  hide.style.display = "none";
  body.classList.remove("center");
  body.style.background = "black";
  game = new Phaser.Game(config);
};

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  parent: "phaser-game",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneLeaderboard],
};

let podiumNames = [];
let podiumScores = [];
let playerName = localStorage.getItem("playerName");
let model = new Model();
let emitter = new Phaser.Events.EventEmitter();
let G = new Constants();
let controller = new Controller();
let mediaManager = new MediaManager({ scene: this });

export {
  game,
  model,
  emitter,
  G,
  controller,
  mediaManager,
  playerName,
  podiumNames,
  podiumScores,
};
