import Phaser from "phaser";
import {
  FONT_FAMILY,
  FONT_SIZE,
  COLORS,
  TEXT_STYLE,
  ICON_DISPLAY_SIZE,
} from "./UiConstants.js";

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super("LoseScene");
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.targetScore = data.targetScore || 22;
  }

  create() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    this.hasChosen = false;

    // ---- Audio ----
    this.sound.play("loseAudio", { volume: 0.9 });

    // ---- Background ----
    this.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(width, height)
      .setTint(0xcc5555);

    this.add.rectangle(0, 0, width, height, 0x880000, 0.25).setOrigin(0, 0);

    if (this.textures.exists("lose_border")) {
      this.add
        .image(0, 0, "lose_border")
        .setOrigin(0, 0)
        .setDisplaySize(width, height)
        .setAlpha(0.5);
    }

    // ---- Heading ----
    const signY = height * 0.17;
    this.add.image(centerX, signY, "lose_title_sign");

    this.add
      .text(centerX, signY - 32, "GAME OVER", {
        fontSize: FONT_SIZE.hud,
        fontFamily: FONT_FAMILY,
        fontStyle: "bold",
        color: COLORS.failure,
        stroke: "#3d0b0b",
        strokeThickness: 5,
      })
      .setOrigin(0.5, 0.5);

    // ---- Score / Target Info ----
    const scoreY = height * 0.35;
    this.add
      .image(centerX - 110, scoreY, "lose_trophy")
      .setDisplaySize(ICON_DISPLAY_SIZE, ICON_DISPLAY_SIZE);

    this.add.text(
      centerX - 50,
      scoreY - 18,
      "Final Score:",
      TEXT_STYLE.labelOnDark,
    );
    this.add.text(
      centerX - 50,
      scoreY + 6,
      `${this.finalScore}`,
      TEXT_STYLE.valueOnDark,
    );

    const targetY = height * 0.49;
    this.add
      .image(centerX - 110, targetY, "lose_target")
      .setDisplaySize(ICON_DISPLAY_SIZE, ICON_DISPLAY_SIZE);

    this.add.text(
      centerX - 50,
      targetY - 18,
      "Target Score:",
      TEXT_STYLE.labelOnDark,
    );
    this.add.text(
      centerX - 50,
      targetY + 6,
      `${this.targetScore}`,
      TEXT_STYLE.valueOnDark,
    );

    // ---- Buttons ----
    const retryBtn = this.add
      .image(centerX, height * 0.68, "lose_retry_btn")
      .setInteractive({ useHandCursor: true });

    const mainMenuBtn = this.add
      .image(centerX, height * 0.83, "win_main_menu")
      .setInteractive({ useHandCursor: true });

    // Guarded so only one choice can ever be actioned per scene instance.
    const choose = (targetScene) => {
      if (this.hasChosen) return;
      this.hasChosen = true;

      this.sound.stopAll();
      this.scene.stop("GameScene");
      this.scene.stop("LoseScene");
      this.scene.start(targetScene);
    };

    const restartGame = () => choose("GameScene");
    const goToMainMenu = () => choose("MainMenuScene");

    retryBtn.once("pointerdown", restartGame);
    mainMenuBtn.once("pointerdown", goToMainMenu);

    // ---- Controls ----
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.spaceKey.once("down", restartGame);
  }
}
