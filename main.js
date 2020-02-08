class Game {
  constructor(_canvas) {
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
    this.loss = false;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
  }
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  loss()
  {
    this.loss = false;
  }
}

class Input {
  constructor(mongol) {
    document.addEventListener("keydown", event => {
      if (event.keyCode == 65) {
        mongol.keyDown();
      };
    })
    document.addEventListener("keyup", event => {
      if (event.keyCode == 65) {
        mongol.keyUp();
      };
    })
  }
}

class Piper {
  constructor(_game, _x, _y, _color) {
    this.game = _game;
    this.ctx = game.ctx;
    this.x = _x;
    this.y = _y;
    this.color = _color;

    this.wielkosc_szczeliny = 100;
    this.szerokosc_rury = 70;
    //this.odleglosc_od_drugiej_rury = 300;
    this.margines = 20;
    this.dlugosc_gornej_pipera = Game.getRandomInt(this.margines, this.game.height - this.margines - this.wielkosc_szczeliny);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.szerokosc_rury, this.dlugosc_gornej_pipera);
    this.ctx.fillRect(this.x, this.y + this.dlugosc_gornej_pipera + this.wielkosc_szczeliny, this.szerokosc_rury, this.height - this.dlugosc_gornej_pipera - this.wielkosc_szczeliny);
  }
}

class Mongol {
  constructor(_game, _color, _size) {
    this.game = _game;
    this.ctx = game.ctx;

    this.color = _color;

    this.x = 100;
    this.y = 0;

    this.size = _size;

    this.velocity = 0;
    this.maxspeed = 0.8;
    this.click = false;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 20, 20)
  }
  update(deltaTime) {
    this.y += this.velocity / deltaTime;
    if (this.maxspeed > this.velocity) {
      this.velocity += 0.1 / deltaTime;
    }
    if (mongol.y > game.height) {
      alert("przegrales");
      this.game.loss();
    }
  }
  keyDown() {
    if (!this.click) {
      this.velocity -= 2;
      this.click = true;
    }
  }
  keyUp() {
    this.click = false;
  }
}

let canvas = document.getElementById("myCanvas");

let game = new Game(canvas);
let mongol = new Mongol(game, "blue", 20);
let pipers = [];

new Input(mongol);

let frames = 200;
let lasttime = 0;

function update(timestamp) {
  if(game.loss)
  {
    return alert("Przegrales XD");
  }
  frames++;
  let deltatime = timestamp - lasttime;
  lasttime = timestamp;

  console.log(frames);
  game.clear();
  mongol.draw();
  mongol.update(deltatime);

  /*for (i = 0; i < pipers.length; i++) {
    pipers[i].x -= 0.7;
    pipers[i].draw();
    console.log(i);
    console.log(pipers[i]);
  }
  for (i = 0; i < pipers.length; i++)
  {
    if(pipers[i].x<pipers[i].szerokosc_rury*-1)
    {
      pipers.shift();
      break;
    }
  }
  if (frames > 300) {
    pipers.push(new Piper(game, game.width, 0, "green"));
    frames = 0;
  }
  */
  requestAnimationFrame(update);
}
update();