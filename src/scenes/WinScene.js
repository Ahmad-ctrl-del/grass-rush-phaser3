import Phaser from "phaser";
import { TEXT_STYLE, ICON_DISPLAY_SIZE } from "./UiConstants.js";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.finishTime = data.time || 0;
  }

  create() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    this.hasChosen = false;

    // ---- Audio ----
    this.sound.play("winAudio", { volume: 0.9 });

    // ---- Background ----
    this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(width, height);
    this.add.rectangle(0, 0, width, height, 0xffffff, 0.35).setOrigin(0, 0);

    const bannerY = height * 0.16;
    this.add.image(centerX, bannerY, "win_victory").setDisplaySize(400, 400);

    // ---- Score / Time Info ----
    const scoreY = height * 0.36;
    this.add
      .image(centerX - 95, scoreY, "win_trophy")
      .setDisplaySize(ICON_DISPLAY_SIZE, ICON_DISPLAY_SIZE);

    this.add.text(
      centerX - 45,
      scoreY - 18,
      "Final Score:",
      TEXT_STYLE.labelOnLight,
    );
    this.add.text(
      centerX - 45,
      scoreY + 6,
      `${this.finalScore}`,
      TEXT_STYLE.valueOnLight,
    );

    const timeY = height * 0.5;
    this.add
      .image(centerX - 95, timeY, "win_clock")
      .setDisplaySize(ICON_DISPLAY_SIZE, ICON_DISPLAY_SIZE);

    this.add.text(
      centerX - 45,
      timeY - 18,
      "Time Remaining:",
      TEXT_STYLE.labelOnLight,
    );
    this.add.text(
      centerX - 45,
      timeY + 6,
      `${this.finishTime} sec`,
      TEXT_STYLE.valueOnLight,
    );

    // ---- Buttons ----
    const playBtn = this.add
      .image(centerX, height * 0.7, "win_play_again")
      .setDisplaySize(220, 100)
      .setInteractive({ useHandCursor: true });

    const mainMenuBtn = this.add
      .image(centerX, height * 0.86, "win_main_menu")
      .setDisplaySize(140, 70)
      .setInteractive({ useHandCursor: true });

    // Guarded so only one choice can ever be actioned per scene instance.
    const choose = (targetScene) => {
      if (this.hasChosen) return;
      this.hasChosen = true;

      this.sound.stopAll();
      this.scene.stop("GameScene");
      this.scene.stop("WinScene");
      this.scene.start(targetScene);
    };

    const restartGame = () => choose("GameScene");
    const goToMainMenu = () => choose("MainMenuScene");

    playBtn.once("pointerdown", restartGame);
    mainMenuBtn.once("pointerdown", goToMainMenu);

    // ---- Controls ----
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.spaceKey.once("down", restartGame);
  }
}
