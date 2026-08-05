# 🌿 Grass Rush

A responsive single-player 2D garden cleanup game built with **Phaser 3**, where players take on the role of a gardener tasked with restoring an overgrown garden before time runs out.

---

# 1. Game Description

Grass Rush is a fast-paced, single-player arcade game developed using Phaser 3. The player controls a gardener who must clear overgrown grass scattered across the garden while avoiding randomly placed rocks. The objective is to collect enough grass before the countdown timer reaches zero. The project emphasizes responsive gameplay, clean architecture, optimized assets, and an enjoyable user experience across desktop and mobile devices.

---

# 2. Features

- Responsive Phaser 3 game
- Responsive canvas scaling
- Random rock generation every playthrough
- Static grid-based grass placement
- Target score system
- Countdown timer
- Win and Lose game states
- Interactive Main Menu
- Background music
- Grass collection sound effect
- Rock collision sound effect
- Win sound effect
- Lose sound effect
- Keyboard controls (WASD + Arrow Keys)
- Mouse support
- Touch support for mobile devices
- Production-ready optimized build

---

# 3. Tech Stack

- Phaser 3
- JavaScript (ES6)
- Vite
- HTML5
- CSS3

---

# 4. Installation

Clone the repository

```bash
git clone https://github.com/Ahmad-ctrl-del/grass-rush-phaser3.git
```

Move into the project directory

```bash
cd Grass-Rush
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Create a production build

```bash
npm run build
```

Run the production server

```bash
npm run preview
```

---

# 5. Controls

## Desktop

- W → Move Up
- A → Move Left
- S → Move Down
- D → Move Right

OR

- Arrow Keys

## Menu Navigation

- SPACE → Start / Restart Game
- Mouse Click → Start / Restart Game

## Mobile

- Tap Start Button
- Tap Anywhere to Restart
- Tap Main Menu Button

---

# 6. Gameplay Objective

The goal is to restore the garden before time runs out.

### Target Score

Collect **22 grass tufts**.

### Timer

You have **15 seconds** to complete the objective.

### Rocks

Randomly placed rocks act as obstacles and block the player's movement.

### Win Condition

Collect the target score before the timer reaches zero.

### Lose Condition

Fail to reach the target score before the timer expires.

---

# 7. Assumptions

The following design decisions were intentionally made during development:

- Fixed 8 × 8 gameplay grid
- Single-player gameplay
- One object per grid cell (either grass or rock)
- Randomized obstacle placement every game
- Consistent movement speed across desktop and mobile
- Responsive canvas while maintaining gameplay proportions

---

# 8. Trade-offs

To keep the project focused and within the assessment timeline, the following engineering decisions were made:

- Single playable level
- Static background environment
- Simple obstacle interactions
- No player progression system
- No save/load functionality
- Lightweight visual effects to maintain a small build size
- Gameplay-first approach over advanced visual polish

---

# 9. Folder Structure

```text
src/
│
├── assets/
│   ├── audio/
│   └── images/
│
├── scenes/
│   ├── PreloadScene.js
│   ├── MainMenuScene.js
│   ├── GameScene.js
│   ├── WinScene.js
│   └── LoseScene.js
│   └── UiConstants.js
│
├── config.js
├── main.js
└── style.css
```

---

# 10. Screenshots

## Screenshots

### Main Menu

![Main Menu](./screenshots/main-menu.png)

### Gameplay

![Gameplay](./screenshots/gameplay.png)

### Win Screen

![Win Screen](./screenshots/win-screen.png)

### Lose Screen

## ![Lose Screen](./screenshots/lose-screen.png)

# 11. Author

**Syed Ahmad Ali Bukhari**

GitHub

> https://github.com/Ahmad-ctrl-del

Email

> <ahmad107077@gmail.com>

---

# 12. License

This project was developed as part of a technical assessment and is intended for educational and evaluation purposes.
