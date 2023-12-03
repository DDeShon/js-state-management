const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
ctx.font = "25px Impact";

class Alien {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 360;
    this.spriteHeight = 360;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.color = "green";
    this.counter = 0;
    this.maxCount = 200;
    this.image = document.getElementById("locustmorph_large");
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Idle extends Alien {
  start() {
    this.color = "red";
    this.text = `IDLE! Press 2 to CHARGE or 3 to SWARM`;
  }
  update() {
    if (this.game.keys.has("2")) {
      this.game.setAlienState(1);
    } else if (this.game.keys.has("3")) {
      this.game.setAlienState(2);
    }
  }
}

class Charge extends Alien {
  start() {
    this.color = "green";
    this.counter = 0;
    this.text = `CHARGING! Press 3 to SWARM or wait for the counter to reach ${this.maxCount} to automatically switch to IDLE.`;
  }
  update() {
    if (this.game.keys.has("3")) {
      this.game.setAlienState(2);
    }
    this.counter++;
    console.log(this.counter);
    if (this.counter > this.maxCount) {
      this.game.setAlienState(0);
    }
  }
  draw(context) {
    super.draw(context);
    context.fillText(this.counter, 15, 30);
  }
}

class Swarm extends Alien {
  start() {
    this.color = "blue";
    this.text = `SWARMING! Press 1 to IDLE or 2 to CHARGE`;
  }
  update() {
    if (this.game.keys.has("1")) {
      this.game.setAlienState(0);
    } else if (this.game.keys.has("2")) {
      this.game.setAlienState(1);
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = new Set();
    this.info = document.getElementById("info");
    this.alienStates = [new Idle(this), new Charge(this), new Swarm(this)];
    this.alien;
    this.setAlienState(0);

    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
    });
    window.addEventListener("keyup", (e) => {
      this.keys.clear();
    });
  }
  render(context) {
    this.alien.update();
    this.alien.draw(context);
  }
  setAlienState(state) {
    this.alien = this.alienStates[state];
    this.alien.start();
    this.info.innerText = this.alien.text;
  }
}

const game = new Game(canvas);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render(ctx);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
