/**
 * sketch.js
 *
 * 좌우로 바운스되는 공
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

function setup () {

   createCanvas(600,400);
}

function draw () {

  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  if( mouseX > 300 ) {

    fill( 255, 0, 200);
  }

  ellipse( 300, 200, 100, 100 );
}
