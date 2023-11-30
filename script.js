const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
ctx.font = "25px Impact";

class Alien {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Idle extends Alien {}

class Charge extends Alien {}

class Swarm extends Alien {}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = new Set();
    this.alienStates = [new Idle(), new Charge(), new Swarm()];
    this.alien = this.alienStates[0];

    window.addEventListener("keydown", (e) => {
      this.keys.add(e);
    });
    window.addEventListener("keyup", (e) => {
      this.keys.clear();
    });
  }
  render(context) {
    this.alien.draw(context);
  }
}

const game = new Game(canvas);
game.render(ctx);
