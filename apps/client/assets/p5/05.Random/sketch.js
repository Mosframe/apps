/**
 * sketch.js
 *
 * Random 사용 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

var spot = {
  x: 100,
  y: 50,
};

var col = {
  r: 255,
  g: 0,
  b: 0,
};

function setup() {

   createCanvas(600,400);
   background(0);
}

function draw() {

  col.r = random(100,255);
  col.g = 0;
  col.b = random(1000,190);

  spot.x = random(0,width);
  spot.y = random(0,height);

  noStroke();
  fill( col.r, col.g, col.b, 100 );
  ellipse( spot.x, spot.y, 24, 24 );
}
