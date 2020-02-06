var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var height = canvas.height;
var width = canvas.width;

var x = 50;
var y = 50;

var wielkosc_szczeliny = 100;
var odleglosc_od_drugiej_rury = 300;

var margines = 20;

var xd = []
xd.push(new piper(300, 0, "green"));

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function piper(_x, _y, _color)
{
	this.x = _x;
  this.y = _y;
  this.color = _color;
  this.dlugosc_gornej_pipera = getRandomInt(margines,height-margines-wielkosc_szczeliny);
  this.drawpiper = function() 
  {
    ctx.fillStyle = _color;
    ctx.fillRect(this.x,this.y,70,this.dlugosc_gornej_pipera);
		ctx.fillRect(this.x,this.y+this.dlugosc_gornej_pipera+wielkosc_szczeliny,70,height-this.dlugosc_gornej_pipera-wielkosc_szczeliny);
	}
}

function drawBall() {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(100,y,20,20)
}

function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  y += 0.35;
  for(i = 0; i < xd.length; i++) {
 			xd[i].drawpiper();
    	xd[i].x -= 0.2;
  }
}
function craetepiper()
{
  xd.push(new piper(width, 0, "green"));
}

setInterval(draw, 10);
setInterval(craetepiper, 10000);