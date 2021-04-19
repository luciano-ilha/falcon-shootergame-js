let game;
let model;
let emitter;
let G;
let controller;
let mediaManager;

window.onload = function () {
  let isMobile = navigator.userAgent.indexOf("Mobile");

  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile == -1) {
    var config = {
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
      scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    };
  } else {
    var config = {
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

  G = new Constants();
  model = new Model();
  model.isMobile = isMobile;
  game = new Phaser.Game(config);
};
