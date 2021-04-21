import Phaser from "phaser";
import { SceneLoad } from "./js/scenes/sceneLoad";
import { SceneTitle } from "./js/scenes/sceneTitle";
import { SceneMain } from "./js/scenes/sceneMain";
import { SceneOver } from "./js/scenes/sceneOver";
import { Constants } from "./js/constants";
import { Model } from "./js/classes/mc/model";
import { Controller } from "./js/classes/mc/controller";
import { MediaManager } from "./js/classes/util/mediaManager";

let game;
let model;
let emitter = new Phaser.Events.EventEmitter();
let G = new Constants();
let controller = new Controller();
let mediaManager = new MediaManager({ scene: this });

window.onload = function () {
  let config;
  let isMobile = navigator.userAgent.indexOf("Mobile");

  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile == -1) {
    config = {
      type: Phaser.AUTO,
      width: 480,
      height: window.innerHeight,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    };
  } else {
    config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    };
  }

  // G = new Constants();
  model = new Model();
  model.isMobile = isMobile;
  game = new Phaser.Game(config);
};

export { game, model, emitter, G, controller, mediaManager };
