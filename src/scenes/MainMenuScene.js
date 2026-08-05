import Phaser from "phaser";
import { FONT_FAMILY, FONT_SIZE, COLORS } from "./UiConstants.js";

const TARGET_SCORE_DISPLAY = "22 Points";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    this.sound.stopAll();
    this.hasStarted = false;

    const { width, height } = this.scale;
    const centerX = width / 2;

    // ---- Background ----
    this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(width, height);
    this.add.rectangle(0, 0, width, height, 0x000000, 0.25).setOrigin(0, 0);

    // ---- Title ----
    const signY = height * 0.35;
    this.add.image(centerX, signY, "menu_post").setDepth(1);

    this.add
      .text(centerX, signY - 66, "Grass", {
        fontSize: FONT_SIZE.mainTitle,
        fontFamily: FONT_FAMILY,
        fontStyle: "bold",
        color: COLORS.success,
        stroke: "#284e0e",
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setDepth(2);

    this.add
      .text(centerX, signY - 28, "Rush", {
        fontSize: FONT_SIZE.mainTitle,
        fontFamily: FONT_FAMILY,
        fontStyle: "bold",
        color: "#fff8da",
        stroke: "#3d1e0b",
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setDepth(2);

    // ---- Description ----
    const scrollY = height * 0.65;
    this.add.image(centerX, scrollY, "menu_scroll").setDepth(2);

    this.add
      .text(
        centerX,
        scrollY - 50,
        "Restore the garden by\nclearing the overgrown\ngrass before time runs\nout!",
        {
          fontSize: FONT_SIZE.small,
          fontFamily: FONT_FAMILY,
          fontStyle: "bold",
          color: COLORS.textOnLight,
          align: "center",
          lineSpacing: 4,
        },
      )
      .setOrigin(0.5)
      .setDepth(3);

    // ---- Target Score Info ----
    const targetRowY = scrollY + 10;

    this.add.image(centerX - 85, targetRowY, "menu_target").setDepth(3);

    this.add
      .text(centerX - 40, targetRowY - 14, "Target Score:", {
        fontSize: FONT_SIZE.normalLabel,
        fontFamily: FONT_FAMILY,
        fontStyle: "bold",
        color: COLORS.textOnLight,
      })
      .setDepth(3);

    this.add
      .text(centerX - 40, targetRowY + 6, TARGET_SCORE_DISPLAY, {
        fontSize: FONT_SIZE.normalValue,
        fontFamily: FONT_FAMILY,
        fontStyle: "bold",
        color: COLORS.textOnLight,
      })
      .setDepth(3);

    // ---- Start Controls ----
    const startButton = this.add
      .image(centerX, height * 0.77, "menu_start_btn")
      .setInteractive({ useHandCursor: true })
      .setDepth(4);

    const startGame = () => {
      if (this.hasStarted) return;
      this.hasStarted = true;
      this.scene.start("GameScene");
    };

    startButton.once("pointerdown", startGame);

    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      .once("down", startGame);
  }
}
