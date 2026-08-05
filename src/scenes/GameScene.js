import Phaser from "phaser";
import { TEXT_STYLE } from "./UiConstants.js";

const GRID_ROWS = 8;
const GRID_COLS = 8;
const MIN_ROCKS = 5;
const MAX_ROCKS = 8;
const PLAYER_SPEED = 110;
const TARGET_SCORE = 22;
const GAME_TIME_SECONDS = 15;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    // ---- Game State ----
    this.score = 0;
    this.timeLeft = GAME_TIME_SECONDS;
    this.targetScore = TARGET_SCORE;
    this.isGameOver = false;
    this.isEnding = false;

    // ---- Audio ----
    this.bgm = this.sound.add("bgAudio", {
      volume: 0.25,
      loop: true,
    });

    if (!this.bgm.isPlaying) {
      this.bgm.play();
    }

    this.events.once("shutdown", this.handleShutdown, this);

    // ---- Background ----
    this.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);

    // ---- Player ----
    this.player = this.physics.add.sprite(
      this.scale.width * 0.08,
      this.scale.height * 0.92,
      "player",
    );

    const playerBodyWidth = this.player.width * 0.24;
    const playerBodyHeight = this.player.height * 0.24;

    this.player.body.setSize(playerBodyWidth, playerBodyHeight);
    this.player.body.setOffset(
      (this.player.width - playerBodyWidth) / 2,
      this.player.height * 0.55,
    );

    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1);

    // ---- Controls ----
    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // ---- Groups (grass & rocks) ----
    const grassGroup = this.physics.add.staticGroup();
    const rockGroup = this.physics.add.staticGroup();

    const startX = this.scale.width * 0.16;
    const startY = this.scale.height * 0.16;
    const spacingX = this.scale.width * 0.1;
    const spacingY = this.scale.height * 0.1;

    const allPositions = [];

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        allPositions.push(`${row},${col}`);
      }
    }

    Phaser.Utils.Array.Shuffle(allPositions);

    const numRocks = Phaser.Math.Between(MIN_ROCKS, MAX_ROCKS);
    const rockPositions = new Set(allPositions.slice(0, numRocks));

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const x = startX + col * spacingX;
        const y = startY + row * spacingY;

        if (rockPositions.has(`${row},${col}`)) {
          const rock = rockGroup.create(x, y, "rock");

          const rockBodyWidth = rock.width * 0.7;
          const rockBodyHeight = rock.height * 0.8;

          rock.body.setSize(rockBodyWidth, rockBodyHeight);
          rock.body.setOffset(
            (rock.width - rockBodyWidth) / 2,
            (rock.height - rockBodyHeight) / 2,
          );
        } else {
          const grass = grassGroup.create(x, y, "tuft");

          const grassBodyWidth = grass.width * 0.6;
          const grassBodyHeight = grass.height * 0.6;

          grass.body.setSize(grassBodyWidth, grassBodyHeight);
          grass.body.setOffset(
            (grass.width - grassBodyWidth) / 2,
            (grass.height - grassBodyHeight) / 2,
          );
        }
      }
    }

    // ---- UI (HUD) ----
    this.scoreText = this.add.text(
      this.scale.width * 0.02,
      this.scale.height * 0.02,
      `Score: ${this.score}`,
      TEXT_STYLE.hud,
    );

    this.timerText = this.add
      .text(
        this.scale.width * 0.98,
        this.scale.height * 0.02,
        `Time Left: ${String(this.timeLeft).padStart(2, "0")}`,
        TEXT_STYLE.hud,
      )
      .setOrigin(1, 0);

    // ---- Timer ----
    this.countDownTimer = this.time.addEvent({
      delay: 1000,
      callback: this.gameTimer,
      callbackScope: this,
      loop: true,
    });

    // ---- Collision ----
    this.physics.add.collider(this.player, rockGroup, () => {
      this.sound.play("rockCollisionAudio", { volume: 0.8 });
    });

    this.physics.add.overlap(this.player, grassGroup, (_player, grass) => {
      if (this.isGameOver || this.isEnding) return;

      grass.disableBody(true, true);
      this.sound.play("grassCollect", { volume: 0.8 });

      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);

      if (this.score >= this.targetScore) {
        this.endGame("WinScene", {
          score: this.score,
          time: this.timeLeft,
        });
      }
    });
  }

  update() {
    if (this.isEnding) return;

    this.player.setVelocity(0);

    const moveUp = this.cursors.up.isDown || this.wasd.up.isDown;
    const moveDown = this.cursors.down.isDown || this.wasd.down.isDown;
    const moveLeft = this.cursors.left.isDown || this.wasd.left.isDown;
    const moveRight = this.cursors.right.isDown || this.wasd.right.isDown;

    if (moveLeft) {
      this.player.setVelocityX(-PLAYER_SPEED);
    } else if (moveRight) {
      this.player.setVelocityX(PLAYER_SPEED);
    }

    if (moveUp) {
      this.player.setVelocityY(-PLAYER_SPEED);
    } else if (moveDown) {
      this.player.setVelocityY(PLAYER_SPEED);
    }

    this.player.body.velocity.normalize().scale(PLAYER_SPEED);
  }

  gameTimer() {
    if (this.isGameOver || this.isEnding) return;

    this.timeLeft--;
    this.timerText.setText(
      `Time Left: ${String(this.timeLeft).padStart(2, "0")}`,
    );

    if (this.timeLeft <= 0) {
      this.timerText.setText("Time Left: 00");

      if (this.score < this.targetScore) {
        this.endGame("LoseScene", { score: this.score });
      }
    }
  }

  endGame(targetScene, data) {
    if (this.isEnding) return;
    this.isEnding = true;
    this.isGameOver = true;

    this.scene.start(targetScene, data);
  }

  handleShutdown() {
    if (this.countDownTimer) {
      this.countDownTimer.remove();
      this.countDownTimer = null;
    }

    if (this.bgm) {
      this.bgm.stop();
      this.bgm.destroy();
      this.bgm = null;
    }
  }
}
