import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import GameScene from "./scenes/GameScene";
import WinScene from "./scenes/WinScene";
import LoseScene from "./scenes/LoseScene";
import MainMenuScene from "./scenes/MainMenuScene";

const sizes = {
  width: 500,
  height: 500,
};

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: document.getElementById("gameCanvas"),

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },

  scene: [PreloadScene, GameScene, WinScene, LoseScene, MainMenuScene],
};

export default config;
