const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
ctx.font = "25px Impact";

class Alien {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.width = 50;
    this.height = 50;
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.alien = new Alien();
  }
}
