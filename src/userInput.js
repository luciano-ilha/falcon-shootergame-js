import Phaser from "phaser";
import config from "./index";

const hide = document.getElementById("hide");
const name = document.getElementById("name");
const submit = document.getElementById("submit");
const body = document.getElementById("body");
const displayGame = document.querySelector(".phaser-game");

if (!localStorage.getItem("playerName")) {
  submit.onclick = () => {
    localStorage.setItem("playerName", name.value);
    console.log("playerName");
    hide.style.display = "none";
    displayGame.classList.remove("no-show");
    displayGame.style.display = "block";
    body.classList.remove("center");
    body.style.background = "black";
    game = new Phaser.Game(config);
  };
} else {
  displayGame.classList.remove("no-show");
  displayGame.style.display = "block";
  body.classList.remove("center");
  body.style.background = "black";
  hide.style.display = "none";
  game = new Phaser.Game(config);
}
