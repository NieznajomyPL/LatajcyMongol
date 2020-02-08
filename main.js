class Game {
  constructor(_canvas) {
    this.points = 0;
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
    this.isLoss = false;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
  }
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  draw()
  {
  	this.ctx.fillStyle = "black";
  	this.ctx.font = "30px Arial";
    this.ctx.fillText(this.points.toString(), 10, 50);
  }
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  loss() {
   	this.ctx.fillStyle = "black";
  	this.ctx.font = "30px Arial";
    this.ctx.fillText("PRZEGRALES", 100, 200);
    this.isLoss = true;
  }
  AddPoint() {
    game.points += 1;
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
		this.point = true;
    this.wielkosc_szczeliny = 200;
    this.szerokosc_rury = 70;
    //this.odleglosc_od_drugiej_rury = 300;
    this.margines = 20;
    this.dlugosc_gornej_pipera = Game.getRandomInt(this.margines, this.game.height - this.margines - this.wielkosc_szczeliny);
    //console.log(this.dlugosc_gornej_pipera);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.szerokosc_rury, this.dlugosc_gornej_pipera);
    this.ctx.fillRect(this.x, this.y + this.dlugosc_gornej_pipera + this.wielkosc_szczeliny, this.szerokosc_rury, this.game.height - this.dlugosc_gornej_pipera - this.wielkosc_szczeliny);
  }
}

class Mongol {
  constructor(_game, _color, _size) {
    this.game = _game;
    this.ctx = game.ctx;

    this.color = _color;

    this.x = 100;
    this.y = 20;

    this.size = _size;

    this.velocity = 0;
    this.maxspeed = 8;
    this.click = false;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  update(deltaTime) {
    //console.log(this.y);
    this.y += this.velocity;
    if (this.maxspeed > this.velocity) {
      this.velocity += 1;
    }
    if (this.y > game.height) {
      this.game.loss();
    }
  }
  keyDown() {
    if (this.y > -50) {
      if (!this.click) {
        this.velocity -= 15;
        this.click = true;
      }
    }
  }
  keyUp() {
    this.click = false;
  }
}

let canvas = document.getElementById("myCanvas");

let game = new Game(canvas);
let mongol = new Mongol(game, "red", 20);
let pipers = [];

new Input(mongol);



let frames = 200;
let lasttime = 0;

function update(timestamp) {
  frames++;
  let deltatime = timestamp - lasttime;


  if(game.isLoss)
  {
  	return;
  }

  //console.log(frames);
  game.clear();
  
  mongol.update(deltatime);


  for (i = 0; i < pipers.length; i++) {
  	//zliczanie punktow
    if (pipers[i].x < mongol.x - pipers[i].szerokosc_rury + mongol.size && pipers[i].point) 		{
      game.AddPoint();
      pipers[i].point = false;
    }
    //kolizja
    
    
    	if(pipers[i].x <= mongol.x + mongol.size && mongol.x + mongol.size < pipers[i].x + pipers[i].szerokosc_rury)
      {
        console.log("Kolizja X");
        if(mongol.y < pipers[i].dlugosc_gornej_pipera || mongol.y + mongol.size > pipers[i].dlugosc_gornej_pipera + pipers[i].wielkosc_szczeliny)
        {
          console.log("Kolizja Y")
          game.loss();
          break;
        }
    }
    pipers[i].x -= 1;
    pipers[i].draw();
  }
  for (i = 0; i < pipers.length; i++) {
    if (pipers[i].x < pipers[i].szerokosc_rury * -1) {
      pipers.shift();
      break;
    }
  }
  if (frames > 300) {
    pipers.push(new Piper(game, game.width, 0, "green"));
    frames = 0;
  }
  mongol.draw();
  game.draw();
  lasttime = timestamp;
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
