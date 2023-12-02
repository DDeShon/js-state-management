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
    this.color = "green";
    this.counter = 0;
    this.maxCount = 200;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Idle extends Alien {
  start() {
    this.color = "red";
    this.text = "Idle";
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
    this.text = "Charge";
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
}

class Swarm extends Alien {
  start() {
    this.color = "blue";
    this.text = "Swarm";
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
