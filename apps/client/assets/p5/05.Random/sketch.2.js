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

  spot.x = random(0,width);
  spot.y = random(0,height);

  fill( col.r, col.g, col.b );
  ellipse( spot.x, spot.y, 24, 24 );
}
